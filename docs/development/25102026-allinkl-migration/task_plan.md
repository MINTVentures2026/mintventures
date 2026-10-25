# Task Plan: Move hosting to All-Inkl + GitHub Actions (with staging)

## Goal
Host mintventures.de on the All-Inkl webspace the owner already pays for. GitHub Actions checks every push, deploys `dev` to a password-protected `staging.mintventures.de` and `main` to production, so Vercel, Cloudflare and Lovable can be retired without downtime or email breakage.

## Current Phase
Repo side complete (2026-10-25 20:42). Waiting on owner: KAS access → runbook `docs/deployment.md` steps 1–5.

## Context (from previous session, see ../25102026-cleanup-security/)
- Today: Cloudflare nameservers → Vercel serves the site; mail on All-Inkl (MX `w01f804c.kasserver.com`, SPF `include:spf.kasserver.com`).
- Prod sends HSTS `max-age=63072000` → HTTPS must work the moment DNS points to All-Inkl.
- SPA routes: `/`, `/impressum`, `/datenschutz`. Unknown paths must return a real 404.
- No CI/CD in repo; Lovable is being dropped.

## Phases

### Phase 1: Apache config (`public/.htaccess`)
- [x] HTTPS redirect, apex → `www` (canonical is `www`)
- [x] Explicit rewrites for the SPA routes; unknown paths → 404 status rendering the app's NotFound page
- [x] Security headers (CSP etc., same as `vercel.json`) + HSTS
- [x] Caching: hashed `/assets/*` immutable, HTML revalidated
- [x] Test against local Apache 2.4 (`/usr/sbin/httpd`)
- **Status:** complete

### Phase 2: Deploy script (`scripts/deploy.sh`)
- [x] lftp mirror over FTPS/SFTP; assets first, `index.html`/`.htaccess` last, delete stale files last
- [x] Safety: refuse to mirror `--delete` into a non-empty directory that wasn't created by this script (marker file)
- [x] Test with lftp in Docker against local dirs
- **Status:** complete

### Phase 3: GitHub Actions (`.github/workflows/ci.yml`)
- [x] `make check` on every push/PR
- [x] Deploy `dev` → staging env, `main` → production env (GitHub Environments + secrets)
- [x] Deploys gated by repo variables so pushes don't fail before secrets exist
- [x] Post-deploy `verify-deploy.sh` (supports basic auth for staging)
- **Status:** complete

### Phase 5: Migration (needs owner / credentials). Follow `docs/deployment.md`
- [ ] 1. KAS: folders, restricted FTP user, Verzeichnisschutz on `staging/`
- [ ] 2. KAS: domain → `/mintventures/production/`, subdomain staging → `/mintventures/staging/site/`
- [ ] 3. GitHub: environments `staging`/`production` + secrets
- [ ] 4. DNS: Path A (Cloudflare login available) or Path B (nameservers back to All-Inkl)
- [ ] 5. Cleanup: `vercel.json`, Vercel, Lovable, Supabase, Cloudflare
- **Status:** pending

### Phase 4: Runbook (`docs/deployment.md`)
- [x] How deploys work (for maintainers)
- [x] Step-by-step migration for owner + helper: KAS setup, DNS, nameservers, staging, cutover, Let's Encrypt, mail test, decommission
- [x] Update README / CLAUDE.md
- **Status:** complete

## Decisions
| When | Decision | Rationale |
|------|----------|-----------|
| 2026-10-25 20:33 | `ErrorDocument 404 /index.html` instead of a catch-all rewrite | Unknown URLs keep a real 404 status (SEO) and still show the app's NotFound page |
| 2026-10-25 20:33 | Exact route match (`/impressum/` → 404) | One canonical URL per page; trailing-slash variants aren't linked anywhere |
| 2026-10-25 20:34 | Staging auth in parent folder, site in `staging/site/` | Tested: auth inherits; deploys can't overwrite the protection |
| 2026-10-25 20:35 | FTPS (FTP + TLS, cert verified) via lftp, not SFTP | Works on every All-Inkl plan; SFTP needs host-key pinning to be equally safe |
| 2026-10-25 20:35 | Marker file guard before `mirror --delete` | A wrong `DEPLOY_DIR` (e.g. webspace root with other sites/mail) must not be wiped |
| 2026-10-25 20:35 | Upload order: assets → index.html/.htaccess → delete stale | Visitors never get an index.html pointing at assets that aren't uploaded yet |
| 2026-10-25 20:38 | Deploys gated by repo variables `STAGING_ENABLED`/`PRODUCTION_ENABLED` | Pushes before secrets exist stay green; job `if` can't read environment-level vars |
| 2026-10-25 20:38 | Keep `vercel.json` until cutover | Vercel still serves prod; merging to `main` fixes the legal-page 404s there now |
| 2026-10-25 20:40 | Two DNS paths in runbook | Without Cloudflare access, moving nameservers *is* the cutover; `VERIFY_IP` lets us test the new server first |

## Errors Encountered
| When | Error | Attempt | Resolution |
|------|-------|---------|------------|
| 2026-10-25 20:33 | Apache: can't create mutex in `/var/run` | 1 | `DefaultRuntimeDir` + `Mutex file:` in scratchpad |
| 2026-10-25 20:33 | Apache: can't read `.htaccess` under `~/Documents` (macOS privacy) | 1 | Serve a copy of `dist/` from scratchpad |
| 2026-10-25 20:33 | Combined test command denied by permission check | 1 | Split into smaller commands, no `rm -rf` |
| 2026-10-25 20:34 | apex→www test failed: `Host` header carries `:port` | 1 | Regex `^mintventures\.de(:[0-9]+)?$` (also covers clients sending `:443`) |
| 2026-10-25 20:34 | Docker daemon not running | 1 | `brew install lftp` + pyftpdlib FTPS server in scratchpad venv |
| 2026-10-25 20:36 | `cls` lists full paths → marker never matched → every 2nd deploy would be refused | 1 | `cls --basename`; covered by test T6 |
| 2026-10-25 20:37 | zsh didn't split `$R` curl flags | 1 | Inline flags |
