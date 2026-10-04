# bfb

Bot for billy

## Installation

```bash
bun add --global @rasvanjaya21/bfb
```

## Usage

Run `bfb` inside your working folder; all data is read from there.

```bash
bfb                        # interactive menu
bfb help                   # usage guide (also --help, -h)
bfb version                # version (also --version, -v)
bfb -b 1                   # run menu 1 (Rawat facebook) for every row of datas/contents.csv
bfb -b 95 -e 1             # run menu 95 (Sinkronisasi cookies) for the account with NO 1 only
bfb -b 1 -e 2,3,1,99,21    # run menu 1 for the rows with those NO values
```

`-b`/`--bypass <menu>` runs menu `1` or `95` directly and exits when done; `-e`/`--explicit <NO[,NO...]>` limits it to the rows with those `NO` values and only works together with `-b`. Prompts such as `Simpan cookie? (y/N)` still appear.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
