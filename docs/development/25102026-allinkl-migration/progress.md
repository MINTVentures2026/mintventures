# Progress: All-Inkl migration

## 2026-10-25 20:32 — Session start
- Plan created. Starting Phase 1 (`.htaccess`).

## 2026-10-25 20:34 — Phase 1 done
- `public/.htaccess` written; 25/25 local Apache assertions + staging-auth layout test pass.

## 2026-10-25 20:36 — Phase 2 done
- `scripts/deploy.sh` written; T1–T8 pass against local FTPS server. Fixed basename bug found in testing.

## 2026-10-25 20:39 — Phase 3 done
- `.github/workflows/ci.yml` (check → gated deploy → verify). `verify-deploy.sh` gained `VERIFY_AUTH`, `VERIFY_IP`, `VERIFY_INSECURE`, http→https check.

## 2026-10-25 20:42 — Phase 4 done
- `docs/deployment.md` (how it works + migration runbook, Paths A/B). README + CLAUDE.md updated.
- `make check` green. Local tools installed via Homebrew for testing: `lftp`, `actionlint`, `shellcheck`.
- Next: owner provides KAS access → follow runbook.
