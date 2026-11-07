# MINT Ventures — Website

Website for **MINT Ventures**: robotics and programming courses for children aged 8–14 in Bonn and Sankt Augustin.

Live: https://www.mintventures.de

> **Website 2.0 is in progress** on the `revamp-website` branch. The plan is `docs/development/07112026-website-v2/MINT_Ventures_Website_Plan.md`, and progress is logged next to it.

## Stack

Astro (static output) · TypeScript · Tailwind CSS 4 · Vitest · Playwright + axe

- Every page is plain HTML; JavaScript only adds small enhancements (closing menus with Escape). The site works with JS disabled.
- The Montserrat font is self-hosted (`@fontsource-variable/montserrat`). There are **no third-party requests**: no Google Fonts, Maps, reCAPTCHA or embeds. A browser test enforces this.

## Getting started

Requires Node.js 24 (see `.nvmrc`; `nvm use`) and npm.

```sh
make install       # npm ci
make dev           # http://localhost:8080, hot reload
make preview       # production build on http://localhost:4173
```

Run `make` to list all commands. `make check` runs everything CI runs: lint, format check, type check, unit tests, build and browser tests. Run it before every push. The first time you run the browser tests, install the browsers with `npx playwright install chromium webkit`.

## Project layout

```
src/
  pages/            one file per route (/kurse → pages/kurse.astro)
  layouts/          BaseLayout: <head>, skip link, header, footer, mobile action bar
  components/       Header, Footer, MobileActionBar, Icon
  config/site.ts    contact data, navigation, open owner decisions (e.g. WhatsApp verified?)
  styles/global.css design tokens (colours, font) + base styles
  lib/              small pure helpers, unit-tested next to the source (*.test.ts)
tests/e2e/          Playwright: keyboard, accessibility (axe), no third-party requests
public/             files served as-is (favicons, robots.txt, images)
docs/               URL inventory, development logs
```

## Design tokens

Colours live in `src/styles/global.css` (`@theme`) and are used as Tailwind classes (`bg-brand`, `text-ink`, `bg-accent`, …). `src/styles/tokens.test.ts` checks every text/background pair against WCAG AA, so a colour change that breaks contrast fails the tests.

- `brand` green: headings, header/footer, surfaces; white text on it.
- `accent` yellow: the primary call-to-action button only, always with dark text.
- `step-*`: only for the five-step learning graphic.

## Deployment

Hosted on **Vercel**, deployed from GitHub: pushes to `main` go to production, other branches get preview URLs. `vercel.json` sets:

- **Clean URLs:** `/kurse` is served from `kurse.html`, without a trailing slash. Unknown paths return a real 404 (`src/pages/404.astro`).
- **Security headers:** CSP, nosniff, Referrer-Policy and Permissions-Policy. The CSP allows only same-origin resources and no inline scripts. Astro is configured never to inline scripts, so keep it that way, and add any new external host to the CSP explicitly.
