# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah rilis v0.5.1, siklus bilingual Facebook UI, dan `/bfb-prepare`. Semua perubahan di-commit dalam **7 commit**, dipecah per area, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                         | File                                                                                             |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `6bc0a83`    | `feat(lib): add bilingual facebook selectors`                                 | `src/libs/facebook-selectors.ts`                                                                 |
| `a408842`    | `test(unit): add unit tests for facebook selectors`                           | `tests/unit/011-facebook-selectors.test.ts`                                                      |
| `7614289`    | `feat(core): support bilingual selectors in cookie sync and facebook post`    | `src/core/cookie.ts`, `src/core/facebook.ts`                                                     |
| `8c1d7b8`    | `feat(skill): update skill cycle route to 8-stage flow`                       | `skills/bfb-*/SKILL.md` (8 files)                                                                |
| `d62614a`    | `docs(agents): update skill cycle route and coverage todo count`              | `AGENTS.md`, `TODO.md`                                                                           |
| `640549a`    | `chore(graph): update knowledge graph`                                        | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json`                                       |
| (commit ini) | `docs(architecture): record spec, plan, build, review, ship, and commit logs` | `architecture/BUILD.md`, `PLAN.md`, `PREPARE.md`, `REVIEW.md`, `SHIP.md`, `SPEC.md`, `COMMIT.md` |

## Alasan pengelompokan

- `src/libs/facebook-selectors.ts` sendiri: pustaka selektor baru yang modular dan aman untuk `javascript-obfuscator`.
- `tests/unit/011-facebook-selectors.test.ts` sendiri: suite unit test untuk memverifikasi selektor dwibahasa (EN & ID).
- `src/core/cookie.ts` dan `src/core/facebook.ts` satu commit: konsumsi selektor dwibahasa pada alur sinkronisasi cookie dan posting feed.
- Skill satu commit: penyelarasan diagram dan rute alur siklus 8 tahap di seluruh `skills/bfb-*/SKILL.md`.
- `AGENTS.md` dan `TODO.md` satu commit: dokumentasi alur siklus baru dan penyesuaian angka cakupan test.
- Artefak graph sendiri: keluaran machine-generated dari pembaruan graphify dan pelabelan komunitas via Gemini.
- `architecture/` terakhir: seluruh dokumentasi siklus (SPEC, PLAN, BUILD, REVIEW, SHIP, PREPARE, dan COMMIT log).

## Tidak di-commit

Tidak ada. Tidak ada kredensial (`datas/`, `credentials/`, token, cookie), `.env*`, `dist/`, atau file sementara yang di-stage.

## Pre-commit hook

`lint && type-check && check` lolos di setiap commit tanpa `--no-verify`.
