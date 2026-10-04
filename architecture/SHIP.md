# Ship decision: bilingual Facebook UI (Inggris & Indonesia)

Ditulis lewat `/bfb-ship` pada 2026-10-04. Tiga spesialis dievaluasi: `code-reviewer`, `security-auditor`, `test-engineer`. Tidak ada push, tag, atau `bun run release` tanpa persetujuan eksplisit user.

## Ship Decision: **GO**

Seluruh kriteria rilis dan checklist pra-launch terpenuhi. Tidak ada blocker keamanan atau kualitas kode. Perubahan siap untuk tahap berikutnya (`/bfb-prepare` lalu `/bfb-commit`).

---

### Blockers

Tidak ada (0 blocker).

### Recommended Fixes

Tidak ada.

### Acknowledged Risks

| Risiko                                                         | Dampak | Mitigasi                                                                                                           |
| :------------------------------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------- |
| Perubahan DOM Facebook di masa depan yang mengubah teks tombol | Sedang | Selektor memakai `contains()` dan XPath union yang fleksibel; mudah diperbarui di `src/libs/facebook-selectors.ts` |
| Akun Facebook dengan bahasa ketiga (di luar EN & ID)           | Rendah | Spec saat ini sengaja membatasi hanya pada bilingual EN & ID sesuai kebutuhan operator                             |

### Checklist bfb

| Cek                                                         | Hasil                                                                                    |
| :---------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `type-check`, `lint`, `check`, `test:coverage`, `build`     | Semua hijau (144 pass, coverage 100% baris & fungsi)                                     |
| `VERSION` vs `package.json`                                 | `v0.5.1` = `0.5.1` (cocok)                                                               |
| Isi tarball (`bun pm pack --dry-run`)                       | 4 file: `package.json`, `LICENSE`, `README.md`, `dist/index.js` (85.5 KB, ter-obfuscate) |
| `datas/`, `credentials/`, cookie, token ter-commit/ter-pack | Bersih, tidak ada kredensial yang ikut ter-pack atau ter-stage                           |
| `DRIVER_VERSION` berubah                                    | Tidak (`147.0.7727.101`); operator tidak perlu mengunduh ulang driver                    |
| Dist dijalankan                                             | `bun run dist/index.js --version` → `v0.5.1`; help dan flag salah bekerja normal         |

### Rollback Plan

- **Trigger:** Kegagalan selector Facebook pada versi rilis, kegagalan login manual, atau issue tak terduga pada akun live.
- **Prosedur:**
    1. Jika dipublikasikan ke npm: `npm deprecate @rasvanjaya21/bfb@<version> "Gunakan versi sebelumnya v0.5.1"`.
    2. Operator kembali ke versi sebelumnya: `bun add --global @rasvanjaya21/bfb@0.5.1`. Data di folder kerja (`datas/`, `credentials/`, `logs/`) sepenuhnya kompatibel dua arah tanpa migrasi.
    3. Perbaikan kode dilakukan di branch utama dengan commit revert atau patch baru.
- **Waktu pemulihan:** < 5 menit.

---

### Specialist Reports

1. **code-reviewer:**
    - 5-axis review: Correctness, Readability, Architecture, Security, Performance lulus.
    - Checklist mekanis bfb: Tidak ada import relatif, alur browser tetap lewat `runBrowserRows`, tidak ada `process.exit`, teks user konsisten Bahasa Indonesia.
    - Ekstraksi selektor ke `src/libs/facebook-selectors.ts` bersih dan mematuhi batas arsitektur.

2. **security-auditor:**
    - Credential storage & permissions: Tidak ada perubahan ke format atau permission file `0600`/`0700`.
    - Token & secrets leakage: Tidak ada token atau password yang dicetak ke konsol atau audit log.
    - Tarball inspection: `bun pm pack --dry-run` memverifikasi hanya 4 file esensial yang dipaketkan. File `datas/`, `credentials/`, dan test fixtures tidak pernah masuk tarball.
    - Workflow release: Action di-pin ke SHA, tidak ada risiko supply chain baru.

3. **test-engineer:**
    - Coverage: 100% fungsi dan baris di `bunfig.toml` tetap terpenuhi (144 pass dari 21 file test).
    - Pengujian unit: `tests/unit/011-facebook-selectors.test.ts` (9 test) membuktikan seluruh kunci selektor memuat frasa EN dan ID serta kondisi XPath valid.
    - Build verification: `dist/index.js` ter-obfuscate berjalan normal dengan Bun runtime.
