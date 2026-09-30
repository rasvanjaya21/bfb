# Graph Report - bfb (2026-09-30)

## Corpus Check

- Corpus is ~47,573 words - fits in a single context window. You may not need a graph.

## Summary

- 739 nodes · 878 edges · 37 communities (31 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Menu, Aktivasi, dan Input Rahasia
- Otomasi Browser per Akun
- Generator Docs Offline
- Entry dan Argumen CLI
- Pengecek Import Relatif
- Checklist Performa Rilis
- Checklist Pra-Rilis
- Script Clean
- Spec As-Built
- Konfigurasi TypeScript
- Checklist Security Review
- Skill Prepare
- Checklist Security Rilis
- Pre-commit Hook
- Rencana Kerja
- Laporan Review
- Laporan Coverage Test
- Log Build
- Metadata Paket dan Bundler
- Dev Dependencies
- Skill Build Inkremental
- Skill Commit dan Gaya
- Metode Testing TDD
- Skill Plan Task
- Metode Code Review
- Konfigurasi Prettier
- Skill Ship dan Aksesibilitas
- Skill Spec
- Skill Test dan Pola
- Runtime Dependencies Puppeteer
- Server MCP Dokumentasi
- Checklist Performa Review
- Konsep Proyek dan Workflow
- Template Bug dan Stale
- Template Feature Request
- Template Question

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 25 edges
2. `Code Review and Quality` - 19 edges
3. `scripts` - 16 edges
4. `Security Checklist` - 15 edges
5. `Security Checklist` - 15 edges
6. `Test-Driven Development` - 15 edges
7. `menu()` - 13 edges
8. `applyDelay()` - 13 edges
9. `Shipping and Launch` - 13 edges
10. `Spec: bfb (Bot for billy) — as-built` - 13 edges

## Surprising Connections (you probably didn't know these)

- `Conventional Commits` --semantically_similar_to--> `Repo Commit Convention type(scope): description` [INFERRED] [semantically similar]
  CONTRIBUTING.md → AGENTS.md
- `csvToJson()` --calls--> `parse()` [EXTRACTED]
  src/libs/csv-parser.ts → tests/integration/001-csv-parser.test.ts
- `Token Activation Check (bfb.blackfriday.my.id API)` --references--> `High: Activation Check Can Hang (no timeout)` [INFERRED]
  AGENTS.md → TODO.md
- `bfb CLI (@rasvanjaya21/bfb)` --conceptually_related_to--> `bfb README (Bot for billy)` [INFERRED]
  AGENTS.md → README.md
- `Credentials (cookies.json, token.bfb)` --references--> `High: Plaintext Credentials with Default Permissions` [INFERRED]
  AGENTS.md → TODO.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **core/\* Missing finally-cleanup Failure Cluster** — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — \_github_issue_template_bug_report_bug_report, \_github_issue_template_feature_request_feature_request, \_github_issue_template_question_question, \_github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (37 total, 5 thin omitted)

### Community 0 - "Menu, Aktivasi, dan Input Rahasia"

Cohesion: 0.07
Nodes (26): HiddenInput, HiddenOutput, SetupStatus, ActivationResult, menu(), isFacebookPublishButtonEnable(), activateBfb(), showResult() (+18 more)

### Community 11 - "Otomasi Browser per Akun"

Cohesion: 0.10
Nodes (26): ContentStatus, Cell, OpenPage, RowsResult, Account, Content, FakeContext, cookies() (+18 more)

### Community 21 - "Generator Docs Offline"

Cohesion: 0.11
Nodes (21): Doc, Page, bunPages(), bunupPages(), checkout(), frontmatter(), lockVersion(), puppeteerExtraPages() (+13 more)

### Community 27 - "Entry dan Argumen CLI"

Cohesion: 0.27
Nodes (7): ParsedArgs, showHelp(), showVersion(), index(), parseArgs(), HELP_ARGS, VERSION_ARGS

### Community 13 - "Pengecek Import Relatif"

Cohesion: 0.36
Nodes (6): hasRelativeImport(), relativeImportChecker(), walk(), ./e, ROOTS, transpiler

### Community 10 - "Checklist Performa Rilis"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 12 - "Checklist Pra-Rilis"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 19 - "Spec As-Built"

Cohesion: 0.11
Nodes (18): Aktivasi (menu 97), Asumsi, Boundaries, Code Style, Commands, Data di folder kerja, Fitur dan acceptance criteria, Menu dan status (+10 more)

### Community 2 - "Konfigurasi TypeScript"

Cohesion: 0.05
Nodes (36): compilerOptions, allowImportingTsExtensions, declaration, declarationDir, isolatedDeclarations, lib, module, moduleDetection (+28 more)

### Community 20 - "Checklist Security Review"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 22 - "Skill Prepare"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Checklist Security Rilis"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 25 - "Rencana Kerja"

Cohesion: 0.17
Nodes (11): Architecture Decisions, Checkpoint: Fase 1, Dependency graph, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang), Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab), Fase 3: Butuh akses di luar lokal, Implementation Plan: bfb — menutup spec as-built, Open Questions (+3 more)

