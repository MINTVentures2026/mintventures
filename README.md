# MINT Ventures — Website

Landing page for **MINT Ventures**: robotics and programming courses for kids in Bonn.

Live: https://www.mintventures.de

- `/` — single-page landing site (German by default, English toggle)
- `/impressum` — legal notice
- `/datenschutz` — privacy policy

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · react-router · Vitest

The Nunito font is self-hosted (`@fontsource-variable/nunito`). There are no third-party requests at runtime.

The project is built and maintained with [Lovable](https://lovable.dev). Changes made in Lovable are committed to this repo automatically, and changes pushed here show up in Lovable.

## Getting started

Requires Node.js (LTS) and npm.

```sh
make install       # npm ci
make dev           # http://localhost:8080, hot reload
make preview       # production build on http://localhost:4173
```

Run `make` to list all commands. `make check` runs lint, type check, tests and build. Run it before every push.

The underlying npm scripts:

| Command              | Purpose                          |
| -------------------- | -------------------------------- |
| `npm run dev`        | Dev server with hot reload       |
| `npm run build`      | Production build into `dist/`    |
| `npm run preview`    | Serve the production build       |
| `npm run lint`       | ESLint                           |
| `npm test`           | Run tests once (Vitest)          |
| `npm run test:watch` | Tests in watch mode              |

## Project layout

```
index.html               SEO: <title>, meta/OG tags, canonical, JSON-LD
public/
  images/                hero + gallery photos (referenced as /images/...)
  sitemap.xml, robots.txt
src/
  pages/Index.tsx        landing page = ordered list of section components
  pages/Impressum.tsx    legal pages
  pages/Datenschutz.tsx
  components/            one file per page section (Hero, FAQSection, ...)
  components/ui/         shadcn/ui primitives (add with `npx shadcn@latest add`)
  contexts/LanguageContext.tsx   DE/EN switch
docs/development/        work logs, decisions, open todos
```

## Editing content

**Text.** All copy lives inline in the section components. Each string is written in both languages:

```tsx
const { t } = useLang();
<h2>{t("Warum MINT Ventures?", "Why MINT Ventures?")}</h2>
```

When you change copy, update both the German and the English string.

**Sections.** To add, remove or reorder sections, edit `src/pages/Index.tsx`. The navbar links jump to sections via `/#<id>`, so if you rename a section's `id`, update the links in `Navbar.tsx` and `Footer.tsx` too.

**Images.** Put new files in `public/images/` and reference them as `/images/<file>.jpg`.

**Contact.** The contact section opens a prefilled email to `info@mintventures.de` (`mailto:`). Nothing is stored in a database.

## SEO

None of the SEO metadata is generated, so update it by hand:

- `index.html`: page title, description, Open Graph tags and the JSON-LD business data (address, contact). Keep these in sync with the Impressum.
- `public/sitemap.xml`: add an entry for every new route.

## Deployment

Hosting is moving from Vercel to the **All-Inkl** webspace, deployed by **GitHub Actions**:

- Push to `dev` → https://staging.mintventures.de (password-protected)
- Push to `main` → https://www.mintventures.de

Every push runs `make check` first, and every deploy is verified automatically afterwards. For how it works, the one-time migration steps and rollback, see **[docs/deployment.md](docs/deployment.md)**.

When you add a page, add its route in `src/App.tsx`, `public/.htaccess` (and `vercel.json` until the migration is done) and `public/sitemap.xml`. Otherwise opening it directly returns a 404.

To check any deployment by hand:

```sh
make verify                                       # production
VERIFY_AUTH=preview:<password> make verify URL=https://staging.mintventures.de
```
