import { existsSync, rmSync } from 'fs';

const paths = ['dist', 'node_modules'];

paths.forEach((path) => {
	if (existsSync(path)) {
		console.log(`removing ${path}...`);
		rmSync(path, { recursive: true, force: true });
	} else {
		console.log(`${path} does not exist, skipping...`);
	}
});

console.log('clean up complete.');
