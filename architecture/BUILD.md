# Build log: CLI help, bypass (`-b`), dan explicit (`-e`)

Ditulis lewat `/bfb-build auto` pada 2026-10-05. Serah terima untuk "Implementation Plan: CLI help, bypass (`-b`), dan explicit (`-e`)" di `architecture/PLAN.md` dan "Spec fitur: CLI help, bypass, dan explicit" di `architecture/SPEC.md`. Sesuai keputusan user, tidak ada commit per task; commit lewat `/bfb-commit`.

## Task 1: `parseArgs` mengenali `-b`/`--bypass` dan `-e`/`--explicit` — selesai

- **Diimplementasikan:** `src/libs/parse-args.ts` sekarang mengembalikan `bypass` (`menu: '1' | '95'`, `explicit?: number[]`) atau `invalid` (pesan Bahasa Indonesia), selain `menu`/`version`/`help`/`unknown`. Urutan flag bebas; nilai yang diawali `-` dianggap flag berikutnya; NO harus `^[1-9]\d*$`, NO ganda dibuang dengan urutan pertama dipertahankan; flag ganda tidak valid; `version`/`help` tetap menang. `--bypass=1` tetap dilaporkan sebagai flag tidak dikenal.
- **Dibuktikan oleh:** `tests/unit/001-parse-args.test.ts` (14 test, 9 baru): semua baris valid dan tidak valid di tabel spec. Merah dulu (9 gagal), lalu hijau; 100% baris/fungsi.

## Task 2: `selectRows` memilih baris CSV berdasarkan `NO` — selesai

- **Diimplementasikan:** `src/libs/select-rows.ts`: `selectRows(rows, explicit?)` mengembalikan baris yang cocok (urutan CSV, `NO` dibandingkan sebagai angka) dan `missing` (urutan dari `-e`).
- **Dibuktikan oleh:** `tests/unit/015-select-rows.test.ts` (4 test). Merah dulu (modul belum ada), lalu hijau; 100%.

## Task 3: `facebook()` dan `cookies()` menerima `explicit` — selesai

- **Diimplementasikan:** parameter opsional `explicit?: number[]` di `src/core/facebook.ts` dan `src/core/cookie.ts`. Setelah CSV dibaca, `selectRows` dipakai; NO yang tidak ada melempar `NO tidak ditemukan di datas/contents.csv: ...` (atau `accounts.csv`) sebelum `launchBrowser()`. Menu interaktif tidak mengirim parameter, jadi perilakunya tidak berubah.
- **Dibuktikan oleh:** type-check dan seluruh suite; uji nyata di `/home/pinc/Developer/bfb/workspaces/`: `bun ../src/index.ts -b 1 -e 999` dan `-b 95 -e 2,999` berhenti dengan pesan itu, exit 1, tanpa membuka browser, dan tercatat `gagal` di audit log.
- **Ditunda:** cek manual menu interaktif memproses semua baris; menunggu run posting `bfb-observe` selesai supaya tidak ada dua bot di akun yang sama.

## Task 4: `bfb -b <menu> [-e <NO>]` berjalan dari entry CLI sampai keluar — selesai

- **Diimplementasikan:** `src/commands/bypass.ts` (`bypass(menu, explicit)`): mencatat `SESI`, memeriksa init → driver → aktivasi dengan berhenti di syarat pertama yang gagal, `isMenuLocked`, audit log dengan sumber/aksi dari `describeMenu`, menjalankan `facebook()`/`cookies()` dengan readline sendiri lalu menutupnya, dan mengembalikan apakah run berjalan. `src/index.ts` mencetak pesan `invalid` + `Coba 'bfb help' ...` dengan exit 1, dan memberi exit 1 kalau `bypass` mengembalikan false.
- **Dibuktikan oleh:** `tests/integration/007-cli-entry.test.ts`: argumen tidak valid (`-e 2`, `-b`, `-b 2`) exit 1 dengan pesannya; `-b 1 -e 2` di folder temp yang belum di-init mencetak "Fitur masih terkunci, setup terlebih dahulu", exit 1, dan audit log mencatat `SESI` serta `MENU 1 | Rawat facebook | terkunci`. Uji nyata: `xvfb-run bun ../src/index.ts -b 1 -e 118` (akun dengan sesi mati) membuka browser, berhenti dengan "Cookie tidak valid", mencetak ringkasan, dan kembali ke shell dengan exit 0. Build ter-obfuscate (`dist/index.js`) berperilaku sama untuk `help`, `-e 2`, dan `-b 1 -e 999`.
- **Ditunda:** posting sungguhan lewat `-b 1 -e <NO>` dan prompt `Simpan cookie? (y/N)` lewat `-b 95 -e <NO>`; menunggu run posting selesai.

