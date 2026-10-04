# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah CI run `37184248155` gagal di langkah "Check package contents" (`bun publish --dry-run` meminta auth registry di Bun 1.4.2). Semua perubahan sejak `9d12e3c` di-commit dalam **3 commit**, dipecah per area, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                           | File                                |
| ------------ | ------------------------------------------------------------------------------- | ----------------------------------- |
| `cc5bc17`    | `fix(workflow): check package contents with pm pack instead of publish dry run` | `.github/workflows/ci.yml`          |
| `5c8b245`    | `docs(agents): record publish dry run auth gotcha and update ci todo`           | `AGENTS.md`, `TODO.md`              |
| (commit ini) | `docs(architecture): update ci check in spec and commit log`                    | `architecture/SPEC.md`, `COMMIT.md` |

## Alasan pengelompokan

- `ci.yml` sendiri sebagai `fix`: CI memang rusak (exit 1 di ubuntu/macos/windows), bukan koreksi kode yang baru ditulis.
- `AGENTS.md` dan `TODO.md` satu commit: keduanya mencatat hasil run yang sama (peringatan `bun publish --dry-run`, item TODO CI dipersempit ke `release.yml`).
- `architecture/` terakhir karena `COMMIT.md` ikut di commit itu.

## Tidak di-commit

Tidak ada. Tidak ada file di `datas/`, `credentials/`, `.env*`, `dist/`, atau cache `graphify-out/` yang ikut berubah.

## Pre-commit hook

`lint && type-check && check` lolos di semua commit; tanpa `--no-verify`.
