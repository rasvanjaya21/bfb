# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah `/bfb-prepare`. Semua perubahan sejak `5f02b28` di-commit dalam **4 commit**, dipecah per area, tanpa trailer co-author. Belum di-push, bersama 3 commit perbaikan CI sebelumnya (`cc5bc17`, `5c8b245`, `5f02b28`).

| Hash         | Pesan                                                                      | File                                                       |
| ------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `7ed0192`    | `feat(skill): require green ci before release and update stale references` | `skills/bfb-ship/SKILL.md`, `skills/bfb-test/SKILL.md`     |
| `8202aef`    | `docs(agents): add push protection note and ci runner findings`            | `AGENTS.md`, `TODO.md`                                     |
| `3aac0bc`    | `chore(graph): update knowledge graph`                                     | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json` |
| (commit ini) | `docs(architecture): update prepare and commit log`                        | `architecture/PREPARE.md`, `COMMIT.md`                     |

## Alasan pengelompokan

- Dua skill satu commit: keduanya koreksi bagian bfb yang usang dari prepare yang sama (syarat CI hijau, klaim versi bumpp, `bun pm pack`, rujukan bagian TODO).
- `AGENTS.md` dan `TODO.md` satu commit: keduanya mencatat hasil push dan CI run 2026-10-04 (catatan push protection karena `docs/`, peringatan Node 20 dan Ubuntu 26).
- Artefak graph sendiri karena generated.
- `architecture/` terakhir karena `COMMIT.md` ikut di commit itu.

## Tidak di-commit

Tidak ada. Tidak ada file di `datas/`, `credentials/`, `.env*`, `dist/`, atau cache `graphify-out/` yang ikut berubah.

## Pre-commit hook

`lint && type-check && check` lolos di semua commit; tanpa `--no-verify`.
