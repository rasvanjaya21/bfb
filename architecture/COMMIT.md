# Commit log

Ditulis lewat `/bfb-commit` pada 2026-09-30. Putaran kedua, setelah perbaikan dari `/bfb-ship`: semua perubahan sejak `015c257` di-commit dalam **7 commit**, dipecah per niat, tanpa trailer co-author, ditandatangani SSH. Belum di-push (putaran pertama, 26 commit sejak `f05d14a`, juga belum di-push).

## Commit

| Hash         | Pesan                                                                   | File                                                                                 |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `dec4a50`    | `fix(lib): keep stray quotes as text in csv parser`                     | `src/libs/csv-parser.ts`, `tests/integration/001-csv-parser.test.ts`                 |
| `45e766f`    | `feat(core): wait for enabled post button without page evaluate`        | `src/core/facebook.ts`                                                               |
| `9b99e91`    | `refactor(ignore): remove publish button checker broken by obfuscation` | `src/ignore/index.ts`                                                                |
| `f412ca5`    | `feat(workflow): pin actions and isolate publish identity in release`   | `.github/workflows/ci.yml`, `.github/workflows/release.yml`                          |
| `b888bc2`    | `docs(agents): update agents guide and todo after ship review`          | `AGENTS.md`, `TODO.md`                                                               |
| `9de01ba`    | `chore(graph): update repository knowledge graph`                       | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json` |
| (commit ini) | `docs(architecture): add ship decision and commit log`                  | `architecture/SHIP.md`, `architecture/SPEC.md`, `architecture/COMMIT.md`             |

## Pengelompokan

- **`fix(lib)`** untuk parser CSV karena memang rusak (kutip di tengah sel menelan sisa file, regresi dari 0.4.0); test-nya ikut di commit yang sama karena membuktikan perbaikan itu.
- **`feat(core)`** untuk menunggu tombol Post aktif lewat XPath, dan **`refactor(ignore)`** terpisah untuk menghapus `src/ignore/index.ts`: penggantinya dulu, penghapusannya sesudah, supaya setiap commit tetap bisa dibaca sendiri.
- **`feat(workflow)`** menyatukan `release.yml` dan `ci.yml` karena satu niat: action di-pin ke SHA.
- `src/ignore/index.ts` sudah ter-stage sebagai penghapusan sebelum commit, jadi setiap commit dibuat dengan pathspec eksplisit (`git commit -- <path>`) supaya penghapusan itu hanya masuk ke commit `refactor(ignore)`.

## Sengaja tidak di-commit

Tidak ada. Cache graphify, `dist/`, `workspaces/`, `.claude/`, dan `.agents/` tetap di-gitignore; tidak ada `datas/`, `credentials/`, cookie, token, atau `.env` di working tree.

## Pre-commit hook

`.githooks/pre-commit` (`bun run lint && bun run type-check && bun run check`) lolos di setiap commit, tanpa Node dan tanpa `--no-verify`.
