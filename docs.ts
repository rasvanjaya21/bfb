import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// Mirrors the official documentation of every stack dependency into docs/, pinned to the exact version bfb uses.
// Versions come from .bumrc (Bun) and bun.lock (packages). Run with `bun run docs` after a version bump.

const OUT = 'docs';
const TODAY = new Date().toISOString().slice(0, 10);

type Page = { title: string; url: string; body: string };
type Doc = { file: string; title: string; version: string; repo: string; tag: string; sparse: string[]; note: string; pages: (dir: string) => Page[] };

function lockVersion(name: string): string {
	const lock = readFileSync('bun.lock', 'utf8');
	const match = lock.match(new RegExp(`"${name.replace('/', '\\/')}": \\["${name.replace('/', '\\/')}@([^"]+)"`));
	if (!match?.[1]) throw new Error(`${name} not found in bun.lock`);
	return match[1];
}

function run(args: string[], cwd?: string): string {
	const result = Bun.spawnSync(args, { cwd, stderr: 'pipe' });
	if (result.exitCode !== 0) throw new Error(`${args.join(' ')}\n${result.stderr.toString()}`);
	return result.stdout.toString().trim();
}

function frontmatter(text: string): { meta: Record<string, string>; body: string } {
	const match = text.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match?.[1]) return { meta: {}, body: text };
	const meta: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const index = line.indexOf(':');
		if (index > 0)
			meta[line.slice(0, index).trim()] = line
				.slice(index + 1)
				.trim()
				.replace(/^["']|["']$/g, '');
	}
	return { meta, body: text.slice(match[0].length) };
}

// Pages whose body starts with its own H1 keep it; otherwise the title becomes the H1.
function page(title: string, url: string, body: string): Page {
	const trimmed = body.trim();
	if (trimmed.startsWith('# ')) {
		const [first, ...rest] = trimmed.split('\n');
		return { title: first!.slice(2), url, body: rest.join('\n').trim() };
	}
	return { title, url, body: trimmed };
}

function bunPages(dir: string): Page[] {
	const root = join(dir, 'docs');
	const navigation = JSON.parse(readFileSync(join(root, 'docs.json'), 'utf8')).navigation;
	const paths: string[] = [];
	const walk = (node: unknown): void => {
		if (typeof node === 'string') paths.push(node);
		else if (Array.isArray(node)) node.forEach(walk);
		else if (node && typeof node === 'object') for (const key of ['tabs', 'groups', 'pages']) walk((node as Record<string, unknown>)[key]);
	};
	walk(navigation);

	const snippets = new Map<string, string>();
	const expand = (body: string): string => {
		const imports = [...body.matchAll(/^import\s+(\w+)\s+from\s+["'](\/snippets\/[^"']+\.mdx?)["'];?\s*$/gm)];
		let result = body.replace(/^import\s+.*?from\s+["'][^"']+["'];?\s*$\n?/gm, '').replace(/^export\s+const\s+.*$\n?/gm, '');
		for (const [, name, path] of imports) {
			if (!snippets.has(path!)) {
				const file = join(root, path!);
				snippets.set(path!, existsSync(file) ? expand(frontmatter(readFileSync(file, 'utf8')).body.trim()) : '');
			}
			result = result.replace(new RegExp(`<${name}\\s*/>`, 'g'), () => snippets.get(path!)!);
		}
		return result;
	};

	return [...new Set(paths)].flatMap((path) => {
		const file = [`${path}.mdx`, `${path}.md`, `${path}/index.mdx`].map((candidate) => join(root, candidate)).find(existsSync);
		if (!file) return [];
		const { meta, body } = frontmatter(readFileSync(file, 'utf8'));
		const description = meta.description ? `${meta.description}\n\n` : '';
		return [page(meta.title ?? path, `https://bun.com/docs${path === '/index' ? '' : path}`, description + expand(body))];
	});
}

