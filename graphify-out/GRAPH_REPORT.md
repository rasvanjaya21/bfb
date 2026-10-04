# Graph Report - bfb (2026-10-04)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 924 nodes · 1345 edges · 58 communities (48 shown, 10 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 132 edges (avg confidence: 0.94)
- Token cost: 3,118 input · 681 output

## Graph Freshness

- Built from commit: `0c67d7c8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- Menu and Driver Architecture
- CI/CD and Project Conventions
- TypeScript Compiler Configuration
- Project Script Commands
- Development Dependencies
- Testing Strategy and Guidelines
- Prettier Formatting Configuration
- Production Dependencies
- MCP and Puppeteer Tools
- Web Development Checklists
- Backend and Frontend Best-Practices
- Test Coverage and Structure
- Operational Quality Standards
- Import Rule Enforcement
- Issue Management Workflows
- Binary Executables
- Bug Reporting Links
- Feature Request Templates
- Question Issue Templates
- Facebook Automation Specifications
- Audit Log Implementation Plan
- Documentation and Browser Tools
- Project Preparation Skills
- Accessibility and ARIA Patterns
- Human Behavior Emulation Logic
- Audit Log Task Progress
- Bot Detection Prevention Tasks
- Runtime Engine Specification
- Bilingual UI Build Log
- Package Metadata and Obfuscation
- Environment Cleanup and Preparation
- Ship Decision and Risks
- Package Export Definitions
- Bunup Tool Configuration
- Commit Logging and Hooks
- Bilingual Selector Implementation Plan
- Security and LLM Guidelines
- Repository Configuration
- Human Behavior Review Report
- Dependency Overrides
- Audit Logging and Utilities
- Bot Detection Mitigation Plan
- Human Behavior Spec Criteria
- Quality and Readiness Checklist
- Build Rules and Standards
- Core Integration and Security
- Commit Message Conventions
- Release Decision Methodology
- Five-Axis Review Framework
- Review Process Steps
- Accessibility and Navigation Checks
- Puppeteer Browser Testing
- Review Methodology Skills
- Planning and Integration Standards
- Code Review Quality Standards
- Security and OWASP Reference
- Specification Lifecycle Method

## God Nodes (most connected - your core abstractions)

1. `runBrowserRows()` - 25 edges
2. `compilerOptions` - 25 edges
3. `randomDelay()` - 19 edges
4. `Code Review and Quality` - 19 edges
5. `menu()` - 18 edges
6. `humanClick()` - 18 edges
7. `humanType()` - 18 edges
8. `scripts` - 16 edges
9. `Security Checklist` - 15 edges
10. `Test-Driven Development` - 15 edges

## Surprising Connections (you probably didn't know these)

- `Testing Strategy` --references--> `Page` [INFERRED]
  architecture/SPEC.md → docs.ts
- `Task 1: Parsing argumen CLI bisa dites` --references--> `menu()` [INFERRED]
  architecture/BUILD.md → src/commands/menu.ts
- `Risks and Mitigations` --references--> `humanClick()` [INFERRED]
  architecture/PLAN.md → src/libs/human-click.ts
- `Fase 1: Fondasi Helper Emulasi Humanis` --references--> `randomDelay()` [INFERRED]
  architecture/PLAN.md → src/libs/random-delay.ts
- `Task 8: Docs dan status spec — selesai` --references--> `runBrowserRows()` [INFERRED]
  architecture/BUILD.md → src/libs/run-browser-rows.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- _*core/* Missing finally-cleanup Failure Cluster_* — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — _github_issue_template_bug_report_bug_report, _github_issue_template_feature_request_feature_request, _github_issue_template_question_question, _github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (58 total, 10 thin omitted)

### Community 0 - "Menu and Driver Architecture"

Cohesion: 0.05
Nodes (38): Task 4: Aktivasi dan pasang driver mengembalikan hasilnya — selesai, Task 5: Setiap pilihan menu tercatat — selesai, Architecture Decisions, Fase 2: Mencatat hasil menu, Risks and Mitigations, @puppeteer/browsers, showHelp(), menu() (+30 more)

### Community 1 - "CI/CD and Project Conventions"

Cohesion: 0.07
Nodes (31): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test), Credentials (cookies.json, token.bfb) (+23 more)

### Community 2 - "TypeScript Compiler Configuration"

Cohesion: 0.07
Nodes (27): compilerOptions, allowImportingTsExtensions, declaration, declarationDir, isolatedDeclarations, lib, module, moduleDetection (+19 more)

### Community 3 - "Project Script Commands"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "Development Dependencies"

Cohesion: 0.20
Nodes (10): devDependencies, bumpp, bunup, javascript-obfuscator, json-server, oxlint, prettier, prettier-plugin-organize-imports (+2 more)

### Community 5 - "Testing Strategy and Guidelines"

Cohesion: 0.04
Nodes (46): API / Integration Testing, /bfb-test, Browser Testing with DevTools, Common Assertions, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First (+38 more)

### Community 6 - "Prettier Formatting Configuration"

Cohesion: 0.17
Nodes (11): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 7 - "Production Dependencies"

Cohesion: 0.33
Nodes (6): dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth

### Community 8 - "MCP and Puppeteer Tools"

Cohesion: 0.53
Nodes (5): bunx, bun, bunup, puppeteer, puppeteer-extra

### Community 9 - "Web Development Checklists"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 10 - "Backend and Frontend Best-Practices"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "Test Coverage and Structure"

Cohesion: 0.29
Nodes (6): Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun run test:coverage`), Placeholder, Struktur, Test coverage

