# Commit log

Ditulis lewat `/bfb-commit` pada 2026-09-30. Semua perubahan sejak `f05d14a` (`chore: release v0.4.0`) di-commit dalam **26 commit**, dipecah per niat, tanpa trailer co-author, ditandatangani SSH seperti commit sebelumnya. Belum di-push.

## Commit

| Hash         | Pesan                                                                            | File                                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `4c08b0b`    | `feat(config): migrate to bun only runtime and build target`                     | `.nvmrc`, `bunfig.toml`, `bunup.config.ts`, `tsconfig.json`                                                                                              |
| `9d11a23`    | `feat(package): migrate pre commit hook to native git hooks`                     | `.githooks/pre-commit`, `bun.lock`, `package.json`                                                                                                       |
| `088564f`    | `feat(package): bump constant version together on release`                       | `package.json`                                                                                                                                           |
| `7af8000`    | `feat(package): migrate check.ts to bun import scanner`                          | `check.ts`                                                                                                                                               |
| `4672b82`    | `feat(lib): add owner only secret writes for cookie store`                       | `src/libs/is-reserved-key.ts`, `src/libs/parse-cookie-store.ts`, `src/libs/read-cookies.ts`, `src/libs/save-cookies.ts`, `src/libs/write-secret-file.ts` |
| `cfe7dda`    | `refactor(lib): migrate csv parser to character based parsing`                   | `src/libs/csv-parser.ts`                                                                                                                                 |
| `3faa1fd`    | `feat(lib): implement activation request with timeout and body check`            | `src/libs/activate-bfb.ts`, `src/libs/check-activation.ts`, `src/libs/request-activation.ts`, `src/utils/constant.ts`                                    |
| `ff91e58`    | `fix(lib): handle multi key chunks and esc in hide input`                        | `src/libs/hide-question.ts`                                                                                                                              |
| `0dfadc5`    | `feat(lib): add owner only permissions and gitignore on init`                    | `src/libs/init-project.ts`                                                                                                                               |
| `d4bf7b9`    | `feat(lib): add isolated browser context runner per row`                         | `src/libs/content-status.ts`, `src/libs/launch-browser.ts`, `src/libs/run-browser-rows.ts`                                                               |
| `b880245`    | `refactor(lib): migrate platform detection to puppeteer browsers`                | `src/libs/download-driver.ts`, `src/libs/resolve-platform.ts`                                                                                            |
| `a104a66`    | `fix(lib): clamp invalid duration to zero`                                       | `src/libs/format-duration.ts`                                                                                                                            |
| `d510520`    | `feat(lib): add args parser and menu access rule`                                | `src/libs/menu-access.ts`, `src/libs/parse-args.ts`                                                                                                      |
| `1ff5efa`    | `refactor(core): migrate facebook and cookie rows to isolated contexts`          | `src/core/cookie.ts`, `src/core/facebook.ts`                                                                                                             |
| `a055421`    | `refactor(command): simplify menu screens and hold run summary`                  | `src/commands/menu.ts`                                                                                                                                   |
| `15e47d4`    | `feat(src): parse args via lib and report fatal errors`                          | `src/index.ts`                                                                                                                                           |
| `95adf17`    | `feat(test): add unit integration and endpoint suites`                           | `test/index.test.ts`, `tests/` (13 file)                                                                                                                 |
| `9311614`    | `feat(workflow): pin bun version and add checks to ci`                           | `.github/workflows/ci.yml`                                                                                                                               |
| `312994e`    | `feat(vcs): ignore agent symlinks and keep graphify outputs`                     | `.gitignore`                                                                                                                                             |
| `1ee6523`    | `feat(docs): add offline official docs pinned to stack versions`                 | `docs.ts`, `package.json`, `docs/` (4 file)                                                                                                              |
| `237772d`    | `feat(mcp): add gitmcp servers for bun bunup and puppeteer`                      | `.mcp.json`                                                                                                                                              |
| `a9b310d`    | `feat(skill): add bfb lifecycle commit and prepare skills`                       | `skills/` (8 file)                                                                                                                                       |
| `f4f026d`    | `docs(agents): add agents guide claude entry and todo`                           | `AGENTS.md`, `CLAUDE.md`, `TODO.md`                                                                                                                      |
| `4e68b7e`    | `docs(project): add bun requirement and agent tooling setup`                     | `README.md`                                                                                                                                              |
| `f3b7d8d`    | `chore(graph): generate repository knowledge graph`                              | `.graphifyignore`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json`                                                  |
| (commit ini) | `docs(architecture): add spec plan build test review prepare and commit reports` | `architecture/` (8 file)                                                                                                                                 |

## Pengelompokan

- **Urutan:** konfigurasi dan tooling dulu, lalu `src/libs`, lalu pemakainya (`core`, `command`, `src`), lalu test, CI, dan `.gitignore`, lalu tooling agent dan dokumentasi, dan `architecture/` terakhir.
- **`src/libs` dipecah per niat**, bukan per file: penyimpanan rahasia cookie/token, parser CSV, aktivasi, input tersembunyi, init project, runner browser per-context, deteksi platform, durasi, dan parsing argumen + aturan menu.
- **`fix`** hanya dipakai untuk yang memang rusak di v0.4.0: input token yang menggantung (`hide-question`) dan durasi negatif/NaN (`format-duration`). Sisanya `feat`/`refactor`.
- **`package.json` berisi tiga niat** dan di-stage sebagian ke tiga commit: migrasi hook git (bersama `bun.lock` dan `.githooks/`), versi yang ikut di-bump saat rilis, dan script `docs` (bersama `docs.ts` dan `docs/`).
- **Scope baru** untuk tooling agent, belum pernah ada di log: `test`, `mcp`, `skill`, `agents`, `graph`, `architecture`. Scope lain diambil dari log repo (`config`, `package`, `lib`, `core`, `command`, `src`, `workflow`, `vcs`, `docs`, `project`).
- **Dua niat dalam satu file** yang tidak dipisah: `src/utils/constant.ts` (konstanta aktivasi) ikut commit aktivasi; `tsconfig.json` (tipe Bun + include `tests/`) ikut commit migrasi Bun.

## Sengaja tidak di-commit

- `graphify-out/cache/`, `cost.json`, `manifest.json` — cache graphify, di-gitignore; hanya `GRAPH_REPORT.md`, `graph.html`, `graph.json` yang di-commit.
- `.claude/`, `.agents/` — symlink lokal, di-gitignore; cara membuatnya di `README.md`.
- `dist/`, `node_modules/`, `workspaces/`, `temp/` — di-gitignore.
- Tidak ada `datas/`, `credentials/`, cookie, token, atau `.env` di working tree.

## Pre-commit hook

`.githooks/pre-commit` (`bun run lint && bun run type-check && bun run check`) jalan di setiap commit tanpa Node dan lolos semua; tidak ada `--no-verify`. Hook memeriksa working tree, bukan isi stage, jadi commit perantara tidak dijamin lolos sendiri-sendiri kalau di-checkout satu per satu.
