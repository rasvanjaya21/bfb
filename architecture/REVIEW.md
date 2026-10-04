# Review

Ditulis lewat `/bfb-review` pada 2026-10-05. Cakupan: semua perubahan yang belum di-commit sejak `8666fe3` (tidak ada yang di-stage). Isinya dua kelompok:

1. **Fix alur posting dari run 180 konten** (`/bfb-observe`): `src/core/facebook.ts`, `src/libs/facebook-selectors.ts`, `src/libs/human-click.ts`, `src/libs/human-type.ts`, `src/libs/launch-browser.ts`.
2. **Fitur CLI help, bypass, explicit** (spec dan plan 2026-10-05): `src/libs/parse-args.ts`, `src/libs/select-rows.ts`, `src/commands/bypass.ts`, `src/commands/help.ts`, `src/index.ts`, `src/core/cookie.ts`, `src/commands/menu.ts`.

Ditambah test (`tests/unit/001, 011, 013, 014, 015`, `tests/integration/007`), skill `bfb-observe` dan rute siklus di semua skill, `AGENTS.md`, `README.md`, dan `architecture/*`. Total `src/` + `tests/`: 15 file berubah dan 3 file baru, sekitar 560 baris ditambah.

## Verifikasi

`bun run test:coverage` 189 pass, 0 fail, exit 0; `bun run type-check`, `bun run lint`, `bun run check` bersih; `bun run build` sukses, dan build ter-obfuscate diuji untuk `help`, `-e 2`, `-b 1 -e 999`. Alur posting divalidasi di akun sungguhan lewat run 180 konten (lihat `architecture/OBSERVE.md`). `-b`/`-e` diuji nyata sampai browser (`-b 1 -e 118`, exit 0) dan untuk NO yang tidak ada (exit 1 tanpa browser).

## Critical

Tidak ada.

## Important

| #   | Temuan                                                                                                                                                                                                                                                                                                                                                                                                               | Lokasi                                               | Status                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| I1  | `AGENTS.md` belum mencatat empat jebakan baru `postFeed`: klik textbox sebelum mengetik, panel "Pembaruan Reels" ("Oke"), sesi mati di profil publik (form login), dan persetujuan privasi otomatis beserta keputusan user dan batasnya (tidak diperluas ke checkpoint/verifikasi identitas tanpa izin; jangan `waitForNetworkIdle` di Facebook). Agent lain bisa menghapus atau memperluasnya tanpa tahu alasannya. | `AGENTS.md`, "Jebakan `postFeed`"                    | **Diperbaiki**                                                                                                                          |
| I2  | `architecture/OBSERVE.md` tidak ada, padahal `/bfb-spec`, `/bfb-plan`, dan `/bfb-build` sekarang wajib mengikuti peta kondisinya. Hasil observasi hari ini hanya tersebar di percakapan dan `temp/`.                                                                                                                                                                                                                 | `architecture/OBSERVE.md`                            | **Diperbaiki**: peta pintu masuk, kondisi P1–P7 dan C1–C3, gangguan, tanda berhasil/gagal, lingkungan, timing, dan "Belum terobservasi" |
| I3  | Prompt `y/N` menggantung selamanya kalau stdin tertutup. Dibuktikan: `question()` dengan `< /dev/null` tidak pernah selesai dan tidak melempar error. `bfb -b 95` dari cron/pipe akan diam tanpa batas dengan Chrome terbuka.                                                                                                                                                                                        | `src/core/cookie.ts:154`, `src/core/facebook.ts:126` | **Diperbaiki** setelah `/bfb-ship` (keputusan user 2b): `askYesNo` menganggap input yang tertutup sebagai `N`.                          |

## Suggestion

