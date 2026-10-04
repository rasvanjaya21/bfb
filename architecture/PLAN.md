# Implementation Plan: CLI help, bypass (`-b`), dan explicit (`-e`)

Ditulis lewat `/bfb-plan` pada 2026-10-05, dari bagian "Spec fitur: CLI help, bypass, dan explicit" di `architecture/SPEC.md`. Tidak menyentuh alur browser, jadi tidak butuh `/bfb-observe`: `-b` menjalankan `facebook()` dan `cookies()` yang sudah ada.

## Overview

`bfb help` menampilkan panduan lengkap sesuai keadaan sekarang. `bfb -b <menu>` / `--bypass <menu>` menjalankan menu `1` (Rawat facebook, `datas/contents.csv`) atau `95` (Sinkronisasi cookies, `datas/accounts.csv`) langsung, tanpa layar menu, untuk semua baris CSV. `-e <NO[,NO...]>` / `--explicit` membatasi ke baris dengan kolom `NO` tertentu (satu atau beberapa, dipisah koma) dan hanya valid bersama `-b`.

Contoh valid: `bfb -b 1`, `bfb -b 95`, `bfb -b 95 -e 1`, `bfb -b 1 -e 2,3,1,99,21`, `bfb --bypass 1 --explicit 2`.
Contoh tidak valid (pesan + exit 1): `bfb -e 2` (tanpa `-b`), `bfb -b` / `bfb -b -e 2,3` (tanpa nomor menu), `bfb -b 2` (menu tidak bisa di-bypass), `bfb -b 1 -e 2,x` (NO bukan angka).

## Architecture Decisions

- Keputusan user (2026-10-05): `-b` wajib diikuti nomor menu; setelah run, bfb langsung keluar (tanpa "Tekan Enter", tanpa menu); NO di `-e` yang tidak ada di CSV ditolak sebelum browser dibuka, sambil menyebut NO-nya.
- Parsing tetap murni di `src/libs/parse-args.ts` (dites unit). `ParsedArgs` mendapat `{ command: 'bypass'; menu: '1' | '95'; explicit?: number[] }` dan `{ command: 'invalid'; message: string }`. `version`/`help` tetap menang atas flag lain, seperti sekarang. Flag yang sama ditulis dua kali tidak valid.
- Pemilihan baris di `src/libs/select-rows.ts` (murni): `selectRows(rows, explicit)` mengembalikan baris yang cocok (urutan CSV) dan daftar NO yang tidak ditemukan. NO ganda di `-e` dihitung sekali.
- `facebook()` dan `cookies()` menerima parameter opsional `explicit?: number[]`. Menu interaktif tidak berubah (tanpa parameter berarti semua baris).
- Alur bypass di `src/commands/bypass.ts`: catat sesi (`SESI`), cek setup dengan urutan `checkInit` → `checkDriver` → `checkActivation` dan berhenti di cek pertama yang gagal (jadi folder yang belum di-init tidak memanggil API aktivasi), pakai `isMenuLocked`, catat ke audit log dengan sumber dan aksi yang sama dengan menu (`describeMenu`), jalankan task, tutup readline, set `process.exitCode`.
- Exit code: 1 untuk argumen tidak valid, setup belum siap, NO tidak ditemukan, atau task melempar error. Run yang selesai keluar dengan 0 walaupun ada baris yang gagal; ringkasan dan audit log yang melaporkannya.
- `-b` tetap butuh terminal untuk prompt `y/N` (simpan cookie, persetujuan privasi cadangan); tidak ada mode non-interaktif.

## Task List

### Phase 1: Fondasi murni

- [x] Task 1: `parseArgs` mengenali `-b`/`--bypass` dan `-e`/`--explicit`
- [x] Task 2: `selectRows` memilih baris CSV berdasarkan `NO`

### Checkpoint: Fondasi

- [x] `bun run test`, `bun run type-check`, `bun run lint`, `bun run check` hijau

### Phase 2: Jalur bypass utuh

- [x] Task 3: `facebook()` dan `cookies()` menerima `explicit`
- [x] Task 4: `bfb -b <menu> [-e <NO>]` berjalan dari entry CLI sampai keluar

### Checkpoint: Bypass

- [x] Semua perintah verifikasi hijau, termasuk `bun run test:coverage`
- [ ] Cek manual Task 3 dan 4 di folder kerja sungguhan (sebagian: `-e 999` untuk menu 1 dan 95, dan `-b 1 -e 118` sampai browser, sudah; posting sungguhan lewat `-b 1 -e <NO>`, prompt `y/N` lewat `-b 95`, dan menu interaktif semua baris menunggu run posting selesai)
- [ ] Review dengan user sebelum lanjut

### Phase 3: Help dan dokumentasi

- [x] Task 5: `bfb help` berisi panduan lengkap, README dan AGENTS.md diperbarui

### Checkpoint: Selesai

- [ ] Semua acceptance criteria terpenuhi, `bun run build` sukses, siap `/bfb-test` dan `/bfb-review`

## Task 1: `parseArgs` mengenali `-b`/`--bypass` dan `-e`/`--explicit`

**Description:** Perluas `parseArgs` supaya mengembalikan `bypass` (menu + daftar NO opsional) atau `invalid` (dengan pesan Bahasa Indonesia) untuk semua kombinasi di Overview, tanpa mengubah perilaku `version`, `help`, `unknown`, dan tanpa argumen.

**Acceptance criteria:**

- [ ] `['-b','1']`, `['--bypass','95']`, `['-b','95','-e','1']`, `['-e','2','-b','1']`, `['-b','1','--explicit','2,3,1,99,21']` menghasilkan `bypass` dengan menu dan NO yang benar (NO ganda dihapus, urutan dipertahankan).
- [ ] `['-e','2']`, `['-b']`, `['-b','-e','2,3']`, `['-b','2']`, `['-b','1','-e']`, `['-b','1','-e','2,x']`, `['-b','1','-e','0']`, `['-b','1','-b','95']` menghasilkan `invalid` dengan pesan yang menyebut masalahnya.
- [ ] Semua test lama di `tests/unit/001-parse-args.test.ts` tetap lulus.

**Verification:**

- [ ] `bun test tests/unit/001-parse-args.test.ts`
- [ ] `bun run type-check`, `bun run lint`

