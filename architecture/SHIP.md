# Ship decision: Human Behavior Emulation

Ditulis lewat `/bfb-ship` pada 2026-10-04. Tiga spesialis dievaluasi: `code-reviewer`, `security-auditor`, `test-engineer`. Tidak ada push, tag, atau `bun run release` tanpa persetujuan eksplisit user.

## Ship Decision: **GO**

Seluruh kriteria rilis dan checklist pra-launch terpenuhi. Tidak ada blocker keamanan atau kualitas kode. Perubahan siap untuk tahap berikutnya (`/bfb-prepare` lalu `/bfb-commit`).

---

### Blockers

Tidak ada (0 blocker).

### Recommended Fixes

Tidak ada.

### Acknowledged Risks

| Risiko                                                                     | Dampak | Mitigasi                                                                                                                                                  |
| :------------------------------------------------------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Peningkatan total durasi otomasi karena jeda antar baris akun (5–15 detik) | Rendah | Tradeoff yang disengaja untuk mencegah deteksi bot Facebook; kecepatan eksekusi test tetap cepat dengan bypass delay `{ min: 0, max: 0 }`                 |
| Akun tetap berisiko di-flag jika IP operator kotor / spamming dari 1 IP    | Sedang | Fitur proxy sengaja ditunda (YAGNI) karena operator saat ini menggunakan jaringan WiFi rumah; dapat ditambahkan di masa depan jika kebutuhan proxy muncul |

### Checklist bfb

| Cek                                                         | Hasil                                                                                     |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `type-check`, `lint`, `check`, `test:coverage`, `build`     | Semua hijau (157 pass, coverage 100% baris & fungsi)                                      |
| `VERSION` vs `package.json`                                 | `v0.5.2` = `0.5.2` (cocok)                                                                |
| Isi tarball (`bun pm pack --dry-run`)                       | 4 file: `package.json`, `LICENSE`, `README.md`, `dist/index.js` (95.95 KB, ter-obfuscate) |
| `datas/`, `credentials/`, cookie, token ter-commit/ter-pack | Bersih, tidak ada kredensial yang ikut ter-pack atau ter-stage                            |
| `DRIVER_VERSION` berubah                                    | Tidak (`147.0.7727.101`); operator tidak perlu mengunduh ulang driver                     |
| Dist dijalankan                                             | `bun run dist/index.js --version` → `v0.5.2`; flag salah dan bantuan bekerja normal       |

### Rollback Plan

- **Trigger:** Kegagalan interaksi klik / ketik pada varian Facebook tertentu, atau bug tak terduga pada runtime headless/headful.
- **Prosedur:**
    1. Jika dipublikasikan ke npm: `npm deprecate @rasvanjaya21/bfb@<version> "Gunakan versi sebelumnya v0.5.1"`.
    2. Operator kembali ke versi sebelumnya: `bun add --global @rasvanjaya21/bfb@0.5.1`. Format file data runtime (`accounts.csv`, `contents.csv`, `cookies.json`) tidak berubah dan 100% kompatibel dua arah.
    3. Perbaikan kode dilakukan di branch utama dengan commit revert atau patch baru.
- **Waktu pemulihan:** < 5 menit.

---

### Specialist Reports

1. **code-reviewer:**
    - 5-axis review: Correctness, Readability, Architecture, Security, Performance lulus tanpa temuan Critical atau Important.
    - Checklist mekanis bfb: Tidak ada import relatif, alur browser tetap lewat `runBrowserRows`, tidak ada `process.exit`, teks user konsisten Bahasa Indonesia.
    - Semua logika acak dan kontrol kursor berjalan di proses host Bun menggunakan Puppeteer native Keyboard & Mouse API tanpa fungsi `page.evaluate()` / `$eval()`, sehingga kebal terhadap kerusakan akibat obfuscator.

2. **security-auditor:**
    - Credential storage & permissions: Tidak ada perubahan ke format atau permission file `0600`/`0700`.
    - Token & secrets leakage: Pengetikan UID dan Password akun di `syncCookies` memanfaatkan `humanType` langsung ke browser page tanpa pernah dicetak ke console atau log audit.
    - Tarball inspection: `bun pm pack --dry-run` memverifikasi hanya 4 file esensial yang dipaketkan. File `datas/`, `credentials/`, dan test files tidak pernah masuk tarball.
    - Supply chain: Tidak ada dependensi npm baru yang ditambahkan; seluruh fungsionalitas memanfaatkan library terpasang dan API standar.

3. **test-engineer:**
    - Coverage: Ambang 100% lines & functions di `bunfig.toml` terpenuhi secara ketat (157 pass dari 24 file test).
    - Unit test baru:
        - `tests/unit/012-random-delay.test.ts` (6 test): membuktikan batas range acak, penanganan `min === max`, serta validasi argumen negatif dan terbalik.
        - `tests/unit/013-human-type.test.ts` (3 test): membuktikan urutan ketikan, penanganan string kosong, dan opsi delay kustom / bawaan.
        - `tests/unit/014-human-click.test.ts` (2 test): membuktikan interpolasi langkah gerak kursor, offset acak bounding box, serta fallback ke `handle.click()` saat bounding box null.
    - Integration test: `tests/integration/005-run-browser-rows.test.ts` (17 test) membuktikan jeda cooldown antar baris akun dan proteksi saat browser disconnect.
    - Build verification: `dist/index.js` ter-obfuscate berjalan normal dengan Bun runtime (`v0.5.2`).
