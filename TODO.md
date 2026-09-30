# TODO

Temuan yang masih terbuka — diperbarui 2026-09-30. Semua item di sini butuh keputusan user, akses yang tidak ada di lokal (akun Facebook, backend, GitHub Actions), atau pemantauan.

## 🟡 Medium

- [ ] **Alur Facebook belum diverifikasi di akun sungguhan** — `src/core/facebook.ts`, `src/core/cookie.ts`. Tiga asumsi yang hanya bisa dicek di Facebook: tombol Post memakai `aria-disabled` saat belum aktif (ditunggu lewat XPath `not(@aria-disabled="true")`); postingan dihitung terkirim kalau composer (`text=Add to your post`, `text=Post preview`) tertutup dalam 30 detik; halaman login meletakkan fokus di kolom password setelah Tab (sekarang dijaga `ensurePasswordFocus`, baris berhenti kalau tidak). Logika, cleanup, dan isolasi per-context sudah diuji di Chrome sungguhan dengan cookie palsu.
- [ ] **Cek aktivasi bisa di-bypass di sisi client** — obfuscate hanya memperlambat. Butuh perubahan backend: respons bertanda tangan + kedaluwarsa, atau fungsi penting dipindah ke server.
- [ ] **Bun 1.4.2 belum diuji manual di terminal dan Chrome sungguhan** — 1.4.0 adalah penulisan ulang Bun dari Zig ke Rust. Test otomatis (stream dan browser palsu) lolos, tapi `hideQuestion` dengan ketikan di TTY sungguhan (menu 97) dan koneksi puppeteer ke Chrome (menu 1/95, lewat `ws` bawaan Bun) belum dicoba di 1.4.2.
- [ ] **Sekali "Server error" saat token salah** — terlihat satu kali di tes end-to-end, tidak terulang di 4 run dan 18 request berikutnya (latensi 128–852 ms, timeout 5 detik). Pantau; kalau terulang, catat waktu dan respons server.

## ⚪ Low

- [ ] **Backend membalas token salah dengan HTTP 500** (`{"state":false}`) untuk POST dan GET `/api/v1/check`. Client sudah memutuskan dari isi body; perbaikan ada di server (401/403).
- [ ] **Deteksi cookie kedaluwarsa via `page.url().includes('next')`** — `src/core/cookie.ts:67`. Rapuh terhadap perubahan URL Facebook; perlu dicek di halaman login yang sekarang.
- [ ] **`src/libs/asset-checker.ts` tidak dipakai** — putuskan dihapus, atau direncanakan (kemungkinan untuk validasi kolom `PATH` saat upload media; commit asalnya `ba5a8a1 feat(lib): add asset validation as non cwd`).
- [ ] **`extract-zip` 2.0.1 punya 2 advisory high tanpa versi perbaikan** (dependency `@puppeteer/browsers`). Diterima untuk saat ini: hanya dipakai mengekstrak Chrome yang diunduh dari Google lewat HTTPS. Periksa lagi saat `@puppeteer/browsers` naik versi.
- [ ] **`mcp-remote` di config global agy belum di-pin** — `~/.gemini/config/mcp_config.json` masih `bunx --bun mcp-remote <url>`; perintah di README sudah `mcp-remote@0.14.3`. Di luar repo, jadi butuh persetujuan user untuk mengubahnya.

## Tooling & CI

- [ ] **Coverage 100% hanya mencakup 20 dari 31 file `src/`** — `bun test --coverage` hanya menghitung file yang di-import proses test. `src/index.ts` (dites lewat `Bun.spawn`), `commands/*`, `core/*`, `launch-browser.ts`, `check-driver.ts`, `download-driver.ts`, dan `asset-checker.ts` tidak muncul di laporan, jadi ambang 1.0 tidak berlaku untuknya. Pilihan untuk `index.ts`: pindahkan logikanya ke `src/libs/` yang mengembalikan exit code dan tes di proses test.
- [ ] **`ci.yml` dan `release.yml` belum pernah jalan di GitHub Actions** — Bun 1.4.2 dari `.bumrc`, `coverageThreshold = 1.0`, test yang menjalankan CLI lewat `Bun.spawn` dan `process.stdin.emit` (belum pernah dicoba di macOS/Windows), action di-pin ke SHA, `test:coverage`, `bun publish --dry-run` (apakah butuh auth registry), job changelog terpisah. Baru terbukti setelah push/rilis berikutnya.
- [ ] **Upgrade mayor belum dievaluasi** — `puppeteer-core` 25.x, `@puppeteer/browsers` 3.x, `chalk` 6.x, `bumpp` 12.x, dan `json-server` 1.0 (masih beta; hanya untuk `bun run mock`). Butuh satu siklus sendiri: baca changelog, `bun run docs`, tes Chrome ulang, dan idealnya satu run di akun uji.