**Dependencies:** None

**Files likely touched:** `src/libs/parse-args.ts`, `tests/unit/001-parse-args.test.ts`

**Estimated scope:** S

## Task 2: `selectRows` memilih baris CSV berdasarkan `NO`

**Description:** Fungsi murni `selectRows<T extends { NO: string }>(rows, explicit?)`: tanpa `explicit` mengembalikan semua baris; dengan `explicit` mengembalikan baris yang `NO`-nya ada di daftar (urutan CSV) beserta NO yang tidak ditemukan.

**Acceptance criteria:**

- [ ] Tanpa `explicit`: semua baris, `missing` kosong.
- [ ] Dengan `explicit`: hanya baris yang cocok, mengikuti urutan CSV; `NO` di CSV dibandingkan sebagai angka (`"07"` cocok dengan `7`).
- [ ] NO yang tidak ada dilaporkan di `missing` sesuai urutan di `-e`.

**Verification:**

- [ ] `bun test tests/unit/015-select-rows.test.ts`
- [ ] `bun run test:coverage` (file baru 100%)

**Dependencies:** None

**Files likely touched:** `src/libs/select-rows.ts`, `tests/unit/015-select-rows.test.ts`

**Estimated scope:** XS

## Task 3: `facebook()` dan `cookies()` menerima `explicit`

**Description:** Kedua fungsi di `core/` memakai `selectRows` setelah membaca CSV. Kalau ada NO yang tidak ditemukan, lempar `Error('NO tidak ditemukan di datas/contents.csv: 99, 120')` (atau `accounts.csv`) sebelum browser dibuka. Pemanggilan dari menu interaktif tidak berubah.

**Acceptance criteria:**

- [ ] Tanpa `explicit`, perilaku menu 1 dan 95 sama persis dengan sekarang.
- [ ] Dengan `explicit`, hanya baris terpilih yang diproses, dan audit log `mulai` menyebut jumlah baris terpilih.
- [ ] NO yang tidak ada menghentikan run sebelum `launchBrowser()` dengan pesan yang menyebut file dan NO-nya.

**Verification:**

- [ ] `bun run test`, `bun run type-check`, `bun run lint`, `bun run check`
- [ ] Manual check (butuh Chrome dan akun sungguhan): di `/home/pinc/Developer/bfb/workspaces/`, jalankan menu 1 lewat menu interaktif dan pastikan semua baris tetap diproses (hentikan setelah 1 baris).

**Dependencies:** Task 2

**Files likely touched:** `src/core/facebook.ts`, `src/core/cookie.ts`

**Estimated scope:** S

## Task 4: `bfb -b <menu> [-e <NO>]` berjalan dari entry CLI sampai keluar

**Description:** Tambah `src/commands/bypass.ts` dan sambungkan di `src/index.ts`. Argumen `invalid` mencetak pesan + `Coba 'bfb help'` lalu exit 1. `bypass` menjalankan alur di Architecture Decisions dan keluar tanpa menahan layar.

**Acceptance criteria:**

- [ ] `bfb -e 2`, `bfb -b`, `bfb -b 2` mencetak pesan yang jelas dan exit 1, tanpa membuka menu.
- [ ] `bfb -b 1` di folder yang belum di-init mencetak bahwa setup belum siap (sama dengan pesan menu terkunci) dan exit 1, tanpa memanggil API aktivasi dan tanpa membuka browser; audit log mencatat `MENU 1 | Rawat facebook | terkunci`.
- [ ] Di folder yang siap, `bfb -b 1 -e 2` memposting hanya NO 2, mencetak ringkasan, lalu kembali ke shell dengan exit 0; `bfb -b 95 -e 1` menyinkronkan hanya akun NO 1 dan prompt `y/N` tetap berfungsi.

**Verification:**

- [ ] `bun test tests/integration/007-cli-entry.test.ts` (kasus tidak valid dan folder belum di-init, lewat `Bun.spawn` dengan `cwd` folder temp)
- [ ] `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`
- [ ] Manual check: di `/home/pinc/Developer/bfb/workspaces/`, `bun ../src/index.ts -b 1 -e <NO yang aman>` dan `bun ../src/index.ts -b 95 -e <NO>`; cek `workspaces/logs/audit.log`.

**Dependencies:** Task 1, Task 3

**Files likely touched:** `src/commands/bypass.ts`, `src/index.ts`, `tests/integration/007-cli-entry.test.ts`

**Estimated scope:** M

## Task 5: `bfb help` berisi panduan lengkap, README dan AGENTS.md diperbarui

**Description:** Ganti isi `showHelp()` dengan panduan penggunaan Bahasa Indonesia (bukan pengembangan): cara pakai (`bfb`, `bfb help`, `bfb version`, `bfb -b`, `-e`), daftar menu beserta nomornya (dari `MENU_LABELS`, supaya tidak dobel), menu yang bisa di-bypass, contoh valid, syarat setup (menu 0, 96, 97), dan file di folder kerja (`datas/`, `credentials/`, `logs/`). Perbarui README (pemakaian untuk pemakai paket) dan AGENTS.md (struktur `commands/`, alur runtime, perintah CLI).

**Acceptance criteria:**

- [ ] `bfb help` / `--help` / `-h` mencetak panduan yang menyebut `-b`, `--bypass`, `-e`, `--explicit`, menu 1 dan 95, dan contoh `bfb -b 95 -e 1`, lalu exit 0.
- [ ] Daftar menu di help diambil dari `MENU_LABELS`, bukan ditulis ulang.
- [ ] README dan AGENTS.md menjelaskan flag baru sesuai perilaku Task 1–4.

**Verification:**

- [ ] `bun test tests/integration/007-cli-entry.test.ts` (isi help)
- [ ] `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`, `bun run build`
- [ ] Manual check: `bun src/index.ts help` terbaca rapi di terminal.

**Dependencies:** Task 4

**Files likely touched:** `src/commands/help.ts`, `tests/integration/007-cli-entry.test.ts`, `README.md`, `AGENTS.md`

**Estimated scope:** S

## Risks and Mitigations

