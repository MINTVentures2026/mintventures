# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing landing page for **MINT Ventures** (mintventures.de): robotics and programming courses for kids in Bonn. It's a single-page React site plus two legal pages (`/impressum`, `/datenschutz`). The content is German-first, with an English toggle.

The project is edited with **Lovable**. Most commits come from `gpt-engineer-app[bot]`, and changes pushed here sync back to Lovable, so expect Lovable to edit the same files. **Hosting is Vercel**, not Lovable publish: pushes to `main` deploy to production.

The site is being prepared for a revamp. Work logs, decisions and open todos live in `docs/development/<DDMMYYYY>-<topic>/` (`task_plan.md`, `findings.md`, `progress.md`). Read the latest folder before starting related work.

## Commands

`make` wraps the essentials. Run `make` to list them. `make check` runs lint, typecheck, test and build; `make preview` serves the production build on :4173; `make verify URL=...` smoke-tests a deployment.

```sh
npm ci                # install (package-lock.json is the only lockfile)
npm run dev           # Vite dev server on port 8080
npm run build         # production build -> dist/
npm run lint          # eslint
npm test              # vitest run (jsdom, globals, setup in src/test/setup.ts)
npx vitest run src/path/to/file.test.tsx   # single test file
npx vitest run -t "test name"              # single test by name
```

Tests live at `src/**/*.{test,spec}.{ts,tsx}`. Right now there is only a placeholder test.

## Architecture

- **Stack:** Vite + React 18 + TypeScript, Tailwind, and react-router. The `@/` alias maps to `src/`. From shadcn/ui only `ui/accordion.tsx` is kept (unused components were removed). Add more with `npx shadcn@latest add <name>` (configured in `components.json`).
- **Fonts** are self-hosted via `@fontsource-variable/nunito` (imported in `main.tsx`). Don't add Google Fonts or other third-party CDN requests: for a German site, they're a GDPR problem unless they're disclosed and consented to.
- **Page composition:** `src/pages/Index.tsx` stacks the section components from `src/components/` in order. Navbar links use `/#section-id` hashes, and `Index` scrolls to them on load, so section `id` attributes are part of navigation. Keep them in sync with `Navbar`/`Footer` links.
- **i18n:** there is no i18n library. `src/contexts/LanguageContext.tsx` provides `useLang()`, which returns `{ lang, setLang, t }`, and `t(de, en)` picks one of two inline strings. Every user-facing string is written inline as `t("German", "English")`. German is the default and the primary language. The language state is not persisted or reflected in the URL.
- **Contact:** `ContactSection` uses a prefilled `mailto:` link. It does not submit a form to a backend.
- **No backend.** Supabase was removed from the repo on 2026-10-25 because it was unused and insecure (see `docs/development/25102026-cleanup-security/`). If the revamp needs a contact form backend, escape all user input in emails, validate and limit input lengths, and restrict CORS.
- **Images:** the hero and gallery images are served from `public/images/` by absolute path (`/images/...`). `src/assets/` only holds the logo, which is imported by `Navbar`.

## Deployment (Vercel)

- `vercel.json` rewrites only the **known** client routes (`/impressum`, `/datenschutz`) to `index.html`, so unknown paths stay real 404s. When you add a route in `App.tsx`, add a rewrite and a sitemap entry; otherwise a direct visit returns a 404.
- `vercel.json` also sets a strict CSP that only allows same-origin resources. Any new external script, font, image host or embed needs a matching CSP entry.
- `scripts/verify-deploy.sh [url]` smoke-tests a deployment. Run `npm run build` first so it can compare bundle hashes.

## SEO

SEO is handled statically, outside React:
- `index.html` holds the `<title>`, meta and OG tags, the canonical URL, and two JSON-LD blocks (business/organization data).
- `public/sitemap.xml` and `public/robots.txt` are maintained separately.

When you add routes, change the business address, or change the main messaging, update these files by hand, because nothing generates them.
