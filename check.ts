import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

// Only first-party code is checked: src/, tests/ and the scripts at the repo root.
const ROOTS = ['src', 'tests'];

function walk(dir: string, files: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, files);
		else if (/\.(ts|tsx)$/.test(entry)) files.push(full);
	}
	return files;
}

// .ts files are parsed as TypeScript and .tsx as TSX: under the TSX loader a generic arrow such as <T>(x: T) => x
// reads as a JSX tag and the whole file fails to parse.
const transpilers = { ts: new Bun.Transpiler({ loader: 'ts' }), tsx: new Bun.Transpiler({ loader: 'tsx' }) };

// Type-only imports are erased before Bun scans, so static import/export statements are also matched at the start of a line.
const STATIC_RELATIVE_IMPORT = /^\s*(?:import|export)\b[^'"`;]*?\bfrom\s*['"]\.{1,2}(?:\/|['"])/m;

// Bun parses the real imports (static, side-effect, dynamic, require), so text in comments and strings is ignored.
function hasRelativeImport(content: string, loader: 'ts' | 'tsx' = 'ts'): boolean {
	return transpilers[loader].scanImports(content).some(({ path }) => path === '.' || path === '..' || path.startsWith('./') || path.startsWith('../')) || STATIC_RELATIVE_IMPORT.test(content);
}

function relativeImportChecker(): void {
	const rootScripts = readdirSync('.').filter((entry) => /\.(ts|tsx)$/.test(entry) && statSync(entry).isFile());
	const files = [...rootScripts, ...ROOTS.filter((dir) => existsSync(dir)).flatMap((dir) => walk(dir))];
	const violators = files.filter((file) => hasRelativeImport(readFileSync(file, 'utf8'), file.endsWith('.tsx') ? 'tsx' : 'ts'));

	console.log('1. relative import checker\n');

	if (!violators.length) {
		console.log('no relative import found.');
	} else {
		console.log(`${violators.length} file(s) have relative import:`);
		violators.forEach((f) => console.log('-', f));
		process.exit(1);
	}
}

if (import.meta.main) {
	relativeImportChecker();
	console.log('\ncheck complete.');
}

export { hasRelativeImport };
