# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-09-30, sebelum `/bfb-commit`.

## 1. TODO.md

- Setiap temuan dicek ulang terhadap kode; tidak ada yang selesai sejak `/bfb-review`.
- Ditambahkan saat `/bfb-review`: teks bahasa Inggris lama (`index.ts`, `menu.ts`, `help.ts`), `resetActivationCache` yang diekspor hanya untuk test, dan cek auth `bun publish --dry-run` di CI.

## 2. Memory Claude ↔ Antigravity

Dilewati: Knowledge Items Antigravity kosong, tidak ada yang perlu diselaraskan. Koreksi user di sesi ini sudah ada di memory Claude (struktur `tests/`) atau dipindah ke repo (jeda menu).

## 3–4. Usang dan sisa debug

- Tidak ada sisa debug (`debugger`, `console.debug/dir`, `.only`/`.skip`); `temp/` kosong.
- Rujukan `test/` yang tersisa hanya catatan sejarah di `architecture/TEST.md` dan frasa generik di `# Method` vendored.
- `src/ignore/index.ts` dan `src/libs/asset-checker.ts` masih tidak dipakai; keputusan hapus/rencana ada di `TODO.md`.

## 5–6. Docs dan skills

- `AGENTS.md`: jeda 1 detik di menu dicatat sebagai **disengaja oleh user**, jangan dihapus atau dipercepat.
- Versi di header keempat file `docs/` masih cocok dengan `.bumrc` dan `bun.lock`; `bun run docs` tidak perlu dijalankan.
- Skill sudah disesuaikan saat `/bfb-review` (runner per-context di `bfb-build` dan `bfb-review`, struktur `tests/` di `bfb-test` dan `bfb-prepare`).

## 7. Pengetahuan

Koreksi user sesi ini: struktur `tests/unit|integration|endpoint` dengan nomor mulai `001` per folder (memory + `AGENTS.md` + `bfb-test`), jeda menu disengaja (`AGENTS.md`), `.gitignore` repo sudah dicakup `workspaces` (keputusan dibatalkan di tempat).

## 8. Formatter, linter, test, build

| Perintah             | Hasil                      |
| -------------------- | -------------------------- |
| `bun run format`     | exit 0                     |
| `bun run lint`       | exit 0, 0 warning, 0 error |
| `bun run type-check` | exit 0                     |
| `bun run check`      | exit 0                     |
| `bun run test`       | exit 0, 86 pass, 0 fail    |
| `bun run build`      | exit 0                     |

## 9. Graphify

739 node, 878 edge, 37 komunitas, semuanya diberi nama (mis. "Otomasi Browser per Akun", "Menu, Aktivasi, dan Input Rahasia", "Entry dan Argumen CLI"). Catatan: contoh import di dalam string di `tests/unit/006-relative-import-check.test.ts` ikut terbaca graphify sebagai node hantu (`./e`); hanya noise di graph.

## Berikutnya

`/bfb-commit`.