### Community 12 - "Operational Quality Standards"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 13 - "Import Rule Enforcement"

Cohesion: 0.36
Nodes (5): hasRelativeImport(), relativeImportChecker(), ROOTS, transpilers, walk()

### Community 19 - "Facebook Automation Specifications"

Cohesion: 0.07
Nodes (29): 1. Sinkronisasi Cookie (`src/core/cookie.ts` - Menu 95), 2. Posting Facebook (`src/core/facebook.ts` - Menu 1), Aktivasi (menu 97), Asumsi, Asumsi, Boundaries, Boundaries, Code Style (+21 more)

### Community 20 - "Audit Log Implementation Plan"

Cohesion: 0.09
Nodes (28): Task 3: Menu 0 membuat `logs/audit.log` — selesai, Architecture Decisions, Checkpoint: Fitur lengkap, Checkpoint: Fondasi, Checkpoint: Menu sederhana, Dependency graph, Fase 1: Fondasi log, Fase 4: Dokumentasi (+20 more)

### Community 21 - "Documentation and Browser Tools"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "Project Preparation Skills"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Accessibility and ARIA Patterns"

Cohesion: 0.20
Nodes (10): Accessibility Checklist, Accessible Lists, ARIA Roles, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Form Labels, Quick Reference: ARIA Live Regions (+2 more)

### Community 25 - "Human Behavior Emulation Logic"

Cohesion: 0.33
Nodes (9): 5. Docs, 1. Correctness, 2. Readability & Simplicity, Testing Strategy, Apa yang dibuktikan setiap suite, humanClick(), PAUSE_CHARACTERS, randomDelay() (+1 more)

### Community 26 - "Audit Log Task Progress"

Cohesion: 0.14
Nodes (18): Build log: audit log, Checkpoint: Fitur lengkap — lolos, Checkpoint Fondasi — lolos, Checkpoint: Menu sederhana — disetujui user, Noticed but not touching, Setelah build (permintaan user, 2026-10-01), Task 1: Format satu baris audit — selesai, Task 6: `runBrowserRows` melaporkan setiap baris — selesai (+10 more)

### Community 27 - "Bot Detection Prevention Tasks"

Cohesion: 0.14
Nodes (12): Build log: pencegahan deteksi bot Facebook (Human Behavior Emulation), Checkpoint: Cooldown Antar-Baris — lolos, Checkpoint: Fondasi Helper — lolos, Task 1: Helper jeda acak `src/libs/random-delay.ts` — selesai, Task 2: Helper pengetikan humanis `src/libs/human-type.ts` — selesai, Task 3: Helper pergerakan kursor dan klik realistis `src/libs/human-click.ts` — selesai, Task 4: Cooldown antar-baris di `src/libs/run-browser-rows.ts` — selesai, Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`) — selesai (+4 more)

### Community 29 - "Bilingual UI Build Log"

Cohesion: 0.12
Nodes (17): Build log: bilingual Facebook UI (Inggris & Indonesia), Build sebelumnya: menutup spec as-built, Checkpoint: Core Dwibahasa — lolos, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts` — selesai (+9 more)

### Community 30 - "Package Metadata and Obfuscation"

Cohesion: 0.10
Nodes (19): description, files, homepage, keywords, license, module, name, type (+11 more)

### Community 31 - "Environment Cleanup and Preparation"

Cohesion: 0.20
Nodes (9): 1. TODO.md, 2. Memory Claude dan Antigravity, 3. Yang usang, 4. Sisa debug, 6. Skills, 7. Pengetahuan, 8. Perintah, 9. Graphify (+1 more)

### Community 32 - "Ship Decision and Risks"

Cohesion: 0.25
Nodes (7): Acknowledged Risks, Blockers, Checklist bfb, Recommended Fixes, Rollback Plan, Ship Decision: **GO**, Ship decision: Human Behavior Emulation

### Community 35 - "Commit Logging and Hooks"

Cohesion: 0.40
Nodes (4): Alasan pengelompokan, Commit log, Pre-commit hook, Tidak di-commit

### Community 36 - "Bilingual Selector Implementation Plan"

Cohesion: 0.09
Nodes (22): Architecture Decisions, Checkpoint: Core Dwibahasa, Checkpoint: Fase 1, Checkpoint: Fondasi Selektor, Dependency Graph, Dependency graph, Fase 1: Fondasi Selektor Dwibahasa, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang) (+14 more)

### Community 37 - "Security and LLM Guidelines"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 38 - "Repository Configuration"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 39 - "Human Behavior Review Report"

