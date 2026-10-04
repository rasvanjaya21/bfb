# Ship

Ditulis lewat `/bfb-ship` pada 2026-10-05 untuk perubahan yang belum di-commit sejak `8666fe3` (fix alur posting dari run 180 konten, skill `bfb-observe`, fitur CLI `help`/`-b`/`-e`), di atas 16 commit lokal yang belum di-push sejak `v0.5.2` (`4938a24`). Tiga spesialis berjalan paralel: `code-reviewer`, `security-auditor`, `test-engineer`.

## Keputusan: **GO** (diperbarui 2026-10-05)

Awalnya **NO-GO** (lihat di bawah). Semua blocker sudah selesai atau diterima: B2 diterima lewat keputusan user 3b, B3 dan B4 diperbaiki, dan B1 selesai (33 commit dibuat lewat `/bfb-commit`, di-push, dan `ci.yml` hijau di ubuntu/macOS/Windows menurut konfirmasi user). Tidak ada kode yang berubah sejak review dan ship, jadi `/bfb-ship` tidak dijalankan ulang. Rilis (`bun run release`, versi berikutnya) sepenuhnya keputusan user.

### Keputusan awal: NO-GO

Kode lulus semua gerbang lokal, tapi belum bisa dirilis: ada empat blocker dan belum ada CI untuk satu pun dari perubahan ini.

## Gerbang lokal

| Cek                                   | Hasil                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `bun run type-check`, `lint`, `check` | bersih                                                                                                       |
| `bun run test:coverage`               | 189 pass, 0 fail, 100% baris/fungsi untuk 31 file yang di-import test                                        |
| `bun run build`                       | sukses; build ter-obfuscate diuji untuk `help`, `-e 2`, `-b 1 -e 999`                                        |
| `bun pm pack --dry-run`               | hanya `package.json`, `LICENSE`, `README.md`, `dist/index.js` (120 KB, ter-obfuscate)                        |
| `VERSION` vs `package.json`           | `v0.5.2` = `0.5.2` (naik bersama lewat `bun run release`)                                                    |
| `DRIVER_VERSION`                      | tidak berubah, jadi user tidak perlu memasang ulang driver                                                   |
| Data sensitif di commit/tarball       | tidak ada; `workspaces/`, `temp/`, `mock/`, `backups/` di-gitignore                                          |
| CI (`ci.yml`)                         | **belum ada run**: hijau terakhir di `4938a24`; 16 commit lokal dan seluruh perubahan hari ini belum di-push |

## Blocker

| #   | Blocker                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sumber                            | Perbaikan                                                                                                                                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | Belum di-commit, belum di-push, dan CI belum pernah menjalankan 16 commit lokal maupun perubahan hari ini di ubuntu/macOS/Windows.                                                                                                                                                                                                                                                                                                                                 | realitas bfb                      | `/bfb-prepare` → `/bfb-commit` → push → tunggu `ci.yml` hijau.                                                                                                                                                                                             |
| B2  | Persetujuan privasi otomatis menyalakan **semua** switch yang OFF (`consentToggleOff` = `//input[@role="switch" and @aria-checked="false"]`, `src/libs/facebook-selectors.ts`). Keputusan user mencakup empat item [Wajib] yang diobservasi; switch opsional yang ditambahkan Facebook nanti (personalisasi iklan, dsb.) ikut disetujui atas nama pemilik akun. "Tutup" (`consentDone`) juga cocok dengan tombol "Tutup" mana pun.                                 | code-reviewer I2, security Medium | Batasi ke empat label internal yang diobservasi (atau baris berlabel "[Wajib]"); kalau ada switch OFF lain, jangan diklik dan jatuh ke prompt `y/N`. Batasi `consentDone` ke dialog "Anda sudah siap!".                                                    |
| B3  | Cek caption salah untuk caption multi-baris (dan kemungkinan NBSP): `captionProbe` mengubah baris baru jadi spasi, padahal `normalize-space(.)` di editor menggabungkan paragraf tanpa spasi. Caption yang benar dianggap belum masuk, diketik ulang, lalu baris gagal "Caption gagal ditulis". Probe juga dipotong per code unit, sehingga emoji di posisi ke-30 terbelah dan selector-nya rusak. Ini regresi: sebelum fix, caption multi-baris tetap terposting. | code-reviewer I1, test-engineer   | Potong probe di `"`, `\r`, `\n`; potong per karakter utuh (`[...s].slice(0, 30)`); tambah test unit untuk baris baru dan emoji; buktikan terhadap dump posting multi-baris.                                                                                |
| B4  | `bun audit --prod` memunculkan advisory **High** baru `basic-ftp` (GHSA-c475-qrg2-pj4r, DoS di `Client.list()`, ≤ 6.2.0) lewat `@puppeteer/browsers > proxy-agent > pac-proxy-agent > get-uri`. Belum tercatat sebagai risiko yang diterima (hanya `extract-zip` yang diterima).                                                                                                                                                                                   | security Medium                   | Keputusan user: naikkan override ke `"basic-ftp": "^6.2.2"` (cek `get-uri` masih jalan, `bun install`, `bun audit --prod`, test), atau catat sebagai risiko yang diterima di AGENTS.md (eksposur kecil: hanya PAC proxy lewat `ftp://` saat unduh driver). |

