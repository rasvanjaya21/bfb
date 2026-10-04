# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah rilis v0.5.0 dan `/bfb-prepare`. Semua perubahan sejak `bf1abd5` di-commit dalam **5 commit**, dipecah per area, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                           | File                                                       |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `7fa2479`    | `docs(project): restore package readme and move agent tooling to contributing`  | `README.md`, `CONTRIBUTING.md`                             |
| `9043846`    | `feat(skill): point prepare docs step to contributing for agent tooling`        | `skills/bfb-prepare/SKILL.md`                              |
| `f0be418`    | `docs(agents): add operator notes from readme and remove resolved release todo` | `AGENTS.md`, `TODO.md`                                     |
| `633c1cd`    | `chore(graph): update knowledge graph`                                          | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json` |
| (commit ini) | `docs(architecture): update prepare and commit log`                             | `architecture/PREPARE.md`, `COMMIT.md`                     |

## Alasan pengelompokan

- `README.md` dan `CONTRIBUTING.md` satu commit: satu pemindahan. "Agent Tooling" keluar dari README (dikembalikan ke isi v0.4.0) dan masuk ke CONTRIBUTING, jadi memisahkannya akan membuat instruksi itu hilang di antara dua commit.
- Skill sendiri: rujukan langkah 5 `bfb-prepare` mengikuti pemindahan di atas.
- `AGENTS.md` dan `TODO.md` satu commit: catatan operator dari README lama, rujukan ke `CONTRIBUTING.md`, dan item `release.yml` yang ditutup setelah rilis v0.5.0.
- Artefak graph sendiri karena generated.
- `architecture/` terakhir karena `COMMIT.md` ikut di commit itu.

## Tidak di-commit

Tidak ada. Tidak ada file di `datas/`, `credentials/`, `.env*`, `dist/`, atau cache `graphify-out/` yang ikut berubah.

## Pre-commit hook

`lint && type-check && check` lolos di semua commit; tanpa `--no-verify`.
