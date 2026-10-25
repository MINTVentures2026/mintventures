# Deployment

The site is a static build (`dist/`) served by the **All-Inkl** webspace. **GitHub Actions** tests every push and uploads the build:

| Branch | Goes to | Protected |
|---|---|---|
| `dev` | https://staging.mintventures.de | Password (browser login prompt) |
| `main` | https://www.mintventures.de | — |

Normal workflow: work on `dev` → push → check staging → merge `dev` into `main` → push → live.

## How it works

1. `.github/workflows/ci.yml` runs `make check` (lint, typecheck, tests, build) on every push and pull request.
2. On a push to `dev`/`main` it uploads `dist/` with `scripts/deploy.sh` (FTP over TLS via `lftp`):
   new assets first, then `index.html` + `.htaccess` (the switch-over), then it deletes stale files.
   It refuses to touch a non-empty folder that has no `.mintventures-deploy` marker, so a typo in
   `DEPLOY_DIR` can't wipe anything else on the webspace.
3. Then `scripts/verify-deploy.sh` checks the live result (routes, 404s, HTTPS redirect, security headers, no Google Fonts, and that the served JS bundle is the one just built). If it fails, the run goes red.
4. `public/.htaccess` (copied into `dist/`) does HTTPS + `www` redirects, the client-side routes, real 404s, security headers and caching.

**Rollback:** in GitHub → Actions, open the last good run on that branch → *Re-run all jobs*. Or `git revert` the bad commit and push.

**Adding a page/route:** add it to `src/App.tsx`, the `RewriteRule ^(impressum|datenschutz)$` line in `public/.htaccess`, and `public/sitemap.xml`.

**Adding an external service** (script, font, embed, analytics): it must be allowed in the `Content-Security-Policy` in `public/.htaccess`, and mentioned in the Datenschutz page.

## Folder layout on the webspace

```
/mintventures/
  production/          ← mintventures.de + www.mintventures.de point here
  staging/             ← password protection lives here (KAS "Verzeichnisschutz")
    site/              ← staging.mintventures.de points here
```

The deploy only ever writes into `production/` or `staging/site/`. The password protection sits one level up so deploys can't overwrite it.

---

# One-time migration (Vercel/Cloudflare → All-Inkl)

Current state (checked 2026-10-25): domain registered at All-Inkl, **nameservers at Cloudflare**, website on **Vercel**, **email on All-Inkl** (`MX w01f804c.kasserver.com`). The site sends HSTS (2 years), so after the switch HTTPS must work right away. Browsers will not let visitors click through a certificate warning.

Do the steps in order. Steps marked 👤 need the owner's All-Inkl login (KAS: https://kas.all-inkl.com).

## 1. 👤 KAS: folders, FTP user, password protection

1. **Find out the plan and server name.** KAS start page shows the account (e.g. `w01f804c`) and server; FTP host is usually `w01f804c.kasserver.com`.
2. **Create the folders** `/mintventures/production` and `/mintventures/staging/site` (KAS → FTP, or any FTP client). Leave them empty.
3. **Create an extra FTP user** (KAS → FTP → *FTP-Benutzer anlegen*), restricted to the folder `/mintventures/`. Use a long random password. This is the account GitHub uses; it can't see anything else on the webspace.
   With that restriction, the deploy folders for this user are `/production` and `/staging/site`.
4. **Protect staging:** KAS → Tools → *Verzeichnisschutz* → folder `/mintventures/staging/` (not `site/`) → add a user, e.g. `preview` with a password you share with testers.

## 2. 👤 KAS: point domains at the folders

1. KAS → Domain → `mintventures.de` → *bearbeiten* → target folder `/mintventures/production/`. Make sure `www` is included.
2. KAS → Subdomain → *anlegen* → `staging.mintventures.de` → folder `/mintventures/staging/site/`.

Nothing changes for visitors yet. DNS still points to Cloudflare/Vercel.

## 3. GitHub: environments and secrets

GitHub → repo → Settings → Environments → create **`staging`** and **`production`**.
- `staging`: *Deployment branches* → only `dev`.
- `production`: *Deployment branches* → only `main`. Optionally add yourself as *Required reviewer* so every production deploy waits for a click.

Secrets per environment (same names, different values), or with the GitHub CLI:

