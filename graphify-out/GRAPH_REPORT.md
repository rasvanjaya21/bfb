# Graph Report - bfb (2026-10-05)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 1015 nodes · 1604 edges · 59 communities (50 shown, 9 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 212 edges (avg confidence: 0.94)
- Token cost: 3,342 input · 678 output

## Graph Freshness

- Built from commit: `8666fe38`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- CLI Arguments and Menu
- CI/CD and Repository Rules
- TypeScript Configuration
- NPM Scripts and Automation
- Development Dependencies
- E2E and Integration Testing
- Prettier Formatting Rules
- Production Dependencies
- MCP and Puppeteer Config
- Fullstack Development Checklists
- Web Performance and Backend
- Observation and Debugging Workflow
- Infrastructure and Monitoring
- Browser Row Processing
- Issue Templates and Stale-bot
- Binary Entry Point
- Bug Reporting Links
- Feature Request Templates
- Question Templates
- Core Feature Specifications
- Audit Logging System
- Documentation Generation Scripts
- Project Preparation Skills
- Accessibility and ARIA Patterns
- Human Behavior Emulation
- Bot Detection Prevention
- Facebook Automation Selectors
- Runtime Engine Requirements
- Bilingual UI Support
- Package Metadata
- Cleanup and Preparation Tasks
- Release and Rollback Strategy
- Package Exports
- Bunup Configuration
- Commit History and Hooks
- Project Roadmap and Phases
- Security and OWASP Standards
- Repository Configuration
- Browser Interaction Helpers
- Dependency Overrides
- Test Coverage and Boundaries
- Bilingual Implementation Plan
- Human Emulation Plan
- Quality Assurance Checklist
- Build Implementation Rules
- Environment Observation
- Commit Message Conventions
- Shipping and Deployment Skills
- Five-Axis Review Criteria
- Review Process Steps
- Accessibility Content Checks
- User Input Utilities
- Code Review Skills
- Bot Prevention Build Log
- Planning and Documentation Skills
- Code Review Guidelines
- Security and Data Protection
- Specification Lifecycle Management

## God Nodes (most connected - your core abstractions)

1. `facebook()` - 26 edges
2. `cookies()` - 25 edges
3. `runBrowserRows()` - 25 edges
4. `compilerOptions` - 25 edges
5. `postFeed()` - 24 edges
6. `humanClick()` - 22 edges
7. `menu()` - 19 edges
8. `Code Review and Quality` - 19 edges
9. `randomDelay()` - 18 edges
10. `scripts` - 16 edges

## Surprising Connections (you probably didn't know these)

- `Testing Strategy` --references--> `Page` [INFERRED]
  architecture/SPEC.md → docs.ts
- `Task 1: Parsing argumen CLI bisa dites` --references--> `menu()` [INFERRED]
  architecture/BUILD.md → src/commands/menu.ts
- `Lingkungan dan timing` --references--> `humanClick()` [INFERRED]
  architecture/OBSERVE.md → src/libs/human-click.ts
- `Peta kondisi` --references--> `humanClick()` [INFERRED]
  architecture/OBSERVE.md → src/libs/human-click.ts