## Perbaikan yang disarankan sebelum rilis (bukan blocker)

- **Prompt `y/N` menggantung tanpa terminal** (`src/core/cookie.ts:154`, `src/core/facebook.ts:126`; sudah di TODO.md). `bfb -b` dari cron/pipe diam selamanya dengan Chrome terbuka. Butuh keputusan user: tolak `-b` tanpa TTY, atau anggap stdin tertutup sebagai `N`.
- **Persetujuan otomatis tidak tercatat di audit log** (code-reviewer I3, security Low). Tulis satu baris per UID saat persetujuan disetujui otomatis atau dikonfirmasi manual.
- **`dismissPopup` tidak dibatasi ke popup yang diobservasi** ("I understand" belum pernah diobservasi dan biasa dipakai di pemberitahuan pembatasan akun). Hapus "I understand" atau batasi ke dialog yang diketahui.
- **Test yang tetap lolos walau perilakunya rusak** (test-engineer): `publishPost` tidak menolak `contains(text(), "Posting")`; cabang "Oke" tidak dicek terikat ke panel Reels; daftar `allNames` belum memuat 7 selector baru; test CLI "terkunci" tidak membuktikan urutan berhenti init → driver → aktivasi. `TEST.md` mengklaimnya, jadi klaimnya perlu dikoreksi atau test-nya diperkuat.
- **Logika yang masih terjebak di `core/`/`commands/`**: urutan cek setup (`bypass.ts`, berbeda dengan `menu.ts` yang tidak berhenti di cek pertama), muat + pilih baris (duplikat di `facebook()`/`cookies()`), keputusan alur persetujuan. Pindahkan ke `libs/` supaya masuk ambang 100%.
- Lain-lain (Low): `-e` memilih semua baris dengan NO kembar (bisa posting dua kali); fallback "sudah terbit" salah untuk caption sangat pendek; CSV kosong lewat `-b` membersihkan layar lalu keluar 0 tanpa pesan yang tersisa; `bypass` tidak menulis `SESI ... selesai`; Ctrl+C saat `-b` belum diverifikasi menghentikan run; `humanClick` selalu menggulir instan walau elemen sudah di layar.

## Risiko yang diterima

- `extract-zip` 2.0.1 (sudah diterima di AGENTS.md).
- Fallback "sudah terbit" bisa cocok dengan posting lama yang captionnya sama (ditandai `ponytail:`; TODO.md).
- Langkah "Mematikan boost post", `--disable-frame-rate-limit` di desktop GNOME, caption multi-baris, "Tutup" yang dibatasi, baris audit `disetujui`, dan run `-b`/`-e` sungguhan belum terbukti di akun sungguhan; user menganggapnya uji manual miliknya, bukan temuan.
- Persetujuan privasi otomatis itu sendiri: keputusan eksplisit user (2026-10-05), tercatat di AGENTS.md. Yang jadi blocker hanya cakupannya (B2).

## Rencana rollback

Versi npm yang sudah dipublikasikan tidak bisa ditimpa, dan unpublish tidak dipakai.

