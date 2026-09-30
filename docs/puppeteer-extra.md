# puppeteer-extra documentation

- Version: **puppeteer-extra 3.3.6, puppeteer-extra-plugin-stealth 2.11.2**
- Source: https://github.com/berstend/puppeteer-extra at tags `puppeteer-extra@3.3.6` (commit `39248f1`) and `puppeteer-extra-plugin-stealth@2.11.2` (commit `2f4a357`)
- Mirrored: 2026-09-30

The package READMEs are the official documentation: `puppeteer-extra`, then `puppeteer-extra-plugin-stealth` and the README of every evasion it applies.

Complete official documentation for this exact version, mirrored for offline use. Not written by hand; regenerate it with `bun run docs` instead of editing it.

---

# puppeteer-extra [![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/berstend/puppeteer-extra/test.yml?branch=master&event=push)](https://github.com/berstend/puppeteer-extra/actions) [![Discord](https://img.shields.io/discord/737009125862408274)](https://extra.community) [![npm](https://img.shields.io/npm/v/puppeteer-extra.svg)](https://www.npmjs.com/package/puppeteer-extra) [![npm](https://img.shields.io/npm/dt/puppeteer-extra.svg)](https://www.npmjs.com/package/puppeteer-extra) [![npm](https://img.shields.io/npm/l/puppeteer-extra.svg)](https://www.npmjs.com/package/puppeteer-extra)

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra@3.3.6/packages/puppeteer-extra

> A light-weight wrapper around [`puppeteer`](https://github.com/GoogleChrome/puppeteer) and [friends](#more-examples) to enable cool [plugins](#plugins) through a clean interface.

<a href="https://github.com/berstend/puppeteer-extra"><img src="https://i.imgur.com/qtlnoQL.png" width="279px" height="187px" align="right" /></a>

## Installation

```bash
yarn add puppeteer puppeteer-extra
# - or -
npm install puppeteer puppeteer-extra

# puppeteer-extra works with any puppeteer version:
yarn add puppeteer@2.0.0 puppeteer-extra
```

## Quickstart

```js
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// That's it, the rest is puppeteer usage as normal 😊
puppeteer.launch({ headless: true }).then(async (browser) => {
	const page = await browser.newPage();
	await page.setViewport({ width: 800, height: 600 });

	console.log(`Testing adblocker plugin..`);
	await page.goto('https://www.vanityfair.com');
	await page.waitForTimeout(1000);
	await page.screenshot({ path: 'adblocker.png', fullPage: true });

	console.log(`Testing the stealth plugin..`);
	await page.goto('https://bot.sannysoft.com');
	await page.waitForTimeout(5000);
	await page.screenshot({ path: 'stealth.png', fullPage: true });

	console.log(`All done, check the screenshots. ✨`);
	await browser.close();
});
```

The above example uses the [`stealth`](/packages/puppeteer-extra-plugin-stealth) and [`adblocker`](/packages/puppeteer-extra-plugin-adblocker) plugin, which need to be installed as well:

```bash
yarn add puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker
# - or -
npm install puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker
```

If you'd like to see debug output just run your script like so:

```bash
DEBUG=puppeteer-extra,puppeteer-extra-plugin:* node myscript.js
```

### More examples

<details>
 <summary><strong>TypeScript usage</strong></summary><br/>

> `puppeteer-extra` and most plugins are written in TS,
> so you get perfect type support out of the box. :)

```ts
import puppeteer from 'puppeteer-extra';

import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(AdblockerPlugin()).use(StealthPlugin());

puppeteer.launch({ headless: false, defaultViewport: null }).then(async (browser) => {
	const page = await browser.newPage();
	await page.goto('https://bot.sannysoft.com');
	await page.waitForTimeout(5000);
	await page.screenshot({ path: 'stealth.png', fullPage: true });
	await browser.close();
});
```

