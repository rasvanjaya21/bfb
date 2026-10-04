# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, di akhir siklus perbaikan login manual Facebook (bootloader delay & input focus) dan pencegahan pencurian fokus jendela di Linux GNOME. Cakupan: verifikasi TODO.md, pembersihan folder `logs/` lokal dan `.gitignore`, verifikasi seluruh suite test dan build, pembaruan graphify dan pelabelan komunitas via `gemini` backend.

## 1. TODO.md

- Item terbuka diverifikasi terhadap kode saat ini; seluruh catatan masih akurat dan tidak ada item yang berubah status.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy (`~/.gemini/antigravity-cli/knowledge/`) hanya berisi `knowledge.lock`. Tidak ada memory yang perlu diselaraskan.

## 3. Yang usang

- Folder `logs/` lokal di root project dihapus dan entri `logs/` di `.gitignore` dibersihkan. Tidak ada kode atau file usang yang tersisa di `src/`.

## 4. Sisa debug

- Tidak ada log debug, breakpoint, `.only`, atau platform `.skip` yang tidak semestinya di `src/` maupun `tests/`.

## 5. Docs

- `AGENTS.md`, `README.md`, dan `CONTRIBUTING.md` tetap akurat dan mutakhir.
- `docs/`: versi mirror tetap cocok dengan `.bumrc` (Bun 1.4.2) dan `bun.lock`.

## 6. Skills

Seluruh file di `skills/bfb-*/SKILL.md` sudah sinkron dan sesuai konvensi serta alur kerja repo.

## 7. Pengetahuan

Pengetahuan baru sesi ini:

1. Elemen `loginContinue` di Facebook Comet perlu menargetkan pembungkus `role="button"` atau `button` agar event klik tidak diabaikan oleh inner `<span>`.
2. Dialog password Facebook Comet dimuat dinamis via bootloader; perlu retry klik bila dialog belum muncul dalam 3 detik.
3. Dialog password tidak selalu auto-focus di semua profil; pembidikan dan penekanan eksplisit pada `input[type="password"]` lewat `humanClick` diperlukan sebelum memverifikasi `ensurePasswordFocus`.
4. Flag `--start-maximized` di GNOME Wayland mem-bypass pencegahan fokus `strict`; diubah ke ukuran tetap `--window-size=1280,900` untuk menjaga layout desktop tanpa merebut fokus.
5. `xvfb-run bfb` dapat digunakan untuk menjalankan seluruh otomasi browser tanpa membuka jendela fisik di desktop Linux.

## 8. Perintah

| Perintah             | Hasil                                                               |
| :------------------- | :------------------------------------------------------------------ |
| `bun run format`     | exit 0                                                              |
| `bun run lint`       | exit 0 (0 warning, 0 error)                                         |
| `bun run type-check` | exit 0 (`tsgo --noEmit`)                                            |
| `bun run check`      | exit 0 (0 import relatif)                                           |
| `bun run test`       | exit 0, 157 pass, 0 fail, 24 file (100% coverage lines & functions) |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` (21.93 KB raw)            |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=gemini`: **924 node, 1345 edge, 58 komunitas**, seluruhnya berhasil terlabel via Gemini. `bun run format` dijalankan ulang sesudahnya.
