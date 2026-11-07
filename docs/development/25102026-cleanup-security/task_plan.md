# Task Plan: Cleanup & security hardening (pre-revamp)

## Goal
Strip the site down to the code it actually runs and remove insecure / non-compliant operations, so the upcoming revamp starts from a small, clean, secure base — without changing what visitors see.

## Current Phase
Phase 4 — awaiting user review / commit approval

## Phases

### Phase 1: Discovery
- [x] Build import graph from `src/main.tsx` to find unreachable files
- [x] Map unused npm dependencies
- [x] Scan for insecure patterns (XSS sinks, external requests, backend endpoints)
- [x] Record everything in `findings.md`
- **Status:** complete (2026-10-25 11:00)

### Phase 2: Remove dead frontend code
- [x] Drop unused providers from `App.tsx` (React Query, Toaster, Sonner, TooltipProvider)
- [x] Delete unreachable files: 48 shadcn `ui/*` files (kept `accordion`), `NavLink`, `SocialProof`, `hooks/*`, `App.css`, `assets/*.asset.json`, `assets/hero-illustration.jpg`
- [x] Remove unused dependencies (50 → 9 runtime deps, incl. the new font package); drop `@tailwindcss/typography`
- [x] Delete stale `bun.lockb` (bun not installed, lockfile would no longer match; `package-lock.json` is the source of truth)
- **Status:** complete (2026-10-25 11:03)

### Phase 3: Security & privacy fixes
- [x] S1: self-host Nunito via `@fontsource-variable/nunito`; Google Fonts links removed from `index.html`
- [x] S2/S3/S5: Supabase removed from repo (`supabase/`, `src/integrations/supabase/`, `.env`, `@supabase/supabase-js`) — user decision
- [x] S4: FAQ JSON-LD escapes `<`
- [x] `tailwind.config.ts`: `require()` → ESM import (was a lint error)
- [x] `npm audit fix` (non-breaking). Remaining → see Revamp TODOs
- **Status:** complete (2026-10-25 11:04)

### Phase 4: Verify & hand off
- [x] `npm run build` ✓, `npx tsc -p tsconfig.app.json --noEmit` ✓, `npm run lint` 0 errors (1 pre-existing warning), `npm test` ✓
- [x] Headless Chrome screenshots of `/` and `/datenschutz` against `vite preview` — render unchanged, Nunito loads locally, no `fonts.g*` requests in DOM
- [x] Update `CLAUDE.md` / `README.md`
- [x] Hosting is Vercel (not Lovable publish). Added `vercel.json`: rewrites for `/impressum` and `/datenschutz` (both returned **404** on direct load in prod), plus CSP, nosniff, Referrer-Policy and Permissions-Policy headers
- [x] CSP tested locally (node server applying `vercel.json` headers + headless Chrome): all 3 pages render, no violations
- [x] Added `scripts/verify-deploy.sh [url]`: checks routes, headers, no Google Fonts, and that the bundle hash matches the local build
- [ ] Push to a branch → run `verify-deploy.sh` on the Vercel preview URL → merge → run it on production
- [ ] User: undeploy remote Supabase (see below)
- [ ] User: approve commit
- **Status:** in_progress

## Manual follow-ups for the user (cannot be done from the repo)
1. **Undeploy the Supabase edge function** (CONFIRMED LIVE 2026-10-25 11:11: `OPTIONS` → 200 with `CORS: *`; a nonexistent function name → 404) `send-contact-notification` (Lovable → Cloud/Supabase, or `supabase functions delete send-contact-notification --project-ref krhudarkzpiygdpzkknc`). Deleting the file does **not** undeploy it; while deployed it is a public, unauthenticated email relay to info@mintventures.de.
2. **Drop or lock the `contact_requests` table** (anon can insert unlimited rows). Export first if it holds real inquiries.
3. **Remove the `RESEND_API_KEY` secret** from the Supabase project and revoke the key in Resend.
4. If Lovable re-generates `src/integrations/supabase/`, disconnect Supabase in Lovable project settings.

## Revamp TODOs (deferred — breaking upgrades / content)
- [ ] `react-router-dom` 6 → 7 (GHSA-wrjc-x8rr-h8h6 open redirect; not exploitable today — no user-controlled `<Link>` targets)
- [ ] `vitest` 3 → 5 (tinypool critical advisory; dev-only)
- [ ] `vite` 5 → current (esbuild dev-server advisory; dev-only). Note `vite.config.ts` binds dev server to `::` (all interfaces) — keep for Lovable, but avoid on untrusted networks
- [ ] Datenschutz text describes a "Kontaktformular" but the site only has a mailto link — align legal text with reality; also consider naming the actual host
- [ ] Add real tests (currently a single placeholder)
- [ ] `NotFound` logs every 404 to console (template leftover)

## Decisions
| When | Decision | Rationale |
|------|----------|-----------|
| 2026-10-25 11:02 | Keep `ui/accordion.tsx` + `lib/utils.ts` only | Only shadcn pieces reachable from `main.tsx`; `components.json` kept so the revamp can `npx shadcn add` |
| 2026-10-25 11:02 | Self-host via `@fontsource-variable/nunito` | One variable font file per subset, covers all used weights (400–900); no third-party request |
| 2026-10-25 11:02 | Don't touch `index.html` SEO / JSON-LD content | Out of scope |
| 2026-10-25 11:02 | Remove Supabase from repo | User choice; unused by site and the main security risk |
| 2026-10-25 11:04 | Defer major upgrades (react-router 7, vitest 5, vite) | Breaking; no exploitable path today; do at revamp start |
| 2026-10-25 11:11 | Explicit rewrites per route, not a catch-all `/(.*)` | A catch-all turns every typo URL into a 200 soft-404 (bad for SEO); routes are few and listed in the sitemap anyway |
| 2026-10-25 11:03 | Delete `bun.lockb` | Can't regenerate without bun; a stale lockfile is worse than none |

## Errors Encountered
| When | Error | Attempt | Resolution |
|------|-------|---------|------------|
| 2026-10-25 10:59 | zsh glob/quoting broke shell-loop import scan | 1 | Node import-graph script instead |
| 2026-10-25 11:01 | `npm ci` failed: lockfile out of sync (`@testing-library/dom` missing) | 1 | `npm install` (lockfile regenerated anyway) |
| 2026-10-25 11:03 | `npm uninstall $DEPS` removed nothing — zsh doesn't word-split vars | 1 | Piped list through `xargs` |