```sh
gh secret set DEPLOY_HOST     --env staging --body "w01f804c.kasserver.com"
gh secret set DEPLOY_USER     --env staging --body "<extra FTP user>"
gh secret set DEPLOY_PASSWORD --env staging            # prompts, keeps it out of shell history
gh secret set DEPLOY_DIR      --env staging --body "/staging/site"
gh secret set VERIFY_AUTH     --env staging            # "preview:<password>" from step 1.4

gh secret set DEPLOY_HOST     --env production --body "w01f804c.kasserver.com"
gh secret set DEPLOY_USER     --env production --body "<extra FTP user>"
gh secret set DEPLOY_PASSWORD --env production
gh secret set DEPLOY_DIR      --env production --body "/production"
```

Deploys stay off until the repo variables are set (next steps), so pushes before that only run the checks.

## 4. DNS: two ways, pick one

### Path A (preferred): someone has the Cloudflare login
Keeps production on Vercel while staging runs on All-Inkl, and each step can be undone in a minute.

1. Cloudflare → DNS → add `staging` → `A` → the All-Inkl server IP (`dig +short w01f804c.kasserver.com`), **proxy off (grey cloud)**.
2. KAS → SSL → `staging.mintventures.de` → *Let's Encrypt* → activate.
3. `gh variable set STAGING_ENABLED --body true`, then push to `dev`. The Actions run should be green; open https://staging.mintventures.de.
4. Revamp, test on staging, repeat.
5. **Cutover:**
   1. Fill the production folder from your machine, so it's ready before any traffic arrives (needs `brew install lftp`):
      ```sh
      git checkout main && make build
      read -rs DEPLOY_PASSWORD && export DEPLOY_PASSWORD   # type the FTP password, Enter
      DEPLOY_HOST=w01f804c.kasserver.com DEPLOY_USER=<ftp user> DEPLOY_DIR=/production scripts/deploy.sh
      ```
   2. Test it before DNS points there: `VERIFY_IP=<server ip> VERIFY_INSECURE=1 make verify`. Everything except certificate-related behavior should pass.
   3. Cloudflare → DNS → change `@` and `www` to `A` <server ip>, proxy off. Keep the `MX` and `TXT` records untouched.
   4. KAS → SSL → activate Let's Encrypt for `mintventures.de` and `www`. Until it is issued (minutes), visitors may see a certificate error.
   5. `make verify` → all green. `gh variable set PRODUCTION_ENABLED --body true`.
   6. **Undo**, if anything is wrong: point `@`/`www` back to the previous Cloudflare values (note them down before step 3).
6. Later (optional): move the nameservers back to All-Inkl (Path B step 3) to drop Cloudflare entirely.

### Path B: no Cloudflare login
Moving the nameservers *is* the cutover, so there's no staging before it. Prepare everything first, then switch.

1. Fill and test production **before** switching, as in Path A step 5.1–5.2 (`VERIFY_IP=<server ip> VERIFY_INSECURE=1 make verify`).
2. Pick a quiet time (evening). Expect up to a few hours where some visitors still reach Vercel, and a short certificate-error window.
3. 👤 KAS → Domain → `mintventures.de` → *Nameserver* → switch back to the **All-Inkl nameservers** (KAS default DNS). That default includes the All-Inkl mail records.
4. 👤 As soon as `dig +short www.mintventures.de` shows the All-Inkl IP: KAS → SSL → Let's Encrypt for `mintventures.de`, `www` and `staging`.
5. **Mail check:** send an email to `info@mintventures.de` from an outside address and reply to it.
6. `make verify` and `VERIFY_AUTH=preview:<pw> make verify URL=https://staging.mintventures.de` → green.
7. `gh variable set STAGING_ENABLED --body true` and `gh variable set PRODUCTION_ENABLED --body true`.

## 5. Clean up (after a week without problems)

1. Remove `vercel.json` from the repo (only Vercel reads it).
2. Vercel: disconnect the GitHub repo / delete the project (needs whoever owns it). Until then, Vercel keeps building `main` but gets no traffic.
3. Lovable: disconnect the GitHub repo.
4. Supabase: delete the project (see `docs/development/25102026-cleanup-security/task_plan.md`).
5. Cloudflare (Path A only, after moving nameservers back): remove the site.
