#!/usr/bin/env bash
# Smoke-test a deployment: routes, security headers, no third-party fonts,
# and that the served JS bundle matches a local `npm run build`.
# Usage: scripts/verify-deploy.sh [base-url]   (default: https://www.mintventures.de)
set -uo pipefail

BASE="${1:-https://www.mintventures.de}"
BASE="${BASE%/}"
fails=0

pass() { printf '  \033[32mPASS\033[0m %s\n' "$1"; }
fail() { printf '  \033[31mFAIL\033[0m %s\n' "$1"; fails=$((fails + 1)); }

expect_status() {
  local path="$1" want="$2" got
  got=$(curl -s -o /dev/null -w '%{http_code}' "$BASE$path")
  [[ "$got" == "$want" ]] && pass "$path -> $got" || fail "$path -> $got (want $want)"
}

echo "Routes ($BASE)"
expect_status /             200
expect_status /impressum    200
expect_status /datenschutz  200
expect_status /sitemap.xml  200
expect_status /robots.txt   200
expect_status /no-such-page 404

echo "Security headers"
headers=$(curl -sI "$BASE/" | tr -d '\r' | tr 'A-Z' 'a-z')
for h in content-security-policy x-content-type-options referrer-policy permissions-policy strict-transport-security; do
  grep -q "^$h:" <<<"$headers" && pass "$h" || fail "$h missing"
done

echo "Privacy"
html=$(curl -s "$BASE/")
grep -qE 'fonts\.(googleapis|gstatic)\.com' <<<"$html" && fail "page still loads Google Fonts" || pass "no Google Fonts"

echo "Bundle matches local build"
live_js=$(grep -oE '/assets/index-[^"]+\.js' <<<"$html" | head -1)
if [[ -f dist/index.html ]]; then
  local_js=$(grep -oE '/assets/index-[^"]+\.js' dist/index.html | head -1)
  [[ "$live_js" == "$local_js" ]] && pass "$live_js" || fail "live $live_js != local $local_js (deployment is older/newer than your working tree)"
else
  echo "  SKIP no dist/ — run 'npm run build' first"
fi

echo
(( fails == 0 )) && echo "All checks passed." || echo "$fails check(s) failed."
exit $(( fails > 0 ))
