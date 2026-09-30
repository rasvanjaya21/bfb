# bfb

Bot for billy

## Installation

Requires [Bun](https://bun.sh) 1.4.2 or newer (`engines.bun` in `package.json`). `bfb` runs on Bun and does not need Node; since 0.5.0 the `bfb` binary starts with `#!/usr/bin/env bun`, so `bun` must be on your `PATH`.

`bfb` keeps account passwords, session cookies, and its activation token in `datas/` and `credentials/` inside the folder you run it from. On Linux and macOS these are created readable by your user only (folders `0700`, files `0600`). Windows ignores those modes, so keep that folder somewhere only you can open.

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
agy mcp add bun bunx -- --bun mcp-remote@0.14.3 https://gitmcp.io/oven-sh/bun
agy mcp add bunup bunx -- --bun mcp-remote@0.14.3 https://gitmcp.io/bunup/bunup
agy mcp add puppeteer bunx -- --bun mcp-remote@0.14.3 https://gitmcp.io/puppeteer/puppeteer
agy mcp add puppeteer-extra bunx -- --bun mcp-remote@0.14.3 https://gitmcp.io/berstend/puppeteer-extra
```

See [AGENTS.md](./AGENTS.md) for how skills, `docs/`, and MCP servers fit together.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