| Risk                                                                     | Impact | Mitigation                                                              |
| ------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------- |
| `-b` dijalankan tanpa terminal (cron, pipe) dan prompt `y/N` menggantung | Med    | Didokumentasikan di help dan README: `-b` tetap interaktif untuk prompt |
| Perubahan `facebook()`/`cookies()` mengubah perilaku menu interaktif     | Med    | Parameter opsional, menu tidak mengirimnya; cek manual di Task 3        |
| `showHelp` dites lewat `Bun.spawn`, jadi tidak menambah coverage         | Low    | Logika yang perlu dites (parsing, pemilihan baris) ada di `libs/`       |

## Open Questions

- Tidak ada; keputusan terbuka sudah dijawab user pada 2026-10-05.

---

# Implementation Plan: pencegahan deteksi bot Facebook (Human Behavior Emulation)

Ditulis lewat `/bfb-plan` pada 2026-10-04, dari bagian "Spec fitur: pencegahan deteksi bot Facebook (Human Behavior Emulation)" di `architecture/SPEC.md`.

## Overview

Menerapkan emulasi perilaku manusia secara menyeluruh pada interaksi browser bfb untuk mencegah deteksi bot dan flag spammer oleh Facebook:

1. Pengetikan bertahap dengan jeda acak per karakter (40–120ms) dan jeda tanda baca/spasi (150–350ms) via `src/libs/human-type.ts`.
2. Pergerakan kursor mouse realistis (`mouse.move` multi-steps) ke titik acak di dalam bounding box elemen, hover, dan klik berbobot via `src/libs/human-click.ts`.
3. Jeda asinkron acak (`min`–`max` ms) menggantikan jeda statis via `src/libs/random-delay.ts`.
4. Jeda istirahat (cooldown) otomatis 5–15 detik antar-baris antrean di `src/libs/run-browser-rows.ts` (0ms pada test suite).
5. Integrasi seluruh modul ke alur posting feed Facebook (`src/core/facebook.ts`) dan sinkronisasi cookie (`src/core/cookie.ts`).

## Dependency Graph

```
src/libs/random-delay.ts ◄── tests/unit/012-random-delay.test.ts
       ▲            ▲
       │            │
src/libs/human-type.ts ◄── tests/unit/013-human-type.test.ts
src/libs/human-click.ts ◄── tests/unit/014-human-click.test.ts
src/libs/run-browser-rows.ts ◄── tests/integration/005-run-browser-rows.test.ts
       ▲                  ▲
       │                  │
src/core/cookie.ts   src/core/facebook.ts
       ▲                  ▲
       │                  │
src/commands/menu.ts (menu 95, menu 1)
```

## Architecture Decisions

- **Satu fungsi per file di `src/libs/`:** Setiap logika emulasi (`random-delay.ts`, `human-type.ts`, `human-click.ts`) dipisahkan ke file independen dan dites secara menyeluruh di `tests/unit/` dengan ambang batas coverage 100% (garis & fungsi).
- **Zero `page.evaluate()`:** Seluruh emulasi keyboard dan mouse menggunakan Puppeteer API bawaan (`page.keyboard`, `page.mouse`, `handle.boundingBox()`) dari proses Bun host. Tidak ada fungsi JavaScript yang dikirim ke browser, menjamin 100% keamanan terhadap `javascript-obfuscator`.
- **Bounding box dengan toleransi acak & fallback:** `humanClick` menghitung target klik di antara rentang 20%–80% lebar dan tinggi bounding box elemen (menghindari sudut mati atau titik pusat statis). Jika bounding box bernilai null (elemen inline/display khusus), otomatis fallback ke `handle.click()`.
- **Parameter cooldown fleksibel pada `runBrowserRows`:** Menggunakan opsi `interRowDelay?: { min: number; max: number }` dengan default 5000–15000ms. Seluruh pengujian di `tests/` secara eksplisit dapat menyetel `{ min: 0, max: 0 }` sehingga test suite tetap selesai dalam hitungan detik.

## Task List

### Fase 1: Fondasi Helper Emulasi Humanis

- [x] **Task 1: Helper jeda acak `src/libs/random-delay.ts`**
    - Description: Buat modul `src/libs/random-delay.ts` yang mengekspor fungsi `randomDelay(minMs: number, maxMs: number): Promise<number>` dan `randomInt(min: number, max: number): number`.
    - Acceptance: Menghasilkan bilangan acak integer inklusif antara `min` dan `max`; melempar `Error` jika `min > max` atau bernilai negatif; `randomDelay` menunggu durasi asinkron yang tepat; coverage 100%.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: None. Files: `src/libs/random-delay.ts`, `tests/unit/012-random-delay.test.ts`. Scope: S.
- [x] **Task 2: Helper pengetikan humanis `src/libs/human-type.ts`**
    - Description: Buat modul `src/libs/human-type.ts` yang mengekspor `humanType(page: Page, text: string, options?: HumanTypeOptions): Promise<void>`.
    - Acceptance: Mengetik per karakter menggunakan `page.keyboard.type(char)`; jeda karakter standar 40–120ms; jeda spasi dan tanda baca 150–350ms; mendukung penyesuaian options; coverage 100%.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 1. Files: `src/libs/human-type.ts`, `tests/unit/013-human-type.test.ts`. Scope: S.
- [x] **Task 3: Helper pergerakan kursor dan klik realistis `src/libs/human-click.ts`**
    - Description: Buat modul `src/libs/human-click.ts` yang mengekspor `humanClick(page: Page, handle: ElementHandle): Promise<void>`.
    - Acceptance: Menghitung koordinat acak 20%–80% dari `handle.boundingBox()`; menggerakkan kursor via `page.mouse.move(x, y, { steps })` dengan 5–15 steps; jeda hover 100–250ms; `page.mouse.down()`, jeda tahan 50–120ms, lalu `page.mouse.up()`; fallback ke `handle.click()` bila bounding box null; coverage 100%.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 1. Files: `src/libs/human-click.ts`, `tests/unit/014-human-click.test.ts`. Scope: S.

### Checkpoint: Fondasi Helper

- [x] `bun run test:coverage` (100%), `bun run type-check`, `bun run lint`, `bun run check` hijau.

### Fase 2: Cooldown Antar-Baris

