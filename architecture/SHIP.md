# Ship decision: v0.5.0 (commits `f05d14a..015c257`)

Ditulis lewat `/bfb-ship` pada 2026-09-30. Tiga spesialis berjalan paralel dan read-only: `code-reviewer`, `security-auditor`, `test-engineer`. Tidak ada push, tag, atau `bun run release`.

## Ship Decision: **NO-GO**

> **Update (setelah keputusan):** kedua blocker sudah diperbaiki — CSV kutip di tengah sel (4 test baru, merah dulu) dan `release.yml` (action di-pin ke SHA, npm 12.1.0, changelogithub 15.0.5 di job tanpa `id-token`, Bun dari `.bumrc`, `bun run check` ditambahkan). `src/ignore/index.ts` dihapus: penyebab bug-nya (fungsi di `page.evaluate` rusak oleh obfuscator, terbukti dengan `ReferenceError`) diganti XPath `not(@aria-disabled="true")` di `facebook.ts`. Jalankan `/bfb-ship` lagi untuk keputusan baru; rekomendasi di bawah (terutama `engines` dan `bun update`) masih terbuka.

Dua blocker, keduanya kecil untuk diperbaiki. Setelah keduanya selesai dan checklist di bawah hijau, keputusan bisa diulang dengan `/bfb-ship`.

### Blockers (wajib diperbaiki sebelum rilis)

1. **CSV: satu `"` di tengah sel menelan sisa file** — `src/libs/csv-parser.ts:35-37` (code-reviewer + test-engineer, diverifikasi dengan file nyata). Parser baru membuka mode kutip di posisi mana pun dalam sel dan membaca melewati baris baru. `1;...;Layar 6" mantap;NO;` diikuti dua baris lagi menghasilkan **satu** baris dengan caption berisi baris 2 dan 3; baris itu lolos `contentStatus` dan akan diposting publik, baris 2–3 hilang diam-diam. v0.4.0 masih mengembalikan 3 baris. Kutip yang tidak ditutup berperilaku sama.
    - Fix: `"` hanya membuka kutip kalau sel masih kosong (setelah spasi awal); selain itu karakter biasa. File yang berakhir di dalam kutip → error Bahasa Indonesia. Test merah dulu di `tests/integration/001-csv-parser.test.ts`.
    - Catatan: regresi ini lolos dari mutasi dan review sebelumnya karena belum ada test untuk kutip di tengah sel.
2. **`release.yml` bisa memakai identitas publish npm sambil menjalankan tool yang tidak dikunci** — `.github/workflows/release.yml:8-11, 24, 29-32, 49-56` (security-auditor, High; sudah tercatat sejak audit awal). Job dengan `id-token: write` menjalankan `bunx changelogithub` tanpa versi, `npm install -g npm@latest`, `bun-version: latest`, dan action ber-tag. Tool atau tag yang dibajak bisa mempublikasikan `@rasvanjaya21/bfb` palsu dengan provenance sah ke mesin yang menyimpan password dan cookie Facebook.
    - Fix minimal: changelog di job terpisah (`contents: write` saja) dengan `changelogithub` versi pasti; versi Bun dari `.bumrc` seperti `ci.yml`; `npm` versi pasti; action di-pin ke SHA; `id-token: write` hanya di job publish; tambahkan `bun run check`.
    - Butuh persetujuan user: workflow rilis tidak bisa dites tanpa rilis sungguhan.

### Recommended fixes (sebaiknya sebelum rilis)

- **`engines` di `package.json`** (code-reviewer): 0.5.0 butuh Bun (`#!/usr/bin/env bun`). Pengguna yang memasang lewat `npm i -g` atau tanpa `bun` di PATH akan mendapat `env: bun: No such file`. Tambahkan `"engines": { "bun": ">=1.3.9" }` dan tulis di catatan rilis.
- **Dependency dengan advisory** (security-auditor, `bun audit --prod`: 10 high, 6 moderate): `ws` 8.20.0 (fix 8.20.1), `basic-ftp`, `ip-address`, `extract-zip`, `brace-expansion`. Dampak praktis rendah (`ws` hanya bicara ke Chrome lokal; sisanya jalur unduh driver lewat HTTPS), tapi `bun update` + `bun run docs` sebelum tag.
- **Test yang tidak bisa gagal** (test-engineer): di `tests/integration/005-run-browser-rows.test.ts` "opens at most one context per row", `expect` di dalam task ditangkap runner; hanya `contexts.length` yang benar-benar diperiksa. Tangkap nilai di dalam task dan assert setelah run, dan assert `result.failed === 0` di test yang punya assertion di dalam task.
- **`TEST.md` tidak akurat**: coverage sekarang 96.50% fungsi / 95.86% baris; Ctrl+C di `hide-question.ts` baris 51–53; test "keeps going when only a tab closes" tidak benar-benar menutup tab; "never overwrites existing files" hanya memeriksa `accounts.csv`.
- **Keputusan `src/ignore`** (user, sedang dibahas): entry build `src/ignore/index.ts` dihapus di `4c08b0b` tanpa tahu alasan user. Isi tarball 0.5.0 bergantung pada keputusan ini.

