# AGENTS.md

## Proyek

`bfb` ("Bot for billy") — CLI interaktif yang dipublikasikan sebagai `@rasvanjaya21/bfb` untuk otomasi tugas media sosial lewat browser Chrome sungguhan (puppeteer-core + stealth plugin). Saat ini baru Facebook yang diimplementasikan; Instagram, TikTok, dan Shopee masih placeholder di menu.

User menjalankan `bfb` di dalam folder kerja; semua data runtime dibaca dari / ditulis ke `process.cwd()`:

- `datas/accounts.csv` — `NO;UID;PASSWORD`
- `datas/contents.csv` — `NO;COOKIE;ROUTE;TYPE;IDFANSPAGE;PATH;CAPTION;TAG;SCHEDULE`
- `credentials/cookies.json` — `{ [uid]: CookieData[] }`
- `credentials/token.bfb` — token aktivasi
- `logs/audit.log` — audit log: satu baris per kejadian (`waktu ±offset | SUMBER | aksi | hasil | keterangan`), selalu di-append

File CSV **dipisah titik koma** (`src/libs/csv-parser.ts`), dan header-nya harus cocok dengan interface di `src/types/global.ts`.

## Stack

- Runtime/tooling: **Bun saja** (`.bumrc` 1.4.2, `engines.bun` `>=1.4.2` di `package.json`), tidak butuh Node. Output build menargetkan Bun (`target: 'bun'`, shebang `#!/usr/bin/env bun`), hanya ESM. Node hanya dipakai CI rilis untuk `npm publish`.
- Bundler: bunup (`bunup.config.ts`, `splitting: false`), lalu `javascript-obfuscator` pada `dist/index.js`. Splitting dimatikan karena dengan target Bun, chunk bersama diawali pragma `// @bun` sehingga banner shebang jatuh ke baris 2 dan Bun menolaknya sebagai syntax error.
- Type check: `tsgo` (`@typescript/native-preview`), bukan `tsc`
- Lint: oxlint · Format: prettier + `prettier-plugin-organize-imports`
- Test: `bun test`
- Rilis: bumpp + GitHub Actions (npm + GitHub Packages)

## Perintah

```bash
bun install
bun run dev          # bunup --watch
bun run build        # bunup + obfuscate dist/index.js
bun run type-check   # tsgo --noEmit
bun run lint         # oxlint
bun run check        # check.ts — gagal jika ada import relatif
bun run docs         # docs.ts — mirror ulang dokumentasi resmi ke docs/ sesuai versi di .bumrc dan bun.lock
bun run format       # prettier --write
bun run test         # bun test
bun run test:coverage # bun test --coverage; gagal kalau satu file yang di-import test di bawah 100% baris / fungsi (bunfig.toml)
bun run clean        # hapus dist dan node_modules
bun run auto         # clean + install + build
bun run release      # bumpp --commit --push --tag
bun run mock         # json-server dari mock/ (area coretan lokal, tidak di-commit)
```

Pre-commit hook ada di `.githooks/pre-commit` dan menjalankan `lint && type-check && check`; `bun install` memasangnya lewat script `prepare` (`git config core.hooksPath .githooks`). Jangan kembali ke `simple-git-hooks`: postinstall-nya memanggil `node ./postinstall.js` langsung, sehingga `bun install` gagal (exit 126) di mesin tanpa Node, dan `[run] bun = true` tidak berlaku untuk script lifecycle dependency. CI (`.github/workflows/ci.yml`) menjalankan `install --frozen-lockfile`, type-check, lint, check, `test:coverage`, build, dan `bun publish --dry-run` di ubuntu/macos/windows.

## Struktur

```
src/
  index.ts        entry: parsing argumen (version/help/-v/-h); flag tidak dikenal → pesan + exit 1; tanpa argumen membuka menu
  commands/       menu.ts (loop interaktif utama), help.ts, version.ts
  core/           alur otomasi browser: facebook.ts (posting), cookie.ts (sinkronisasi cookie / login manual)
  libs/           satu fungsi kecil per file (nama file kebab-case, export camelCase)
  types/global.ts Account dan Content (bentuk baris file CSV)
  utils/constant.ts VERSION, DRIVER_VERSION, MOTIVATIONS
tests/            unit/, integration/, endpoint/; file NNN-nama.test.ts, nomor mulai 001 per folder
.githooks/        pre-commit hook (dipasang oleh script prepare lewat core.hooksPath)
check.ts          pengecek import relatif (src/, tests/, script root); memakai Bun.Transpiler.scanImports
docs.ts           generator docs/ dari tag rilis resmi tiap dependency
clean.ts          script pembersihan
```