> Please check this [wiki](https://github.com/berstend/puppeteer-extra/wiki/TypeScript-usage) entry in case you have TypeScript related import issues.

![typings](https://i.imgur.com/bNtuTOt.png 'Typings')

</details>

<details>
 <summary><strong>Playwright usage</strong></summary><br/>

[`playright-extra`](/packages/playwright-extra) with plugin support is available as well.

</details>

<details>
 <summary><strong>Multiple puppeteers with different plugins</strong></summary><br/>

```js
const vanillaPuppeteer = require('puppeteer');

const { addExtra } = require('puppeteer-extra');
const AnonymizeUA = require('puppeteer-extra-plugin-anonymize-ua');

async function main() {
	const pptr1 = addExtra(vanillaPuppeteer);
	pptr1.use(
		AnonymizeUA({
			customFn: (ua) => 'Hello1/' + ua.replace('Chrome', 'Beer'),
		}),
	);

	const pptr2 = addExtra(vanillaPuppeteer);
	pptr2.use(
		AnonymizeUA({
			customFn: (ua) => 'Hello2/' + ua.replace('Chrome', 'Beer'),
		}),
	);

	await checkUserAgent(pptr1);
	await checkUserAgent(pptr2);
}

main();

async function checkUserAgent(pptr) {
	const browser = await pptr.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto('https://httpbin.org/headers', {
		waitUntil: 'domcontentloaded',
	});
	const content = await page.content();
	console.log(content);
	await browser.close();
}
```

</details>

<details>
 <summary><strong>Using with <code>puppeteer-cluster</code></strong></summary><br/>

> [puppeteer-cluster](https://github.com/thomasdondorf/puppeteer-cluster) allows you to create a cluster of puppeteer workers and plays well together with `puppeteer-extra`.

```js
const { Cluster } = require('puppeteer-cluster');
const vanillaPuppeteer = require('puppeteer');

const { addExtra } = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const Recaptcha = require('puppeteer-extra-plugin-recaptcha');

async function main() {
	// Create a custom puppeteer-extra instance using `addExtra`,
	// so we could create additional ones with different plugin config.
	const puppeteer = addExtra(vanillaPuppeteer);
	puppeteer.use(Stealth());
	puppeteer.use(Recaptcha());

	// Launch cluster with puppeteer-extra
	const cluster = await Cluster.launch({
		puppeteer,
		maxConcurrency: 2,
		concurrency: Cluster.CONCURRENCY_CONTEXT,
	});

	// Define task handler
	await cluster.task(async ({ page, data: url }) => {
		await page.goto(url);

		const { hostname } = new URL(url);
		const { captchas } = await page.findRecaptchas();
		console.log(`Found ${captchas.length} captcha on ${hostname}`);

		await page.screenshot({ path: `${hostname}.png`, fullPage: true });
	});

	// Queue any number of tasks
	cluster.queue('https://bot.sannysoft.com');
	cluster.queue('https://www.google.com/recaptcha/api2/demo');
	cluster.queue('http://www.wikipedia.org/');

	await cluster.idle();
	await cluster.close();
	console.log(`All done, check the screenshots. ✨`);
}

// Let's go
main().catch(console.warn);
```

For using with TypeScript, just change your imports to:

```ts
import { Cluster } from 'puppeteer-cluster';
import vanillaPuppeteer from 'puppeteer';

import { addExtra } from 'puppeteer-extra';
import Stealth from 'puppeteer-extra-plugin-stealth';
import Recaptcha from 'puppeteer-extra-plugin-recaptcha';
```

</details>

<details>
 <summary><strong>Using with <code>chrome-aws-lambda</code></strong></summary><br/>

> If you plan to use [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) with the [`stealth`](/packages/puppeteer-extra-plugin-stealth) plugin, you'll need to modify the default args to remove the
> `--disable-notifications` flag to pass all the tests.

```js
const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra');
const puppeteerExtra = addExtra(chromium.puppeteer);

const launch = async () => {
	puppeteerExtra
		.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath,
			headless: chromium.headless,
		})
		.then(async (browser) => {
			const page = await browser.newPage();
			await page.goto('https://www.spacejam.com/archive/spacejam/movie/jam.htm');
			await page.waitForTimeout(10 * 1000);
			await browser.close();
		});
};

launch(); // Launch Browser
```

</details>

<details>
 <summary><strong>Using with <code>Kikobeats/browserless</code></strong></summary><br/>

> [Kikobeats/browserless](https://github.com/Kikobeats/browserless) is a puppeteer-like Node.js library for interacting with Headless production scenarios.

```js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const browserless = require('browserless')({ puppeteer });

const saveBufferToFile = (buffer, fileName) => {
	const wstream = require('fs').createWriteStream(fileName);
	wstream.write(buffer);
	wstream.end();
};

browserless.screenshot('https://bot.sannysoft.com', { device: 'iPhone 6' }).then((buffer) => {
	const fileName = 'screenshot.png';
	saveBufferToFile(buffer, fileName);
	console.log(`your screenshot is here: `, fileName);
});
```

</details>

---

## Plugins

#### 🔥 [`puppeteer-extra-plugin-stealth`](/packages/puppeteer-extra-plugin-stealth)

- Applies various evasion techniques to make detection of puppeteer harder.

#### 🏴 [`puppeteer-extra-plugin-recaptcha`](/packages/puppeteer-extra-plugin-recaptcha)

- Solves reCAPTCHAs and hCaptchas automatically, using a single line of code: `page.solveRecaptchas()`.

#### [`puppeteer-extra-plugin-adblocker`](/packages/puppeteer-extra-plugin-adblocker)

- Very fast & efficient blocker for ads and trackers. Reduces bandwidth & load times.

#### [`puppeteer-extra-plugin-devtools`](/packages/puppeteer-extra-plugin-devtools)

- Makes puppeteer browser debugging possible from anywhere.
- Creates a secure tunnel to make the devtools frontend (**incl. screencasting**) accessible from the public internet

#### [`puppeteer-extra-plugin-repl`](/packages/puppeteer-extra-plugin-repl)

- Makes quick puppeteer debugging and exploration fun with an interactive REPL.

#### [`puppeteer-extra-plugin-block-resources`](/packages/puppeteer-extra-plugin-block-resources)

- Blocks resources (images, media, css, etc.) in puppeteer.
- Supports all resource types, blocking can be toggled dynamically.

#### [`puppeteer-extra-plugin-flash`](/packages/puppeteer-extra-plugin-flash)

- Allows flash content to run on all sites without user interaction.

#### [`puppeteer-extra-plugin-anonymize-ua`](/packages/puppeteer-extra-plugin-anonymize-ua)

- Anonymizes the user-agent on all pages.
- Supports dynamic replacing, so the browser version stays intact and recent.

#### [`puppeteer-extra-plugin-user-preferences`](/packages/puppeteer-extra-plugin-user-preferences)

- Allows setting custom Chrome/Chromium user preferences.
- Has itself a plugin interface which is used by e.g. [`puppeteer-extra-plugin-font-size`](/packages/puppeteer-extra-plugin-font-size).

> Check out the [packages folder](/packages/) for more plugins.

### Community Plugins

_These plugins have been generously contributed by members of the community._
_Please note that they're hosted outside the main project and not under our control or supervision._

#### [`puppeteer-extra-plugin-minmax`](https://github.com/Stillerman/puppeteer-extra-minmax)

- Minimize and maximize puppeteer in real time.
- Great for manually solving captchas.

#### [`puppeteer-extra-plugin-portal`](https://github.com/claabs/puppeteer-extra-plugin-portal)

- Use the Chromium screencast API to remotely view and interact with puppeteer sessions.
- Great for remotely intervening when an automated task gets stuck, like captchas.

> Please check the `Contributing` section below if you're interested in creating a plugin as well.

---

## Contributors

<a href="https://github.com/berstend/puppeteer-extra/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=berstend/puppeteer-extra" />
</a>

## Further info

<details>
 <summary><strong>Contributing</strong></summary><br/>

PRs and new plugins are welcome! 🎉 The plugin API for `puppeteer-extra` is clean and fun to use. Have a look the [PuppeteerExtraPlugin](/packages/puppeteer-extra-plugin) base class documentation to get going and check out the [existing plugins](./packages/) (minimal example is the [anonymize-ua](/packages/puppeteer-extra-plugin-anonymize-ua/index.js) plugin) for reference.

We use a [monorepo](/) powered by [Lerna](https://github.com/lerna/lerna#--use-workspaces) (and yarn workspaces), [ava](https://github.com/avajs/ava) for testing, TypeScript for the core, the [standard](https://standardjs.com/) style for linting and [JSDoc](http://usejsdoc.org/about-getting-started.html) heavily to auto-generate markdown [documentation](https://github.com/documentationjs/documentation) based on code. :-)

</details>

<details>
 <summary><strong>Kudos</strong></summary><br/>

- Thanks to [skyiea](https://github.com/skyiea) for [this PR](https://github.com/GoogleChrome/puppeteer/pull/1806) that started the project idea.
- Thanks to [transitive-bullshit](https://github.com/transitive-bullshit) for [suggesting](https://github.com/berstend/puppeteer-extra/issues/2) a modular plugin design, which was fun to implement.

</details>

<details>
 <summary><strong>Compatibility</strong></summary><br/>

`puppeteer-extra` and all plugins are [tested continously](https://github.com/berstend/puppeteer-extra/actions) in a matrix of current (stable & LTS) NodeJS and puppeteer versions.
We never broke compatibility and still support puppeteer down to very early versions from 2018.

A few plugins won't work in headless mode (it's noted if that's the case) due to Chrome limitations (e.g. the [`user-preferences`](/packages/puppeteer-extra-plugin-user-preferences) plugin), look into `xvfb-run` if you still require a headless experience in these circumstances.

</details>

## Changelog

<details>
 <summary><code>2.1.6 ➠ 3.1.1</code></summary>

### `2.1.6` ➠ `3.1.1`

Big refactor, the core is now **written in TypeScript** 🎉
That means out of the box type safety for fellow TS users and nice auto-completion in VSCode for JS users. Also:

- A new [`addExtra`](#addextrapuppeteer) export, to **patch any puppeteer compatible library with plugin functionality** (`chrome-aws-lambda`, etc). This also allows for multiple puppeteer instances with different plugins.

The API is backwards compatible, I bumped the major version just in case I missed something. Please report any issues you might find with the new release. :)

</details>

---

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: PuppeteerExtra](#class-puppeteerextra)
    - [.use(plugin)](#useplugin)
    - [.launch(options?)](#launchoptions)
    - [.connect(options?)](#connectoptions)
    - [.defaultArgs(options?)](#defaultargsoptions)
    - [.executablePath()](#executablepath)
    - [.createBrowserFetcher(options?)](#createbrowserfetcheroptions)
    - [.plugins](#plugins)
    - [.getPluginData(name?)](#getplugindataname)
- [defaultExport()](#defaultexport)
- [addExtra(puppeteer)](#addextrapuppeteer)

### class: [PuppeteerExtra](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L67-L474)

Modular plugin framework to teach `puppeteer` new tricks.

This module acts as a drop-in replacement for `puppeteer`.

Allows PuppeteerExtraPlugin's to register themselves and
to extend puppeteer with additional functionality.

Example:

```javascript
const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')());
puppeteer.use(require('puppeteer-extra-plugin-font-size')({ defaultFontSize: 18 }));
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('http://example.com', { waitUntil: 'domcontentloaded' });
	await browser.close();
})();
```

---

#### .[use(plugin)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L85-L107)

- `plugin` **PuppeteerExtraPlugin**

Returns: **this** The same `PuppeteerExtra` instance (for optional chaining)

The **main interface** to register `puppeteer-extra` plugins.

Example:

```javascript
puppeteer.use(plugin1).use(plugin2);
```

- **See: [PuppeteerExtraPlugin]**

---

#### .[launch(options?)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L153-L177)

- `options` **Puppeteer.LaunchOptions?** See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions).

Returns: **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Puppeteer.Browser>**

The method launches a browser instance with given arguments. The browser will be closed when the parent node.js process is closed.

Augments the original `puppeteer.launch` method with plugin lifecycle methods.

All registered plugins that have a `beforeLaunch` method will be called
in sequence to potentially update the `options` Object before launching the browser.

Example:

```javascript
const browser = await puppeteer.launch({
	headless: false,
	defaultViewport: null,
});
```

---

#### .[connect(options?)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L189-L208)

- `options` **Puppeteer.ConnectOptions?** See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerconnectoptions).

Returns: **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;Puppeteer.Browser>**

Attach Puppeteer to an existing Chromium instance.

Augments the original `puppeteer.connect` method with plugin lifecycle methods.

All registered plugins that have a `beforeConnect` method will be called
in sequence to potentially update the `options` Object before launching the browser.

---

#### .[defaultArgs(options?)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L215-L217)

- `options` **Puppeteer.ChromeArgOptions?** See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerdefaultargsoptions).

Returns: **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**

The default flags that Chromium will be launched with.

---

#### .[executablePath()](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L220-L222)

Returns: **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**

Path where Puppeteer expects to find bundled Chromium.

---

#### .[createBrowserFetcher(options?)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L229-L233)

- `options` **Puppeteer.FetcherOptions?** See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteercreatebrowserfetcheroptions).

Returns: **Puppeteer.BrowserFetcher**

This methods attaches Puppeteer to an existing Chromium instance.

---

#### .[plugins](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L283-L285)

Type: **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;PuppeteerExtraPlugin>**

Get a list of all registered plugins.

---

#### .[getPluginData(name?)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L310-L315)

- `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Filter data by optional plugin name

Collects the exposed `data` property of all registered plugins.
Will be reduced/flattened to a single array.

Can be accessed by plugins that listed the `dataFromPlugins` requirement.

Implemented mainly for plugins that need data from other plugins (e.g. `user-preferences`).

- **See: [PuppeteerExtraPlugin]/data**

---

### [defaultExport()](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L494-L496)

Type: **[PuppeteerExtra](#puppeteerextra)**

The **default export** will behave exactly the same as the regular puppeteer
(just with extra plugin functionality) and can be used as a drop-in replacement.

Behind the scenes it will try to require either `puppeteer`
or [`puppeteer-core`](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteer-vs-puppeteer-core)
from the installed dependencies.

Example:

```javascript
// javascript import
const puppeteer = require('puppeteer-extra')

// typescript/es6 module import
import puppeteer from 'puppeteer-extra'

// Add plugins
puppeteer.use(...)
```

---

### [addExtra(puppeteer)](https://github.com/berstend/puppeteer-extra/blob/dc8b90260a927c0c66c4585c5a56092ea9c35049/packages/puppeteer-extra/src/index.ts#L519-L520)

- `puppeteer` **VanillaPuppeteer** Any puppeteer API-compatible puppeteer implementation or version.

Returns: **[PuppeteerExtra](#puppeteerextra)** A fresh PuppeteerExtra instance using the provided puppeteer

An **alternative way** to use `puppeteer-extra`: Augments the provided puppeteer with extra plugin functionality.

This is useful in case you need multiple puppeteer instances with different plugins or to add plugins to a non-standard puppeteer package.

Example:

```javascript
// js import
const puppeteerVanilla = require('puppeteer')
const { addExtra } = require('puppeteer-extra')

// ts/es6 import
import puppeteerVanilla from 'puppeteer'
import { addExtra } from 'puppeteer-extra'

// Patch provided puppeteer and add plugins
const puppeteer = addExtra(puppeteerVanilla)
puppeteer.use(...)
```

---

## License

Copyright © 2018 - 2023, [berstend̡̲̫̹̠̖͚͓̔̄̓̐̄͛̀͘](mailto:github@berstend.com?subject=[GitHub]%20PuppeteerExtra). Released under the MIT License.

<!-- Markdown footnotes (for links) -->

[puppeteerextraplugin]: https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin 'PuppeteerExtraPlugin Documentation'

# puppeteer-extra-plugin-stealth [![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/berstend/puppeteer-extra/test.yml?branch=master&event=push) [![Discord](https://img.shields.io/discord/737009125862408274)](https://extra.community) [![npm](https://img.shields.io/npm/v/puppeteer-extra-plugin-stealth.svg)](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth)

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth

> A plugin for [puppeteer-extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra) and [playwright-extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-extra) to prevent detection.

<p align="center"><img src="https://i.imgur.com/q2xBjqH.png" /></p>

## Install

```bash
yarn add puppeteer-extra-plugin-stealth
# - or -
npm install puppeteer-extra-plugin-stealth
```

If this is your first [puppeteer-extra](https://github.com/berstend/puppeteer-extra) plugin here's everything you need:

```bash
yarn add puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
# - or -
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
```

## Usage

```js
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
	console.log('Running tests..');
	const page = await browser.newPage();
	await page.goto('https://bot.sannysoft.com');
	await page.waitForTimeout(5000);
	await page.screenshot({ path: 'testresult.png', fullPage: true });
	await browser.close();
	console.log(`All done, check the screenshot. ✨`);
});
```

<details>
 <summary><strong>TypeScript usage</strong></summary><br/>

> `puppeteer-extra` and most plugins are written in TS,
> so you get perfect type support out of the box. :)

```ts
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer
	.use(StealthPlugin())
	.launch({ headless: true })
	.then(async (browser) => {
		const page = await browser.newPage();
		await page.goto('https://bot.sannysoft.com');
		await page.waitForTimeout(5000);
		await page.screenshot({ path: 'stealth.png', fullPage: true });
		await browser.close();
	});
```

> Please check this [wiki](https://github.com/berstend/puppeteer-extra/wiki/TypeScript-usage) entry in case you have TypeScript related import issues.

</details><br>

> Please check out the [main documentation](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra) to learn more about `puppeteer-extra` (Firefox usage, other Plugins, etc).

## Status

- ✅ **`puppeteer-extra` with stealth passes all public bot tests.**

Please note: I consider this a friendly competition in a rather interesting cat and mouse game. If the other team (👋) wants to detect headless chromium there are still ways to do that (at least I noticed a few, which I'll tackle in future updates).

It's probably impossible to prevent all ways to detect headless chromium, but it should be possible to make it so difficult that it becomes cost-prohibitive or triggers too many false-positives to be feasible.

If something new comes up or you experience a problem, please do your homework and create a PR in a respectful way (this is Github, not reddit) or I might not be motivated to help. :)

## Changelog

> 🎁 **Note:** Until we've automated changelog updates in markdown files please follow the `#announcements` channel in our [discord server](https://discord.gg/vz7PeKk) for the latest updates and changelog info.

_Older changelog:_

#### `v2.4.7`

- New: `user-agent-override` - Used to set a stealthy UA string, language & platform. This also fixes issues with the prior method of setting the `Accept-Language` header through request interception ([#104](https://github.com/berstend/puppeteer-extra/pull/104), kudos to [@Niek](https://github.com/Niek))
- New: `navigator.vendor` - Makes it possible to optionally override navigator.vendor ([#110](https://github.com/berstend/puppeteer-extra/pull/110), thanks [@Niek](https://github.com/Niek))
- Improved: `navigator.webdriver`: Now uses ES6 Proxies to pass `instanceof` tests ([#117](https://github.com/berstend/puppeteer-extra/pull/117), thanks [@aabbccsmith](https://github.com/aabbccsmith))
- Removed: `user-agent`, `accept-language` (now obsolete)

#### `v2.4.2` / `v2.4.1`

- Improved: `iframe.contentWindow` - We now proxy the original window object and smartly redirect calls that might reveal it's true identity, as opposed to mocking it like peasants :)
- Improved: `accept-language` - More robust and it's now possible to [set a custom locale](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth/evasions/accept-language#readme) if needed.
- ⭐️ Passes the [headless-cat-n-mouse](https://github.com/paulirish/headless-cat-n-mouse) test

#### `v2.4.0`

Let's ring the bell for round 2 in this cat and mouse fight 😄

- New: All evasions now have a specific before and after test to make make this whole topic less voodoo
- New: `media.codecs` - we spoof the presence of proprietary codecs in Chromium now
- New & improved: `iframe.contentWindow` - Found a way to fix `srcdoc` frame based detection without breaking recaptcha inline popup & other iframes (please report any issues)
- New: `accept-language` - Adds a missing `Accept-Language` header in headless (capitalized correctly, `page.setExtraHTTPHeaders` is all lowercase which can be detected)
- Improved: `chrome.runtime` - More extensive mocking of the chrome object
- ⭐️ All [fpscanner](https://antoinevastel.com/bots/) tests are now green, as well as all [intoli](https://bot.sannysoft.com) tests and the [`areyouheadless`](https://arh.antoinevastel.com/bots/areyouheadless) test

<details>
 <summary><code>v2.1.2</code></summary><br/>

- Improved: `navigator.plugins` - we fully emulate plugins/mimetypes in headless now 🎉
- New: `webgl.vendor` - is otherwise set to "Google" in headless
- New: `window.outerdimensions` - fix missing window.outerWidth/outerHeight and viewport
- Fixed: `navigator.webdriver` now returns undefined instead of false

</details>

## Test results (red is bad)

#### Vanilla puppeteer <strong>without stealth 😢</strong>

<table class="image">
<tr>

  <td><figure class="image"><a href="./stealthtests/_results/headless-chromium-vanilla.js.png"><img src="./stealthtests/_results/_thumbs/headless-chromium-vanilla.js.png"></a><figcaption>Chromium + headless</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headful-chromium-vanilla.js.png"><img src="./stealthtests/_results/_thumbs/headful-chromium-vanilla.js.png"></a><figcaption>Chromium + headful</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headless-chrome-vanilla.js.png"><img src="./stealthtests/_results/_thumbs/headless-chrome-vanilla.js.png"></a><figcaption>Chrome + headless</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headful-chrome-vanilla.js.png"><img src="./stealthtests/_results/_thumbs/headful-chrome-vanilla.js.png"></a><figcaption>Chrome + headful</figcaption></figure></td>

</tr>
</table>

#### Puppeteer <strong>with stealth plugin 💯</strong>

<table class="image">
<tr>

  <td><figure class="image"><a href="./stealthtests/_results/headless-chromium-stealth.js.png"><img src="./stealthtests/_results/_thumbs/headless-chromium-stealth.js.png"></a><figcaption>Chromium + headless</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headful-chromium-stealth.js.png"><img src="./stealthtests/_results/_thumbs/headful-chromium-stealth.js.png"></a><figcaption>Chromium + headful</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headless-chrome-stealth.js.png"><img src="./stealthtests/_results/_thumbs/headless-chrome-stealth.js.png"></a><figcaption>Chrome + headless</figcaption></figure></td>
  <td><figure class="image"><a href="./stealthtests/_results/headful-chrome-stealth.js.png"><img src="./stealthtests/_results/_thumbs/headful-chrome-stealth.js.png"></a><figcaption>Chrome + headful</figcaption></figure></td>

</tr>
</table>

> Note: The `MQ_SCREEN` test is broken on their page (will fail in regular Chrome as well).

Tests have been done using [this test site](https://bot.sannysoft.com/) and [these scripts](./stealthtests/).

#### Improved reCAPTCHA v3 scores

Using stealth also seems to help with maintaining a normal [reCAPTCHA v3 score](https://developers.google.com/recaptcha/docs/v3#score).

<table class="image">
<tr>

  <td><figure class="image"><figcaption><code>Regular Puppeteer</code></figcaption><br/><img src="https://i.imgur.com/rHEH69b.png"></figure></td>
  <td><figure class="image"><figcaption><code>Stealth Puppeteer</code></figcaption><br/><img src="https://i.imgur.com/2if496Z.png"></figure></td>

</tr>
</table>

Note: The [official test](https://recaptcha-demo.appspot.com/recaptcha-v3-request-scores.php) is to be taken with a grain of salt, as the score is calculated individually per site and multiple other factors (past behaviour, IP address, etc). Based on anecdotal observations it still seems to work as a rough indicator.

_**Tip:** Have a look at the [recaptcha plugin](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-recaptcha) if you have issues with reCAPTCHAs._

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [puppeteer-extra-plugin-stealth \[ ](#puppeteer-extra-plugin-stealth---)
    - [Install](#install)
    - [Usage](#usage)
    - [Status](#status)
    - [Changelog](#changelog)
        - [`v2.4.7`](#v247)
        - [`v2.4.2` / `v2.4.1`](#v242--v241)
        - [`v2.4.0`](#v240)
    - [Test results (red is bad)](#test-results-red-is-bad)
        - [Vanilla puppeteer without stealth 😢](#vanilla-puppeteer-without-stealth-)
        - [Puppeteer with stealth plugin 💯](#puppeteer-with-stealth-plugin-)
        - [Improved reCAPTCHA v3 scores](#improved-recaptcha-v3-scores)
    - [API](#api)
        - [Table of Contents](#table-of-contents)
        - [class: StealthPlugin](#class-stealthplugin)
            - [Purpose](#purpose)
            - [Modularity](#modularity)
            - [Contributing](#contributing)
            - [Kudos](#kudos)
            - [.availableEvasions](#availableevasions)
            - [.enabledEvasions](#enabledevasions)
        - [defaultExport(opts?)](#defaultexportopts)
    - [License](#license)

### class: [StealthPlugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/index.js#L72-L162)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.enabledEvasions` **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** Specify which evasions to use (by default all)

**Extends: PuppeteerExtraPlugin**

Stealth mode: Applies various techniques to make detection of headless puppeteer harder. 💯

#### Purpose

There are a couple of ways the use of puppeteer can easily be detected by a target website.
The addition of `HeadlessChrome` to the user-agent being only the most obvious one.

The goal of this plugin is to be the definite companion to puppeteer to avoid
detection, applying new techniques as they surface.

As this cat & mouse game is in it's infancy and fast-paced the plugin
is kept as flexibile as possible, to support quick testing and iterations.

#### Modularity

This plugin uses `puppeteer-extra`'s dependency system to only require
code mods for evasions that have been enabled, to keep things modular and efficient.

The `stealth` plugin is a convenience wrapper that requires multiple [evasion techniques](./evasions/)
automatically and comes with defaults. You could also bypass the main module and require
specific evasion plugins yourself, if you whish to do so (as they're standalone `puppeteer-extra` plugins):

```es6
// bypass main module and require a specific stealth plugin directly:
puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/console.debug')());
```

#### Contributing

PRs are welcome, if you want to add a new evasion technique I suggest you
look at the [template](./evasions/_template) to kickstart things.

#### Kudos

Thanks to [Evan Sangaline](https://intoli.com/blog/not-possible-to-block-chrome-headless/) and [Paul Irish](https://github.com/paulirish/headless-cat-n-mouse) for kickstarting the discussion!

---

Example:

```javascript
const puppeteer = require('puppeteer-extra');
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')());
(async () => {
	// Launch the browser in headless mode and set up a page.
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true,
	});
	const page = await browser.newPage();

	// Navigate to the page that will perform the tests.
	const testUrl = 'https://intoli.com/blog/' + 'not-possible-to-block-chrome-headless/chrome-headless-test.html';
	await page.goto(testUrl);

	// Save a screenshot of the results.
	const screenshotPath = '/tmp/headless-test-result.png';
	await page.screenshot({ path: screenshotPath });
	console.log('have a look at the screenshot:', screenshotPath);

	await browser.close();
})();
```

---

#### .[availableEvasions](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/index.js#L128-L130)

Type: **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**

Get all available evasions.

Please look into the [evasions directory](./evasions/) for an up to date list.

Example:

```javascript
const pluginStealth = require('puppeteer-extra-plugin-stealth')();
console.log(pluginStealth.availableEvasions); // => Set { 'user-agent', 'console.debug' }
puppeteer.use(pluginStealth);
```

---

#### .[enabledEvasions](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/index.js#L145-L147)

Type: **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**

Get all enabled evasions.

Enabled evasions can be configured either through `opts` or by modifying this property.

Example:

```javascript
// Remove specific evasion from enabled ones dynamically
const pluginStealth = require('puppeteer-extra-plugin-stealth')();
pluginStealth.enabledEvasions.delete('console.debug');
puppeteer.use(pluginStealth);
```

---

### [defaultExport(opts?)](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/index.js#L170-L170)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options
    - `opts.enabledEvasions` **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** Specify which evasions to use (by default all)

Default export, PuppeteerExtraStealthPlugin

---

## License

Copyright © 2018 - 2023, [berstend̡̲̫̹̠̖͚͓̔̄̓̐̄͛̀͘](mailto:github@berstend.com?subject=[GitHub]%20PuppeteerExtra). Released under the MIT License.

# puppeteer-extra-plugin-stealth/evasions

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions

Various detection evasion plugins for `puppeteer-extra-plugin-stealth`.

You can bypass the main module and require specific evasion plugins yourself, if you wish to do so:

```es6
puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/console.debug')());
```

If you want to add a new evasion technique I suggest you look at the [template](./_template/) to kickstart things.

# Evasion: chrome.app

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/chrome.app

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.app/index.js#L11-L97)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Mock the `chrome.app` object if not available (e.g. when running headless).

---

# Evasion: chrome.csi

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/chrome.csi

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.csi/index.js#L25-L70)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Mock the `chrome.csi` function if not available (e.g. when running headless).
It's a deprecated (but unfortunately still existing) chrome specific API to fetch browser timings.

Internally chromium switched the implementation to use the WebPerformance API,
so we can do the same to create a fully functional mock. :-)

Note: We're using the deprecated PerformanceTiming API instead of the new Navigation Timing Level 2 API on purpopse.

- **See: <https://bugs.chromium.org/p/chromium/issues/detail?id=113048>**
- **See: <https://codereview.chromium.org/2456293003/>**
- **See: <https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated>**
- **See: <https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming>**
- **See: <https://source.chromium.org/chromium/chromium/src/+/master:chrome/renderer/loadtimes_extension_bindings.cc;l=124?q=loadtimes&ss=chromium>**
- **See: `chrome.loadTimes` evasion**

---

# Evasion: chrome.loadTimes

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes/index.js#L23-L164)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Mock the `chrome.loadTimes` function if not available (e.g. when running headless).
It's a deprecated (but unfortunately still existing) chrome specific API to fetch browser timings and connection info.

Internally chromium switched the implementation to use the WebPerformance API,
so we can do the same to create a fully functional mock. :-)

Note: We're using the deprecated PerformanceTiming API instead of the new Navigation Timing Level 2 API on purpopse.

- **See: <https://developers.google.com/web/updates/2017/12/chrome-loadtimes-deprecated>**
- **See: <https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming>**
- **See: <https://source.chromium.org/chromium/chromium/src/+/master:chrome/renderer/loadtimes_extension_bindings.cc;l=124?q=loadtimes&ss=chromium>**
- **See: `chrome.csi` evasion**

---

# Evasion: chrome.runtime

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/chrome.runtime

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)
- [sendMessageHandler()](#sendmessagehandler)
- [connectHandler()](#connecthandler)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.runtime/index.js#L13-L251)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Mock the `chrome.runtime` object if not available (e.g. when running headless) and on a secure site.

---

### [sendMessageHandler()](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.runtime/index.js#L80-L123)

Mock `chrome.runtime.sendMessage`

---

### [connectHandler()](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/chrome.runtime/index.js#L136-L210)

Mock `chrome.runtime.connect`

- **See: <https://developer.chrome.com/apps/runtime#method-connect>**

---

# Evasion: defaultArgs

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/defaultArgs

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/358246d5cc56bbb8800624128503482b8d7b426a/packages/puppeteer-extra-plugin-stealth/evasions/defaultArgs/index.js#L15-L41)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

A CDP driver like puppeteer can make use of various browser launch arguments that are
adversarial to mimicking a regular browser and need to be stripped when launching the browser.

---

# Evasion: iframe.contentWindow

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow/index.js#L11-L125)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Fix for the HEADCHR_IFRAME detection (iframe.contentWindow.chrome), hopefully this time without breaking iframes.
Note: Only `srcdoc` powered iframes cause issues due to a chromium bug:

<https://github.com/puppeteer/puppeteer/issues/1106>

---

# Evasion: media.codecs

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/media.codecs

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)
- [parseInput(arg)](#parseinputarg)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/media.codecs/index.js#L12-L88)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Fix Chromium not reporting "probably" to codecs like `videoEl.canPlayType('video/mp4; codecs="avc1.42E01E"')`.
(Chromium doesn't support proprietary codecs, only Chrome does)

---

### [parseInput(arg)](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/media.codecs/index.js#L33-L51)

- `arg` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**

Input might look funky, we need to normalize it so e.g. whitespace isn't an issue for our spoofing.

Example:

```javascript
video / webm;
codecs = 'vp8, vorbis';
video / mp4;
codecs = 'avc1.42E01E';
audio / x - m4a;
audio / ogg;
codecs = 'vorbis';
```

---

# Evasion: navigator.hardwareConcurrency

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/9534845cc95088e65c2d53bfb029263976fc9add/packages/puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency/index.js#L16-L37)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.hardwareConcurrency` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The value to use in `navigator.hardwareConcurrency` (default: `4`)

**Extends: PuppeteerExtraPlugin**

Set the hardwareConcurrency to 4 (optionally configurable with `hardwareConcurrency`)

- **See: <https://arh.antoinevastel.com/reports/stats/osName_hardwareConcurrency_report.html>**

---

# Evasion: navigator.languages

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.languages

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/navigator.languages/index.js#L11-L28)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.languages` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** The languages to use (default: `['en-US', 'en']`)

**Extends: PuppeteerExtraPlugin**

Pass the Languages Test. Allows setting custom languages.

---

# Evasion: navigator.permissions

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.permissions

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/navigator.permissions/index.js#L12-L45)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Pass the Permissions Test.

---

# Evasion: navigator.plugins

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.plugins

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/navigator.plugins/index.js#L26-L88)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

In headless mode `navigator.mimeTypes` and `navigator.plugins` are empty.
This plugin emulates both of these with functional mocks to match regular headful Chrome.

Note: mimeTypes and plugins cross-reference each other, so it makes sense to do them at the same time.

- **See: <https://developer.mozilla.org/en-US/docs/Web/API/NavigatorPlugins/mimeTypes>**
- **See: <https://developer.mozilla.org/en-US/docs/Web/API/MimeTypeArray>**
- **See: <https://developer.mozilla.org/en-US/docs/Web/API/NavigatorPlugins/plugins>**
- **See: <https://developer.mozilla.org/en-US/docs/Web/API/PluginArray>**

---

# Evasion: navigator.vendor

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.vendor

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/navigator.vendor/index.js#L28-L55)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.vendor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The vendor to use in `navigator.vendor` (default: `Google Inc.`)

**Extends: PuppeteerExtraPlugin**

By default puppeteer will have a fixed `navigator.vendor` property.

This plugin makes it possible to change this property.

Example:

```javascript
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const stealth = StealthPlugin();
// Remove this specific stealth plugin from the default set
stealth.enabledEvasions.delete('navigator.vendor');
puppeteer.use(stealth);

// Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such
const NavigatorVendorPlugin = require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor');
const nvp = NavigatorVendorPlugin({ vendor: 'Apple Computer, Inc.' }); // Custom vendor
puppeteer.use(nvp);
```

---

# Evasion: navigator.webdriver

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/navigator.webdriver

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/navigator.webdriver/index.js#L9-L23)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Pass the Webdriver Test.
Will delete `navigator.webdriver` property.

---

# Evasion: sourceurl

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/sourceurl

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/sourceurl/index.js#L9-L58)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Strip sourceURL from scripts injected by puppeteer.
It can be used to identify the presence of pptr via stacktraces.

---

# Evasion: user-agent-override

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/user-agent-override

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/ab0047d1af7dc38412744abdb61bcfc35c42dc34/packages/puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js#L42-L203)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.userAgent` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The user agent to use (default: browser.userAgent())
    - `opts.locale` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The locale to use in `Accept-Language` header and in `navigator.languages` (default: `en-US,en`)
    - `opts.maskLinux` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Wether to hide Linux as platform in the user agent or not - true by default

**Extends: PuppeteerExtraPlugin**

Fixes the UserAgent info (composed of UA string, Accept-Language, Platform, and UA hints).

If you don't provide any values this plugin will default to using the regular UserAgent string (while stripping the headless part).
Default language is set to "en-US,en", the other settings match the UserAgent string.
If you are running on Linux, it will mask the settins to look like Windows. This behavior can be disabled with the `maskLinux` option.

By default puppeteer will not set a `Accept-Language` header in headless:
It's (theoretically) possible to fix that using either `page.setExtraHTTPHeaders` or a `--lang` launch arg.
Unfortunately `page.setExtraHTTPHeaders` will lowercase everything and launch args are not always available. :)

In addition, the `navigator.platform` property is always set to the host value, e.g. `Linux` which makes detection very easy.

Note: You cannot use the regular `page.setUserAgent()` puppeteer call in your code,
as it will reset the language and platform values you set with this plugin.

Example:

```javascript
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const stealth = StealthPlugin();
// Remove this specific stealth plugin from the default set
stealth.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealth);

// Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such
const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override');
// Define custom UA and locale
const ua = UserAgentOverride({
	userAgent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
	locale: 'de-DE,de',
});
puppeteer.use(ua);
```

---

# Evasion: webgl.vendor

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/webgl.vendor

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/webgl.vendor/index.js#L17-L55)

- `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)
    - `opts.vendor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The vendor string to use (default: `Intel Inc.`)
    - `opts.renderer` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The renderer string (default: `Intel Iris OpenGL Engine`)

**Extends: PuppeteerExtraPlugin**

Fix WebGL Vendor/Renderer being set to Google in headless mode

Example data (Apple Retina MBP 13): {vendor: "Intel Inc.", renderer: "Intel(R) Iris(TM) Graphics 6100"}

---

# Evasion: window.outerdimensions

Source: https://github.com/berstend/puppeteer-extra/tree/puppeteer-extra-plugin-stealth@2.11.2/packages/puppeteer-extra-plugin-stealth/evasions/window.outerdimensions

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [class: Plugin](#class-plugin)

### class: [Plugin](https://github.com/berstend/puppeteer-extra/blob/e6133619b051febed630ada35241664eba59b9fa/packages/puppeteer-extra-plugin-stealth/evasions/window.outerdimensions/index.js#L9-L40)

- `opts` (optional, default `{}`)

**Extends: PuppeteerExtraPlugin**

Fix missing window.outerWidth/window.outerHeight in headless mode
Will also set the viewport to match window size, unless specified by user

---
