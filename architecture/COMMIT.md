# Commit

Ditulis lewat `/bfb-commit` pada 2026-10-05, setelah siklus fix alur posting (run 180 konten lewat `/bfb-observe`), skill `bfb-observe`, fitur CLI `help`/`-b`/`-e`, dan perbaikan pasca-ship. Semua perubahan di-commit dalam **33 commit**, dipecah per area dan niat, tanpa trailer co-author. Belum di-push (bersama 16 commit lokal sebelumnya).

| Hash         | Pesan                                                                                                   | File                                                                                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ab2302e`    | `feat(package): bump basic-ftp override to patched 6.2.2`                                               | `package.json`                                                                                                                                                               |
| `74ea1a2`    | `chore(lock): sync basic-ftp 6.2.2`                                                                     | `bun.lock`                                                                                                                                                                   |
| `923659f`    | `feat(lib): scroll element into view before human click`                                                | `src/libs/human-click.ts`                                                                                                                                                    |
| `1c2e3cc`    | `feat(lib): add interrupt option to human type`                                                         | `src/libs/human-type.ts`                                                                                                                                                     |
| `f4141a7`    | `feat(lib): disable chrome frame rate limit for windows that are not on screen`                         | `src/libs/launch-browser.ts`                                                                                                                                                 |
| `302c6f5`    | `feat(lib): add selectors for popups, boost post, composer, privacy consent, and caption probes`        | `src/libs/facebook-selectors.ts`                                                                                                                                             |
| `bf68589`    | `feat(lib): add disetujui audit result for privacy consent`                                             | `src/libs/format-audit-line.ts`                                                                                                                                              |
| `c589624`    | `feat(lib): parse bypass and explicit flags`                                                            | `src/libs/parse-args.ts`                                                                                                                                                     |
| `a5a5ead`    | `feat(lib): add row selection and loading by NO`                                                        | `src/libs/load-rows.ts`, `src/libs/select-rows.ts`                                                                                                                           |
| `8b45952`    | `feat(lib): add setup check that stops at the first failure`                                            | `src/libs/check-setup.ts`                                                                                                                                                    |
| `38ec386`    | `feat(lib): add yes/no prompt that treats closed input as no`                                           | `src/libs/ask-yes-no.ts`                                                                                                                                                     |
| `159b9bb`    | `feat(core): load selected rows and ask through askYesNo in cookie sync`                                | `src/core/cookie.ts`                                                                                                                                                         |
| `557e0a7`    | `fix(core): handle popups, privacy consent, boost post, and late composer in facebook post flow`        | `src/core/facebook.ts`                                                                                                                                                       |
| `ca1897b`    | `feat(command): add bypass command for menu 1 and 95`                                                   | `src/commands/bypass.ts`                                                                                                                                                     |
| `891cb06`    | `feat(command): pass readline to facebook from menu`                                                    | `src/commands/menu.ts`                                                                                                                                                       |
| `b33bb1f`    | `feat(command): add usage guide to help`                                                                | `src/commands/help.ts`                                                                                                                                                       |
| `1689551`    | `feat(src): route bypass and invalid arguments in cli entry`                                            | `src/index.ts`                                                                                                                                                               |
| `ead3ae2`    | `test(unit): cover bypass and explicit flag parsing`                                                    | `tests/unit/001-parse-args.test.ts`                                                                                                                                          |
| `4e70914`    | `test(unit): cover new facebook selectors and caption probes`                                           | `tests/unit/011-facebook-selectors.test.ts`                                                                                                                                  |
| `a34a0b9`    | `test(unit): cover scroll and interrupt in human helpers`                                               | `tests/unit/013-human-type.test.ts`, `tests/unit/014-human-click.test.ts`                                                                                                    |
| `55d0c54`    | `test(unit): add row selection tests`                                                                   | `tests/unit/015-select-rows.test.ts`                                                                                                                                         |
| `7118601`    | `test(unit): add yes/no prompt tests`                                                                   | `tests/unit/016-ask-yes-no.test.ts`                                                                                                                                          |
| `92c43e1`    | `test(unit): add setup check tests`                                                                     | `tests/unit/017-check-setup.test.ts`                                                                                                                                         |
| `891d51d`    | `test(integration): add row loading tests`                                                              | `tests/integration/010-load-rows.test.ts`                                                                                                                                    |
| `ab97230`    | `test(integration): cover help, bypass, and explicit in cli entry`                                      | `tests/integration/007-cli-entry.test.ts`                                                                                                                                    |
| `1a21c1d`    | `feat(skill): add bfb-observe skill for observing and validating browser flows`                         | `skills/bfb-observe/SKILL.md`                                                                                                                                                |
| `3f23c2e`    | `feat(skill): add observe stage to cycle route and follow the observe map in spec, plan, and build`     | 8 file `skills/bfb-*/SKILL.md` (selain `bfb-observe`)                                                                                                                        |
| `349bc28`    | `docs(project): document help, bypass, and explicit flags`                                              | `README.md`                                                                                                                                                                  |
| `cf1693e`    | `docs(agents): document observe stage, cli flags, facebook post pitfalls, and privacy consent decision` | `AGENTS.md`                                                                                                                                                                  |
| `2304e49`    | `docs(agents): update todo findings`                                                                    | `TODO.md`                                                                                                                                                                    |
| `9324b38`    | `chore(graph): update knowledge graph and community labels via gemini`                                  | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html`, `graphify-out/graph.json`                                                                                         |
| `047b351`    | `docs(architecture): record observe, spec, plan, build, test, review, and ship reports`                 | `architecture/BUILD.md`, `architecture/OBSERVE.md`, `architecture/PLAN.md`, `architecture/REVIEW.md`, `architecture/SHIP.md`, `architecture/SPEC.md`, `architecture/TEST.md` |
| (commit ini) | `docs(architecture): update prepare report and commit log`                                              | `architecture/PREPARE.md`, `architecture/COMMIT.md`                                                                                                                          |

