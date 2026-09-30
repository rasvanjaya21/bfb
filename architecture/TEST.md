# Test coverage

Ditulis lewat `/bfb-test` pada 2026-09-30. `bun test`: **86 pass, 0 fail**, 13 file, ±6 detik (diperbarui setelah `/bfb-review`), tanpa jaringan dan tanpa akun sungguhan.

## Struktur

```
tests/unit/          logika murni, tanpa I/O                      22 test
tests/integration/   file system, beberapa modul dengan fake       54 test
tests/endpoint/      kontrak API aktivasi (fetch palsu)             10 test
```

Nama file `NNN-nama.test.ts`, nomor mulai `001` di setiap folder. Test baru memakai nomor berikutnya di foldernya.

## Apa yang dibuktikan setiap suite

| File                                | Membuktikan                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unit/001-parse-args`               | `version`/`help` dalam semua bentuknya, versi menang atas help, argumen pertama yang tidak dikenal dilaporkan, tanpa argumen → menu                                                                                                                                                                                                         |
| `unit/002-menu-access`              | menu 1 dan 95 terkunci sampai init, driver, dan aktivasi ketiganya siap; menu setup tidak pernah terkunci                                                                                                                                                                                                                                   |
| `unit/003-format-duration`          | format jam/menit/detik, lebih dari 99 jam, negatif dan NaN jadi nol                                                                                                                                                                                                                                                                         |
| `unit/004-content-status`           | hanya `PERSONAL`+`POST` yang didukung; rute/tipe kosong atau asing ditolak; kombinasi lain "dalam pengembangan"                                                                                                                                                                                                                             |
| `unit/005-hide-question`            | paste (satu potongan), ketik satu-satu, backspace dan tombol panah di tengah potongan, tombol Esc sendirian tidak menelan Enter atau karakter berikutnya (termasuk `O`/`[`), selalu tersamar `*`, raw mode dan listener dikembalikan                                                                                                        |
| `unit/006-relative-import-check`    | semua bentuk import relatif (termasuk `import type`, `import()`, `require()`, multi-baris) terdeteksi; alias, paket, komentar, dan string tidak                                                                                                                                                                                             |
| `integration/001-csv-parser`        | header `initProject`, `;` dan baris baru dalam kutip, `""`, spasi dalam kutip, CRLF, BOM (termasuk sebelum header berkutip), sel kosong, header kosong tidak menggeser kolom, baris kosong/`;;` dilewati, key prototype diabaikan                                                                                                           |
| `integration/002-cookie-store`      | cookie akun lain dan entri lain tetap ada, file belum ada/kosong/BOM, file rusak atau root array **tidak ditimpa**, UID prototype ditolak, store baru dan store lama `0644` jadi `0600`; `readCookies` UID dikenal/asing, file rusak dan file hilang melempar error                                                                         |
| `integration/003-init-project`      | `checkInit` lolos setelah init, isi awal file, `0700`/`0600`, `.gitignore` folder kerja dibuat atau dilengkapi tanpa menghapus isinya, file yang ada tidak pernah ditimpa                                                                                                                                                                   |
| `integration/004-activate-bfb`      | token server disimpan `0600` (folder `0700`), token lama `0644` dikencangkan, token kosong/salah/server error tidak menulis file; pesan per kasus                                                                                                                                                                                           |
| `integration/005-run-browser-rows`  | setiap baris di browser context sendiri, context ditutup setelah **setiap** baris termasuk yang gagal, context gagal ditutup → run berhenti, browser terputus → berhenti, tab tertutup saja → lanjut, baris yang tidak meminta page tidak membuka context, satu context per baris, hitungan berhasil/dilewati/gagal, pesan gagal diteruskan |
| `integration/006-write-secret-file` | isi file lama diganti, file lama `0644` jadi `0600`, gagal tulis tidak meninggalkan file temp dan tidak merusak target                                                                                                                                                                                                                      |
| `endpoint/001-activation-api`       | token valid; server 500 `{"state":false}` = token tidak valid (bukan server error); token tidak aman untuk header ditolak; body non-JSON dan gagal jaringan = server error; cek aktivasi tanpa token tidak memanggil server, hanya `state === true` yang aktif, hasil aktif di-cache, timeout mencegah hang                                 |

## Bukti bahwa test benar-benar menjaga perilaku

Setiap test ditulis merah dulu terhadap kode lama, kecuali `006-relative-import-check` (ditulis bersamaan dengan versi baru `check.ts`, lalu dibuktikan lewat mutasi). Setelah itu **23 mutasi** sengaja ditanam satu per satu di kode, dan suite terkait harus gagal:

- **21 tertangkap** setelah perbaikan di bawah; 2 sisanya menunjuk dead code yang lalu dihapus, jadi tidak ada lagi yang bisa dimutasi. Yang tertangkap termasuk: pembersihan cookie di `finally` dihapus, loop tidak berhenti saat browser tertutup, BM dianggap didukung, `response.ok` dipakai untuk aktivasi, token tidak divalidasi, cek aktivasi tanpa timeout atau tanpa cache, file cookie rusak ditelan lagi, CSV di-split per baris, header kosong menggeser kolom, `hideQuestion` membandingkan potongan utuh, `.gitignore` tidak ditulis, `cookies.json` awal `''`, `formatDuration` tanpa clamp, urutan version/help terbalik, menu terbuka dengan satu status saja, `chmod` token dihapus, mode `0600` temp file cookie dihapus, BOM sebelum header berkutip, regex `import type` dihapus, `isReservedKey` tidak menolak apa pun.
- Mutasi yang awalnya **lolos** dan hasilnya:
    - `chmod` di `saveCookies` dihapus → lolos karena memang **dead code** (temp file dibuat `0600` lalu di-rename). `chmod` dihapus dari kode; test "store lama `0644` jadi `0600`" ditambahkan untuk menjaga jaminannya.
    - `chmod` di `activateBfb` dihapus → lolos karena test hanya memakai file baru. `writeFile` dengan `mode` tidak mengubah file yang sudah ada, jadi `chmod` diperlukan; test "token lama `0644` dikencangkan" ditambahkan dan sekarang menangkapnya.
    - Hapus BOM di `parseCookieStore` → lolos karena `String.trim()` sudah membuang BOM. `replace` dihapus sebagai dead code.
    - Hapus BOM di `csvToJson` → lolos karena sel tanpa kutip di-trim. Masih diperlukan untuk header pertama yang berkutip; test ditambahkan dan sekarang menangkapnya.
- Temuan sampingan: regex BOM di kedua file ternyata berisi karakter U+FEFF asli yang tak terlihat, bukan escape. Diganti `﻿`.

### Putaran kedua (setelah `/bfb-review`)

Reviewer independen menemukan jaminan yang lebih lemah dari klaimnya; setelah diperbaiki, **10 mutasi** baru ditanam: context tidak ditutup, run lanjut walau pembersihan gagal, context dibuat untuk setiap baris, page tidak di-cache, reset Esc di akhir potongan dihapus, temp file tidak dibersihkan, temp file tanpa `0600`, input aktivasi tidak divalidasi, `.gitignore` lama tidak dilengkapi, entri non-array dibuang. **10/10 tertangkap**; mutasi Esc awalnya lolos dan baru tertangkap setelah test "Esc lalu `O`" ditambahkan.

Runtime: alur `postFeed` lewat runner di Chrome headless sungguhan dengan cookie palsu, 4 baris — hasil benar, 0 error di output lengkap (sebelumnya stealth plugin mencetak `Target closed` karena page dibuka lalu langsung ditutup untuk baris yang ditolak).

## Coverage (`bun test --coverage`)

Hanya file yang di-import test yang dihitung: **94.56% fungsi, 95.57% baris**. Baris yang belum dites di file yang terhitung:

| File                           | Belum dites                                  | Alasan                                                                  |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------- |
| `check.ts`                     | walker dan runner (baris 7–12, 26–37, 43–44) | dijalankan lewat `bun run check` di pre-commit dan CI, bukan lewat test |
| `src/libs/activate-bfb.ts`     | pembaca token default (`hideQuestion`)       | dites lewat `hideQuestion` sendiri; test menyuntikkan pembaca           |
| `src/libs/check-init.ts`       | cabang `contents.csv` hilang (baris 15)      | cabang serupa `accounts.csv` sudah dites                                |
| `src/libs/hide-question.ts`    | Ctrl+C (baris 40–42)                         | memanggil `process.exit(0)`                                             |
| `src/libs/run-browser-rows.ts` | `onFailure` default                          | hanya no-op                                                             |

## Belum dites otomatis sama sekali

| Jalur                                                                 | Cek yang ada                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/facebook.ts`, `src/core/cookie.ts` (alur di Facebook)       | Manual. `postFeed` dijalankan lewat `runBrowserRows` di Chrome headless sungguhan dengan cookie palsu: "Cookie tidak valid", BM dilewati, "Cookie tidak ditemukan", 0 cookie tersisa, browser tertutup. Posting sungguhan dan login manual belum pernah dicoba (TODO.md). |
| `src/commands/menu.ts` (loop), `src/index.ts`                         | Smoke test build production lewat terminal simulasi: `-v`, flag salah, menu 0, 1 terkunci, 97 token salah, 99. Logika keputusannya sudah di `parse-args` dan `menu-access`.                                                                                               |
| `src/libs/launch-browser.ts`, `check-driver.ts`, `download-driver.ts` | Manual di Bun: unduh + ekstrak Chrome 147 ke folder temp (138 detik) lalu launch dengan stealth.                                                                                                                                                                          |
| `src/commands/help.ts`, `version.ts`, `apply-delay.ts`                | Satu baris; tercakup smoke test.                                                                                                                                                                                                                                          |
| `src/libs/asset-checker.ts`, `src/ignore/index.ts`                    | Tidak dipakai (TODO.md).                                                                                                                                                                                                                                                  |

## Placeholder

Tidak ada. `test/index.test.ts` (placeholder lama) sudah dihapus.

## Saran berikutnya

- Script per folder seperti di puckybooth (`test:unit`, `test:integration`, `test:endpoint`) kalau suite membesar.
- Ambang coverage di `bunfig.toml` setelah angkanya disepakati (TODO.md).
