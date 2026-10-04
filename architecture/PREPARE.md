# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-05, di akhir siklus setelah `/bfb-ship`. Cakupan perubahan yang belum di-commit sejak `8666fe3`: fix alur posting dari run 180 konten (`/bfb-observe`), skill `bfb-observe` dan rute siklus baru, fitur CLI `help`/`-b`/`-e`, perbaikan pasca-ship (probe caption, `askYesNo`, `checkSetup`, `loadRows`, audit log persetujuan, override `basic-ftp`), dan dokumen `architecture/*`.

## 1. TODO.md

- Semua item diverifikasi terhadap kode dan config saat ini, dan semuanya masih berlaku: `asset-checker.ts` masih tidak dipakai, `--no-startup-window` hanya diuji di Linux, `actions/checkout` masih v4.4.0 (`11d5960`), `mcp-remote` di config global agy belum di-pin, dan `ubuntu-latest` berganti 2026-10-19.
- Sudah dihapus sebelum prepare (dalam sesi ini): prompt `y/N` yang menggantung (diperbaiki), serta langkah Boost post dan `--disable-frame-rate-limit` di GNOME (user menganggapnya uji manual, bukan temuan).
- Tidak ada temuan baru. Referensi `file:line` (`facebook.ts:145`, `:250`) dan jumlah file coverage (34 dari 45) sudah diperbarui.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): tidak ada sesi agy di bfb setelah `fc2bf5f2`, yang sudah diproses di prepare sebelumnya, dan Knowledge Items agy masih kosong. Preferensi baru dari sesi ini (memisahkan "temuan" dari "uji manual oleh user") disimpan ke memory Claude (`findings-vs-manual-tests.md`) dan ke `AGENTS.md` supaya agy ikut membacanya.

## 3. Yang usang

- Tidak ada kode, file, atau dependency usang di `src/`. `src/libs/asset-checker.ts` tetap ada karena keputusannya masih terbuka di `TODO.md`.
- `AGENTS.md`: baris kosong sebelum langkah 6 di "Alur runtime" dihapus, sehingga langkah 6 kembali menjadi bagian dari daftar.

## 4. Sisa debug

Tidak ada `console.debug`/`console.dir`, `debugger`, `.only`, atau `.skip` di `src/`, `tests/`, maupun script root. Proses latar belakang dari run posting (runner, Chrome, penahan FIFO, monitor) sudah dihentikan. `temp/observe/` (di-gitignore) tetap ada sebagai bukti observasi sampai user menghapusnya.

## 5. Docs

- `README.md`: bagian Usage memuat `help`, `version`, `-b`, dan `-e` (diperbarui saat build).
- `AGENTS.md`: sudah memuat jebakan `postFeed` dari run 180 konten, keputusan user tentang persetujuan privasi, `askYesNo`, `checkSetup`/`loadRows`, override `basic-ftp`, siklus dengan `/bfb-observe`, dan aturan temuan vs uji manual.
- `CONTRIBUTING.md`: tetap akurat.
- `docs/`: versi cocok dengan `.bumrc` (Bun 1.4.2) dan `bun.lock` (bunup 0.16.32, puppeteer-core 24.43.1, @puppeteer/browsers 2.13.2, puppeteer-extra 3.3.6, stealth 2.11.2). `bun run docs` tidak diperlukan.

## 6. Skills

9 skill, masing-masing hanya berisi `SKILL.md`. `bfb-observe` baru dan tercatat di `AGENTS.md`. Rute siklus di 8 skill lain sudah memuat `/bfb-observe`. `bfb-spec`, `bfb-plan`, dan `bfb-build` merujuk ke `architecture/OBSERVE.md`. Runner di `# Reference` `bfb-observe` sudah mengirim `log` ke `postFeed`.

## 7. Pengetahuan

Pengetahuan baru dari sesi ini sudah dicatat di `AGENTS.md` dan `architecture/OBSERVE.md`:

1. Popup dan modal Facebook yang merebut fokus atau menutupi profil: "Pembaruan reel", panel "Pembaruan Reels", dan "Akun Meta Anda sudah siap".
2. Render Chrome tersendat saat jendela tidak tampil (`--disable-frame-rate-limit`).
3. Alur persetujuan privasi wajib: empat switch, "Saya setuju", lalu "Tutup".
4. Sesi mati yang tampil sebagai profil publik dengan form login.
5. `readline.question` tidak pernah selesai saat stdin tertutup.
6. Facebook tidak pernah "network idle".

Koreksi user disimpan sebagai memory feedback: `explicit-absolute-paths.md` dan `findings-vs-manual-tests.md`.

## 8. Perintah

| Perintah             | Hasil                                              |
| :------------------- | :------------------------------------------------- |
| `bun run format`     | exit 0                                             |
| `bun run lint`       | exit 0                                             |
| `bun run type-check` | exit 0 (`tsgo --noEmit`)                           |
| `bun run check`      | exit 0 (0 import relatif)                          |
| `bun run test`       | exit 0, 206 pass, 0 fail, 28 file                  |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` (121 KB) |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=gemini`: **1015 node, 1604 edge, 59 komunitas**, seluruhnya terlabel (tidak ada `Community N` atau label nama file). `bun run format` dijalankan ulang sesudahnya.
