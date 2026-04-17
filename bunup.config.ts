import { defineConfig } from 'bunup';

export default defineConfig({
	entry: ['src/index.ts', 'src/ignore/index.ts'],
	format: ['esm'],
	target: 'node',
	clean: true,
	dts: false,
	sourcemap: false,
	minify: true,
	banner: '#!/usr/bin/env node',
	external: ['puppeteer-core', 'chalk', '@puppeteer/browsers', './src/ignore'],
});