- [x] **Task 4: Cooldown antar-baris di `src/libs/run-browser-rows.ts`**
    - Description: Tambahkan opsi `interRowDelay?: { min: number; max: number }` (default `{ min: 5000, max: 15000 }`) ke fungsi `runBrowserRows`. Terapkan jeda acak setelah context akun ditutup dan sebelum baris berikutnya dibuka (hanya jika ada baris berikutnya dan browser masih terhubung).
    - Acceptance: Jeda acak diaplikasikan antar baris; baris terakhir dan browser yang disconnect tidak menunggu delay; test integrasi dengan delay `{ min: 0, max: 0 }` selesai tanpa hambatan; isolasi context per baris tetap utuh; coverage 100%.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 1. Files: `src/libs/run-browser-rows.ts`, `tests/integration/005-run-browser-rows.test.ts`. Scope: S.

### Checkpoint: Cooldown Antar-Baris

- [x] `bun run test:coverage` (100%), `bun run type-check`, `bun run lint`, `bun run check` hijau.

### Fase 3: Integrasi Core & Build

- [x] **Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`)**
    - Description: Perbarui `postFeed` di `src/core/facebook.ts` untuk menggunakan `humanType` pada penulisan caption, `humanClick` pada tombol caption trigger, next trigger, post preview trigger, dan publish trigger, serta `randomDelay` menggantikan jeda statis.
    - Acceptance: Seluruh interaksi DOM Facebook pada posting feed menggunakan emulasi manusia; pesan error dan validasi modal tertutup tetap bekerja; tidak ada `page.evaluate()`.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 2, Task 3, Task 4. Files: `src/core/facebook.ts`. Scope: S.
- [x] **Task 6: Integrasi emulasi humanis di sinkronisasi cookie (`src/core/cookie.ts`)**
    - Description: Perbarui `syncCookies` di `src/core/cookie.ts` untuk menggunakan `humanClick` pada tombol login/lanjutkan dan `humanType` pada pengisian password.
    - Acceptance: Alur sinkronisasi cookie menggunakan emulasi manusia; pengetikan password tetap terproteksi via `ensurePasswordFocus`; pesan audit log tidak berubah.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 2, Task 3. Files: `src/core/cookie.ts`. Scope: S.
- [x] **Task 7: Build production, verifikasi akhir, dan audit coverage**
    - Description: Jalankan `bun run build` untuk memastikan kompilasi bundle `bunup` dan `javascript-obfuscator` berhasil tanpa `ReferenceError`; verifikasi seluruh pre-commit checklist.
    - Acceptance: `dist/index.js` ter-obfuscate sukses; pre-commit gates (`bun run lint && bun run type-check && bun run check && bun run test:coverage`) hijau.
    - Verify: `bun run build`, `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 5, Task 6. Files: `architecture/PLAN.md`. Scope: S.

## Risks and Mitigations

| Risk                                                                    | Impact | Mitigation                                                                                    |
| :---------------------------------------------------------------------- | :----- | :-------------------------------------------------------------------------------------------- |
| Elemen UI Facebook tidak memiliki bounding box (misal styling tertentu) | Med    | `humanClick` menyediakan fallback otomatis ke `handle.click()` standar jika bounding box null |
| Cooldown 5–15 detik memperlambat jalannya automated test suite          | High   | Opsi `interRowDelay: { min: 0, max: 0 }` digunakan pada seluruh test di `tests/` agar instan  |
| Pengetikan caption panjang memakan waktu berlebih                       | Low    | Base delay pengetikan disetel seimbang (40–120ms) dengan jeda tanda baca terukur              |
| Obfuscator merusak helper baru                                          | High   | Tidak ada manipulasi fungsi browser (`page.evaluate()`), 100% Puppeteer host API              |

## Open Questions

Tidak ada yang memblokir. Seluruh keputusan telah diselaraskan pada `/bfb-spec`.

---

# Implementation Plan: bilingual Facebook UI (Inggris & Indonesia)

Ditulis lewat `/bfb-plan` pada 2026-10-04, dari bagian "Spec fitur: bilingual Facebook UI" di `architecture/SPEC.md`.

## Overview

Membuat alur sinkronisasi cookie (`src/core/cookie.ts`, menu 95) dan alur posting feed (`src/core/facebook.ts`, menu 1) mendukung antarmuka Facebook dwibahasa (Bahasa Inggris dan Bahasa Indonesia). Seluruh konstanta selektor XPath dwibahasa diekstrak ke modul murni `src/libs/facebook-selectors.ts` dengan unit test 100% coverage, lalu dihubungkan ke `src/core/cookie.ts` dan `src/core/facebook.ts`. Verifikasi live menggunakan akun referensi nomor `53` di `workspaces/datas/accounts.csv` dan `workspaces/datas/contents.csv`.

## Dependency Graph

```
src/libs/facebook-selectors.ts ◄── tests/unit/011-facebook-selectors.test.ts
       ▲                  ▲
       │                  │
src/core/cookie.ts   src/core/facebook.ts
       ▲                  ▲
       │                  │
src/commands/menu.ts (menu 95, menu 1)
```

## Architecture Decisions

- **Ekstraksi selektor ke `src/libs/facebook-selectors.ts`:** Sesuai aturan `AGENTS.md`, logika murni dipisah ke `libs/` (satu fungsi/konstanta per modul, export camelCase) sehingga dapat diuji unit test dengan ambang coverage 1.0 tanpa memerlukan browser live Facebook.
- **Ekspresi XPath dwibahasa:** Menggunakan format locator `xpath=...` dengan operator boolean XPath (`or`, `contains`) yang mengevaluasi variasi teks EN dan ID dalam satu ekspresi atomik. Kondisi disematkan di XPath tanpa `page.evaluate()` demi kepatuhan obfuscator.
- **Kompatibilitas `waitForSelector` hidden:** Menggunakan ekspresi XPath dwibahasa yang kompatibel dengan opsi `{ hidden: true }` pada Puppeteer untuk memastikan modal pembuatan postingan terdeteksi saat tertutup.
- **Tanpa perubahan format CSV:** Tidak ada penambahan kolom baru di `datas/accounts.csv` atau `datas/contents.csv`.

## Task List

### Fase 1: Fondasi Selektor Dwibahasa