### Acknowledged risks (boleh ikut rilis)

| Risiko                                                                                                               | Mitigasi                                                  |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Deteksi "postingan terkirim" dan login belum diverifikasi di akun Facebook sungguhan                                 | Uji manual satu akun uji setelah rilis; rollback di bawah |
| Tombol yang diketik selama run bisa menjawab prompt "Tekan Enter" (sebelumnya proses keluar)                         | Risiko rendah; operator bekerja di jendela browser        |
| Layar CSV kosong menampilkan "Tekan Enter" di layar yang sudah dibersihkan                                           | Kosmetik                                                  |
| Baris BM dilewati sebelum page dibuka (cookie BM yang salah tidak lagi dilaporkan)                                   | Sama dengan 0.4.0: BM memang belum diposting              |
| Permission `0600`/`0700` tidak berlaku di Windows                                                                    | Dokumentasikan; data tetap di folder kerja operator       |
| `mcp-remote` di `.mcp.json` tidak di-pin                                                                             | Hanya mesin developer; pin ke versi ≥ 0.1.16              |
| Password diketik ke field yang fokus setelah Tab kalau halaman login Facebook berubah (`src/core/cookie.ts:101-104`) | Cek `input[type=password]` sebelum mengetik (TODO)        |
| `ci.yml` baru belum pernah jalan di GitHub Actions                                                                   | Pantau run pertama di ubuntu/macos/windows                |

### Checklist bfb

| Cek                                                              | Hasil                                                                                               |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `type-check`, `lint`, `check`, `test` (86 pass), `build`         | hijau, tanpa Node                                                                                   |
| `VERSION` vs versi yang akan di-bump                             | `v0.4.0` = `0.4.0`; `bun run release` menaikkan keduanya                                            |
| Isi tarball (`bun publish --dry-run`)                            | 4 file: `package.json`, `LICENSE`, `README.md`, `dist/index.js` (70 KB, ter-obfuscate, shebang Bun) |
| `datas/`, `credentials/`, cookie, token ter-commit atau ter-pack | tidak ada                                                                                           |
| `DRIVER_VERSION` berubah                                         | tidak (`147.0.7727.101`); user tidak perlu memasang ulang driver                                    |
| Dist dijalankan                                                  | `bun run dist/index.js --version` → `v0.4.0`; help dan flag salah bekerja                           |

### Rollback plan

- **Trigger:** laporan posting ke akun yang salah atau caption rusak; CLI gagal jalan di mesin user (`bun` tidak ada, shebang); cookie atau token tidak tersimpan; rilis berisi file yang tidak semestinya.
- **Prosedur (semua butuh persetujuan user):**
    1. `npm deprecate @rasvanjaya21/bfb@0.5.0 "<alasan>, pakai 0.4.0 atau 0.5.1"` — versi di npm tidak bisa ditimpa dan tidak di-unpublish.
    2. Operator kembali ke versi lama: `bun add --global @rasvanjaya21/bfb@0.4.0`. Data di folder kerja kompatibel dua arah (header CSV sama; `cookies.json` tetap `{ [uid]: CookieData[] }`; `token.bfb` sama).
    3. Perbaikan lewat `git revert <commit>` di atas `master` (tanpa rewrite history), lalu rilis patch `0.5.1`.
    4. GitHub Packages: versi yang sama ditandai lewat UI paket; rilis patch menggantikannya.
- **Target waktu pulih:** operator bisa kembali ke 0.4.0 dalam hitungan menit (satu perintah); patch 0.5.1 dalam satu siklus rilis.

### Specialist reports

Ringkasan per spesialis (laporan lengkap ada di transkrip sesi):

- **code-reviewer:** 1 blocker (CSV kutip di tengah sel), rekomendasi `engines` dan `release.yml` membaca `.bumrc` + `check`. Klaim bahwa `AGENTS.md` usang **diperiksa dan salah**: `AGENTS.md` sudah menyebut `.githooks`, bumpp dua file, dan `tests/`.
- **security-auditor:** 1 High (supply-chain `release.yml`, blocker), 2 Medium (advisory dependency, bypass aktivasi di client), 5 Low. Tarball, file ter-track, penulisan rahasia, logging, validasi token, isolasi per-context, dan install script dinyatakan bersih.
- **test-engineer:** semua perintah hijau; coverage 96.50/95.86; bug CSV dikonfirmasi (dan kutip tak tertutup, spasi setelah kutip penutup); satu assertion yang tidak bisa gagal; beberapa klaim `TEST.md` tidak akurat; tidak ada flakiness berarti. Coverage sendiri tidak memblokir.
