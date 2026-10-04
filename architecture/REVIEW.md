# Review: bilingual Facebook UI (Inggris & Indonesia)

Ditulis lewat `/bfb-review` pada 2026-10-04. Cakupan: implementasi dukungan dwibahasa (Bahasa Inggris & Bahasa Indonesia) pada alur sinkronisasi cookie (`src/core/cookie.ts`) dan alur posting feed (`src/core/facebook.ts`), modul selektor baru (`src/libs/facebook-selectors.ts`), serta unit test (`tests/unit/011-facebook-selectors.test.ts`).

## Verdict

**Approve.** Perubahan bersih, terisolasi dengan baik, dan langsung meningkatkan reliabilitas otomasi untuk akun Facebook berbahasa Indonesia tanpa mengorbankan akun berbahasa Inggris. Seluruh checklist mekanis bfb terpenuhi dan cakupan test tetap 100%.

## Checklist bfb (mekanis)

| Cek                                                 | Hasil                                                |
| :-------------------------------------------------- | :--------------------------------------------------- |
| Import relatif                                      | tidak ada (`bun run check` lolos)                    |
| Loop browser di `core/*` di luar `runBrowserRows()` | tidak ada; alur tetap menggunakan `runBrowserRows()` |
| `process.exit` di `core/*`                          | tidak ada                                            |
| Password/cookie/token tercetak ke console           | tidak ada                                            |
| Tulis data sensitif tanpa `0600`                    | tidak ada perubahan penulisan file kredensial        |
| Header CSV vs `src/types/global.ts`                 | cocok, tidak ada perubahan CSV                       |
| Dependency runtime vs `external` bunup              | tidak ada dependency runtime baru                    |
| `VERSION` vs `package.json`                         | `v0.5.1` = `0.5.1`                                   |
| Teks untuk user bukan Bahasa Indonesia              | seluruh pesan layar tetap Bahasa Indonesia konsisten |
| Klaim `AGENTS.md` / skill yang jadi salah           | tidak ada; arsitektur tetap sesuai                   |

## Review Lima Sumbu

### 1. Correctness

- **Kesesuaian Spec:** Seluruh elemen UI Facebook yang diidentifikasi pada `architecture/SPEC.md` (caption trigger, create post, next button, post preview, publish post, login continue, login fresh, forgotten password) telah dipetakan ke selektor dwibahasa (EN & ID).
- **Penanganan Edge Case:** Frasa teks Facebook yang memuat nama akun (misal: "What's on your mind, Billy?" atau "Apa yang Anda pikirkan, Billy?") tertangani dengan baik berkat penggunaan fungsi XPath `contains()`.
- **Obfuscator Safety:** Tidak ada fungsi yang dikirim ke browser (`page.evaluate` atau sejenisnya). Kondisi tombol aktif (`not(@aria-disabled="true")`) tetap berada di XPath, sehingga tidak rentan terhadap kerusakan deobfuscation runtime.

### 2. Readability & Simplicity

- Selektor terpusat di `src/libs/facebook-selectors.ts` dengan kamus `SELECTORS` bertipe ketat `Record<FacebookSelectorName, string>`.
- Pemanggilan di `src/core/cookie.ts` dan `src/core/facebook.ts` ringkas dan deklaratif lewat `facebookSelector('<key>')`.
- Total baris baru sangat minim (19 baris di lib, 65 baris di unit test), mematuhi prinsip _ponytail_ (perubahan paling minimal yang menyelesaikan masalah mendasar).

### 3. Architecture

- Struktur mengikuti pemisahan tanggung jawab standar bfb: logika murni pendefinisian selektor di `src/libs/facebook-selectors.ts`, sedangkan eksekusi otomasi browser di `src/core/`.
- Import menggunakan alias `@/` tanpa import relatif.
- Ambang coverage 1.0 pada `bunfig.toml` tetap terpenuhi 100% untuk modul baru di `src/libs/`.

### 4. Security

- Nilai selektor merupakan konstanta statis tanpa interpolasi input pengguna, sehingga tidak menimbulkan risiko injeksi XPath.
- Tidak ada password, token, atau informasi akun yang dicatat ke konsol atau log audit.

### 5. Performance

- Selektor XPath dievaluasi secara efisien oleh engine browser Chromium bawaan Puppeteer.
- Tidak ada loop atau polling tambahan di luar mekanisme timeout bawaan `page.locator().waitHandle()` dan `page.waitForSelector()`.

## Temuan

### Critical

Tidak ada.

### Important

Tidak ada.

### Suggestion

1. **Verifikasi Live Akun Operator:** Pastikan operator melakukan uji coba langsung di browser headful menggunakan akun nomor `53` (`workspaces/datas/accounts.csv`) untuk mengonfirmasi bahwa variasi DOM Facebook terkini cocok dengan selektor yang disiapkan.

## Verifikasi Akhir

- `bun run type-check`: 0 error.
- `bun run lint`: 0 warning, 0 error (oxlint).
- `bun run check`: 0 relative import.
- `bun run test:coverage`: 144 pass (100% lines & functions).
- `bun run build`: build production `dist/index.js` sukses ter-obfuscate dan berjalan normal.
