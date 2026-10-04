# Graph Report - bfb (2026-10-04)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 878 nodes · 1228 edges · 45 communities (36 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 98 edges (avg confidence: 0.93)
- Token cost: 2,456 input · 500 output

## Graph Freshness

- Built from commit: `ddbbcf96`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- Core Utilities and Drivers
- CI/CD and Repository Rules
- TypeScript Configuration
- Development Scripts
- Development Dependencies
- Test-Driven Development Standards
- Prettier Formatting Rules
- Production Dependencies
- MCP and Puppeteer Config
- Security and API Best Practices
- Fullstack Development Checklist
- CSV and Cookie Parsing
- Shipping and Quality Standards
- Import and Coverage Checks
- Issue Management Workflows
- CLI Binary Entry
- Bug Reporting Links
- Feature Request Templates
- Question Templates
- Feature Specifications
- Audit Logging System
- Documentation and Browser Tools
- Project Preparation Tasks
- Accessibility Standards
- Bilingual UI Architecture
- Code Review Reports
- Project Architecture Planning
- Runtime Engine Requirements
- Build Progress Tracking
- Package Metadata
- Maintenance and Cleanup Guide
- Release Decision Records
- Package Exports
- Bunup Configuration
- Commit Logging Rules
- Repository Configuration
- Dependency Overrides
- Bilingual UI Implementation
- Incremental Build Methodology
- Commit Message Conventions
- Planning and Integration Methods
- Code Review Guidelines
- Security and LLM Safety
- Specification Lifecycle Management

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 25 edges
2. `runBrowserRows()` - 20 edges
3. `Code Review and Quality` - 19 edges
4. `menu()` - 18 edges
5. `scripts` - 16 edges
6. `Test-Driven Development` - 15 edges
7. `Security Checklist` - 15 edges
8. `Security Checklist` - 15 edges
9. `Build log: audit log` - 14 edges
10. `activateBfb()` - 13 edges

## Surprising Connections (you probably didn't know these)

- `Task 1: Parsing argumen CLI bisa dites` --references--> `menu()` [INFERRED]
  architecture/BUILD.md → src/commands/menu.ts
- `Bukti bahwa test benar-benar menjaga perilaku` --references--> `mode()` [INFERRED]
  architecture/TEST.md → tests/integration/003-init-project.test.ts
- `Putaran kedua (setelah `/bfb-review`)` --references--> `postFeed()` [INFERRED]
  architecture/TEST.md → src/core/facebook.ts
- `Task 8: Docs dan status spec — selesai` --references--> `runBrowserRows()` [INFERRED]
  architecture/BUILD.md → src/libs/run-browser-rows.ts