## Task 5: `bfb help` berisi panduan lengkap, README dan AGENTS.md diperbarui — selesai

- **Diimplementasikan:** `src/commands/help.ts` mencetak panduan penggunaan (bukan pengembangan): pemakaian, flag, menu yang bisa di-bypass dan CSV-nya, contoh, catatan prompt `y/N`, daftar menu dari `MENU_LABELS`, syarat setup, file di folder kerja. README (bagian Usage) dan AGENTS.md (struktur `commands/`, alur runtime langkah 6, signature `facebook`/`cookies` di bagian audit log) diperbarui.
- **Dibuktikan oleh:** `tests/integration/007-cli-entry.test.ts` (`help`, `--help`, `-h`: exit 0, memuat flag, contoh, menu, file, `(y/N)`, dan tidak memuat `bun run`).

## Verifikasi akhir

`bun run test:coverage` 189 pass, 0 fail (exit 0); `bun run type-check`, `bun run lint`, `bun run check` bersih; `bun run format` dijalankan; `bun run build` sukses.

## Di luar task

- Atas permintaan user, baris `logs/` yang tertambah otomatis di `.gitignore` (bfb sempat dijalankan di root repo) dihapus; `.gitignore` kembali sama dengan commit terakhir.

---

# Build log: pencegahan deteksi bot Facebook (Human Behavior Emulation)

Ditulis lewat `/bfb-build auto` pada 2026-10-04. Serah terima untuk task berikutnya di `architecture/PLAN.md` ("Implementation Plan: pencegahan deteksi bot Facebook"). Belum di-commit; commit lewat `/bfb-commit`.

## Task 1: Helper jeda acak `src/libs/random-delay.ts` — selesai

- **Diimplementasikan:** `src/libs/random-delay.ts` mengekspor fungsi `randomDelay(minMs, maxMs)` yang mengembalikan Promise<number> durasi tunggu riil dan `randomInt(min, max)` yang menghasilkan integer acak inklusif. Melempar error jika `min > max` atau bernilai negatif.
- **Dibuktikan oleh:** `tests/unit/012-random-delay.test.ts` (6 test): validasi batas rentang integer acak, kasus `min === max`, error saat `min > max` dan input negatif, serta verifikasi jeda asinkron riil. Merah dulu (modul belum ada), lalu hijau.
- **Hasil:** `bun run test:coverage` coverage 100% / 100% pada `random-delay.ts`.

## Task 2: Helper pengetikan humanis `src/libs/human-type.ts` — selesai

- **Diimplementasikan:** `src/libs/human-type.ts` mengekspor `humanType(page, text, options?)` dan tipe `HumanTypeOptions`. Mengetik per karakter menggunakan Puppeteer `page.keyboard.type(char)` dengan jeda acak per karakter (default 40–120ms) dan jeda berpikir alami ekstra pada karakter spasi dan tanda baca (` `, `,`, `.`, `!`, `?`, `;`, `:`, `\n`) sebesar 150–350ms. Zero `page.evaluate()`.
- **Dibuktikan oleh:** `tests/unit/013-human-type.test.ts` (3 test): urutan seluruh karakter diketik utuh, penanganan string kosong tanpa error, dan penggunaan opsi default delay saat opsi tidak disertakan. Merah dulu (modul belum ada), lalu hijau.
- **Hasil:** Coverage 100% / 100% pada `human-type.ts`.

