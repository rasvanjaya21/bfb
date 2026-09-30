import { cookies } from '@/core/cookie';
import { facebook } from '@/core/facebook';
import { activateBfb } from '@/libs/activate-bfb';
import { applyDelay } from '@/libs/apply-delay';
import { checkActivation } from '@/libs/check-activation';
import { checkDriver } from '@/libs/check-driver';
import { checkInit } from '@/libs/check-init';
import { describeMenu, MENU_LABELS } from '@/libs/describe-menu';
import { downloadDriver } from '@/libs/download-driver';
import { initProject } from '@/libs/init-project';
import { isMenuLocked } from '@/libs/menu-access';
import { createAuditLogger } from '@/libs/write-audit-log';
import { MOTIVATIONS, VERSION } from '@/utils/constant';
import chalk from 'chalk';
import os from 'os';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline/promises';

async function menu(): Promise<void> {
	const readlineInterface = readline.createInterface({ input, output });

	// Every screen: pause input, clear, show, wait, clear, resume.
	const showMessage = async (message: string): Promise<void> => {
		readlineInterface.pause();
		console.clear();
		console.log(`${message}\n`);
		await applyDelay(1000);
		console.clear();
		readlineInterface.resume();
	};

	// holdResult keeps a run's summary on screen until Enter, instead of clearing it straight away.
	// Returns the task's value, or the message of the error it threw so the menu can record it.
	async function runTask<T>(title: string, task: () => Promise<T>, holdResult = false): Promise<{ value?: T; error?: string }> {
		readlineInterface.pause();
		console.clear();
		console.log(`${title}\n`);
		let result: { value?: T; error?: string };
		try {
			result = { value: await task() };
		} catch (error) {
			result = { error: (error as Error)?.message ?? String(error) };
			console.log(chalk.red(result.error));
			holdResult = true;
		}
		if (holdResult) await readlineInterface.question('Tekan Enter untuk kembali ke menu ');
		console.clear();
		readlineInterface.resume();
		return result;
	}

	await createAuditLogger('SESI')(`bfb ${VERSION}`, 'mulai', `${os.platform()} ${os.arch()}`);

	while (true) {
		const cwd = process.cwd();
		const platform = os.platform();
		const arch = os.arch();
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const isInitialized = await checkInit();
		const isDriverInstalled = await checkDriver();
		const isActivated = await checkActivation();

		console.clear();
		console.log('Selamat datang di bfb');
		console.log(chalk.dim(`Bot for billy, ${MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]}\n`));

		console.info(`Versi bfb: ${chalk.dim(VERSION)}`);
		console.info(`Sistem operasi: ${chalk.dim(platform)}`);
		console.info(`Arsitektur sistem: ${chalk.dim(arch)}`);
		console.info(`Timezone: ${chalk.dim(timezone)}`);
		console.info(`Folder saat ini: ${chalk.dim(cwd)}`);
		console.info(`Status init project: ${isInitialized ? chalk.dim(chalk.green('Siap')) : chalk.dim(chalk.red('Belum siap'))}`);
		console.info(`Workspace project: ${chalk.dim(isInitialized ? 'datas/, credentials/' : '-')}`);
		console.info(`Status driver: ${isDriverInstalled ? chalk.dim(chalk.green('Terpasang')) : chalk.dim(chalk.red('Belum terpasang'))}`);
		console.info(`Lokasi driver: ${chalk.dim(isDriverInstalled ? isDriverInstalled.path : '-')}`);
		console.info(`Status aktifasi: ${isActivated ? chalk.dim(chalk.green('Aktif')) : chalk.dim(chalk.red('Belum aktif'))}`);
		console.info(`Masa aktif: ${chalk.dim(isActivated ? 'Kiamat' : '-')}\n`);

		console.log('Silakan pilih menu:\n');
		for (const [number, label] of MENU_LABELS) console.log(`${number.padStart(2)}. ${label}`);
		console.log('');

		const choice = await readlineInterface.question('Masukkan pilihan anda: ');
		const { source, action } = describeMenu(choice);
		const log = createAuditLogger(source);

		const isLocked = isMenuLocked(choice, { isInitialized: Boolean(isInitialized), isDriverInstalled: Boolean(isDriverInstalled), isActivated });

		// Shows a one-screen message and records it with the given result.
		const showAndLog = async (message: string, result: 'sudah siap' | 'terkunci' | 'belum tersedia'): Promise<void> => {
			await showMessage(message);
			await log(action, result, message);
		};

		if (choice === '0') {
			if (isInitialized) await showAndLog('Init project sudah siap, platform bisa digunakan', 'sudah siap');
			else {
				const { error } = await runTask('Initialize project', async () => {
					await applyDelay(1000);
					await initProject();
				});
				await log(action, error === undefined ? 'berhasil' : 'gagal', error);
			}
		} else if (choice === '1') {
			if (isLocked) await showAndLog('Fitur masih terkunci, setup terlebih dahulu', 'terkunci');
			else {
				const { error } = await runTask('Rawat facebook', () => facebook(log, action), true);
				if (error !== undefined) await log(action, 'gagal', error);
			}
		} else if (choice === '2' || choice === '3' || choice === '4' || choice === '98') {
			await showAndLog('Belum tersedia, stay tuned', 'belum tersedia');
		} else if (choice === '95') {
			if (isLocked) await showAndLog('Fitur masih terkunci, setup terlebih dahulu', 'terkunci');
			else {
				const { error } = await runTask('Sinkronisasi cookies', () => cookies(readlineInterface, log, action), true);
				if (error !== undefined) await log(action, 'gagal', error);
			}
		} else if (choice === '96') {
			if (isDriverInstalled) await showAndLog('Driver sudah terpasang, platform siap digunakan', 'sudah siap');
			else {
				const { value, error } = await runTask('Proses instalasi driver', () => downloadDriver());
				await log(action, value?.ok ? 'berhasil' : 'gagal', value?.message ?? error);
			}
		} else if (choice === '97') {
			if (isActivated) await showAndLog('Bfb sudah aktif, platform siap digunakan', 'sudah siap');
			else {
				const { value, error } = await runTask('Proses aktifasi bfb', () => activateBfb());
				await log(action, value?.ok ? 'berhasil' : 'gagal', value?.message ?? error);
			}
		} else if (choice === '99') {
			await log(action, 'selesai');
			readlineInterface.close();
			console.clear();
			console.log('Sampai jumpa\n');
			await applyDelay(1000);
			console.clear();
			process.exit(0);
		} else {
			await showMessage('Input tidak valid, coba lagi');
			await log(action, 'gagal');
		}
	}
}

export { menu };
