# Progress: Cleanup & security (pre-revamp)

## 2026-10-25 10:59 — Session 1
- Phase 1 discovery: import-graph scan, dependency map, security grep.
- Findings in `findings.md`; plan in `task_plan.md`.
- `node_modules` not installed yet → needs `npm i` before build/lint/test.

## 2026-10-25 11:01 — Baseline
- `npm ci` failed (lockfile drift) → `npm install`.
- Build ✓, tests ✓, lint 4 errors / 8 warnings (3 errors in dead files, 1 in tailwind config).

## 2026-10-25 11:03 — Phase 2 done
- 70 files deleted (incl. supabase/, .env, bun.lockb). `App.tsx` reduced to LanguageProvider + router.
- 35 runtime deps + `@tailwindcss/typography` uninstalled.

## 2026-10-25 11:04 — Phase 3 done
- Fonts self-hosted, JSON-LD escaped, tailwind ESM import, `npm audit fix`.
- Build ✓ (JS 376 kB → 260 kB, CSS 69.5 kB → 26.4 kB), tsc ✓, lint 0 errors / 1 warning, tests ✓.

## 2026-10-25 11:05 — Phase 4
- Headless Chrome screenshots OK. Docs updated. Waiting on user: remote Supabase teardown + commit approval.

## 2026-10-25 11:11 — Vercel
- User: site is on Vercel. Probed prod → found legal-page 404s, missing headers, live edge function.
- Added `vercel.json` + `scripts/verify-deploy.sh`; CSP verified locally; prod run shows 8 expected failures (old deploy).
