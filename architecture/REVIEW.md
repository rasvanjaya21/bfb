# Review: seluruh perubahan sejak `f05d14a` (v0.4.0)

Ditulis lewat `/bfb-review` pada 2026-09-30. Cakupan: semua perubahan yang belum di-commit — perbaikan audit, migrasi Bun-only, tooling agent, dan Fase 1 `PLAN.md`.

Karena hampir semua kode ditulis oleh agent yang sama, review kode dilakukan oleh **reviewer independen** (subagent `code-reviewer` dengan konteks bersih, read-only). Checklist khusus bfb dijalankan secara mekanis.

## Verdict

**Approve, setelah perbaikan.** Reviewer awalnya meminta perubahan (2 Important, 0 Critical). Keduanya dan 8 dari 13 saran/nit sudah diperbaiki dengan test yang dibuktikan lewat mutasi; sisanya dicatat di `TODO.md`.

## Checklist bfb (mekanis)

| Cek                                                 | Hasil                                      |
| --------------------------------------------------- | ------------------------------------------ |
| Import relatif                                      | tidak ada (`bun run check`)                |
| Loop browser di `core/*` di luar `runBrowserRows()` | tidak ada                                  |
| `process.exit` di `core/*`                          | tidak ada                                  |
| Password/cookie/token tercetak ke log               | tidak ada                                  |
| Tulis data sensitif tanpa `0600`                    | tidak ada; semua lewat `writeSecretFile()` |
| Header CSV vs `src/types/global.ts`                 | cocok                                      |
| Dependency runtime vs `external` bunup              | sama persis                                |
| `VERSION` vs `package.json`                         | `v0.4.0` = `0.4.0`                         |
| Teks untuk user bukan Bahasa Indonesia              | 3 teks lama (sebelum audit) → `TODO.md`    |
| Klaim `AGENTS.md`/skill yang jadi salah             | diperbarui untuk model per-context         |

## Temuan dan penyelesaian

### Critical

Tidak ada.

### Important

1. **Isolasi antar-akun hanya untuk cookie, dan pembersihannya bisa gagal diam-diam** — `src/libs/run-browser-rows.ts`. Error pembersihan ditelan; localStorage, IndexedDB, dan service worker Facebook terbawa ke baris berikutnya. Skenario: pembersihan gagal setelah akun A, akun B tanpa cookie tersimpan membuka `/settings/` sebagai A dan tercatat berhasil.
    - **Diperbaiki:** setiap baris di `browser.createBrowserContext()` sendiri, ditutup setelah baris; gagal tutup → run berhenti. Cookie diset lewat `page.browserContext()`. Context dan page baru dibuka saat task memanggil `openPage()`.
    - **Bukti:** 9 test runner; di Chrome sungguhan context B tidak melihat localStorage/cookie A, stealth tetap aktif di context baru (`webdriver` false, `chrome.runtime` ada, 5 plugin), context default tidak tersentuh.
2. **Tombol Esc menelan Enter dan karakter berikutnya di `hideQuestion`** — `src/libs/hide-question.ts`. Esc sendirian menunggu huruf penutup sequence.
    - **Diperbaiki:** hanya `ESC [`/`ESC O` yang dianggap awal sequence; Esc di akhir potongan di-reset.
    - **Bukti:** 3 test baru (Esc lalu teks, Esc lalu Enter, Esc lalu `O`/`[`).

### Suggestion

| Saran                                                     | Status                                                                                   |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Deteksi browser tertutup lewat teks `closed`              | **Diperbaiki:** `browser.connected`; tab tertutup hanya menggagalkan baris itu           |
| Input token non-ASCII jadi "Server error"                 | **Diperbaiki:** ditolak sebagai "Token tidak valid" tanpa memanggil server               |
| Penulisan token tidak atomik, sempat `0644`               | **Diperbaiki:** `writeSecretFile()` (temp `0600`, `wx`, rename) dipakai token dan cookie |
| Temp file cookie bisa tertinggal / memakai mode lama      | **Diperbaiki:** nama acak + `wx` + dihapus saat gagal                                    |
| Jawaban `N` dan "Login bermasalah" dihitung berhasil      | **Diperbaiki:** dihitung dilewati                                                        |
| `.gitignore` folder kerja yang sudah ada tidak dilengkapi | **Diperbaiki:** entri yang belum ada ditambahkan, isi lama dipertahankan                 |

### Nit

| Nit                                                    | Status                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------- | --- | ----- |
| Komentar `content-status.ts` tidak akurat              | **Diperbaiki**                                                        |
| Entri non-array di `cookies.json` terhapus saat simpan | **Diperbaiki:** dipertahankan                                         |
| `isInitilized` typo                                    | **Diperbaiki**                                                        |
| `prepare` gagal di luar repo git                       | **Diperbaiki:** `                                                     |     | true` |
| Teks bahasa Inggris di `index.ts`/`menu.ts`/`help.ts`  | `TODO.md` (sudah ada sebelum audit; mengubah teks UI butuh keputusan) |
| `resetActivationCache` diekspor hanya untuk test       | `TODO.md`                                                             |
| `slice(0, -1)` memotong surrogate pair                 | Diterima: token dibatasi ASCII                                        |

### Ditemukan saat verifikasi review

- **Stealth plugin mencetak `Target closed`** saat page dibuka lalu langsung ditutup untuk baris yang ditolak (BM, cookie tidak ada). Hasil tetap benar, tapi output operator kotor. **Diperbaiki** dengan `openPage()` yang malas: baris yang ditolak tidak membuka page. Tes Chrome 4 baris: 0 error di output lengkap.

## Verifikasi

- `bun run format`, `lint`, `type-check`, `check`, `test` (**86 pass, 0 fail**), `build`: semua exit 0 tanpa Node.
- Mutasi: 23 (putaran `/bfb-test`) + 10 (putaran ini) — semua tertangkap atau menunjuk dead code yang lalu dihapus. Detail di `architecture/TEST.md`.
- Chrome sungguhan (headless, cookie palsu, tanpa akun): runner per-context dan alur `postFeed`.
- Belum diverifikasi: alur posting dan login di akun Facebook sungguhan; `ci.yml` di GitHub Actions (lihat `TODO.md`).

## Ukuran perubahan

Besar (±50 file, termasuk `docs/` hasil generate ±2,7 MB). Commit akan dipecah per kategori lewat `/bfb-commit`, sesuai saran "split by file group".
