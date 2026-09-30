import { cookies } from '@/core/cookie';
import { facebook } from '@/core/facebook';
import { activateBfb } from '@/libs/activate-bfb';
import { applyDelay } from '@/libs/apply-delay';
import { checkActivation } from '@/libs/check-activation';
import { checkDriver } from '@/libs/check-driver';
import { checkInit } from '@/libs/check-init';
import { downloadDriver } from '@/libs/download-driver';
import { initProject } from '@/libs/init-project';
import { isMenuLocked } from '@/libs/menu-access';
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
	const runTask = async (title: string, task: () => Promise<void>, holdResult = false): Promise<void> => {
		readlineInterface.pause();
		console.clear();
		console.log(`${title}\n`);
		try {
			await task();
		} catch (error) {
			console.log(chalk.red((error as Error)?.message ?? String(error)));
			holdResult = true;
		}
		if (holdResult) await readlineInterface.question('Tekan Enter untuk kembali ke menu ');
		console.clear();
		readlineInterface.resume();
	};

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
		console.log(' 0. Init project');
		console.log(' 1. Rawat facebook');
		console.log(' 2. Follow instagram');
		console.log(' 3. Tap tiktok');
		console.log(' 4. Racun shopee');
		console.log('95. Sinkronisasi cookies');
		console.log('96. Pasang driver');
		console.log('97. Aktifasi bfb');
		console.log('98. Pengaturan');
		console.log('99. Keluar\n');

		const choice = await readlineInterface.question('Masukkan pilihan anda: ');

		const isLocked = isMenuLocked(choice, { isInitialized: Boolean(isInitialized), isDriverInstalled: Boolean(isDriverInstalled), isActivated });

		if (choice === '0') {
			if (isInitialized) await showMessage('Init project sudah siap, platform bisa digunakan');
			else
				await runTask('Initialize project', async () => {
					await applyDelay(1000);
					await initProject();
				});
		} else if (choice === '1') {
			if (isLocked) await showMessage('Fitur masih terkunci, setup terlebih dahulu');
			else await runTask('Rawat facebook', facebook, true);
		} else if (choice === '2' || choice === '3' || choice === '4' || choice === '98') {
			await showMessage('Belum tersedia, stay tuned');
		} else if (choice === '95') {
			if (isLocked) await showMessage('Fitur masih terkunci, setup terlebih dahulu');
			else await runTask('Sinkronisasi cookies', () => cookies(readlineInterface), true);
		} else if (choice === '96') {
			if (isDriverInstalled) await showMessage('Driver sudah terpasang, platform siap digunakan');
			else await runTask('Proses instalasi driver', downloadDriver);
		} else if (choice === '97') {
			if (isActivated) await showMessage('Bfb sudah aktif, platform siap digunakan');
			else await runTask('Proses aktifasi bfb', activateBfb);
		} else if (choice === '99') {
			readlineInterface.close();
			console.clear();
			console.log('Good bye\n');
			await applyDelay(1000);
			console.clear();
			process.exit(0);
		} else {
			await showMessage('Input tidak valid, coba lagi');
		}
	}
}

export { menu };