## Task 3: Helper pergerakan kursor dan klik realistis `src/libs/human-click.ts` — selesai

- **Diimplementasikan:** `src/libs/human-click.ts` mengekspor `humanClick(page, handle)`. Mengambil koordinat bounding box elemen via `handle.boundingBox()`. Jika koordinat tersedia: menghitung target acak di 20%–80% lebar dan tinggi elemen, menggerakkan kursor bertahap via `page.mouse.move(x, y, { steps: randomInt(5, 15) })`, jeda hover (100–250ms), tekan (`page.mouse.down()`), jeda tahan (50–120ms), dan lepas (`page.mouse.up()`). Fallback otomatis ke `handle.click()` jika bounding box bernilai null. Zero `page.evaluate()`.
- **Dibuktikan oleh:** `tests/unit/014-human-click.test.ts` (2 test): urutan interaksi mouse move ber-step + hover + down + up dalam batas 20%–80% bounding box, serta verifikasi pemanggilan fallback `handle.click()` saat bounding box null. Merah dulu (modul belum ada), lalu hijau.
- **Hasil:** Coverage 100% / 100% pada `human-click.ts`.

## Checkpoint: Fondasi Helper — lolos

- `bun run test:coverage` (100%), `bun run type-check`, `bun run lint`, `bun run check` hijau.

## Task 4: Cooldown antar-baris di `src/libs/run-browser-rows.ts` — selesai

- **Diimplementasikan:** `src/libs/run-browser-rows.ts` menambahkan parameter `interRowDelay: InterRowDelay = { min: 5000, max: 15000 }` dan tipe `InterRowDelay`. Setelah context akun ditutup dan sebelum baris berikutnya dibuka, jeda acak diaplikasikan jika masih ada baris berikutnya dan browser masih terhubung.
- **Dibuktikan oleh:** `tests/integration/005-run-browser-rows.test.ts` (17 test): seluruh 15 test eksisting berjalan cepat dengan helper `runFast` (0ms delay), ditambah 2 test baru untuk membuktikan jeda cooldown antar baris diaplikasikan (tetapi tidak setelah baris terakhir) dan tidak menunggu bila browser terputus.
- **Hasil:** Coverage 100% / 100% pada `run-browser-rows.ts`.

## Checkpoint: Cooldown Antar-Baris — lolos

- `bun run test:coverage` (100%), `bun run type-check`, `bun run lint`, `bun run check` hijau.

## Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`) — selesai

- **Diimplementasikan:** `src/core/facebook.ts` mengintegrasikan `humanClick` pada caption trigger, next trigger, post preview trigger, dan publish trigger. Penulisan caption menggunakan `humanType` dengan jeda natural. Jeda tetap digantikan `randomDelay` saat menunggu respons modal.
- **Dibuktikan oleh:** Seluruh test suite lolos; type-check, lint, dan relative import check bersih.

## Task 6: Integrasi emulasi humanis di sinkronisasi cookie (`src/core/cookie.ts`) — selesai

- **Diimplementasikan:** `src/core/cookie.ts` mengintegrasikan `humanClick` pada tombol login trigger dan `humanType` pada pengisian password dan UID. Pengetikan password tetap terproteksi via `ensurePasswordFocus`.
- **Dibuktikan oleh:** Seluruh test suite lolos; type-check, lint, dan relative import check bersih.

## Task 7: Build production, verifikasi akhir, dan audit coverage — selesai

- **Diimplementasikan:** Menjalankan build rilis production lewat `bun run build` (bunup + javascript-obfuscator). Bundling dan obfuscation berhasil menghasilkan `dist/index.js` (21.52 KB raw).
- **Dibuktikan oleh:** Uji eksekusi langsung `bun run dist/index.js --version` (v0.5.2) dan `--help` berjalan sukses tanpa syntax/reference error. Seluruh gate pre-commit (`oxlint`, `tsgo`, `check.ts`, `prettier`) dan `bun run test:coverage` (157 pass, 100% coverage garis & fungsi) lulus tanpa error.

---

# Build log: bilingual Facebook UI (Inggris & Indonesia)

