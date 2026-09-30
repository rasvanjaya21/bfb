# Graph Report - bfb (2026-09-30)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 770 nodes · 904 edges · 45 communities (39 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.87)
- Token cost: 39,724 input · 557 output

## Graph Freshness

- Built from commit: `6092395b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- Facebook Automation Menu Flow
- Project Overview and Conventions
- TypeScript Compiler Config
- Package Scripts
- Dev Dependencies
- Test Skill Method
- Prettier Config
- Runtime Dependencies
- MCP Server Config
- Performance Checklist
- Performance Checklist Reference
- CSV and Cookie Parsing
- Shipping and Launch Checklist
- Relative Import Checker
- Issue Templates and Stale Workflow
- Clean Script
- Feature Request Template
- Question Issue Template
- As-Built Spec
- Review Skill Security
- Offline Docs Generator
- Prepare Skill Steps
- Ship Skill Accessibility
- Pre-commit Hook
- Implementation Plan
- Code Review Report
- CLI Argument Parsing
- Test Report
- Build Log
- Package Metadata
- Prepare Report
- Ship Decision Report
- Hidden Input Prompt
- Bunup Config and Keywords
- Commit Log
- Published Package Files
- Repository Metadata
- Dependency Security Overrides
- Build Skill Method
- Commit Message Conventions
- Plan Skill Method
- Code Review Quality Axes
- Security Checklist Reference
- Spec Skill Method

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 25 edges
2. `Code Review and Quality` - 19 edges
3. `scripts` - 16 edges
4. `Security Checklist` - 15 edges
5. `Test-Driven Development` - 15 edges
6. `Security Checklist` - 15 edges
7. `menu()` - 13 edges
8. `Shipping and Launch` - 13 edges
9. `Spec: bfb (Bot for billy) — as-built` - 13 edges
10. `TODO Audit 2026-09-30` - 13 edges

## Surprising Connections (you probably didn't know these)

- `Conventional Commits` --semantically_similar_to--> `Repo Commit Convention type(scope): description` [INFERRED] [semantically similar]
  CONTRIBUTING.md → AGENTS.md
- `parse()` --calls--> `csvToJson()` [EXTRACTED]
  tests/integration/001-csv-parser.test.ts → src/libs/csv-parser.ts
- `Token Activation Check (bfb.blackfriday.my.id API)` --references--> `High: Activation Check Can Hang (no timeout)` [INFERRED]
  AGENTS.md → TODO.md
- `bfb CLI (@rasvanjaya21/bfb)` --conceptually_related_to--> `bfb README (Bot for billy)` [INFERRED]
  AGENTS.md → README.md
- `Credentials (cookies.json, token.bfb)` --references--> `High: Plaintext Credentials with Default Permissions` [INFERRED]
  AGENTS.md → TODO.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- _*core/* Missing finally-cleanup Failure Cluster_* — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — _github_issue_template_bug_report_bug_report, _github_issue_template_feature_request_feature_request, _github_issue_template_question_question, _github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (45 total, 5 thin omitted)

### Community 0 - "Facebook Automation Menu Flow"

Cohesion: 0.06
Nodes (37): menu(), cookies(), syncCookies(), facebook(), postFeed(), activateBfb(), showResult(), applyDelay() (+29 more)

### Community 1 - "Project Overview and Conventions"

Cohesion: 0.07
Nodes (39): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), @/ Alias Import Rule (no relative imports, enforced by check.ts), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test) (+31 more)

### Community 2 - "TypeScript Compiler Config"

Cohesion: 0.05
Nodes (36): bunup.config.ts, DOM, ES2022, node_modules, src/**/\*, tests/**/*, *.ts, compilerOptions (+28 more)

### Community 3 - "Package Scripts"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "Dev Dependencies"

Cohesion: 0.11
Nodes (19): bumpp, bunup, javascript-obfuscator, json-server, oxlint, devDependencies, bumpp, bunup (+11 more)

### Community 5 - "Test Skill Method"

Cohesion: 0.04
Nodes (46): API / Integration Testing, /bfb-test, Browser Testing with DevTools, Common Assertions, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First (+38 more)

### Community 6 - "Prettier Config"

Cohesion: 0.15
Nodes (12): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+4 more)

### Community 7 - "Runtime Dependencies"

Cohesion: 0.18
Nodes (11): chalk, dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth, @puppeteer/browsers (+3 more)

### Community 8 - "MCP Server Config"

Cohesion: 0.53
Nodes (5): bunx, bun, bunup, puppeteer, puppeteer-extra

### Community 9 - "Performance Checklist"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 10 - "Performance Checklist Reference"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "CSV and Cookie Parsing"

Cohesion: 0.21
Nodes (12): Cell, csvToJson(), emptyCell(), parseRows(), isReservedKey(), RESERVED_KEYS, parseCookieStore(), readCookies() (+4 more)

### Community 12 - "Shipping and Launch Checklist"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 13 - "Relative Import Checker"

Cohesion: 0.36
Nodes (6): hasRelativeImport(), relativeImportChecker(), ROOTS, transpiler, walk(), ./e

### Community 19 - "As-Built Spec"

Cohesion: 0.11
Nodes (18): Aktivasi (menu 97), Asumsi, Boundaries, Code Style, Commands, Data di folder kerja, Fitur dan acceptance criteria, Menu dan status (+10 more)

### Community 20 - "Review Skill Security"

Cohesion: 0.09
Nodes (21): AI / LLM Security, Authentication, Authorization, /bfb-review, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations (+13 more)

### Community 21 - "Offline Docs Generator"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "Prepare Skill Steps"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Ship Skill Accessibility"

Cohesion: 0.06
Nodes (33): Accessibility Checklist, Accessible Lists, ARIA Roles, /bfb-ship, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Content (+25 more)

### Community 25 - "Implementation Plan"

Cohesion: 0.17
Nodes (11): Architecture Decisions, Checkpoint: Fase 1, Dependency graph, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang), Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab), Fase 3: Butuh akses di luar lokal, Implementation Plan: bfb — menutup spec as-built, Open Questions (+3 more)

### Community 26 - "Code Review Report"

Cohesion: 0.17
Nodes (11): Checklist bfb (mekanis), Critical, Ditemukan saat verifikasi review, Important, Nit, Review: seluruh perubahan sejak `f05d14a` (v0.4.0), Suggestion, Temuan dan penyelesaian (+3 more)

### Community 27 - "CLI Argument Parsing"

Cohesion: 0.27
Nodes (7): showHelp(), showVersion(), index(), HELP_ARGS, parseArgs(), ParsedArgs, VERSION_ARGS

### Community 28 - "Test Report"

Cohesion: 0.20
Nodes (9): Apa yang dibuktikan setiap suite, Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun run test:coverage`), Placeholder, Putaran kedua (setelah `/bfb-review`), Saran berikutnya, Struktur (+1 more)

