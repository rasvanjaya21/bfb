type FacebookSelectorName = 'captionTrigger' | 'createPost' | 'nextPost' | 'postPreview' | 'publishPost' | 'loginContinue' | 'loginFresh' | 'forgottenPassword';

const SELECTORS: Record<FacebookSelectorName, string> = {
	captionTrigger: `xpath=//div[@role="button" and .//span[contains(text(), "What's on your mind") or contains(text(), "Apa yang Anda pikirkan") or contains(text(), "Apa yang anda pikirkan")]]`,
	createPost: `xpath=//*[contains(text(), "Add to your post") or contains(text(), "Tambahkan ke postingan") or contains(text(), "Tambahkan ke kiriman")]`,
	nextPost: `xpath=//*[(self::div[@role="button"] or self::button or self::span) and (text()="Next" or text()="Berikutnya" or text()="Lanjut")]`,
	postPreview: `xpath=//*[contains(text(), "Post preview") or contains(text(), "Pratinjau postingan") or contains(text(), "Pratinjau kiriman")]`,
	publishPost: `xpath=//div[@role="button" and .//span[(text()="Post" or text()="Posting" or text()="Kirim" or contains(text(), "Posting") or contains(text(), "Kirim"))] and not(@aria-disabled="true")]`,
	loginContinue: `xpath=//*[text()="Continue" or text()="Lanjutkan" or contains(text(), "Continue") or contains(text(), "Lanjutkan")]`,
	loginFresh: `xpath=//*[text()="Log in to Facebook" or text()="Masuk ke Facebook" or text()="Log In" or text()="Masuk"]`,
	forgottenPassword: `xpath=//*[contains(text(), "Forgotten password?") or contains(text(), "Forgot password?") or contains(text(), "Lupa kata sandi?")]`,
};

function facebookSelector(name: FacebookSelectorName): string {
	return SELECTORS[name];
}

export { facebookSelector, type FacebookSelectorName };