- [x] **Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts`**
    - Description: Buat modul `src/libs/facebook-selectors.ts` yang mengekspor selektor XPath dwibahasa (EN & ID) untuk caption trigger, indikator create post, tombol next, preview post, tombol publish/post aktif, tombol login continue, tombol login utama, dan link forgotten password.
    - Acceptance: Setiap selektor mencakup variasi teks Bahasa Inggris dan Bahasa Indonesia; ekspresi XPath valid; return type eksplisit; lolos coverage 100%.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: None. Files: `src/libs/facebook-selectors.ts`, `tests/unit/011-facebook-selectors.test.ts`. Scope: S.

### Checkpoint: Fondasi Selektor

- [x] `bun run test:coverage` (100%), `bun run type-check`, `bun run lint`, `bun run check` hijau.

### Fase 2: Integrasi Alur Core

- [x] **Task 2: Alur sinkronisasi cookie dwibahasa (`src/core/cookie.ts`)**
    - Description: Perbarui `src/core/cookie.ts` agar menggunakan selektor dari `facebook-selectors.ts` untuk `loginSelector` (kondisi cookie expired dan cookie baru) serta `typePasswordSelector`.
    - Acceptance: Akun Facebook dengan UI Bahasa Indonesia atau Bahasa Inggris dapat mengenali tombol lanjut/login dan link password; tidak ada error sintaks locator; alur prompt dan audit log tetap sama.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`; manual: menu 95 dengan akun 53 di `workspaces/datas/accounts.csv`.
    - Dependencies: Task 1. Files: `src/core/cookie.ts`. Scope: S.
- [x] **Task 3: Alur posting feed dwibahasa (`src/core/facebook.ts`)**
    - Description: Perbarui `src/core/facebook.ts` agar menggunakan selektor dari `facebook-selectors.ts` untuk `captionSelector`, `createPostSelector`, `nextPostTrigger`, `postPreviewSelector`, `postSelector`, dan penutupan modal via `waitForSelector(..., { hidden: true })`.
    - Acceptance: Modal caption, tombol next/preview, tombol publish, dan penutupan modal berhasil dideteksi pada akun Facebook UI Bahasa Indonesia maupun Inggris; tidak ada pesan error 'Trigger caption tidak ditemukan' atau 'Publish tidak valid' palsu.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`; manual: menu 1 dengan baris konten akun 53 di `workspaces/datas/contents.csv`.
    - Dependencies: Task 1. Files: `src/core/facebook.ts`. Scope: S.

### Checkpoint: Core Dwibahasa

- [x] `bun run test:coverage` tetap 100% dan seluruh pemeriksaan lulus.
- [x] Uji coba manual menu 95 dan menu 1 dengan akun 53 berjalan lancar (menunggu uji interaktif operator).

### Fase 3: Build & Finalisasi

- [x] **Task 4: Build production dan verifikasi akhir**
    - Description: Jalankan `bun run build` untuk memverifikasi build obfuscated berhasil dan tidak ada syntax error / reference error; perbarui checklist di `architecture/PLAN.md`.
    - Acceptance: `dist/index.js` berhasil dibuat; pre-commit gates (`bun run lint && bun run type-check && bun run check && bun run test:coverage`) hijau.
    - Verify: `bun run build`, `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: Task 2, Task 3. Files: `architecture/PLAN.md`. Scope: S.

## Risks and Mitigations

| Risk                                                                  | Impact | Mitigation                                                                |
| :-------------------------------------------------------------------- | :----- | :------------------------------------------------------------------------ |
| Variasi teks Facebook berbeda huruf besar/kecil atau tata bahasa      | Med    | Gunakan kondisi `contains()` dan toleransi variasi huruf kapital di XPath |
| Obfuscator merusak runtime                                            | High   | Selektor murni string XPath, tanpa `page.evaluate()`                      |
| `waitForSelector({ hidden: true })` timeout jika selector tidak cocok | High   | Selektor modal penutupan diuji kecocokannya terhadap XPath yang sama      |

## Open Questions

Tidak ada yang memblokir.

---

# Implementation Plan: audit log

Ditulis lewat `/bfb-plan` pada 2026-10-01, dari bagian "Spec fitur: audit log" di `architecture/SPEC.md`. Rencana sebelumnya (task 5, 8, 9, 10 masih terbuka) dipindah ke bawah tanpa diubah, sesuai keputusan user.

## Overview

Setiap pilihan menu 0–99 dan hasilnya, plus satu baris per akun/konten di menu 1 dan 95, ditambahkan ke `logs/audit.log` di folder kerja. Pekerjaan dibangun dari bawah: format dan penulis log dulu, lalu init, lalu hasil menu yang sederhana, lalu hasil per baris di runner browser, terakhir docs. Setiap task meninggalkan bfb dalam keadaan jalan dan semua pemeriksaan hijau.

## Dependency graph

```
commands/menu.ts ── createAuditLogger('MENU n') ──────────────► libs/write-audit-log ──► libs/format-audit-line
   │                                                               │
   │                                                               └──► libs/ignore-secrets (dipindah dari init-project)
   ├──► libs/describe-menu (pilihan → sumber + aksi)
   ├──► libs/init-project ──► logs/audit.log + ignore-secrets
   ├──► libs/activate-bfb, libs/download-driver (mengembalikan hasil, bukan hanya mencetak)
   └──► core/facebook, core/cookie (menerima logger) ──► libs/run-browser-rows (lapor hasil tiap baris)
```

## Architecture Decisions

