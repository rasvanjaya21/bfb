# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah implementasi siklus penuh fitur Human Behavior Emulation dan `/bfb-prepare`. Semua perubahan di-commit dalam **8 commit**, dipecah per area dan niat, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                                           | File                                                                                                             |
| :----------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `0682f4b`    | `feat(lib): add human click, type, and random delay helpers`                                    | `src/libs/random-delay.ts`, `src/libs/human-type.ts`, `src/libs/human-click.ts`                                  |
| `ddbd819`    | `feat(lib): add inter-row delay to browser row runner`                                          | `src/libs/run-browser-rows.ts`                                                                                   |
| `2836ad7`    | `feat(core): integrate human behavior emulation in post feed and cookie sync`                   | `src/core/facebook.ts`, `src/core/cookie.ts`                                                                     |
| `b230f2a`    | `test(unit): add unit tests for human emulation helpers`                                        | `tests/unit/012-random-delay.test.ts`, `tests/unit/013-human-type.test.ts`, `tests/unit/014-human-click.test.ts` |
| `9fde409`    | `test(integration): add inter-row delay test cases for browser row runner`                      | `tests/integration/005-run-browser-rows.test.ts`                                                                 |
| `a7e5708`    | `docs(agents): document human emulation conventions and update covered files todo`              | `AGENTS.md`, `TODO.md`                                                                                           |
| `1d79d82`    | `chore(graph): update knowledge graph`                                                          | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json`                             |
| (commit ini) | `docs(architecture): record spec, plan, build, test, review, ship, prepare, and commit reports` | `architecture/SPEC.md`, `PLAN.md`, `BUILD.md`, `TEST.md`, `REVIEW.md`, `SHIP.md`, `PREPARE.md`, `COMMIT.md`      |

## Alasan pengelompokan

- `lib` baru sendiri: pembantu delay acak (`random-delay.ts`), ketikan berirama manusiawi (`human-type.ts`), dan pergerakan/klik kursor interpolasi bertahap (`human-click.ts`).
- `lib` runner sendiri: penambahan dukungan cooldown jeda antar baris akun (`interRowDelay`) pada modul runner browser context.
- `core` sendiri: penerapan emulasi interaksi manusiawi pada alur posting feed Facebook (`facebook.ts`) dan sinkronisasi login akun (`cookie.ts`).
- `test(unit)` sendiri: pengujian unit untuk modul helper baru dengan cakupan 100% lines & functions.
- `test(integration)` sendiri: pengujian skenario jeda cooldown akun dan proteksi disconnect pada runner baris.
- `docs(agents)` sendiri: pembaruan konvensi agen di `AGENTS.md` serta pembaruan rasio file yang tercakup dalam laporan test coverage di `TODO.md`.
- `chore(graph)` sendiri: ekstraksi ulang kode ke knowledge graph (924 node, 1342 edge) dan pelabelan ulang 59 komunitas via claude-cli.
- `architecture/` terakhir: seluruh artefak siklus bfb (`SPEC.md`, `PLAN.md`, `BUILD.md`, `TEST.md`, `REVIEW.md`, `SHIP.md`, `PREPARE.md`, `COMMIT.md`).

## Tidak di-commit

Tidak ada. Tidak ada kredensial (`datas/`, `credentials/`, token, cookie), `.env*`, `dist/`, atau file sementara yang di-stage.

## Pre-commit hook

`lint && type-check && check` lolos di setiap commit tanpa `--no-verify`.
