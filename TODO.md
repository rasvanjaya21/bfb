# TODO

Temuan yang masih terbuka — diperbarui 2026-10-04. Semua item di sini butuh keputusan user, akses yang tidak ada di lokal (akun Facebook, backend, GitHub Actions), atau pemantauan.

## 🟡 Medium

- [ ] **Cek aktivasi bisa di-bypass di sisi client** — obfuscate hanya memperlambat. Butuh perubahan backend: respons bertanda tangan + kedaluwarsa, atau fungsi penting dipindah ke server.
- [ ] **Sekali "Server error" saat token salah** — terlihat satu kali di tes end-to-end, tidak terulang di 4 run dan 18 request berikutnya (latensi 128–852 ms, timeout 5 detik). Pantau; kalau terulang, catat waktu dan respons server.

## ⚪ Low

- [ ] **Backend membalas token salah dengan HTTP 500** (`{"state":false}`) untuk POST dan GET `/api/v1/check`. Client sudah memutuskan dari isi body; perbaikan ada di server (401/403).
- [ ] **`src/libs/asset-checker.ts` tidak dipakai** — putuskan dihapus, atau direncanakan (kemungkinan untuk validasi kolom `PATH` saat upload media; commit asalnya `ba5a8a1 feat(lib): add asset validation as non cwd`).
- [ ] **`--no-startup-window` baru diuji di Linux** — `src/libs/launch-browser.ts`. Di Linux (Chrome headful lewat `xvfb-run` dan di layar user) Chrome tetap hidup walau jendela context tiap baris ditutup. Belum dicoba di macOS dan Windows; kalau Chrome keluar setelah jendela terakhir tertutup, run berhenti di baris kedua (`browser.connected` false).
- [ ] **`extract-zip` 2.0.1 punya 2 advisory high tanpa versi perbaikan** (dependency `@puppeteer/browsers`). Diterima untuk saat ini: hanya dipakai mengekstrak Chrome yang diunduh dari Google lewat HTTPS. Periksa lagi saat `@puppeteer/browsers` naik versi.
- [ ] **`mcp-remote` di config global agy belum di-pin** — `~/.gemini/config/mcp_config.json` masih `bunx --bun mcp-remote <url>`; perintah di `CONTRIBUTING.md` sudah `mcp-remote@0.14.3`. Di luar repo, jadi butuh persetujuan user untuk mengubahnya.

## Tooling & CI

- [ ] **Coverage 100% hanya mencakup 30 dari 40 file `src/`** — `bun test --coverage` hanya menghitung file yang di-import proses test. `src/index.ts` (dites lewat `Bun.spawn`), `commands/*`, `core/*`, `launch-browser.ts`, `check-driver.ts`, `asset-checker.ts`, dan `types/global.ts` tidak muncul di laporan, jadi ambang 1.0 tidak berlaku untuknya. Pilihan untuk `index.ts`: pindahkan logikanya ke `src/libs/` yang mengembalikan exit code dan tes di proses test.
- [ ] **`actions/checkout` v4.4.0 masih menargetkan Node 20** — `ci.yml` dan `release.yml` (SHA `11d5960`). Run 37184248155 memberi peringatan bahwa GitHub memaksanya jalan di Node 24. Naikkan ke versi yang menargetkan Node 24 dengan SHA baru (bukan tag bergerak).
- [ ] **`ubuntu-latest` pindah ke Ubuntu 26 mulai 2026-10-19** — dipakai `ci.yml`, `release.yml`, `close-issues.yml`. Pantau run pertama setelah tanggal itu; kalau ada yang rusak, pin ke `ubuntu-24.04`.
- [ ] **Upgrade mayor belum dievaluasi** — `puppeteer-core` 25.x, `@puppeteer/browsers` 3.x, `chalk` 6.x, `bumpp` 12.x, dan `json-server` 1.0 (masih beta; hanya untuk `bun run mock`). Butuh satu siklus sendiri: baca changelog, `bun run docs`, tes Chrome ulang, dan idealnya satu run di akun uji.