`mock/`, `backups/`, `temp/`, `workspaces/` adalah area coretan lokal yang di-gitignore — jangan di-commit dan jangan diandalkan.

## Tooling agent

Repo ini disiapkan untuk dua agent: Claude Code dan Antigravity (`agy`).

```
skills/            6 skill siklus proyek (bfb-spec, bfb-plan, bfb-build, bfb-test, bfb-review, bfb-ship) + bfb-commit, bfb-prepare
.claude/skills  -> ../skills     tempat Claude mencari skill
.agents/skills  -> ../skills     tempat Antigravity mencari skill
docs/              dokumentasi resmi offline per teknologi, sesuai versi yang dipakai (bun.md, bunup.md, puppeteer.md, puppeteer-extra.md)
architecture/      hasil tiap skill /bfb-<verb>, satu file per verb (SPEC.md, PLAN.md, BUILD.md, TEST.md, REVIEW.md, SHIP.md, COMMIT.md, PREPARE.md)
graphify-out/      knowledge graph repo; hanya GRAPH_REPORT.md, graph.html, graph.json yang di-commit
```

Siklus proyek, satu skill per tahap:

```
  DEFINE          PLAN           BUILD          VERIFY         REVIEW          SHIP
 ┌──────┐       ┌──────┐       ┌──────┐       ┌───────┐       ┌──────┐       ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test  │ ───▶ │  QA  │ ───▶ │  Go  │
 │Refine│       │  PRD │       │ Impl │       │ Debug │       │ Gate │       │ Live │
 └──────┘       └──────┘       └──────┘       └───────┘       └──────┘       └──────┘
 /bfb-spec      /bfb-plan      /bfb-build     /bfb-test      /bfb-review     /bfb-ship
```

