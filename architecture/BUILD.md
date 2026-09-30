# Build log

Ditulis lewat `/bfb-build` pada 2026-09-30. Serah terima untuk task berikutnya di `architecture/PLAN.md`.

## Fase 1 — selesai

Dikerjakan dalam satu putaran (tiga task kecil yang saling lepas), setiap task TDD: test ditulis dan dijalankan merah dulu, baru kode. Tidak di-commit per task; commit lewat `/bfb-commit`.

### Task 1: Parsing argumen CLI bisa dites

- **Implementasi:** `src/libs/parse-args.ts` (`parseArgs(args)` → `menu` | `version` | `help` | `unknown` + flag). `src/index.ts` hanya menjalankan hasilnya. Perilaku sama persis dengan sebelumnya: versi menang atas help kalau keduanya ada, argumen lain dilaporkan sebagai `Unknown flag: '<pertama>'`.
- **Bukti:** `tests/unit/001-parse-args.test.ts` (5 test). Merah sebelum implementasi (modul belum ada). Manual: `-v` → `v0.4.0`, `--bogus` → pesan unknown flag, `help` → pesan help.

### Task 2: Aturan kunci menu bisa dites

- **Implementasi:** `src/libs/menu-access.ts` (`isMenuLocked(choice, status)`). Menu 1 dan 95 terkunci sampai init, driver, dan aktivasi ketiganya siap; menu lain tidak pernah terkunci. `menu.ts` memakai hasilnya; teks "Fitur masih terkunci, setup terlebih dahulu" tidak berubah.
- **Bukti:** `tests/unit/002-menu-access.test.ts` (2 test, semua kombinasi status). Manual: build production di folder kosong, menu 1 → terkunci.

### Task 3: Penyimpanan token aktivasi dites

- **Implementasi:** `activateBfb(readToken?)` menerima pembaca token opsional (default `hideQuestion('Masukkan token: ')`), mengikuti pola `hideQuestion(prompt, stdin, stdout)`. `menu.ts` tetap memanggilnya tanpa argumen.
- **Bukti:** `tests/integration/004-activate-bfb.test.ts` (5 test, ditambah satu lagi di `/bfb-test`): berhasil → `credentials/token.bfb` berisi token server, `0600`, folder `0700`; token kosong, tidak valid (server 500 `{"state":false}`), dan server error → tidak ada file, pesan masing-masing sama seperti sebelumnya. Merah sebelum implementasi (timeout menunggu stdin sungguhan). Manual: menu 97 dengan token salah → "Token tidak valid, aktifasi gagal".
- **Catatan:** setiap test memicu jeda 1 detik di `showResult` (jeda menu disengaja), jadi file ini butuh ±5 detik.

### Checkpoint Fase 1

- `bun run format`, `lint`, `type-check`, `check`, `test` (70 pass, 0 fail), `build`: semua exit 0 tanpa Node.
- Smoke test build production dari folder kerja kosong lewat terminal simulasi: `-v`, flag salah, menu 1 terkunci, menu 97 token salah, menu 99 → sesuai.

## Ditunda

- Fase 2 (Task 4–7) menunggu keputusan user; Fase 3 (Task 8–10) butuh akses di luar lokal. Detail di `architecture/PLAN.md` dan `TODO.md`.

## Noticed but not touching

- `src/commands/menu.ts` masih memakai nama variabel `isInitilized` (typo). Tidak diganti karena di luar scope task; `menu-access` memakai nama yang benar di interface-nya.
