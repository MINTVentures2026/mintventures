# Findings: Cleanup & security (pre-revamp)

## 2026-10-25 11:00 — Reachability (import graph from `src/main.tsx`)

**Used:** `App.tsx`, `index.css`, `contexts/LanguageContext.tsx`, `pages/*`, section components in `components/*.tsx` (except below), `ui/accordion.tsx`, `lib/utils.ts`.

Also "used" but only as dead providers in `App.tsx` — nothing calls them:
- `QueryClientProvider` (@tanstack/react-query) — no `useQuery` anywhere
- `Toaster` / `Sonner` (+ `ui/toast`, `ui/toaster`, `ui/sonner`, `hooks/use-toast`) — no `toast()` call
- `TooltipProvider` (`ui/tooltip`) — no tooltips

**Unreachable files:**
- `src/App.css` (Vite template leftover)
- `src/components/NavLink.tsx`, `src/components/SocialProof.tsx`
- 48 of 49 `src/components/ui/*` files (everything except `accordion`)
- `src/hooks/use-mobile.tsx`
- `src/assets/*.asset.json` (Lovable CDN manifests; code uses `/images/...` from `public/`)
- `src/assets/hero-illustration.jpg`
- `src/integrations/supabase/*` (generated client; never imported)

**Unused deps after cleanup:** most `@radix-ui/*` (all but accordion), `@hookform/resolvers`, `react-hook-form`, `zod`, `cmdk`, `date-fns`, `react-day-picker`, `embla-carousel-react`, `input-otp`, `react-resizable-panels`, `recharts`, `vaul`, `@tanstack/react-query`, `sonner`, `next-themes`, `@supabase/supabase-js`.
Keep: `tailwindcss-animate` (tailwind plugin; accordion animations).

## 2026-10-25 11:01 — Security / privacy

| # | Severity | Issue | Where |
|---|----------|-------|-------|
| S1 | High (legal) | Google Fonts loaded from Google CDN → visitor IP sent to Google on every page view, not mentioned in Datenschutz. German courts have fined this (LG München I, 2022). | `index.html:34-36` |
| S2 | High (if enabled) | Edge function interpolates user input into email HTML unescaped → HTML injection into mail to info@mintventures.de; no input validation, no rate limit, `CORS: *`, `verify_jwt=false` → anyone can use it as an email relay to that inbox. | `supabase/functions/send-contact-notification/index.ts` |
| S3 | Medium (if deployed) | `contact_requests` is insertable by `anon` with `WITH CHECK (true)` and no length limits → open spam/storage sink. Frontend doesn't use it. | `supabase/migrations/*` |
| S4 | Low | FAQ JSON-LD via `dangerouslySetInnerHTML` + `JSON.stringify`. Content is static, but a `</script>` in any answer would break out. | `src/components/FAQSection.tsx:121` |
| S5 | Info | `.env` is committed. Contains only the Supabase *publishable* key → not a secret, but becomes moot if Supabase is removed. | `.env` |
| S6 | Medium | No CSP / nosniff / Referrer-Policy on prod (only HSTS). Host is Vercel → fixed via `vercel.json`. | — |
| S7 | Info | `NotFound` logs every 404 path to console — noise, not a risk. | `src/pages/NotFound.tsx` |

Checked, nothing found: `target="_blank"` without `rel`, `eval`, `innerHTML` (beyond S4), `window.open`, analytics/trackers.

**Open question:** whether the Supabase project and edge function are actually *deployed*. Removing files from the repo does not drop the remote table or undeploy the function.

## 2026-10-25 11:04 — npm audit after cleanup
- Before: 14 prod vulns (2 moderate, 12 high), mostly via removed deps (zod, recharts, supabase…).
- After cleanup + `npm audit fix`: prod = 6 moderate: `react-router` (fix = v7, breaking) and `postcss-selector-parser` via tailwind (build-time, no fix). Dev-only: `tinypool`/`vitest` (critical, fix = vitest 5), `esbuild`/vite dev server.

## 2026-10-25 11:05 — Visual check
- `/` and `/datenschutz` render as before; font is Nunito from `/assets/nunito-*.woff2`.
- Content issue: Datenschutz §3 talks about a "Kontaktformular"; site only offers mailto.

## 2026-10-25 11:11 — Production (Vercel) check
- Live bundle `index-XT5u4fCz.js` == local build of `9855aed` → prod is current `main`, pre-cleanup.
- **`/impressum` and `/datenschutz` return 404 on direct load** (no SPA rewrite on Vercel). Legally required pages unreachable from search, links and refresh; the sitemap advertises them. Fixed in `vercel.json`.
- Prod loads Google Fonts (expected until deploy).
- Supabase `send-contact-notification` is **live**.
- Previously both `bun.lockb` and `package-lock.json` existed; Vercel picks the package manager from the lockfile. Now only npm.
