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

## Task 4: Aktivasi dan pasang driver mengembalikan hasilnya — selesai

- **Diimplementasikan:** tipe `Outcome { ok, message }` di `src/types/global.ts`. `activateBfb` dan `downloadDriver` mengembalikannya dengan pesan yang sama seperti di layar (tanpa `\n`). `downloadDriver(detect?, installChrome?)` menerima fungsi deteksi platform dan instalasi, dengan default `@puppeteer/browsers`, supaya bisa dites tanpa mengunduh Chrome. Alur layar tidak berubah; pesan "sudah terpasang" sekarang dicetak setelah blok `try`. `runTask` di `menu.ts` menerima task dengan nilai kembalian apa pun (diperlukan agar type-check lolos).
- **Dibuktikan oleh:** `tests/integration/004-activate-bfb.test.ts` (+2: semua hasil beserta pesannya dan tanpa token; gagal simpan) dan `tests/integration/009-download-driver.test.ts` (3 test baru: argumen `install` benar, gagal unduh tidak melempar, platform tidak didukung tidak mengunduh). Merah dulu, lalu 7 mutasi tertangkap (termasuk token dimasukkan ke pesan, `detect` bawaan dipakai, `cacheDir` salah). `download-driver.ts` sekarang ikut coverage (100%).
- **Manual:** `downloadDriver()` sungguhan dengan `HOME` sementara mengunduh dan mengekstrak Chrome 147 dalam 191 detik dan mengembalikan `{ ok: true, message: "Chrome v147.0.7727.101 sudah terpasang" }`; folder sementara dihapus.

## Task 5: Setiap pilihan menu tercatat — selesai

- **Diimplementasikan:** `src/libs/describe-menu.ts` mengekspor `describeMenu(choice)` → `{ source, action }` dan `MENU_LABELS` (sebuah `Map`, supaya `__proto__`/`constructor` tidak pernah cocok). Input tidak valid menjadi `MENU ?` / `Input tidak valid` tanpa nilainya. `menu.ts`: baris `SESI` saat mulai; daftar menu dicetak dari `MENU_LABELS` (output identik); `runTask` menjadi `function runTask<T>` yang mengembalikan `{ value?, error? }`; helper `showAndLog`; menu 0, 2, 3, 4, 96, 97, 98, 99, input tidak valid, dan 1/95 terkunci masing-masing mencatat satu baris; menu 99 menunggu log sebelum `process.exit`. Menu 1/95 yang terbuka belum mencatat (Task 7).
- **Dibuktikan oleh:** `tests/unit/009-describe-menu.test.ts` (2 test: semua label, tujuh input tidak valid termasuk password dan key prototype). Merah dulu, lalu 3 mutasi tertangkap. `menu.ts` tidak tercakup coverage; diverifikasi manual.
- **Manual:** smoke test lewat stdin (2, `abc`, 1, 0, 0, 98, 1, 99) di folder kosong, dari `src/` dan dari build production. Layar dibandingkan dengan rekaman sebelum perubahan: identik kecuali path folder sementara. `audit.log` berisi 9 baris sesuai tabel spec. Menu 96 (driver sudah terpasang) tercatat `sudah siap`. Menu 97 tidak dicoba (tanpa request ke API aktivasi produksi); menunggu cek user.

## Checkpoint: Menu sederhana — disetujui user

- `format`, `lint`, `type-check`, `check`, `test:coverage` (128 pass, 100%), `build` exit 0.
- Review user: disetujui dengan menjalankan `/bfb-build auto` lagi.

## Noticed but not touching

- `check.ts` mengurai semua file dengan `Bun.Transpiler({ loader: 'tsx' })`, sehingga arrow function generik `<T>(...) =>` di file `.ts` gagal diurai (terbaca sebagai JSX) dan `bun run check` serta pre-commit hook gagal. Ditemukan di Task 5 dan dihindari dengan deklarasi `function`. Perbaikan: pilih loader dari ekstensi file (`ts` untuk `.ts`).

## Task 6: `runBrowserRows` melaporkan setiap baris — selesai

