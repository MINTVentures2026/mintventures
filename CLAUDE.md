# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Website for **MINT Ventures** (mintventures.de): robotics and programming courses for children aged 8–14 in Bonn/Sankt Augustin. Website 2.0 is being built on the `revamp-website` branch, replacing the old single-page Vite/React site (still live on `main`). Lovable is no longer used.

**The plan is binding:** `docs/development/07112026-website-v2/MINT_Ventures_Website_Plan.md`. Work through its phases in order, and stop after each phase for review. Read the `task_plan.md`, `findings.md` and `progress.md` next to it before starting. Log progress in `progress.md` with timestamps to the minute (`date "+%Y-%m-%d %H:%M"`).

Hard content rules from the plan (§1):

- Copy is German and addresses parents as "Sie".
- Never render `VERIFY` or `DECIDE` items. Banned product names and old claims must not appear (§1 rules 2–3).
- No third-party requests.

## Commands

Node 24 is required (`.nvmrc`; it is the nvm default and the only nvm-installed version. Astro 7 refuses Node < 22.23). `make` lists the targets, and `make check` runs everything CI runs.

```sh
npm run dev            # astro dev on :8080
npm run build          # static build -> dist/
npm run typecheck      # astro check
npm run lint           # eslint incl. jsx-a11y rules for .astro
npm run format:check   # prettier
npm test               # vitest (src/**/*.test.ts)
npx vitest run src/lib/contrast.test.ts   # single file
npm run test:e2e       # playwright: builds, serves :4173, runs iPhone (webkit) + desktop (chromium)
npx playwright test -g "skip link" --project=desktop
```

`astro preview` sends itself to the background when it detects an agent. Pass `--ignore-lock` to keep it in the foreground (the Playwright config already does), and use `npx astro preview stop` to clean up.

## Architecture

- **Astro static output**: `build.format: "file"` plus `vercel.json` `cleanUrls`/`trailingSlash: false`, so `/kurse` is served from `kurse.html`. Pages live in `src/pages/`, and every page uses `src/layouts/BaseLayout.astro` (head, skip link, Header, Footer, MobileActionBar).
- **CSP** (`vercel.json`) is `script-src 'self'`, so no inline scripts are allowed. `vite.build.assetsInlineLimit: 0` in `astro.config.mjs` keeps Astro from inlining `<script>` blocks. Do not remove it. JSON-LD is fine.
- **Menus** are `<details>` disclosures, so they work without JS. The script in `Header.astro` only adds closing on Escape or an outside click.
- **Tokens**: `src/styles/global.css` `@theme`. `tokens.test.ts` parses that file and asserts WCAG contrast for every pair in use; add a pair whenever you introduce a new text/background combination. Shared button styles are `@utility btn-primary` / `btn-secondary` (Tailwind 4 needs `@utility`, not `@layer components`, for `@apply` reuse).
- **Site facts and nav**: `src/config/site.ts`. Open owner decisions are flagged there (`whatsapp.verified`, `legalOperator: null` is not rendered).
- **WebKit Tab**: in WebKit, Tab skips links; e2e tests press `Alt+Tab` on webkit.

## Deployment (Vercel)

Pushes to `main` deploy to production; branches get preview URLs. Every route is a real file, so no rewrites are needed. Unknown paths are served `404.html`. A new external host (font, image, embed) needs a CSP entry. Avoid adding one anyway (plan §1 rule 5).
