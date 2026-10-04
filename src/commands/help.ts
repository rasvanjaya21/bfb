import { MENU_LABELS } from '@/libs/describe-menu';

// Usage guide for the operator; development commands live in CONTRIBUTING.md, not here.
function showHelp(): void {
	const menus = [...MENU_LABELS].map(([number, label]) => `  ${number.padStart(2)}. ${label}`);
	console.log(
		[
			'bfb (Bot for billy): otomasi media sosial lewat browser Chrome sungguhan',
			'',
			'Jalankan bfb di dalam folder kerja Anda; semua data dibaca dari folder tersebut.',
			'',
			'Pemakaian:',
			'  bfb                          buka menu interaktif',
			'  bfb help | --help | -h       tampilkan panduan ini',
			'  bfb version | --version | -v tampilkan versi',
			'  bfb -b <menu> [-e <NO>]      jalankan menu langsung tanpa membuka menu interaktif',
			'',
			'Flag:',
			'  -b, --bypass <menu>          menu yang dijalankan langsung: 1 atau 95, untuk semua baris CSV',
			'  -e, --explicit <NO[,NO...]>  hanya baris dengan kolom NO tersebut, pisahkan dengan koma; wajib bersama -b',
			'',
			'Menu yang bisa di-bypass:',
			'   1  Rawat facebook        memproses datas/contents.csv',
			'  95  Sinkronisasi cookies  memproses datas/accounts.csv',
			'',
			'Contoh:',
			'  bfb -b 1                     posting semua konten',
			'  bfb -b 95 -e 1               sinkronisasi cookie akun NO 1 saja',
			'  bfb -b 1 -e 2,3,1,99,21      posting konten NO 1, 2, 3, 21, dan 99 (urutan mengikuti CSV)',
			'',
			'Saat memakai -b, bfb langsung keluar setelah selesai. Pertanyaan (y/N), misalnya "Simpan cookie? (y/N)", tetap muncul dan harus dijawab.',
			'',
			'Menu:',
			...menus,
			'',
			'Sebelum menu 1 dan 95 bisa dipakai, selesaikan setup lewat menu: 0 (init project), 96 (pasang driver), 97 (aktifasi bfb).',
			'',
			'File di folder kerja:',
			'  datas/accounts.csv           akun: NO;UID;PASSWORD',
			'  datas/contents.csv           konten: NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE',
			'  credentials/                 cookie dan token aktivasi, jangan dibagikan',
			'  logs/audit.log               catatan setiap aksi bfb',
			'',
			'Laporkan masalah ke https://github.com/rasvanjaya21/bfb',
		].join('\n'),
	);
}

export { showHelp };