function bunupPages(dir: string): Page[] {
	const root = join(dir, 'docs');
	const config = readFileSync(join(root, '.vitepress', 'config.mts'), 'utf8');
	const links = [...config.slice(config.indexOf('sidebar')).matchAll(/link:\s*["'`](\/[^"'`]*)["'`]/g)].map((match) => match[1]!);
	const order = [...new Set(['/', '/docs/scaffold-with-bunup', ...links])];
	return order.flatMap((link) => {
		const file = join(root, link === '/' ? 'index.md' : `${link}.md`);
		if (!existsSync(file)) return [];
		const { meta, body } = frontmatter(readFileSync(file, 'utf8'));
		return [page(meta.title ?? 'Introduction', `https://bunup.dev${link === '/' ? '' : link}`, body.replace(/<script setup>[\s\S]*?<\/script>\n?/g, ''))];
	});
}

function puppeteerPages(dir: string): Page[] {
	const root = join(dir, 'docs');
	const markdown = (sub: string): string[] =>
		readdirSync(join(root, sub))
			.filter((name) => name.endsWith('.md'))
			.sort();
	const guideOrder = [
		'what-is-puppeteer',
		'installation',
		'getting-started',
		'system-requirements',
		'browser-management',
		'page-interactions',
		'javascript-execution',
		'network-interception',
		'cookies',
		'files',
		'screenshots',
		'pdf-generation',
		'headless-modes',
		'screen-configuration',
		'window-management',
		'network-logging',
		'debugging',
		'docker',
		'configuration',
	].map((name) => `${name}.md`);
	const guides = [...guideOrder.filter((name) => existsSync(join(root, 'guides', name))), ...markdown('guides').filter((name) => !guideOrder.includes(name))];
	const indexFirst = (names: string[]): string[] => [...names.filter((name) => name === 'index.md'), ...names.filter((name) => name !== 'index.md')];
	const files = [
		'index.md',
		...guides.map((name) => `guides/${name}`),
		...['examples.md', 'troubleshooting.md', 'faq.md', 'supported-browsers.md', 'webdriver-bidi.md'].filter((name) => existsSync(join(root, name))),
		...indexFirst(markdown('api')).map((name) => `api/${name}`),
		...indexFirst(markdown('browsers-api')).map((name) => `browsers-api/${name}`),
	];
	return files.map((file) => {
		const { meta, body } = frontmatter(readFileSync(join(root, file), 'utf8'));
		const slug = file.replace(/\.md$/, '').replace(/(^|\/)index$/, '');
		return page(meta.title ?? meta.sidebar_label ?? file, `https://pptr.dev/${slug}`, body);
	});
}

function puppeteerExtraPages(stealthDir: string, extraDir: string): Page[] {
	const tree = (tag: string, path: string): string => `https://github.com/berstend/puppeteer-extra/tree/${tag}/${path}`;
	const stealth = join(stealthDir, 'packages', 'puppeteer-extra-plugin-stealth');
	const evasions = readdirSync(join(stealth, 'evasions'))
		.filter((name) => !name.startsWith('_') && existsSync(join(stealth, 'evasions', name, 'readme.md')))
		.sort();
	const read = (file: string): string => readFileSync(file, 'utf8');
	return [
		page('puppeteer-extra', tree(`puppeteer-extra@${lockVersion('puppeteer-extra')}`, 'packages/puppeteer-extra'), read(join(extraDir, 'packages', 'puppeteer-extra', 'readme.md'))),
		page('puppeteer-extra-plugin-stealth', tree(`puppeteer-extra-plugin-stealth@${lockVersion('puppeteer-extra-plugin-stealth')}`, 'packages/puppeteer-extra-plugin-stealth'), read(join(stealth, 'readme.md'))),
		page('Stealth evasions', tree(`puppeteer-extra-plugin-stealth@${lockVersion('puppeteer-extra-plugin-stealth')}`, 'packages/puppeteer-extra-plugin-stealth/evasions'), read(join(stealth, 'evasions', 'readme.md'))),
		...evasions.map((name) => page(`Evasion: ${name}`, tree(`puppeteer-extra-plugin-stealth@${lockVersion('puppeteer-extra-plugin-stealth')}`, `packages/puppeteer-extra-plugin-stealth/evasions/${name}`), read(join(stealth, 'evasions', name, 'readme.md')))),
	];
}

function checkout(repo: string, tag: string, sparse: string[]): { dir: string; commit: string } {
	const dir = mkdtempSync(join(tmpdir(), 'bfb-docs-'));
	run(['git', 'clone', '--quiet', '--depth', '1', '--branch', tag, '--filter=blob:none', '--sparse', `https://github.com/${repo}`, dir]);
	run(['git', 'sparse-checkout', 'set', ...sparse], dir);
	return { dir, commit: run(['git', 'rev-parse', '--short', 'HEAD'], dir) };
}

function write(doc: Doc, sources: string, pages: Page[]): void {
	const header = [
		`# ${doc.title}`,
		'',
		`- Version: **${doc.version}**`,
		`- Source: ${sources}`,
		`- Mirrored: ${TODAY}`,
		'',
		doc.note,
		'',
		'Complete official documentation for this exact version, mirrored for offline use. Not written by hand; regenerate it with `bun run docs` instead of editing it.',
		'',
		'---',
		'',
	].join('\n');
	const body = pages.map((item) => `# ${item.title}\nSource: ${item.url}\n\n${item.body}\n`).join('\n');
	writeFileSync(join(OUT, doc.file), `${header}\n${body}`);
	console.log(`${doc.file}: ${pages.length} pages (${doc.version})`);
}

const bun = readFileSync('.bumrc', 'utf8').trim();
const bunup = lockVersion('bunup');
const puppeteerCore = lockVersion('puppeteer-core');
const browsers = lockVersion('@puppeteer/browsers');
const extra = lockVersion('puppeteer-extra');
const stealth = lockVersion('puppeteer-extra-plugin-stealth');

const docs: Doc[] = [
	{ file: 'bun.md', title: 'Bun documentation', version: `${bun} (\`.bumrc\`)`, repo: 'oven-sh/bun', tag: `bun-v${bun}`, sparse: ['docs'], note: 'Pages follow the navigation order of `docs/docs.json`; shared MDX snippets are inlined where they are used.', pages: bunPages },
	{ file: 'bunup.md', title: 'Bunup documentation', version: bunup, repo: 'bunup/bunup', tag: `v${bunup}`, sparse: ['docs'], note: 'Pages follow the sidebar order of `docs/.vitepress/config.mts`.', pages: bunupPages },
	{
		file: 'puppeteer.md',
		title: 'Puppeteer documentation',
		version: `puppeteer-core ${puppeteerCore}, @puppeteer/browsers ${browsers}`,
		repo: 'puppeteer/puppeteer',
		tag: `puppeteer-core-v${puppeteerCore}`,
		sparse: ['docs'],
		note: `Guides first, then the full \`puppeteer-core\` API reference (\`docs/api\`) and the \`@puppeteer/browsers\` API (\`docs/browsers-api\`). \`CHANGELOG.md\` and \`contributing.md\` are left out. bfb installs \`@puppeteer/browsers\` ${browsers}; check that the tag ships the same version when either is bumped.`,
		pages: puppeteerPages,
	},
];

for (const doc of docs) {
	const { dir, commit } = checkout(doc.repo, doc.tag, doc.sparse);
	try {
		write(doc, `https://github.com/${doc.repo}/tree/${doc.tag}/${doc.sparse.join(', ')} (commit \`${commit}\`)`, doc.pages(dir));
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

// puppeteer-extra and its stealth plugin live in one monorepo but are tagged separately, so each is read from its own tag.
const extraDoc: Doc = {
	file: 'puppeteer-extra.md',
	title: 'puppeteer-extra documentation',
	version: `puppeteer-extra ${extra}, puppeteer-extra-plugin-stealth ${stealth}`,
	repo: 'berstend/puppeteer-extra',
	tag: '',
	sparse: [],
	note: 'The package READMEs are the official documentation: `puppeteer-extra`, then `puppeteer-extra-plugin-stealth` and the README of every evasion it applies.',
	pages: () => [],
};
const extraCheckout = checkout(extraDoc.repo, `puppeteer-extra@${extra}`, ['packages/puppeteer-extra']);
const stealthCheckout = checkout(extraDoc.repo, `puppeteer-extra-plugin-stealth@${stealth}`, ['packages/puppeteer-extra-plugin-stealth']);
try {
	write(extraDoc, `https://github.com/berstend/puppeteer-extra at tags \`puppeteer-extra@${extra}\` (commit \`${extraCheckout.commit}\`) and \`puppeteer-extra-plugin-stealth@${stealth}\` (commit \`${stealthCheckout.commit}\`)`, puppeteerExtraPages(stealthCheckout.dir, extraCheckout.dir));
} finally {
	rmSync(extraCheckout.dir, { recursive: true, force: true });
	rmSync(stealthCheckout.dir, { recursive: true, force: true });
}
