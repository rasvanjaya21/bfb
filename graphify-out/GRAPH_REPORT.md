# Graph Report - bfb (2026-10-04)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 924 nodes · 1342 edges · 59 communities (49 shown, 10 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.94)
- Token cost: 47,062 input · 734 output

## Graph Freshness

- Built from commit: `4938a247`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- Interactive Menu & Driver
- Project Overview & Release
- TypeScript Compiler Config
- Package Scripts
- Dev Dependencies
- Test-Driven Development Skill
- Prettier Config
- Runtime Dependencies
- MCP Server Config
- Performance Checklist
- Performance Checklist Copy
- Test Coverage Report
- Launch Readiness Checklist
- Relative Import Checker
- Issue & Stale Workflows
- CLI Binary Entry
- Bug Tracker URL
- Feature Request Template
- Question Issue Template
- Feature Specification
- Audit Log Plan Tasks
- Offline Docs Generator
- Prepare Skill
- Accessibility Checklist
- Human Behavior Emulation
- Browser Row Runner & Audit
- CLI Entry & Arguments
- Bun Engine Requirement
- Bilingual UI Build Log
- Package Metadata
- Prepare Report
- Ship Decision Report
- Package Exports
- Bunup Build Config
- Commit Log Report
- Bilingual Selector Plan
- Security Checklist
- Repository Metadata
- Hidden Input Prompt
- Dependency Overrides
- Audit Log Writer & Core
- Activation & Menu Results
- Activation API Check
- Definition of Done
- Incremental Build Skill
- Audit Line Formatting
- Commit Message Conventions
- Ship Skill
- Five-Axis Review
- Review Process Steps
- Accessibility Essential Checks
- Menu Lock Rules
- Review Skill
- Menu Description Labels
- Planning Skill
- Code Review Practices
- Security Checklist Copy
- Spec Skill

## God Nodes (most connected - your core abstractions)

1. `runBrowserRows()` - 25 edges
2. `compilerOptions` - 25 edges
3. `Code Review and Quality` - 19 edges
4. `menu()` - 18 edges
5. `randomDelay()` - 18 edges
6. `humanClick()` - 17 edges
7. `humanType()` - 17 edges
8. `scripts` - 16 edges
9. `Security Checklist` - 15 edges
10. `Test-Driven Development` - 15 edges

## Surprising Connections (you probably didn't know these)

- `Testing Strategy` --references--> `Page` [INFERRED]
  architecture/SPEC.md → docs.ts
- `Task 1: Parsing argumen CLI bisa dites` --references--> `menu()` [INFERRED]
  architecture/BUILD.md → src/commands/menu.ts
- `Fase 2: Cooldown Antar-Baris` --references--> `runBrowserRows()` [INFERRED]
  architecture/PLAN.md → src/libs/run-browser-rows.ts
- `Yang wajib dicek, yang terlewat oleh review generik` --references--> `runBrowserRows()` [INFERRED]
  skills/bfb-review/SKILL.md → src/libs/run-browser-rows.ts
