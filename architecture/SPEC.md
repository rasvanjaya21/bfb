# Spec: bfb (Bot for billy) — as-built

Ditulis lewat `/bfb-spec` pada 2026-09-30. Spec ini mendokumentasikan bfb **apa adanya** di v0.4.0 setelah perbaikan audit, bukan fitur baru. Fitur baru butuh spec sendiri.

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

Bun 1.3.9 (`.bumrc`), TypeScript ESM, bunup 0.16.31 (`target: 'bun'`, `splitting: false`) + javascript-obfuscator, puppeteer-core 24.41.0, puppeteer-extra 3.3.6 + puppeteer-extra-plugin-stealth 2.11.2, @puppeteer/browsers 2.13.0, Chrome `147.0.7727.101` (`DRIVER_VERSION`), chalk, `tsgo`, oxlint, prettier, `bun test`, bumpp. Dokumentasi resmi versi-versi ini ada offline di `docs/`.

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
- `bfb --version`/`-v`/`version` mencetak versi; flag lain yang tidak dikenal ditolak dengan pesan.

### Setup (menu 0, 96)

- Menu 0 membuat semua file di tabel di atas tanpa pernah menimpa file yang sudah ada, dan memperbaiki permission yang sudah ada.
- Menu 96 memasang Chrome `DRIVER_VERSION` ke `~/.cache` lewat `detectBrowserPlatform()`; platform yang tidak didukung ditolak dengan pesan.

### Aktivasi (menu 97)

- Token diketik tersamar (`*`), backspace bekerja, tombol panah diabaikan, tombol Esc tidak mengganggu, dan input yang datang sekaligus (ketikan cepat, paste) tetap dikenali. Input yang bukan ASCII cetak tanpa spasi ditolak sebagai token tidak valid tanpa memanggil server.
- Hasil ditentukan dari **isi body** JSON, bukan status HTTP (server membalas token salah dengan 500 `{"state":false}`):
    - body berisi `token` string ASCII tanpa spasi (1–4096 karakter) → token disimpan → "Token valid, aktifasi berhasil"
    - body lain → "Token tidak valid, aktifasi gagal"
    - timeout 5 detik, gangguan jaringan, atau body bukan JSON → "Server error, aktifasi gagal"
- Cek aktivasi di menu memakai timeout 5 detik, tidak memanggil server kalau belum ada token, dan hasil aktif di-cache sampai proses selesai.

### Posting Facebook (menu 1)

- Didukung: `ROUTE=PERSONAL` + `TYPE=POST`. Rute/tipe kosong atau tidak dikenal → gagal; kombinasi lain (`BM`, `FEED`, `REEL`, `STORY`) → **dilewati** sebelum browser membuka halaman.
- Baris tanpa cookie untuk `COOKIE` → gagal ("Cookie tidak ditemukan"); cookie ditolak Facebook → gagal ("Cookie tidak valid").
- Baris dihitung **berhasil** hanya setelah composer Facebook tertutup dalam 30 detik setelah Post.
- Setiap baris berjalan di browser context sendiri yang ditutup setelah baris selesai, apa pun hasilnya (cookie, localStorage, IndexedDB tidak terbawa). Context gagal ditutup → proses dihentikan.
- Browser ditutup sendiri → loop berhenti, ringkasan tetap tampil, kembali ke menu. Tab yang ditutup saja → hanya baris itu gagal.

### Sinkronisasi cookie (menu 95)

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
- CI (`ci.yml`): type-check, lint, check, test, build, `bun publish --dry-run` di ubuntu/macos/windows dengan Bun dari `.bumrc`.

## Boundaries

- **Always:** lewat `runBrowserRows()` untuk setiap loop browser (context per baris); tulis data sensitif lewat `writeSecretFile()`; jalankan `bun run lint`, `type-check`, `check`, `test` sebelum commit; generate ulang `docs/` setelah bump versi.
- **Ask first:** menjalankan bot terhadap akun sungguhan; menyentuh `datas/`/`credentials/` operator; mengubah `DRIVER_VERSION`; menambah dependency; mengubah `release.yml`; `bun run release`.
- **Never:** commit isi `datas/`, `credentials/`, cookie, atau token; `process.exit` di `core/*`; memindah publish npm ke `bun publish` (Bun 1.3.9 tidak mendukung OIDC); mencetak password/cookie/token ke log.

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
