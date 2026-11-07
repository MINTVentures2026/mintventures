# Findings: Website 2.0

## 2026-11-07 14:44 — Phase 0 audit
- Live site is a pure client-rendered SPA: three real routes (`/`, `/impressum`, `/datenschutz`), the rest are `/#anchors`. `/en` never existed as a URL. Full map in `docs/url-inventory.md`.
- No Lovable asset routes (`/__l5e/...`) are referenced by the live bundle; all images are already in `public/images/` and `src/assets/logo.png`.
- Banned content found in 6 source files + `index.html` (Bad Godesberg as venue, "kostenlose Probestunde", "Kursstart ab November – … auf Anfrage", Entdecker/Erfinder/Challenge-Stufe/Tüftler). The rewrite drops all of them.
- No GPS in any image; `gallery-robotics-teamwork.jpg` still has EXIF (date, software).
- Apex `mintventures.de` → `www` is a **307** (temporary). Should be 308.

## 2026-11-07 14:45 — Brand colour check (open decision #7)
- Logo PNG histogram: dominant brand colour is **#419387** (teal-green), plus black text. No yellow in the logo.
- The plan's `#346D57` does **not** match the logo file. `#419387` with white text is 3.65:1 (fails AA for body text, passes for ≥ 24 px / bold 18.7 px). `#346D57` with white is 6.05:1. Yellow `#FBB72A` with `#1F1F1F` is 9.35:1; with white 1.76:1 (confirms plan rule: dark text only).
- Proposal: keep `#346D57` as the surface/heading colour for contrast (plan default) and confirm with the owner against print files; `#419387` could be an accent. Yellow `#FBB72A` source unknown (likely flyer).

## 2026-11-07 14:46 — Constraints carried into Phase 1
- Current CSP (`vercel.json`) allows only same-origin scripts/styles/fonts/images; Astro static output fits. JSON-LD is not affected by `script-src`.
- A form that works without JS needs a POST endpoint → a Vercel function (Phase 3). Without an e-mail provider decision, the fallback is prefilled `mailto:` links (plan §2).
- Keystatic with GitHub storage needs server routes (`/keystatic`, `/api/keystatic`) → Astro hybrid output with `@astrojs/vercel` in Phase 6.

## 2026-11-07 15:20 — Phase 1 findings
- **Astro 7** needs Node ≥ 22.23.4. Vercel must build with Node 24 (`engines.node: "24.x"` in `package.json` sets it).
- `astro preview` **auto-backgrounds when it detects an AI agent**. `--ignore-lock` keeps it in the foreground; `npx astro preview stop` cleans up.
- Astro inlines small processed `<script>` blocks by default, which the CSP (`script-src 'self'`) would block. `vite.build.assetsInlineLimit: 0` forces external files.
- Tailwind 4: reusable classes used with `@apply` must be declared with `@utility`, not `@layer components`.
- `eslint-plugin-jsx-a11y` doesn't support ESLint 10; `eslint-plugin-astro` accepts the fork `eslint-plugin-jsx-a11y-x`.
- WebKit (Safari) doesn't move focus to links with Tab by default; use Option+Tab. Real iPhone users don't tab, but keyboard users on macOS Safari need that setting. Nothing to fix in the site.
- Logo PNG is opaque (near-white background), so on the green footer it sits on a white chip. A transparent/SVG logo from the owner would be better (open decision #7).

## 2026-11-07 15:39 — Phase 2 findings
- Astro's YAML loader (`@astrojs/internal-helpers/yaml`) parses with `yaml` + `customTags: ["timestamp"]`: unquoted `2026-11-07` becomes a `Date` at UTC midnight. The schemas normalise it back to a string, and the seed test uses the same parser options.
- **Unknown facts kept out of the data (not guessed):** H-BRS street address, Ort der Begegnung postcode, exact days of the zdi/DIGITAL@School/Roboternacht events (month only), Code Week end time, workshop age range at product level.
- The owner's module name "Junge Erfinder" collides with the banned old stage name "Erfinder"; only "Erfinder-Stufe" is treated as banned. Owner may want to confirm.
- On launch day (today, 07.11.2026) the cohort is already "Läuft", the trial is no longer bookable, the trial FAQ has expired and the Code Week workshop is a recap without text, so it's hidden. The homepage/course page will therefore show "Kurs läuft" + "Nächster Grundlagenkurs: In Planung – voraussichtlich Februar/März 2027" until decision #1/#17 are answered (plan §8).
- Daily rebuild needs a **Vercel Deploy Hook** stored as GitHub secret `VERCEL_DEPLOY_HOOK_URL` (human task).

## 2026-11-07 15:55 — Phase 3 findings
- `@astrojs/vercel` 11 has no `astro preview`; `@astrojs/node` covers local preview/e2e. With the Vercel adapter, Astro writes **directory-format** HTML (`kurse/x/index.html`) regardless of `build.format`, and emits its own trailing-slash 308 route.
- Astro's origin check (`core/app/origin-check.js`): `Sec-Fetch-Site` same-origin/none → allowed, cross-site → 403; without it, `Origin` must equal the URL origin. All current browsers send `Sec-Fetch-Site`.
- `astro:assets` `<Image>` on an on-demand page renders through `/_image` (a function call per image request). Keep images in layout parts static.
- Prod dependency audit stays at 0 only because the adapters are devDependencies: their build-time deps (`@vercel/nft`, `path-to-regexp`, `glob`) carry advisories but don't ship in the function.
- **New open owner decisions:** (a) reply time for the confirmation page ("innerhalb von … Werktagen"); (b) a sender mailbox for the form (e.g. `formular@mintventures.de` at All-Inkl) and its SMTP credentials; (c) Datenschutz text must describe the form (Vercel Function in fra1, SMTP via All-Inkl, retention) — legal review (Phase 4 template).
- The banned-term e2e check includes "Bad Godesberg" for the Phase 3 pages. The Code Week **event** venue is legitimately in Bad Godesberg (it is only banned as course venue), so the Phase 4 event page needs a narrower rule.
