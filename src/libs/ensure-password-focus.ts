import type { Page } from 'puppeteer-core';

// The login flow types the password into whatever has focus after pressing Tab. If Facebook changes its login
// page, that could be a visible field, so the row stops unless a password input really has focus.
// page.$ runs a plain selector, so this stays safe in the obfuscated build.
async function ensurePasswordFocus(page: Page): Promise<void> {
	if (!(await page.$('input[type="password"]:focus'))) throw new Error('Kolom password tidak ditemukan, login dihentikan');
}

export { ensurePasswordFocus };
