import { applyDelay } from '@/libs/apply-delay';
import type { Page } from 'puppeteer-core';

async function isFacebookPublishButtonEnable(page: Page, selector: string): Promise<boolean> {
	let isDisabled = true;

	while (isDisabled) {
		isDisabled = await page.evaluate((selector) => {
			const xpath = selector.replace('xpath=', '');
			const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			const node = result.singleNodeValue;

			if (!node || !(node instanceof Element)) {
				return true;
			}

			return node.getAttribute('aria-disabled') === 'true';
		}, selector);

		if (isDisabled) {
			await applyDelay(1000);
		}
	}
	await applyDelay(1000);
	return true;
}

export { isFacebookPublishButtonEnable };