## Alasan pengelompokan

- **Dependency dulu:** override `basic-ftp` di `package.json` dan `bun.lock` sebagai dua commit (`package`, `lock`), mengikuti kebiasaan repo.
- **`src/libs/`:** satu commit per helper atau perilaku (scroll, interrupt, frame rate, selektor, hasil audit, parsing flag, pemilihan/pemuatan baris, cek setup, prompt y/N), supaya setiap commit bisa dibaca dan di-revert sendiri.
- **`src/core/`:** `cookie.ts` (pemuatan baris + `askYesNo`) dipisah dari `facebook.ts`. `facebook.ts` memuat beberapa niat sekaligus (fix popup, Boost post, composer, persetujuan privasi, cek terbit, ditambah `loadRows`/`askYesNo`/log persetujuan untuk fitur CLI). Hunk-nya saling bertaut di fungsi yang sama, jadi tetap satu commit `fix(core)` karena isinya didominasi perbaikan alur yang rusak.
- **`src/commands/` dan `src/index.ts`:** bypass, menu (signature baru `facebook()`), help, dan entry CLI dipisah.
- **Test:** satu commit per suite, kecuali `human-type` dan `human-click` yang digabung karena satu niat (helper emulasi manusia).
- **Skill:** skill baru `bfb-observe` dipisah dari pembaruan rute siklus di 8 skill lain.
- **Docs:** README (`project`), `AGENTS.md`, dan `TODO.md` dipisah.
- **Generated:** `graphify-out/` (hanya `GRAPH_REPORT.md`, `graph.html`, `graph.json`).
- **Architecture:** laporan observe/spec/plan/build/test/review/ship, lalu prepare + commit log di commit terakhir.

## Tidak di-commit

- `workspaces/`, `temp/` (termasuk bukti observasi di `temp/observe/`), `dist/`, cache `graphify-out/`: di-gitignore.
- Tidak ada isi `datas/`, `credentials/`, cookie, atau token di working tree yang ter-track.

## Catatan

- Pesan `a5a5ead feat(lib): add row selection and loading by NO` memuat huruf besar `NO` (nama kolom CSV), menyimpang dari aturan huruf kecil. Tidak di-rebase karena hanya kosmetik.

## Pre-commit hook

`lint && type-check && check` lulus di setiap commit; tidak ada `--no-verify`.
