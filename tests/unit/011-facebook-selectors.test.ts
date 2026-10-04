import { composerCaptionSelector, facebookSelector, feedCaptionSelector, type FacebookSelectorName } from '@/libs/facebook-selectors';
import { describe, expect, test } from 'bun:test';

describe('facebookSelector', () => {
	const allNames: FacebookSelectorName[] = ['captionTrigger', 'createPost', 'nextPost', 'postPreview', 'publishPost', 'boostPostOn', 'dismissPopup', 'composerTextbox', 'consentToggleOff', 'consentAgree', 'consentDone', 'loggedOutForm', 'loginContinue', 'loginFresh', 'forgottenPassword'];

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
		expect(selector).toContain('@aria-label');
		expect(selector).toContain('not(@aria-disabled="true")');
		// contains() on these short words once clicked the "Promosikan postingan" toggle.
		expect(selector).not.toMatch(/contains\((text\(\)|\.|@aria-label), "(Post|Posting|Kirim)"\)/);
	});

	test('boostPostOn targets only a switched-on boost toggle, in English and Indonesian', () => {
		const selector = facebookSelector('boostPostOn');
		expect(selector).toContain('Boost post');
		expect(selector).toContain('Promosikan postingan');
		expect(selector).toContain('@role="switch" and @aria-checked="true"');
	});

	test('dismissPopup targets the acknowledge button of Facebook announcement popups', () => {
		const selector = facebookSelector('dismissPopup');
		expect(selector).toContain('Saya memahaminya');
		expect(selector).toContain('Got it');
		expect(selector).toContain('role="button"');
	});

	test('dismissPopup clicks Oke only inside the "Pembaruan Reels" panel', () => {
		expect(facebookSelector('dismissPopup')).toContain('//div[@role="dialog" and .//div[@role="dialog" and (@aria-label="Pembaruan Reels" or @aria-label="Reels update")]]//div[@role="button" and (@aria-label="Oke" or @aria-label="OK")]');
		expect(facebookSelector('dismissPopup').match(/@aria-label="Oke"/g)).toHaveLength(1);
	});
	test('dismissPopup closes the "Akun Meta Anda sudah siap" announcement through its Tutup button, and only there', () => {
		const selector = facebookSelector('dismissPopup');
		expect(selector).toContain('//div[@role="dialog" and .//*[text()="Akun Meta Anda sudah siap" or text()="Your Meta account is ready"]]//div[@role="button" and (@aria-label="Tutup" or @aria-label="Close")]');
	});

	test('composerTextbox targets the editable textbox inside the composer dialog', () => {
		const selector = facebookSelector('composerTextbox');
		expect(selector).toContain('role="dialog"');
		expect(selector).toContain('@contenteditable="true"');
	});

	test('consentToggleOff targets every consent switch that is still off, since all items are mandatory', () => {
		const selector = facebookSelector('consentToggleOff');
		expect(selector).toBe('xpath=//input[@role="switch" and @aria-checked="false"]');
	});

	test('consentAgree targets the enabled agree button in English and Indonesian', () => {
		const selector = facebookSelector('consentAgree');
		expect(selector).toContain('Saya setuju');
		expect(selector).toContain('I agree');
		expect(selector).toContain('not(@aria-disabled="true")');
	});

	test('consentDone targets the Tutup button only on the "Anda sudah siap!" screen', () => {
		expect(facebookSelector('consentDone')).toBe(`xpath=//div[@role="main" and .//*[text()="Anda sudah siap!" or text()="You're all set!"]]//div[@role="button" and (@aria-label="Tutup" or @aria-label="Close")]`);
	});

	test('dismissPopup does not click "I understand", which has not been observed and may acknowledge an account restriction', () => {
		expect(facebookSelector('dismissPopup')).not.toContain('I understand');
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

	describe('composerCaptionSelector', () => {
		test('matches the start of the caption inside the composer textbox', () => {
			expect(composerCaptionSelector('Enakan di atas atau di bawah? Di atas sajadah.')).toBe('xpath=//div[@role="dialog"]//div[@role="textbox" and contains(normalize-space(.), "Enakan di atas atau di bawah?")]');
		});

		test('stops before a double quote so the XPath string stays valid', () => {
			expect(composerCaptionSelector('Kata "rahasia" sukses')).toBe('xpath=//div[@role="dialog"]//div[@role="textbox" and contains(normalize-space(.), "Kata")]');
		});

		test('stops at a line break, because the editor joins paragraphs without a space', () => {
			expect(composerCaptionSelector('Halo\ndunia semua')).toContain('"Halo")]');
			expect(composerCaptionSelector('Halo\r\ndunia')).toContain('"Halo")]');
		});

		test('skips leading blank lines', () => {
			expect(composerCaptionSelector('\n\nHalo dunia')).toContain('"Halo dunia")]');
		});

		test('stops at a double space or tab, which the editor stores as a non-breaking space', () => {
			expect(composerCaptionSelector('  Satu   dua\ttiga ')).toContain('"Satu")]');
			expect(composerCaptionSelector('Satu dua\ttiga')).toContain('"Satu dua")]');
		});

		test('cuts at 30 whole characters, never inside an emoji', () => {
			const selector = composerCaptionSelector('a'.repeat(29) + '😀 sesudahnya')!;
			expect(selector).toContain(`"${'a'.repeat(29)}😀")]`);
			expect(selector).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/);
		});

		test('returns undefined when no usable text precedes a double quote', () => {
			expect(composerCaptionSelector('"Kutipan" saja')).toBeUndefined();
			expect(composerCaptionSelector('   ')).toBeUndefined();
			expect(composerCaptionSelector('\n\n')).toBeUndefined();
		});
	});

	describe('feedCaptionSelector', () => {
		test('matches the caption text outside any dialog', () => {
			expect(feedCaptionSelector('Enakan di atas atau di bawah? Di atas sajadah.')).toBe('xpath=//*[not(ancestor-or-self::div[@role="dialog"]) and contains(normalize-space(text()), "Enakan di atas atau di bawah?")]');
		});

		test('returns undefined when the caption has no usable probe', () => {
			expect(feedCaptionSelector('"Kutipan" saja')).toBeUndefined();
		});
	});
});
