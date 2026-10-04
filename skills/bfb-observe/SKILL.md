---
name: bfb-observe
description: Observasi penuh alur browser sungguhan sebelum fitur bfb dibuat, diperbaiki, atau diperbarui — URL dan redirect, setiap layar dan kondisi, varian akun dan bahasa, popup, XPath/selector, link, timing — lalu tulis peta kondisinya ke architecture/OBSERVE.md supaya implementasi meniru hasil observasi. Untuk alur yang sudah ada, jalankan alurnya sambil dipantau dan fix src/ sampai tidak ada error. Gunakan sebelum /bfb-spec setiap kali membuat, memperbaiki, atau memperbarui fitur browser, dan saat alur yang ada masih error.
version: 1.0.0
---

# /bfb-observe

Tahap **OBSERVE** dalam siklus bfb (`/bfb-prepare` → `/bfb-observe` → `/bfb-spec` → `/bfb-plan` → `/bfb-build` → `/bfb-test` → `/bfb-review` → `/bfb-ship` → `/bfb-prepare` → `/bfb-commit`).

Instruksi dari user: sebelum fitur dibuat, diperbaiki, atau diperbarui, observasi dulu caranya, path-nya, kondisinya, semua kondisi, semua keadaan, observasi penuh: XPath, selector, link, semuanya, supaya implementasinya meniru cara kerja hasil observasi dan tidak ada error yang tersisa. Lalu jalankan sambil dipantau dan fix script-nya.

Skill ini punya dua bagian:

- **A. Observasi** (selalu, sebelum membuat fitur browser baru, memperbaiki bug di alur browser, atau memperbarui alur yang sudah ada; untuk fix dan update, observasi ulang bagian alur yang terdampak, termasuk kondisi yang sudah ada di peta, karena Facebook bisa sudah berubah): jelajahi alur sungguhan dan tulis peta kondisinya ke `architecture/OBSERVE.md`. `/bfb-spec`, `/bfb-plan`, dan `/bfb-build` wajib mengikuti peta itu.
- **B. Validasi** (setelah alur diimplementasi, atau untuk alur yang sudah ada dan masih error): jalankan alurnya terhadap data sungguhan, pantau setiap baris, debug dari bukti, fix `src/`, ulangi sampai tidak ada error. Setiap kondisi baru yang ditemukan di B ditambahkan ke peta kondisi.

Mulai dengan membaca `AGENTS.md` (terutama "Jebakan `postFeed`" di Konvensi kode) dan `architecture/OBSERVE.md` kalau sudah ada.

## Batas yang tidak boleh dilanggar

- **Tanya user dulu**: alur apa yang diobservasi, akun mana yang boleh dipakai (minta akun uji, dan beberapa varian: bahasa Inggris dan Indonesia, akun biasa dan mode profesional, akun lama dan baru), dan apakah browser jalan di `xvfb-run` (tidak mengganggu desktop) atau di layar user.
- **Observasi tidak melakukan aksi yang tidak bisa ditarik** (publish, kirim, hapus, follow, menyetujui ketentuan) kecuali user mengizinkan aksi itu secara eksplisit untuk akun uji tertentu. Observasi berhenti tepat sebelum langkah itu; dump layar terakhirnya, catat selector tombolnya, dan tandai "belum diklik saat observasi" di peta.
- **Keputusan atas nama pemilik akun** (persetujuan privasi, checkpoint, verifikasi identitas) tidak diotomasi tanpa persetujuan eksplisit user.
- **Validasi tidak pernah mengulang baris yang mungkin sudah terposting** tanpa membuktikan postingannya tidak ada (B4).
- Fix di `src/` mengikuti aturan repo: test dulu, alias `@/`, teks user Bahasa Indonesia, tidak mengirim fungsi ke browser, `humanClick`/`humanType`. Alat observasi di `temp/observe/` boleh memakai `page.evaluate` dengan string, karena tidak ikut build.
- Jangan pernah memakai `pkill -f <pola>` kalau pola itu juga ada di command line shell sendiri; shell agent ikut terbunuh. Hentikan proses lewat PID.

## Lokasi

