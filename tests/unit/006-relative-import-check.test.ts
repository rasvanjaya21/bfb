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
});
