# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-01, setelah `/bfb-prepare`. Semua perubahan sejak `bf5090f` di-commit dalam **4 commit**, dipecah per area, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                          | File                                                         |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `31e05ac`    | `feat(skill): add test timezone and scratch file notes`                        | `skills/bfb-test/SKILL.md`                                   |
| `de76f7e`    | `docs(agents): record deliberate networkidle2 and update todo`                 | `AGENTS.md`, `TODO.md`                                       |
| `3d2c26f`    | `chore(graph): update knowledge graph`                                         | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json`   |
| (commit ini) | `docs(architecture): update test report, spec status, prepare, and commit log` | `architecture/TEST.md`, `SPEC.md`, `PREPARE.md`, `COMMIT.md` |

## Alasan pengelompokan

- Skill, instruksi agent (`AGENTS.md` + `TODO.md`), artefak graph, dan dokumen `architecture/` masing-masing satu area dengan satu alasan.
- `AGENTS.md` dan `TODO.md` satu commit: keduanya mencatat hasil uji akun sungguhan 2026-10-01 (keputusan `networkidle2`, item yang ditutup dan ditambah).
- `architecture/` terakhir karena `COMMIT.md` ikut di commit itu.

## Tidak di-commit

Tidak ada. Tidak ada file di `datas/`, `credentials/`, `.env*`, `dist/`, atau cache `graphify-out/` yang ikut berubah.

## Pre-commit hook

`lint && type-check && check` lolos di semua commit; tanpa `--no-verify`.
