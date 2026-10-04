# Commit log

Ditulis lewat `/bfb-commit` pada 2026-10-04, setelah perbaikan sinkronisasi login manual Facebook, pencegahan pencurian fokus jendela di GNOME Wayland, dan prioritasi Gemini untuk labeling graphify. Semua perubahan di-commit dalam **8 commit**, dipecah per area dan niat, tanpa trailer co-author. Belum di-push.

| Hash         | Pesan                                                                      | File                                                                                  |
| :----------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| `d2ee872`    | `feat(lib): launch chrome with fixed window size instead of maximized`      | `src/libs/launch-browser.ts`                                                          |
| `1078af1`    | `fix(lib): target clickable button container in login continue selector`    | `src/libs/facebook-selectors.ts`                                                      |
| `1d72f40`    | `test(unit): assert clickable element target in login continue selector`   | `tests/unit/011-facebook-selectors.test.ts`                                           |
| `c535c0c`    | `fix(core): retry bootloader login trigger and ensure password field click` | `src/core/cookie.ts`                                                                  |
| `622fb9d`    | `feat(skill): prioritize gemini backend for graphify labeling`             | `skills/bfb-prepare/SKILL.md`                                                         |
| `546950f`    | `docs(agents): prioritize gemini backend for graphify labeling`            | `AGENTS.md`                                                                           |
| `4c3daff`    | `chore(graph): update knowledge graph and community labels via gemini`     | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json` |
| (commit ini) | `docs(architecture): update prepare report and commit log`                 | `architecture/PREPARE.md`, `architecture/COMMIT.md`                                   |

## Alasan pengelompokan

- `feat(lib)`: penggantian flag `--start-maximized` menjadi `--window-size=1280,900` pada konfigurasi peluncuran Chromium untuk mencegah pencurian fokus jendela di Linux GNOME.
- `fix(lib)`: penyesuaian XPath selector `loginContinue` agar menargetkan container clickable (`role="button"` atau `button`) alih-alih `span`.
- `test(unit)`: pembaruan unit test selector Facebook untuk memverifikasi penargetan elemen clickable pada selector `loginContinue`.
- `fix(core)`: penambahan mekanisme retry klik jika dialog bootloader terlambat muncul serta penekanan eksplisit pada input password sebelum pengetikan.
- `feat(skill)`: konfigurasi prioritas backend `gemini` untuk pelabelan komunitas pada workflow `/bfb-prepare`.
- `docs(agents)`: pembaruan dokumentasi alur `graphify label` di `AGENTS.md` agar memprioritaskan `--backend=gemini`.
- `chore(graph)`: regenerasi knowledge graph (924 node, 1345 edge) dan pelabelan ulang 58 komunitas melalui Gemini backend.
- `docs(architecture)`: pembaruan laporan prepare dan riwayat commit log sesi ini.

## Tidak di-commit

Tidak ada. Tidak ada kredensial (`datas/`, `credentials/`, token, cookie), `.env*`, `dist/`, atau file sementara yang di-stage.

## Pre-commit hook

`lint && type-check && check` lolos di setiap commit tanpa `--no-verify`.
