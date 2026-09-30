# bfb

Bot for billy

## Installation

Requires [Bun](https://bun.sh). `bfb` runs on Bun and does not need Node.

```bash
bun add --global @rasvanjaya21/bfb
```

## Usage

```bash
bfb
```

## Agent Tooling

This repository is set up for Claude Code and Antigravity (`agy`). Skills live in `skills/` and MCP servers in `.mcp.json`; each agent reads them through symlinks that are not committed. Create them once after cloning:

```bash
mkdir -p .claude .agents
ln -s ../skills .claude/skills
ln -s ../skills .agents/skills
ln -s ../.mcp.json .agents/mcp_config.json
```

Antigravity does not load project MCP servers yet ([antigravity-cli#60](https://github.com/google-antigravity/antigravity-cli/issues/60)), so register the ones from `.mcp.json` globally as well:

```bash
agy mcp add bun bunx -- --bun mcp-remote https://gitmcp.io/oven-sh/bun
agy mcp add bunup bunx -- --bun mcp-remote https://gitmcp.io/bunup/bunup
agy mcp add puppeteer bunx -- --bun mcp-remote https://gitmcp.io/puppeteer/puppeteer
agy mcp add puppeteer-extra bunx -- --bun mcp-remote https://gitmcp.io/berstend/puppeteer-extra
```

See [AGENTS.md](./AGENTS.md) for how skills, `docs/`, and MCP servers fit together.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