| #   | Temuan                                                                                                                                                                                                                                                                                                             | Lokasi                                                           | Status                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------- |
| S1  | Cek cadangan "sudah terbit" (`feedCaptionSelector`) juga cocok dengan posting lama yang captionnya sama. Sudah ditandai `ponytail:` di kode dan dicatat di AGENTS.                                                                                                                                                 | `src/core/facebook.ts:241`                                       | TODO.md (Low)             |
| S2  | Langkah "Mematikan boost post" belum pernah terpakai di akun sungguhan; selector hanya terbukti terhadap dump.                                                                                                                                                                                                     | `src/core/facebook.ts:217`                                       | TODO.md (Low)             |
| S3  | `--disable-frame-rate-limit` belum diuji di desktop GNOME dan beban CPU-nya belum diukur.                                                                                                                                                                                                                          | `src/libs/launch-browser.ts:16`                                  | TODO.md (Low)             |
| S4  | `dismissPopup(page, 2000)` menambah 2 detik di setiap baris, padahal popup biasanya muncul saat mengetik dan sudah ditangani `interrupt`. Ukur dulu sebelum dihapus.                                                                                                                                               | `src/core/facebook.ts:143`                                       | TODO.md (Low)             |
| S5  | Label "I agree"/"Close" di alur persetujuan UI Inggris belum terobservasi.                                                                                                                                                                                                                                         | `src/libs/facebook-selectors.ts` (`consentAgree`, `consentDone`) | TODO.md (Low)             |
| S6  | `src/core/facebook.ts` tumbuh ke 349 baris dengan lima helper baru (`dismissPopup`, `acceptConsent`, `composerClosed`, `clearFocusedField`, `captionInComposer`). Masih jauh di bawah batas ukuran file yang sehat; kalau alur persetujuan bertambah, pindahkan `acceptConsent` ke `src/core/facebook-consent.ts`. | `src/core/facebook.ts`                                           | Tidak dikerjakan sekarang |

## Per sumbu

- **Correctness.** Perilaku CLI sesuai tabel di spec (dibuktikan test unit dan integration, ditambah dua mutasi yang tertangkap). Alur posting menangani setiap kondisi di `OBSERVE.md`. Setiap jalur yang menunggu punya batas waktu (`PUBLISH_TIMEOUT_MS`, loop `deadline`, maksimal 3 putaran × 8 switch). NO yang tidak ada ditolak sebelum `launchBrowser()`. Menu interaktif tidak berubah, karena parameter `explicit` opsional dan menu tidak mengirimnya.
- **Readability.** Setiap helper baru diberi komentar yang menjelaskan alasan (kenapa scroll, kenapa klik textbox, kenapa "Tutup", kenapa bukan `waitForNetworkIdle`), bukan langkahnya. Pesan error Bahasa Indonesia dan menyebut flag atau NO yang salah.
- **Architecture.** Logika murni ada di `libs/` (`parseArgs`, `selectRows`, selektor, `composerCaptionSelector`, `feedCaptionSelector`) dan dites 100%. `bypass.ts` di `commands/` memakai ulang `isMenuLocked`, `describeMenu`, `createAuditLogger`, `facebook()`, `cookies()` tanpa menduplikasi alur menu. Semua baris tetap lewat `runBrowserRows()`, tidak ada `process.exit` baru di `core/*`, dan tidak ada import relatif.
- **Security.** Tidak ada password, cookie, token, atau caption yang dicetak atau masuk audit log. Persetujuan privasi otomatis adalah tindakan atas nama pemilik akun; dilakukan atas keputusan eksplisit user, tercatat di `AGENTS.md`, dan dibatasi ke halaman itu saja. Probe XPath dari caption memotong di tanda kutip pertama, jadi tidak bisa merusak ekspresi. Caption adalah data operator sendiri.
- **Performance.** Tidak ada loop tanpa batas. `page.$` dipanggil sekali per tanda jeda saat mengetik (sekitar 20 panggilan CDP per caption). Alur persetujuan turun dari 46 ke 21 detik setelah `waitForNetworkIdle` diganti dengan menunggu tanda di halaman.

## Cek khusus bfb

- Import relatif: tidak ada (`bun run check`).
- Loop browser di luar `runBrowserRows()`: tidak ada.
- `process.exit` baru di `core/*`: tidak ada. Error tidak ditelan; setiap kegagalan punya pesan.
- Kredensial di console/log: tidak ada. Penulisan cookie tetap lewat `saveCookies` (`0600`).
- Header CSV vs `src/types/global.ts`: tidak berubah.
- Teks untuk user: Bahasa Indonesia. `bfb help` hanya berisi panduan penggunaan.
- Dependency runtime baru: tidak ada.
- `VERSION` (`v0.5.2`) sama dengan `package.json` (`0.5.2`).
- Klaim `AGENTS.md`: signature `facebook`/`cookies` di bagian audit log diperbarui saat build; jebakan baru ditambahkan (I1).

## Verdict

**Approve.** I1 dan I2 sudah diperbaiki. I3 dan semua suggestion tercatat di `TODO.md`. Lanjutkan ke `/bfb-ship`.
