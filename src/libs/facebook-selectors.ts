type FacebookSelectorName = 'captionTrigger' | 'createPost' | 'nextPost' | 'postPreview' | 'publishPost' | 'boostPostOn' | 'dismissPopup' | 'composerTextbox' | 'consentToggleOff' | 'consentAgree' | 'consentDone' | 'loggedOutForm' | 'loginContinue' | 'loginFresh' | 'forgottenPassword';

const SELECTORS: Record<FacebookSelectorName, string> = {
	captionTrigger: `xpath=//div[@role="button" and .//span[contains(text(), "What's on your mind") or contains(text(), "Apa yang Anda pikirkan") or contains(text(), "Apa yang anda pikirkan")]]`,
	createPost: `xpath=//*[contains(text(), "Add to your post") or contains(text(), "Tambahkan ke postingan") or contains(text(), "Tambahkan ke kiriman")]`,
	nextPost: `xpath=//*[(self::div[@role="button"] or self::button or self::span) and (text()="Next" or text()="Berikutnya" or text()="Lanjut")]`,
	postPreview: `xpath=//*[contains(text(), "Post preview") or contains(text(), "Pratinjau postingan") or contains(text(), "Pratinjau kiriman")]`,
	publishPost: `xpath=//div[@role="button" and not(@aria-disabled="true") and (@aria-label="Post" or @aria-label="Posting" or @aria-label="Kirim" or text()="Post" or text()="Posting" or text()="Kirim" or .//span[text()="Post" or text()="Posting" or text()="Kirim"])]`,
	boostPostOn: `xpath=//div[@role="button" and .//input[@role="switch" and @aria-checked="true"] and .//span[text()="Boost post" or text()="Promosikan postingan" or text()="Promosikan kiriman" or text()="Tingkatkan postingan"]]`,
	dismissPopup: `xpath=//div[@role="button" and (@aria-label="Saya memahaminya" or @aria-label="Got it" or .//span[text()="Saya memahaminya" or text()="Got it"])] | //div[@role="dialog" and .//div[@role="dialog" and (@aria-label="Pembaruan Reels" or @aria-label="Reels update")]]//div[@role="button" and (@aria-label="Oke" or @aria-label="OK")] | //div[@role="dialog" and .//*[text()="Akun Meta Anda sudah siap" or text()="Your Meta account is ready"]]//div[@role="button" and (@aria-label="Tutup" or @aria-label="Close")]`,
	composerTextbox: `xpath=//div[@role="dialog"]//div[@role="textbox" and @contenteditable="true"]`,
	consentToggleOff: `xpath=//input[@role="switch" and @aria-checked="false"]`,
	consentAgree: `xpath=//div[@role="button" and (@aria-label="Saya setuju" or @aria-label="I agree") and not(@aria-disabled="true")]`,
	consentDone: `xpath=//div[@role="main" and .//*[text()="Anda sudah siap!" or text()="You're all set!"]]//div[@role="button" and (@aria-label="Tutup" or @aria-label="Close")]`,
	loggedOutForm: `xpath=//input[@name="email" or @name="pass"]`,
	loginContinue: `xpath=//*[(self::div[@role="button"] or self::button) and (contains(@aria-label, "Continue") or contains(@aria-label, "Lanjutkan") or contains(., "Continue") or contains(., "Lanjutkan"))]`,
	loginFresh: `xpath=//*[text()="Log in to Facebook" or text()="Masuk ke Facebook" or text()="Log In" or text()="Masuk"]`,
	forgottenPassword: `xpath=//*[contains(text(), "Forgotten password?") or contains(text(), "Forgot password?") or contains(text(), "Lupa kata sandi?")]`,
};

function facebookSelector(name: FacebookSelectorName): string {
	return SELECTORS[name];
}

// The start of a caption, used to recognise it on the page. XPath 1.0 strings cannot escape quotes, so it stops before
// the first double quote. It also stops at a line break (the editor puts each line in its own paragraph, and
// normalize-space joins them without a space) and at a double space or tab (the editor stores those as non-breaking
// spaces, which normalize-space leaves alone). At most 30 whole characters, so an emoji is never cut in half.
// Undefined means there is no usable text.
function captionProbe(caption: string): string | undefined {
	const firstLine =
		caption
			.split('"')[0]!
			.split(/\r?\n/)
			.find((line) => line.trim() !== '') ?? '';
	const firstRun = firstLine.trim().split(/ {2,}|\t/)[0]!;
	const probe = [...firstRun].slice(0, 30).join('').trim();
	return probe || undefined;
}

// Matches the composer textbox once it holds the start of the caption.
function composerCaptionSelector(caption: string): string | undefined {
	const probe = captionProbe(caption);
	return probe && `xpath=//div[@role="dialog"]//div[@role="textbox" and contains(normalize-space(.), "${probe}")]`;
}

// Matches the published caption on the page itself (feed or profile), never the composer dialog.
function feedCaptionSelector(caption: string): string | undefined {
	const probe = captionProbe(caption);
	return probe && `xpath=//*[not(ancestor-or-self::div[@role="dialog"]) and contains(normalize-space(text()), "${probe}")]`;
}

export { composerCaptionSelector, facebookSelector, feedCaptionSelector, type FacebookSelectorName };