Ditulis lewat `/bfb-build` pada 2026-10-04. Serah terima untuk task berikutnya di `architecture/PLAN.md` ("Implementation Plan: bilingual Facebook UI"). Belum di-commit; commit lewat `/bfb-commit`.

## Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts` — selesai

- **Diimplementasikan:** `src/libs/facebook-selectors.ts` mengekspor `facebookSelector(name)` beserta tipe `FacebookSelectorName`. Menyediakan 8 selektor XPath dwibahasa (EN & ID) untuk `captionTrigger`, `createPost`, `nextPost`, `postPreview`, `publishPost`, `loginContinue`, `loginFresh`, dan `forgottenPassword`. Semua kondisi dirangkai dalam satu string XPath polimorfis menggunakan operator boolean `or` dan `contains()`, aman untuk obfuscator tanpa perlu `page.evaluate()`.
- **Dibuktikan oleh:** `tests/unit/011-facebook-selectors.test.ts` (9 test): format awalan `xpath=`, panjang string, kehadiran kata kunci bahasa Inggris dan bahasa Indonesia untuk setiap elemen, dan keberadaan filter `@aria-disabled="true"` pada tombol posting. Merah dulu (modul belum ada), lalu hijau.
- **Hasil:** `bun run test:coverage` 144 pass, coverage 100% / 100% pada semua file di `src/libs/`; `bun run type-check`, `bun run lint`, `bun run check`, `bun run format` exit 0.
- **Checkpoint Fondasi Selektor:** lolos.

## Task 2: Alur sinkronisasi cookie dwibahasa (`src/core/cookie.ts`) — selesai

- **Diimplementasikan:** `src/core/cookie.ts` diperbarui untuk mengimpor dan menggunakan `facebookSelector` pada penentuan `loginSelector` (`loginContinue` untuk cookie kedaluwarsa, `loginFresh` untuk cookie kosong/belum ada) serta `typePasswordSelector` (`forgottenPassword`). Teks hardcoded bahasa Inggris digantikan oleh selektor XPath dwibahasa yang mendukung UI Facebook Inggris dan Indonesia.
- **Dibuktikan oleh:** Seluruh test suite `bun run test:coverage` tetap 100% (144 pass); type-check, lint, dan relative import check lulus tanpa error.

## Task 3: Alur posting feed dwibahasa (`src/core/facebook.ts`) — selesai

- **Diimplementasikan:** `src/core/facebook.ts` diperbarui untuk menggunakan `facebookSelector` pada seluruh titik interaksi UI Facebook: `captionSelector` (`captionTrigger`), `createPostSelector` (`createPost`), `nextPostTrigger` (`nextPost`), `postPreviewSelector` (`postPreview`), dan `postSelector` (`publishPost`). Loop penutupan modal dialog posting via `waitForSelector(..., { hidden: true })` menggunakan selektor XPath dwibahasa untuk createPost dan postPreview.
- **Dibuktikan oleh:** Seluruh test suite `bun run test:coverage` tetap 100% (144 pass); type-check, lint, dan relative import check lulus tanpa error.

## Checkpoint: Core Dwibahasa — lolos

- `bun run test:coverage` 100% pada seluruh file di bawah cakupan test.
- Lint, type-check, check relative import, dan format semua bersih tanpa error.
- Uji interaktif langsung dapat dilakukan oleh operator pada akun referensi nomor 53 di `workspaces/datas/accounts.csv` / `workspaces/datas/contents.csv`.

## Task 4: Build production dan verifikasi akhir — selesai

- **Diimplementasikan:** Menjalankan build rilis production lewat `bun run build` (bunup + javascript-obfuscator). Bundling dan obfuscation berhasil menghasilkan `dist/index.js` (20.64 KB raw).
- **Dibuktikan oleh:** Uji eksekusi langsung `bun run dist/index.js --version` dan `--help` berjalan sukses tanpa syntax/reference error. Seluruh gate pre-commit (`oxlint`, `tsgo`, `check.ts`, `prettier`) lulus 100%.

---

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
