# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, setelah 7 commit rilis dwibahasa Facebook (`98e6117`). Cakupan: penyelarasan instruksi backend `gemini` untuk pelabelan graphify, verifikasi seluruh suite dan build, serta pembaruan knowledge graph via Gemini.

## 1. TODO.md

- Tidak ada item baru atau dihapus. Seluruh 11 temuan terbuka masih akurat dan sesuai kondisi kode saat ini.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy (`~/.gemini/antigravity-cli/knowledge/`) hanya berisi `knowledge.lock`. Tidak ada memory yang perlu diselaraskan.

## 3. Yang usang

Tidak ada file usang atau kode mati.

## 4. Sisa debug

Bersih: tidak ada log debug, breakpoint, `.only`/`.skip`, atau file coretan untracked.

## 5. Docs

- `AGENTS.md`: opsi pelabelan komunitas `graphify label` diperbarui untuk mencantumkan alternatif `--backend=gemini` bila `GOOGLE_API_KEY` terpasang.
- `docs/`: versi mirror tetap cocok dengan `.bumrc` dan `bun.lock`.

## 6. Skills

`skills/bfb-prepare/SKILL.md` langkah 9 diperbarui untuk mencantumkan opsi `--backend=gemini` di samping `--backend=claude-cli`.

## 7. Pengetahuan

Pola integrasi `graphify` dengan backend Gemini terverifikasi: membutuhkan `graphifyy[openai]` dan environment variable `GOOGLE_API_KEY` (Free Tier Google AI Studio).

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

`graphify update .` lalu `graphify label . --backend=gemini`: **878 node, 1228 edge, 45 komunitas**, seluruhnya berhasil terlabel melalui Gemini backend. `bun run format` dijalankan ulang sesudahnya.
