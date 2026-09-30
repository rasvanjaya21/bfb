# Commit log

Ditulis lewat `/bfb-commit` pada 2026-09-30. Putaran ketiga: perbaikan item `TODO.md` setelah `/bfb-ship`. Semua perubahan sejak `fd178cb` di-commit dalam **16 commit**, dipecah per niat, tanpa trailer co-author, ditandatangani SSH. Belum di-push.

## Commit

| Hash         | Pesan                                                                            | File                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `640cb5f`    | `feat(package): update dependencies and override vulnerable transitive packages` | `bun.lock`, `package.json`                                                                                                                            |
| `fbef430`    | `feat(package): require bun 1.3.9 through engines`                               | `package.json`                                                                                                                                        |
| `3884455`    | `feat(docs): regenerate offline docs for updated dependency versions`            | `docs/` (3 file)                                                                                                                                      |
| `a7e813a`    | `feat(config): add per file coverage threshold`                                  | `bunfig.toml`                                                                                                                                         |
| `9330161`    | `feat(workflow): run tests with coverage threshold in ci`                        | `.github/workflows/ci.yml`                                                                                                                            |
| `b88731b`    | `feat(lib): trim activation input and cache activation per token`                | `src/libs/activate-bfb.ts`, `src/libs/check-activation.ts`, `tests/endpoint/001-activation-api.test.ts`, `tests/integration/004-activate-bfb.test.ts` |
| `bdf7ad8`    | `feat(lib): reject blank uid when saving cookies`                                | `src/libs/save-cookies.ts`, `tests/integration/002-cookie-store.test.ts`                                                                              |
| `2a3c285`    | `feat(core): check password field focus before typing`                           | `src/core/cookie.ts`, `src/libs/ensure-password-focus.ts`, `tests/unit/007-password-focus.test.ts`                                                    |
| `d34c09d`    | `feat(src): translate cli messages to indonesian`                                | `src/commands/help.ts`, `src/commands/menu.ts`, `src/index.ts`                                                                                        |
| `f3e1573`    | `feat(test): cover runner failures and init project overwrites`                  | `tests/integration/003-init-project.test.ts`, `tests/integration/005-run-browser-rows.test.ts`                                                        |
| `18923a2`    | `feat(mcp): pin mcp-remote version`                                              | `.mcp.json`                                                                                                                                           |
| `68fd509`    | `feat(skill): label graph communities with claude cli in prepare`                | `skills/bfb-prepare/SKILL.md`                                                                                                                         |
| `279dc3d`    | `docs(agents): update agents guide and todo`                                     | `AGENTS.md`, `TODO.md`                                                                                                                                |
| `a4eb0e3`    | `docs(project): add bun version, windows note, and pinned mcp-remote`            | `README.md`                                                                                                                                           |
| `bc37bba`    | `chore(graph): update knowledge graph with claude cli labels`                    | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json`                                                                  |
| (commit ini) | `docs(architecture): update review, spec, test report, and commit log`           | `architecture/REVIEW.md`, `architecture/SPEC.md`, `architecture/TEST.md`, `architecture/COMMIT.md`                                                    |

## Pengelompokan

- **`package.json` berisi dua niat** dan di-stage bertahap: update dependency + `overrides` untuk dependency transitif yang rentan (bersama `bun.lock`), lalu `engines` di commit sendiri.
- **Kode dan test-nya digabung per perilaku** (aktivasi, UID kosong, fokus password), karena test-nya membuktikan perilaku itu. Test yang hanya menambah cakupan untuk perilaku lama (`runBrowserRows`, `initProject`) di commit `feat(test)` sendiri.
- **`bunfig.toml` dan `ci.yml` dipisah**: ambang coverage (config) dulu, lalu CI yang memakainya (workflow).
- **`docs/`** dibuat ulang oleh `bun run docs` karena versi `puppeteer-core`, `@puppeteer/browsers`, dan `bunup` naik.
- **`architecture/REVIEW.md`**: tabel Nit rusak sejak commit sebelumnya (`|| true` tanpa escape di dalam sel tabel memecah kolom saat diformat prettier). Tabel ditulis ulang dengan pipe di-escape; semua tabel markdown di repo sudah dicek konsisten jumlah kolomnya.

## Sengaja tidak di-commit

Tidak ada. `graphify-out/2026-09-30/` (backup yang dibuat `graphify label`), cache graphify, `dist/`, dan `workspaces/` di-gitignore.

## Pre-commit hook

`.githooks/pre-commit` lolos di setiap commit, tanpa Node dan tanpa `--no-verify`.
