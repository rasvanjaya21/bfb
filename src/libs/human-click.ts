import { randomDelay, randomInt } from '@/libs/random-delay';
import type { ElementHandle, Page } from 'puppeteer-core';

async function humanClick(page: Page, handle: ElementHandle): Promise<void> {
	const box = await handle.boundingBox();
	if (!box) {
		await handle.click();
		return;
	}

	const offsetX = box.width * (0.2 + Math.random() * 0.6);
	const offsetY = box.height * (0.2 + Math.random() * 0.6);
	const targetX = box.x + offsetX;
	const targetY = box.y + offsetY;
	const steps = randomInt(5, 15);

	await page.mouse.move(targetX, targetY, { steps });
	await randomDelay(100, 250);
	await page.mouse.down();
	await randomDelay(50, 120);
	await page.mouse.up();
}

export { humanClick };