- **Satu fungsi per file, logika murni terpisah dari I/O.** `format-audit-line.ts` murni (unit test), `write-audit-log.ts` menulis file (integration test). Sesuai konvensi `libs/` dan ambang coverage 1.0.
- **Penulis log tidak pernah melempar error.** Gagal tulis mencetak satu peringatan lalu menonaktifkan log sampai sesi berikutnya (asumsi 5 spec). Status "nonaktif" disimpan di modul, dengan cara reset yang hanya dipakai lewat parameter, bukan export khusus test.
- **Setiap baris langsung di-append** (`appendFile`), tanpa buffer, supaya kejadian terakhir tidak hilang kalau bfb ditutup paksa. File baru dibuat `0600` di folder `0700`; `logs/` ditambahkan ke `.gitignore` lewat `ignoreSecrets`, yang dipindah ke `libs/ignore-secrets.ts` karena dipakai dua modul.
- **`core/*` tidak tahu nomor menu.** Menu membuat logger yang sudah terikat ke sumbernya (`createAuditLogger('MENU 1')`) dan meneruskannya ke `facebook(log)` / `cookies(readline, log)`.
- **`runBrowserRows` melaporkan setiap baris, bukan hanya yang gagal.** `onFailure(message, row)` diganti `onRow(outcome, row)` dengan `outcome = { status: 'done' | 'skipped' | 'failed'; message?: string }`. Task mengembalikan string alasan untuk menandai baris dilewati beserta alasannya (`'Masih dalam tahap pengembangan'`, `'Cookie tidak di simpan'`, `'Login bermasalah'`); `false` tanpa alasan dihapus. Teks di layar tetap sama.
- **`activateBfb` dan `downloadDriver` mengembalikan hasilnya** (`{ ok: boolean; message: string }`) selain tetap menampilkannya, supaya menu bisa mencatat tanpa mengurai teks layar.
- **Tidak pernah dicatat:** token, password, isi cookie, caption, input mentah. Setiap test integrasi yang memakai nilai rahasia fixture memeriksa bahwa nilai itu tidak ada di `audit.log`.

## Task List

### Fase 1: Fondasi log

