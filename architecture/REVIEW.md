# Review: Human Behavior Emulation

Ditulis lewat `/bfb-review` pada 2026-10-04. Cakupan: implementasi human behavior emulation untuk mencegah deteksi bot Facebook — helper delay acak (`src/libs/random-delay.ts`), ketikan berirama manusiawi (`src/libs/human-type.ts`), pergerakan & klik mouse bertahap (`src/libs/human-click.ts`), cooldown jeda antar baris akun (`src/libs/run-browser-rows.ts`), integrasi ke `src/core/facebook.ts` dan `src/core/cookie.ts`, serta unit & integration test pendukung (`tests/unit/012-random-delay.test.ts`, `tests/unit/013-human-type.test.ts`, `tests/unit/014-human-click.test.ts`, `tests/integration/005-run-browser-rows.test.ts`).

## Verdict

**Approve.** Perubahan bersih, modular, dan sepenuhnya berjalan di proses host Bun menggunakan Puppeteer native Keyboard dan Mouse API. Tidak ada injeksi fungsi ke browser (`page.evaluate`) sehingga 100% aman terhadap build obfuscator. Seluruh checklist mekanis bfb terpenuhi dan cakupan test tetap 100% baris & fungsi (157 test pass).

## Checklist bfb (mekanis)

| Cek                                                 | Hasil                                                                    |
| :-------------------------------------------------- | :----------------------------------------------------------------------- |
| Import relatif                                      | tidak ada (`bun run check` lolos)                                        |
| Loop browser di `core/*` di luar `runBrowserRows()` | tidak ada; alur tetap menggunakan `runBrowserRows()`                     |
| `process.exit` di `core/*`                          | tidak ada                                                                |
| Password/cookie/token tercetak ke console           | tidak ada (`humanType` menerima string tanpa logging)                    |
| Tulis data sensitif tanpa `0600`                    | tidak ada perubahan penulisan file kredensial                            |
| Header CSV vs `src/types/global.ts`                 | cocok, format CSV dipertahankan (YAGNI proxy)                            |
| Dependency runtime vs `external` bunup              | tidak ada dependency runtime baru (murni Puppeteer bawaan & Math.random) |
| `VERSION` vs `package.json`                         | `v0.5.2` = `0.5.2`                                                       |
| Teks untuk user bukan Bahasa Indonesia              | seluruh pesan error dan log layar tetap Bahasa Indonesia konsisten       |
| Klaim `AGENTS.md` / skill yang jadi salah           | tidak ada; context isolation & lifecycle tetap valid                     |

## Review Lima Sumbu

### 1. Correctness

- **Kesesuaian Spec:** Seluruh kebutuhan yang disepakati di `architecture/SPEC.md` telah diimplementasikan:
    - `randomDelay` menghasilkan delay acak dengan distribusi seragam dalam batas min-max.
    - `humanType` mengetik per karakter dengan jeda acak 40–120ms dan jeda ekstra 150–350ms pada spasi/tanda baca.
    - `humanClick` menghitung bounding box elemen, mengambil titik acak 20%–80%, menggerakkan kursor kustom 5–15 langkah, jeda hover, klik mouse down/up dengan durasi tahan, dan fallback ke `handle.click()` jika bounding box null.
    - `interRowDelay` memberikan jeda istirahat akun 5–15 detik antar baris CSV, tanpa menunda setelah baris terakhir atau saat terputus.
- **Penanganan Edge Case:**
    - `min > max` atau nilai negatif pada `randomInt` melempar Error deskriptif.
    - `humanType` pada string kosong langsung selesai tanpa error.
    - Elemen tanpa bounding box (inline / pseudo-element) di-fallback dengan aman ke click bawaan puppeteer.
    - Disconnect browser di tengah alur atau saat cooldown tertangani segera.
- **Obfuscator Safety:** 100% bebas dari `page.evaluate()` atau `$eval()`. Logika acak dan kalkulasi titik kursor dijalankan di proses Bun.

### 2. Readability & Simplicity

- Penamaan fungsi sangat jelas dan intuitif: `randomDelay`, `randomInt`, `humanType`, `humanClick`, `interRowDelay`.
- Modul-modul baru berukuran ringkas (20–30 baris per file) dan terfokus pada satu tanggung jawab.
- Menghindari dependensi eksternal (seperti ghost-cursor atau bezier-curve library) sesuai filosofi _ponytail_: native interpolation puppeteer `steps` sudah memadai.

### 3. Architecture

- Struktur mengikuti pemisahan tanggung jawab bfb: pembantu otomasi di `src/libs/`, orkestrasi posting di `src/core/facebook.ts`, dan login di `src/core/cookie.ts`.
- Ambang coverage 100% lines & functions pada `bunfig.toml` tetap terpenuhi tanpa kompromi (157 test pass).
- Delay antar baris dapat di-bypass pada test otomatis (`{ min: 0, max: 0 }`), menjaga kecepatan test suite tetap tinggi (~22s untuk seluruh suite).

### 4. Security

- Password akun pada `syncCookies` diketik via `humanType` langsung ke browser context tanpa menyentuh log, audit log, atau standard output.
- Tidak ada data kredensial atau payload CSV yang bocor ke log trace.
- Tidak ada evaluasi script dinamis di konteks browser.

### 5. Performance

- Delay acak berada dalam rentang wajar (milidetik pada ketikan, detik pada transisi akun).
- Tidak ada loop tanpa batas atau alokasi memori berlebih.
- Kecepatan unit & integration test suite terjaga berkat konfigurasi delay yang fleksibel pada pengujian.

## Temuan

### Critical

Tidak ada.

### Important

Tidak ada.

### Suggestion

1. **Uji Coba Headful Langsung:** Operator disarankan menjalankan menu `1` (Rawat facebook) atau menu `95` (Sinkronisasi cookies) pada browser headful nyata untuk mengamati secara visual kehalusan pergerakan mouse dan variasi kecepatan pengetikan.

## Verifikasi Akhir

- `bun run type-check`: 0 error (`tsgo --noEmit`).
- `bun run lint`: 0 warning, 0 error (`oxlint`).
- `bun run check`: 0 relative import (`check.ts`).
- `bun run test:coverage`: 157 pass (100% lines & functions coverage pada seluruh file yang di-import).
- `bun run build`: build `dist/index.js` sukses ter-bundle dan ter-obfuscate tanpa error.
