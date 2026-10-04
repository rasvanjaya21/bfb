import { facebookSelector, type FacebookSelectorName } from '@/libs/facebook-selectors';
import { describe, expect, test } from 'bun:test';

describe('facebookSelector', () => {
	const allNames: FacebookSelectorName[] = ['captionTrigger', 'createPost', 'nextPost', 'postPreview', 'publishPost', 'loginContinue', 'loginFresh', 'forgottenPassword'];

	test('returns valid xpath selector prefix for all supported keys', () => {
		for (const name of allNames) {
			const selector = facebookSelector(name);
			expect(selector.startsWith('xpath=')).toBe(true);
			expect(selector.length).toBeGreaterThan(10);
		}
	});

	test('captionTrigger includes English and Indonesian phrases', () => {
		const selector = facebookSelector('captionTrigger');
		expect(selector).toContain("What's on your mind");
		expect(selector).toContain('Apa yang Anda pikirkan');
	});

	test('createPost includes English and Indonesian phrases', () => {
		const selector = facebookSelector('createPost');
		expect(selector).toContain('Add to your post');
		expect(selector).toContain('Tambahkan ke postingan');
	});

	test('nextPost includes English and Indonesian phrases', () => {
		const selector = facebookSelector('nextPost');
		expect(selector).toContain('Next');
		expect(selector).toContain('Berikutnya');
	});

	test('postPreview includes English and Indonesian phrases', () => {
		const selector = facebookSelector('postPreview');
		expect(selector).toContain('Post preview');
		expect(selector).toContain('Pratinjau postingan');
	});

	test('publishPost includes English and Indonesian phrases and aria-disabled check', () => {
		const selector = facebookSelector('publishPost');
		expect(selector).toContain('Post');
		expect(selector).toContain('Posting');
		expect(selector).toContain('Kirim');
		expect(selector).toContain('not(@aria-disabled="true")');
	});

	test('loginContinue includes English and Indonesian phrases and targets clickable elements', () => {
		const selector = facebookSelector('loginContinue');
		expect(selector).toContain('Continue');
		expect(selector).toContain('Lanjutkan');
		expect(selector).toContain('role="button"');
	});

	test('loginFresh includes English and Indonesian phrases', () => {
		const selector = facebookSelector('loginFresh');
		expect(selector).toContain('Log in to Facebook');
		expect(selector).toContain('Masuk ke Facebook');
	});

	test('forgottenPassword includes English and Indonesian phrases', () => {
		const selector = facebookSelector('forgottenPassword');
		expect(selector).toContain('Forgotten password?');
		expect(selector).toContain('Lupa kata sandi?');
	});
});
