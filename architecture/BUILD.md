# Build log: audit log

Ditulis lewat `/bfb-build` pada 2026-10-01. Serah terima untuk task berikutnya di `architecture/PLAN.md` ("Implementation Plan: audit log"). Belum di-commit; commit lewat `/bfb-commit`.

## Task 1: Format satu baris audit — selesai

- **Diimplementasikan:** `src/libs/format-audit-line.ts` mengekspor `formatAuditLine(entry, offsetMinutes?)` beserta tipe `AuditEntry` dan `AuditResult` (sembilan hasil dari spec). Offset default dari zona waktu mesin pada tanggal itu; test menyuntikkan offset supaya tidak bergantung pada `TZ` mesin CI. Sumber dirata kanan ke 7 karakter (`MENU 1 `, `MENU 97`, `SESI   `). Baris baru jadi spasi, dan setiap `|` di dalam sumber, aksi, atau keterangan (beserta spasi di sekitarnya) jadi `/` — sedikit lebih ketat dari spec, yang hanya menyebut `|`, supaya `a|b` juga tidak terbaca sebagai pemisah.
- **Dibuktikan oleh:** `tests/unit/008-format-audit-line.test.ts` (6 test): format lengkap, tanpa keterangan dan keterangan kosong, rata sumber, offset +05:30 / -08:00 (ganti tanggal) / -03:30, default zona waktu mesin, satu kejadian satu baris. Merah dulu (modul belum ada), lalu 4 mutasi semua tertangkap: keterangan tidak dibersihkan, sumber tidak dirata, tanda offset selalu `+`, keterangan kosong tetap ditulis.
- **Hasil:** `test:coverage` 111 pass, 100% / 100%; `type-check`, `lint`, `check`, `format` exit 0. `build` tidak dijalankan (task tidak menyentuh entry point, config, atau dependency).
- **Ditunda:** belum ada yang memanggil `formatAuditLine`; penulis file di Task 2.

## Task 2: Penulis `logs/audit.log` — selesai

- **Diimplementasikan:** `src/libs/write-audit-log.ts` mengekspor `createAuditLogger(source, state?)` → `(action, result, note?) => Promise<void>`, serta tipe `AuditLogger` dan `AuditState`. Setiap kejadian satu `appendFile` (tanpa buffer). `logs/` dibuat `0700` dan file `0600` saat pertama kali ditulis; kalau `mkdir` benar-benar membuat folder, `logs/` ditambahkan ke `.gitignore`. Gagal tulis ditangkap: satu peringatan kuning `Log audit gagal ditulis, bfb lanjut tanpa log`, lalu `state.disabled = true` dan logger berikutnya langsung kembali. Status default dibagi satu sesi (objek modul); test memberi objek sendiri.
- **Refactor terpisah:** `ignoreSecrets` dipindah dari `init-project.ts` ke `src/libs/ignore-secrets.ts` dengan daftar folder sebagai parameter, supaya dipakai init dan penulis log. Perilaku init tidak berubah di commit ini (test `003-init-project` tetap hijau tanpa diubah).
- **Dibuktikan oleh:** `tests/integration/008-write-audit-log.test.ts` (8 test): dibuat otomatis di folder yang belum di-init, mode `0700`/`0600`, append tanpa menimpa, `.gitignore` saat folder dibuat dan tidak disentuh kalau `logs/` sudah ada, gagal tulis tidak melempar + satu peringatan + berhenti mencoba, status nonaktif dihormati, status dibagi per sesi. Merah dulu, lalu 7 mutasi semua tertangkap.
- **Catatan:** test "shares one session state by default" menonaktifkan status sesi modul untuk sisa proses test. Test lain yang memakai logger default di proses yang sama harus memberi `state` sendiri.

## Task 3: Menu 0 membuat `logs/audit.log` — selesai

- **Diimplementasikan:** `initProject` membuat `logs/` (`0700`, dikencangkan kalau sudah ada) dan `audit.log` kosong (`0600`) lewat `writeIfMissing`, sehingga log yang sudah berisi tidak pernah dikosongkan; `.gitignore` mendapat `logs/`. `checkInit` tidak berubah.
- **Dibuktikan oleh:** `tests/integration/003-init-project.test.ts` diperluas (11 test): `audit.log` kosong dibuat, folder yang di-init sebelum ada `logs/` tetap "Siap", mode, `.gitignore` dengan `logs/`, dan `audit.log` berisi tidak ditimpa init ulang. 6 test merah dulu, lalu 4 mutasi tertangkap.

## Checkpoint Fondasi — lolos

- `format`, `lint`, `type-check`, `check`, `test:coverage` (121 pass, 100%), `build` exit 0.
- Build production di folder kosong, menu 0 lalu 99 lewat stdin: `datas/`, `credentials/`, `logs/` `700`; `logs/audit.log` `600`, 0 byte; `.gitignore` = `datas/`, `credentials/`, `logs/`.

## Berikutnya

Task 4: `activateBfb` dan `downloadDriver` mengembalikan `{ ok, message }`.

---

# Build sebelumnya: menutup spec as-built

Ditulis lewat `/bfb-build` pada 2026-09-30.

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

- ~~`src/commands/menu.ts` memakai nama variabel `isInitilized` (typo)~~ — sudah diperbaiki setelah `/bfb-review`.
