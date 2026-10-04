import { humanClick } from '@/libs/human-click';
import { describe, expect, test } from 'bun:test';
import type { ElementHandle, Page } from 'puppeteer-core';

describe('humanClick', () => {
	test('moves mouse with steps, hovers, presses down and up when bounding box is available', async () => {
		const calls: string[] = [];
		let targetX = 0;
		let targetY = 0;
		let moveSteps = 0;

		const mockPage = {
			mouse: {
				move: async (x: number, y: number, options?: { steps?: number }) => {
					calls.push('move');
					targetX = x;
					targetY = y;
					moveSteps = options?.steps ?? 1;
				},
				down: async () => {
					calls.push('down');
				},
				up: async () => {
					calls.push('up');
				},
			},
		} as unknown as Page;

		const mockHandle = {
			boundingBox: async () => ({
				x: 100,
				y: 200,
				width: 100,
				height: 50,
			}),
			click: async () => {
				calls.push('fallback-click');
			},
		} as unknown as ElementHandle;

		await humanClick(mockPage, mockHandle);

		expect(calls).toEqual(['move', 'down', 'up']);
		expect(moveSteps).toBeGreaterThanOrEqual(5);
		expect(moveSteps).toBeLessThanOrEqual(15);
		expect(targetX).toBeGreaterThanOrEqual(120);
		expect(targetX).toBeLessThanOrEqual(180);
		expect(targetY).toBeGreaterThanOrEqual(210);
		expect(targetY).toBeLessThanOrEqual(240);
	});

	test('falls back to handle.click() when bounding box is null', async () => {
		const calls: string[] = [];

		const mockPage = {
			mouse: {
				move: async () => void calls.push('move'),
				down: async () => void calls.push('down'),
				up: async () => void calls.push('up'),
			},
		} as unknown as Page;

		const mockHandle = {
			boundingBox: async () => null,
			click: async () => void calls.push('fallback-click'),
		} as unknown as ElementHandle;

		await humanClick(mockPage, mockHandle);

		expect(calls).toEqual(['fallback-click']);
	});
});
