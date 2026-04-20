import { cookies } from '@/core/cookie';
import { facebook } from '@/core/facebook';
import { activateBfb } from '@/libs/activate-bfb';
import { applyDelay } from '@/libs/apply-delay';
import { checkActivation } from '@/libs/check-activation';
import { checkDriver } from '@/libs/check-driver';
import { checkInit } from '@/libs/check-init';
import { downloadDriver } from '@/libs/download-driver';
import { initProject } from '@/libs/init-project';
import { MOTIVATIONS, VERSION } from '@/utils/constant';
import chalk from 'chalk';
import os from 'os';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline/promises';

async function menu(): Promise<void> {
	const readlineInterface = readline.createInterface({ input, output });
	while (true) {
		const cwd = process.cwd();
		const platform = os.platform();
		const arch = os.arch();
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const isInitilized = await checkInit();
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
		console.info(`Status init project: ${isInitilized ? chalk.dim(chalk.green('Siap')) : chalk.dim(chalk.red('Belum siap'))}`);
		console.info(`Workspace project: ${chalk.dim(isInitilized ? 'datas/, credentials/' : '-')}`);
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

		if (choice === '0' && !isInitilized) {
			readlineInterface.pause();
			console.clear();
			console.log('Initialize project\n');
			await applyDelay(1000);
			await initProject();
			console.clear();
			readlineInterface.resume();
		} else if (choice === '0' && isInitilized) {
			readlineInterface.pause();
			console.clear();
			console.log('Init project sudah siap, platform bisa digunakan\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '1' && (!isInitilized || !isDriverInstalled || !isActivated)) {
			readlineInterface.pause();
			console.clear();
			console.log('Fitur masih terkunci, setup terlebih dahulu\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '1' && (isInitilized || isDriverInstalled || isActivated)) {
			readlineInterface.pause();
			console.clear();
			console.log('Rawat facebook\n');
			await facebook();
			console.clear();
			readlineInterface.resume();
			continue;
		} else if (choice === '2' || choice === '3' || choice === '4') {
			readlineInterface.pause();
			console.clear();
			console.log('Belum tersedia, stay tuned\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '95' && (!isInitilized || !isDriverInstalled || !isActivated)) {
			readlineInterface.pause();
			console.clear();
			console.log('Fitur masih terkunci, setup terlebih dahulu\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '95' && (isInitilized || isDriverInstalled || isActivated)) {
			readlineInterface.pause();
			console.clear();
			console.log('Sinkronisasi cookies\n');
			await cookies(readlineInterface);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '96' && !isDriverInstalled) {
			readlineInterface.pause();
			console.clear();
			console.log('Proses instalasi driver\n');
			await downloadDriver();
			console.clear();
			readlineInterface.resume();
		} else if (choice === '96' && isDriverInstalled) {
			readlineInterface.pause();
			console.clear();
			console.log('Driver sudah terpasang, platform siap digunakan\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '97' && !isActivated) {
			readlineInterface.pause();
			console.clear();
			console.log('Proses aktifasi bfb\n');
			await activateBfb(readlineInterface);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '97' && isActivated) {
			readlineInterface.pause();
			console.clear();
			console.log('Bfb sudah aktif, platform siap digunakan\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '98') {
			readlineInterface.pause();
			console.clear();
			console.log('Belum tersedia, stay tuned\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		} else if (choice === '99') {
			readlineInterface.close();
			console.clear();
			console.log('Good bye\n');
			await applyDelay(1000);
			console.clear();
			process.exit(1);
		} else {
			readlineInterface.pause();
			console.clear();
			console.log('Input tidak valid, coba lagi\n');
			await applyDelay(1000);
			console.clear();
			readlineInterface.resume();
		}
	}
}

export { menu };
