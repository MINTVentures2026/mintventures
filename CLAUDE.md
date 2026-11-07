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

Restart `make dev` after adding or renaming a collection in `src/content.config.ts`; a running dev server doesn't pick it up. `astro preview` sends itself to the background when it detects an agent. Pass `--ignore-lock` to keep it in the foreground (the Playwright config already does), and use `npx astro preview stop` to clean up.

## Architecture

- **Astro, prerendered except `/kontakt`**: `src/pages/kontakt.astro` has `prerender = false` and handles the form POST itself (validate → mail → 303 to `/kontakt/danke`, or re-render with errors). Adapter: `@astrojs/vercel` when `VERCEL` is set (Vercel builds), otherwise `@astrojs/node`, so `astro preview` and Playwright run the same page code. The Vercel adapter writes `.vercel/output` (directory-format HTML, its own trailing-slash 308); `vercel.json` adds headers and pins functions to `fra1`. Every page uses `src/layouts/BaseLayout.astro` (head, skip link, Header, Footer, MobileActionBar).
- **Enquiry form**: logic in `src/lib/enquiry.ts` (validation, data minimisation, honeypot + HMAC time trap, mail text) and `src/lib/mailer.ts` (SMTP or `log`). Env vars are typed in `astro.config.mjs` (`astro:env/server`): `SMTP_HOST/PORT/USER/PASS`, `MAIL_TO`, `MAIL_TRANSPORT` (`log` is refused in production), `FORM_SECRET`, `FORM_MIN_SECONDS`. Conditional fields are shown with CSS `:has()`, not JS. Astro's origin check rejects cross-site POSTs (403); curl needs `-H "Sec-Fetch-Site: same-origin"`.
- **Logo**: static `public/images/logo-{180,360}.webp` via `Logo.astro` (generated from `public/images/logo.png`). Don't use `astro:assets` `<Image>` in layout parts: on the on-demand `/kontakt` page it would route through the runtime `/_image` function.
- **CSP** (`vercel.json`) is `script-src 'self'`, so no inline scripts are allowed. `vite.build.assetsInlineLimit: 0` in `astro.config.mjs` keeps Astro from inlining `<script>` blocks. Do not remove it. JSON-LD is fine.
- **Menus** are `<details>` disclosures, so they work without JS. The script in `Header.astro` only adds closing on Escape or an outside click.
- **Tokens**: `src/styles/global.css` `@theme`. `tokens.test.ts` parses that file and asserts WCAG contrast for every pair in use; add a pair whenever you introduce a new text/background combination. Shared button styles are `@utility btn-primary` / `btn-secondary` (Tailwind 4 needs `@utility`, not `@layer components`, for `@apply` reuse).
- **Content** (plan §5): one YAML file per entry in `src/content/<collection>/`; the file name is the id/slug. Schemas live in `src/content/schemas.ts` (shared by `src/content.config.ts` and `seed.test.ts`). Dates are strings in Europe/Berlin (`YYYY-MM`, `YYYY-MM-DD`, `YYYY-MM-DDTHH:mm`) handled by `src/lib/dates.ts`; never use `Date` for calendar logic. Entries default to `verified: false`; render only what `isPublic()` allows. Open owner decisions are `verified: false` or `null` fields with a `# Open decision #n` comment.
- **Status** (plan §5.1): `src/lib/status.ts` holds pure functions of `(entry, today)`. Pages pass `berlinToday()`; `.github/workflows/daily-rebuild.yml` rebuilds nightly via a Vercel deploy hook so date-based states move on their own.
- **Site facts and nav**: `src/config/site.ts`. Open owner decisions are flagged there (`whatsapp.verified`, `legalOperator: null` is not rendered).
- **WebKit Tab**: in WebKit, Tab skips links; e2e tests press `Alt+Tab` on webkit.

## Deployment (Vercel)

Pushes to `main` deploy to production; branches get preview URLs. Every route is a real file, so no rewrites are needed. Unknown paths are served `404.html`. A new external host (font, image, embed) needs a CSP entry. Avoid adding one anyway (plan §1 rule 5).
