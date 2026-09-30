import { hasRelativeImport } from '@/../check';
import { describe, expect, test } from 'bun:test';

describe('hasRelativeImport', () => {
	test('flags every relative import form', () => {
		for (const source of [
			`import a from './a';`,
			`import { b } from "../b";`,
			`export * from './c';`,
			`export { d } from '../d';`,
			`import './side-effect';`,
			`const e = await import('./e');`,
			`const f = require('../f');`,
			`import g from '.';`,
			`import h from '..';`,
			`import type { T } from './types';`,
			`import { type U } from './u';`,
			`import {\n\ta,\n\tb,\n} from './multi';`,
		]) {
			expect(hasRelativeImport(source)).toBe(true);
		}
	});

	test('allows alias and package imports', () => {
		for (const source of [`import { a } from '@/libs/a';`, `import chalk from 'chalk';`, `import fs from 'fs/promises';`, `const x = './not-an-import';`, `console.log('from ./here');`, `// import x from './comment';`, `const s = "import y from './string'";`]) {
			expect(hasRelativeImport(source)).toBe(false);
		}
	});

	test('parses generic arrow functions in .ts files, which TSX would read as JSX', () => {
		const source = `import { a } from '@/libs/a';\nconst run = async <T>(task: () => Promise<T>): Promise<T> => task();`;
		expect(hasRelativeImport(source)).toBe(false);
		expect(hasRelativeImport(`${source}\nimport b from './b';`)).toBe(true);
	});

	test('parses JSX when the file is .tsx', () => {
		const source = `import { a } from '@/libs/a';\nconst view = <div>{a}</div>;`;
		expect(hasRelativeImport(source, 'tsx')).toBe(false);
		expect(hasRelativeImport(`${source}\nimport b from '../b';`, 'tsx')).toBe(true);
	});
});
