# Findings: All-Inkl migration

## 2026-10-25 20:32 — Environment
- Local Apache 2.4.67 with mod_rewrite + mod_headers available → `.htaccess` can be tested for real.
- Docker available → test lftp without installing it on the host.
- Working branch: `dev` (uncommitted cleanup work from previous session on it).

## 2026-10-25 20:34 — `.htaccess` tested on real Apache 2.4.67 (HTTP :18080, HTTPS :18443, self-signed)
25/25 assertions pass (script kept in session scratchpad, mirrors `verify-deploy.sh` + extras):
- http → https 301; apex → www 301 (regex allows `:port` — first run failed because `Host` carried a port); `staging.` host is *not* redirected.
- `/`, `/impressum`, `/datenschutz` → 200 serving the app; `/impressum/`, `/nope`, `/a/b/c` → **404 status** with the app (NotFound page renders; absolute `/assets/` paths work at any depth).
- All security headers on 200 *and* 404 (`Header always`); dotfiles 403; no directory listing.
- `/assets/*` → `immutable`, 1 year; HTML → `no-cache`; `.woff2` → `font/woff2`; gzip on.
- macOS sandbox: Apache can't read `~/Documents`, so tests ran on a copy of `dist/`.

## 2026-10-25 20:34 — Staging password protection layout (tested)
Parent folder `staging/` holds the `AuthType Basic` `.htaccess` (what KAS "Verzeichnisschutz" creates); site deployed into `staging/site/`. Result: 401 without credentials on every path, 200 with; our `.htaccess` in `site/` does not override the parent auth, and CSP still applies.
→ Deploy must never write to the protected parent, only to `site/`. Otherwise each deploy would overwrite the protection.

## 2026-10-25 20:36 — `scripts/deploy.sh` tested (lftp 4.9.3 → local pyftpdlib FTPS server, TLS required)
| Test | Result |
|---|---|
| T1 self-signed cert, default settings | refused (cert verification on) ✓ |
| T2 folder missing | fails with "create it in KAS" ✓ |
| T3 non-empty folder without marker | refused, contents listed, nothing changed ✓ |
| T4 `DEPLOY_DIR=/` | refused ✓ |
| T5 first deploy into empty folder | remote == `dist/` (+ marker with commit + time) ✓ |
| T6 redeploy with a stale asset and `.well-known/` present | stale asset deleted, `.well-known/` kept, remote == `dist/` ✓ |
| T7 wrong password | fails clearly ✓ |
| T8 no build | fails with "run make build" ✓ |

## 2026-10-25 20:39 — Verify script
- `VERIFY_AUTH` tested against local password-protected staging: without auth everything 401 (13 fails), with auth all pass (except http→https, which can't be tested on that local TLS-only vhost).
- `VERIFY_IP` override confirmed (live IP → same result as DNS; 127.0.0.1 → connection refused).
- `actionlint` clean on `ci.yml`; `shellcheck -S warning` clean on both scripts.

## Not verifiable without credentials
- All-Inkl actually allowing `Options -Indexes`, `<If>`, `Header always` in `.htaccess` (standard Apache 2.4; staging will show it, since a 500 there means a directive isn't allowed).
- The FTP host name and the exact KAS menu labels in the runbook.
- First real GitHub Actions run (workflow is linted, not executed).
