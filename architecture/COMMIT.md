# Commit log

Ditulis lewat `/bfb-commit` pada 2026-09-30. Mencakup dua putaran: putaran sebelumnya yang dihentikan user setelah commit keempat (commit `architecture/` belum dibuat), dan putaran ini.

## Putaran sebelumnya (dihentikan)

| Hash      | Pesan                                                                      | File                                                       |
| --------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `8af86b3` | `feat(skill): update commit scopes to match repo log`                      | `skills/bfb-commit/SKILL.md`                               |
| `607f399` | `docs(agents): add skill execution rule, commit scopes, and todo findings` | `AGENTS.md`, `TODO.md`                                     |
| `4defc07` | `docs(project): update contributing guide for bun only workflow`           | `CONTRIBUTING.md`                                          |
| `1d67888` | `chore(graph): update knowledge graph`                                     | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json` |

## Putaran ini

| Hash         | Pesan                                                                           | File                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `7215a94`    | `feat(package): bump bun to 1.4.2`                                              | `.bumrc`, `package.json`                                                                                                        |
| `79855d7`    | `feat(docs): regenerate bun docs for 1.4.2`                                     | `docs/bun.md`                                                                                                                   |
| `8e74ccd`    | `fix(src): exit with code 1 on unknown flag`                                    | `src/index.ts`                                                                                                                  |
| `47b130d`    | `feat(test): cover cli exit code, token save failure, and ctrl+c`               | `tests/integration/007-cli-entry.test.ts`, `tests/integration/004-activate-bfb.test.ts`, `tests/unit/005-hide-question.test.ts` |
| `cb3e166`    | `feat(config): require full coverage for every tested file`                     | `bunfig.toml`                                                                                                                   |
| `7f8b227`    | `feat(skill): gate build, plan, ship, and test on full coverage`                | `skills/bfb-build/SKILL.md`, `skills/bfb-plan/SKILL.md`, `skills/bfb-ship/SKILL.md`, `skills/bfb-test/SKILL.md`                 |
| `1eb3770`    | `docs(project): update bun version and coverage step`                           | `README.md`, `CONTRIBUTING.md`                                                                                                  |
| `29ad26b`    | `docs(agents): add coverage threshold gotcha, cli exit code, and todo findings` | `AGENTS.md`, `TODO.md`                                                                                                          |
| `64bd057`    | `chore(graph): update knowledge graph`                                          | `graphify-out/GRAPH_REPORT.md`, `graph.html`, `graph.json`                                                                      |
| (commit ini) | `docs(architecture): update plan, spec, test report, prepare, and commit log`   | `architecture/BUILD.md`, `PLAN.md`, `PREPARE.md`, `SHIP.md`, `SPEC.md`, `TEST.md`, `COMMIT.md`                                  |

## Alasan pengelompokan

- Bun 1.4.2 dulu (`.bumrc` + `engines.bun` satu alasan), lalu `docs/bun.md` yang mengikuti versi itu.
- `fix(src)` sebelum test-nya: exit 0 untuk flag tidak dikenal memang perilaku yang salah, bukan koreksi kode baru.
- Test sebelum `bunfig.toml`: ambang 1.0 baru lolos setelah tiga celah coverage ditutup, jadi setiap commit tetap hijau di `test:coverage`.
- Skill, docs developer, docs agent, graph, dan `architecture/` dipisah per area sesuai scope repo.

## Tidak di-commit

Tidak ada. Tidak ada file di `datas/`, `credentials/`, `.env*`, `dist/`, atau cache `graphify-out/` yang ikut berubah.

## Pre-commit hook

`lint && type-check && check` lolos di semua commit; tanpa `--no-verify`.
