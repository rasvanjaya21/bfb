import { showHelp } from '@/commands/help';
import { menu } from '@/commands/menu';
import { showVersion } from '@/commands/version';
import { parseArgs } from '@/libs/parse-args';

async function index(): Promise<void> {
	const parsed = parseArgs(process.argv.slice(2));

	if (parsed.command === 'version') return showVersion();
	if (parsed.command === 'help') return showHelp();
	if (parsed.command === 'unknown') {
		console.log(`Unknown flag: '${parsed.flag}'`);
		console.log("Try 'bfb help' for usage information");
		return;
	}

	await menu();
}

index().catch((error) => {
	console.error(`Terjadi kesalahan: ${(error as Error)?.message ?? error}`);
	process.exit(1);
});