Folder kerja: `/home/pinc/Developer/bfb/workspaces/`. Semua artefak di `/home/pinc/Developer/bfb/temp/observe/` (di-gitignore):

| File                                   | Isi                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `observer.ts`                          | observer interaktif (A), dari `# Reference`                                |
| `commands.fifo`, `observer.log`        | perintah ke observer dan hasilnya                                          |
| `dumps/<nama>.png`, `.html`, `.json`   | screenshot, HTML, dan inventaris elemen per langkah observasi              |
| `runner.ts`, `remaining.sh`            | runner validasi (B) dan daftar baris yang belum `done`, dari `# Reference` |
| `run.log`, `failed.txt`, `stdin.fifo`  | output runner, NO yang gagal, stdin runner                                 |
| `fb-debug/NO-<n>.png`, `.html`, `.url` | bukti setiap baris yang gagal di validasi                                  |

Tulis file dari `# Reference` persis seperti tertulis (`chmod +x remaining.sh`).

## A. Observasi

### A1. Jalankan observer

```bash
cd /home/pinc/Developer/bfb/temp/observe && rm -f commands.fifo && mkfifo commands.fifo
cd /home/pinc/Developer/bfb/workspaces && setsid nohup xvfb-run -a -s "-screen 0 1920x1080x24" bun ../temp/observe/observer.ts < <(tail -f ../temp/observe/commands.fifo) >> ../temp/observe/observer.log 2>&1 & disown
```

Kirim perintah satu per satu, lalu baca `observer.log` (setiap perintah membalas satu baris `[OBS]`):

```bash
echo 'open 100092161240413' > /home/pinc/Developer/bfb/temp/observe/commands.fifo
```

Perintah observer: `open <uid>` (context baru + cookie akun + buka profil seperti `postFeed`), `goto <url>`, `click <xpath>`, `type <teks>`, `press <tombol>`, `scroll <px>`, `wait <ms>`, `dump <nama>`, `frames` (mengukur `requestAnimationFrame` per detik), `close` (tutup context), `quit`.

Setiap `dump` menghasilkan `dumps/<nama>.png`, `.html`, dan `.json`. JSON berisi URL, judul, ukuran viewport, dan inventaris semua elemen interaktif (`role`, tag, `aria-label`, teks, `aria-disabled`, `aria-checked`, `href`, kotak posisinya, dan apakah ada di dalam viewport). Lihat PNG dengan Read; pakai JSON dan HTML untuk menyusun selector.

### A2. Yang wajib diobservasi

Untuk setiap alur, dan untuk **setiap varian akun** yang disediakan user:

1. **Pintu masuk dan redirect**: URL awal, ke mana Facebook mengarahkan (profil, login karena cookie mati, `/privacy/consent/`, `/checkpoint/`, halaman lain), dan cara mendeteksinya dari URL.
2. **Setiap layar dan langkah** sampai tepat sebelum aksi yang tidak bisa ditarik: dump di setiap langkah, catat elemen yang diklik, selector-nya, dan perubahan yang terjadi (dialog muncul, URL berubah, tombol jadi aktif).
3. **Selector**: utamakan `aria-label`, `role`, dan teks **persis** dalam bahasa Inggris dan Indonesia. Hindari `contains()` pada kata pendek ("Posting" pernah mengenai "Promosikan postingan"), kelas CSS acak, dan posisi. Catat juga label internal yang tidak tergantung bahasa (mis. `aria-label="personal_data_toggle"`).
4. **Status elemen**: disabled/enabled (`aria-disabled`), on/off (`aria-checked`), apa yang membuat tombol aktif, elemen yang ada di bawah layar (perlu digulir), dan elemen yang tersembunyi tapi ada di DOM.
5. **Gangguan**: popup, modal, panel pengumuman, toggle bawaan (Boost post), dialog draf. Kapan munculnya (saat halaman dibuka, saat mengetik, setelah klik), apakah merebut fokus, dan tombol untuk menutupnya. Ulangi alur beberapa kali dan di beberapa akun, karena popup tidak selalu muncul.
6. **Tanda berhasil dan gagal**: apa yang membuktikan aksi benar-benar berhasil (dialog tertutup, konten muncul di linimasa, URL berubah), dan bisa juga berhasil walau tandanya terlambat.
7. **Lingkungan**: ukuran viewport, render saat jendela tidak tampil (`frames`; di bawah ~30 berarti render tersendat), dan perbedaan antara `xvfb-run` dan layar desktop.
8. **Timing**: berapa lama setiap langkah biasanya (navigasi, dialog muncul, tombol aktif, dialog tertutup), untuk menentukan timeout.