- [x] **Task 1: Format satu baris audit**
    - Description: `src/libs/format-audit-line.ts` mengubah `{ date, source, action, result, note? }` menjadi `YYYY-MM-DD HH:mm:ss ±HH:MM | SUMBER | aksi | hasil[ | keterangan]`.
    - Acceptance: offset zona waktu benar (termasuk offset negatif dan non-jam penuh seperti +05:30, lewat `Date` dengan offset yang disuntikkan); `MENU 1 ` dan `MENU 97` rata dua karakter; baris baru → spasi dan `|` di dalam teks → `/`; tanpa `note` tidak ada `|` di akhir.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`, `bun run check`.
    - Dependencies: none. Files: `src/libs/format-audit-line.ts`, `tests/unit/008-format-audit-line.test.ts`. Scope: S.
- [x] **Task 2: Penulis `logs/audit.log`**
    - Description: `src/libs/write-audit-log.ts` mengekspor `createAuditLogger(source)` yang mengembalikan `(action, result, note?) => Promise<void>`. Pindahkan `ignoreSecrets` dari `init-project.ts` ke `src/libs/ignore-secrets.ts` dan tambahkan `logs` ke daftar folder rahasia.
    - Acceptance: di folder tanpa `logs/`, baris pertama membuat `logs/` `0700` dan `audit.log` `0600`, dan `.gitignore` mendapat `logs/`; baris berikutnya ditambahkan di akhir tanpa menimpa; kalau file tidak bisa ditulis (mis. `logs` berupa file biasa), tidak ada error yang dilempar, satu peringatan tampil, dan baris berikutnya tidak mencoba lagi.
    - Verify: `bun run test:coverage` (termasuk `tests/integration/003-init-project.test.ts` yang tetap hijau setelah pemindahan), `bun run type-check`, `bun run check`.
    - Dependencies: Task 1. Files: `src/libs/write-audit-log.ts`, `src/libs/ignore-secrets.ts`, `src/libs/init-project.ts`, `tests/integration/008-write-audit-log.test.ts`. Scope: M.
- [x] **Task 3: Menu 0 membuat `logs/audit.log`**
    - Description: `initProject` membuat `logs/` (`0700`) dan `audit.log` kosong (`0600`) di samping `datas/` dan `credentials/`, tanpa menimpa log yang sudah ada. `checkInit` tidak berubah.
    - Acceptance: success criterion 1 dan 2 di spec; `audit.log` yang sudah berisi tidak dikosongkan oleh init ulang; folder kerja yang sudah di-init tanpa `logs/` tetap "Siap".
    - Verify: `bun run test:coverage`, `bun run type-check`.
    - Dependencies: Task 2. Files: `src/libs/init-project.ts`, `tests/integration/003-init-project.test.ts`. Scope: S.

### Checkpoint: Fondasi

- [x] `bun run format`, `lint`, `type-check`, `check`, `test:coverage` (100%), `build` hijau
- [x] Menu 0 di folder kosong lewat build production: `logs/audit.log` ada dengan mode yang benar

### Fase 2: Mencatat hasil menu

- [x] **Task 4: Aktivasi dan pasang driver mengembalikan hasilnya**
    - Description: `activateBfb` dan `downloadDriver` mengembalikan `{ ok, message }` dengan pesan yang sama dengan di layar. Tampilan tidak berubah.
    - Acceptance: setiap cabang `activateBfb` (kosong, tidak valid, server error, berhasil, gagal disimpan) mengembalikan pesannya; token tidak pernah ada di `message`; cabang `downloadDriver` (platform tidak didukung, sudah terpasang, server error, berhasil) mengembalikan pesannya.
    - Verify: `bun run test:coverage`, `bun run type-check`; manual: pasang driver di folder temp (unduhan Chrome ±150 detik) sekali untuk cabang berhasil.
    - Dependencies: none. Files: `src/libs/activate-bfb.ts`, `src/libs/download-driver.ts`, `tests/integration/004-activate-bfb.test.ts`, `tests/integration/009-download-driver.test.ts` (unduhan dan platform dipalsukan). Scope: M.
- [x] **Task 5: Setiap pilihan menu tercatat**
    - Description: `src/libs/describe-menu.ts` memetakan pilihan ke sumber dan nama aksi (`'97'` → `MENU 97` / `Aktifasi bfb`; input lain → `MENU ?` / `Input tidak valid`, tanpa nilainya). `menu.ts` mencatat awal sesi, dan untuk menu 0, 2, 3, 4, 96, 97, 98, 99, input tidak valid, dan menu terkunci mencatat tepat satu baris hasil. Error yang tertangkap `runTask` dicatat sebagai `gagal`. Menu 99 menunggu log tertulis sebelum `process.exit`.
    - Acceptance: success criterion 3 untuk semua menu kecuali 1 dan 95 (yang ditangani Task 7); teks, urutan layar, dan jeda 1 detik tidak berubah.
    - Verify: `bun run test:coverage`, `bun run type-check`, `bun run lint`; manual lewat build production di folder kerja temp: menu 0, 2, 98, 96 (sudah terpasang), input `abc`, menu 1 terkunci, 99, lalu cocokkan `logs/audit.log`. Menu 97 dicek manual oleh user (hindari request tambahan ke API aktivasi produksi).
    - Dependencies: Task 2, 4. Files: `src/libs/describe-menu.ts`, `src/commands/menu.ts`, `tests/unit/009-describe-menu.test.ts`. Scope: M.

### Checkpoint: Menu sederhana

- [x] Semua pemeriksaan hijau, coverage 100%
- [x] `audit.log` dari smoke test manual cocok dengan tabel "Yang dicatat per menu" di spec (kecuali menu 1 dan 95)
- [x] Review dengan user sebelum menyentuh runner browser

### Fase 3: Hasil per baris di menu 1 dan 95

- [x] **Task 6: `runBrowserRows` melaporkan setiap baris**
    - Description: ganti `onFailure(message, row)` dengan `onRow(outcome, row)`; task mengembalikan string alasan untuk baris yang dilewati. Kegagalan membersihkan context dilaporkan sebagai `failed` dengan pesan yang sama seperti sekarang. `postFeed` dan `syncCookies` mengembalikan alasan, dan callback di `facebook.ts`/`cookie.ts` tetap mencetak teks yang sama.
    - Acceptance: berhasil, dilewati (dengan alasan), dan gagal (dengan pesan) masing-masing dilaporkan sekali per baris; hitungan `RowsResult` tidak berubah; semua test lama di `005-run-browser-rows` tetap membuktikan hal yang sama setelah disesuaikan ke `onRow`.
    - Verify: `bun run test:coverage`, `bun run type-check`; manual: Chrome headless dengan cookie palsu seperti di `TEST.md` (tanpa akun sungguhan), layar tetap sama.
    - Dependencies: none. Files: `src/libs/run-browser-rows.ts`, `src/core/facebook.ts`, `src/core/cookie.ts`, `tests/integration/005-run-browser-rows.test.ts`. Scope: M.
- [x] **Task 7: Menu 1 dan 95 mencatat per baris**
    - Description: `facebook(log)` dan `cookies(readline, log)` mencatat `mulai` (jumlah baris), satu baris per konten/akun (`NO <no> UID <uid>`), lalu `selesai` atau `dihentikan` dengan ringkasan yang sama dengan layar. Data kosong dicatat sebagai `dilewati`. `menu.ts` meneruskan logger yang terikat ke `MENU 1`/`MENU 95`, dan mencatat `terkunci` kalau menu terkunci.
    - Acceptance: success criterion 4; caption, password, dan cookie tidak pernah muncul di log.
    - Verify: `bun run test:coverage`, `bun run type-check`; manual A (tanpa akun): Chrome headless + cookie palsu 3 baris → 3 baris per konten + `selesai` cocok dengan layar. Manual B (user, akun sungguhan, 2–3 baris `contents.csv`): menu 1 dan 95 di Chrome, lalu cocokkan `logs/audit.log` dengan ringkasan layar.
    - Dependencies: Task 5, 6. Files: `src/core/facebook.ts`, `src/core/cookie.ts`, `src/commands/menu.ts`. Scope: S–M. Logika per baris sudah dites di Task 6; `core/*` tidak tercakup coverage (lihat `TODO.md`).

### Checkpoint: Fitur lengkap

- [x] Semua 7 success criteria di spec terpenuhi (criterion 4 lewat manual A; manual B oleh user masih terbuka, lihat `TODO.md`)
- [x] `bun run format`, `lint`, `type-check`, `check`, `test:coverage`, `build` hijau

### Fase 4: Dokumentasi

- [x] **Task 8: Docs dan status spec**
    - Description: `AGENTS.md` (data runtime `logs/audit.log`, konvensi logger dan hal yang tidak boleh dicatat, `onRow`), `README.md` (operator: letak dan isi log), status spec menjadi "dibangun", `TODO.md` bila ada temuan.
    - Acceptance: tidak ada klaim di docs yang bertentangan dengan kode.
    - Verify: `bun run format`; baca ulang terhadap kode.
    - Dependencies: Task 7. Files: `AGENTS.md`, `README.md`, `architecture/SPEC.md`, `TODO.md`. Scope: S.

## Risks and Mitigations

| Risk                                                                      | Impact | Mitigation                                                                                                            |
| ------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| Rahasia (token, password, cookie, caption) bocor ke log                   | High   | Logger hanya menerima teks yang sudah disusun menu/core; test memakai nilai fixture yang harus absen dari `audit.log` |
| Mengubah signature `runBrowserRows` mengubah perilaku isolasi per-context | High   | Task 6 hanya mengganti pelaporan; test isolasi lama tetap dijalankan dan disesuaikan tanpa melemahkan assertion       |
| Menu 99 keluar sebelum baris terakhir tertulis                            | Med    | `await` log sebelum `process.exit`; dicek di smoke test manual                                                        |
| Log gagal ditulis membuat task gagal                                      | Med    | Penulis tidak pernah melempar; test dengan `logs` berupa file biasa                                                   |
| Teks atau jeda layar berubah tanpa sengaja                                | Med    | Pesan untuk log diambil dari nilai yang sama dengan yang dicetak; smoke test build production di setiap checkpoint    |
| Ctrl+C di prompt token (`hideQuestion`) keluar tanpa baris penutup sesi   | Low    | Diterima: baris `mulai` sesi dan menu terakhir sudah tercatat                                                         |
| Dua proses bfb di folder yang sama menulis bersamaan                      | Low    | Setiap kejadian satu `appendFile` satu baris; urutan antar proses bisa bercampur, isi baris tidak                     |

## Open Questions

Tidak ada yang memblokir. Asumsi spec 1–6 dianggap disetujui saat rencana ini disetujui.

---

# Rencana sebelumnya: bfb — menutup spec as-built

Ditulis lewat `/bfb-plan` pada 2026-09-30, dari `architecture/SPEC.md` dan `TODO.md`.

## Overview

Spec as-built punya satu success criterion yang belum terpenuhi: **setiap acceptance criterion punya test**, kecuali alur di Facebook sendiri. Tiga kriteria masih tanpa test karena logikanya menempel di `src/index.ts`, `src/commands/menu.ts`, dan `src/libs/activate-bfb.ts`. Fase 1 memindah logika itu ke `libs/` dan mengetesnya, tanpa mengubah perilaku. Fase 2 dan 3 adalah sisa `TODO.md` yang **tidak boleh dikerjakan** sebelum ada keputusan atau akses dari user; dicatat supaya urutannya jelas.

## Dependency graph

```
src/index.ts ──► commands/menu.ts ──► core/facebook.ts, core/cookie.ts
     │                 │                        │
     ▼                 ▼                        ▼
 libs/parse-args   libs/menu-access      libs/run-browser-rows, content-status,
 (baru, T1)        (baru, T2)            launch-browser, read-cookies, ...
                       │
                       ▼
                 libs/activate-bfb ──► libs/request-activation, hide-question (T3)
```

Tidak ada task Fase 1 yang saling bergantung; urutannya dari yang paling kecil.

## Architecture Decisions

- Logika keputusan pindah ke `libs/` (satu fungsi per file), `commands/` dan `index.ts` hanya memanggilnya. Alasan: `index.ts` menjalankan `index()` saat di-import dan `menu()` adalah loop tanpa akhir, jadi keduanya tidak bisa dites langsung.
- Perilaku dan teks untuk operator tidak berubah sedikit pun di Fase 1; test ditulis dulu terhadap perilaku yang sekarang.
- `activateBfb` menerima pembaca token opsional (default `hideQuestion`), mengikuti pola `hideQuestion(prompt, stdin, stdout)`.

## Task List

### Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang)

- [x] **Task 1: Parsing argumen CLI bisa dites**
    - Description: pindahkan keputusan di `index()` ke `libs/parse-args.ts` yang mengembalikan `{ command: 'version' | 'help' | 'menu' } | { command: 'unknown'; flag: string }`; `index.ts` hanya menjalankan hasilnya.
    - Acceptance: `version`/`--version`/`-v` → version; `help`/`--help`/`-h` → help; tanpa argumen → menu; argumen lain → unknown dengan flag pertama yang tidak dikenal; pesan `Unknown flag: '<x>'` tetap sama.
    - Verify: `bun run test`, `bun run type-check`, `bun run check`; manual `bun run src/index.ts --bogus`, `-v`.
    - Dependencies: none. Files: `src/libs/parse-args.ts`, `src/index.ts`, `tests/unit/001-parse-args.test.ts`. Scope: S.
- [x] **Task 2: Aturan kunci menu bisa dites**
    - Description: pindahkan penentuan "fitur terkunci" (menu 1 dan 95 butuh init, driver, dan aktivasi) ke `libs/menu-access.ts`.
    - Acceptance: terkunci kalau salah satu dari tiga status belum siap; terbuka hanya kalau ketiganya siap; menu 0/96/97 tidak pernah terkunci.
    - Verify: `bun run test`, `bun run type-check`; manual: di folder kosong, menu 1 menampilkan "Fitur masih terkunci".
    - Dependencies: none. Files: `src/libs/menu-access.ts`, `src/commands/menu.ts`, `tests/unit/002-menu-access.test.ts`. Scope: S.
- [x] **Task 3: Penyimpanan token aktivasi dites**
    - Description: `activateBfb` menerima pembaca token opsional; test memastikan token dari server disimpan ke `credentials/token.bfb` dengan `0600` (folder `0700`), dan tidak ada file yang ditulis saat token salah, kosong, atau server error.
    - Acceptance: empat hasil (berhasil, kosong, tidak valid, server error) masing-masing menampilkan pesan yang sama seperti sekarang; file hanya ada di kasus berhasil.
    - Verify: `bun run test`, `bun run type-check`; manual: menu 97 dengan token salah → "Token tidak valid, aktifasi gagal".
    - Dependencies: none. Files: `src/libs/activate-bfb.ts`, `tests/integration/004-activate-bfb.test.ts`. Scope: S.

### Checkpoint: Fase 1

- [x] `bun run format`, `lint`, `type-check`, `check`, `test`, `build` hijau tanpa Node
- [x] Build production dijalankan dari folder kerja kosong: `-v`, flag salah, menu 1 terkunci, menu 97 token salah, menu 99
- [x] Setiap acceptance criterion di `SPEC.md` (kecuali alur Facebook) punya test

### Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab)

- [x] Task 4: Pin versi dan SHA di `release.yml`, pisahkan job changelog tanpa `id-token: write`. Rilis pertama sesudahnya belum jalan (Task 10).
- [x] Task 5: Hapus atau rencanakan `src/libs/asset-checker.ts`. (`src/ignore/index.ts` sudah dihapus dan diganti XPath di `facebook.ts`.)
- [x] Task 6: Coverage + `coverageThreshold` di `bunfig.toml` (per file 100% baris dan fungsi, sebelumnya 90% / 80%; dijalankan CI).
- [x] Task 7: Bump dependency dalam versi mayor yang sama + `overrides` untuk transitif rentan, `bun run docs`, tes Chrome ulang. Upgrade mayor masih terbuka di `TODO.md`.

### Fase 3: Butuh akses di luar lokal

- [x] Task 8: Verifikasi di akun Facebook sungguhan: deteksi "postingan terkirim" dan deteksi login `includes('next')`.
- [ ] Task 9: Backend membalas token salah dengan 401/403, bukan 500 (sisi server; client sudah kompatibel dua-duanya).
- [x] Task 10: Cek run pertama `ci.yml` yang baru di GitHub Actions (ubuntu, macos, windows).

## Risks and Mitigations

| Risk                                                          | Impact | Mitigation                                                                         |
| ------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| Refactor `index.ts`/`menu.ts` mengubah teks atau urutan layar | Med    | Test ditulis terhadap perilaku sekarang; smoke test build production di checkpoint |
| Test yang menulis file mengganggu folder kerja sungguhan      | High   | Semua test memakai folder temp + `process.chdir`, dikembalikan di `afterEach`      |
| Test permission gagal di Windows CI                           | Low    | `test.skipIf(process.platform === 'win32')`                                        |

## Open Questions

Sama dengan Fase 2 dan 3; lihat juga "Open Questions" di `SPEC.md`.
