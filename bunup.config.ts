import { defineConfig } from 'bunup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	target: 'bun',
	clean: true,
	splitting: false,
	dts: false,
	sourcemap: false,
	minify: true,
	banner: '#!/usr/bin/env bun',
	external: ['puppeteer-core', 'chalk', '@puppeteer/browsers', 'puppeteer-extra', 'puppeteer-extra-plugin-stealth'],
});
