# Progress Log: Website 2.0

## Session: 2026-11-07 14:41

### Phase 0: Audit the current site
- **Status:** complete
- **Started:** 2026-11-07 14:41
- **Completed:** 2026-11-07 14:46

| Time | Action |
|---|---|
| 2026-11-07 14:41 | Read the plan; created `task_plan.md`, `findings.md`, `progress.md` in this folder |
| 2026-11-07 14:42 | Probed live URLs (`/`, legal pages, `/en`, `/__l5e/assets-v1`, apex domain, sitemap, robots) |
| 2026-11-07 14:43 | Scanned the live bundle and the repo for asset references and external URLs; extracted section anchors |
| 2026-11-07 14:43 | Grepped source for banned terms (§1 rules 2–3) |
| 2026-11-07 14:44 | Checked images for EXIF/GPS and sizes; sampled logo colours |
| 2026-11-07 14:46 | Wrote `docs/url-inventory.md` (inventory, redirect map, asset list, banned content, human tasks) |

- Files created: `docs/url-inventory.md`, `docs/development/07112026-website-v2/{task_plan,findings,progress}.md`
- Not committed (waiting for the user).
- **Next:** review of Phase 0, confirm Astro (drops Lovable editing), then Phase 1.

## Session: 2026-11-07 15:12

### Phase 1: Foundation
- **Status:** complete (awaiting review)
- **Started:** 2026-11-07 15:12
- **Completed:** 2026-11-07 15:22

| Time | Action |
|---|---|
| 2026-11-07 15:12 | User confirmed: Lovable deprecated, Vercel stays, go to Phase 1 |
| 2026-11-07 15:13 | Astro 7.4.7 needs Node ≥ 22.23.4 → installed Node 24.22.2 LTS via nvm, pinned in `.nvmrc` and `engines` |
| 2026-11-07 15:14 | Removed the Vite/React app with `git rm` (kept `src/assets/logo.png`, `public/`); installed Astro, Tailwind 4, Montserrat (self-hosted), tooling |
| 2026-11-07 15:15 | Wrote `astro.config.mjs`, `tsconfig.json`, `src/config/site.ts`, `src/styles/global.css` (tokens) |
| 2026-11-07 15:16 | Built `Icon`, `Header` (details-based dropdown + mobile menu), `Footer`, `MobileActionBar`, `BaseLayout`, `index.astro` shell, `404.astro`; first build green |
| 2026-11-07 15:16 | Build inlined the header script (blocked by CSP) → `vite.build.assetsInlineLimit: 0`; verified external `<script src>` |
| 2026-11-07 15:16 | `vercel.json`: framework astro, `cleanUrls`, `trailingSlash: false`, SPA rewrites removed |
| 2026-11-07 15:17 | ESLint (ts + astro + jsx-a11y-x), Prettier, Vitest; `contrast.ts` helper + `tokens.test.ts` (16 token pairs) → 20/20 pass |
| 2026-11-07 15:18 | Playwright (iPhone 13/WebKit + Desktop Chrome) + axe: WCAG 2.1 AA, skip link, keyboard dropdown, Escape, mobile menu, 44 px tap targets, action bar not covering content, no third-party requests, no-JS navigation |
| 2026-11-07 15:19 | Screenshots: nav labels wrapped at 1280 px, footer "© 2026MINT Ventures" → desktop nav from `xl`, `whitespace-nowrap`, copyright built as one string; re-checked at 1280 and 1100 px |
| 2026-11-07 15:20 | CI workflow `.github/workflows/ci.yml`; Makefile rewritten (dangling `verify` target removed); README and CLAUDE.md rewritten for Astro |
| 2026-11-07 15:21 | `npm ci` + `make check`: lint ✓, astro check 0 errors/0 hints ✓, format ✓, unit 20/20 ✓, build ✓, e2e 14 passed / 6 skipped (viewport-specific by design) |