### Community 29 - "Build Log"

Cohesion: 0.22
Nodes (8): Build log, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Parsing argumen CLI bisa dites, Task 2: Aturan kunci menu bisa dites, Task 3: Penyimpanan token aktivasi dites

### Community 30 - "Package Metadata"

Cohesion: 0.12
Nodes (15): bin, bfb, bugs, url, description, engines, bun, exports (+7 more)

### Community 31 - "Prepare Report"

Cohesion: 0.25
Nodes (7): 1. TODO.md, 2. Memory Claude dan Antigravity, 3–4. Usang dan sisa debug, 5–7. Docs, skills, pengetahuan, 8. Formatter, linter, test, build, 9. Graphify, Prepare

### Community 32 - "Ship Decision Report"

Cohesion: 0.22
Nodes (8): Acknowledged risks (boleh ikut rilis), Blockers (wajib diperbaiki sebelum rilis), Checklist bfb, Recommended fixes (sebaiknya sebelum rilis), Rollback plan, Ship Decision: **NO-GO**, Ship decision: v0.5.0 (commits `f05d14a..015c257`), Specialist reports

### Community 33 - "Hidden Input Prompt"

Cohesion: 0.40
Nodes (3): HiddenInput, HiddenOutput, hideQuestion()

### Community 34 - "Bunup Config and Keywords"

Cohesion: 0.29
Nodes (6): bun, keywords, automation, bunup, puppeteer, typescript

### Community 35 - "Commit Log"

Cohesion: 0.33
Nodes (5): Commit, Commit log, Pengelompokan, Pre-commit hook, Sengaja tidak di-commit

### Community 37 - "Published Package Files"

Cohesion: 0.50
Nodes (4): files, dist, LICENSE, README.md

### Community 38 - "Repository Metadata"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 40 - "Dependency Security Overrides"

Cohesion: 0.40
Nodes (5): overrides, basic-ftp, brace-expansion, ip-address, ws

### Community 45 - "Build Skill Method"

Cohesion: 0.05
Nodes (38): Aturan bfb yang mengalahkan saran generik, /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+30 more)

### Community 47 - "Commit Message Conventions"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 58 - "Plan Skill Method"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review Quality Axes"

Cohesion: 0.07
Nodes (29): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, Change Descriptions, Change Sizing, Code Review and Quality (+21 more)

### Community 61 - "Security Checklist Reference"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 65 - "Spec Skill Method"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

## Knowledge Gaps

- **475 isolated node(s):** `SetupStatus`, `ActivationResult`, `RowsResult`, `FakeContext`, `Cell` (+470 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 506 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `Reference` connect `Ship Skill Accessibility` to `Performance Checklist Reference`, `Security Checklist Reference`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Performance Checklist` connect `Performance Checklist Reference` to `Ship Skill Accessibility`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `Shipping and Launch` connect `Shipping and Launch Checklist` to `Ship Skill Accessibility`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `SetupStatus`, `ActivationResult`, `RowsResult` to the rest of the system?**
  _475 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Facebook Automation Menu Flow` be split into smaller, more focused modules?**
  _Cohesion score 0.05765765765765766 - nodes in this community are weakly interconnected._
- **Should `Project Overview and Conventions` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
