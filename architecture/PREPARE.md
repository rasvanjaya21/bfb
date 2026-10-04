# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, setelah `/bfb-ship` (keputusan GO untuk fitur bilingual Facebook UI). Cakupan: sinkronisasi cookies dan post feed Facebook bilingual (EN & ID), ekstraksi `src/libs/facebook-selectors.ts`, pengujian `tests/unit/011-facebook-selectors.test.ts`, pembaruan alur siklus 8 tahap, dan pembersihan repo sebelum `/bfb-commit`.

## 1. TODO.md

- **Diperbarui:** angka cakupan file di `TODO.md` disesuaikan dari 26/36 menjadi 27 dari 37 file `src/` menyusul penambahan `src/libs/facebook-selectors.ts` yang di-import dan dites oleh `tests/unit/011-facebook-selectors.test.ts`.
- Temuan lain tidak berubah (total 11 item terbuka).

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy (`~/.gemini/antigravity-cli/knowledge/`) hanya berisi `knowledge.lock`. Tidak ada item memory baru yang bertentangan atau perlu disinkronkan.

## 3. Yang usang

Tidak ada kode mati, file sementara yang usang, atau konfigurasi usang.

## 4. Sisa debug

Bersih: tidak ada `console.debug`/`console.dir`, `debugger`, `.only`/`.skip` di test suite, atau file untracked yang tidak diinginkan.

## 5. Docs

- `AGENTS.md`: diagram dan daftar siklus diperbarui ke alur 8 tahap (`/bfb-prepare` → `/bfb-spec` → `/bfb-plan` → `/bfb-build` → `/bfb-test` → `/bfb-review` → `/bfb-ship` → `/bfb-prepare` → `/bfb-commit`).
- `docs/`: versi mirror (`bun.md`, `bunup.md`, `puppeteer.md`, `puppeteer-extra.md`) cocok dengan `.bumrc` dan `bun.lock`.

## 6. Skills

Semua 8 skill di `skills/bfb-*/SKILL.md` diselaraskan ke rute 8 tahap: `bfb-prepare` (awal) → `bfb-spec` → `bfb-plan` → `bfb-build` → `bfb-test` → `bfb-review` → `bfb-ship` → `bfb-prepare` (akhir) → `bfb-commit`.

## 7. Pengetahuan

Pola selektor bilingual Facebook berbasis XPath union tanpa `page.evaluate()` (menjaga kompatibilitas penuh dengan `javascript-obfuscator`) dan rute siklus 8 tahap resmi dicatat di `AGENTS.md` dan skills.

## 8. Perintah

| Perintah             | Hasil                                     |
| -------------------- | ----------------------------------------- |
| `bun run format`     | exit 0                                    |
| `bun run lint`       | exit 0 (0 warning, 0 error)               |
| `bun run type-check` | exit 0                                    |
| `bun run check`      | exit 0 (bebas import relatif)             |
| `bun run test`       | exit 0, 144 pass, 0 fail, 21 file         |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=claude-cli`: **878 node, 1228 edge, 45 komunitas**, seluruh komunitas terlabel deskriptif. `bun run format` dijalankan ulang sesudahnya.