- `Risks and Mitigations` --references--> `humanClick()` [INFERRED]
  architecture/PLAN.md → src/libs/human-click.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- _*core/* Missing finally-cleanup Failure Cluster_* — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — _github_issue_template_bug_report_bug_report, _github_issue_template_feature_request_feature_request, _github_issue_template_question_question, _github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (59 total, 9 thin omitted)

### Community 0 - "CLI Arguments and Menu"

Cohesion: 0.05
Nodes (68): Build log: CLI help, bypass (`-b`), dan explicit (`-e`), Di luar task, Setelah build (permintaan user, 2026-10-01), Task 1: `parseArgs` mengenali `-b`/`--bypass` dan `-e`/`--explicit` — selesai, Task 2: `selectRows` memilih baris CSV berdasarkan `NO` — selesai, Task 3: `facebook()` dan `cookies()` menerima `explicit` — selesai, Task 4: `bfb -b <menu> [-e <NO>]` berjalan dari entry CLI sampai keluar — selesai, Task 5: `bfb help` berisi panduan lengkap, README dan AGENTS.md diperbarui — selesai (+60 more)

### Community 1 - "CI/CD and Repository Rules"

Cohesion: 0.07
Nodes (31): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test), Credentials (cookies.json, token.bfb) (+23 more)

### Community 2 - "TypeScript Configuration"

Cohesion: 0.07
Nodes (27): compilerOptions, allowImportingTsExtensions, declaration, declarationDir, isolatedDeclarations, lib, module, moduleDetection (+19 more)

### Community 3 - "NPM Scripts and Automation"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "Development Dependencies"

Cohesion: 0.20
Nodes (10): devDependencies, bumpp, bunup, javascript-obfuscator, json-server, oxlint, prettier, prettier-plugin-organize-imports (+2 more)

### Community 5 - "E2E and Integration Testing"

Cohesion: 0.04
Nodes (46): API / Integration Testing, /bfb-test, Browser Testing with DevTools, Common Assertions, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First (+38 more)

### Community 6 - "Prettier Formatting Rules"

Cohesion: 0.17
Nodes (11): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 7 - "Production Dependencies"

Cohesion: 0.33
Nodes (6): dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth

### Community 8 - "MCP and Puppeteer Config"

Cohesion: 0.53
Nodes (5): bunx, bun, bunup, puppeteer, puppeteer-extra

### Community 9 - "Fullstack Development Checklists"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 10 - "Web Performance and Backend"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "Observation and Debugging Workflow"

Cohesion: 0.11
Nodes (18): A1. Jalankan observer, A2. Yang wajib diobservasi, A3. Tulis peta kondisi, A. Observasi, B1. Jalankan runner, B2. Debug setiap kegagalan, B3. Fix dan restart, B4. Pastikan sebelum mengulang (+10 more)

### Community 12 - "Infrastructure and Monitoring"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 13 - "Browser Row Processing"

Cohesion: 0.16
Nodes (9): Task 4: Cooldown antar-baris di `src/libs/run-browser-rows.ts` — selesai, logRowOutcome(), RESULT_WORDS, InterRowDelay, OpenPage, RowOutcome, AuditLogger, FakeContext (+1 more)

### Community 19 - "Core Feature Specifications"

Cohesion: 0.05
Nodes (38): 1. Sinkronisasi Cookie (`src/core/cookie.ts` - Menu 95), 2. Posting Facebook (`src/core/facebook.ts` - Menu 1), Aktivasi (menu 97), Asumsi, Asumsi, Asumsi, Boundaries, Boundaries (+30 more)

### Community 20 - "Audit Logging System"

Cohesion: 0.05
Nodes (48): Build log: audit log, Checkpoint: Fitur lengkap — lolos, Checkpoint Fondasi — lolos, Checkpoint: Menu sederhana — disetujui user, Noticed but not touching, Task 1: Format satu baris audit — selesai, Task 2: Penulis `logs/audit.log` — selesai, Task 3: Menu 0 membuat `logs/audit.log` — selesai (+40 more)

### Community 21 - "Documentation Generation Scripts"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "Project Preparation Skills"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Accessibility and ARIA Patterns"

Cohesion: 0.20
Nodes (10): Accessibility Checklist, Accessible Lists, ARIA Roles, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Form Labels, Quick Reference: ARIA Live Regions (+2 more)

### Community 25 - "Human Behavior Emulation"

Cohesion: 0.32
Nodes (11): Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`) — selesai, Task 6: Integrasi emulasi humanis di sinkronisasi cookie (`src/core/cookie.ts`) — selesai, Fase 3: Integrasi Core & Build, Integrasi Alur Kerja, Testing Strategy, Apa yang dibuktikan setiap suite, syncCookies(), humanClick() (+3 more)

### Community 26 - "Bot Detection Prevention"

Cohesion: 0.17
Nodes (13): Task 6: `runBrowserRows` melaporkan setiap baris — selesai, Fase 3: Hasil per baris di menu 1 dan 95, Arsitektur & Helper Baru, Asumsi, Boundaries, Data dan Dampak, Keputusan User (2026-10-04), Objective (+5 more)

### Community 27 - "Facebook Automation Selectors"

Cohesion: 0.33
Nodes (13): Suggestion, acceptConsent(), captionInComposer(), clearFocusedField(), composerClosed(), dismissPopup(), postFeed(), captionProbe() (+5 more)

### Community 29 - "Bilingual UI Support"

Cohesion: 0.13
Nodes (14): Build log: bilingual Facebook UI (Inggris & Indonesia), Build sebelumnya: menutup spec as-built, Checkpoint: Core Dwibahasa — lolos, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts` — selesai (+6 more)

### Community 30 - "Package Metadata"

Cohesion: 0.10
Nodes (19): description, files, homepage, keywords, license, module, name, type (+11 more)

### Community 31 - "Cleanup and Preparation Tasks"

Cohesion: 0.18
Nodes (10): 1. TODO.md, 2. Memory Claude dan Antigravity, 3. Yang usang, 4. Sisa debug, 5. Docs, 6. Skills, 7. Pengetahuan, 8. Perintah (+2 more)

### Community 32 - "Release and Rollback Strategy"

Cohesion: 0.25
Nodes (7): Blocker, Gerbang lokal, Keputusan: **NO-GO**, Langkah menuju GO, Rencana rollback, Risiko yang diterima, Ship

### Community 35 - "Commit History and Hooks"

Cohesion: 0.40
Nodes (4): Alasan pengelompokan, Commit log, Pre-commit hook, Tidak di-commit

### Community 36 - "Project Roadmap and Phases"

Cohesion: 0.06
Nodes (26): Architecture Decisions, Checkpoint: Fase 1, Dependency graph, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang), Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab), Fase 3: Butuh akses di luar lokal, Open Questions, Overview (+18 more)

### Community 37 - "Security and OWASP Standards"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 38 - "Repository Configuration"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 39 - "Browser Interaction Helpers"

Cohesion: 0.21
Nodes (6): chalk, puppeteer-core, ensurePasswordFocus(), formatDuration(), HumanTypeOptions, PAUSE_CHARACTERS

### Community 40 - "Dependency Overrides"

Cohesion: 0.40
Nodes (5): overrides, basic-ftp, brace-expansion, ip-address, ws

### Community 41 - "Test Coverage and Boundaries"

Cohesion: 0.06
Nodes (34): Boundaries, Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun run test:coverage`), Placeholder, Struktur, Test coverage, hasRelativeImport() (+26 more)

### Community 42 - "Bilingual Implementation Plan"

Cohesion: 0.17
Nodes (12): Architecture Decisions, Checkpoint: Core Dwibahasa, Checkpoint: Fondasi Selektor, Dependency Graph, Fase 1: Fondasi Selektor Dwibahasa, Fase 2: Integrasi Alur Core, Fase 3: Build & Finalisasi, Implementation Plan: bilingual Facebook UI (Inggris & Indonesia) (+4 more)

### Community 43 - "Human Emulation Plan"

Cohesion: 0.18
Nodes (11): Architecture Decisions, Checkpoint: Cooldown Antar-Baris, Checkpoint: Fondasi Helper, Dependency Graph, Fase 1: Fondasi Helper Emulasi Humanis, Fase 2: Cooldown Antar-Baris, Implementation Plan: pencegahan deteksi bot Facebook (Human Behavior Emulation), Open Questions (+3 more)

### Community 44 - "Quality Assurance Checklist"

Cohesion: 0.20
Nodes (10): Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration, Quality, Red Flags (+2 more)

### Community 45 - "Build Implementation Rules"

Cohesion: 0.05
Nodes (38): Aturan bfb yang mengalahkan saran generik, /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+30 more)

### Community 46 - "Environment Observation"

Cohesion: 0.22
Nodes (8): Belum terobservasi, Gangguan, Lingkungan dan timing, Observe, Peta kondisi, Pintu masuk, Tanda berhasil dan gagal, Validasi

### Community 47 - "Commit Message Conventions"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 48 - "Shipping and Deployment Skills"

Cohesion: 0.25
Nodes (7): /bfb-ship, Fase A, fan-out paralel, Fase B, gabungkan, Fase C, keputusan, Method, Realitas bfb yang harus dicek sebelum GO, Reference

### Community 49 - "Five-Axis Review Criteria"

Cohesion: 0.33
Nodes (6): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, The Five-Axis Review

### Community 50 - "Review Process Steps"

Cohesion: 0.33
Nodes (6): Review Process, Step 1: Understand the Context, Step 2: Review the Tests First, Step 3: Review the Implementation, Step 4: Categorize Findings, Step 5: Verify the Verification

### Community 51 - "Accessibility Content Checks"

Cohesion: 0.33
Nodes (6): Content, Essential Checks, Forms, Keyboard Navigation, Screen Readers, Visual

### Community 52 - "User Input Utilities"

Cohesion: 0.32
Nodes (3): Important, Status setelah keputusan user (2026-10-05), askYesNo()

### Community 53 - "Code Review Skills"

Cohesion: 0.40
Nodes (4): /bfb-review, Method, Reference, Yang wajib dicek, yang terlewat oleh review generik

### Community 54 - "Bot Prevention Build Log"

Cohesion: 0.29
Nodes (7): Build log: pencegahan deteksi bot Facebook (Human Behavior Emulation), Checkpoint: Cooldown Antar-Baris — lolos, Checkpoint: Fondasi Helper — lolos, Task 1: Helper jeda acak `src/libs/random-delay.ts` — selesai, Task 2: Helper pengetikan humanis `src/libs/human-type.ts` — selesai, Task 3: Helper pergerakan kursor dan klik realistis `src/libs/human-click.ts` — selesai, Task 7: Build production, verifikasi akhir, dan audit coverage — selesai

### Community 58 - "Planning and Documentation Skills"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review Guidelines"

Cohesion: 0.12
Nodes (17): Change Descriptions, Change Sizing, Code Review and Quality, Common Rationalizations, Dead Code Hygiene, Dependency Discipline, Handling Disagreements, Honesty in Review (+9 more)

### Community 61 - "Security and Data Protection"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 65 - "Specification Lifecycle Management"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

## Knowledge Gaps

- **550 isolated node(s):** `SetupChecks`, `FakeContext`, `Doc`, `HiddenInput`, `HiddenOutput` (+545 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 585 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `runBrowserRows()` connect `Bot Detection Prevention` to `CLI Arguments and Menu`, `Project Roadmap and Phases`, `E2E and Integration Testing`, `Browser Interaction Helpers`, `Test Coverage and Boundaries`, `Human Emulation Plan`, `Build Implementation Rules`, `Browser Row Processing`, `Audit Logging System`, `Code Review Skills`, `Human Behavior Emulation`, `Facebook Automation Selectors`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `Yang wajib dicek, yang terlewat oleh review generik` connect `Code Review Skills` to `Bot Detection Prevention`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `facebook()` (e.g. with `Setelah build (permintaan user, 2026-10-01)` and `Task 3: `facebook()`dan`cookies()`menerima`explicit` — selesai`) actually correct?**
  _`facebook()` has 15 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `cookies()` (e.g. with `Task 3: `facebook()`dan`cookies()`menerima`explicit` — selesai` and `Task 4: `bfb -b <menu> [-e <NO>]` berjalan dari entry CLI sampai keluar — selesai`) actually correct?**
  _`cookies()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 17 inferred relationships involving `runBrowserRows()` (e.g. with `Task 6: `runBrowserRows` melaporkan setiap baris — selesai` and `Task 8: Docs dan status spec — selesai`) actually correct?**
  _`runBrowserRows()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **What connects `SetupChecks`, `FakeContext`, `Doc` to the rest of the system?**
  _550 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CLI Arguments and Menu` be split into smaller, more focused modules?**
  _Cohesion score 0.0526195378631892 - nodes in this community are weakly interconnected._