- **Diimplementasikan:** `onFailure(message, row)` diganti `onRow(outcome, row)` dengan `RowOutcome = { status: 'done' | 'skipped' | 'failed'; message? }`. Task mengembalikan teks alasan untuk baris yang dilewati (teks kosong tetap dihitung dilewati) atau `undefined` kalau berhasil; `false`/`true` dihapus. Hitungan memakai `result[outcome.status]++`. Context yang gagal ditutup dilaporkan sebagai `failed` kedua untuk baris yang sama, dan hitungannya tidak berubah. `postFeed` mengembalikan `'Masih dalam tahap pengembangan'`; `syncCookies` mengembalikan `'Cookie tidak di simpan'` atau `'Login bermasalah'`. Callback di `facebook.ts`/`cookie.ts` tetap hanya mencetak untuk baris gagal, dengan teks yang sama.
- **Dibuktikan oleh:** `tests/integration/005-run-browser-rows.test.ts` disesuaikan ke `onRow` tanpa melemahkan assertion lama, ditambah 3 test (setiap baris dilaporkan sekali beserta alasan/pesan, gagal tutup context dilaporkan setelah baris itu, alasan kosong tetap dilewati). Merah dulu, lalu 5 mutasi; satu awalnya lolos (`!skipReason`), dan test alasan kosong ditambahkan untuk menangkapnya.
- **Manual A:** harness sementara (`bun test` + `mock.module` untuk `launchBrowser` headless, dihapus setelah dipakai) menjalankan `facebook()` sungguhan dengan 4 baris palsu (cookie palsu, BM, cookie tidak ada, STORY) terhadap salinan `HEAD` dan terhadap kode baru. Layar identik; satu run sempat "Facebook tidak terbuka" (timeout navigasi), dan dua run berikutnya dari kode baru serta satu run ulang `HEAD` membuktikan itu variasi jaringan.

## Task 7: Menu 1 dan 95 mencatat per baris — selesai

- **Diimplementasikan:** `onRow` boleh async dan ditunggu runner, sehingga urutan baris di log sama dengan urutan run. `src/libs/log-row-outcome.ts` memetakan `done/skipped/failed` → `berhasil/dilewati/gagal`. `facebook(log, action)` dan `cookies(readline, log, action)` mencatat data kosong (`dilewati`), `mulai` (jumlah baris, setelah browser terbuka), satu baris per konten/akun (`NO <no> UID <uid>`, pesan gagal sama dengan layar termasuk `Koneksi tertutup`), lalu `selesai`/`dihentikan` dengan ringkasan. `menu.ts` meneruskan logger dan nama aksi, dan mencatat `gagal` + pesan error kalau task melempar (mis. `Driver belum terpasang`).
- **Dibuktikan oleh:** `tests/unit/010-log-row-outcome.test.ts` (2 mutasi tertangkap) dan test async `onRow` di `005` (merah dulu).
- **Manual A:** harness yang sama dengan logger sungguhan: layar identik dengan sebelum Task 6, dan `audit.log` berisi `mulai | 4 baris`, 4 baris per konten, lalu `selesai | 0 berhasil, 2 dilewati, 2 gagal`, cocok dengan ringkasan layar. Offset `+00:00` karena `bun test` memaksa `TZ=UTC`. Build production: menu 1 dan 95 yang terkunci tercatat `terkunci`.
- **Belum:** menu 95 tidak dijalankan headless (butuh login dan jawaban `y/N`); manual B (akun sungguhan) oleh user. Keduanya di `TODO.md`.

## Task 8: Docs dan status spec — selesai

- `AGENTS.md`: `logs/audit.log` di data runtime, alur runtime, konvensi audit log dan `runBrowserRows`/`onRow`, catatan `TZ=UTC` dan larangan file test coba-coba di repo.
- `README.md`: bagian "Audit log" untuk operator.
- `architecture/SPEC.md`: status "dibangun" beserta verifikasi yang masih terbuka.
- `TODO.md`: bug loader TSX `check.ts`, audit log belum dicek di alur sungguhan, dan teks `Workspace project` tanpa `logs/`.

## Setelah build (permintaan user, 2026-10-01)

- **Tanpa jendela `about:blank`:** `launchBrowser` memakai `--no-startup-window` + `waitForInitialPage: false`. Diuji di Chrome headful lewat `xvfb-run`: tanpa halaman awal, Chrome tetap hidup setelah jendela context tiap baris ditutup (3 baris), stealth aktif (`webdriver` false, `chrome` ada, 5 plugin), dan `facebook()` ujung ke ujung dengan 4 baris palsu tetap membuka Facebook di baris 4. Setiap baris tetap membuka jendelanya sendiri (browser context per akun).
- **`check.ts` memilih loader dari ekstensi:** `.ts` diurai dengan loader `ts`, `.tsx` dengan `tsx`. `hasRelativeImport(content, loader = 'ts')`. Dua test baru di `tests/unit/006-relative-import-check.test.ts`, 2 mutasi tertangkap, dan file sementara berisi arrow generik di `src/` lolos `bun run check`.
- **Layar menu:** `Workspace project: datas/, credentials/, logs/` (lihat keputusan 5 di spec).

## Checkpoint: Fitur lengkap — lolos

- `format`, `lint`, `type-check`, `check`, `test:coverage` (133 pass, 100%), `build` exit 0.
- Success criteria spec 1–7 terpenuhi; criterion 4 di akun sungguhan menunggu user.

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
