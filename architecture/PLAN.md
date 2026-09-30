# Implementation Plan: bfb — menutup spec as-built

Ditulis lewat `/bfb-plan` pada 2026-09-30, dari `architecture/SPEC.md` dan `TODO.md`.

## Overview

Spec as-built punya satu success criterion yang belum terpenuhi: **setiap acceptance criterion punya test**, kecuali alur di Facebook sendiri. Tiga kriteria masih tanpa test karena logikanya menempel di `src/index.ts`, `src/commands/menu.ts`, dan `src/libs/activate-bfb.ts`. Fase 1 memindah logika itu ke `libs/` dan mengetesnya, tanpa mengubah perilaku. Fase 2 dan 3 adalah sisa `TODO.md` yang **tidak boleh dikerjakan** sebelum ada keputusan atau akses dari user; dicatat supaya urutannya jelas.

## Dependency graph

```
src/index.ts ──► commands/menu.ts ──► core/facebook.ts, core/cookie.ts
     │                 │                        │
     ▼                 ▼                        ▼
 libs/parse-args   libs/menu-access      libs/run-browser-rows, content-status,
 (baru, T1)        (baru, T2)            launch-browser, read-cookies, ...
                       │
                       ▼
                 libs/activate-bfb ──► libs/request-activation, hide-question (T3)
```

Tidak ada task Fase 1 yang saling bergantung; urutannya dari yang paling kecil.

## Architecture Decisions

- Logika keputusan pindah ke `libs/` (satu fungsi per file), `commands/` dan `index.ts` hanya memanggilnya. Alasan: `index.ts` menjalankan `index()` saat di-import dan `menu()` adalah loop tanpa akhir, jadi keduanya tidak bisa dites langsung.
- Perilaku dan teks untuk operator tidak berubah sedikit pun di Fase 1; test ditulis dulu terhadap perilaku yang sekarang.
- `activateBfb` menerima pembaca token opsional (default `hideQuestion`), mengikuti pola `hideQuestion(prompt, stdin, stdout)`.

## Task List

### Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang)

- [x] **Task 1: Parsing argumen CLI bisa dites**
    - Description: pindahkan keputusan di `index()` ke `libs/parse-args.ts` yang mengembalikan `{ command: 'version' | 'help' | 'menu' } | { command: 'unknown'; flag: string }`; `index.ts` hanya menjalankan hasilnya.
    - Acceptance: `version`/`--version`/`-v` → version; `help`/`--help`/`-h` → help; tanpa argumen → menu; argumen lain → unknown dengan flag pertama yang tidak dikenal; pesan `Unknown flag: '<x>'` tetap sama.
    - Verify: `bun run test`, `bun run type-check`, `bun run check`; manual `bun run src/index.ts --bogus`, `-v`.
    - Dependencies: none. Files: `src/libs/parse-args.ts`, `src/index.ts`, `tests/unit/001-parse-args.test.ts`. Scope: S.
- [x] **Task 2: Aturan kunci menu bisa dites**
    - Description: pindahkan penentuan "fitur terkunci" (menu 1 dan 95 butuh init, driver, dan aktivasi) ke `libs/menu-access.ts`.
    - Acceptance: terkunci kalau salah satu dari tiga status belum siap; terbuka hanya kalau ketiganya siap; menu 0/96/97 tidak pernah terkunci.
    - Verify: `bun run test`, `bun run type-check`; manual: di folder kosong, menu 1 menampilkan "Fitur masih terkunci".
    - Dependencies: none. Files: `src/libs/menu-access.ts`, `src/commands/menu.ts`, `tests/unit/002-menu-access.test.ts`. Scope: S.
- [x] **Task 3: Penyimpanan token aktivasi dites**
    - Description: `activateBfb` menerima pembaca token opsional; test memastikan token dari server disimpan ke `credentials/token.bfb` dengan `0600` (folder `0700`), dan tidak ada file yang ditulis saat token salah, kosong, atau server error.
    - Acceptance: empat hasil (berhasil, kosong, tidak valid, server error) masing-masing menampilkan pesan yang sama seperti sekarang; file hanya ada di kasus berhasil.
    - Verify: `bun run test`, `bun run type-check`; manual: menu 97 dengan token salah → "Token tidak valid, aktifasi gagal".
    - Dependencies: none. Files: `src/libs/activate-bfb.ts`, `tests/integration/004-activate-bfb.test.ts`. Scope: S.

### Checkpoint: Fase 1

- [x] `bun run format`, `lint`, `type-check`, `check`, `test`, `build` hijau tanpa Node
- [x] Build production dijalankan dari folder kerja kosong: `-v`, flag salah, menu 1 terkunci, menu 97 token salah, menu 99
- [x] Setiap acceptance criterion di `SPEC.md` (kecuali alur Facebook) punya test

### Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab)

- [x] Task 4: Pin versi dan SHA di `release.yml`, pisahkan job changelog tanpa `id-token: write`. Rilis pertama sesudahnya belum jalan (Task 10).
- [ ] Task 5: Hapus atau rencanakan `src/libs/asset-checker.ts`. (`src/ignore/index.ts` sudah dihapus dan diganti XPath di `facebook.ts`.)
- [x] Task 6: Coverage + `coverageThreshold` di `bunfig.toml` (per file 100% baris dan fungsi, sebelumnya 90% / 80%; dijalankan CI).
- [x] Task 7: Bump dependency dalam versi mayor yang sama + `overrides` untuk transitif rentan, `bun run docs`, tes Chrome ulang. Upgrade mayor masih terbuka di `TODO.md`.

### Fase 3: Butuh akses di luar lokal

- [ ] Task 8: Verifikasi di akun Facebook sungguhan: deteksi "postingan terkirim" dan deteksi login `includes('next')`.
- [ ] Task 9: Backend membalas token salah dengan 401/403, bukan 500 (sisi server; client sudah kompatibel dua-duanya).
- [ ] Task 10: Cek run pertama `ci.yml` yang baru di GitHub Actions (ubuntu, macos, windows).

## Risks and Mitigations

| Risk                                                          | Impact | Mitigation                                                                         |
| ------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| Refactor `index.ts`/`menu.ts` mengubah teks atau urutan layar | Med    | Test ditulis terhadap perilaku sekarang; smoke test build production di checkpoint |
| Test yang menulis file mengganggu folder kerja sungguhan      | High   | Semua test memakai folder temp + `process.chdir`, dikembalikan di `afterEach`      |
| Test permission gagal di Windows CI                           | Low    | `test.skipIf(process.platform === 'win32')`                                        |

## Open Questions

Sama dengan Fase 2 dan 3; lihat juga "Open Questions" di `SPEC.md`.
