---
name: bfb-prepare
description: Rapikan repo bfb sebelum commit atau sesi berikutnya — perbarui TODO.md, selaraskan memory Claude dan Antigravity, hapus yang usang dan sisa debug, perbarui docs dan skills, jalankan formatter, linter, test, dan build, lalu graphify update dan label. Gunakan saat user meminta prepare atau bersih-bersih repo.
version: 1.0.0
---

# /bfb-prepare

Instruksi dari user:

- Update temuan dan hapus yang sudah selesai di `TODO.md`.
- Selaraskan memory hasil Antigravity (agy/Gemini) dengan memory hasil Claude, karena user memakai dua agent.
- Hapus yang sudah usang dan sudah tidak relevan.
- Hapus sisa debug.
- Update docs, untuk developer dan untuk AI agent.
- Update skills.
- Update pengetahuan kamu.
- Jalankan linter, formatter, test, dan build, dan pastikan tidak ada error. **Special case: langsung jalankan tanpa minta izin.**
- `graphify update` dan label.

Kerjakan berurutan seperti di bawah. Mulai dengan membaca `AGENTS.md`, lalu `git status`, `git diff`, dan `git log --oneline -20` untuk tahu apa yang berubah sejak commit terakhir. Pakai `graphify query` untuk orientasi sebelum grep.

## 1. TODO.md

- Cek setiap temuan terhadap kode saat ini, jangan terhadap ingatan. Temuan yang sudah diperbaiki **dihapus**, bukan dicentang.
- Perbarui referensi `file:line` yang bergeser dan deskripsi yang tidak akurat lagi.
- Tambahkan temuan baru dari pekerjaan sejak prepare terakhir, pada tingkat keparahan yang sesuai.
- `TODO.md` hanya berisi yang masih rusak atau belum diputuskan. Rencana kerja masuk `architecture/PLAN.md`.

## 2. Selaraskan memory Claude dan Antigravity

Kedua agent tidak bisa membaca percakapan satu sama lain. Satu-satunya jalur serah terima yang dibaca keduanya adalah repo ini.

| Agent       | Lokasi memory                                                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code | `~/.claude/projects/-home-pinc-Developer-bfb/memory/`, dengan indeks di `MEMORY.md` dan satu fakta per file                                                                                                 |
| Antigravity | Knowledge Items di `~/.gemini/antigravity-cli/knowledge/` (`index.md`, `archive/`), plus artefak per percakapan di `~/.gemini/antigravity-cli/brain/<conversation-id>/` untuk sesi terbaru di workspace ini |

Aturannya:

0. Kalau salah satu sisi kosong, atau isi keduanya tidak ada yang berbeda, **lewati langkah ini**. Jangan membuat memory, rule, atau file konfigurasi baru di sisi mana pun hanya untuk "menyamakan".
1. Baca keduanya. Kumpulkan fakta yang hanya ada di salah satu sisi.
2. **Fakta tentang repo** (konvensi, keputusan, jebakan, perintah) dipindah ke `AGENTS.md` atau skill yang relevan, lalu dihapus dari memory privat. Yang ditulis di repo terbaca oleh kedua agent.
3. **Preferensi user** (gaya kerja, koreksi, hal yang disukai atau tidak) yang ada di satu memory tapi bertentangan atau hilang di memory lain yang sudah berisi, disamakan isinya.
4. Kalau kedua sisi bertentangan, cek ke kode atau ke riwayat. Yang terverifikasi dan lebih baru yang menang. Kalau tidak bisa diverifikasi, tanya user.
5. Hapus memory yang sudah salah atau tidak relevan di kedua sisi. Jangan menyalin isi percakapan mentah.

## 3. Hapus yang usang

