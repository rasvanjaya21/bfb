# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-01, setelah `bf5090f`. Cakupan sejak prepare sebelumnya: fitur audit log (spec, plan, build Task 1–8), Chrome tanpa jendela `about:blank`, loader `check.ts` per ekstensi, `logs/` di status workspace, dan uji di akun sungguhan. Semua langkah skill dijalankan.

## 1. TODO.md

- **Dihapus:** deteksi cookie kedaluwarsa via `includes('next')` — terbukti bekerja di halaman login Facebook yang sekarang (`login.php?next=...`, uji akun NO 1).
- **Ditambah (Low):** `--no-startup-window` di `launch-browser.ts` baru diuji di Linux; perilaku di macOS dan Windows belum dicoba.
- **Diperbarui:** coverage sekarang mencakup 26 dari 36 file `src/` (`download-driver.ts` ikut tercakup; daftar file yang tidak tercakup disesuaikan).
- Sebelum prepare (atas permintaan user): item "Bun 1.4.2 belum diuji manual", "Audit log belum dicek di alur sungguhan", dan "Posting Facebook belum diverifikasi" ditutup (posting dianggap berhasil oleh user).
- Total 10 item terbuka.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy kosong (hanya `knowledge.lock`), dan tidak ada sesi `brain/` dari workspace ini.

## 3. Usang

- `architecture/TEST.md`: jumlah test (135 pass, 20 file; unit 36, integration 88, endpoint 11), baris untuk `unit/008–010` dan `integration/008–009`, coverage 26/36, `download-driver.ts` sekarang dites, catatan `--no-startup-window` dan uji akun sungguhan.
- `architecture/SPEC.md`: dampak `runBrowserRows` sekarang menyebut `onRow` (bukan "saat ini hanya `onFailure`").

## 4. Sisa debug

Tidak ada: tanpa `console.debug`/`dir`, `debugger`, kode ter-comment, `.only`/`.skip`, atau file coba-coba. Semua harness uji sementara (`backups/*.test.ts`, eksperimen `xvfb`) dan folder kerja sementara berisi cookie hasil login sudah dihapus. Isi `backups/` milik user utuh.

## 5. Docs

- `AGENTS.md` (sebelum prepare): `waitUntil: 'networkidle2'` di `postFeed` dicatat sebagai keputusan user.
- `docs/`: header sama dengan `.bumrc` dan `bun.lock` (Bun 1.4.2, bunup 0.16.32, puppeteer-core 24.43.1 / browsers 2.13.2, puppeteer-extra 3.3.6 / stealth 2.11.2); pasangan gitmcp ↔ `docs/` tetap 4:4. `README.md` dan `CONTRIBUTING.md` sudah sesuai.

## 6. Skills

- `bfb-test`: `bun test` berjalan dengan `TZ=UTC`, dan harness `*.test.ts` sementara tidak boleh ditaruh di repo karena ikut dijalankan. Setiap folder skill hanya berisi `SKILL.md`.

## 7. Pengetahuan

- Memory Claude baru `ask-before-changing-deliberate-choices`: perilaku waktu yang tampak janggal (`networkidle2`, jeda 1 detik) bisa disengaja; tanya dulu sebelum mengubah.

## 8. Formatter, linter, test, build

| Perintah        | Hasil                              |
| --------------- | ---------------------------------- |
| `format`        | exit 0                             |
| `lint`          | exit 0                             |
| `type-check`    | exit 0                             |
| `check`         | exit 0                             |
| `test`          | exit 0 — 135 pass, 0 fail, 20 file |
| `build`         | exit 0                             |
| `test:coverage` | exit 0 — 100% fungsi, 100% baris   |

## 9. Graphify

`graphify update .` → `graphify label . --backend=claude-cli` → `bun run format`: **849 node, 1024 edge, 46 komunitas**, tanpa `Community N` dan tanpa label nama file.