Cohesion: 0.17
Nodes (11): 3. Architecture, 5. Performance, Checklist bfb (mekanis), Critical, Important, Review: Human Behavior Emulation, Review Lima Sumbu, Suggestion (+3 more)

### Community 40 - "Dependency Overrides"

Cohesion: 0.40
Nodes (5): overrides, basic-ftp, brace-expansion, ip-address, ws

### Community 41 - "Audit Logging and Utilities"

Cohesion: 0.07
Nodes (34): Task 2: Penulis `logs/audit.log` — selesai, paths, chalk, ContentStatus, ROUTES, TYPES, Cell, csvToJson() (+26 more)

### Community 42 - "Bot Detection Mitigation Plan"

Cohesion: 0.18
Nodes (11): Architecture Decisions, Checkpoint: Cooldown Antar-Baris, Checkpoint: Fondasi Helper, Dependency Graph, Fase 1: Fondasi Helper Emulasi Humanis, Fase 2: Cooldown Antar-Baris, Implementation Plan: pencegahan deteksi bot Facebook (Human Behavior Emulation), Open Questions (+3 more)

### Community 43 - "Human Behavior Spec Criteria"

Cohesion: 0.20
Nodes (11): Arsitektur & Helper Baru, Asumsi, Boundaries, Data dan Dampak, Integrasi Alur Kerja, Keputusan User (2026-10-04), Objective, Open Questions (+3 more)

### Community 44 - "Quality and Readiness Checklist"

Cohesion: 0.20
Nodes (10): Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration, Quality, Red Flags (+2 more)

### Community 45 - "Build Rules and Standards"

Cohesion: 0.05
Nodes (38): Aturan bfb yang mengalahkan saran generik, /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+30 more)

### Community 46 - "Core Integration and Security"

Cohesion: 0.36
Nodes (10): Task 6: Integrasi emulasi humanis di sinkronisasi cookie (`src/core/cookie.ts`) — selesai, Fase 3: Hasil per baris di menu 1 dan 95, Fase 3: Integrasi Core & Build, 4. Security, Specialist Reports, syncCookies(), postFeed(), ensurePasswordFocus() (+2 more)

### Community 47 - "Commit Message Conventions"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 48 - "Release Decision Methodology"

Cohesion: 0.25
Nodes (7): /bfb-ship, Fase A, fan-out paralel, Fase B, gabungkan, Fase C, keputusan, Method, Realitas bfb yang harus dicek sebelum GO, Reference

### Community 49 - "Five-Axis Review Framework"

Cohesion: 0.33
Nodes (6): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, The Five-Axis Review

### Community 50 - "Review Process Steps"

Cohesion: 0.33
Nodes (6): Review Process, Step 1: Understand the Context, Step 2: Review the Tests First, Step 3: Review the Implementation, Step 4: Categorize Findings, Step 5: Verify the Verification

### Community 51 - "Accessibility and Navigation Checks"

Cohesion: 0.33
Nodes (6): Content, Essential Checks, Forms, Keyboard Navigation, Screen Readers, Visual

### Community 53 - "Review Methodology Skills"

Cohesion: 0.40
Nodes (4): /bfb-review, Method, Reference, Yang wajib dicek, yang terlewat oleh review generik

### Community 58 - "Planning and Integration Standards"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review Quality Standards"

Cohesion: 0.12
Nodes (17): Change Descriptions, Change Sizing, Code Review and Quality, Common Rationalizations, Dead Code Hygiene, Dependency Discipline, Handling Disagreements, Honesty in Review (+9 more)

### Community 61 - "Security and OWASP Reference"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 65 - "Specification Lifecycle Method"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

## Knowledge Gaps

- **523 isolated node(s):** `HiddenInput`, `HiddenOutput`, `SetupStatus`, `ParsedArgs`, `ActivationResult` (+518 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 555 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `runBrowserRows()` connect `Human Behavior Spec Criteria` to `Menu and Driver Architecture`, `Testing Strategy and Guidelines`, `Human Behavior Review Report`, `Audit Logging and Utilities`, `Bot Detection Mitigation Plan`, `Build Rules and Standards`, `Core Integration and Security`, `Facebook Automation Specifications`, `Audit Log Implementation Plan`, `Review Methodology Skills`, `Puppeteer Browser Testing`, `Human Behavior Emulation Logic`, `Audit Log Task Progress`, `Bot Detection Prevention Tasks`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `Yang wajib dicek, yang terlewat oleh review generik` connect `Review Methodology Skills` to `Human Behavior Spec Criteria`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `runBrowserRows()` (e.g. with `Task 6: `runBrowserRows` melaporkan setiap baris — selesai` and `Task 8: Docs dan status spec — selesai`) actually correct?**
  _`runBrowserRows()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `randomDelay()` (e.g. with `Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`) — selesai` and `Fase 1: Fondasi Helper Emulasi Humanis`) actually correct?**
  _`randomDelay()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `HiddenInput`, `HiddenOutput`, `SetupStatus` to the rest of the system?**
  _523 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Menu and Driver Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.05297297297297297 - nodes in this community are weakly interconnected._
- **Should `CI/CD and Project Conventions` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
