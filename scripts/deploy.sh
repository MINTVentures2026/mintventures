#!/usr/bin/env bash
# Upload the build to the All-Inkl webspace over FTP with TLS (FTPS).
#
# Required env:
#   DEPLOY_HOST      e.g. w0123456.kasserver.com
#   DEPLOY_USER      FTP user (best: an extra FTP user limited to the site folder)
#   DEPLOY_PASSWORD
#   DEPLOY_DIR       remote folder of the site, e.g. /mintventures/production
# Optional env:
#   DEPLOY_SRC           local build folder (default: dist)
#   DEPLOY_INSECURE_TLS  set to 1 to skip certificate checks (local test servers only)
#
# Upload order keeps the live site consistent: new assets first, then index.html
# and .htaccess, which switch visitors to the new version, then delete stale files.
set -euo pipefail

MARKER=.mintventures-deploy

die() { echo "deploy: $*" >&2; exit 1; }

: "${DEPLOY_HOST:?DEPLOY_HOST is not set}"
: "${DEPLOY_USER:?DEPLOY_USER is not set}"
: "${DEPLOY_PASSWORD:?DEPLOY_PASSWORD is not set}"
: "${DEPLOY_DIR:?DEPLOY_DIR is not set}"
SRC="${DEPLOY_SRC:-dist}"

[[ "$DEPLOY_DIR" == /?* && "$DEPLOY_DIR" != *..* ]] \
  || die "DEPLOY_DIR must be an absolute folder other than / (got '$DEPLOY_DIR')"
[[ -f "$SRC/index.html" && -f "$SRC/.htaccess" ]] \
  || die "$SRC/ has no index.html/.htaccess; run 'make build' first"
command -v lftp >/dev/null || die "lftp is not installed"

verify_tls=true
[[ "${DEPLOY_INSECURE_TLS:-}" == 1 ]] && verify_tls=false

lftp_run() {
  LFTP_PASSWORD="$DEPLOY_PASSWORD" lftp -c "
    set cmd:fail-exit true
    set ftp:ssl-force true
    set ftp:ssl-protect-data true
    set ssl:verify-certificate $verify_tls
    set net:timeout 20
    set net:max-retries 2
    open --env-password -u '$DEPLOY_USER' 'ftp://$DEPLOY_HOST'
    $1"
}

# --delete is only safe in a folder this script owns. An empty folder is fine
# (first deploy); a non-empty one without our marker is someone else's data.
listing=$(lftp_run "cls -1a --basename '$DEPLOY_DIR/'") \
  || die "cannot list $DEPLOY_DIR on $DEPLOY_HOST (wrong credentials, or folder missing: create it in KAS)"
listing=$(grep -vxE '\.{1,2}/?' <<<"$listing" || true)
if [[ -n "$listing" ]] && ! grep -qxF "$MARKER" <<<"$listing"; then
  die "$DEPLOY_DIR is not empty and was not created by this script; refusing to overwrite. Contents:
$listing"
fi

upload=$(mktemp -d)
trap 'rm -rf "$upload"' EXIT
cp -R "$SRC/." "$upload/"
printf 'commit=%s\ndeployed=%s\n' "${GITHUB_SHA:-$(git rev-parse HEAD 2>/dev/null || echo unknown)}" \
  "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$upload/$MARKER"

# .well-known/ belongs to the host (Let's Encrypt), so never touch it.
lftp_run "
  lcd '$upload'
  cd '$DEPLOY_DIR'
  mirror --reverse --no-perms --parallel=4 --exclude-glob .well-known/ --exclude-glob index.html --exclude-glob .htaccess --exclude-glob $MARKER
  mput index.html .htaccess $MARKER
  mirror --reverse --no-perms --delete --exclude-glob .well-known/
"
echo "deploy: uploaded $SRC/ to $DEPLOY_HOST:$DEPLOY_DIR"