- **Test results:** unit 20/20; e2e 14/14 (6 skips = desktop-only tests on mobile and vice versa). `npm audit --omit=dev`: 0 vulnerabilities; dev-only: 12 moderate (minimatch via lint plugins).
- **Not committed** (waiting for the user).
- **Known gaps on this branch (by design until later phases):** footer/nav links point to pages built in Phases 3–4 (404 for now, incl. `/impressum`, `/datenschutz`); `public/sitemap.xml` is still the old one (generated in Phase 5).
- **Next:** Phase 2 — content collections, status logic, seed data, tests.

### 2026-11-07 15:27 — Node.js cleanup
- `make dev` failed in the user's shell: the nvm default was still 22.16 (Astro 7 needs ≥ 22.23.4).
- Migrated global packages (`@aws-amplify/cli`, `yarn`) to Node 24 with `nvm reinstall-packages`, enabled pnpm via corepack, set `nvm alias default 24` and uninstalled 22.16.0. Amplify's postinstall (binary download) was blocked by npm's install-scripts policy; `amplify --version` printed nothing on 22.16 either, so its behaviour is unchanged.
- Verified in a fresh login shell: `node -v` → v24.22.2, `make dev` serves http://localhost:8080 (200).
- Homebrew still has `node` 24.5.0 as a dependency of `gemini-cli`. Left in place (it is shadowed by nvm in PATH).

## Session: 2026-11-07 15:33

### Phase 2: Content model and seed data
- **Status:** complete (awaiting review)
- **Started:** 2026-11-07 15:33
- **Completed:** 2026-11-07 15:39

| Time | Action |
|---|---|
| 2026-11-07 15:33 | Checked Astro 7 content layer: `src/content.config.ts`, `glob` loader, `astro/zod` (Zod 4); YAML is parsed by the `yaml` package with the `timestamp` tag (unquoted dates become `Date`) |
| 2026-11-07 15:33 | `src/lib/dates.ts`: string dates with month/day/time precision, `berlinToday()`, weekday, first/last day, German formatting that never invents a day → 19 tests |
| 2026-11-07 15:34 | `src/content/schemas.ts`: CourseProduct, CourseRun, Event, Person, OrganizationRelationship, Achievement, FAQ; `published`/`verified` flags with fail-safe `verified: false`; run rules (sorted, on weekday, breaks, trial within run); no "offizieller Partner" |
| 2026-11-07 15:35 | `src/config/enquiry.ts` (Anliegen keys + `enquiryHref`); `src/lib/status.ts` (run status + overrides, trial bookable, event phase, registration open, visibility, consent-filtered gallery, dated FAQs) → 42 tests at fixed dates |
| 2026-11-07 15:36 | Seed YAML: 3 products, 1 run (§4.2), 6 events, 5 organizations, 5 achievements, 10 FAQs, 0 people; `src/content.config.ts`; `astro sync` passes |
| 2026-11-07 15:37 | `src/content/seed.test.ts`: seeds parsed with the build schemas, cross-references, §4.2 facts, unconfirmed items unverified, banned terms, schema rejections → 130/130 total |
| 2026-11-07 15:37 | `.github/workflows/daily-rebuild.yml` (Vercel deploy hook, needs a secret); `src/content/people/.gitkeep` so the folder exists in CI |
| 2026-11-07 15:38 | Fixed lint (`preserve-caught-error`) and Prettier on 2 files; `make check` green; build rejects a wrong weekday with a readable message (tested, file restored) |

- **Test results:** unit 130/130 (dates 19, status 42, seed 49, tokens 17, contrast 3); e2e 14 passed / 6 skipped; lint, format, astro check (0 errors, 0 hints) and build green.
- **Expected warning:** `No files found matching "*.yaml" in "src/content/people"` until the owner supplies team members.
- **Not committed** (waiting for the user).
- **Next:** Phase 3 — Wochenendkurs page, Kontakt form, Startseite.