1. **Pemicu:** setelah rilis, run posting gagal massal ("Caption gagal ditulis", "Publish tidak valid", persetujuan privasi), `-b`/`-e` salah memilih baris, atau ada laporan persetujuan yang melampaui item [Wajib].
2. **Tindakan segera:** `npm deprecate @rasvanjaya21/bfb@<versi baru> "<alasan>, pakai 0.5.2"` (dan `npm dist-tag add @rasvanjaya21/bfb@0.5.2 latest`). User yang terdampak memasang ulang `bun add --global @rasvanjaya21/bfb@0.5.2`.
3. **Perbaikan:** `git revert` commit bermasalah (atau fix maju), lalu `bun run release` versi patch berikutnya setelah CI hijau.
4. **Data:** tidak ada migrasi. Format `datas/`, `credentials/`, dan `logs/` tidak berubah, jadi kembali ke 0.5.2 aman. Postingan yang sudah terbit dan persetujuan privasi yang sudah diberikan di Facebook tidak bisa ditarik oleh rollback.
5. **Waktu:** deprecate dan dist-tag kurang dari 5 menit; rilis patch sekitar 15 menit termasuk CI.

## Langkah menuju GO

1. Perbaiki B2 dan B3 (TDD, lalu buktikan terhadap dump di `temp/`).
2. Putuskan B4 dan prompt `y/N` tanpa terminal.
3. `/bfb-prepare` → `/bfb-commit` → push → `ci.yml` hijau di ketiga OS.
4. Jalankan ulang `/bfb-ship`. `bun run release` hanya dengan persetujuan eksplisit user.

## Status setelah keputusan user (2026-10-05)

Jawaban user atas daftar keputusan diterapkan dan diverifikasi: `bun run test:coverage` 206 pass, 0 fail, exit 0; `type-check`, `lint`, `check` bersih; `bun run build` sukses; `bun pm pack --dry-run` tetap hanya `package.json`, `LICENSE`, `README.md`, `dist/index.js` (127 KB).

| Item                                   | Status                                                                                                                                                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1 commit, push, CI                    | **Selesai**: 33 commit (`ab2302e`..`a992037`), di-push, dan `ci.yml` hijau (konfirmasi user).                                                                                                                                                         |
| B2 cakupan persetujuan privasi         | **Diterima (keputusan 3b)**: semua switch yang OFF tetap dinyalakan, termasuk switch yang mungkin ditambahkan Facebook nanti; dicatat di AGENTS.md. Tombol "Tutup" (`consentDone`) sekarang dibatasi ke `role="main"` yang memuat "Anda sudah siap!". |
| B3 probe caption                       | **Diperbaiki**: berhenti di baris baru, spasi ganda/tab, dan tanda kutip; melewati baris kosong di awal; memotong 30 karakter utuh. Test `unit/011` ditulis merah dulu.                                                                               |
| B4 `basic-ftp`                         | **Diperbaiki (1a)**: override `^6.2.2`; API yang dipakai `get-uri` dicek masih ada; `bun audit --prod` kini hanya `extract-zip` (diterima).                                                                                                           |
| Prompt `y/N` tanpa terminal            | **Diperbaiki (2b)**: `askYesNo` menganggap input yang tertutup sebagai `N` (`unit/016`).                                                                                                                                                              |
| Audit log persetujuan                  | **Diperbaiki (4)**: `NO <no> UID <uid> \| disetujui \| Privasi facebook disetujui otomatis` / `oleh operator`.                                                                                                                                        |
| "I understand" di `dismissPopup`       | **Dihapus (5)**.                                                                                                                                                                                                                                      |
| Test yang lemah                        | **Diperkuat (11)**: `publishPost` menolak `contains()`, cabang "Oke" terikat ke panel Reels, `allNames` lengkap, help memuat setiap menu dan syarat setup, `-b 95` terkunci tanpa driver, urutan cek setup di `unit/017`. Dua mutasi tertangkap.      |
| Logika ke `libs/`                      | **Selesai (18)**: `checkSetup`, `loadRows`, `askYesNo`.                                                                                                                                                                                               |
| `SESI ... selesai`                     | **Selesai (19)**.                                                                                                                                                                                                                                     |
| Popup baru "Akun Meta Anda sudah siap" | **Diperbaiki** saat run (NO 191): ditutup lewat X, hanya di dialog berjudul itu; NO 191 terposting ulang.                                                                                                                                             |

Dengan B1 selesai, keputusan menjadi **GO** (lihat bagian atas).
