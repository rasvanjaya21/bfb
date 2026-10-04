# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, di akhir siklus fitur Human Behavior Emulation (setelah `/bfb-ship` dengan status GO). Cakupan: pembaruan catatan coverage di TODO.md, dokumentasi konvensi emulasi interaksi manusiawi di AGENTS.md, verifikasi seluruh suite test dan build, pembaruan graphify dan pelabelan komunitas via claude-cli backend.

## 1. TODO.md

- Memperbarui rasio file yang tercakup dalam laporan test coverage dari 27/37 menjadi 30/40 file `src/` (menambahkan modul baru `random-delay.ts`, `human-type.ts`, `human-click.ts`).

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy (`~/.gemini/antigravity-cli/knowledge/`) hanya berisi `knowledge.lock`. Tidak ada memory yang perlu diselaraskan.

## 3. Yang usang

Tidak ada file usang atau kode mati di `src/` maupun `architecture/`.

## 4. Sisa debug

- Tidak ada log debug, breakpoint, `.only`, atau platform `.skip` yang tidak semestinya di `src/` maupun `tests/`.

## 5. Docs

- `AGENTS.md`: Diperbarui pada bagian alur runtime (penerapan cooldown antar baris akun `interRowDelay` 5–15 detik) dan konvensi kode (kewajiban penggunaan `humanClick`, `humanType`, dan `randomDelay` pada interaksi browser di `core/*`).
- `README.md` dan `CONTRIBUTING.md` tetap akurat dan mutakhir.
- `docs/`: versi mirror tetap cocok dengan `.bumrc` (Bun 1.4.2) dan `bun.lock`.

## 6. Skills

Seluruh file di `skills/bfb-*/SKILL.md` sudah sinkron dan sesuai konvensi serta alur kerja repo.

## 7. Pengetahuan

Pengetahuan baru terkait Human Behavior Emulation (penghindaran deteksi bot Facebook secara host-side lewat native Puppeteer Keyboard dan Mouse API tanpa `page.evaluate`) didokumentasikan langsung di `AGENTS.md`.

## 8. Perintah

| Perintah             | Hasil                                                               |
| :------------------- | :------------------------------------------------------------------ |
| `bun run format`     | exit 0                                                              |
| `bun run lint`       | exit 0 (0 warning, 0 error)                                         |
| `bun run type-check` | exit 0 (`tsgo --noEmit`)                                            |
| `bun run check`      | exit 0 (0 import relatif)                                           |
| `bun run test`       | exit 0, 157 pass, 0 fail, 24 file (100% coverage lines & functions) |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` (21.52 KB raw)            |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=claude-cli`: **924 node, 1342 edge, 59 komunitas**, seluruhnya berhasil terlabel. `bun run format` dijalankan ulang sesudahnya.
