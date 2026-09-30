# TODO

Hasil audit (code review, security, tooling/test) — 2026-09-30. Diperbarui setelah perbaikan — 2026-09-30.

Yang tersisa hanya yang butuh keputusan, akses yang tidak ada di lokal (akun Facebook, rilis sungguhan, backend), atau belum bisa diverifikasi.

## 🟠 High

- [ ] **Tidak ada `engines` di `package.json`** — 0.5.0 butuh Bun; pengguna tanpa `bun` di PATH mendapat `env: bun: No such file`. Tambahkan `"engines": { "bun": ">=1.3.9" }` + catatan rilis.

## 🟡 Medium

- [ ] **Deteksi postingan terkirim belum diverifikasi di akun sungguhan** — `src/core/facebook.ts`. Setelah Post, baris baru dihitung berhasil kalau composer (`text=Add to your post` dan `text=Post preview`) sudah tertutup dalam 30 detik. Logika dan cleanup sudah diuji dengan Chrome sungguhan memakai cookie palsu, tapi alur posting di Facebook belum.
- [ ] **Cek aktivasi bisa di-bypass di sisi client** (obfuscate hanya memperlambat). Pertimbangkan respons bertanda tangan + kedaluwarsa, atau pindahkan fungsi penting ke server.
- [ ] **Sekali "Server error" saat token salah** — terlihat satu kali di tes end-to-end build production, tidak terulang di 4 run berikutnya dan 18 request langsung (latensi 128–852 ms, timeout 5 detik). Pantau; kalau terulang, catat waktu dan respons server.

- [ ] **Dependency dengan advisory** (`bun audit --prod`: 10 high, 6 moderate) — `ws` 8.20.0, `basic-ftp`, `ip-address`, `extract-zip`, `brace-expansion`. `bun update` + `bun run docs` + tes ulang sebelum tag.
- [ ] **Test yang tidak bisa gagal** — `tests/integration/005-run-browser-rows.test.ts` ("opens at most one context per row"): `expect` di dalam task ditangkap runner. Assert setelah run, dan `result.failed === 0` di test yang punya assertion di dalam task.
- [ ] **`architecture/TEST.md` tidak akurat** — coverage 96.50/95.86, baris Ctrl+C 51–53, test "tab closes" tidak menutup tab, "never overwrites" hanya `accounts.csv`.

## ⚪ Low

- [ ] **Backend membalas token salah dengan HTTP 500** (`{"state":false}`) untuk POST dan GET `/api/v1/check`. Client sudah menanganinya (keputusan dari isi body), tapi status yang benar adalah 401/403 supaya 5xx hanya berarti server error.
- [ ] Deteksi login via `page.url().includes('next')` rapuh — `src/core/cookie.ts`. Perlu dicek terhadap halaman login Facebook yang sekarang.
- [ ] `src/libs/asset-checker.ts` tidak dipakai; putuskan dihapus atau direncanakan.

- [ ] Teks untuk operator yang masih bahasa Inggris (sudah ada sebelum audit): `Unknown flag`/`Try 'bfb help'` di `src/index.ts`, `Good bye` di `src/commands/menu.ts`, pesan `help` di `src/commands/help.ts`.
- [ ] `resetActivationCache` di `src/libs/check-activation.ts` diekspor hanya untuk test.

- [ ] Password diketik ke field yang fokus setelah Tab — `src/core/cookie.ts:101-104`. Pastikan fokus di `input[type=password]` sebelum mengetik.
- [ ] Permission `0600`/`0700` tidak berlaku di Windows; dokumentasikan untuk operator Windows.
- [ ] `mcp-remote` di `.mcp.json` tidak di-pin versinya (pin ≥ 0.1.16).
- [ ] Test yang belum ada: `runBrowserRows` saat `createBrowserContext`/`newPage` gagal; `initProject` tidak menimpa `contents.csv`/`cookies.json` dan mengencangkan folder `0755`; `activateBfb` dengan input spasi saja; UID kosong di `accounts.csv`.

## Tooling & CI

- [ ] Coverage + `coverageThreshold` di `bunfig.toml` — butuh angka ambang yang disepakati.
- [ ] Update dependency minor (puppeteer-core 24.43.x, oxlint 1.86); evaluasi puppeteer-core 25 dan bumpp 12. Setiap bump versi harus diikuti `bun run docs`.
- [ ] Perubahan `ci.yml` (versi Bun dari `.bumrc`, `check`, `bun publish --dry-run`, urutan type-check) belum pernah jalan di GitHub Actions; cek hasil run pertama di ubuntu, macos, dan windows, termasuk apakah `bun publish --dry-run` butuh auth registry. Hal yang sama untuk `release.yml` yang baru (action di-pin ke SHA, npm 12.1.0, changelogithub 15.0.5 di job terpisah): baru terbukti di rilis berikutnya.