- Keenam skill adalah fork dari `addyosmani/agent-skills` pada commit `2686b62`. Setiap `SKILL.md` berisi bagian khusus bfb di atas, lalu `# Method` yang di-vendor dari skill upstream (`spec-driven-development`, `planning-and-task-breakdown`, `incremental-implementation`, `test-driven-development`, `code-review-and-quality`, `shipping-and-launch`). Bagian bfb menang setiap kali keduanya bertentangan.
- Saat user menjalankan skill, kerjakan setiap langkahnya persis seperti tertulis, walaupun terlihat tidak perlu (mis. `graphify update` saat kode tidak berubah). Langkah hanya boleh dilewati kalau skill itu sendiri yang menyuruh melewatinya.
- Setiap folder skill hanya berisi satu `SKILL.md`, tanpa subfolder. Checklist yang dirujuk skill (Definition of Done, Testing Patterns, Security/Performance/Accessibility Checklist, referensi gaya commit) ditempel di bagian `# Reference` di akhir `SKILL.md`.
- `.claude/` dan `.agents/` hanya berisi symlink lokal dan di-gitignore; cara membuatnya ada di `README.md` bagian "Agent Tooling". Kalau menambah symlink atau server MCP baru, perbarui instruksi di README juga.
- Edit skill hanya di `skills/`, jangan pernah menyalin skill ke path symlink. Untuk memperbarui `# Method`, salin ulang dari upstream dan perbarui hash commit-nya.
- `docs/` adalah mode offline dari dokumentasi resmi stack. Baca dari sana sebelum memakai API Bun, bunup, Puppeteer, atau puppeteer-extra, dan jangan mengarang API yang tidak ada di sana. Setiap file dibuat oleh `bun run docs` (`docs.ts`) dari repo resminya **pada tag rilis yang sama dengan versi yang dipakai bfb**: versi Bun dibaca dari `.bumrc`, versi paket dari `bun.lock` (saat ini Bun `bun-v1.4.2`, bunup `v0.16.32`, puppeteer `puppeteer-core-v24.43.1`, `puppeteer-extra@3.3.6`, `puppeteer-extra-plugin-stealth@2.11.2`). Versi, tag, dan commit tercatat di header tiap file. Jangan edit tangan; jalankan ulang `bun run docs` setiap kali versi naik.
- Setiap server MCP gitmcp (MCP untuk dokumentasi resmi dari repo GitHub) punya pasangan satu file di `docs/`, dan sebaliknya: `bun` ↔ `docs/bun.md`, `bunup` ↔ `docs/bunup.md`, `puppeteer` ↔ `docs/puppeteer.md`, `puppeteer-extra` ↔ `docs/puppeteer-extra.md` (satu repo GitHub, jadi satu server dan satu file untuk `puppeteer-extra` dan stealth plugin-nya). Menambah atau menghapus salah satunya berarti menambah atau menghapus pasangannya, termasuk entri di `docs.ts`. Server MCP yang bukan gitmcp tidak butuh file docs. Catatan: gitmcp membaca branch default repo (versi terbaru), sedangkan `docs/` terkunci ke versi bfb; kalau keduanya berbeda, `docs/` yang benar.
- Server MCP cukup diedit di `.mcp.json`; `.agents/mcp_config.json` adalah symlink ke file itu. Symlink hanya bisa karena semua server berbentuk stdio (`command` + `args`), satu-satunya skema yang sama di Claude dan Antigravity. Server remote dibungkus `bunx --bun mcp-remote@0.14.3 <url>` (versi di-pin, sama di README); jangan pakai `type`/`url` (Claude) atau `serverUrl` (Antigravity). `--bun` wajib, karena tanpa itu `mcp-remote` jalan di Node via asdf dan gagal kalau versi Node belum di-set.
- `.agents/mcp_config.json` adalah jalur MCP per-proyek resmi untuk Antigravity, tapi sejak agy 1.1.3 file itu tidak dimuat karena bug ([google-antigravity/antigravity-cli#60](https://github.com/google-antigravity/antigravity-cli/issues/60)); diuji di 1.2.14 lewat `/mcp` dengan symlink, file biasa, dan format `serverUrl`, tidak ada yang muncul. Symlink tetap dipertahankan supaya langsung jalan begitu bug diperbaiki.
- Sementara itu, `bun`, `bunup`, `puppeteer`, dan `puppeteer-extra` untuk agy dipasang di config global `~/.gemini/config/mcp_config.json` lewat `agy mcp add <nama> bunx -- --bun mcp-remote@0.14.3 <url>`. Jangan pakai bentuk HTTP bawaan agy (`serverUrl`) untuk server gitmcp: di 1.2.14 gagal dengan `notifications/roots/list_changed: Bad Request`.
- `.graphifyignore` mengecualikan symlink, `docs/`, output build, dan data runtime dari graph.
- Setelah `graphify update .`, label komunitas dibuat ulang dengan `graphify label . --backend=claude-cli`; `update` sendiri mengembalikan nama komunitas ke default.
- `/bfb-prepare` merapikan repo: memperbarui `TODO.md`, menyelaraskan memory Claude dan Antigravity, menghapus yang usang dan sisa debug, memperbarui docs dan skills, menjalankan format/lint/type-check/check/test/build tanpa bertanya, lalu `graphify update` dan label.
- `bunfig.toml` berisi `[run] bun = true`: `bun run` memetakan `node` ke Bun, termasuk shebang `#!/usr/bin/env node` milik oxlint, tsgo, prettier, dan javascript-obfuscator. Jangan hapus, karena tanpa itu semua script (dan pre-commit hook) butuh Node.
- `CLAUDE.md` hanya berisi `@AGENTS.md`; edit file ini, bukan itu.

## Alur runtime

1. `menu()` mencatat awal sesi ke `logs/audit.log`, lalu memperbarui status di setiap loop: `checkInit()` (file wajib ada), `checkDriver()` (Chrome `DRIVER_VERSION` ada di `~/.cache`), `checkActivation()` (token diverifikasi ke `https://bfb.blackfriday.my.id/api/v1/check`).
2. Menu `0` → `initProject()`, `96` → `downloadDriver()`, `97` → `activateBfb()`. Menu `1` (Rawat facebook) dan `95` (Sinkronisasi cookies) terkunci sampai setup selesai.
3. `core/*` membuka browser headful lewat `launchBrowser()` (`addExtra(puppeteerCore)` + `StealthPlugin`, gagal dengan `'Driver belum terpasang'` kalau driver tidak ada), lalu memproses baris CSV lewat `runBrowserRows()`: setiap baris berjalan di **browser context sendiri** yang ditutup setelah baris selesai, jadi cookie, localStorage, IndexedDB, dan service worker satu akun tidak pernah sampai ke baris berikutnya. Kalau context gagal ditutup, proses dihentikan. Context dan page baru dibuka saat task memanggil `openPage()`, setelah pemeriksaan awal lolos, sehingga baris yang ditolak tidak membuka page (dan tidak berlomba dengan stealth plugin yang sedang menyiapkan page). Cookie diset lewat `page.browserContext()`, bukan `browser`. Setelah semua baris, browser ditutup dan ringkasan (berhasil/dilewati/gagal) ditahan sampai user menekan Enter, lalu kembali ke menu.
4. Setiap pilihan menu (0–99, termasuk input tidak valid dan menu terkunci) menghasilkan satu baris hasil di `logs/audit.log`; menu 1 dan 95 menambahkan `mulai`, satu baris per konten/akun (`NO <no> UID <uid>`), dan `selesai`/`dihentikan` dengan ringkasan yang sama dengan layar. `logs/` dibuat otomatis (`0700`/`0600`, ditambahkan ke `.gitignore`) kalau belum ada, termasuk di folder kerja lama; `checkInit` tidak memeriksanya.
5. Error di satu baris dicatat lalu loop lanjut ke baris berikutnya; browser yang terputus (`browser.connected` false) menghentikan loop dan kembali ke menu; tab yang ditutup saja hanya menggagalkan baris itu. `core/*` tidak boleh memanggil `process.exit`. Kombinasi `ROUTE`/`TYPE` divalidasi oleh `contentStatus()` sebelum page dibuka; saat ini hanya `PERSONAL` + `POST` yang didukung, sisanya dilewati.

## Konvensi kode

- **Selalu pakai alias `@/`** (`@/libs/...`, `@/core/...`). Import relatif (`./`, `../`) ditolak oleh `check.ts` dan pre-commit hook.
- Named export dikumpulkan di bawah file: `export { foo };`. Import khusus tipe memakai `import type` / `type X` (`verbatimModuleSyntax`).
- Return type eksplisit pada fungsi yang di-export (`isolatedDeclarations` aktif).
- Format: tab, single quote, titik koma, trailing comma, `printWidth` 300 (baris panjang tidak masalah; jangan dipecah manual). Jalankan `bun run format` sebelum commit.
- TS strict + `noUncheckedIndexedAccess`: tangani `undefined` saat mengakses indeks array.
- **Teks untuk user dalam Bahasa Indonesia**, singkat, huruf kecil setelah kata pertama (mis. `'Cookie tidak valid'`, `'Masih dalam tahap pengembangan'`). Layar menu memakai pola `readlineInterface.pause()` → `console.clear()` → pesan → `applyDelay(1000)` → `console.clear()` → `resume()`. Jeda 1 detik itu disengaja oleh user; jangan dihapus atau dipercepat.
- Log per baris di `core/*` dibungkus separator `'==============================='`; sukses/gagal memakai `chalk.green` / `chalk.red`.
- Selector puppeteer memakai locator: `page.locator('text=...')` atau `xpath=//...`, `.waitHandle().catch(() => null)`, lalu cek null dan lempar `Error` dengan pesan Bahasa Indonesia. Default timeout di `facebook.ts` 5000 ms, navigasi 30000 ms. `postFeed` membuka Facebook dengan `waitUntil: 'networkidle2'` **dengan sengaja** (keputusan user): kalau jaringan tidak stabil dan navigasi melewati 30 detik, baris gagal dengan "Facebook tidak terbuka", dan operator yang harus memastikan koneksinya stabil. Jangan diganti `domcontentloaded` atau diperpanjang.
- **Jangan kirim fungsi ke browser** (`page.evaluate(fn)`, `page.waitForFunction(fn)`, `$eval`, `ElementHandle.evaluate`). Build rilis di-obfuscate, dan obfuscator mengganti string di dalam fungsi itu dengan pemanggilan dekoder yang hanya ada di proses Bun, jadi di browser gagal dengan `ReferenceError` (dulu alasan `src/ignore/` dikeluarkan dari obfuscate). Taruh kondisinya di selector (XPath `not(@aria-disabled="true")` + locator), atau kalau terpaksa kirim kodenya sebagai string.
- Input tersembunyi (token/password) memakai `hideQuestion()`, bukan readline. Tombol Esc sendirian tidak boleh menelan Enter atau karakter berikutnya; hanya `ESC [` / `ESC O` yang dianggap awal escape sequence. Handler `data` harus memproses setiap potongan input **per karakter**: Bun bisa menggabungkan beberapa tombol (ketikan cepat, paste) ke satu potongan, dan membandingkan potongan utuh dengan `'\r'` membuat prompt menggantung.
- Dependency baru yang dipakai saat runtime juga harus ditambahkan ke `external` di `bunup.config.ts`.
- `overrides` di `package.json` memaksa versi yang sudah di-patch untuk dependency transitif yang rentan (`ws`, `ip-address`, `brace-expansion`, `basic-ftp`). Override hanya berlaku di repo ini (dev, CI, build), bukan di instalasi user. Setelah `bun update`, jalankan `bun audit --prod`; `extract-zip` 2.0.1 masih punya advisory tanpa versi perbaikan (diterima: hanya mengekstrak Chrome dari Google lewat HTTPS).
- Sebelum mengetik password di halaman login, panggil `ensurePasswordFocus(page)`; password tidak boleh diketik ke kolom yang fokusnya tidak pasti.
- Data sensitif (`cookies.json`, `token.bfb`) ditulis lewat `writeSecretFile()`: file temp baru `0600` (`wx`) lalu rename, jadi tidak pernah terbaca pihak lain walau sesaat; folder `0700`. File yang rusak dilaporkan sebagai error, tidak pernah ditimpa diam-diam.
- Key `__proto__`, `constructor`, dan `prototype` ditolak sebagai UID atau header CSV (`isReservedKey()`).
- **Audit log:** tulis lewat `createAuditLogger(source)` (`src/libs/write-audit-log.ts`); jangan menulis ke `logs/` langsung. Penulis tidak pernah melempar error: gagal tulis menampilkan satu peringatan lalu log mati sampai sesi berikutnya. **Tidak pernah dicatat:** password, token, isi cookie, caption, dan input mentah (input menu tidak valid dicatat tanpa nilainya, lewat `describeMenu`). `core/*` tidak tahu nomor menu: menu meneruskan logger yang sudah terikat ke sumbernya beserta nama aksinya (`facebook(log, action)`, `cookies(readline, log, action)`). Task dan fungsi menu yang hasilnya dicatat mengembalikan `Outcome { ok, message }` dengan pesan yang sama dengan layar.
- `runBrowserRows(browser, rows, task, onRow)`: task mengembalikan teks alasan untuk baris yang dilewati, atau tidak mengembalikan apa-apa kalau berhasil; `onRow(outcome, row)` (boleh async, ditunggu) dipanggil sekali per baris, ditambah satu `failed` untuk context yang gagal ditutup. Hasil baris dipetakan ke kata log lewat `logRowOutcome`.
- `coverageThreshold` di `bunfig.toml` ditulis sebagai angka tunggal (`1.0`). Kalau ambang baris dan fungsi perlu dibedakan, kuncinya `lines`/`functions` (Bun 1.4+); `line`/`function` dari Bun 1.3 diabaikan tanpa peringatan, jadi ambangnya diam-diam mati. Setelah mengubah ambang atau menaikkan Bun, buktikan dengan menambah sementara fungsi tanpa test: `bun run test:coverage` harus exit 1.
- `bunx` tidak ikut `[run] bun = true`; untuk menjalankan CLI ber-shebang Node di luar `bun run`, pakai `bunx --bun`.

## Versi & rilis

- `bun run release` menjalankan `bumpp package.json src/utils/constant.ts`, jadi `VERSION` di `constant.ts` ikut naik bersama `package.json` dalam commit `chore: release vX.Y.Z` yang sama. Tidak perlu commit terpisah untuk `constant.ts`.
- Push tag `v*` memicu `.github/workflows/release.yml` (type-check, lint, test, build, changelogithub, publish).
- Publish ke npmjs sengaja tetap memakai `npm publish` di `release.yml` (satu-satunya tempat Node masih dipakai). npm memakai trusted publishing (OIDC) dengan provenance, terbukti di registry untuk 0.3.0–0.4.0, tanpa token tersimpan. `bun publish` (dicek sampai 1.4.2) tidak mendukung OIDC, hanya `NPM_CONFIG_TOKEN`, jadi jangan dipindah ke Bun sampai Bun mendukungnya.
- `release.yml` dan `ci.yml` memakai action yang di-pin ke SHA commit (komentar menyebut versinya), Bun dari `.bumrc`, npm dan changelogithub versi pasti. Hanya job `release` yang punya `id-token: write`; changelog berjalan di job terpisah dengan `contents: write` saja. Saat menaikkan versi action atau tool, ganti SHA/versinya secara eksplisit, jangan kembali ke tag bergerak atau `latest`.
- `DRIVER_VERSION` mengunci build Chrome; mengubahnya memaksa user memasang ulang driver (menu 96).

## Pesan commit

Format `type(scope): description` — huruf kecil, kalimat perintah, tanpa titik di akhir, satu baris. Tanpa `!`, tanpa `BREAKING CHANGE:`, tanpa trailer co-author. Scope yang dipakai di repo ini: `core`, `lib`, `command`, `constant`, `util`, `config`, `package`, `type`, `src`, `vcs`, `npm`, `lock`, `workflow`, `project`, `test`, `docs`/`howto`, `architecture`, `agents`, `skill`, `mcp`, `graph` (daftar lengkap dan area tiap scope ada di `skills/bfb-commit/SKILL.md`). Rilis seluruh repo: `chore: release vX.Y.Z`. Saat diminta commit, pakai skill `/bfb-commit`: perubahan dipecah per kategori, pesan dalam bahasa Inggris, tanpa co-author.

## Testing

Test ada di `tests/unit/` (logika murni, tanpa I/O), `tests/integration/` (file system, beberapa modul dengan fake), `tests/endpoint/` (kontrak API aktivasi); nama file `NNN-nama.test.ts`, nomor mulai `001` di setiap folder. Satu file per modul atau kontrak; test baru memakai nomor berikutnya di foldernya. Alur browser di `core/` tidak bisa dites otomatis terhadap Facebook: logika keputusannya ada di `libs/` (`contentStatus`, `runBrowserRows`) dan dites dengan browser palsu. Test yang bergantung pada mode file POSIX di-skip di Windows. `bun test` berjalan dengan `TZ=UTC`, jadi test waktu menyuntikkan offset (`formatAuditLine(entry, offsetMinutes)`). Jangan menaruh file `*.test.ts` coba-coba di `temp/` atau folder lain di repo: `bun test` menemukannya dan ikut menjalankannya. `hideQuestion` dites lewat stream palsu (parameter `stdin`/`stdout`), termasuk input yang datang sekaligus dalam satu potongan; Ctrl+C dites dengan `spyOn(process, 'exit')`. Exit code CLI dites dengan menjalankan `src/index.ts` lewat `Bun.spawn` (`integration/007-cli-entry`); test seperti itu tidak menambah angka coverage, karena coverage hanya menghitung file yang di-import proses test.

## Catatan

- Jangan pernah commit isi `datas/`, `credentials/`, cookie, atau token.
- `dist/` sudah di-obfuscate; debug dari `src/` atau pakai `bunup` tanpa langkah obfuscate.
- `src/libs/asset-checker.ts` tidak dipakai; lihat `TODO.md`.