Buktikan setiap selector di peta terhadap semua dump: cocok di layar yang dimaksud, tidak cocok di layar lain (`python3` + `lxml`, XPath yang sama persis dengan yang akan ditulis di `src/libs/facebook-selectors.ts`).

### A3. Tulis peta kondisi

Tulis `architecture/OBSERVE.md` dengan format di `# Reference` (menggantikan isi sebelumnya untuk alur yang sama; alur lain dipertahankan). Setiap baris di peta menyebut file dump buktinya. Hal yang belum bisa diobservasi (mis. tombol publish belum pernah diklik) dicatat di "Belum terobservasi", bukan ditebak.

Setelah itu `/bfb-spec` → `/bfb-plan` → `/bfb-build` menyusun implementasi dari peta ini. Lalu kembali ke bagian B untuk memvalidasi.

## B. Validasi: jalankan, pantau, fix

### B1. Jalankan runner

Tanya user baris mana yang dijalankan (semua, atau lewati yang sudah `berhasil` di `workspaces/logs/audit.log`). NO yang terbukti sudah terbit walau tidak tercatat `done` ditulis ke `posted` di `remaining.sh`.

```bash
cd /home/pinc/Developer/bfb/temp/observe && rm -f stdin.fifo && mkfifo stdin.fifo && (sleep 86400 > stdin.fifo &)
cd /home/pinc/Developer/bfb/workspaces && setsid nohup xvfb-run -a -s "-screen 0 1920x1080x24" bun ../temp/observe/runner.ts "$(../temp/observe/remaining.sh)" < ../temp/observe/stdin.fifo >> ../temp/observe/run.log 2>&1 & disown
```

- Argumen runner: nomor awal (`48`) atau daftar NO dipisah koma (`84,91,92`; satu NO ditulis `104,`).
- Runner menjalankan `postFeed` asli dan menulis audit log lewat `createAuditLogger('MENU 1')`.
- Kalau ada prompt yang harus dijawab user sendiri, minta user menjalankan perintah yang sama di terminalnya dengan `2>&1 | tee -a ../temp/observe/run.log`. Agent tetap memantau `run.log`. Jawaban prompt dari agent: `echo n > /home/pinc/Developer/bfb/temp/observe/stdin.fifo`.

Pantau dengan Monitor (pasang ulang setiap 30 menit selama run berjalan):

```bash
tail -n 0 -f /home/pinc/Developer/bfb/temp/observe/run.log | grep -E --line-buffered 'NO [0-9]*0 done|failed|skipped|SELESAI|\[STACK\]|perlu menyetujui privasi facebook di browser|error:|panic'
```

Kegagalan yang sudah dikenali dan menunggu keputusan user boleh dikeluarkan dari filter (`grep -v`), tapi tetap dihitung untuk laporan.

### B2. Debug setiap kegagalan

1. Baris `[STACK]`: baris mana di `src/` yang melempar.
2. Timeline baris itu di `run.log`. Langkah yang jauh lebih lambat dari biasanya adalah petunjuk.
3. `fb-debug/NO-<n>.png` (Read) dan `.html` (XPath yang sama persis dengan selector di `src/`): dialog apa yang terbuka, tombol apa yang ada, isi textbox.
4. Kalau browser masih hidup (prompt `y/N`, proses menggantung), intip lewat DevTools tanpa mengklik: port ada di `<--user-data-dir>/DevToolsActivePort` milik proses Chrome, lalu `puppeteer.connect({ browserURL: 'http://127.0.0.1:<port>' })`, screenshot, `page.content()`, `disconnect()`.
5. Kalau kondisinya belum ada di peta, observasi ulang dengan observer (A) di akun yang sama sebelum menulis fix.

