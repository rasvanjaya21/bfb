# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, setelah `5f02b28`. Cakupan sejak prepare sebelumnya: push pertama 87 commit (diblokir GitHub push protection karena contoh token Discord di `docs/bun.md` versi Bun 1.3.9, lalu diizinkan sebagai false positive), CI run `37184248155` yang gagal di `bun publish --dry-run`, dan perbaikannya ke `bun pm pack --dry-run` (3 commit, belum di-push). Semua langkah skill dijalankan.

## 1. TODO.md

- **Diverifikasi masih terbuka:** `asset-checker.ts` masih tidak di-import di mana pun, `--no-startup-window` masih di `launch-browser.ts:14`, `extract-zip` masih 2.0.1, config global agy masih `mcp-remote` tanpa versi, 36 file `src/`, dan upgrade mayor (`puppeteer-core` 25.12.0, `@puppeteer/browsers` 3.2.3, `chalk` 6.0.1, `bumpp` 12.3.0, `json-server` 1.0.0-beta.15) masih belum dievaluasi.
- **Ditambah (Tooling & CI):** `actions/checkout` v4.4.0 masih menargetkan Node 20 (peringatan di run 37184248155), dan `ubuntu-latest` pindah ke Ubuntu 26 mulai 2026-10-19.
- **Diperbarui:** tanggal ke 2026-10-04. Item CI sudah dipersempit ke `release.yml` di commit `5c8b245`.
- Tidak ada yang dihapus. Total 12 item terbuka.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy kosong (hanya `knowledge.lock`). Sesi `brain/` yang menyebut `Developer/bfb` hanya berisi hasil fetch web, bukan sesi di workspace ini.

## 3. Yang usang

- `skills/bfb-ship/SKILL.md`: klaim "bumpp hanya mengubah `package.json`" salah (`bun run release` menaikkan `package.json` dan `constant.ts` sekaligus). Pilihan `npm pack --dry-run` dihapus, jadi hanya `bun pm pack --dry-run`.
- `skills/bfb-test/SKILL.md`: rujukan ke bagian "Testing" di `TODO.md`, yang sudah tidak ada, diganti ke "Tooling & CI".
- `architecture/SHIP.md:47` masih menyebut `bun publish --dry-run`. Dibiarkan karena itu catatan hasil ship sebelumnya, bukan instruksi.
- Tidak ada kode, file, atau dependency yang tidak dipakai selain `asset-checker.ts`, yang masih menunggu keputusan user (TODO).

## 4. Sisa debug

Tidak ada. `console.log` yang tersisa adalah teks UI (`version.ts`, pesan hasil di `core/*`, petunjuk di `index.ts`). `test.skipIf(win32)` disengaja untuk test mode file POSIX. Tidak ada `debugger`, `.only`, kode yang di-comment-out, atau file coba-coba yang tidak ter-ignore.

## 5. Docs

- `AGENTS.md`: ditambah catatan bahwa mirror `docs/` bisa memuat contoh secret dari upstream yang memicu GitHub push protection. Kalau terjadi, izinkan lewat link unblock, tanpa menulis ulang history dan tanpa mengedit `docs/`.
- `docs/`: semua versi cocok dengan `.bumrc` dan `bun.lock` (Bun 1.4.2, bunup 0.16.32, puppeteer-core 24.43.1, puppeteer-extra 3.3.6, stealth 2.11.2), jadi `bun run docs` tidak dijalankan. Pasangan `.mcp.json` dan `docs/` tetap 1:1 (4 server).
- `README.md` dan `CONTRIBUTING.md`: tidak ada yang perlu diubah.

## 6. Skills

`bfb-ship` (checklist pra-GO: CI hijau dulu sebelum `bun run release` karena perintah itu ikut mem-push commit, klaim versi, dan `bun pm pack`) dan `bfb-test` (rujukan TODO). Bagian bfb di skill lain sudah sesuai. `# Method` dan `# Reference` tidak disentuh.

## 7. Pengetahuan

Pelajaran repo (push protection karena `docs/`, dan `bun publish --dry-run` yang butuh auth) ada di `AGENTS.md`. Tidak ada koreksi dari user di sesi ini, jadi tidak ada memory baru.

## 8. Perintah

| Perintah             | Hasil                                     |
| -------------------- | ----------------------------------------- |
| `bun run format`     | exit 0                                    |
| `bun run lint`       | exit 0                                    |
| `bun run type-check` | exit 0                                    |
| `bun run check`      | exit 0, tidak ada import relatif          |
| `bun run test`       | exit 0, 135 pass, 0 fail, 20 file         |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=claude-cli`: **847 node, 1022 edge, 52 komunitas**, semuanya berlabel (tidak ada yang tersisa sebagai `Community N` atau nama file). `bun run format` dijalankan lagi setelahnya.
