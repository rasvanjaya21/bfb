# Contributing to bfb

Thank you for your interest in contributing to our project! This guide will help you get started with the development process.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) 1.4.2 or newer (see `.bumrc`). Node is not needed; `bunfig.toml` runs every script on Bun.

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/rasvanjaya21/bfb.git`
3. Navigate to the project directory: `cd bfb`
4. Install dependencies: `bun install` (also installs the pre-commit hook from `.githooks/`)
5. Start development: `bun run dev`

## Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Check code style and formatting: `bun run lint` and `bun run format`
4. Check types and imports: `bun run type-check` and `bun run check` (imports must use the `@/` alias)
5. Run tests: `bun run test:coverage` (every file a test imports must stay at 100% line and function coverage, as in CI; tests live in `tests/unit`, `tests/integration`, and `tests/endpoint`, named `NNN-name.test.ts`)
6. Build the project: `bun run build`
7. Commit your changes using the conventions below
8. Push your branch to your fork
9. Open a pull request

## Commit Message Conventions

We follow [Conventional Commits](https://conventionalcommits.org/) in the form `type(scope): description`: lowercase, imperative, no trailing period, one line. Scopes follow the area you touched (`lib`, `core`, `command`, `package`, `config`, `test`, ...); see `AGENTS.md` for the full list.

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependencies, etc.

## Pull Request Guidelines

1. Update documentation if needed
2. Ensure all tests pass
3. Address any feedback from code reviews
4. Once approved, your PR will be merged

## Code of Conduct

Please be respectful and constructive in all interactions within our community.

## Questions?

If you have any questions, please [open an issue](https://github.com/rasvanjaya21/bfb/issues/new) for discussion.

Thank you for contributing to bfb!