### Community 26 - "Laporan Review"

Cohesion: 0.17
Nodes (11): Checklist bfb (mekanis), Critical, Ditemukan saat verifikasi review, Important, Nit, Review: seluruh perubahan sejak `f05d14a` (v0.4.0), Suggestion, Temuan dan penyelesaian (+3 more)

### Community 28 - "Laporan Coverage Test"

Cohesion: 0.20
Nodes (9): Apa yang dibuktikan setiap suite, Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun test --coverage`), Placeholder, Putaran kedua (setelah `/bfb-review`), Saran berikutnya, Struktur (+1 more)

### Community 29 - "Log Build"

Cohesion: 0.22
Nodes (8): Build log, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Parsing argumen CLI bisa dites, Task 2: Aturan kunci menu bisa dites, Task 3: Penyimpanan token aktivasi dites

### Community 3 - "Metadata Paket dan Bundler"

Cohesion: 0.05
Nodes (42): bin, bfb, bugs, url, description, exports, ./package.json, files (+34 more)

### Community 4 - "Dev Dependencies"

Cohesion: 0.11
Nodes (19): devDependencies, bumpp, bunup, javascript-obfuscator, json-server, oxlint, prettier, prettier-plugin-organize-imports (+11 more)

### Community 45 - "Skill Build Inkremental"

Cohesion: 0.05
Nodes (38): Aturan bfb yang mengalahkan saran generik, /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+30 more)

### Community 47 - "Skill Commit dan Gaya"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 5 - "Metode Testing TDD"

Cohesion: 0.07
Nodes (29): Browser Testing with DevTools, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First, Name Tests Descriptively, One Assertion Per Concept, Overview (+21 more)

### Community 58 - "Skill Plan Task"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Metode Code Review"

Cohesion: 0.06
Nodes (33): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, /bfb-review, Change Descriptions, Change Sizing (+25 more)

### Community 6 - "Konfigurasi Prettier"

Cohesion: 0.15
Nodes (12): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+4 more)

### Community 61 - "Skill Ship dan Aksesibilitas"

Cohesion: 0.06
Nodes (33): Accessibility Checklist, Accessible Lists, ARIA Roles, /bfb-ship, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Content (+25 more)

### Community 65 - "Skill Spec"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

### Community 66 - "Skill Test dan Pola"

Cohesion: 0.11
Nodes (17): API / Integration Testing, /bfb-test, Common Assertions, E2E Testing (Playwright), Method, Mock at Boundaries Only, Mock Functions, Mock Modules (+9 more)

### Community 7 - "Runtime Dependencies Puppeteer"

Cohesion: 0.18
Nodes (11): dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth, chalk, @puppeteer/browsers (+3 more)

### Community 8 - "Server MCP Dokumentasi"

Cohesion: 0.57
Nodes (6): bunx, bun, bunup, puppeteer, puppeteer-extra, mcp-remote

### Community 9 - "Checklist Performa Review"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 1 - "Konsep Proyek dan Workflow"

Cohesion: 0.07
Nodes (39): CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), Release Workflow (tag v\* -> npm + GitHub Packages), changelogithub, Token Activation Check (bfb.blackfriday.my.id API), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test), Credentials (cookies.json, token.bfb), Semicolon CSV Data Files (accounts.csv, contents.csv) (+31 more)

## Knowledge Gaps

- **454 isolated node(s):** `HiddenInput`, `HiddenOutput`, `SetupStatus`, `ActivationResult`, `Cell` (+449 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 481 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `Reference` connect `Skill Ship dan Aksesibilitas` to `Checklist Performa Rilis`, `Checklist Security Rilis`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Performance Checklist` connect `Checklist Performa Rilis` to `Skill Ship dan Aksesibilitas`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `Shipping and Launch` connect `Checklist Pra-Rilis` to `Skill Ship dan Aksesibilitas`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `HiddenInput`, `HiddenOutput`, `SetupStatus` to the rest of the system?**
  _454 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Menu, Aktivasi, dan Input Rahasia` be split into smaller, more focused modules?**
  _Cohesion score 0.07039187227866474 - nodes in this community are weakly interconnected._
- **Should `Otomasi Browser per Akun` be split into smaller, more focused modules?**
  _Cohesion score 0.09990749306197964 - nodes in this community are weakly interconnected._
- **Should `Generator Docs Offline` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._
