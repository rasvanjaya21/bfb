import { ensurePasswordFocus } from '@/libs/ensure-password-focus';
import { describe, expect, test } from 'bun:test';
import type { Page } from 'puppeteer-core';

const pageWithFocus = (focused: boolean) => {
	const queries: string[] = [];
	const page = {
		$: async (selector: string) => {
			queries.push(selector);
			return focused ? {} : null;
		},
	} as unknown as Page;
	return { page, queries };
};

describe('ensurePasswordFocus', () => {
	test('passes when the focused element is a password field', async () => {
		const { page, queries } = pageWithFocus(true);
		await ensurePasswordFocus(page);
		expect(queries).toEqual(['input[type="password"]:focus']);
	});

	test('stops the row when focus is anywhere else, so the password is never typed into another field', async () => {
		const { page } = pageWithFocus(false);
		await expect(ensurePasswordFocus(page)).rejects.toThrow('Kolom password tidak ditemukan');
	});
});
