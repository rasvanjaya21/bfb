# TODO

Hasil audit (code review, security, tooling/test) — 2026-09-30. Diperbarui setelah perbaikan — 2026-09-30.

Yang tersisa hanya yang butuh keputusan, akses yang tidak ada di lokal (akun Facebook, rilis sungguhan, backend), atau belum bisa diverifikasi.

## 🟠 High

- [ ] **Supply-chain rilis npm** — `.github/workflows/release.yml`. Job dengan `id-token: write` menjalankan `bunx changelogithub` (versi tidak dikunci), `npm install -g npm@latest`, `bun-version: latest`, dan action ber-tag (bukan SHA). Fix: pin versi dan SHA, pisahkan changelog ke job tanpa `id-token: write`. Belum dikerjakan karena workflow rilis tidak bisa dites tanpa rilis sungguhan.

## 🟡 Medium

- [ ] **Deteksi postingan terkirim belum diverifikasi di akun sungguhan** — `src/core/facebook.ts`. Setelah Post, baris baru dihitung berhasil kalau composer (`text=Add to your post` dan `text=Post preview`) sudah tertutup dalam 30 detik. Logika dan cleanup sudah diuji dengan Chrome sungguhan memakai cookie palsu, tapi alur posting di Facebook belum.
- [ ] **Cek aktivasi bisa di-bypass di sisi client** (obfuscate hanya memperlambat). Pertimbangkan respons bertanda tangan + kedaluwarsa, atau pindahkan fungsi penting ke server.
- [ ] **Sekali "Server error" saat token salah** — terlihat satu kali di tes end-to-end build production, tidak terulang di 4 run berikutnya dan 18 request langsung (latensi 128–852 ms, timeout 5 detik). Pantau; kalau terulang, catat waktu dan respons server.

## ⚪ Low

- [ ] **Backend membalas token salah dengan HTTP 500** (`{"state":false}`) untuk POST dan GET `/api/v1/check`. Client sudah menanganinya (keputusan dari isi body), tapi status yang benar adalah 401/403 supaya 5xx hanya berarti server error.
- [ ] Deteksi login via `page.url().includes('next')` rapuh — `src/core/cookie.ts`. Perlu dicek terhadap halaman login Facebook yang sekarang.
- [ ] `src/ignore/index.ts` dan `src/libs/asset-checker.ts` tidak dipakai. Sudah dikeluarkan dari build; putuskan dihapus atau direncanakan.

- [ ] Teks untuk operator yang masih bahasa Inggris (sudah ada sebelum audit): `Unknown flag`/`Try 'bfb help'` di `src/index.ts`, `Good bye` di `src/commands/menu.ts`, pesan `help` di `src/commands/help.ts`.
- [ ] `resetActivationCache` di `src/libs/check-activation.ts` diekspor hanya untuk test.

## Tooling & CI

- [ ] Coverage + `coverageThreshold` di `bunfig.toml` — butuh angka ambang yang disepakati.
- [ ] Update dependency minor (puppeteer-core 24.43.x, oxlint 1.86); evaluasi puppeteer-core 25 dan bumpp 12. Setiap bump versi harus diikuti `bun run docs`.
- [ ] Perubahan `ci.yml` (versi Bun dari `.bumrc`, `check`, `bun publish --dry-run`, urutan type-check) belum pernah jalan di GitHub Actions; cek hasil run pertama di ubuntu, macos, dan windows, termasuk apakah `bun publish --dry-run` butuh auth registry.