Klasifikasikan: **bug bot** (fix di `src/`), **status akun** (pesan error yang jelas di `src/`, keputusan dibawa ke user), atau **ulah agent sendiri** (proses dihentikan di tengah baris, `Connection closed.` setelah restart; bukan bug).

### B3. Fix dan restart

1. Test yang gagal dulu, lalu fix. Selector baru dibuktikan terhadap dump yang bermasalah dan dump halaman normal.
2. `bun run type-check`, `bun run lint`, `bun run test` hijau.
3. Restart di **batas baris**: catat PID proses `bun` runner (`pgrep -f '^bun ../temp/observe/runner'`; bukan PID `xvfb-run` yang membungkusnya, karena `bun` tetap jalan kalau hanya pembungkusnya yang dihentikan), tunggu baris `[MONITOR]` baru di `run.log`, lalu `kill <pid>` dan `kill` setiap PID `chrome-linux64/chrome`. Mulai lagi dengan `remaining.sh`. Hapus dari `failed.txt` NO yang hanya gagal karena restart.

### B4. Pastikan sebelum mengulang

Baris yang gagal setelah tombol publish diklik bisa saja sudah terbit. Cari caption di HTML-nya di luar dialog (`//*[not(ancestor-or-self::div[@role="dialog"]) and contains(normalize-space(text()), "<awal caption>")]`) dan lihat screenshot-nya ("Baru saja" di linimasa). Yang terbukti terbit masuk `posted` di `remaining.sh`. Yang gagal sebelum publish (caption kosong, `Publish tidak valid`, halaman tidak terbuka) aman diulang.

Ulangi B1–B4 sampai `remaining.sh` kosong, atau semua sisanya menunggu keputusan user.

## C. Catat dan rapikan

- Perbarui `architecture/OBSERVE.md`: peta kondisi (termasuk kondisi baru dari B), hasil validasi (berhasil/gagal/dilewati), setiap penyebab yang ditemukan beserta buktinya, fix yang dibuat (file dan test), baris yang menunggu keputusan user, dan hal yang belum terbukti.
- Jebakan baru yang perlu diingat agent lain masuk ke "Jebakan `postFeed`" (atau bagian alur yang relevan) di `AGENTS.md`.
- Hentikan Monitor, observer (`quit`), dan runner; hapus FIFO. Biarkan `temp/observe/` sampai user selesai memeriksa.
- Fix di `src/` belum sampai ke binary global `bfb` milik user sampai dirilis; sebutkan di laporan. Lanjutkan ke `/bfb-spec` (fitur baru) atau `/bfb-review` (fix alur yang ada). **Jangan commit.**

# Reference

## observer.ts

