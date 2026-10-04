# Spec: bfb (Bot for billy) — as-built

Ditulis lewat `/bfb-spec` pada 2026-09-30. Spec ini mendokumentasikan bfb **apa adanya** di v0.4.0 setelah perbaikan audit. Fitur baru ditulis sebagai bagian terpisah di akhir file ini (saat ini: [audit log](#spec-fitur-audit-log)).

## Asumsi

Diambil dari kode, `AGENTS.md`, dan keputusan user di sesi ini. Koreksi kalau salah:

1. Pemakai adalah **operator** yang menjalankan `bfb` di satu folder kerja per kelompok akun, di mesin sendiri. Bukan layanan multi-user.
2. Akun dan kontennya milik operator. bfb hanya mengotomasi yang bisa dilakukan operator secara manual di browser.
3. Bun adalah satu-satunya runtime, di mesin developer maupun operator.
4. Hanya Facebook yang dikerjakan. Instagram, TikTok, dan Shopee tetap placeholder sampai ada spec sendiri.

## Objective

bfb adalah CLI interaktif yang memposting konten ke Facebook dan menjaga sesi login banyak akun, lewat Chrome sungguhan (puppeteer-core + stealth plugin), dari data di folder kerja operator.

User story:

- Sebagai operator, aku menyiapkan folder kerja sekali (menu 0), memasang Chrome yang dikunci versinya (menu 96), dan mengaktifkan bfb dengan token (menu 97).
- Aku menyinkronkan cookie tiap akun (menu 95): cookie yang masih valid dibiarkan; yang kedaluwarsa atau belum ada diminta login manual di browser, lalu aku memilih apakah cookie baru disimpan.
- Aku memposting konten dari `contents.csv` (menu 1), satu baris satu postingan, memakai cookie akun di kolom `COOKIE`, dan melihat ringkasan berhasil/dilewati/gagal.

## Tech Stack

Bun 1.4.2 (`.bumrc`), TypeScript ESM, bunup 0.16.32 (`target: 'bun'`, `splitting: false`) + javascript-obfuscator, puppeteer-core 24.43.1, puppeteer-extra 3.3.6 + puppeteer-extra-plugin-stealth 2.11.2, @puppeteer/browsers 2.13.2, Chrome `147.0.7727.101` (`DRIVER_VERSION`), chalk, `tsgo`, oxlint, prettier, `bun test`, bumpp. Dokumentasi resmi versi-versi ini ada offline di `docs/`.

## Data di folder kerja

Semua dibaca dari / ditulis ke `process.cwd()`. CSV dipisah **titik koma**, header harus sama persis dengan `src/types/global.ts`.

| File                       | Isi                                                                | Permission                             |
| -------------------------- | ------------------------------------------------------------------ | -------------------------------------- |
| `datas/accounts.csv`       | `NO;UID;PASSWORD`                                                  | `0600` (folder `0700`)                 |
| `datas/contents.csv`       | `NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE`        | `0600`                                 |
| `credentials/cookies.json` | `{ [uid]: CookieData[] }`, awalnya `{}`                            | `0600` (folder `0700`), ditulis atomik |
| `credentials/token.bfb`    | token dari server aktivasi                                         | `0600`                                 |
| `.gitignore`               | `datas/`, `credentials/` — dibuat, atau dilengkapi kalau sudah ada | default                                |

Aturan CSV: tanda kutip hanya membuka sel berkutip di awal sel (setelah spasi); di posisi lain kutip adalah teks biasa; kutip yang tidak ditutup adalah error. Sel dalam tanda kutip boleh berisi `;`, baris baru, dan `""`; spasi di dalam kutip dipertahankan; sel tanpa kutip di-trim; baris kosong atau `;;` dilewati; sel header kosong tidak menggeser kolom; header `__proto__`/`constructor`/`prototype` diabaikan.

## Fitur dan acceptance criteria

### Menu dan status

- Setiap putaran menu menampilkan versi, OS, arsitektur, timezone, folder, status init, status driver, dan status aktivasi.
- Menu 1 dan 95 **terkunci** sampai init, driver, dan aktivasi ketiganya siap.
- Setiap layar mengikuti pola pause → clear → pesan → jeda 1 detik (disengaja) → clear → resume. Hasil menu 1 dan 95 ditahan sampai operator menekan Enter, lalu kembali ke menu.
- `bfb --version`/`-v`/`version` mencetak versi; flag lain ditolak dengan `Flag tidak dikenal: '<flag>'` dan exit code 1. Semua teks untuk operator dalam Bahasa Indonesia.

### Setup (menu 0, 96)

- Menu 0 membuat semua file di tabel di atas tanpa pernah menimpa file yang sudah ada, dan memperbaiki permission yang sudah ada.
- Menu 96 memasang Chrome `DRIVER_VERSION` ke `~/.cache` lewat `detectBrowserPlatform()`; platform yang tidak didukung ditolak dengan pesan.

### Aktivasi (menu 97)

- Token diketik tersamar (`*`), backspace bekerja, tombol panah diabaikan, tombol Esc tidak mengganggu, dan input yang datang sekaligus (ketikan cepat, paste) tetap dikenali. Input yang bukan ASCII cetak tanpa spasi ditolak sebagai token tidak valid tanpa memanggil server.
- Hasil ditentukan dari **isi body** JSON, bukan status HTTP (server membalas token salah dengan 500 `{"state":false}`):
    - body berisi `token` string ASCII tanpa spasi (1–4096 karakter) → token disimpan → "Token valid, aktifasi berhasil"
    - body lain → "Token tidak valid, aktifasi gagal"
    - timeout 5 detik, gangguan jaringan, atau body bukan JSON → "Server error, aktifasi gagal"
- Input token di-trim; hanya spasi = "Token kosong". Cek aktivasi di menu memakai timeout 5 detik, tidak memanggil server kalau belum ada token, dan hasil aktif di-cache per token sampai proses selesai (token berganti → dicek ulang).

### Posting Facebook (menu 1)

- Didukung: `ROUTE=PERSONAL` + `TYPE=POST`. Rute/tipe kosong atau tidak dikenal → gagal; kombinasi lain (`BM`, `FEED`, `REEL`, `STORY`) → **dilewati** sebelum browser membuka halaman.
- Baris tanpa cookie untuk `COOKIE` → gagal ("Cookie tidak ditemukan"); cookie ditolak Facebook → gagal ("Cookie tidak valid").
- Baris dihitung **berhasil** hanya setelah composer Facebook tertutup dalam 30 detik setelah Post.
- Setiap baris berjalan di browser context sendiri yang ditutup setelah baris selesai, apa pun hasilnya (cookie, localStorage, IndexedDB tidak terbawa). Context gagal ditutup → proses dihentikan.
- Browser ditutup sendiri → loop berhenti, ringkasan tetap tampil, kembali ke menu. Tab yang ditutup saja → hanya baris itu gagal.

### Sinkronisasi cookie (menu 95)

- UID kosong tidak pernah dipakai sebagai kunci `cookies.json`. Password hanya diketik kalau kolom `input[type="password"]` yang sedang fokus; kalau tidak, baris dihentikan.
- Cookie valid → tidak diubah (berhasil). Kedaluwarsa atau tidak ada → login manual (UID/password diketik otomatis), lalu `Simpan cookie? (y/N)`; `y`/`Y` menyimpan, jawaban lain tidak (dilewati). Login bermasalah → dilewati.
- Menyimpan cookie tidak pernah menghapus cookie akun lain atau entri lain di `cookies.json`; file yang rusak dilaporkan, tidak ditimpa.

## Commands

```bash
bun install          # memasang dependency + pre-commit hook (core.hooksPath .githooks)
bun run dev          # bunup --watch
bun run build        # bunup + obfuscate dist/index.js
bun run type-check   # tsgo --noEmit (src/, tests/, script root)
bun run lint         # oxlint
bun run check        # check.ts — gagal kalau ada import relatif
bun run format       # prettier --write
bun run test         # bun test
bun run docs         # mirror dokumentasi resmi ke docs/ sesuai versi terkunci
bun run release      # bumpp package.json src/utils/constant.ts --commit --push --tag
bun run ../dist/index.js   # jalankan build production dari folder kerja (mis. workspaces/)
```

## Project Structure

```
src/index.ts          parsing argumen, lalu menu
src/commands/         menu.ts (loop utama), help.ts, version.ts
src/core/             facebook.ts (posting), cookie.ts (sinkronisasi cookie)
src/libs/             satu fungsi per file: launch-browser, run-browser-rows, content-status,
                      csv-parser, parse-cookie-store, read-cookies, save-cookies, write-secret-file, is-reserved-key,
                      request-activation, check-activation, activate-bfb, hide-question,
                      init-project, check-init, check-driver, download-driver, format-duration, apply-delay
src/types/global.ts   Account, Content
src/utils/constant.ts VERSION, DRIVER_VERSION, ACTIVATION_API_URL, ACTIVATION_TIMEOUT_MS, MOTIVATIONS
tests/                unit/, integration/, endpoint/ — NNN-nama.test.ts, mulai 001 per folder
.githooks/            pre-commit: lint && type-check && check
docs/                 dokumentasi resmi offline (bun, bunup, puppeteer, puppeteer-extra)
architecture/         hasil skill /bfb-<verb>
```

## Code Style

```ts
import { applyDelay } from '@/libs/apply-delay';

async function showResult(message: string): Promise<void> {
	console.clear();
	console.log(`${message}\n`);
	await applyDelay(1000);
}

export { showResult };
```

- Import selalu lewat alias `@/`; import relatif (termasuk `import type`, `import()`, `require()`) ditolak `check.ts`.
- Named export di bawah file, return type eksplisit, tab, single quote, `printWidth` 300.
- Teks untuk operator dalam Bahasa Indonesia, singkat. Log per baris dibungkus `===============================`, sukses `chalk.green`, gagal `chalk.red`.
- Selector Puppeteer lewat locator `text=...`/`xpath=...`; `::-p-xpath()` tidak dipakai (gagal di Bun). Tidak ada fungsi yang dikirim ke browser (`page.evaluate(fn)` dan sejenisnya): build ter-obfuscate merusaknya; kondisi seperti "tombol aktif" ditulis di XPath.

## Testing Strategy

- `bun test`, di `tests/unit/` (logika murni, tanpa I/O), `tests/integration/` (file system, beberapa modul dengan fake), `tests/endpoint/` (kontrak API aktivasi); nama file `NNN-nama.test.ts`, nomor mulai `001` di setiap folder, tanpa jaringan dan tanpa akun sungguhan: folder temp + `process.chdir`, `fetch` palsu, stream palsu, browser palsu.
- Test yang bergantung pada mode file POSIX di-skip di Windows.
- Alur browser di `core/` hanya bisa dicek manual terhadap Facebook; logika keputusannya ada di `libs/` supaya bisa dites.
- CI (`ci.yml`): type-check, lint, check, test, build, `bun pm pack --dry-run` di ubuntu/macos/windows dengan Bun dari `.bumrc`.

## Boundaries

- **Always:** lewat `runBrowserRows()` untuk setiap loop browser (context per baris); tulis data sensitif lewat `writeSecretFile()`; jalankan `bun run lint`, `type-check`, `check`, `test` sebelum commit; generate ulang `docs/` setelah bump versi.
- **Ask first:** menjalankan bot terhadap akun sungguhan; menyentuh `datas/`/`credentials/` operator; mengubah `DRIVER_VERSION`; menambah dependency; mengubah `release.yml`; `bun run release`.
- **Never:** commit isi `datas/`, `credentials/`, cookie, atau token; `process.exit` di `core/*`; memindah publish npm ke `bun publish` (Bun sampai 1.4.2 tidak mendukung OIDC); mencetak password/cookie/token ke log.

## Success Criteria

- Semua acceptance criteria di atas punya test di `tests/`, kecuali alur di Facebook sendiri.
- `bun run format`, `lint`, `type-check`, `check`, `test`, `build` hijau tanpa Node.
- `bun install` dari `node_modules` kosong berhasil tanpa Node.
- Build production (`dist/index.js`) jalan lewat shebang Bun tanpa Node.

## Open Questions

Dari `TODO.md`, butuh keputusan user:

1. Pin versi dan SHA di `release.yml`, dan pisahkan job changelog?
2. Proteksi aktivasi: respons bertanda tangan, atau fungsi penting dipindah ke server?
3. Backend: ubah status token salah dari 500 ke 401/403?
4. Ambang coverage minimum berapa?
5. `src/libs/asset-checker.ts`: hapus atau direncanakan?
6. Kapan deteksi "postingan terkirim" dan deteksi login (`includes('next')`) diverifikasi di akun sungguhan?

---

# Spec fitur: audit log

Ditulis lewat `/bfb-spec` pada 2026-10-01. **Status: dibangun dan diverifikasi user (2026-10-01), lihat `architecture/BUILD.md`.** Menu 1, 95, dan 97 dicek user di akun dan token sungguhan: token tidak muncul di `audit.log`, baris per akun cocok dengan ringkasan layar, dan jendela `about:blank` tidak lagi muncul.

## Objective

Operator butuh catatan tertulis tentang apa yang dilakukan bfb di folder kerjanya: menu apa yang dipilih, kapan, dan hasilnya, sampai ke tingkat per akun untuk posting dan sinkronisasi cookie. Saat ini hasil hanya tampil di layar lalu hilang saat layar dibersihkan. Dengan audit log, operator bisa menjawab "akun mana yang gagal posting kemarin dan kenapa" tanpa menjalankan ulang.

## Keputusan user (2026-10-01)

1. **Rinci:** setiap pilihan menu dan hasilnya, ditambah satu baris per akun/konten di menu 1 dan 95, lalu ringkasan run.
2. **Folder kerja lama:** `logs/audit.log` dibuat otomatis saat pertama kali menulis. Status init dan kunci menu tidak berubah, jadi tidak perlu init ulang.
3. **Format:** teks satu baris, dipisah `|`, dengan waktu lokal plus offset.
4. **Rotasi:** tidak ada. Satu `audit.log`, selalu ditambahkan di akhir.
5. **Layar menu (2026-10-01, setelah build):** baris `Workspace project` ikut menyebut `logs/` (`datas/, credentials/, logs/`). Ini satu-satunya teks layar yang berubah; aturan "jangan ubah teks layar" di Boundaries berlaku untuk teks lainnya.

## Asumsi

Koreksi kalau salah:

1. `logs/` dibuat `0700` dan `audit.log` `0600`, sama seperti `datas/` dan `credentials/`, karena log berisi UID akun.
2. `.gitignore` folder kerja ikut mendapat `logs/` (lewat `ignoreSecrets` yang sudah ada), baik saat init maupun saat log dibuat otomatis.
3. **Tidak pernah dicatat:** password, token, isi cookie, isi caption, dan input mentah dari prompt. Input menu yang tidak valid dicatat sebagai "input tidak valid" tanpa nilainya, karena operator bisa saja salah mengetik password di prompt menu.
4. Awal dan akhir sesi ikut dicatat (`SESI | mulai | bfb v0.4.0, linux x64` dan menu 99). Flag CLI (`-v`, `help`, flag tidak dikenal) tidak dicatat karena tidak membuka menu dan tidak menyentuh folder kerja.
5. Kalau log gagal ditulis (disk penuh, izin ditolak), bfb **tidak** berhenti dan tidak menggagalkan task. Satu peringatan tampil di layar, lalu bfb lanjut tanpa log sampai sesi berikutnya.
6. Waktu memakai zona waktu mesin operator, sama dengan yang tampil di "Timezone" pada layar menu.

## Format

```
<YYYY-MM-DD HH:mm:ss ±HH:MM> | <SUMBER> | <aksi> | <hasil>[ | <keterangan>]
```

- `SUMBER`: `SESI`, atau `MENU <n>` dengan `<n>` rata kiri dua karakter (`MENU 1 `, `MENU 97`).
- `hasil`: salah satu dari `mulai`, `berhasil`, `dilewati`, `gagal`, `terkunci`, `belum tersedia`, `sudah siap`, `selesai`, `dihentikan`.
- `keterangan`: pesan Bahasa Indonesia yang sama dengan di layar. Baris baru diganti spasi, dan `|` di dalam pesan diganti `/`, supaya satu kejadian selalu satu baris.

Contoh:

```
2026-10-01 14:00:01 +07:00 | SESI    | bfb v0.4.0 | mulai | linux x64
2026-10-01 14:03:12 +07:00 | MENU 97 | Aktifasi bfb | gagal | Token tidak valid
2026-10-01 14:05:40 +07:00 | MENU 1  | Rawat facebook | mulai | 180 baris
2026-10-01 14:05:58 +07:00 | MENU 1  | NO 1 UID 100092161240413 | berhasil
2026-10-01 14:06:20 +07:00 | MENU 1  | NO 2 UID 100092461914823 | gagal | Cookie tidak valid
2026-10-01 14:06:21 +07:00 | MENU 1  | NO 7 UID 100093621565922 | dilewati | Masih dalam tahap pengembangan
2026-10-01 14:41:02 +07:00 | MENU 1  | Rawat facebook | selesai | 170 berhasil, 5 dilewati, 5 gagal
2026-10-01 14:41:30 +07:00 | MENU 95 | Sinkronisasi cookies | terkunci | Fitur masih terkunci, setup terlebih dahulu
2026-10-01 14:42:00 +07:00 | MENU ?  | Input tidak valid | gagal
2026-10-01 14:42:05 +07:00 | MENU 99 | Keluar | selesai
```

## Yang dicatat per menu

| Menu             | Dicatat                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 Init project   | `sudah siap`, atau `berhasil` / `gagal` + pesan error                                                                                                              |
| 1 Rawat facebook | `terkunci`; atau `mulai` (jumlah baris), satu baris per konten (`NO`, `UID` dari kolom `COOKIE`, hasil, alasan), lalu `selesai` atau `dihentikan` + ringkasan      |
| 2, 3, 4, 98      | `belum tersedia`                                                                                                                                                   |
| 95 Sinkronisasi  | seperti menu 1, per akun (`NO`, `UID`)                                                                                                                             |
| 96 Pasang driver | `sudah siap`, atau `berhasil` / `gagal` + pesan error                                                                                                              |
| 97 Aktifasi      | `sudah siap`, atau hasil aktivasi dengan pesan yang sama seperti di layar (token kosong / tidak valid / server error / berhasil / gagal disimpan), **tanpa token** |
| 99 Keluar        | `selesai`                                                                                                                                                          |
| lainnya          | `MENU ?` `Input tidak valid`, tanpa nilai input                                                                                                                    |

Error yang tidak tertangkap di dalam task (yang sekarang muncul merah lalu "Tekan Enter") dicatat sebagai `gagal` + pesan error di menu yang sedang berjalan.

## Data dan dampak

- **CSV dan `src/types/global.ts`:** tidak berubah.
- **Folder kerja:** `logs/audit.log` baru. `checkInit()` tidak berubah (keputusan 2).
- **Data sensitif:** log tidak pernah berisi password, token, cookie, atau caption (asumsi 3). UID tercatat, sehingga file dikunci `0600`.
- **Menu (`src/commands/menu.ts`):** setiap cabang memanggil pencatat. Teks, urutan layar, dan jeda 1 detik tidak berubah.
- **`core/*` dan `runBrowserRows`:** hasil per baris (berhasil / dilewati + alasan / gagal + pesan) harus sampai ke pencatat. Dibangun lewat `onRow(outcome, row)` di `runBrowserRows` (sebelumnya hanya kegagalan, lewat `onFailure`).

## Testing Strategy

- **Unit (`tests/unit/`):** format satu baris (waktu + offset, lebar `MENU`, pembersihan baris baru dan `|`), dan pemetaan pilihan menu ke sumber/aksi.
- **Integration (`tests/integration/`):** penulis log di folder temp: membuat `logs/` `0700` dan `audit.log` `0600` kalau belum ada (juga di folder yang sudah di-init tanpa `logs/`), menambahkan di akhir tanpa menimpa, menambahkan `logs/` ke `.gitignore`, dan gagal tulis tidak melempar error. `initProject` membuat `logs/audit.log`. `runBrowserRows` dengan browser palsu melaporkan hasil setiap baris (berhasil, dilewati, gagal). Cek bahwa token dan password dari fixture tidak pernah muncul di file log.
- **Manual:** menu 1 dan 95 di Chrome sungguhan (sesuai `TODO.md`), lalu cocokkan `logs/audit.log` dengan ringkasan di layar.
- Ambang coverage 1.0 berlaku untuk setiap file baru di `src/libs/`.

## Boundaries

- **Always:** tulis satu kejadian per baris, langsung ditambahkan ke file (tanpa buffer yang bisa hilang kalau bfb ditutup paksa). Pakai pesan Bahasa Indonesia yang sama dengan di layar.
- **Ask first:** menambah dependency logging, mengubah format setelah dipakai operator, menambahkan rotasi.
- **Never:** mencatat password, token, isi cookie, caption, atau input mentah; membuat task gagal karena log gagal ditulis; mengubah teks atau jeda di layar menu.

## Success Criteria

1. `bfb` menu 0 di folder kosong membuat `logs/audit.log` (`0600`, folder `0700`) di samping `datas/` dan `credentials/`, dan `.gitignore` berisi `logs/`.
2. Di folder kerja lama tanpa `logs/`, pilihan menu pertama membuat `logs/audit.log`; status init tetap "Siap".
3. Setiap pilihan menu 0–99, termasuk input tidak valid dan menu terkunci, menghasilkan tepat satu baris hasil (ditambah baris per akun di menu 1 dan 95).
4. Menu 1 dengan N baris konten menghasilkan satu baris `mulai`, N baris per konten, dan satu baris `selesai`/`dihentikan` yang angkanya sama dengan ringkasan di layar.
5. Tidak ada password, token, isi cookie, atau caption di `audit.log` (dicek test dengan nilai fixture).
6. Log yang tidak bisa ditulis tidak menghentikan menu atau task.
7. `bun run test:coverage` tetap 100% dan semua pemeriksaan lolos.

## Open Questions

Tidak ada yang memblokir. Asumsi 1–6 di atas perlu dikonfirmasi.

---

# Spec fitur: bilingual Facebook UI (Inggris & Indonesia)

Ditulis lewat `/bfb-spec` pada 2026-10-04.

## Objective

Membuat alur sinkronisasi cookie (`src/core/cookie.ts`, menu 95) dan alur posting feed (`src/core/facebook.ts`, menu 1) mendukung antarmuka Facebook dwibahasa (Bahasa Inggris dan Bahasa Indonesia). Saat ini selektor berbasis teks hanya mendukung Bahasa Inggris, sehingga akun Facebook yang disetel ke Bahasa Indonesia gagal/error saat mencari tombol atau trigger. Dukungan dwibahasa bekerja otomatis tanpa perlu konfigurasi manual dari operator.

## Asumsi

1. Bahasa UI ditentukan oleh preferensi akun Facebook operator (Inggris atau Indonesia), bukan parameter browser.
2. Tidak ada penambahan kolom bahasa di `datas/accounts.csv` atau `datas/contents.csv`. Selektor bekerja serentak mencocokkan teks Bahasa Inggris atau Bahasa Indonesia.
3. Hanya Bahasa Inggris dan Bahasa Indonesia yang didukung. Bahasa lain tetap di luar cakupan saat ini.
4. Nilai teks elemen Facebook dapat bervariasi antara huruf besar/kecil atau menyertakan nama akun (misal: "What's on your mind, Billy?" atau "Apa yang Anda pikirkan?"), sehingga selektor menggunakan kondisi XPath yang fleksibel (`text() = ...` atau `contains(text(), ...)`).

## Pemetaan Elemen UI Dwibahasa

### 1. Sinkronisasi Cookie (`src/core/cookie.ts` - Menu 95)

| Elemen / Aksi                      | Bahasa Inggris (EN)                        | Bahasa Indonesia (ID)                   | Selektor XPath                                                                                                                       |
| :--------------------------------- | :----------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| Tombol lanjut (cookie kedaluwarsa) | `Continue` / `Continue as...`              | `Lanjutkan` / `Lanjutkan sebagai...`    | `xpath=//*[text()="Continue" or text()="Lanjutkan" or contains(text(), "Continue") or contains(text(), "Lanjutkan")]`                |
| Tombol login (cookie kosong)       | `Log in to Facebook` / `Log In`            | `Masuk ke Facebook` / `Masuk`           | `xpath=//*[text()="Log in to Facebook" or text()="Masuk ke Facebook" or text()="Log In" or text()="Masuk"]`                          |
| Form password (cookie kedaluwarsa) | `Forgotten password?` / `Forgot password?` | `Lupa kata sandi?` / `Lupa Kata Sandi?` | `xpath=//*[contains(text(), "Forgotten password?") or contains(text(), "Forgot password?") or contains(text(), "Lupa kata sandi?")]` |

### 2. Posting Facebook (`src/core/facebook.ts` - Menu 1)

| Elemen / Aksi                                      | Bahasa Inggris (EN)                                       | Bahasa Indonesia (ID)                                     | Selektor XPath                                                                                                                                                                              |
| :------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Trigger modal caption                              | `What's on your mind?`                                    | `Apa yang Anda pikirkan?`                                 | `xpath=//div[@role="button" and .//span[contains(text(), "What's on your mind") or contains(text(), "Apa yang Anda pikirkan") or contains(text(), "Apa yang anda pikirkan")]]`              |
| Indikator modal buat postingan                     | `Add to your post`                                        | `Tambahkan ke postingan Anda` / `Tambahkan ke postingan`  | `xpath=//*[contains(text(), "Add to your post") or contains(text(), "Tambahkan ke postingan") or contains(text(), "Tambahkan ke kiriman")]`                                                 |
| Tombol langkah berikutnya (jika ada)               | `Next`                                                    | `Berikutnya` / `Lanjut`                                   | `xpath=//*[(self::div[@role="button"] or self::button or self::span) and (text()="Next" or text()="Berikutnya" or text()="Lanjut")]`                                                        |
| Indikator preview posting                          | `Post preview`                                            | `Pratinjau postingan` / `Pratinjau kiriman`               | `xpath=//*[contains(text(), "Post preview") or contains(text(), "Pratinjau postingan") or contains(text(), "Pratinjau kiriman")]`                                                           |
| Tombol publish/post aktif                          | `Post`                                                    | `Kirim` / `Posting`                                       | `xpath=//div[@role="button" and .//span[(text()="Post" or text()="Posting" or text()="Kirim" or contains(text(), "Posting") or contains(text(), "Kirim"))] and not(@aria-disabled="true")]` |
| Validasi modal tertutup (`waitForSelector hidden`) | Menggunakan indikator modal dan preview dwibahasa di atas | Menggunakan indikator modal dan preview dwibahasa di atas | Evaluasi `waitForSelector` hidden dengan ekspresi XPath dwibahasa                                                                                                                           |

## Data dan Dampak

- **CSV (`datas/accounts.csv`, `datas/contents.csv`) & `src/types/global.ts`:** Tidak berubah. Format tetap dipisahkan titik koma tanpa kolom baru.
- **Data sensitif (`credentials/`):** Tidak berubah.
- **Menu CLI (`src/commands/menu.ts`):** Tidak berubah.
- **Audit log (`logs/audit.log`):** Format dan pesan log tetap konsisten dalam Bahasa Indonesia.

## Testing Strategy

- **Unit (`tests/unit/`):** Pengujian selektor atau fungsi pembantu selektor (jika diekstraksi ke helper) untuk memastikan ekspresi XPath valid dan mencakup seluruh variasi kata kunci EN dan ID.
- **Integration (`tests/integration/`):** Simulasi halaman HTML statis (mock content) berisi DOM Facebook dengan teks Bahasa Inggris dan Bahasa Indonesia untuk memverifikasi `locator` dan `waitForSelector(..., { hidden: true })` berhasil menemukan dan mendeteksi penutupan modal pada kedua bahasa.
- **Manual:** Verifikasi langsung menggunakan Chrome headful terhadap akun Facebook yang disetel ke Bahasa Indonesia (contoh referensi uji: akun nomor `53` di `workspaces/datas/accounts.csv` / `workspaces/datas/contents.csv`) dan akun yang disetel ke Bahasa Inggris.

## Boundaries

- **Always:** Gunakan selektor berbasis XPath yang mendukung kedua bahasa dalam satu ekspresi tanpa mengirim fungsi ke browser (`page.evaluate()`) demi keamanan obfuscator.
- **Ask first:** Menambah dukungan bahasa ketiga atau mengubah toleransi substring teks jika terjadi konflik elemen UI Facebook.
- **Never:** Mengubah header/kolom CSV; mengirim fungsi callback Javascript ke konteks browser; mengubah teks menu CLI atau format audit log.

## Success Criteria

1. Akun Facebook dengan pengaturan Bahasa Indonesia dapat menyelesaikan alur sinkronisasi cookie (menu 95) baik saat cookie kedaluwarsa maupun belum ada.
2. Akun Facebook dengan pengaturan Bahasa Indonesia dapat memposting feed (menu 1) tanpa error 'Trigger caption tidak ditemukan', 'Tombol next tidak ditemukan' (bila ada langkah next), atau 'Publish tidak valid'.
3. Akun Facebook dengan pengaturan Bahasa Inggris tetap berfungsi normal tanpa regresi pada menu 95 dan menu 1.
4. `bun run test:coverage` tetap 100% dan seluruh pengecekan `bun run check`, `bun run lint`, dan `bun run type-check` lulus tanpa error.

## Open Questions

1. Apakah ada variasi dialek/frasa lain pada akun Facebook operator (misalnya Bahasa Melayu atau Bahasa Indonesia varian mobile/desktop) yang pernah ditemui?
