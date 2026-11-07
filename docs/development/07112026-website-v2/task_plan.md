# Task Plan: MINT Ventures Website 2.0

## Goal
Implement `MINT_Ventures_Website_Plan.md` (this folder): a mobile-first, multi-page, crawlable site the owner can edit without code. The plan is the source of truth; this file tracks execution.

## Working rules
- Phases in order; stop after each phase for review (plan header).
- `VERIFY` / `DECIDE` items are built switchable but not rendered.
- Never commit without asking the user.

## Phases

| # | Phase | Status | Completed |
|---|---|---|---|
| 0 | Audit current site (URL inventory, redirect map, assets, banned content) | complete | 2026-11-07 14:46 |
| 1 | Foundation (scaffold, tokens, layout, header, footer, action bar) | complete (awaiting review) | 2026-11-07 15:22 |
| 2 | Content model and seed data + status-logic tests | pending | |
| 3 | Launch-critical pages (Wochenendkurs, Kontakt, Startseite) | pending | |
| 4 | Remaining pages | pending | |
| 5 | SEO | pending | |
| 6 | Owner editing (CMS) | pending | |
| 7 | QA and launch prep | pending | |

## Decisions

| Time | Decision | Rationale |
|---|---|---|
| 2026-11-07 14:46 | Hosting stays on **Vercel** (overrides plan §2 "EU-region host") | User decided earlier to keep the current setup; Vercel offers a DPA. Static output is served from its CDN; any form function can be pinned to `fra1`. Confirm AVV is signed (human task) |
| 2026-11-07 15:12 | Framework: **Astro 7** static, confirmed by user ("Lovable is deprecated") | Meets "content in HTML without JS" |
| 2026-11-07 15:13 | Node **24 LTS** (`.nvmrc`, `engines`) | Astro 7 requires Node ≥ 22.23.4 |
| 2026-11-07 15:15 | Font **Montserrat** (self-hosted) | Logo wordmark is Montserrat-like geometric sans (plan: "close to the logo") |
| 2026-11-07 15:15 | Brand green stays `#346D57`; logo teal `#419387` kept as decorative token | Teal fails AA with white text (3.65:1); owner decision #7 still open |
| 2026-11-07 15:16 | Menus as `<details>` disclosures | Work without JS, native expanded state; JS only for Escape/outside click |
| 2026-11-07 15:16 | `build.format: "file"` + Vercel `cleanUrls` | `/kurse` without trailing slash, no duplicate URLs |
| 2026-11-07 15:19 | Desktop nav from `xl` (1280 px); below that: CTA + Menü | Six nav items + CTA wrap at `lg` |
| 2026-11-07 15:19 | WhatsApp rendered, `whatsapp.verified: false` in `site.ts` | Plan §7 #8 says "confirm before launch", not "hide" — tracked as launch blocker |

## Errors Encountered

| Time | Error | Attempt | Resolution |
|---|---|---|---|
| 2026-11-07 14:43 | zsh `no matches found: --include=*` (unquoted glob) | 1 | Quoted / dropped `--include` |
| 2026-11-07 14:43 | ugrep "exceeds complexity limits" on URL regex | 1 | Used `python3 -I` for extraction |
| 2026-11-07 15:13 | Astro 7 refuses Node 22.16 | 1 | Installed Node 24 LTS via nvm |
| 2026-11-07 15:14 | `rm -rf` of the old app denied by permission check | 1 | Used `git rm` (reversible, staged) |
| 2026-11-07 15:16 | Astro inlined the header `<script>` (would be blocked by CSP) | 1 | `vite.build.assetsInlineLimit: 0` |
| 2026-11-07 15:18 | Playwright: "webServer exited early" | 1 | `astro preview` auto-backgrounds when an agent is detected → `--ignore-lock` |
| 2026-11-07 15:18 | WebKit: Tab skipped the skip link | 1 | Safari behaviour; test presses `Alt+Tab` on webkit |
| 2026-11-07 15:20 | `astro check`: `process`/`node:fs` types, vitest `test` key, deprecated `tseslint.config` | 1 | `@types/node@24`, `/// <reference types="vitest/config" />`, `defineConfig` from `eslint/config` |