```ts
// bfb-observe observer: one browser, driven one command per line on stdin. Every command answers with one [OBS] line.
// Run from workspaces/. Commands: open <uid> | goto <url> | click <xpath> | type <text> | press <key> | scroll <px> | wait <ms> | dump <name> | frames | close | quit
import { humanClick } from '@/libs/human-click';
import { humanType } from '@/libs/human-type';
import { launchBrowser } from '@/libs/launch-browser';
import { readCookies } from '@/libs/read-cookies';
import fs from 'fs';
import path from 'path';
import type { BrowserContext, CookieData, KeyInput, Page } from 'puppeteer-core';
import readline from 'readline';

const dumpDir = path.join(import.meta.dir, 'dumps');
fs.mkdirSync(dumpDir, { recursive: true });
const profileUrl = 'https://web.facebook.com/login.php?next=https://web.facebook.com/profile';

const INVENTORY = `(() => {
	const vh = innerHeight;
	const nodes = document.querySelectorAll('[role=button],[role=link],a[href],[role=dialog],[role=textbox],[role=switch],[role=checkbox],[role=radio],[role=tab],[role=menuitem],[contenteditable=true],input,button');
	return { url: location.href, title: document.title, viewport: [innerWidth, innerHeight], elements: [...nodes].map((e) => {
		const r = e.getBoundingClientRect();
		return { tag: e.tagName.toLowerCase(), role: e.getAttribute('role'), label: e.getAttribute('aria-label'), text: (e.innerText || e.value || '').trim().replace(/\\s+/g, ' ').slice(0, 80), disabled: e.getAttribute('aria-disabled'), checked: e.getAttribute('aria-checked'), href: e.getAttribute('href'), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], inViewport: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh };
	}) };
})()`;
const FRAMES = `new Promise((r) => { let n = 0; const s = performance.now(); (function f() { n++; if (performance.now() - s < 1000) requestAnimationFrame(f); else r(n); })(); })`;

const browser = await launchBrowser();
let context: BrowserContext | undefined;
let page: Page | undefined;
const say = (...args: unknown[]): void => console.log(new Date().toISOString().slice(11, 19), '[OBS]', ...args);

async function run(command: string, rest: string): Promise<string> {
	if (command === 'open') {
		await context?.close().catch(() => {});
		const cookies = await readCookies<CookieData>(path.join(process.cwd(), 'credentials', 'cookies.json'), rest);
		if (cookies.length === 0) return 'cookie tidak ditemukan';
		context = await browser.createBrowserContext();
		page = await context.newPage();
		await context.setCookie(...cookies);
		await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
		return page.url();
	}
	if (command === 'quit') {
		await browser.close();
		process.exit(0);
	}
	if (!page) return 'belum ada page, jalankan open dulu';
	if (command === 'goto') return (await page.goto(rest, { waitUntil: 'networkidle2', timeout: 30000 }), page.url());
	if (command === 'click') {
		const handle = await page.locator(`xpath=${rest}`).setTimeout(5000).waitHandle();
		await humanClick(page, handle);
		return `diklik, url ${page.url()}`;
	}
	if (command === 'type') return (await humanType(page, rest), 'diketik');
	if (command === 'press') return (await page.keyboard.press(rest as KeyInput), 'ditekan');
	if (command === 'scroll') return (await page.mouse.wheel({ deltaY: Number(rest) }), 'digulir');
	if (command === 'wait') return (await new Promise((r) => setTimeout(r, Number(rest))), 'selesai');
	if (command === 'frames') return `${await page.evaluate(FRAMES)} frame/detik`;
	if (command === 'close') return (await context?.close(), (page = undefined), 'context ditutup');
	if (command === 'dump') {
		const base = path.join(dumpDir, rest || `dump-${Date.now()}`);
		await page.screenshot({ path: `${base}.png` });
		await fs.promises.writeFile(`${base}.html`, await page.content());
		const inventory = (await page.evaluate(INVENTORY)) as { elements: unknown[] };
		await fs.promises.writeFile(`${base}.json`, JSON.stringify(inventory, null, 2));
		return `${base} (${inventory.elements.length} elemen), url ${page.url()}`;
	}
	return 'perintah tidak dikenal';
}

say('siap');
for await (const line of readline.createInterface({ input: process.stdin })) {
	const [command = '', ...parts] = line.trim().split(' ');
	if (!command) continue;
	const rest = parts.join(' ');
	await run(command, rest).then(
		(result) => say(command, rest, '=>', result),
		(error: Error) => say(command, rest, '=> ERROR', error.message),
	);
}
```

## runner.ts

