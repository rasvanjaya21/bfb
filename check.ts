import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = '.';

function walk(dir: string, files: string[] = []) {
	const entries = readdirSync(dir);

	for (const entry of entries) {
		const full = join(dir, entry);

		if (statSync(full).isDirectory()) {
			if (['node_modules', '.next', 'dist', 'build'].includes(entry)) continue;
			walk(full, files);
		} else {
			if (/\.(ts|tsx)$/.test(entry)) {
				files.push(full);
			}
		}
	}

	return files;
}

function hasRelativeImport(content: string) {
	const regex = /from\s+['"](\.\/|\.\.\/)/g;
	return regex.test(content);
}

function relativeImportChecker() {
	const files = walk(ROOT);
	const violators: string[] = [];

	files.forEach((file) => {
		const content = readFileSync(file, 'utf8');

		if (hasRelativeImport(content)) {
			violators.push(file);
		}
	});

	console.log('1. relative import checker\n');

	if (!violators.length) {
		console.log('no relative import found.');
	} else {
		console.log(`${violators.length} file(s) have relative import:`);
		violators.forEach((f) => console.log('-', f));
		process.exit(1);
	}
}

relativeImportChecker();
console.log('\ncheck complete.');
