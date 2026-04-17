import { applyDelay } from '@/libs/apply-delay';
import type { ElementHandle } from 'puppeteer-core';

async function isFacebookPublishButtonEnable(button: ElementHandle<Element> | null): Promise<boolean> {
	while (true) {
		const isDisabled = await button?.evaluate((element) => {
			const attr = element.getAttribute('aria-disabled');
			return attr === 'true';
		});

		if (!isDisabled) break;

		await applyDelay(1000);
	}
	return true;
}

export { isFacebookPublishButtonEnable };