- Kode, file, script, dependency, atau konfigurasi yang tidak dipakai lagi. Pastikan dulu tidak ada yang mereferensikannya (`graphify query`, lalu grep) dan tidak ada di `architecture/PLAN.md`. Kalau ragu apakah sesuatu masih direncanakan, tanya dulu sebelum menghapus.
- Klaim di `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, skill, atau `architecture/*.md` yang sudah tidak benar.
- File di `architecture/` yang menggambarkan pekerjaan yang sudah lama selesai dan tidak lagi jadi serah terima.

## 4. Hapus sisa debug

- `console.log`, `console.debug`, dan `console.dir` yang mencetak variabel untuk debugging. **Jangan** menghapus `console.log` yang merupakan teks UI untuk user (pesan Bahasa Indonesia, separator `===`, menu).
- `debugger`, kode yang di-comment-out, `// TODO` sementara yang sudah selesai.
- `test.only`, `test.skip`, dan `describe.only` di `tests/`.
- File coba-coba di root atau `src/` yang tidak dimaksudkan untuk di-commit. `mock/`, `backups/`, `temp/`, dan `workspaces/` memang area coretan yang di-gitignore; biarkan.
- Password, cookie, atau token yang tercetak ke log.

## 5. Update docs

- **Untuk developer:** `README.md` (instalasi, pemakaian, bagian "Agent Tooling") dan `CONTRIBUTING.md`.
- **Untuk AI agent:** `AGENTS.md`, supaya struktur, perintah, alur runtime, konvensi, dan tooling agent sesuai kenyataan.
- **`docs/` (mirror dokumentasi resmi):** bandingkan versi di header tiap file dengan `.bumrc` dan `bun.lock`. Kalau ada yang berbeda, jalankan `bun run docs`. Jangan edit file di `docs/` dengan tangan.
- Jaga pasangan server gitmcp di `.mcp.json` dan file di `docs/` tetap 1:1. Kalau server ditambah atau dihapus, perbarui juga `docs.ts` dan instruksi `agy mcp add` di `README.md`.

## 6. Update skills

- Periksa bagian khusus bfb di setiap `skills/bfb-*/SKILL.md`: perintah, path, file output, dan aturan harus sesuai repo saat ini.
- Jangan edit `# Method` atau `# Reference` yang di-vendor dengan tangan. Kalau upstream (`addyosmani/agent-skills`) perlu diikuti, salin ulang dari commit baru dan perbarui hash-nya di skill dan di `AGENTS.md`.
- Setiap folder skill hanya berisi `SKILL.md`. Skill baru harus dicatat di `AGENTS.md`.

## 7. Update pengetahuan kamu

- Hal baru yang dipelajari di sesi ini tentang repo masuk ke `AGENTS.md` atau skill. Hal tentang user masuk ke memory kedua agent (langkah 2).
- Kalau ada koreksi dari user di sesi ini, simpan sebagai memory feedback beserta alasannya.

## 8. Formatter, linter, test, build

Jalankan langsung, tanpa bertanya. `bunfig.toml` berisi `[run] bun = true`, jadi `bun run` biasa menjalankan semua tool di Bun tanpa perlu Node:

```bash
bun run format
bun run lint
bun run type-check
bun run check
bun run test
bun run build
```

- Perbaiki setiap error sampai semuanya hijau. Jangan pernah membungkam error dengan `// @ts-ignore`, `oxlint-disable`, atau menghapus test.
- Kalau ada error yang tidak bisa diperbaiki tanpa keputusan user, hentikan dan laporkan output persisnya.
- `dist/` hasil build di-gitignore; tidak perlu dihapus.

## 9. Graphify update dan label

1. Jalankan `graphify update .` untuk mengekstrak ulang kode ke `graphify-out/graph.json`.
2. Beri label komunitas: baca daftar komunitas di `graphify-out/GRAPH_REPORT.md`, beri tiap komunitas nama 2–5 kata yang menjelaskan isinya (misalnya "Menu dan Otomasi Browser"), lalu tulis ulang report dan `graph.json` dengan label itu. Ikuti langkah "Label communities" di skill `graphify`. Kalau skill itu tidak tersedia di agent ini, jalankan `graphify cluster-only .` supaya graphify memberi nama sendiri.
3. Pastikan nama komunitas di `GRAPH_REPORT.md` bukan lagi `Community N` atau sekadar nama file.

## 10. Ringkasan

Tutup dengan laporan singkat per langkah: temuan yang dihapus atau ditambah di `TODO.md`, memory yang dipindah atau diselaraskan, apa yang dihapus sebagai usang atau sisa debug, docs dan skills yang diubah, hasil setiap perintah di langkah 8, dan jumlah node, edge, dan komunitas dari graphify.

Tulis ringkasan yang sama ke `architecture/PREPARE.md`, menggantikan isi sebelumnya.

**Jangan commit.** Sarankan `/bfb-commit` kalau user ingin commit.