```ts
// bfb-observe runner: the same flow as menu 1 (postFeed), with timestamps, a [MONITOR] line per row, a [STACK] line and a
// screenshot + HTML + URL dump for every failed row. Run from workspaces/: bun ../temp/observe/runner.ts <startNo | NO,NO,...>
import { postFeed } from '@/core/facebook';
import { csvToJson } from '@/libs/csv-parser';
import { launchBrowser } from '@/libs/launch-browser';
import { logRowOutcome } from '@/libs/log-row-outcome';
import { runBrowserRows } from '@/libs/run-browser-rows';
import { createAuditLogger } from '@/libs/write-audit-log';
import type { Content } from '@/types/global';
import fs from 'fs';
import path from 'path';
import type { Page } from 'puppeteer-core';
import readline from 'readline/promises';

const rawLog = console.log;
console.log = (...args: unknown[]) => rawLog(new Date().toISOString().slice(11, 19), ...args);

const debugDir = path.join(import.meta.dir, 'fb-debug');
fs.mkdirSync(debugDir, { recursive: true });

const arg = process.argv[2] ?? '0';
const only = arg.includes(',') ? new Set(arg.split(',').filter(Boolean).map(Number)) : undefined;
const startNo = Number(arg);
const contents = (await csvToJson<Content>(path.join(process.cwd(), 'datas', 'contents.csv'))).filter((c) => (only ? only.has(Number(c.NO)) : Number(c.NO) >= startNo));
const log = createAuditLogger('MENU 1');
const action = 'Rawat facebook';

const readlineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
const browser = await launchBrowser();
await log(action, 'mulai', `${contents.length} baris (observe)`);
let current: Page | undefined;

try {
	const result = await runBrowserRows(
		browser,
		contents,
		(openPage, content) => {
			current = undefined;
			return postFeed(async () => (current = await openPage()), content, readlineInterface, log).catch((error: Error) => {
				console.log('[STACK]', error?.stack?.split('\n').slice(0, 4).join(' <- '));
				throw error;
			});
		},
		async (outcome, content) => {
			console.log(`[MONITOR] ${new Date().toISOString()} NO ${content.NO} ${outcome.status}${outcome.message ? ' | ' + outcome.message : ''}`);
			if (outcome.status === 'failed') {
				await fs.promises.appendFile(path.join(import.meta.dir, 'failed.txt'), `${content.NO}\n`);
				if (current && !current.isClosed()) {
					const base = path.join(debugDir, `NO-${content.NO}`);
					await current.screenshot({ path: `${base}.png` }).catch(() => {});
					await fs.promises.writeFile(`${base}.html`, await current.content().catch(() => '')).catch(() => {});
					await fs.promises.writeFile(`${base}.url`, current.url()).catch(() => {});
				}
			}
			await logRowOutcome(log, `NO ${content.NO} UID ${content.COOKIE}`, outcome);
		},
	);
	console.log(`[MONITOR] SELESAI berhasil ${result.done} dilewati ${result.skipped} gagal ${result.failed} stopped ${result.stopped}`);
	await log(action, result.stopped ? 'dihentikan' : 'selesai', `${result.done} berhasil, ${result.skipped} dilewati, ${result.failed} gagal`);
} finally {
	await browser.close().catch(() => {});
	readlineInterface.close();
}
```

## remaining.sh

```bash
#!/usr/bin/env bash
# Prints the NOs from workspaces/datas/contents.csv that run.log has not recorded as done, comma separated.
# posted: NOs proven to be published although their row was not recorded as done (space separated).
posted=""
cd "$(dirname "$0")"
done=$( (grep -oP '\[MONITOR\] \S+ NO \K[0-9]+(?= done)' run.log 2>/dev/null; printf '%s\n' $posted) | sort -un)
awk -F';' 'NR>1{print $1+0}' ../../workspaces/datas/contents.csv | grep -vxF -f <(echo "$done") | paste -sd,
```

## Format architecture/OBSERVE.md

```markdown
# Observe

Ditulis lewat `/bfb-observe` pada <tanggal>. Alur: <nama alur>. Akun yang diobservasi: <NO/UID, bahasa, jenis akun>. Lingkungan: <xvfb/desktop, viewport>.

## Pintu masuk

| URL / redirect | Artinya | Cara mendeteksi | Penanganan | Bukti |
| -------------- | ------- | --------------- | ---------- | ----- |

## Peta kondisi

| #   | Layar / kondisi | Cara mendeteksi (URL / XPath) | Aksi | Selector aksi | Varian (EN/ID, jenis akun) | Timing | Bukti |
| --- | --------------- | ----------------------------- | ---- | ------------- | -------------------------- | ------ | ----- |

## Gangguan

| Gangguan | Kapan muncul | Dampak | Cara mendeteksi | Cara menutup | Bukti |
| -------- | ------------ | ------ | --------------- | ------------ | ----- |

## Tanda berhasil dan gagal

## Lingkungan dan timing

## Belum terobservasi

## Validasi

Hasil run terakhir (berhasil / gagal / dilewati), penyebab setiap kegagalan beserta bukti dan fix-nya, baris yang menunggu keputusan user.
```