- `Fase 3: Hasil per baris di menu 1 dan 95` --references--> `RowsResult` [INFERRED]
  architecture/PLAN.md → src/libs/run-browser-rows.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- _*core/* Missing finally-cleanup Failure Cluster_* — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — _github_issue_template_bug_report_bug_report, _github_issue_template_feature_request_feature_request, _github_issue_template_question_question, _github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (59 total, 10 thin omitted)

### Community 0 - "Interactive Menu & Driver"

Cohesion: 0.28
Nodes (8): @puppeteer/browsers, menu(), cookies(), applyDelay(), checkDriver(), downloadDriver(), showResult(), createAuditLogger()

### Community 1 - "Project Overview & Release"

Cohesion: 0.07
Nodes (31): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test), Credentials (cookies.json, token.bfb) (+23 more)

### Community 2 - "TypeScript Compiler Config"

Cohesion: 0.07
Nodes (27): compilerOptions, allowImportingTsExtensions, declaration, declarationDir, isolatedDeclarations, lib, module, moduleDetection (+19 more)

### Community 3 - "Package Scripts"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "Dev Dependencies"

Cohesion: 0.20
Nodes (10): devDependencies, bumpp, bunup, javascript-obfuscator, json-server, oxlint, prettier, prettier-plugin-organize-imports (+2 more)

### Community 5 - "Test-Driven Development Skill"

Cohesion: 0.04
Nodes (46): API / Integration Testing, /bfb-test, Browser Testing with DevTools, Common Assertions, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First (+38 more)

### Community 6 - "Prettier Config"

Cohesion: 0.17
Nodes (11): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 7 - "Runtime Dependencies"

Cohesion: 0.33
Nodes (6): dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth

### Community 8 - "MCP Server Config"

Cohesion: 0.53
Nodes (5): bunx, bun, bunup, puppeteer, puppeteer-extra

### Community 9 - "Performance Checklist"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 10 - "Performance Checklist Copy"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "Test Coverage Report"

Cohesion: 0.29
Nodes (6): Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun run test:coverage`), Placeholder, Struktur, Test coverage

### Community 12 - "Launch Readiness Checklist"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 13 - "Relative Import Checker"

Cohesion: 0.36
Nodes (5): hasRelativeImport(), relativeImportChecker(), ROOTS, transpilers, walk()

### Community 19 - "Feature Specification"

Cohesion: 0.07
Nodes (28): 1. Sinkronisasi Cookie (`src/core/cookie.ts` - Menu 95), 2. Posting Facebook (`src/core/facebook.ts` - Menu 1), Aktivasi (menu 97), Asumsi, Asumsi, Boundaries, Code Style, Commands (+20 more)

### Community 20 - "Audit Log Plan Tasks"

Cohesion: 0.12
Nodes (20): Task 3: Menu 0 membuat `logs/audit.log` — selesai, Checkpoint: Fitur lengkap, Checkpoint: Fondasi, Checkpoint: Menu sederhana, Fase 1: Fondasi log, Fase 4: Dokumentasi, Task List, Boundaries (+12 more)

### Community 21 - "Offline Docs Generator"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "Prepare Skill"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Accessibility Checklist"

Cohesion: 0.20
Nodes (10): Accessibility Checklist, Accessible Lists, ARIA Roles, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Form Labels, Quick Reference: ARIA Live Regions (+2 more)

### Community 25 - "Human Behavior Emulation"

Cohesion: 0.07
Nodes (44): Build log: pencegahan deteksi bot Facebook (Human Behavior Emulation), Checkpoint: Cooldown Antar-Baris — lolos, Checkpoint: Fondasi Helper — lolos, Task 1: Helper jeda acak `src/libs/random-delay.ts` — selesai, Task 2: Helper pengetikan humanis `src/libs/human-type.ts` — selesai, Task 3: Helper pergerakan kursor dan klik realistis `src/libs/human-click.ts` — selesai, Task 5: Integrasi emulasi humanis di posting Facebook (`src/core/facebook.ts`) — selesai, Task 6: Integrasi emulasi humanis di sinkronisasi cookie (`src/core/cookie.ts`) — selesai (+36 more)

### Community 26 - "Browser Row Runner & Audit"

Cohesion: 0.06
Nodes (37): Build log: audit log, Checkpoint: Fitur lengkap — lolos, Checkpoint Fondasi — lolos, Checkpoint: Menu sederhana — disetujui user, Noticed but not touching, Setelah build (permintaan user, 2026-10-01), Task 4: Cooldown antar-baris di `src/libs/run-browser-rows.ts` — selesai, Task 6: `runBrowserRows` melaporkan setiap baris — selesai (+29 more)

### Community 27 - "CLI Entry & Arguments"

Cohesion: 0.24
Nodes (7): showHelp(), showVersion(), index(), HELP_ARGS, parseArgs(), ParsedArgs, VERSION_ARGS

### Community 29 - "Bilingual UI Build Log"

Cohesion: 0.12
Nodes (17): Build log: bilingual Facebook UI (Inggris & Indonesia), Build sebelumnya: menutup spec as-built, Checkpoint: Core Dwibahasa — lolos, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Definisi selektor dwibahasa di `src/libs/facebook-selectors.ts` — selesai (+9 more)

### Community 30 - "Package Metadata"

Cohesion: 0.10
Nodes (19): description, files, homepage, keywords, license, module, name, type (+11 more)

### Community 31 - "Prepare Report"

Cohesion: 0.18
Nodes (10): 1. TODO.md, 2. Memory Claude dan Antigravity, 3. Yang usang, 4. Sisa debug, 5. Docs, 6. Skills, 7. Pengetahuan, 8. Perintah (+2 more)

### Community 32 - "Ship Decision Report"

Cohesion: 0.25
Nodes (7): Acknowledged Risks, Blockers, Checklist bfb, Recommended Fixes, Rollback Plan, Ship Decision: **GO**, Ship decision: Human Behavior Emulation

### Community 35 - "Commit Log Report"

Cohesion: 0.40
Nodes (4): Alasan pengelompokan, Commit log, Pre-commit hook, Tidak di-commit

### Community 36 - "Bilingual Selector Plan"

Cohesion: 0.09
Nodes (22): Architecture Decisions, Checkpoint: Core Dwibahasa, Checkpoint: Fase 1, Checkpoint: Fondasi Selektor, Dependency Graph, Dependency graph, Fase 1: Fondasi Selektor Dwibahasa, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang) (+14 more)

### Community 37 - "Security Checklist"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 38 - "Repository Metadata"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 39 - "Hidden Input Prompt"

Cohesion: 0.15
Nodes (10): Architecture Decisions, Architecture Decisions, Dependency graph, Implementation Plan: audit log, Open Questions, Overview, Risks and Mitigations, HiddenInput (+2 more)

### Community 40 - "Dependency Overrides"

Cohesion: 0.40
Nodes (5): overrides, basic-ftp, brace-expansion, ip-address, ws

### Community 41 - "Audit Log Writer & Core"

Cohesion: 0.07
Nodes (37): Task 2: Penulis `logs/audit.log` — selesai, Asumsi, Boundaries, paths, chalk, ContentStatus, ROUTES, TYPES (+29 more)

### Community 42 - "Activation & Menu Results"

Cohesion: 0.21
Nodes (8): Task 4: Aktivasi dan pasang driver mengembalikan hasilnya — selesai, Task 5: Setiap pilihan menu tercatat — selesai, Fase 2: Mencatat hasil menu, runTask(), activateBfb(), showResult(), requestActivation(), realCwd

### Community 43 - "Activation API Check"

Cohesion: 0.21
Nodes (4): checkActivation(), ActivationResult, MOTIVATIONS, realCwd

### Community 44 - "Definition of Done"

Cohesion: 0.20
Nodes (10): Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration, Quality, Red Flags (+2 more)

### Community 45 - "Incremental Build Skill"

Cohesion: 0.06
Nodes (34): Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Implementation Rules (+26 more)

### Community 46 - "Audit Line Formatting"

Cohesion: 0.36
Nodes (7): Task 1: Format satu baris audit — selesai, AuditEntry, AuditResult, clean(), formatAuditLine(), pad(), date

### Community 47 - "Commit Message Conventions"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 48 - "Ship Skill"

Cohesion: 0.25
Nodes (7): /bfb-ship, Fase A, fan-out paralel, Fase B, gabungkan, Fase C, keputusan, Method, Realitas bfb yang harus dicek sebelum GO, Reference

### Community 49 - "Five-Axis Review"

Cohesion: 0.33
Nodes (6): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, The Five-Axis Review

### Community 50 - "Review Process Steps"

Cohesion: 0.33
Nodes (6): Review Process, Step 1: Understand the Context, Step 2: Review the Tests First, Step 3: Review the Implementation, Step 4: Categorize Findings, Step 5: Verify the Verification

### Community 51 - "Accessibility Essential Checks"

Cohesion: 0.33
Nodes (6): Content, Essential Checks, Forms, Keyboard Navigation, Screen Readers, Visual

### Community 52 - "Menu Lock Rules"

Cohesion: 0.40
Nodes (4): isMenuLocked(), LOCKED_UNTIL_READY, SetupStatus, ready

### Community 53 - "Review Skill"

Cohesion: 0.40
Nodes (4): /bfb-review, Method, Reference, Yang wajib dicek, yang terlewat oleh review generik

### Community 58 - "Planning Skill"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review Practices"

Cohesion: 0.12
Nodes (17): Change Descriptions, Change Sizing, Code Review and Quality, Common Rationalizations, Dead Code Hygiene, Dependency Discipline, Handling Disagreements, Honesty in Review (+9 more)

### Community 61 - "Security Checklist Copy"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 65 - "Spec Skill"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

## Knowledge Gaps

- **524 isolated node(s):** `Doc`, `FakeContext`, `ParsedArgs`, `HiddenInput`, `HiddenOutput` (+519 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 556 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `runBrowserRows()` connect `Browser Row Runner & Audit` to `Interactive Menu & Driver`, `Test-Driven Development Skill`, `Hidden Input Prompt`, `Audit Log Writer & Core`, `Audit Log Plan Tasks`, `Review Skill`, `Human Behavior Emulation`?**
  _High betweenness centrality (0.211) - this node is a cross-community bridge._
- **Why does `Yang wajib dicek, yang terlewat oleh review generik` connect `Review Skill` to `Browser Row Runner & Audit`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `runBrowserRows()` (e.g. with `Task 6: `runBrowserRows` melaporkan setiap baris — selesai` and `Task 8: Docs dan status spec — selesai`) actually correct?**
  _`runBrowserRows()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Doc`, `FakeContext`, `ParsedArgs` to the rest of the system?**
  _524 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Overview & Release` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Package Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
