# Graph Report - bfb (2026-09-30)

## Corpus Check

- 75 files · ~50,301 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 763 nodes · 898 edges · 46 communities (40 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `015c257e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- menu.ts
- TODO Audit 2026-09-30
- compilerOptions
- scripts
- devDependencies
- Test-Driven Development
- .prettierrc.json
- dependencies
- .mcp.json
- Performance Checklist
- Performance Checklist
- cookie.ts
- Shipping and Launch
- check.ts
- Bug Report Issue Template
- clean.ts
- Feature Request Issue Template
- Question Issue Template
- Spec: bfb (Bot for billy) — as-built
- Security Checklist
- docs.ts
- /bfb-prepare
- Accessibility Checklist
- pre-commit
- Implementation Plan: bfb — menutup spec as-built
- Review: seluruh perubahan sejak `f05d14a` (v0.4.0)
- src/index.ts
- Test coverage
- Fase 1 — selesai
- package.json
- Prepare
- Ship Decision: **NO-GO**
- content-status.ts
- keywords
- Commit log
- hide-question.ts
- files
- repository
- Incremental Implementation
- Canonical types
- Planning and Task Breakdown
- Code Review and Quality
- Security Checklist
- Spec-Driven Development
- Testing Patterns Reference (JavaScript/TypeScript)

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 25 edges
2. `Code Review and Quality` - 19 edges
3. `scripts` - 16 edges
4. `Security Checklist` - 15 edges
5. `Security Checklist` - 15 edges
6. `Test-Driven Development` - 15 edges
7. `menu()` - 13 edges
8. `Spec: bfb (Bot for billy) — as-built` - 13 edges
9. `Shipping and Launch` - 13 edges
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

- **core/\* Missing finally-cleanup Failure Cluster** — todo_wrong_account_posting, todo_false_success_post, todo_process_exit_in_core, todo_finally_cleanup_fix [EXTRACTED 1.00]
- **Menu Setup Gates (init, driver, activation)** — agents_runtime_flow, agents_csv_data_files, agents_driver_version, agents_activation_check [EXTRACTED 1.00]
- **GitHub Contribution Intake Templates** — \_github_issue_template_bug_report_bug_report, \_github_issue_template_feature_request_feature_request, \_github_issue_template_question_question, \_github_pull_request_template_pull_request_template [INFERRED 0.85]

## Communities (46 total, 5 thin omitted)

### Community 0 - "menu.ts"

Cohesion: 0.07
Nodes (31): menu(), cookies(), facebook(), postFeed(), activateBfb(), showResult(), applyDelay(), checkActivation() (+23 more)

### Community 1 - "TODO Audit 2026-09-30"

Cohesion: 0.07
Nodes (39): Pull Request Template, CI Workflow (build, type-check, lint, test on ubuntu/macos/windows), changelogithub, Release Workflow (tag v\* -> npm + GitHub Packages), Token Activation Check (bfb.blackfriday.my.id API), @/ Alias Import Rule (no relative imports, enforced by check.ts), bfb CLI (@rasvanjaya21/bfb), Bun Toolchain (bunup, tsgo, oxlint, prettier, bun test) (+31 more)

### Community 2 - "compilerOptions"

Cohesion: 0.05
Nodes (36): bunup.config.ts, DOM, ES2022, node_modules, src/**/\*, tests/**/_, _.ts, compilerOptions (+28 more)

### Community 3 - "scripts"

Cohesion: 0.12
Nodes (16): scripts, auto, build, check, clean, dev, docs, format (+8 more)

### Community 4 - "devDependencies"

Cohesion: 0.11
Nodes (19): bumpp, bunup, javascript-obfuscator, json-server, oxlint, devDependencies, bumpp, bunup (+11 more)

### Community 5 - "Test-Driven Development"

Cohesion: 0.07
Nodes (29): Browser Testing with DevTools, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First, Name Tests Descriptively, One Assertion Per Concept, Overview (+21 more)

### Community 6 - ".prettierrc.json"

Cohesion: 0.15
Nodes (12): bracketSameLine, bracketSpacing, jsxSingleQuote, plugins, printWidth, quoteProps, semi, singleQuote (+4 more)

### Community 7 - "dependencies"

Cohesion: 0.18
Nodes (11): chalk, dependencies, chalk, @puppeteer/browsers, puppeteer-core, puppeteer-extra, puppeteer-extra-plugin-stealth, @puppeteer/browsers (+3 more)

### Community 8 - ".mcp.json"

Cohesion: 0.57
Nodes (6): bunx, bun, bunup, puppeteer, puppeteer-extra, mcp-remote

### Community 9 - "Performance Checklist"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 10 - "Performance Checklist"

Cohesion: 0.08
Nodes (26): API, Backend Checklist, Cache checklist, Caching Strategies, Common Anti-Patterns, Connection pooling, Core Web Vitals Targets, CSS (+18 more)

### Community 11 - "cookie.ts"

Cohesion: 0.21
Nodes (13): syncCookies(), Cell, csvToJson(), emptyCell(), parseRows(), isReservedKey(), RESERVED_KEYS, parseCookieStore() (+5 more)

### Community 12 - "Shipping and Launch"

Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 13 - "check.ts"

Cohesion: 0.36
Nodes (6): hasRelativeImport(), relativeImportChecker(), ROOTS, transpiler, walk(), ./e

### Community 19 - "Spec: bfb (Bot for billy) — as-built"

Cohesion: 0.11
Nodes (18): Aktivasi (menu 97), Asumsi, Boundaries, Code Style, Commands, Data di folder kerja, Fitur dan acceptance criteria, Menu dan status (+10 more)

### Community 20 - "Security Checklist"

Cohesion: 0.12
Nodes (17): AI / LLM Security, Authentication, Authorization, CORS Configuration, Data Protection, Dependency Security, Destructive Path Operations, Error Handling (+9 more)

### Community 21 - "docs.ts"

Cohesion: 0.11
Nodes (21): browsers, bun, bunPages(), bunup, bunupPages(), checkout(), Doc, docs (+13 more)

### Community 22 - "/bfb-prepare"

Cohesion: 0.17
Nodes (11): 10. Ringkasan, 1. TODO.md, 2. Selaraskan memory Claude dan Antigravity, 3. Hapus yang usang, 4. Hapus sisa debug, 5. Update docs, 6. Update skills, 7. Update pengetahuan kamu (+3 more)

### Community 23 - "Accessibility Checklist"

Cohesion: 0.12
Nodes (16): Accessibility Checklist, Accessible Lists, ARIA Roles, Buttons vs. Links, Common Anti-Patterns, Common HTML Patterns, Content, Essential Checks (+8 more)

### Community 25 - "Implementation Plan: bfb — menutup spec as-built"

Cohesion: 0.17
Nodes (11): Architecture Decisions, Checkpoint: Fase 1, Dependency graph, Fase 1: Test untuk acceptance criteria yang tersisa (bisa dikerjakan sekarang), Fase 2: Butuh keputusan user (jangan dikerjakan sebelum dijawab), Fase 3: Butuh akses di luar lokal, Implementation Plan: bfb — menutup spec as-built, Open Questions (+3 more)

### Community 26 - "Review: seluruh perubahan sejak `f05d14a` (v0.4.0)"

Cohesion: 0.17
Nodes (11): Checklist bfb (mekanis), Critical, Ditemukan saat verifikasi review, Important, Nit, Review: seluruh perubahan sejak `f05d14a` (v0.4.0), Suggestion, Temuan dan penyelesaian (+3 more)

### Community 27 - "src/index.ts"

Cohesion: 0.27
Nodes (7): showHelp(), showVersion(), index(), HELP_ARGS, parseArgs(), ParsedArgs, VERSION_ARGS

### Community 28 - "Test coverage"

Cohesion: 0.20
Nodes (9): Apa yang dibuktikan setiap suite, Belum dites otomatis sama sekali, Bukti bahwa test benar-benar menjaga perilaku, Coverage (`bun test --coverage`), Placeholder, Putaran kedua (setelah `/bfb-review`), Saran berikutnya, Struktur (+1 more)

### Community 29 - "Fase 1 — selesai"

Cohesion: 0.22
Nodes (8): Build log, Checkpoint Fase 1, Ditunda, Fase 1 — selesai, Noticed but not touching, Task 1: Parsing argumen CLI bisa dites, Task 2: Aturan kunci menu bisa dites, Task 3: Penyimpanan token aktivasi dites

### Community 30 - "package.json"

Cohesion: 0.14
Nodes (13): bin, bfb, bugs, url, description, exports, ./package.json, homepage (+5 more)

### Community 31 - "Prepare"

Cohesion: 0.20
Nodes (9): 1. TODO.md, 2. Memory Claude ↔ Antigravity, 3–4. Usang dan sisa debug, 5–6. Docs dan skills, 7. Pengetahuan, 8. Formatter, linter, test, build, 9. Graphify, Berikutnya (+1 more)

### Community 32 - "Ship Decision: **NO-GO**"

Cohesion: 0.22
Nodes (8): Acknowledged risks (boleh ikut rilis), Blockers (wajib diperbaiki sebelum rilis), Checklist bfb, Recommended fixes (sebaiknya sebelum rilis), Rollback plan, Ship Decision: **NO-GO**, Ship decision: v0.5.0 (commits `f05d14a..015c257`), Specialist reports

### Community 33 - "content-status.ts"

Cohesion: 0.33
Nodes (5): ContentStatus, ROUTES, TYPES, Account, Content

### Community 34 - "keywords"

Cohesion: 0.29
Nodes (6): bun, keywords, automation, bunup, puppeteer, typescript

### Community 35 - "Commit log"

Cohesion: 0.33
Nodes (5): Commit, Commit log, Pengelompokan, Pre-commit hook, Sengaja tidak di-commit

### Community 36 - "hide-question.ts"

Cohesion: 0.40
Nodes (3): HiddenInput, HiddenOutput, hideQuestion()

### Community 37 - "files"

Cohesion: 0.50
Nodes (4): files, dist, LICENSE, README.md

### Community 38 - "repository"

Cohesion: 0.67
Nodes (3): repository, type, url

### Community 45 - "Incremental Implementation"

Cohesion: 0.05
Nodes (38): Aturan bfb yang mengalahkan saran generik, /bfb-build, Common Rationalizations, Contract-First Slicing, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation (+30 more)

### Community 47 - "Canonical types"

Cohesion: 0.07
Nodes (28): Ad-hoc types (one-offs, not to be reproduced), Aturan pesan, Backend / data, /bfb-commit, Canonical types, `chore` — 276 uses (16%), Commit Message Conventions — rasvanjaya21, Core shape (+20 more)

### Community 58 - "Planning and Task Breakdown"

Cohesion: 0.06
Nodes (31): /bfb-plan, Common Rationalizations, Correctness, Definition of Done, Definition of Done vs. Acceptance Criteria, Documentation, How to Apply, Integration (+23 more)

### Community 59 - "Code Review and Quality"

Cohesion: 0.06
Nodes (33): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, /bfb-review, Change Descriptions, Change Sizing (+25 more)

### Community 61 - "Security Checklist"

Cohesion: 0.06
Nodes (34): AI / LLM Security, Authentication, Authorization, /bfb-ship, Correctness, CORS Configuration, Data Protection, Definition of Done (+26 more)

### Community 65 - "Spec-Driven Development"

Cohesion: 0.12
Nodes (15): /bfb-spec, Common Rationalizations, Keeping the Spec Alive, Method, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan (+7 more)

### Community 66 - "Testing Patterns Reference (JavaScript/TypeScript)"

Cohesion: 0.11
Nodes (17): API / Integration Testing, /bfb-test, Common Assertions, E2E Testing (Playwright), Method, Mock at Boundaries Only, Mock Functions, Mock Modules (+9 more)

## Knowledge Gaps

- **472 isolated node(s):** `useTabs`, `semi`, `singleQuote`, `jsxSingleQuote`, `quoteProps` (+467 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 502 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `Reference` connect `Security Checklist` to `Performance Checklist`, `Accessibility Checklist`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Performance Checklist` connect `Performance Checklist` to `Security Checklist`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `Shipping and Launch` connect `Shipping and Launch` to `Security Checklist`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `useTabs`, `semi`, `singleQuote` to the rest of the system?**
  _472 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `menu.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06775956284153005 - nodes in this community are weakly interconnected._
- **Should `TODO Audit 2026-09-30` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