- `Checklist bfb (mekanis)` --references--> `runBrowserRows()` [INFERRED]
  architecture/REVIEW.md → src/libs/run-browser-rows.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- _*core/* Missing finally-cleanup Failure Cluster_* — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — _github_issue_template_bug_report_bug_report, _github_issue_template_feature_request_feature_request, _github_issue_template_question_question, _github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (45 total, 9 thin omitted)

### Community 0 - "Core Utilities and Drivers"

Cohesion: 0.06
Nodes (31): Task 4: Aktivasi dan pasang driver mengembalikan hasilnya — selesai, Fase 2: Mencatat hasil menu, paths, @puppeteer/browsers, menu(), runTask(), activateBfb(), showResult() (+23 more)

### Community 1 - "CI/CD and Repository Rules"

Cohesion: 0.07
Nodes (31): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test), Credentials (cookies.json, token.bfb) (+23 more)

### Community 2 - "TypeScript Configuration"

Cohesion: 0.07
Nodes (27): compilerOptions, allowImportingTsExtensions, declaration, declarationDir, isolatedDeclarations, lib, module, moduleDetection (+19 more)

### Community 3 - "Development Scripts"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "Development Dependencies"

Cohesion: 0.20
Nodes (10): devDependencies, bumpp, bunup, javascript-obfuscator, json-server, oxlint, prettier, prettier-plugin-organize-imports (+2 more)

### Community 5 - "Test-Driven Development Standards"

Cohesion: 0.04
Nodes (45): API / Integration Testing, /bfb-test, Browser Testing with DevTools, Common Assertions, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First (+37 more)

### Community 6 - "Prettier Formatting Rules"

Cohesion: 0.17
Nodes (11): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 7 - "Production Dependencies"

Cohesion: 0.33
Nodes (6): dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth

### Community 8 - "MCP and Puppeteer Config"

Cohesion: 0.53
Nodes (5): bunx, bun, bunup, puppeteer, puppeteer-extra

### Community 9 - "Security and API Best Practices"

Cohesion: 0.04
Nodes (47): AI / LLM Security, API, Authentication, Authorization, Backend Checklist, /bfb-review, Cache checklist, Caching Strategies (+39 more)

### Community 10 - "Fullstack Development Checklist"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "CSV and Cookie Parsing"

Cohesion: 0.23
Nodes (13): Bukti bahwa test benar-benar menjaga perilaku, Putaran kedua (setelah `/bfb-review`), Cell, csvToJson(), emptyCell(), parseRows(), isReservedKey(), RESERVED_KEYS (+5 more)

### Community 12 - "Shipping and Quality Standards"

Cohesion: 0.05
Nodes (42): Accessibility, /bfb-ship, Code Quality, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+34 more)

### Community 13 - "Import and Coverage Checks"

Cohesion: 0.31
Nodes (6): Coverage (`bun run test:coverage`), hasRelativeImport(), relativeImportChecker(), ROOTS, transpilers, walk()

### Community 19 - "Feature Specifications"

Cohesion: 0.07
Nodes (29): 1. Sinkronisasi Cookie (`src/core/cookie.ts` - Menu 95), 2. Posting Facebook (`src/core/facebook.ts` - Menu 1), Aktivasi (menu 97), Asumsi, Asumsi, Boundaries, Boundaries, Code Style (+21 more)

### Community 20 - "Audit Logging System"

Cohesion: 0.06
Nodes (42): Build log: audit log, Checkpoint: Fitur lengkap — lolos, Checkpoint Fondasi — lolos, Checkpoint: Menu sederhana — disetujui user, Noticed but not touching, Task 1: Format satu baris audit — selesai, Task 2: Penulis `logs/audit.log` — selesai, Task 3: Menu 0 membuat `logs/audit.log` — selesai (+34 more)

### Community 21 - "Documentation and Browser Tools"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "Project Preparation Tasks"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Accessibility Standards"

Cohesion: 0.12
Nodes (16): Accessibility Checklist, Accessible Lists, ARIA Roles, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Content, Essential Checks (+8 more)

### Community 25 - "Bilingual UI Architecture"

Cohesion: 0.17
Nodes (12): Architecture Decisions, Checkpoint: Core Dwibahasa, Checkpoint: Fondasi Selektor, Dependency Graph, Fase 1: Fondasi Selektor Dwibahasa, Fase 2: Integrasi Alur Core, Fase 3: Build & Finalisasi, Implementation Plan: bilingual Facebook UI (Inggris & Indonesia) (+4 more)

### Community 26 - "Code Review Reports"

Cohesion: 0.13
Nodes (14): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, Checklist bfb (mekanis), Critical, Important (+6 more)

### Community 27 - "Project Architecture Planning"

Cohesion: 0.06
Nodes (32): Architecture Decisions, Architecture Decisions, Checkpoint: Fase 1, Checkpoint: Fitur lengkap, Checkpoint: Fondasi, Checkpoint: Menu sederhana, Dependency graph, Dependency graph (+24 more)

### Community 29 - "Build Progress Tracking"

Cohesion: 0.22
Nodes (8): Build sebelumnya: menutup spec as-built, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Parsing argumen CLI bisa dites, Task 2: Aturan kunci menu bisa dites, Task 3: Penyimpanan token aktivasi dites

### Community 30 - "Package Metadata"

Cohesion: 0.10
Nodes (19): description, files, homepage, keywords, license, module, name, type (+11 more)

### Community 31 - "Maintenance and Cleanup Guide"

Cohesion: 0.18
Nodes (10): 1. TODO.md, 2. Memory Claude dan Antigravity, 3. Yang usang, 4. Sisa debug, 5. Docs, 6. Skills, 7. Pengetahuan, 8. Perintah (+2 more)

### Community 32 - "Release Decision Records"

Cohesion: 0.22
Nodes (8): Acknowledged Risks, Blockers, Checklist bfb, Recommended Fixes, Rollback Plan, Ship decision: bilingual Facebook UI (Inggris & Indonesia), Ship Decision: **GO**, Specialist Reports

### Community 35 - "Commit Logging Rules"

Cohesion: 0.40
Nodes (4): Alasan pengelompokan, Commit log, Pre-commit hook, Tidak di-commit

### Community 38 - "Repository Configuration"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 40 - "Dependency Overrides"

Cohesion: 0.40
Nodes (5): overrides, basic-ftp, brace-expansion, ip-address, ws

### Community 41 - "Bilingual UI Implementation"

Cohesion: 0.07
Nodes (38): Build log: bilingual Facebook UI (Inggris & Indonesia), Checkpoint: Core Dwibahasa — lolos, Setelah build (permintaan user, 2026-10-01), Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts` — selesai, Task 2: Alur sinkronisasi cookie dwibahasa (`src/core/cookie.ts`) — selesai, Task 3: Alur posting feed dwibahasa (`src/core/facebook.ts`) — selesai, Task 4: Build production dan verifikasi akhir — selesai, Task 6: `runBrowserRows` melaporkan setiap baris — selesai (+30 more)

### Community 45 - "Incremental Build Methodology"

Cohesion: 0.05
Nodes (37): /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply (+29 more)

### Community 47 - "Commit Message Conventions"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 58 - "Planning and Integration Methods"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review Guidelines"

Cohesion: 0.07
Nodes (29): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, Change Descriptions, Change Sizing, Code Review and Quality (+21 more)

### Community 61 - "Security and LLM Safety"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 65 - "Specification Lifecycle Management"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

## Knowledge Gaps

- **509 isolated node(s):** `SetupStatus`, `ActivationResult`, `Cell`, `Doc`, `Page` (+504 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 539 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `runBrowserRows()` connect `Bilingual UI Implementation` to `Release Decision Records`, `Security and API Best Practices`, `Feature Specifications`, `Audit Logging System`, `Code Review Reports`, `Project Architecture Planning`?**
  _High betweenness centrality (0.217) - this node is a cross-community bridge._
- **Why does `Yang wajib dicek, yang terlewat oleh review generik` connect `Security and API Best Practices` to `Bilingual UI Implementation`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Are the 14 inferred relationships involving `runBrowserRows()` (e.g. with `Task 6: `runBrowserRows` melaporkan setiap baris — selesai` and `Task 8: Docs dan status spec — selesai`) actually correct?**
  _`runBrowserRows()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `SetupStatus`, `ActivationResult`, `Cell` to the rest of the system?**
  _509 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Utilities and Drivers` be split into smaller, more focused modules?**
  _Cohesion score 0.06025039123630673 - nodes in this community are weakly interconnected._
- **Should `CI/CD and Repository Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
