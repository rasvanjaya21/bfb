# Prepare

Ditulis lewat `/bfb-prepare` pada 2026-10-04, setelah `bf1abd5` (`chore: release v0.5.0`). Cakupan sejak prepare sebelumnya: rilis v0.5.0 (percobaan pertama `release.yml`, hijau: npm dengan provenance, GitHub Packages, GitHub Release), lalu `README.md` dikembalikan ke isi v0.4.0 karena ikut dipublikasikan ke npm. Bagian "Agent Tooling" pindah ke `CONTRIBUTING.md`, dan catatan operator lainnya masuk ke `AGENTS.md`. Semua langkah skill dijalankan.

## 1. TODO.md

- **Dihapus:** "`release.yml` belum pernah jalan". Rilis v0.5.0 (run 37184686043) membuktikan action yang di-pin, `npm publish` OIDC dengan provenance, publish ke GitHub Packages, dan job changelog terpisah. `ci.yml` termasuk `bun pm pack --dry-run` hijau di ketiga OS (run 37184684028, 37184686019).
- **Diperbarui:** item `mcp-remote` di config global agy sekarang merujuk ke `CONTRIBUTING.md`, bukan README.
- Temuan lain tidak berubah; kodenya sama dengan prepare sebelumnya. Total 11 item terbuka.

## 2. Memory Claude dan Antigravity

Dilewati (aturan 0): Knowledge Items agy masih kosong (hanya `knowledge.lock`), dan tidak ada artefak `brain/` baru sejak prepare sebelumnya.

## 3. Yang usang

- Rujukan "README bagian Agent Tooling" di `AGENTS.md`, `skills/bfb-prepare/SKILL.md`, dan `TODO.md` dipindah ke `CONTRIBUTING.md`.
- `architecture/BUILD.md`, `PLAN.md`, dan `SHIP.md` masih menyebut bagian README lama atau `bun publish --dry-run`. Dibiarkan, karena itu catatan pekerjaan yang sudah selesai, bukan instruksi.

## 4. Sisa debug

Tidak ada: tidak ada `console.debug`/`console.dir`, `debugger`, `.only`, atau file untracked.

## 5. Docs

- `README.md`: identik dengan tag `v0.4.0` (instalasi, pemakaian, contributing, lisensi).
- `CONTRIBUTING.md`: ditambah `### Agent Tooling` (symlink dan `agy mcp add` dengan `mcp-remote@0.14.3`), dipindah dari README.
- `AGENTS.md`: ditambah catatan dari README lama yang belum ada di sana, yaitu Bun >=1.4.2 wajib ada di `PATH` sejak 0.5.0, Windows mengabaikan mode `0700`/`0600`, dan audit log tidak dirotasi dan memuat UID. Juga aturan bahwa README hanya untuk pemakai paket. Format baris log, data yang tidak dicatat, izin file, `.gitignore`, dan peringatan gagal tulis sudah ada, jadi tidak ditambahkan lagi.
- `docs/`: versi masih cocok dengan `.bumrc` dan `bun.lock`, jadi `bun run docs` tidak dijalankan. Pasangan `.mcp.json` dan `docs/` tetap 1:1.
- Halaman npm 0.5.0 masih menampilkan README panjang, karena README terkunci per versi. README pendek baru muncul di rilis berikutnya.

## 6. Skills

`bfb-prepare` langkah 5: README hanya untuk pemakai paket, sedangkan "Agent Tooling" dan `agy mcp add` ada di `CONTRIBUTING.md`. Skill lain tidak merujuk ke README untuk setup. `# Method` dan `# Reference` tidak disentuh.

## 7. Pengetahuan

Keputusan "README = halaman paket, setara 0.4.0" adalah fakta repo dan sudah tercatat di `AGENTS.md`, jadi tidak ada memory baru.

## 8. Perintah

| Perintah             | Hasil                                     |
| -------------------- | ----------------------------------------- |
| `bun run format`     | exit 0                                    |
| `bun run lint`       | exit 0                                    |
| `bun run type-check` | exit 0                                    |
| `bun run check`      | exit 0                                    |
| `bun run test`       | exit 0, 135 pass, 0 fail, 20 file         |
| `bun run build`      | exit 0, bunup + obfuscate `dist/index.js` |

## 9. Graphify

`graphify update .` lalu `graphify label . --backend=claude-cli`: **847 node, 1022 edge, 52 komunitas**, semuanya berlabel. `bun run format` dijalankan lagi setelahnya.
