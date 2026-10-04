import { cookies } from '@/core/cookie';
import { facebook } from '@/core/facebook';
import { checkActivation } from '@/libs/check-activation';
import { checkDriver } from '@/libs/check-driver';
import { checkInit } from '@/libs/check-init';
import { checkSetup } from '@/libs/check-setup';
import { describeMenu } from '@/libs/describe-menu';
import { isMenuLocked } from '@/libs/menu-access';
import type { BypassMenu } from '@/libs/parse-args';
import { createAuditLogger } from '@/libs/write-audit-log';
import { VERSION } from '@/utils/constant';
import chalk from 'chalk';
import os from 'os';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline/promises';

// Runs menu 1 or 95 straight from the command line (bfb -b <menu> [-e <NO>]) and returns whether it ran.
// It logs exactly like the menu does and leaves without holding the screen.
async function bypass(menu: BypassMenu, explicit?: number[]): Promise<boolean> {
	const session = createAuditLogger('SESI');
	await session(`bfb ${VERSION}`, 'mulai', `${os.platform()} ${os.arch()}`);
	try {
		return await runBypass(menu, explicit);
	} finally {
		await session(`bfb ${VERSION}`, 'selesai');
	}
}

async function runBypass(menu: BypassMenu, explicit?: number[]): Promise<boolean> {
	const { source, action } = describeMenu(menu);
	const log = createAuditLogger(source);

	const status = await checkSetup({ init: checkInit, driver: async () => Boolean(await checkDriver()), activation: () => checkActivation() });
	if (isMenuLocked(menu, status)) {
		const message = 'Fitur masih terkunci, setup terlebih dahulu';
		console.log(message);
		await log(action, 'terkunci', message);
		return false;
	}

	const readlineInterface = readline.createInterface({ input, output });
	try {
		console.log(`${action}\n`);
		if (menu === '1') await facebook(readlineInterface, log, action, explicit);
		else await cookies(readlineInterface, log, action, explicit);
		return true;
	} catch (error) {
		const message = (error as Error)?.message ?? String(error);
		console.log(chalk.red(message));
		await log(action, 'gagal', message);
		return false;
	} finally {
		readlineInterface.close();
	}
}

export { bypass };
