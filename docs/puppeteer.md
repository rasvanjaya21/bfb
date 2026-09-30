# Puppeteer documentation

- Version: **puppeteer-core 24.43.1, @puppeteer/browsers 2.13.2**
- Source: https://github.com/puppeteer/puppeteer/tree/puppeteer-core-v24.43.1/docs (commit `970bda6`)
- Mirrored: 2026-09-30

Guides first, then the full `puppeteer-core` API reference (`docs/api`) and the `@puppeteer/browsers` API (`docs/browsers-api`). `CHANGELOG.md` and `contributing.md` are left out. bfb installs `@puppeteer/browsers` 2.13.2; check that the tag ships the same version when either is bumped.

Complete official documentation for this exact version, mirrored for offline use. Not written by hand; regenerate it with `bun run docs` instead of editing it.

---

# Puppeteer

Source: https://pptr.dev/

[![build](https://github.com/puppeteer/puppeteer/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/puppeteer/puppeteer/actions/workflows/ci.yml)
[![npm puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)

<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="200" align="right"/>

> Puppeteer is a JavaScript library which provides a high-level API to control
> Chrome or Firefox over the
> [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) or [WebDriver BiDi](https://pptr.dev/webdriver-bidi).
> Puppeteer runs in the headless (no visible UI) by default

## [Get started](https://pptr.dev/docs) | [API](https://pptr.dev/api) | [FAQ](https://pptr.dev/faq) | [Contributing](https://pptr.dev/contributing) | [Troubleshooting](https://pptr.dev/troubleshooting)

## Installation

```bash npm2yarn
npm i puppeteer # Downloads compatible Chrome during installation.
npm i puppeteer-core # Alternatively, install as a library, without downloading Chrome.
```

## MCP

Install [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp),
a Puppeteer-based MCP server for browser automation and debugging.

Puppeteer also supports the experimental [WebMCP](https://pptr.dev/guides/webmcp) API.

## Example

```ts
import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page.
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://developer.chrome.com/');

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

// Open the search menu using the keyboard.
await page.keyboard.press('/');

// Type into search box using accessible input name.
await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
const textSelector = await page.locator('::-p-text(Customize and automate)').waitHandle();
const fullTitle = await textSelector?.evaluate((el) => el.textContent);

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
```

# What is Puppeteer?

Source: https://pptr.dev/guides/what-is-puppeteer

Puppeteer is a JavaScript library which provides a high-level API to
control Chrome or Firefox over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) or
[WebDriver BiDi](https://pptr.dev/webdriver-bidi). Puppeteer runs in the
headless (no visible UI) by default but can be configured to run in a
visible ("headful") browser.

# Features

Most things that you can do manually in the browser can be done using Puppeteer!
Here are a few examples to get you started:

- Automate form submission, UI testing, keyboard input, etc.
- Create an automated testing environment using the latest JavaScript and
  browser features.
- Capture a
  [timeline trace](https://developer.chrome.com/docs/devtools/performance/reference)
  of your site to help diagnose performance issues.
- [Test Chrome Extensions](https://pptr.dev/guides/chrome-extensions).
- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e.
  "SSR" (Server-Side Rendering)).

# Installation

Source: https://pptr.dev/guides/installation

To use Puppeteer in your project, run:

```bash npm2yarn
npm i puppeteer
```

When you install Puppeteer, it automatically downloads a recent version of
[Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) (~170MB macOS, ~282MB Linux, ~280MB Windows) and a `chrome-headless-shell` binary (starting with Puppeteer v21.6.0) that is [guaranteed to
work](https://pptr.dev/faq#q-why-doesnt-puppeteer-vxxx-work-with-a-certain-version-of-chrome-or-firefox)
with Puppeteer. The browser is downloaded to the `$HOME/.cache/puppeteer` folder
by default (starting with Puppeteer v19.0.0). See [configuration](https://pptr.dev/api/puppeteer.configuration) for configuration options and environmental variables to control the download behavior.

For every release since v1.7.0 we publish two packages:

- [`puppeteer`](https://www.npmjs.com/package/puppeteer)
- [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core)

`puppeteer` is a _product_ for browser automation. When installed, it downloads
a version of Chrome, which it then drives using `puppeteer-core`. Being an
end-user product, `puppeteer` automates several workflows using reasonable
defaults [that can be customized](https://pptr.dev/guides/configuration).

`puppeteer-core` is a _library_ to help drive anything that supports DevTools
protocol. Being a library, `puppeteer-core` is fully driven through its
programmatic interface implying no defaults are assumed and `puppeteer-core`
will not download Chrome when installed.

You should use `puppeteer-core` if you are
[connecting to a remote browser](https://pptr.dev/api/puppeteer.puppeteer.connect)
or [managing browsers yourself](https://pptr.dev/browsers-api).
If you are managing browsers yourself, you will need to call
[`puppeteer.launch`](https://pptr.dev/api/puppeteer.puppeteernode.launch) with
an explicit
[`executablePath`](https://pptr.dev/api/puppeteer.launchoptions)
(or [`channel`](https://pptr.dev/api/puppeteer.launchoptions) if it's
installed in a standard location).

When using `puppeteer-core`, remember to change the import:

```ts
import puppeteer from 'puppeteer-core';
```

# Getting started

Source: https://pptr.dev/guides/getting-started

Puppeteer will be familiar to people using other browser testing frameworks. You
[launch](https://pptr.dev/api/puppeteer.puppeteernode.launch)/[connect](https://pptr.dev/api/puppeteer.puppeteernode.connect)
a [browser](https://pptr.dev/api/puppeteer.browser),
[create](https://pptr.dev/api/puppeteer.browser.newpage) some
[pages](https://pptr.dev/api/puppeteer.page), and then manipulate them with
[Puppeteer's API](https://pptr.dev/api).

The following example searches [developer.chrome.com](https://developer.chrome.com/) for blog posts with text "automate beyond recorder", click on the first result and print the full title of the blog post.

```ts
import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page.
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://developer.chrome.com/');

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

// Open the search menu using the keyboard.
await page.keyboard.press('/');

// Type into search box using accessible input name.
await page.locator('::-p-aria(Search)').fill('automate beyond recorder');

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
const textSelector = await page.locator('::-p-text(Customize and automate)').waitHandle();
const fullTitle = await textSelector?.evaluate((el) => el.textContent);

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
```

For more in-depth usage, check our [documentation](https://pptr.dev/docs)
and [examples](https://github.com/puppeteer/puppeteer/tree/main/examples).

# System requirements

Source: https://pptr.dev/guides/system-requirements

- Node 18+. Puppeteer follows the latest
  [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of
  Node

- TypeScript 4.7.4+ (If used with TypeScript).
    - Target ES2022 or later if you [type check node_modules](https://www.typescriptlang.org/tsconfig/#skipLibCheck).

- Chrome for Testing browser system requirements:
    - [Windows](https://support.google.com/chrome/a/answer/7100626?hl=en#:~:text=the%20specified%20criteria.-,Windows,-To%20use%20Chrome), x64 architecture
    - [MacOS](https://support.google.com/chrome/a/answer/7100626?hl=en#:~:text=Not%20yet%20scheduled-,Mac,-To%20use%20Chrome), x64 and arm64 architectures
    - [Debian/Ubuntu Linux](https://support.google.com/chrome/a/answer/7100626?hl=en#:~:text=10.15%20or%20later-,Linux,-To%20use%20Chrome), with x64 architecture
        - Required system packages https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json
    - [openSUSE/Fedora Linux](https://support.google.com/chrome/a/answer/7100626?hl=en#:~:text=10.15%20or%20later-,Linux,-To%20use%20Chrome), with x64 architecture
        - Required system packages https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/rpm/dist_package_provides.json

- Firefox browser system requirements:
    - https://www.mozilla.org/en-US/firefox/system-requirements/
    - The `xz` or `bzip2` utilities are required to unpack Firefox versions for Linux.

# Browser management

Source: https://pptr.dev/guides/browser-management

Usually, you start working with Puppeteer by either [launching](https://pptr.dev/api/puppeteer.puppeteernode.launch) or [connecting](https://pptr.dev/api/puppeteer.puppeteernode.connect) to a browser.

## Launching a browser

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

// ...
```

## Closing a browser

To gracefully close the browser, you use the [`browser.close()`](https://pptr.dev/api/puppeteer.browser.close) method:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await browser.close();
```

## Browser contexts

If you need to isolate your automation tasks, use [BrowserContexts](https://pptr.dev/api/puppeteer.browser.createbrowsercontext). Cookies and local storage are not shared between browser contexts. Also, you can close all pages in the context by closing the context.

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const context = await browser.createBrowserContext();

const page1 = await context.newPage();
const page2 = await context.newPage();

await context.close();
```

## Permissions

You can also configure permissions for a browser context:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const context = browser.defaultBrowserContext();

await context.overridePermissions('https://html5demos.com', ['geolocation']);
```

## Connecting to a running browser

If you launched a browser outside of Puppeteer, you can connect to it using the [`connect`](https://pptr.dev/api/puppeteer.puppeteernode.connect) method. Usually, you can grab a WebSocket endpoint URL from the browser output:

```ts
const browser = await puppeteer.connect({
	browserWSEndpoint: 'ws://127.0.0.1:9222/...',
});

const page = await browser.newPage();

browser.disconnect();
```

:::note

Unlike `browser.close()`, `browser.disconnect()` does not shut down the browser or close any pages.

:::

# Page interactions

Source: https://pptr.dev/guides/page-interactions

Puppeteer allows interacting with elements on the page through mouse, touch
events and keyboard input. Usually you first query a DOM element using a [CSS
selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) and
then invoke an action on the selected element. All of Puppeteer APIs that accept
a selector, accept a [CSS
selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) by
default. Additionally, Puppeteer offers [custom selector syntax](#selectors) that allows
finding elements using XPath, Text, Accessibility attributes and accessing
Shadow DOM without the need to execute JavaScript.

If you want to emit mouse or
keyboard events without selecting an element first, use the
[`page.mouse`](https://pptr.dev/api/puppeteer.mouse),
[`page.keyboard`](https://pptr.dev/api/puppeteer.keyboard) and
[`page.touchscreen`](https://pptr.dev/api/puppeteer.touchscreen) APIs. The rest
of this guide, gives an overview on how to select DOM elements and invoke
actions on them.

## Locators

Locators is the recommended way to select an element and interact with it.
Locators encapsulate the information on how to select an element and they allow
Puppeteer to automatically wait for the element to be present in the DOM and to
be in the right state for the action. You always instantiate a locator using the
[`page.locator()`](https://pptr.dev/api/puppeteer.page.locator) or
[`frame.locator()`](https://pptr.dev/api/puppeteer.frame.locator) function. If
the locator API doesn't offer a functionality you need, you can still use lower
level APIs such as
[`page.waitForSelector()`](https://pptr.dev/api/puppeteer.page.waitforselector)
or [`ElementHandle`](https://pptr.dev/api/puppeteer.elementhandle).

### Clicking an element using locators

```ts
// 'button' is a CSS selector.
await page.locator('button').click();
```

The locator automatically checks the following before clicking:

- Ensures the element is in the viewport.
- Waits for the element to become
  [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible) or hidden.
- Waits for the element to become enabled.
- Waits for the element to have a stable bounding box over two consecutive
  animation frames.

### Filling out an input

```ts
// 'input' is a CSS selector.
await page.locator('input').fill('value');
```

Automatically detects the input type and choose an appropriate way to fill it
out with the provided value. For example, it will fill out `<select>` elements as
well as `<input>` elements.

The locator automatically checks the following before typing into the input:

- Ensures the element is in the viewport.
- Waits for the element to become
  [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible) or hidden.
- Waits for the element to become enabled.
- Waits for the element to have a stable bounding box over two consecutive
  animation frames.

#### Hover over an element

```ts
await page.locator('div').hover();
```

The locator automatically checks the following before hovering:

- Ensures the element is in the viewport.
- Waits for the element to become
  [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible) or hidden.
- Waits for the element to have a stable bounding box over two consecutive
  animation frames.

#### Scroll an element

The [`.scroll()`] functions uses mouse wheel events to scroll an element.

```ts
// Scroll the div element by 10px horizontally
// and by 20 px vertically.
await page.locator('div').scroll({
	scrollLeft: 10,
	scrollTop: 20,
});
```

The locator automatically checks the following before scrolling:

- Ensures the element is in the viewport.
- Waits for the element to become
  [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible) or hidden.
- Waits for the element to have a stable bounding box over two consecutive
  animation frames.

### Waiting for element to be visible

Sometimes you only need to wait for the element to be visible.

```ts
// '.loading' is a CSS selector.
await page.locator('.loading').wait();
```

The locator automatically checks the following before returning:

- Waits for the element to become
  [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible) or hidden.

### Waiting for a function

Sometimes it is useful to wait for an arbitrary condition expressed as a
JavaScript function. In this case, locator can be defined using a function
instead of a selector. The following example waits until at least 3 paragraphs
are present on the page, then extracts their text. You can also call locator
functions such as `.click()` or `.fill()` instead of mapping elements to text.

```ts
const paragraphs = await page
	.locator(() => {
		const paragraphs = document.querySelectorAll('p');

		if (paragraphs.length >= 3) {
			return [...paragraphs].map((p) => p.textContent);
		}
	})
	.wait();
```

### Applying filters on locators

The following example shows how to add extra conditions to the locator expressed
as a JavaScript function. The button element will only be clicked if its
`textContent` is 'My button'.

```ts
await page
	.locator('button')
	.filter((button) => button.textContent === 'My button')
	.click();
```

Since `.filter()`'s callback is executed in browser context, it doesn't have access to variables from the Node scope. You can build a string function to inject a variable:

```ts
const buttonName = 'My button';
await page
	.locator('button')
	.filter(`button => button.textContent === ${JSON.stringify(buttonName)}`)
	.click();
```

### Returning values from a locator

The [`map`](https://pptr.dev/api/puppeteer.locator.map) function allows mapping
an element to a JavaScript value. In this case, calling `wait()` will return the
deserialized JavaScript value.

```ts
const enabled = await page
	.locator('button')
	.map((button) => !button.disabled)
	.wait();
```

### Returning ElementHandles from a locator

The [`waitHandle`](https://pptr.dev/api/puppeteer.locator.waithandle) function
allows returning the
[ElementHandle](https://pptr.dev/api/puppeteer.elementhandle). It might be
useful if there is no corresponding locator API for the action you need.

```ts
const buttonHandle = await page.locator('button').waitHandle();
await buttonHandle.click();
```

### Configuring locators

Locators can be configured to tune configure the preconditions and other options:

```ts
// Clicks on a button without waiting for any preconditions.
await page.locator('button').setEnsureElementIsInTheViewport(false).setVisibility(null).setWaitForEnabled(false).setWaitForStableBoundingBox(false).click();
```

### Locator timeouts

By default, locators inherit the timeout setting from the page. But it is
possible to set the timeout on the per-locator basis. A
[TimeoutError](https://pptr.dev/api/puppeteer.timeouterror) will be thrown if
the element is not found or the preconditions are not met within the specified
time period.

```ts
// Time out after 3 sec.
await page.locator('button').setTimeout(3000).click();
```

### Getting locator events

Currently, locators support [a single
event](https://pptr.dev/api/puppeteer.locatorevents) that notifies you when the
locator is about to perform the action indicating that pre-conditions have been
met:

```ts
let willClick = false;
await page
	.locator('button')
	.on(LocatorEvent.Action, () => {
		willClick = true;
	})
	.click();
```

This event can be used for logging/debugging or other purposes. The event might
fire multiple times if the locator retries the action.

## waitForSelector

[`waitForSelector`](https://pptr.dev/api/puppeteer.page.waitforselector) is a
lower-level API compared to locators that allows waiting for an element to be
available in DOM. It does not automatically retry the action if it fails and
requires manually disposing the resulting ElementHandle to prevent memory leaks.
The method exists on the Page, Frame and ElementHandle instances.

```ts
// Import puppeteer
import puppeteer from 'puppeteer';

// Launch the browser.
const browser = await puppeteer.launch();

// Create a page.
const page = await browser.newPage();

// Go to your site.
await page.goto('YOUR_SITE');

// Query for an element handle.
const element = await page.waitForSelector('div > .class-name');

// Do something with element...
await element.click(); // Just an example.

// Dispose of handle.
await element.dispose();

// Close browser.
await browser.close();
```

Some page level APIs such as `page.click(selector)`, `page.type(selector)`,
`page.hover(selector)` are implemented using `waitForSelector` for
backwards-compatibility reasons.

## Querying without waiting

Sometimes you know that the elements are already on the page. In that case,
Puppeteer offers multiple ways to find an element or multiple elements matching a
selector. These methods exist on Page, Frame and ElementHandle instances.

- [`page.$()`](https://pptr.dev/api/puppeteer.page._) returns a single element
  matching a selector.
- [`page.$$()`](https://pptr.dev/api/puppeteer.page.__) returns all elements matching a selector.
- [`page.$eval()`](https://pptr.dev/api/puppeteer.page._eval) returns the result
  of running a JavaScript function on the first element matching a selector.
- [`page.$$eval()`](https://pptr.dev/api/puppeteer.page.__eval) returns the
  result of running a JavaScript function on each element matching a selector.

## Selectors

Puppeteer accepts [CSS
selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) in
every API that accepts a selector. Additionally, you can opt-in into using
additional selector syntax to do more than CSS selectors offer.

### Non-CSS selectors

Puppeteer extends the CSS syntax with custom
[pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
that define how to select an element using a non-CSS selector. The Puppeteer
supported pseudo-elements are prefixed with a `-p` vendor prefix.

#### XPath selectors (`-p-xpath`)

XPath selectors will use the browser's native [`Document.evaluate`](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate) to query for elements.

```ts
// Runs the `//h2` as the XPath expression.
const element = await page.waitForSelector('::-p-xpath(//h2)');
```

#### Text selectors (`-p-text`)

Text selectors will select "minimal" elements containing the given text, even
within (open) shadow roots. Here, "minimum" means the deepest elements that
contain a given text, but not their parents (which technically will also contain
the given text).

```ts
// Click a button inside a div element that has Checkout as the inner text.
await page.locator('div ::-p-text(Checkout)').click();
// You need to escape CSS selector syntax such '(', ')' if it is part of the your search text ('Checkout (2 items)').
await page.locator(':scope >>> ::-p-text(Checkout \\(2 items\\))').click();
// or use quotes escaping any quotes that are part of the search text ('He said: "Hello"').
await page.locator(':scope >>> ::-p-text("He said: \\"Hello\\"")').click();
```

#### ARIA selectors (`-p-aria`)

ARIA selectors can be used to find elements using the computed accessible name
and role. These labels are computed using the browsers internal representation
of the accessibility tree. That means that ARIA relationships such as labeledby
are resolved before the query is run. The ARIA selectors are useful if you do
not want to depend on any particular DOM structure or DOM attributes.

```ts
await page.locator('::-p-aria(Submit)').click();
await page.locator('::-p-aria([name="Click me"][role="button"])').click();
```

#### Pierce selector (`pierce/`)

Pierce selector is a selector that returns all elements matching the provided CSS selector in
all shadow roots in the document. We recommend using [deep
combinators](#querying-elements-in-shadow-dom) instead because they offer more
flexibility in combining difference selectors. `pierce/` is only available in
the [prefixed notation](#prefixed-selector-syntax).

```ts
await page.locator('pierce/div').click();
// Same query as the pierce/ one using deep combinators.
await page.locator('& >>> div').click();
```

### Querying elements in Shadow DOM

CSS selectors do not allow descending into Shadow DOM, therefore, Puppeteer adds
two combinators to the CSS selector syntax that allow searching inside [shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

#### The `>>>` combinator

The `>>>` is called the _deep descendent_ combinator. It is analogous to the
CSS's descendent combinator (denoted with a single space character <code>&nbsp;</code>, for
example, `div button`) and it selects matching elements under the parent element
at any depth. For example, `my-custom-element >>> button` would select all
button elements that are available inside shadow DOM of the `my-custom-element`
(the shadow host).

:::note

Deep combinators only work on the first "depth" of CSS selectors and open shadow
roots; for example, `:is(div > > a)` will not work.

:::

#### The `>>>>` combinator

The `>>>>` is called the _deep child_ combinator. It is analogous to the CSS's
child combinator (denoted with `>`, for example, `div > button`) and it selects
matching elements under the parent element's immediate shadow root, if the
element has one. For example,
`my-custom-element >>>> button` would select all button elements that are available
inside the immediate shadow root of the `my-custom-element` (the shadow host).

### Custom selectors

You can also add your own pseudo element using
[Puppeteer.registerCustomQueryHandler](../api/puppeteer.puppeteer.registercustomqueryhandler.md).
This is useful for creating custom selectors based on framework objects or your application.

For example, you can write all your selectors using the `react-component` pseudo-element
and implement a custom logic how to resolve the provided ID.

```ts
Puppeteer.registerCustomQueryHandler('react-component', {
	queryOne: (elementOrDocument, selector) => {
		// Dummy example just delegates to querySelector but you can find your
		// React component because this callback runs in the page context.
		return elementOrDocument.querySelector(`[id="${CSS.escape(selector)}"]`);
	},
	queryAll: (elementOrDocument, selector) => {
		// Dummy example just delegates to querySelector but you can find your
		// React component because this callback runs in the page context.
		return elementOrDocument.querySelectorAll(`[id="${CSS.escape(selector)}"]`);
	},
});
```

In your application you can now write selectors as following.

```ts
await page.locator('::-p-react-component(MyComponent)').click();
// OR used in conjunction with other selectors.
await page.locator('.side-bar ::-p-react-component(MyComponent)').click();
```

Another example shows how you can define a custom query handler for locating vue
components:

:::caution

Be careful when relying on internal APIs of libraries or frameworks. They can change at any time.

:::

```ts
Puppeteer.registerCustomQueryHandler('vue', {
	queryOne: (element, name) => {
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);
		do {
			const currentNode = walker.currentNode;
			if (currentNode.__vnode?.ctx?.type?.name.toLowerCase() === name.toLocaleLowerCase()) {
				return currentNode;
			}
		} while (walker.nextNode());

		return null;
	},
});
```

Search for a given view component as following:

```ts
const element = await page.$('::-p-vue(MyComponent)');
```

### Prefixed selector syntax

:::caution

While we maintain prefixed selectors, the recommended way is to use the selector syntax documented above.

:::

The following legacy syntax (`${nonCssSelectorName}/${nonCssSelector}`) allows
running a single non-CSS selector at a time is also supported. Note that this
syntax does not allow combining multiple selectors.

```ts
// Same as ::-p-text("My text").
await page.locator('text/My text').click();
// Same as ::-p-xpath(//h2).
await page.locator('xpath///h2').click();
// Same as ::-p-aria(My label).
await page.locator('aria/My label').click();

await page.locator('pierce/div').click();
```

# JavaScript execution

Source: https://pptr.dev/guides/javascript-execution

Puppeteer allows evaluating JavaScript functions in the context of the page
driven by Puppeteer:

```ts
// Import puppeteer
import puppeteer from 'puppeteer';

(async () => {
	// Launch the browser
	const browser = await puppeteer.launch();

	// Create a page
	const page = await browser.newPage();

	// Go to your site
	await page.goto('YOUR_SITE');

	// Evaluate JavaScript
	const three = await page.evaluate(() => {
		return 1 + 2;
	});

	console.log(three);

	// Close browser.
	await browser.close();
})();
```

:::caution

Although the function is defined in your script context, it actually gets
converted to a string by Puppeteer, sent to the target page and evaluated there.
It means that the function cannot access scope variables or call other functions
defined in your Puppeteer script, and you need to define the entire function
logic within the function body.

:::

Alternatively, you can provide a function body as a string:

```ts
// Evaluate JavaScript
const three = await page.evaluate(`
    1 + 2
`);
```

:::caution

The example above produces the equivalent results but it also illustrates that
the types and global variables available to the evaluated function cannot be
known. Especially, in TypeScript you should be careful to make sure that objects
referenced by the evaluated function are correct.

:::

## Return types

The functions you evaluate can return values. If the returned value is of a
primitive type, it gets automatically converted by Puppeteer to a primitive type
in the script context like in the previous example.

If the script returns an object, Puppeteer serializes it to a JSON and
reconstructs it on the script side. This process might not always yield correct
results, for example, when you return a DOM node:

```ts
const body = await page.evaluate(() => {
	return document.body;
});
console.log(body); // {}, unexpected!
```

To work with the returned objects, Puppeteer offers a way to return objects by reference:

```ts
const body = await page.evaluateHandle(() => {
	return document.body;
});
console.log(body instanceof ElementHandle); // true
```

The returned object is either a `JSHandle` or a `ElementHandle`. `ElementHandle`
extends `JSHandle` and it is only created for DOM elements.

See the [API documentation](https://pptr.dev/api) for more details about what methods are available for handles.

## Returning promises

If you return a Promise from an evaluate call, the promise will be automatically
awaited. For example,

```ts
await page.evaluate(() => {
	// wait for 100ms.
	return new Promise((resolve) => setTimeout(resolve, 100));
});
// Execution continues here once the Promise created in the page context resolves.
```

## Passing arguments to the evaluate function

You can provide arguments to your function:

```ts
const three = await page.evaluate(
	(a, b) => {
		return a + b; // 1 + 2
	},
	1,
	2,
);
```

The arguments can be primitive values or `JSHandle`s.

:::note

Page, JSHandle and ElementHandle offer several different helpers to evaluate
JavaScript but they all follow the basic principles outlined in this guide.

:::

# Request Interception

Source: https://pptr.dev/guides/network-interception

Once request interception is enabled, every request will stall unless it's
continued, responded or aborted.

An example of a naïve request interceptor that aborts all image requests:

```ts
import puppeteer from 'puppeteer';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on('request', (interceptedRequest) => {
		if (interceptedRequest.isInterceptResolutionHandled()) return;
		if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) interceptedRequest.abort();
		else interceptedRequest.continue();
	});
	await page.goto('https://example.com');
	await browser.close();
})();
```

## Multiple Intercept Handlers and Asynchronous Resolutions

By default Puppeteer will raise a `Request is already handled!` exception if
`request.abort`, `request.continue`, or `request.respond` are called after any
of them have already been called.

Always assume that an unknown handler may have already called
`abort/continue/respond`. Even if your handler is the only one you registered,
3rd party packages may register their own handlers. It is therefore important to
always check the resolution status using
[request.isInterceptResolutionHandled](../api/puppeteer.httprequest.isinterceptresolutionhandled)
before calling `abort/continue/respond`.

Importantly, the intercept resolution may get handled by another listener while
your handler is awaiting an asynchronous operation. Therefore, the return value
of `request.isInterceptResolutionHandled` is only safe in a synchronous code
block. Always execute `request.isInterceptResolutionHandled` and
`abort/continue/respond` **synchronously** together.

This example demonstrates two synchronous handlers working together:

```ts
/*
This first handler will succeed in calling request.continue because the request interception has never been resolved.
*/
page.on('request', (interceptedRequest) => {
	if (interceptedRequest.isInterceptResolutionHandled()) return;
	interceptedRequest.continue();
});

/*
This second handler will return before calling request.abort because request.continue was already
called by the first handler.
*/
page.on('request', (interceptedRequest) => {
	if (interceptedRequest.isInterceptResolutionHandled()) return;
	interceptedRequest.abort();
});
```

This example demonstrates asynchronous handlers working together:

```ts
/*
This first handler will succeed in calling request.continue because the request interception has never been resolved.
*/
page.on('request', (interceptedRequest) => {
	// The interception has not been handled yet. Control will pass through this guard.
	if (interceptedRequest.isInterceptResolutionHandled()) return;

	// It is not strictly necessary to return a promise, but doing so will allow Puppeteer to await this handler.
	return new Promise((resolve) => {
		// Continue after 500ms
		setTimeout(() => {
			// Inside, check synchronously to verify that the intercept wasn't handled already.
			// It might have been handled during the 500ms while the other handler awaited an async op of its own.
			if (interceptedRequest.isInterceptResolutionHandled()) {
				resolve();
				return;
			}
			interceptedRequest.continue();
			resolve();
		}, 500);
	});
});
page.on('request', async (interceptedRequest) => {
	// The interception has not been handled yet. Control will pass through this guard.
	if (interceptedRequest.isInterceptResolutionHandled()) return;

	await someLongAsyncOperation();
	// The interception *MIGHT* have been handled by the first handler, we can't be sure.
	// Therefore, we must check again before calling continue() or we risk Puppeteer raising an exception.
	if (interceptedRequest.isInterceptResolutionHandled()) return;
	interceptedRequest.continue();
});
```

For finer-grained introspection (see Cooperative Intercept Mode below), you may
also call
[request.interceptResolutionState](../api/puppeteer.httprequest.interceptresolutionstate)
synchronously before using `abort/continue/respond`.

Here is the example above rewritten using `request.interceptResolutionState`

```ts
/*
This first handler will succeed in calling request.continue because the request interception has never been resolved.
*/
page.on('request', (interceptedRequest) => {
	// The interception has not been handled yet. Control will pass through this guard.
	const { action } = interceptedRequest.interceptResolutionState();
	if (action === InterceptResolutionAction.AlreadyHandled) return;

	// It is not strictly necessary to return a promise, but doing so will allow Puppeteer to await this handler.
	return new Promise((resolve) => {
		// Continue after 500ms
		setTimeout(() => {
			// Inside, check synchronously to verify that the intercept wasn't handled already.
			// It might have been handled during the 500ms while the other handler awaited an async op of its own.
			const { action } = interceptedRequest.interceptResolutionState();
			if (action === InterceptResolutionAction.AlreadyHandled) {
				resolve();
				return;
			}
			interceptedRequest.continue();
			resolve();
		}, 500);
	});
});
page.on('request', async (interceptedRequest) => {
	// The interception has not been handled yet. Control will pass through this guard.
	if (interceptedRequest.interceptResolutionState().action === InterceptResolutionAction.AlreadyHandled) return;

	await someLongAsyncOperation();
	// The interception *MIGHT* have been handled by the first handler, we can't be sure.
	// Therefore, we must check again before calling continue() or we risk Puppeteer raising an exception.
	if (interceptedRequest.interceptResolutionState().action === InterceptResolutionAction.AlreadyHandled) return;
	interceptedRequest.continue();
});
```

## Cooperative Intercept Mode

`request.abort`, `request.continue`, and `request.respond` can accept an
optional `priority` to work in Cooperative Intercept Mode. When all handlers are
using Cooperative Intercept Mode, Puppeteer guarantees that all intercept
handlers will run and be awaited in order of registration. The interception is
resolved to the highest-priority resolution. Here are the rules of Cooperative
Intercept Mode:

- All resolutions must supply a numeric `priority` argument to
  `abort/continue/respond`.
- If any resolution does not supply a numeric `priority`, Legacy Mode is active
  and Cooperative Intercept Mode is inactive.
- Async handlers finish before intercept resolution is finalized.
- The highest priority interception resolution "wins", i.e. the interception is
  ultimately aborted/responded/continued according to which resolution was given
  the highest priority.
- In the event of a tie, `abort` > `respond` > `continue`.

For standardization, when specifying a Cooperative Intercept Mode priority use
`0` or `DEFAULT_INTERCEPT_RESOLUTION_PRIORITY` (exported from `HTTPRequest`)
unless you have a clear reason to use a higher priority. This gracefully prefers
`respond` over `continue` and `abort` over `respond` and allows other handlers
to work cooperatively. If you do intentionally want to use a different priority,
higher priorities win over lower priorities. Negative priorities are allowed.
For example, `continue({}, 4)` would win over `continue({}, -2)`.

To preserve backward compatibility, any handler resolving the intercept without
specifying `priority` (Legacy Mode) causes immediate resolution. For Cooperative
Intercept Mode to work, all resolutions must use a `priority`. In practice, this
means you must still test for `request.isInterceptResolutionHandled` because a
handler beyond your control may have called `abort/continue/respond` without a
priority (Legacy Mode).

In this example, Legacy Mode prevails and the request is aborted immediately
because at least one handler omits `priority` when resolving the intercept:

```ts
// Final outcome: immediate abort()
page.setRequestInterception(true);
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Legacy Mode: interception is aborted immediately.
	request.abort('failed');
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;
	// Control will never reach this point because the request was already aborted in Legacy Mode

	// Cooperative Intercept Mode: votes for continue at priority 0.
	request.continue({}, 0);
});
```

In this example, Legacy Mode prevails and the request is continued because at
least one handler does not specify a `priority`:

```ts
// Final outcome: immediate continue()
page.setRequestInterception(true);
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to abort at priority 0.
	request.abort('failed', 0);
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Control reaches this point because the request was cooperatively aborted which postpones resolution.

	// { action: InterceptResolutionAction.Abort, priority: 0 }, because abort @ 0 is the current winning resolution
	console.log(request.interceptResolutionState());

	// Legacy Mode: intercept continues immediately.
	request.continue({});
});
page.on('request', (request) => {
	// { action: InterceptResolutionAction.AlreadyHandled }, because continue in Legacy Mode was called
	console.log(request.interceptResolutionState());
});
```

In this example, Cooperative Intercept Mode is active because all handlers
specify a `priority`. `continue()` wins because it has a higher priority than
`abort()`.

```ts
// Final outcome: cooperative continue() @ 5
page.setRequestInterception(true);
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to abort at priority 10
	request.abort('failed', 0);
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to continue at priority 5
	request.continue(request.continueRequestOverrides(), 5);
});
page.on('request', (request) => {
	// { action: InterceptResolutionAction.Continue, priority: 5 }, because continue @ 5 > abort @ 0
	console.log(request.interceptResolutionState());
});
```

In this example, Cooperative Intercept Mode is active because all handlers
specify `priority`. `respond()` wins because its priority ties with
`continue()`, but `respond()` beats `continue()`.

```ts
// Final outcome: cooperative respond() @ 15
page.setRequestInterception(true);
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to abort at priority 10
	request.abort('failed', 10);
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to continue at priority 15
	request.continue(request.continueRequestOverrides(), 15);
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to respond at priority 15
	request.respond(request.responseForRequest(), 15);
});
page.on('request', (request) => {
	if (request.isInterceptResolutionHandled()) return;

	// Cooperative Intercept Mode: votes to respond at priority 12
	request.respond(request.responseForRequest(), 12);
});
page.on('request', (request) => {
	// { action: InterceptResolutionAction.Respond, priority: 15 }, because respond @ 15 > continue @ 15 > respond @ 12 > abort @ 10
	console.log(request.interceptResolutionState());
});
```

## Cooperative Request Continuation

Puppeteer requires `request.continue()` to be called explicitly or the request
will hang. Even if your handler means to take no special action, or 'opt out',
`request.continue()` must still be called.

With the introduction of Cooperative Intercept Mode, two use cases arise for
cooperative request continuations: Unopinionated and Opinionated.

The first case (common) is that your handler means to opt out of doing anything
special the request. It has no opinion on further action and simply intends to
continue by default and/or defer to other handlers that might have an opinion.
But in case there are no other handlers, we must call `request.continue()` to
ensure that the request doesn't hang.

We call this an **Unopinionated continuation** because the intent is to continue
the request if nobody else has a better idea. Use
`request.continue({...}, DEFAULT_INTERCEPT_RESOLUTION_PRIORITY)` (or `0`) for
this type of continuation.

The second case (uncommon) is that your handler actually does have an opinion
and means to force continuation by overriding a lower-priority `abort()` or
`respond()` issued elsewhere. We call this an **Opinionated continuation**. In
these rare cases where you mean to specify an overriding continuation priority,
use a custom priority.

To summarize, reason through whether your use of `request.continue` is just
meant to be default/bypass behavior vs falling within the intended use case of
your handler. Consider using a custom priority for in-scope use cases, and a
default priority otherwise. Be aware that your handler may have both Opinionated
and Unopinionated cases.

## Upgrading to Cooperative Intercept Mode for package maintainers

If you are package maintainer and your package uses intercept handlers, you can
update your intercept handlers to use Cooperative Intercept Mode. Suppose you
have the following existing handler:

```ts
page.on('request', (interceptedRequest) => {
	if (request.isInterceptResolutionHandled()) return;
	if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) interceptedRequest.abort();
	else interceptedRequest.continue();
});
```

To use Cooperative Intercept Mode, upgrade `continue()` and `abort()`:

```ts
page.on('request', (interceptedRequest) => {
	if (request.isInterceptResolutionHandled()) return;
	if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) interceptedRequest.abort('failed', 0);
	else interceptedRequest.continue(interceptedRequest.continueRequestOverrides(), 0);
});
```

With those simple upgrades, your handler now uses Cooperative Intercept Mode
instead.

However, we recommend a slightly more robust solution because the above
introduces several subtle issues:

1. **Backward compatibility.** If any handler still uses a Legacy Mode
   resolution (ie, does not specify a priority), that handler will resolve the
   interception immediately even if your handler runs first. This could cause
   disconcerting behavior for your users because suddenly your handler is not
   resolving the interception and a different handler is taking priority when
   all the user did was upgrade your package.
2. **Hard-coded priority.** Your package user has no ability to specify the
   default resolution priority for your handlers. This can become important when
   the user wishes to manipulate the priorities based on use case. For example,
   one user might want your package to take a high priority while another user
   might want it to take a low priority.

To resolve both of these issues, our recommended approach is to export a
`setInterceptResolutionConfig()` from your package. The user can then call
`setInterceptResolutionConfig()` to explicitly activate Cooperative Intercept
Mode in your package so they aren't surprised by changes in how the interception
is resolved. They can also optionally specify a custom priority using
`setInterceptResolutionConfig(priority)` that works for their use case:

```ts
// Defaults to undefined which preserves Legacy Mode behavior
let _priority = undefined;

// Export a module configuration function
export const setInterceptResolutionConfig = (priority = 0) => (_priority = priority);

/**
 * Note that this handler uses `DEFAULT_INTERCEPT_RESOLUTION_PRIORITY` to "pass" on this request. It is important to use
 * the default priority when your handler has no opinion on the request and the intent is to continue() by default.
 */
page.on('request', (interceptedRequest) => {
	if (request.isInterceptResolutionHandled()) return;
	if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) interceptedRequest.abort('failed', _priority);
	else
		interceptedRequest.continue(
			interceptedRequest.continueRequestOverrides(),
			DEFAULT_INTERCEPT_RESOLUTION_PRIORITY, // Unopinionated continuation
		);
});
```

If your package calls for more fine-grained control over resolution priorities,
use a config pattern like this:

```ts
interface InterceptResolutionConfig {
	abortPriority?: number;
	continuePriority?: number;
}

// This approach supports multiple priorities based on situational
// differences. You could, for example, create a config that
// allowed separate priorities for PNG vs JPG.
const DEFAULT_CONFIG: InterceptResolutionConfig = {
	abortPriority: undefined, // Default to Legacy Mode
	continuePriority: undefined, // Default to Legacy Mode
};

// Defaults to undefined which preserves Legacy Mode behavior
let _config: Partial<InterceptResolutionConfig> = {};

export const setInterceptResolutionConfig = (config: InterceptResolutionConfig) => (_config = { ...DEFAULT_CONFIG, ...config });

page.on('request', (interceptedRequest) => {
	if (request.isInterceptResolutionHandled()) return;
	if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) {
		interceptedRequest.abort('failed', _config.abortPriority);
	} else {
		// Here we use a custom-configured priority to allow for Opinionated
		// continuation.
		// We would only want to allow this if we had a very clear reason why
		// some use cases required Opinionated continuation.
		interceptedRequest.continue(
			interceptedRequest.continueRequestOverrides(),
			_config.continuePriority, // Why would we ever want priority!==0 here?
		);
	}
});
```

The above solutions ensure backward compatibility while also allowing the user
to adjust the importance of your package in the resolution chain when
Cooperative Intercept Mode is being used. Your package continues to work as
expected until the user has fully upgraded their code and all third party
packages to use Cooperative Intercept Mode. If any handler or package still uses
Legacy Mode, your package can still operate in Legacy Mode too.

# Cookies

Source: https://pptr.dev/guides/cookies

Puppeteer offers methods to get, set and delete cookies ahead of time by
manipulating browser storage directly. This is useful if you need to
store and restore specific cookies for your tests.

## Getting cookies

The following example demonstrates how to get cookies available in the
browser's default
[BrowserContext](https://pptr.dev/api/puppeteer.browsercontext).

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto('https://example.com');

// In this example, we set a cookie using script evaluation.
// Cookies can be set by the page/server in various ways.
await page.evaluate(() => {
	document.cookie = 'myCookie = MyCookieValue';
});

console.log(await browser.cookies()); // print available cookies.
```

## Setting cookies

Puppeteer can also write cookies directly into the browser's storage:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

// Sets two cookies for the localhost domain.
await browser.setCookie(
	{
		name: 'cookie1',
		value: '1',
		domain: 'localhost',
		path: '/',
		expires: -1,
		httpOnly: false,
		secure: false,
		sourceScheme: 'NonSecure',
	},
	{
		name: 'cookie2',
		value: '2',
		domain: 'localhost',
		path: '/',
		expires: -1,
		httpOnly: false,
		secure: false,
		sourceScheme: 'NonSecure',
	},
);

console.log(await browser.cookies()); // print available cookies.
```

## Deleting cookies

[Browser.deleteCookie()](https://pptr.dev/api/puppeteer.browser.deletecookie) method allows deleting cookies from storage.

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

// Deletes two cookies for the localhost domain.
await browser.deleteCookie(
	{
		name: 'cookie1',
		value: '1',
		domain: 'localhost',
		path: '/',
		expires: -1,
		httpOnly: false,
		secure: false,
		sourceScheme: 'NonSecure',
	},
	{
		name: 'cookie2',
		value: '2',
		domain: 'localhost',
		path: '/',
		expires: -1,
		httpOnly: false,
		secure: false,
		sourceScheme: 'NonSecure',
	},
);

console.log(await browser.cookies()); // print available cookies.
```

In addition to the `Browser` methods operating on the default browser
context, the same methods are available on the
[`BrowserContext`](https://pptr.dev/api/puppeteer.browsercontext) class.

# Files

Source: https://pptr.dev/guides/files

Currently, Puppeteer does not offer a way to handle file downloads in a programmatic way.
For uploading files, you need to locate a file input element and call [`ElementHandle.uploadFile`](https://pptr.dev/api/puppeteer.elementhandle.uploadfile).

```ts
const fileElement = await page.waitForSelector('input[type=file]');
await fileElement.uploadFile(['./path-to-local-file']);
```

# Screenshots

Source: https://pptr.dev/guides/screenshots

For capturing screenshots use [`Page.screenshot()`](https://pptr.dev/api/puppeteer.page.screenshot).

```ts
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com', {
	waitUntil: 'networkidle2',
});
await page.screenshot({
	path: 'hn.png',
});

await browser.close();
```

You can also capture a screenshot of a specific element using [`ElementHandle.screenshot()`](https://pptr.dev/api/puppeteer.elementhandle.screenshot):

```ts
const fileElement = await page.waitForSelector('div');
await fileElement.screenshot({
	path: 'div.png',
});
```

By default, [`ElementHandle.screenshot()`](https://pptr.dev/api/puppeteer.elementhandle.screenshot) tries to scroll the element into view
if it is hidden.

# PDF generation

Source: https://pptr.dev/guides/pdf-generation

For printing PDFs use [`Page.pdf()`](https://pptr.dev/api/puppeteer.page.pdf).

```ts
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com', {
	waitUntil: 'networkidle2',
});
// Saves the PDF to hn.pdf.
await page.pdf({
	path: 'hn.pdf',
});

await browser.close();
```

By default, the [`Page.pdf()`](https://pptr.dev/api/puppeteer.page.pdf) waits for fonts to be loaded.

# Headless mode

Source: https://pptr.dev/guides/headless-modes

By default Puppeteer launches the browser in
[the Headless mode](https://developer.chrome.com/docs/chromium/new-headless/).

```ts
const browser = await puppeteer.launch();
// Equivalent to
const browser = await puppeteer.launch({ headless: true });
```

Before v22, Puppeteer launched the [old Headless mode](https://developer.chrome.com/docs/chromium/new-headless/) by default.
The old headless mode is now known as
[`chrome-headless-shell`](https://developer.chrome.com/blog/chrome-headless-shell)
and ships as a separate binary. `chrome-headless-shell` does not match the
behavior of the regular Chrome completely but it is currently more performant
for automation tasks where the complete Chrome feature set is not needed. If the performance
is more important for your use case, switch to `chrome-headless-shell` as following:

```ts
const browser = await puppeteer.launch({ headless: 'shell' });
```

To launch a "headful" version of Chrome, set the
[`headless`](https://pptr.dev/api/puppeteer.launchoptions) to `false`
option when launching a browser:

```ts
const browser = await puppeteer.launch({ headless: false });
```

# Screen configuration

Source: https://pptr.dev/guides/screen-configuration

Use [`--screen-info`](https://chromium.googlesource.com/chromium/src/+/main/components/headless/screen_info/README.md) command line switch to configure headless screen.

The following script configures Chrome to run in a dual-screen configuration. The primary 800x600 screen is configured in a landscape orientation, and the secondary 600x800 screen, positioned directly to the right of the primary screen, is in a portrait orientation.

```ts
import puppeteer from 'puppeteer-core';

(async () => {
	const browser = await puppeteer.launch({
		args: ['--screen-info={800x600 label=1st}{600x800 label=2nd}'],
	});

	const screens = await browser.screens();
	const screenInfos = screens.map(
		(s) =>
			`Screen [${s.id}]` +
			` ${s.left},${s.top} ${s.width}x${s.height}` +
			` label='${s.label}'` +
			` isPrimary=${s.isPrimary}` +
			` isExtended=${s.isExtended}` +
			` isInternal=${s.isInternal}` +
			` colorDepth=${s.colorDepth}` +
			` devicePixelRatio=${s.devicePixelRatio}` +
			` avail=${s.availLeft},${s.availTop} ${s.availWidth}x${s.availHeight}` +
			` orientation.type=${s.orientation.type}` +
			` orientation.angle=${s.orientation.angle}`,
	);

	console.log(`Number of screens: ${screens.length}\n` + screenInfos.join('\n'));

	await browser.close();
})();
```

Output:

```
Number of screens: 2
Screen [1] 0,0 800x600 label='1st' isPrimary=true isExtended=true isInternal=false colorDepth=24 devicePixelRatio=1 avail=0,0 800x600 orientation.type=landscapePrimary orientation.angle=0
Screen [2] 800,0 600x800 label='2nd' isPrimary=false isExtended=true isInternal=false colorDepth=24 devicePixelRatio=1 avail=800,0 600x800 orientation.type=portraitPrimary orientation.angle=0
```

With no `--screen-info` switch, the headless screen has one 800x600 screen unless the `--window-size` switch is specified, in which case the headless screen is as large as the requested window size.

:::caution

The `--screen-info` switch is only available in headless mode. Headful Chrome always uses physical platform screens.

:::

## Dynamic headless screen configuration

Use Puppeteer's [`Browser.addScreen`](https://pptr.dev/next/api/puppeteer.browser.addscreen) and [`Browser.removeScreen`](https://pptr.dev/next/api/puppeteer.browser.removescreen) methods to add and remove screens while Chrome browser is running. Use [`Browser.screens`](https://pptr.dev/next/api/puppeteer.browser.screens) method to retrieve the current screen configuration.

The following script adds and removes a secondary screen while logging the screen configuration at each step.

```ts
import puppeteer from 'puppeteer-core';

(async () => {
	const browser = await puppeteer.launch({
		args: ['--screen-info={800x600 label=1st}'],
	});

	function getScreenInfo(s) {
		return `Screen [${s.id}]` + ` ${s.left},${s.top} ${s.width}x${s.height}` + ` label='${s.label}'` + ` isPrimary=${s.isPrimary}` + ` isExtended=${s.isExtended}`;
	}

	async function logScreenConfig(text) {
		if (text !== undefined) {
			console.log(text);
		}
		const screens = await browser.screens();
		const screenInfos = screens.map((s) => getScreenInfo(s));

		console.log(`Number of screens: ${screens.length}\n` + screenInfos.join('\n'));
	}

	await logScreenConfig('---- Initial:');

	// Add a screen.
	const addedScreenInfo = await browser.addScreen({
		left: 800,
		top: 0,
		width: 800,
		height: 600,
		label: '2nd',
	});

	console.log('Added screen: ' + getScreenInfo(addedScreenInfo));
	await logScreenConfig('---- With the screen added:');

	// Remove the added screen.
	await browser.removeScreen(addedScreenInfo.id);
	await logScreenConfig('---- With added screen removed:');

	await browser.close();
})();
```

Output:

```
---- Initial:
Number of screens: 1
Screen [1] 0,0 800x600 label='1st' isPrimary=true isExtended=false
Added screen: Screen [2] 800,0 800x600 label='2nd' isPrimary=false isExtended=true
---- With the screen added:
Number of screens: 2
Screen [1] 0,0 800x600 label='1st' isPrimary=true isExtended=true
Screen [2] 800,0 800x600 label='2nd' isPrimary=false isExtended=true
---- With added screen removed:
Number of screens: 1
Screen [1] 0,0 800x600 label='1st' isPrimary=true isExtended=false
```

:::caution

The `Browser.addScreen` and `Browser.removeScreen` methods are only available in headless mode. The `Browser.screens` method is available in both headful and headless modes.

:::

# Window management

Source: https://pptr.dev/guides/window-management

Use Puppeteer's [`Browser.getWindowBounds`](https://pptr.dev/api/puppeteer.browser.getwindowbounds) and[`Browser.setWindowBounds`](https://pptr.dev/api/puppeteer.browser.setwindowbounds) methods to manage browser window position and state.

The following script opens a window at the default position on a primary 800x600 screen, then moves that window to a newly created screen and maximizes it there. After that it restores the window to its normal state.

```ts
import puppeteer from 'puppeteer-core';

(async () => {
	const browser = await puppeteer.launch({
		args: ['--screen-info={800x600}'],
	});

	async function logWindowBounds() {
		const bounds = await browser.getWindowBounds(windowId);
		console.log(`${bounds.left},${bounds.top}` + ` ${bounds.width}x${bounds.height}` + ` ${bounds.windowState}`);
	}

	// Create new page.
	const page = await browser.newPage({ type: 'window' });
	const windowId = await page.windowId();
	await logWindowBounds();

	// Add a screen to the right of the primary screen.
	const screenInfo = await browser.addScreen({
		left: 800,
		top: 0,
		width: 1600,
		height: 1200,
	});

	// Move the window to the newly created secondary screen.
	await browser.setWindowBounds(windowId, {
		left: screenInfo.left + 50,
		top: screenInfo.top + 50,
		width: screenInfo.width - 100,
		height: screenInfo.height - 100,
	});
	await logWindowBounds();

	// Maximize the window.
	await browser.setWindowBounds(windowId, { windowState: 'maximized' });
	await logWindowBounds();

	// Restore the window.
	await browser.setWindowBounds(windowId, { windowState: 'normal' });
	await logWindowBounds();

	await browser.close();
})();
```

Output:

```
20,20 780x580 normal
850,50 1500x1100 normal
800,0 1600x1200 maximized
850,50 1500x1100 normal
```

## Sizing page content

Use Puppeteer's [`Page.resize`](https://pptr.dev/api/puppeteer.page.resize) method to adjust the browser window size so that the content has the specified size.

Example:

```ts
import puppeteer from 'puppeteer-core';

(async () => {
	const browser = await puppeteer.launch({
		args: ['--screen-info={800x600}'],
	});

	const page = (await browser.pages())[0];

	// Default viewport restricts window to 800x600, so remove it.
	await page.setViewport(null);

	// Inner window size is updated asynchronously, so wait for
	// the window size change to get reported before logging it.
	const resized = page.evaluate(() => {
		return new Promise((resolve) => {
			window.onresize = resolve;
		});
	});

	await page.resize({ contentWidth: 600, contentHeight: 400 });
	await resized;

	const result = await page.evaluate(() => {
		return `Inner size: ${window.innerWidth}x${window.innerHeight}\n` + `Outer size: ${window.outerWidth}x${window.outerHeight}`;
	});

	console.log(result);

	await browser.close();
})();
```

Output:

```
Inner size: 600x400
Outer size: 600x487
```

## Fullscreen element

The following example demonstrates how to request full-screen mode for an element on click.

```ts
import puppeteer from 'puppeteer-core';

(async () => {
	const browser = await puppeteer.launch({
		args: ['--screen-info={1600x1200}'],
	});

	const page = (await browser.pages())[0];
	await page.setContent(`
    <div id="click-box" style="width: 10px; height: 10px;"/>
  `);

	await page.evaluate(() => {
		const element = document.getElementById('click-box');
		element.addEventListener('click', () => {
			element.requestFullscreen();
		});
	});

	await page.click('#click-box');

	const windowId = await page.windowId();
	const bounds = await browser.getWindowBounds(windowId);
	console.log(`${bounds.left},${bounds.top}` + ` ${bounds.width}x${bounds.height}` + ` ${bounds.windowState}`);

	await browser.close();
})();
```

Output:

```
0,0 1600x1200 fullscreen
```

# Network logging

Source: https://pptr.dev/guides/network-logging

By default, Puppeteer listens for all network requests and responses and emits network events on the page.

```ts
const page = await browser.newPage();
page.on('request', (request) => {
	console.log(request.url());
});

page.on('response', (response) => {
	console.log(response.url());
});
```

# Debugging

Source: https://pptr.dev/guides/debugging

Debugging with Puppeteer can be an arduous task. There is no _single_ method for
debugging all possible issues since Puppeteer touches many distinct components
of a browser such as network requests and Web APIs. On a high note, Puppeteer
provides _several_ methods for debugging which hopefully do cover all possible
issues.

## Background

In general, there are two possible sources of an issue: Code running on Node.js
(which we call _server code_), and
[code running in the browser](../api/puppeteer.page.evaluate)
(which we call _client code_). There is also a third possible source being the
browser itself (which we call _internal code_ or _browser code_), but if you suspect this is the
source **after attempting the methods below**, we suggest
[searching existing issues](https://github.com/puppeteer/puppeteer/issues)
before
[filing an issue](https://github.com/puppeteer/puppeteer/issues/new/choose).

## Debugging methods for all situations

These methods can be used to debug any situation. These should be used as a
quick sanity check before diving into more complex methods.

### Turn off [`headless`](../api/puppeteer.launchoptions)

Sometimes it's useful to see what the browser is displaying. Instead of
launching in
[`headless`](../api/puppeteer.launchoptions) mode,
launch a full version of the browser with
[`headless`](../api/puppeteer.launchoptions) set to
`false`:

```ts
const browser = await puppeteer.launch({ headless: false });
```

### Puppeteer "slow-mo"

The [`slowMo`](../api/puppeteer.connectoptions) option slows down
Puppeteer operations by a specified amount of milliseconds. It's another way to
help see what's going on.

```ts
const browser = await puppeteer.launch({
	headless: false,
	slowMo: 250, // slow down by 250ms
});
```

## Debugging methods for client code

### Capture `console.*` output

Since client code runs in the browser, doing `console.*` in client code will not
directly log to Node.js. However, you can [listen (page.on)](../api/puppeteer.page) for
the [`console`](../api/puppeteer.pageevents) event which returns a
payload with the logged text.

```ts
page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

await page.evaluate(() => console.log(`url is ${location.href}`));
```

### Use the debugger in the browser

1. Set [`devtools`](../api/puppeteer.launchoptions) to
   `true` when launching Puppeteer:

    ```ts
    const browser = await puppeteer.launch({ devtools: true });
    ```

2. Add `debugger` inside any client code you want debugged. For example,

    ```ts
    await page.evaluate(() => {
    	debugger;
    });
    ```

    The Browser will now stop in the location the `debugger` word is found in
    debug mode.

## Debugging methods for server code

### Use the debugger in Node.js (Chrome/Chromium-only)

Since server code intermingles with client code, this method of debugging is
closely tied with the browser. For example, you can step over
`await page.click()` in the server script and see the click happen in the
browser.

Note that you won't be able to run `await page.click()` in DevTools console due
to this
[Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=833928), so
if you want to try something out, you have to add it to your test file.

1. Set [`headless`](../api/puppeteer.launchoptions) to
   `false`.
2. Add `debugger` to any server code you want debugged. For example,

    ```ts
    debugger;
    await page.click('a[target=_blank]');
    ```

3. Run your server code with `--inspect-brk`. For example,

    ```bash
    node --inspect-brk path/to/script.js
    ```

4. In the opened Chrome/Chromium browser, open `chrome://inspect/#devices` and
   click `inspect`.
5. In the newly opened test browser, press `F8` to resume test execution.
6. Now your `debugger` statement will be hit and you can debug in the test
   browser.

### Log DevTools protocol traffic

If all else fails, it's possible there may be an issue between Puppeteer and the
DevTools protocol. You can debug this by setting the `DEBUG` environment
variable before running your script. This will log internal traffic via
[`debug`](https://github.com/visionmedia/debug) under the `puppeteer` namespace.

:::warning

The logs may include sensitive information.

:::

```bash
# Basic verbose logging
env DEBUG="puppeteer:*" node script.js

# Prevent truncating of long messages
env DEBUG="puppeteer:*" env DEBUG_MAX_STRING_LENGTH=null node script.js

# Protocol traffic can be rather noisy. This example filters out all Network domain messages
env DEBUG="puppeteer:*" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'

# Filter out all protocol messages but keep all other logging
env DEBUG="puppeteer:*,-puppeteer:protocol:*" node script.js
```

### Log pending protocol calls

If you encounter issues with async Puppeteer calls not getting resolved, try logging
pending callbacks by using the [`debugInfo`](https://pptr.dev/api/puppeteer.browser/#properties) interface
to see what call is the cause:

```ts
console.log(browser.debugInfo.pendingProtocolErrors);
```

The getter returns a list of `Error` objects and the stacktraces of the error objects
indicate which code triggered a protocol call.

## Debugging methods for the browser code

### Print browser logs

If the browser unexpectedly crashes or does not launch properly, it could be useful
to inspect logs from the browser process by setting the launch attribute `dumpio` to `true`.

```ts
const browser = await puppeteer.launch({
	dumpio: true,
});
```

In this case, Puppeteer forwards browser logs to the Node process' stdio.

# Docker

Source: https://pptr.dev/guides/docker

Puppeteer offers a Docker image that includes [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) along with the required
dependencies and a pre-installed Puppeteer version. The image is available via
the
[GitHub Container Registry](https://github.com/puppeteer/puppeteer/pkgs/container/puppeteer).
The latest image is tagged as `latest` and other tags match Puppeteer versions.
For example,

```bash
docker pull ghcr.io/puppeteer/puppeteer:latest # pulls the latest
docker pull ghcr.io/puppeteer/puppeteer:16.1.0 # pulls the image that contains Puppeteer v16.1.0
```

The image is meant for running the browser in sandbox mode and therefore,
running the image requires the `SYS_ADMIN` capability.

## Usage

To use the docker image directly, run:

```bash
docker run -i --init --cap-add=SYS_ADMIN --rm ghcr.io/puppeteer/puppeteer:latest node -e "$(cat path/to/script.js)"
```

where `path/to/script.js` is the path relative to your working directory. Note
the image requires the `SYS_ADMIN` capability since the browser runs in sandbox
mode.

If you need to build an image based on a different base image, you can use our
[`Dockerfile`](https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile)
as the starting point.

:::caution

Make sure to specify a init process via the `--init` flag or a custom `ENTRYPOINT`
to make sure all processes started by Puppeteer are managed properly.

:::

## dbus

The image installs and configures dbus for Chrome. Usually you would not
need dbus in the headless mode but you might see warnings in the browser
console. You can start the dbus service before launching
your application:

```
sudo service dbus start
```

See https://docs.docker.com/config/containers/multi-service_container/
for instructions how to start multiple processes in a container.

# Configuration

Source: https://pptr.dev/guides/configuration

By default, Puppeteer downloads and uses a specific version of Chrome so its
API is guaranteed to work out of the box. To use Puppeteer with a different
version of Chrome or Chromium, pass in the executable's path when creating a
`Browser` instance:

```ts
const browser = await puppeteer.launch({ executablePath: '/path/to/Chrome' });
```

You can also use Puppeteer with Firefox. See
[status of cross-browser support](https://pptr.dev/faq#q-what-is-the-status-of-cross-browser-support) for
more information.

All defaults in Puppeteer can be customized in two ways:

1. [Configuration files](#configuration-files) (**recommended**)
2. [Environment variables](#environment-variables)

:::caution

Note that some options are only customizable through environment variables (such
as `HTTPS_PROXY`).

:::

:::caution

Puppeteer's configuration files and environment variables are ignored by `puppeteer-core`.

:::

## Configuration files

Configuration files are the **recommended** choice for configuring Puppeteer.
Puppeteer will look up the file tree for any of the following formats:

- `.puppeteerrc.cjs`,
- `.puppeteerrc.js`,
- `.puppeteerrc` (YAML/JSON),
- `.puppeteerrc.json`,
- `.puppeteerrc.yaml`,
- `puppeteer.config.js`, and
- `puppeteer.config.cjs`

See the [`Configuration`](../api/puppeteer.configuration) interface for possible
options.

### Changing download options

When the changes to the configuration include changes to download option,
you will need to re-run postinstall scripts for them to take effect.

This can most easily be done with running:

```bash npm2yarn
npx puppeteer browsers install
```

### Examples

#### Downloading multiple browsers

Starting with v23.0.0, Puppeteer allows downloading multiple browser
without the need to run multiple commands.

Update the Puppeteer configuration file:

```js title="project-directory/.puppeteerrc.cjs"
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	// Download Chrome (default `skipDownload: false`).
	chrome: {
		skipDownload: false,
	},
	// Download Firefox (default `skipDownload: true`).
	firefox: {
		skipDownload: false,
	},
};
```

Run CLI to download the new configuration:

```bash npm2yarn
npx puppeteer browsers install
```

#### Changing the default cache directory

Starting in v19.0.0, Puppeteer stores browsers in `~/.cache/puppeteer` to
globally cache browsers between installation. This can cause problems if
`puppeteer` is packed during some build step and moved to a fresh location. The
following configuration can solve this issue (reinstall `puppeteer` to take
effect):

```js title="project-directory/.puppeteerrc.cjs"
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	// Changes the cache location for Puppeteer.
	cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
```

:::note

Notice this is only possible with CommonJS configuration files as information
about the ambient environment is needed (in this case, `__dirname`).

:::

## Environment variables

Along with configuration files, Puppeteer looks for certain
[environment variables](https://en.wikipedia.org/wiki/Environment_variable) for
customizing behavior. Environment variables will always override configuration
file options when applicable.

The following options are _environment-only_ options

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - defines HTTP proxy settings that are
  used to download and run the browser.

All other options can be found in the documentation for the
[`Configuration`](../api/puppeteer.configuration) interface.

# Chrome Extensions

Source: https://pptr.dev/guides/chrome-extensions

Puppeteer can be used for testing Chrome Extensions.

## Load extensions

### Using `LaunchOptions`

```ts
import puppeteer from 'puppeteer';
import path from 'path';

const pathToExtension = path.join(process.cwd(), 'my-extension');
const browser = await puppeteer.launch({
	pipe: true,
	enableExtensions: [pathToExtension],
});
```

### At runtime

```ts
import puppeteer from 'puppeteer';
import path from 'path';

const pathToExtension = path.join(process.cwd(), 'my-extension');
const browser = await puppeteer.launch({
	pipe: true,
	enableExtensions: true,
});

const extensionId = await browser.installExtension(pathToExtension);
```

### Listing and uninstalling

You can list all installed extensions and their properties using the `browser.extensions()` method. To uninstall an extension, use the `browser.uninstallExtension()` method.

```ts
const extensions = await browser.extensions();
const extension = extensions.get(extensionId);

console.log(extension?.name);
console.log(extension?.version);

await browser.uninstallExtension(extensionId);
```

## Background contexts

You can get a reference to the extension service worker or background page, which can be useful for evaluating code in the extension context or forcefully terminating the service worker.

### Service worker (MV3)

```ts
import puppeteer from 'puppeteer';
import path from 'path';

const pathToExtension = path.join(process.cwd(), 'my-extension');
const browser = await puppeteer.launch({
	pipe: true,
	enableExtensions: [pathToExtension],
});

const workerTarget = await browser.waitForTarget(
	// Assumes that there is only one service worker created by the extension and its URL ends with background.js.
	(target) => target.type() === 'service_worker' && target.url().endsWith('background.js'),
);

const worker = await workerTarget.worker();

// Test the service worker.

await browser.close();
```

### Background page (MV2)

The following is code for getting a handle to the
[background page](https://developer.chrome.com/extensions/background_pages) of
an extension whose source is located in `./my-extension`:

```ts
import puppeteer from 'puppeteer';
import path from 'path';

const pathToExtension = path.join(process.cwd(), 'my-extension');
const browser = await puppeteer.launch({
	pipe: true,
	enableExtensions: [pathToExtension],
});
const backgroundPageTarget = await browser.waitForTarget((target) => target.type() === 'background_page');
const backgroundPage = await backgroundPageTarget.page();

// Test the background page as you would any other page.

await browser.close();
```

## Popup

Access the service worker [as above](#service-worker-mv3). Then:

```ts
await worker.evaluate('chrome.action.openPopup();');

const popupTarget = await browser.waitForTarget(
	// Assumes that there is only one page with the URL ending with popup.html
	// and that is the popup created by the extension.
	(target) => target.type() === 'page' && target.url().endsWith('popup.html'),
);

const popupPage = await popupTarget.asPage();

// Test the popup page as you would any other page.

await browser.close();
```

## Triggering extension action

You can trigger the default extension action for a page using the `page.triggerExtensionAction()` method. This will trigger the extension's action as if the user clicked the extension's button in the toolbar.

```ts
const extensions = await browser.extensions();
const extension = extensions.get(extensionId);

// You can trigger the action for a specific extension on a page.
await page.triggerExtensionAction(extension);

// Alternatively, you can trigger it from the extension object itself.
await extension.triggerAction(page);

// If the action opens a popup, you can then wait for the popup target.
const popupTarget = await browser.waitForTarget((target) => target.type() === 'page' && target.url().includes(extensionId) && target.url().endsWith('popup.html'));
```

## Content scripts

Content scripts are injected as normal. Use `browser.newPage()` and `page.goto()` to navigate to a page where a content script will be injected.

To evaluate code in the context of a content script, you can use the `page.extensionRealms()` method to find the realm associated with the extension and then use its `evaluate()` method.

```ts
// Get the extension ID
const extensionId = await browser.installExtension(pathToExtension);

// Find the extension realm.
const realms = page.extensionRealms();
let extensionRealm;
for (const realm of realms) {
	const extension = await realm.extension();
	if (extension?.id === extensionId) {
		extensionRealm = realm;
		break;
	}
}

if (!extensionRealm) {
	throw new Error('Extension realm not found');
}

// Evaluate code in the content script context.
const result = await extensionRealm.evaluate(() => {
	return document.title;
});
```

## Learn more

To learn more, see the documentation on [Chrome for Developers](https://developer.chrome.com/docs/extensions/how-to/test/end-to-end-testing).

# Links

Source: https://pptr.dev/guides/links

- [API Documentation](https://pptr.dev/api)
- [Guides](https://pptr.dev/category/guides)
- [Examples](https://github.com/puppeteer/puppeteer/tree/main/examples)
- [Community list of Puppeteer resources](https://github.com/transitive-bullshit/awesome-puppeteer)

# Puppeteer Angular Schematic

Source: https://pptr.dev/guides/ng-schematics

Adds Puppeteer-based e2e tests to your Angular project.

## Getting started

Run the command below in an Angular CLI app directory and follow the prompts.

> Note this will add the schematic as a dependency to your project.

```bash
ng add @puppeteer/ng-schematics
```

Or you can use the same command followed by the [options](#options) below.

Currently, this schematic supports the following test runners:

- [**Jasmine**](https://jasmine.github.io/)
- [**Jest**](https://jestjs.io/)
- [**Mocha**](https://mochajs.org/)
- [**Node Test Runner**](https://nodejs.org/api/test.html)

With the schematics installed you can run E2E tests:

```bash
ng e2e
```

### Options

When adding schematics to your project you can to provide following options:

| Option          | Description                                            | Value                                      | Required |
| --------------- | ------------------------------------------------------ | ------------------------------------------ | -------- |
| `--test-runner` | The testing framework to install along side Puppeteer. | `"jasmine"`, `"jest"`, `"mocha"`, `"node"` | `true`   |

## Creating a single test file

Puppeteer Angular Schematic exposes a method to create a single test file.

```bash
ng generate @puppeteer/ng-schematics:e2e "<TestName>"
```

### Running test server and dev server at the same time

By default the E2E test will run the app on the same port as `ng start`.
To avoid this you can specify the port in the `angular.json`
Update either `e2e` or `puppeteer` (depending on the initial setup) to:

```json
{
  "e2e": {
    "builder": "@puppeteer/ng-schematics:puppeteer",
    "options": {
      "commands": [...],
      "devServerTarget": "sandbox:serve",
      "testRunner": "<TestRunner>",
      "port": 8080
    },
    ...
}
```

Now update the E2E test file `utils.ts` baseUrl to:

```ts
const baseUrl = 'http://localhost:8080';
```

## Contributing

Check out our [contributing guide](https://pptr.dev/contributing) to get an overview of what you need to develop in the Puppeteer repo.

### Sandbox smoke tests

To make integration easier smoke test can be run with a single command, that will create a fresh install of Angular (single application and a multi application projects). Then it will install the schematics inside them and run the initial e2e tests:

```bash
node tools/smoke.mjs
```

### Unit Testing

The schematics utilize `@angular-devkit/schematics/testing` for verifying correct file creation and `package.json` updates. To execute the test suit:

```bash npm2yarn
npm run test
```

## Migrating from Protractor

### Entry point

Puppeteer has its own [`browser`](https://pptr.dev/api/puppeteer.browser) that exposes the browser process.
A more close comparison for Protractor's `browser` would be Puppeteer's [`page`](https://pptr.dev/api/puppeteer.page).

```ts
// Testing framework specific imports

import { setupBrowserHooks, getBrowserState } from './utils';

describe('<Test Name>', function () {
	setupBrowserHooks();
	it('is running', async function () {
		const { page } = getBrowserState();
		// Query elements
		await page
			.locator('my-component')
			// Click on the element once found
			.click();
	});
});
```

### Getting element properties

You can easily get any property of the element.

```ts
// Testing framework specific imports

import { setupBrowserHooks, getBrowserState } from './utils';

describe('<Test Name>', function () {
	setupBrowserHooks();
	it('is running', async function () {
		const { page } = getBrowserState();
		// Query elements
		const elementText = await page
			.locator('.my-component')
			.map((button) => button.innerText)
			// Wait for element to show up
			.wait();

		// Assert via assertion library
	});
});
```

### Query Selectors

Puppeteer supports multiple types of selectors, namely, the CSS, ARIA, text, XPath and pierce selectors.
The following table shows Puppeteer's equivalents to [Protractor By](https://www.protractortest.org/#/api?view=ProtractorBy).

> For improved reliability and reduced flakiness try our
> **Experimental** [Locators API](https://pptr.dev/guides/page-interactions#locators)

| By                | Protractor code                               | Puppeteer querySelector                                      |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------ |
| CSS (Single)      | `$(by.css('<CSS>'))`                          | `page.$('<CSS>')`                                            |
| CSS (Multiple)    | `$$(by.css('<CSS>'))`                         | `page.$$('<CSS>')`                                           |
| Id                | `$(by.id('<ID>'))`                            | `page.$('#<ID>')`                                            |
| CssContainingText | `$(by.cssContainingText('<CSS>', '<TEXT>'))`  | `page.$('<CSS> ::-p-text(<TEXT>)')` `                        |
| DeepCss           | `$(by.deepCss('<CSS>'))`                      | `page.$(':scope >>> <CSS>')`                                 |
| XPath             | `$(by.xpath('<XPATH>'))`                      | `page.$('::-p-xpath(<XPATH>)')`                              |
| JS                | `$(by.js('document.querySelector("<CSS>")'))` | `page.evaluateHandle(() => document.querySelector('<CSS>'))` |

> For advanced use cases such as Protractor's `by.addLocator` you can check Puppeteer's [Custom selectors](https://pptr.dev/guides/query-selectors#custom-selectors).

### Actions Selectors

Puppeteer allows you to all necessary actions to allow test your application.

```ts
// Click on the element.
element(locator).click();
// Puppeteer equivalent
await page.locator(locator).click();

// Send keys to the element (usually an input).
element(locator).sendKeys('my text');
// Puppeteer equivalent
await page.locator(locator).fill('my text');

// Clear the text in an element (usually an input).
element(locator).clear();
// Puppeteer equivalent
await page.locator(locator).fill('');

// Get the value of an attribute, for example, get the value of an input.
element(locator).getAttribute('value');
// Puppeteer equivalent
const element = await page.locator(locator).waitHandle();
const value = await element.getProperty('value');
```

### Example

Sample Protractor test:

```ts
describe('Protractor Demo', function () {
	it('should add one and two', function () {
		browser.get('https://juliemr.github.io/protractor-demo/');
		element(by.model('first')).sendKeys(1);
		element(by.model('second')).sendKeys(2);

		element(by.id('gobutton')).click();

		expect(element(by.binding('latest')).getText()).toEqual('3');
	});
});
```

Sample Puppeteer migration:

```ts
import { setupBrowserHooks, getBrowserState } from './utils';

describe('Puppeteer Demo', function () {
	setupBrowserHooks();
	it('should add one and two', function () {
		const { page } = getBrowserState();
		await page.goto('https://juliemr.github.io/protractor-demo/');

		await page.locator('.form-inline > input:nth-child(1)').fill('1');
		await page.locator('.form-inline > input:nth-child(2)').fill('2');
		await page.locator('#gobutton').fill('2');

		const result = await page
			.locator('.table tbody td:last-of-type')
			.map((header) => header.innerText)
			.wait();

		expect(result).toEqual('3');
	});
});
```

# Running Puppeteer in Chrome extensions

Source: https://pptr.dev/guides/running-puppeteer-in-extensions

:::caution

Chrome extensions environment is significantly different from the usual Node.JS environment, therefore, the support for running Puppeteer in chrome.debugger
is currently experimental. Please submit issues https://github.com/puppeteer/puppeteer/issues/new/choose if you encounted bugs.

:::

Chrome Extensions allow accessing Chrome DevTools Protocol via [`chrome.debugger`](https://developer.chrome.com/docs/extensions/reference/api/debugger).
[`chrome.debugger`](https://developer.chrome.com/docs/extensions/reference/api/debugger) provides a restricted access to CDP and allows attaching to one
page at a time. Therefore, Puppeteer requires a different transport to be used and Puppeteer's view is limited to a single page. It means you can
interact with a single page and its frames and workers but cannot create new pages using Puppeteer. To create a new page you need to use the
[`chrome.tabs`](https://developer.chrome.com/docs/extensions/reference/api/tabs) API and establish a new Puppeteer connection.

## How to run Puppeteer in Chrome extensions

:::note

See https://github.com/puppeteer/puppeteer/tree/main/examples/puppeteer-in-extension for a complete example.

:::

To run Puppeteer in an extension, first you need to produce a browser-compatible build using a bundler such as rollup or webpack:

1. When importing Puppeteer use the browser-specific entrypoint from puppeteer-core `puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js'`:

```ts
import { connect, ExtensionTransport } from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

// Create a tab or find a tab to attach to.
const tab = await chrome.tabs.create({
	url,
});
// Connect Puppeteer using the ExtensionTransport.connectTab.
const browser = await connect({
	transport: await ExtensionTransport.connectTab(tab.id),
});
// You will have a single page on the browser object, which corresponds
// to the tab you connected the transport to.
const [page] = await browser.pages();
// Perform the usual operations with Puppeteer page.
console.log(await page.evaluate('document.title'));
browser.disconnect();
```

2. Build your extension using a bundler. For example, the following configuration can be used with rollup:

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'main.mjs',
	output: {
		format: 'esm',
		dir: 'out',
	},
	// If you do not need to use WebDriver BiDi protocol,
	// exclude chromium-bidi/lib/cjs/bidiMapper/BidiMapper.js to minimize the bundle size.
	external: ['chromium-bidi/lib/cjs/bidiMapper/BidiMapper.js'],
	plugins: [
		nodeResolve({
			// Indicate that we target a browser environment.
			browser: true,
			// Exclude any dependencies except for puppeteer-core.
			// `npm install puppeteer-core` # To install puppeteer-core if needed.
			resolveOnly: ['puppeteer-core'],
		}),
	],
};
```

# Running Puppeteer in the browser

Source: https://pptr.dev/guides/running-puppeteer-in-the-browser

Puppeteer is a powerful tool for automating browsers, but did you know its API can also run within a browser itself? This enables you to leverage Puppeteer's capabilities for tasks that don't require Node.js specific features.

:::note

Note that while the Puppeteer API can run from a client webpage, the automation actions are sent to a separate browser with an open debugging port.

:::

## Supported Features

While running in the browser, Puppeteer offers a variety of functionalities including:

1. WebSocket Connections: Establish connections to existing browser instances using WebSockets. Launching or downloading browsers directly is not supported as it relies on Node.js APIs.
2. Script Evaluation: Execute JavaScript code within the remote browser context.
3. Document Manipulation: Generate PDFs and screenshots of the remote browser page.
4. Page Management: Create, close, and navigate between different web pages in the remote browser.
5. Cookie Handling: Inspect, modify, and manage cookies within the remote browser.
6. Network Control: Monitor and intercept network requests made by the remote browser.

## How to run Puppeteer in the browser

:::note

See https://github.com/puppeteer/puppeteer/tree/main/examples/puppeteer-in-browser for a complete example.

:::

To run Puppeteer in the browser, first you need to produce a browser-compatible build using a bundler such as rollup or webpack:

1. When importing Puppeteer use the browser-specific entrypoint from puppeteer-core `puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js'`:

```ts
import puppeteer from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';

const browser = await puppeteer.connect({
	browserWSEndpoint: wsUrl,
});

alert('Browser has ' + (await browser.pages()).length + ' pages');

browser.disconnect();
```

2. Build your app using a bundler. For example, the following configuration can be used with rollup:

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'main.mjs',
	output: {
		format: 'esm',
		dir: 'out',
	},
	// If you do not need to use WebDriver BiDi protocol,
	// exclude chromium-bidi/lib/cjs/bidiMapper/BidiMapper.js to minimize the bundle size.
	external: ['chromium-bidi/lib/cjs/bidiMapper/BidiMapper.js'],
	plugins: [
		nodeResolve({
			// Indicate that we target a browser environment.
			browser: true,
			// Exclude any dependencies except for puppeteer-core.
			// `npm install puppeteer-core` # To install puppeteer-core if needed.
			resolveOnly: ['puppeteer-core'],
		}),
	],
};
```

:::note

Do not forget to include a valid browser WebSocket endpoint when connecting to a remote browser instance.

:::

3. Include the produced bundle into a web page.

# WebMCP

Source: https://pptr.dev/guides/webmcp

:::caution

WebMCP is an experimental API and is subject to change. It is currently only supported in Chrome 149+ and requires specific flags to be enabled.

:::

[WebMCP](https://github.com/webmachinelearning/webmcp) is an experimental API that allows web pages to register tools that can be discovered and invoked by the browser or external agents (like LLMs). Puppeteer provides an experimental API to interact with WebMCP-enabled pages.

## Prerequisites

To use WebMCP with Puppeteer, you need:

1.  **Chrome 149+**: The browser must support the WebMCP CDP domain.
2.  **Enabled Flags**: You must launch the browser with the following flags:
    - `--enable-features=WebMCPTesting,DevToolsWebMCPSupport`

## Enabling WebMCP

In Puppeteer, WebMCP support is available through the [`page.webmcp`](../api/puppeteer.webmcp) property. It is automatically initialized when you navigate to a page if the browser supports it.

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
	args: ['--enable-features=WebMCPTesting,DevToolsWebMCPSupport'],
});
const page = await browser.newPage();

// page.webmcp is now available
console.log(page.webmcp);
```

## Discovering tools

You can get a list of all tools registered on the page using `page.webmcp.tools()`. You can also listen for `toolsadded` and `toolsremoved` events to react to changes in the registered tools.

```ts
// Get currently registered tools
const tools = page.webmcp.tools();
for (const tool of tools) {
	console.log(`Tool found: ${tool.name} - ${tool.description}`);
}

// Listen for new tools
page.webmcp.on('toolsadded', (event) => {
	for (const tool of event.tools) {
		console.log(`New tool added: ${tool.name}`);
	}
});

// Listen for removed tools
page.webmcp.on('toolsremoved', (event) => {
	for (const tool of event.tools) {
		console.log(`Tool removed: ${tool.name}`);
	}
});
```

## Executing tools

You can execute a discovered tool using the `execute` method on the `WebMCPTool` object. This method returns a promise that resolves with the tool's result.

```ts
const tools = page.webmcp.tools();
const tool = tools.find((t) => t.name === 'calculate_sum');

if (tool) {
	const result = await tool.execute({ a: 5, b: 10 });
	if (result.status === 'Completed') {
		console.log('Result:', result.output);
	} else {
		console.error('Error:', result.errorText);
	}
}
```

## Handling tool invocations

You can observe when a tool is invoked by the page or the browser and when it responds.

```ts
page.webmcp.on('toolinvoked', (call) => {
	console.log(`Tool ${call.tool.name} was invoked with input:`, call.input);
});

page.webmcp.on('toolresponded', (response) => {
	console.log(`Tool ${response.call?.tool.name} responded with status: ${response.status}`);
	if (response.status === 'Completed') {
		console.log('Output:', response.output);
	} else {
		console.log('Error:', response.errorText);
	}
});
```

## Registering tools in the page

Tools can be registered in the page either imperatively via JavaScript or declaratively via HTML forms.

### Imperative registration

```ts
await page.evaluate(() => {
	window.navigator.modelContext.registerTool({
		name: 'calculate_sum',
		description: 'Calculates the sum of two numbers',
		inputSchema: {
			type: 'object',
			properties: {
				a: { type: 'number' },
				b: { type: 'number' },
			},
			required: ['a', 'b'],
		},
		execute: ({ a, b }) => {
			return a + b;
		},
	});
});
```

### Declarative registration

WebMCP also supports discovering tools defined as HTML forms with specific attributes.

```ts
await page.setContent(`
  <form
    toolname="search_products"
    tooldescription="Search for products in the catalog"
  >
    <input name="query" type="text" />
    <button type="submit">Search</button>
  </form>
`);
```

When a tool is registered via a form, you can access the corresponding [`ElementHandle`](../api/puppeteer.elementhandle) using `tool.formElement`.

```ts
const tools = page.webmcp.tools();
const searchTool = tools.find((t) => t.name === 'search_products');
const formHandle = await searchTool.formElement;
```

# Examples & Use cases

Source: https://pptr.dev/examples

## Official examples

[The Puppeteer repository](https://github.com/puppeteer/puppeteer/tree/main/examples) includes a small number of examples maintained by the Puppeteer team.

Follow the instructions in the README to run the examples, covering use cases like creating PDFs from websites, creating screenshots or intercepting requests.

## Example suite

Find a set of unstructured examples in Puppeteer's dedicated [example repository](https://github.com/puppeteer/examples).

This suite is a collection of examples that has been growing over time and covers various use cases like forwarding events
from your Puppeteer process to the browser, interacting with elements and running CDP commands.

## Other projects, articles and demos

See the following list for use cases and examples from categories like Rendering, Web scraping and Testing.

### Rendering and web scraping

- **[Puppetron](https://github.com/cheeaun/puppetron)**: Demo site that shows
  how to use Puppeteer and Headless Chrome to render pages. Inspired by
  [GoogleChrome/rendertron](https://github.com/GoogleChrome/rendertron).
- **[Thal](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)**:
  Get started with Puppeteer and Chrome Headless for Web Scraping.
- **[pupperender](https://github.com/LasaleFamine/pupperender)**: Express
  middleware that checks the User-Agent header of incoming requests, and if
  it matches one of a configurable set of bots, render the page using Puppeteer.
  Useful for PWA rendering.
- **[headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)**:
  Crawler that provides APIs to manipulate Headless Chrome and lets you crawl
  dynamic websites.
- **[Puppeteer examples from Checkly](https://web.archive.org/web/20240811200732/https://www.checklyhq.com/learn/headless/basics-puppeteer-intro/)**:
  E2E Puppeteer examples for real life use cases, such as getting
  useful info from the web pages or common login scenarios.
- **[browserless](https://github.com/browserless/browserless)**: Headless
  Chrome as a service letting you execute Puppeteer scripts remotely.
- **[Puppeteer on AWS Lambda](https://github.com/jay-deshmukh/headless-chrome-with-puppeteer-on-AWS-lambda-with-serverless-framework)**:
  Run puppeteer on AWS Lambda with Serverless framework
- **[Apify SDK](https://github.com/apifytech/apify-js)**: The scalable web
  crawling and scraping library for JavaScript. Automatically manages a pool of
  Puppeteer browsers and provides error handling, task management, proxy
  rotation and more.

### Testing

- **[angular-puppeteer-demo](https://github.com/Quramy/angular-puppeteer-demo)**:
  Demo repository explaining how to use Puppeteer in Karma.
- **[mocha-headless-chrome](https://github.com/direct-adv-interfaces/mocha-headless-chrome)**:
  Tool which runs client-side mocha tests in the command line through headless
  Chrome.
- **[puppeteer-to-istanbul-example](https://github.com/bcoe/puppeteer-to-istanbul-example)**:
  Demo repository demonstrating how to output Puppeteer coverage in Istanbul
  format.
- **[jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)**: (almost)
  Zero configuration tool for setting up and running Jest and Puppeteer. Also
  includes an assertion library for Puppeteer.
- **[puppeteer-har](https://github.com/Everettss/puppeteer-har)**: Generate HAR
  file with puppeteer.
- **[puppetry](https://puppetry.app/)**: A desktop app to build Puppeteer and
  Jest driven tests without coding.
- **[puppeteer-loadtest](https://github.com/svenkatreddy/puppeteer-loadtest)**:
  command line interface for performing load test on Puppeteer scripts.
- **[cucumber-puppeteer-example](https://github.com/mlampedx/cucumber-puppeteer-example)**:
  Example repository demonstrating how to use Puppeeteer and Cucumber for
  integration testing.

# Troubleshooting

Source: https://pptr.dev/troubleshooting

:::note

To keep this page up-to-date we largely rely on community contributions.
Please send a PR if you notice something is no longer up-to-date.

:::

## `Cannot find module 'puppeteer-core/internal/...'`

This can occur if your Node.js version is lower than 14 or if you are using a
custom resolver (such as
[`jest-resolve`](https://www.npmjs.com/package/jest-resolve)). For the former,
we do not support deprecated versions of Node.js. For the latter, usually
upgrading the resolver (or its parent module such as `jest`) will work (e.g.
https://github.com/puppeteer/puppeteer/issues/9121)

## `Could not find expected browser locally`

Starting from v19.0.0, Puppeteer will download browsers into
`~/.cache/puppeteer` using
[`os.homedir`](https://nodejs.org/api/os.html#oshomedir) for better caching
between Puppeteer upgrades. Generally the home directory is well-defined (even
on Windows), but occasionally the home directory may not be available. In this
case, we provide the `PUPPETEER_CACHE_DIR` variable which allows you to change
the installation directory.

For example,

```bash npm2yarn
PUPPETEER_CACHE_DIR=$(pwd) npm install puppeteer
PUPPETEER_CACHE_DIR=$(pwd) node <script-path>
```

You can also create a configuration file named `.puppeteerrc.cjs` (or
`puppeteer.config.cjs`) at the root of your application with the contents

```js
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
```

You will need to reinstall `puppeteer` in order for the configuration to take
effect. See [Configuring Puppeteer](./guides/configuration) for more
information.

## `net::ERR_BLOCKED_BY_CLIENT` when navigating to an HTTP URL in Chrome

Chrome is rolling out a feature called `HttpsFirstBalancedModeAutoEnable` that
displays a warning to the user if the user navigates to an HTTP site. The feature
is enabled by default in Chrome for Testing builds that Puppeteer uses by
default.

The feature makes a navigation request to an HTTP URL result in the error
`net::ERR_BLOCKED_BY_CLIENT` which can be caught and recovered from. When the
error occurs, a warning page is shown to the user with a button to continue
navigation. The button is clickable via Puppeteer. Local HTTP hosts do not
trigger a warning but remote hosts might. For more details see
https://crbug.com/378022921

It is possible to disable this Chrome feature by passing the
`--disable-features=HttpsFirstBalancedModeAutoEnable` argument when launching
Chrome:

```ts
const browser = await puppeteer.launch({
	args: ['--disable-features=HttpsFirstBalancedModeAutoEnable'],
});
```

## Chrome doesn't launch on Windows

Some [chrome policies](https://support.google.com/chrome/a/answer/7532015) might
enforce running Chrome/Chromium with certain extensions.

Puppeteer passes `--disable-extensions` flag by default and will fail to launch
when such policies are active.

To work around this, set the `enableExtensions` option:

```ts
const browser = await puppeteer.launch({
	enableExtensions: true,
});
```

> Context:
> [issue 3681](https://github.com/puppeteer/puppeteer/issues/3681#issuecomment-447865342).

## Chrome reports sandbox errors on Windows

Chrome uses sandboxes on Windows which require additional permissions on
the downloaded Chrome files. Starting from Puppeteer v22.14.0, Puppeteer
will attempt to configure those permissions by running the `setup.exe`
tool provided by Chrome during the installation of the browser.

If you are using an older Puppeteer version or still seeing the
following errors in the browser output:

```
[24452:59820:0508/113713.058:ERROR:sandbox_win.cc(913)] Sandbox cannot access executable. Check filesystem permissions are valid. See https://bit.ly/31yqMJR.: Access is denied. (0x5)
```

You can use icacls to set permissions manually:

```powershell
icacls "%USERPROFILE%/.cache/puppeteer/chrome" /grant *S-1-15-2-1:(OI)(CI)(RX)
```

:::note

In high security environments a more restrictive SID should be used such
as one from the
[installer](https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/setup/install_worker.cc;l=74).

:::

See https://bit.ly/31yqMJR for more details.

## Chrome doesn't launch on Linux

Make sure all the necessary dependencies are installed. You can run `ldd chrome
| grep not` on a Linux machine to check which dependencies are missing. The
common ones are provided below. Also, see
https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json
for the up-to-date list of dependencies declared by the Chrome installer.

:::caution

Chrome currently does not provide arm64 binaries for Linux.
There are only arm64 binaries for Mac ARM.
That means that Linux binaries downloaded by default will not work on Linux arm64.

:::

<details>
<summary>Debian (e.g. Ubuntu) Dependencies</summary>

```
ca-certificates
fonts-liberation
libasound2
libatk-bridge2.0-0
libatk1.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgbm1
libgcc1
libglib2.0-0
libgtk-3-0
libnspr4
libnss3
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
lsb-release
wget
xdg-utils
```

</details>

<details>
<summary>CentOS Dependencies</summary>

```
alsa-lib.x86_64
atk.x86_64
cups-libs.x86_64
gtk3.x86_64
ipa-gothic-fonts
libXcomposite.x86_64
libXcursor.x86_64
libXdamage.x86_64
libXext.x86_64
libXi.x86_64
libXrandr.x86_64
libXScrnSaver.x86_64
libXtst.x86_64
pango.x86_64
xorg-x11-fonts-100dpi
xorg-x11-fonts-75dpi
xorg-x11-fonts-cyrillic
xorg-x11-fonts-misc
xorg-x11-fonts-Type1
xorg-x11-utils
```

After installing dependencies you need to update `nss` library using this
command

```
yum update nss -y
```

</details>

<details>
  <summary>Check out discussions</summary>

- [#290](https://github.com/puppeteer/puppeteer/issues/290) - Debian
  troubleshooting <br/>
- [#391](https://github.com/puppeteer/puppeteer/issues/391) - CentOS
  troubleshooting <br/>
- [#379](https://github.com/puppeteer/puppeteer/issues/379) - Alpine
  troubleshooting <br/>

</details>

## chrome-headless-shell disables GPU compositing

chrome-headless-shell requires `--enable-gpu` to
[enable GPU acceleration in headless mode](https://crbug.com/1416283).

```ts
const browser = await puppeteer.launch({
	headless: 'shell',
	args: ['--enable-gpu'],
});
```

## Setting up GPU with Chrome

Generally, Chrome should be able to detect and enable GPU if the system has appropriate drivers.
For additional tips, see the following blog post https://developer.chrome.com/blog/supercharge-web-ai-testing.

## Setting Up Chrome Linux Sandbox

In order to protect the host environment from untrusted web content, Chrome uses
[multiple layers of sandboxing](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/design/sandbox.md).
For this to work properly, the host should be configured first. If there's no
good sandbox for Chrome to use, it will crash with the error
`No usable sandbox!`.

If you **absolutely trust** the content you open in Chrome, you can launch
Chrome with the `--no-sandbox` argument:

```ts
const browser = await puppeteer.launch({
	args: ['--no-sandbox'],
});
```

:::caution

Running without a sandbox is **strongly discouraged**. Consider configuring a
sandbox instead.

:::

**The recommended way to run Chrome is using sandboxes**

### Issues with AppArmor on Ubuntu

Ubuntu 23.10+ (or possibly other Linux distros in the future) ship an
AppArmor profile that applies to Chrome stable binaries installed at
/opt/google/chrome/chrome (the default installation path). This policy
is stored at /etc/apparmor.d/chrome. This AppArmor policy prevents
Chrome for Testing binaries downloaded by Puppeteer from using user namespaces
resulting in the `No usable sandbox!` error when trying to launch the
browser.

For workarounds, see https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md.

### Using [setuid sandbox](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/linux/suid_sandbox_development.md)

:::caution

IMPORTANT NOTE: The Linux SUID sandbox is almost but not completely removed. See https://bugs.chromium.org/p/chromium/issues/detail?id=598454 This section is mostly out-of-date.

:::

The setuid sandbox comes as a standalone executable and is located next to the
Chrome that Puppeteer downloads. It is fine to re-use the same sandbox
executable for different Chrome versions, so the following could be done only
once per host environment:

```bash
# cd to Puppeteer cache directory (adjust the path if using a different cache directory).
cd ~/.cache/puppeteer/chrome/linux-<version>/chrome-linux64/
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
# copy sandbox executable to a shared location
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
# export CHROME_DEVEL_SANDBOX env variable
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

You might want to export the `CHROME_DEVEL_SANDBOX` env variable by default. In
this case, add the following to the `~/.bashrc` or `.zshenv`:

```bash
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
```

or to your `Dockerfile`:

```
ENV CHROME_DEVEL_SANDBOX /usr/local/sbin/chrome-devel-sandbox
```

## Running Puppeteer on Travis CI

> 👋 We ran our tests for Puppeteer on Travis CI until v6.0.0 (when we've
> migrated to GitHub Actions) - see our historical
> [`.travis.yml` (v5.5.0)](https://github.com/puppeteer/puppeteer/blob/v5.5.0/.travis.yml)
> for reference.

Tips-n-tricks:

- [xvfb](https://en.wikipedia.org/wiki/Xvfb) service should be launched in order
  to run Chrome for Testing in non-headless mode
- Runs on Xenial Linux on Travis by default
- Runs `npm install` by default
- `node_modules` is cached by default

`.travis.yml` might look like this:

```yml
language: node_js
node_js: node
services: xvfb
script:
    - npm test
```

## Running Puppeteer on WSL (Windows subsystem for Linux)

See [this thread](https://github.com/puppeteer/puppeteer/issues/1837) with some
tips specific to WSL. In a nutshell, you need to install missing dependencies by
either:

1. [Installing Chrome on WSL to install all dependencies](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps#install-google-chrome-for-linux)
2. Installing required dependencies manually:
   `sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2`.

:::caution

The list of required dependencies might get outdated and depend on what you
already have installed.

:::

## Running Puppeteer on CircleCI

Running Puppeteer smoothly on CircleCI requires the following steps:

1. Start with a
   [NodeJS image](https://circleci.com/docs/2.0/circleci-images/#nodejs) in your
   config like so:
    ```yaml
    docker:
        - image: circleci/node:14 # Use your desired version
          environment:
              NODE_ENV: development # Only needed if puppeteer is in `devDependencies`
    ```
1. Dependencies like `libXtst6` probably need to be installed via `apt-get`, so
   use the
   [threetreeslight/puppeteer](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer)
   orb
   ([instructions](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer#quick-start)),
   or paste parts of its
   [source](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer#orb-source)
   into your own config.
1. Lastly, if you’re using Puppeteer through Jest, then you may encounter an
   error spawning child processes:
    ```
    [00:00.0]  jest args: --e2e --spec --max-workers=36
    Error: spawn ENOMEM
       at ChildProcess.spawn (internal/child_process.js:394:11)
    ```
    This is likely caused by Jest autodetecting the number of processes on the
    entire machine (`36`) rather than the number allowed to your container (`2`).
    To fix this, set `jest --maxWorkers=2` in your test command.

## Running Puppeteer in Docker

> 👋 We used [Cirrus Ci](https://cirrus-ci.org/) to run our tests for Puppeteer
> in a Docker container until v3.0.x - see our historical
> [`Dockerfile.linux` (v3.0.1)](https://github.com/puppeteer/puppeteer/blob/v3.0.1/.ci/node12/Dockerfile.linux)
> for reference. Starting from v16.0.0 we are shipping a Docker image via the
> GitHub registry. The Dockerfile is located
> [here](https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile) and
> the usage instructions are in the
> [Integrations &gt; Docker](./guides/docker). The
> instructions below might be still helpful if you are building your own image.

Getting headless Chrome up and running in Docker can be tricky. The bundled
Chrome for Testing that Puppeteer installs is missing the necessary shared library
dependencies.

To fix, you'll need to install the missing dependencies and the latest Chrome for Testing
package in your Dockerfile:

```Dockerfile
FROM node:14-slim

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome for Testing that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# If running Docker >= 1.13.0 use docker run's --init arg to reap zombie processes, otherwise
# uncomment the following lines to have `dumb-init` as PID 1
# ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
# RUN chmod +x /usr/local/bin/dumb-init
# ENTRYPOINT ["dumb-init", "--"]

# Uncomment to skip the Chrome for Testing download when installing puppeteer. If you do,
# you'll need to launch puppeteer with:
#     browser.launch({executablePath: 'google-chrome-stable'})
# ENV PUPPETEER_SKIP_DOWNLOAD true

# Install puppeteer so it's available in the container.
RUN npm init -y &&  \
    npm i puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /package.json \
    && chown -R pptruser:pptruser /package-lock.json

# Run everything after as non-privileged user.
USER pptruser

CMD ["google-chrome-stable"]
```

Build the container:

```bash
docker build -t puppeteer-chrome-linux .
```

Run the container by passing `node -e "<yourscript.js content as a string>"` as
the command:

```bash
 docker run -i --init --rm --cap-add=SYS_ADMIN \
   --name puppeteer-chrome puppeteer-chrome-linux \
   node -e "`cat yourscript.js`"
```

There's a full example at https://github.com/ebidel/try-puppeteer that shows how
to run this Dockerfile from a webserver running on App Engine Flex (Node).

### Running on Alpine

Note that Chrome [does not support Alpine out of the box](https://support.google.com/chrome/a/answer/7100626?hl=en#:~:text=10.15%20or%20later-,Linux,-To%20use%20Chrome) so make sure you have compatible system dependencies installed on Alpine and test the image before using it. See https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/rpm/dist_package_provides.json and https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json for the list of system packages required on supported distros.

> **CAUTION**
>
> The current Chromium version in Alpine 3.20 is causing timeout issues with Puppeteer. Downgrading to Alpine 3.19 fixes the issue.
> See [#11640](https://github.com/puppeteer/puppeteer/issues/11640), [#12637](https://github.com/puppeteer/puppeteer/issues/12637), [#12189](https://github.com/puppeteer/puppeteer/issues/12189)

You need to find [the newest Chromium package](https://pkgs.alpinelinux.org/package/edge/community/x86_64/chromium),
then look up the [supported browser version](https://pptr.dev/supported-browsers) for Puppeteer
and use the coresponding version.

**Example:**

Alpine Chromium version: `100`

Puppeteer: [Puppeteer v13.5.0](https://github.com/puppeteer/puppeteer/releases/tag/v13.5.0)

Dockerfile:

```Dockerfile
FROM alpine

# Installs Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

...

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

...
```

## Running Puppeteer on GitlabCI

This is very similar to some of the instructions above, but require a bit
different configuration to finally achieve success.

Usually the issue looks like this:

```bash
Error: Failed to launch chrome! spawn /usr/bin/chromium-browser ENOENT
```

You need to patch two places:

1. Your `gitlab-ci.yml` config
2. Arguments' list when launching puppeteer

In `gitlab-ci.yml` we need to install some packages to make it possible to
launch headless Chrome in your docker env:

```yml
before_script:
    - apt-get update
    - apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2
      libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4
      libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0
      libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1
      libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1
      libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release
      xdg-utils wget
```

Next, you have to use `'--no-sandbox'` mode
when launching Puppeteer. This can be done by
passing them as an arguments to your `.launch()` call:
`puppeteer.launch({ args: ['--no-sandbox'] });`.

## Running Puppeteer on Google Cloud Run

Google Cloud Run disables the CPU by default, after an HTTP response is written to the client. This means that puppeteer will appear extremely slow (taking 1-5 minutes to launch), if you "run puppeteer in the background" after your response has been written.

So this simple express app will be percievably slow:

```js
import express from 'express';

const app = express();

app.post('/test-puppeteer', (req, res) => {
	res.json({
		jobId: 123,
		acknowledged: true,
	});

	puppeteer.launch().then((browser) => {
		// 2 minutes later...
	});
});

app.listen(3000);
```

It is slow because CPU is disabled on GCR because puppeteer is launched after the response is sent. What you want to do is this:

```js
app.post('/test-puppeteer', (req, res) => {
	puppeteer.launch().then((browser) => {
		// A second later...
		res.json({
			jobId: 123,
			acknowledged: true,
		});
	});
});
```

If you want to run the stuff in the background, you need to "**enable CPU always**" (Go to Google Cloud Run Service > Edit & Deploy Revision > CPU allocation and pricing) even after responses are sent. That should fix it.

#### Tips

Seeing weird errors when launching Chrome? Try running your container with
`docker run --cap-add=SYS_ADMIN` when developing locally. Since the Dockerfile
adds a `pptr` user as a non-privileged user, it may not have all the necessary
privileges.

[dumb-init](https://github.com/Yelp/dumb-init) is worth checking out if you're
experiencing a lot of zombies Chrome processes sticking around. There's special
treatment for processes with PID=1, which makes it hard to terminate Chrome
properly in some cases (e.g. in Docker).

## Running Puppeteer in the cloud

### Running Puppeteer on Google App Engine

The Node.js runtime of the
[App Engine standard environment](https://cloud.google.com/appengine/docs/standard/nodejs/)
comes with all system packages needed to run Headless Chrome.

To use `puppeteer`, specify the module as a dependency in your `package.json`
and then override the puppeteer cache directory by including a file named
`.puppeteerrc.cjs` at the root of your application with the contents:

```ts
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	cacheDirectory: join(__dirname, 'node_modules', '.puppeteer_cache'),
};
```

> [!NOTE]
> Google App Engine caches your `node_modules` between builds.
> Specifying the Puppeteer cache as subdirectory of `node_modules`
> mitigates an issue in which Puppeteer can't find the browser executable
> due to `postinstall` not being run.

### Running Puppeteer on Google Cloud Functions

The Node.js runtime of
[Google Cloud Functions](https://cloud.google.com/functions/docs/)
comes with all system packages needed to run Headless Chrome.

To use `puppeteer`, specify the module as a dependency in your `package.json`
and then override the puppeteer cache directory by including a file named
`.puppeteerrc.cjs` at the root of your application with the contents:

```ts
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	cacheDirectory: join(__dirname, 'node_modules', '.puppeteer_cache'),
};
```

> [!NOTE]
> Google Cloud Functions caches your `node_modules` between builds. Specifying the
> puppeteer cache as subdirectory of `node_modules` mitigates an issue in which the
> puppeteer install process does not run when the cache is hit.

### Running Puppeteer on Google Cloud Run

The default Node.js runtime of
[Google Cloud Run](https://cloud.google.com/run/docs/) does not come with the
system packages needed to run Headless Chrome. You will need to set up your own
`Dockerfile` and
[include the missing dependencies](#chrome-doesnt-launch-on-linux).

### Running Puppeteer on Heroku

Running Puppeteer on Heroku requires some additional dependencies that aren't
included on the Linux box that Heroku spins up for you. To add the dependencies
on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your
app under Settings > Buildpacks.

The url for the buildpack is
https://github.com/jontewks/puppeteer-heroku-buildpack

Ensure that you're using `'--no-sandbox'` mode when launching Puppeteer. This
can be done by passing it as an argument to your `.launch()` call:
`puppeteer.launch({ args: ['--no-sandbox'] });`.

When you click add buildpack, simply paste that url into the input, and click
save. On the next deploy, your app will also install the dependencies that
Puppeteer needs to run.

If you need to render Chinese, Japanese, or Korean characters you may need to
use a buildpack with additional font files like
https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

There's also another
[simple guide](https://timleland.com/headless-chrome-on-heroku/) from @timleland
that includes a sample project:
https://timleland.com/headless-chrome-on-heroku/.

### Running Puppeteer on AWS Lambda

AWS Lambda [limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html)
deployment package sizes to ~50MB. This presents challenges for running headless
Chrome (and therefore Puppeteer) on Lambda. The community has put together a few
resources that work around the issues:

- https://github.com/sparticuz/chromium (a vendor and framework agnostic library that supports modern versions of `chromium`)

### Running Puppeteer on AWS EC2 instance running Amazon-Linux

If you are using an EC2 instance running amazon-linux in your CI/CD pipeline,
and if you want to run Puppeteer tests in amazon-linux, follow these steps.

1. To install Chromium, you have to first enable `amazon-linux-extras` which
   comes as part of
   [EPEL (Extra Packages for Enterprise Linux)](https://aws.amazon.com/premiumsupport/knowledge-center/ec2-enable-epel/):

    ```bash
    sudo amazon-linux-extras install epel -y
    ```

1. Next, install Chromium:

    ```bash
    sudo yum install -y chromium
    ```

Now Puppeteer can launch Chromium to run your tests. If you do not enable EPEL
and if you continue installing chromium as part of `npm install`, Puppeteer
cannot launch Chromium due to unavailability of `libatk-1.0.so.0` and many more
packages.

## Code Transpilation Issues

If you are using a JavaScript transpiler like babel or TypeScript, calling
`evaluate()` with an async function might not work. This is because while
`puppeteer` uses `Function.prototype.toString()` to serialize functions while
transpilers could be changing the output code in such a way it's incompatible
with `puppeteer`.

Some workarounds to this problem would be to instruct the transpiler not to mess
up with the code, for example, configure TypeScript to use latest ecma version
(`"target": "es2018"`). Another workaround could be using string templates
instead of functions:

```ts
await page.evaluate(`(async() => {
   console.log('1');
})()`);
```

# FAQ

Source: https://pptr.dev/faq

## Q: Who maintains Puppeteer?

The Chrome Browser Automation team maintains the library, but we'd love your help and
expertise on the project! See our
[contributing guide](https://pptr.dev/contributing).

## Q: What is the status of cross-browser support?

From Puppeteer v23.0.0 onwards Puppeteer provides support for both Chrome and Firefox.

To automate Chrome Puppeteer uses the Chrome DevTools Protocol (CDP) by default, but it can
also be automated using WebDriver BiDi which is the default for automating Firefox.

To understand the subtle differences in API support refer to our
[WebDriver BiDi guide](https://pptr.dev/webdriver-bidi).

## Q: Does Puppeteer support WebDriver BiDi?

From Puppeteer v23.0.0 and up Puppeteer has production-ready support for WebDriver BiDi
to automate both Chrome and Firefox.

## Q: Will keep Puppeteer supporting CDP?

We are not going to stop supporting automation of Chrome with CDP - despite
Puppeteer's support for WebDriver BiDi. To not break existing automation relying on CDP,
but also to keep enabling automation use-cases unique to Chrome and not standardized
with WebDriver BiDi.

## Q: What are Puppeteer’s goals and principles?

The goals of the project are:

- Provide a reference implementation that highlights the capabilities of the
  [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)
  and [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) protocols.
- Grow the adoption of automated cross-browser testing.
- Help dogfood new DevTools Protocol and WebDriver BiDi features...and catch bugs!
- Learn more about the pain points of automated browser testing and help fill
  those gaps.

We adapt
[Chromium principles](https://www.chromium.org/developers/core-principles) to
help us drive product decisions:

- **Speed**: Puppeteer has almost zero performance overhead over an automated
  page.
- **Security**: Puppeteer operates off-process with respect to the browser, making
  it safe to automate potentially malicious pages.
- **Stability**: Puppeteer should not be flaky and should not leak memory.
- **Simplicity**: Puppeteer provides a high-level API that’s easy to use,
  understand, and debug.

## Q: Is Puppeteer a replacement for Selenium?

Puppeteer is a Node.js based reference implementation of how to automate browsers
with CDP and WebDriver BiDi - the same web standard the Selenium project is also
contributing to.

The Selenium project goes beyond what Puppeteer offers in multiple aspects: it provides
bindings for more languages than just JavaScript and for example it also offers tooling
to orchestrate automation at large, like Selenium Grid. Both is beyond Puppeteer's scope.

There are community projects that add capabilities to Puppeteer beyond its core,
making things like testing more convenient. For example see:

- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) or
- [Puppeteer's Angular integration](https://pptr.dev/integrations/ng-schematics)

## Q: Why doesn’t Puppeteer v.XXX work with a certain version of Chrome or Firefox?

Every Puppeteer release is tightly bundled with a specific browser release
to ensure compatibility with the implementation of the underlying protocols,
the Chrome DevTools Protocol and WebDriver BiDi.

This is to prevent changes in either [Chrome](https://pptr.dev/supported-browsers#chrome) or [Firefox](https://pptr.dev/supported-browsers#firefox) from unexpectedly breaking Puppeteer.

## Q: Which Chrome and Firefox version does Puppeteer use?

Look for the `chrome` and `firefox` entries in
[revisions.ts](https://github.com/puppeteer/puppeteer/blob/main/packages/puppeteer-core/src/revisions.ts).

## Q: What’s considered a “Navigation”?

From Puppeteer’s standpoint, **“navigation” is anything that changes a page’s
URL**. Aside from regular navigation where the browser hits the network to fetch
a new document from the web server, this includes
[anchor navigations](https://www.w3.org/TR/html5/single-page.html#scroll-to-fragid)
and [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
usage.

With this definition of “navigation,” **Puppeteer works seamlessly with
single-page applications.**

## Q: What’s the difference between a “trusted" and "untrusted" input event?

In browsers, input events could be divided into two big groups: trusted vs.
untrusted.

- **Trusted events**: events generated by users interacting with the page, e.g.
  using a mouse or keyboard.
- **Untrusted event**: events generated by Web APIs, e.g. `document.createEvent`
  or `element.click()` methods.

Websites can distinguish between these two groups:

- using an
  [`Event.isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)
  event flag
- sniffing for accompanying events. For example, every trusted `'click'` event
  is preceded by `'mousedown'` and `'mouseup'` events.

For automation purposes it’s important to generate trusted events. **All input
events generated with Puppeteer are trusted and fire proper accompanying
events.** If, for some reason, one needs an untrusted event, it’s always
possible to hop into a page context with `page.evaluate` and generate a fake
event:

```ts
await page.evaluate(() => {
	document.querySelector('button[type=submit]').click();
});
```

## Q: Does Puppeteer support media and audio playback?

Puppeteer uses [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) binaries
by default which ship with proprietary codecs support starting from
[M120](https://chromiumdash.appspot.com/commit/12d607016c31ea13579e897740c765be189ed6eb).

## Q: I am having trouble installing / running Puppeteer in my test environment. Where should I look for help?

We have a
[troubleshooting](https://pptr.dev/troubleshooting)
guide for various operating systems that lists the required dependencies.

## Q: I have more questions! Where do I ask?

There are many ways to get help on Puppeteer:

- For questions: [Stack Overflow](https://stackoverflow.com/questions/tagged/puppeteer)
- For bug reports: [GitHub Issues](https://github.com/puppeteer/puppeteer/issues)

Make sure to search these channels before posting your question.

# Supported browsers

Source: https://pptr.dev/supported-browsers

## Chrome

Starting with v20.0.0 Puppeteer downloads and works with **[Chrome for Testing](https://github.com/GoogleChromeLabs/chrome-for-testing?tab=readme-ov-file#what-is-chrome-for-testing)**, which supports both headless and headful modes sharing the same code path in the browser.
The old headless mode is now a separate program called **[chrome-headless-shell](https://developer.chrome.com/blog/chrome-headless-shell)** (use `headless: 'shell'` with Puppeteer).

Prior to this version Puppeteer downloaded and worked with Chromium.

## Firefox

Starting with v23.0.0 Puppeteer downloads and works with the stable release of [Firefox](https://www.mozilla.org/en-US/firefox/).

Prior to this version Puppeteer downloaded and worked with the nightly versions of Firefox at the time.

## Supported browser version list

The following table provides mapping between the Puppeteer version and the browsers version you can use it with.
If an exact matching version of Puppeteer isn't listed, the supported version of the browser is that for the immediately prior version:

<!-- version-start -->

| Puppeteer                                                                                              | Chrome                                                                                     | Firefox                                                   |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [Puppeteer v24.43.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.43.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 148.0.7778.97  | [Firefox](https://www.mozilla.org/en-US/firefox/) 150.0.2 |
| [Puppeteer v24.43.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.43.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 148.0.7778.97  | [Firefox](https://www.mozilla.org/en-US/firefox/) 150.0.1 |
| [Puppeteer v24.42.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.42.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 147.0.7727.57  | [Firefox](https://www.mozilla.org/en-US/firefox/) 149.0.2 |
| [Puppeteer v24.41.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.41.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 147.0.7727.56  | [Firefox](https://www.mozilla.org/en-US/firefox/) 149.0.2 |
| [Puppeteer v24.40.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.40.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 146.0.7680.153 | [Firefox](https://www.mozilla.org/en-US/firefox/) 148.0.2 |
| [Puppeteer v24.39.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.39.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 146.0.7680.76  | [Firefox](https://www.mozilla.org/en-US/firefox/) 148.0.2 |
| [Puppeteer v24.39.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.39.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 146.0.7680.66  | [Firefox](https://www.mozilla.org/en-US/firefox/) 148.0   |
| [Puppeteer v24.38.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.38.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 146.0.7680.31  | [Firefox](https://www.mozilla.org/en-US/firefox/) 148.0   |
| [Puppeteer v24.37.5](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.37.5/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 145.0.7632.77  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.4 |
| [Puppeteer v24.37.4](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.37.4/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 145.0.7632.76  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.4 |
| [Puppeteer v24.37.3](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.37.3/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 145.0.7632.67  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.3 |
| [Puppeteer v24.37.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.37.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 145.0.7632.46  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.3 |
| [Puppeteer v24.37.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.37.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 145.0.7632.26  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.2 |
| [Puppeteer v24.36.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.36.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 144.0.7559.96  | [Firefox](https://www.mozilla.org/en-US/firefox/) 147.0.1 |
| [Puppeteer v24.35.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.35.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 143.0.7499.192 | [Firefox](https://www.mozilla.org/en-US/firefox/) 146.0.1 |
| [Puppeteer v24.34.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.34.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 143.0.7499.169 | [Firefox](https://www.mozilla.org/en-US/firefox/) 146.0.1 |
| [Puppeteer v24.33.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.33.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 143.0.7499.146 | [Firefox](https://www.mozilla.org/en-US/firefox/) 146.0   |
| [Puppeteer v24.33.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.33.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 143.0.7499.42  | [Firefox](https://www.mozilla.org/en-US/firefox/) 146.0   |
| [Puppeteer v24.32.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.32.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 143.0.7499.40  | [Firefox](https://www.mozilla.org/en-US/firefox/) 145.0.2 |
| [Puppeteer v24.31.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.31.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 142.0.7444.175 | [Firefox](https://www.mozilla.org/en-US/firefox/) 145.0.1 |
| [Puppeteer v24.30.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.30.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 142.0.7444.162 | [Firefox](https://www.mozilla.org/en-US/firefox/) 145.0   |
| [Puppeteer v24.29.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.29.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 142.0.7444.61  | [Firefox](https://www.mozilla.org/en-US/firefox/) 144.0.2 |
| [Puppeteer v24.27.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.27.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 142.0.7444.59  | [Firefox](https://www.mozilla.org/en-US/firefox/) 144.0.2 |
| [Puppeteer v24.26.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.26.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 141.0.7390.122 | [Firefox](https://www.mozilla.org/en-US/firefox/) 144.0   |
| [Puppeteer v24.25.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.25.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 141.0.7390.78  | [Firefox](https://www.mozilla.org/en-US/firefox/) 144.0   |
| [Puppeteer v24.23.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.23.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 141.0.7390.76  | [Firefox](https://www.mozilla.org/en-US/firefox/) 143.0.4 |
| [Puppeteer v24.23.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.23.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 141.0.7390.54  | [Firefox](https://www.mozilla.org/en-US/firefox/) 143.0.3 |
| [Puppeteer v24.22.3](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.22.3/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 140.0.7339.207 | [Firefox](https://www.mozilla.org/en-US/firefox/) 143.0.1 |
| [Puppeteer v24.22.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.22.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 140.0.7339.185 | [Firefox](https://www.mozilla.org/en-US/firefox/) 143.0.1 |
| [Puppeteer v24.22.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.22.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 140.0.7339.82  | [Firefox](https://www.mozilla.org/en-US/firefox/) 143.0   |
| [Puppeteer v24.20.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.20.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 140.0.7339.82  | [Firefox](https://www.mozilla.org/en-US/firefox/) 142.0.1 |
| [Puppeteer v24.19.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.19.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 140.0.7339.80  | [Firefox](https://www.mozilla.org/en-US/firefox/) 142.0.1 |
| [Puppeteer v24.17.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.17.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 139.0.7258.154 | [Firefox](https://www.mozilla.org/en-US/firefox/) 142.0.1 |
| [Puppeteer v24.17.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.17.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 139.0.7258.138 | [Firefox](https://www.mozilla.org/en-US/firefox/) 142.0   |
| [Puppeteer v24.16.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.16.2/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 139.0.7258.68  | [Firefox](https://www.mozilla.org/en-US/firefox/) 141.0.3 |
| [Puppeteer v24.16.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.16.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 139.0.7258.66  | [Firefox](https://www.mozilla.org/en-US/firefox/) 141.0.3 |
| [Puppeteer v24.16.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.16.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 139.0.7258.66  | [Firefox](https://www.mozilla.org/en-US/firefox/) 141.0.2 |
| [Puppeteer v24.15.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.15.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.168 | [Firefox](https://www.mozilla.org/en-US/firefox/) 141.0   |
| [Puppeteer v24.14.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.14.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.157 | [Firefox](https://www.mozilla.org/en-US/firefox/) 140.0.4 |
| [Puppeteer v24.12.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.12.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.94  | [Firefox](https://www.mozilla.org/en-US/firefox/) 140.0.4 |
| [Puppeteer v24.11.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.11.2/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.92  | [Firefox](https://www.mozilla.org/en-US/firefox/) 140.0.2 |
| [Puppeteer v24.11.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.11.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.49  | [Firefox](https://www.mozilla.org/en-US/firefox/) 140.0.2 |
| [Puppeteer v24.11.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.11.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 138.0.7204.49  | [Firefox](https://www.mozilla.org/en-US/firefox/) 140.0   |
| [Puppeteer v24.10.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.10.2/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 137.0.7151.119 | [Firefox](https://www.mozilla.org/en-US/firefox/) 139.0.4 |
| [Puppeteer v24.10.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.10.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 137.0.7151.70  | [Firefox](https://www.mozilla.org/en-US/firefox/) 139.0.4 |
| [Puppeteer v24.10.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.10.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 137.0.7151.55  | [Firefox](https://www.mozilla.org/en-US/firefox/) 139.0.1 |
| [Puppeteer v24.9.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.9.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 136.0.7103.94  | [Firefox](https://www.mozilla.org/en-US/firefox/) 138.0.4 |
| [Puppeteer v24.8.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.8.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 136.0.7103.92  | [Firefox](https://www.mozilla.org/en-US/firefox/) 138.0.1 |
| [Puppeteer v24.8.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.8.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 136.0.7103.49  | [Firefox](https://www.mozilla.org/en-US/firefox/) 138.0.1 |
| [Puppeteer v24.7.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.7.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 135.0.7049.114 | [Firefox](https://www.mozilla.org/en-US/firefox/) 137.0.2 |
| [Puppeteer v24.7.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.7.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 135.0.7049.95  | [Firefox](https://www.mozilla.org/en-US/firefox/) 137.0.2 |
| [Puppeteer v24.6.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.6.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 135.0.7049.84  | [Firefox](https://www.mozilla.org/en-US/firefox/) 137.0.1 |
| [Puppeteer v24.6.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.6.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 135.0.7049.42  | [Firefox](https://www.mozilla.org/en-US/firefox/) 137.0   |
| [Puppeteer v24.5.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.5.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 134.0.6998.165 | [Firefox](https://www.mozilla.org/en-US/firefox/) 136.0.4 |
| [Puppeteer v24.4.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.4.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 134.0.6998.35  | [Firefox](https://www.mozilla.org/en-US/firefox/) 136.0   |
| [Puppeteer v24.3.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.3.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 133.0.6943.141 | [Firefox](https://www.mozilla.org/en-US/firefox/) 135.0.1 |
| [Puppeteer v24.3.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.3.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 133.0.6943.126 | [Firefox](https://www.mozilla.org/en-US/firefox/) 135.0.1 |
| [Puppeteer v24.2.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.2.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 133.0.6943.98  | [Firefox](https://www.mozilla.org/en-US/firefox/) 135.0   |
| [Puppeteer v24.2.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.2.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 133.0.6943.53  | [Firefox](https://www.mozilla.org/en-US/firefox/) 135.0   |
| [Puppeteer v24.1.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.1.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 132.0.6834.110 | [Firefox](https://www.mozilla.org/en-US/firefox/) 134.0.2 |
| [Puppeteer v24.1.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.1.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 132.0.6834.83  | [Firefox](https://www.mozilla.org/en-US/firefox/) 134.0.1 |
| [Puppeteer v24.0.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v24.0.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.264 | [Firefox](https://www.mozilla.org/en-US/firefox/) 134.0   |
| [Puppeteer v23.11.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.11.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.204 | [Firefox](https://www.mozilla.org/en-US/firefox/) 133.0.3 |
| [Puppeteer v23.10.4](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.10.4/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.108 | [Firefox](https://www.mozilla.org/en-US/firefox/) 133.0.3 |
| [Puppeteer v23.10.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.10.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.87  | [Firefox](https://www.mozilla.org/en-US/firefox/) 133.0   |
| [Puppeteer v23.10.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.10.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.85  | [Firefox](https://www.mozilla.org/en-US/firefox/) 133.0   |
| [Puppeteer v23.9.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.9.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.85  | [Firefox](https://www.mozilla.org/en-US/firefox/) 132.0.2 |
| [Puppeteer v23.8.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.8.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 131.0.6778.69  | [Firefox](https://www.mozilla.org/en-US/firefox/) 132.0.2 |
| [Puppeteer v23.7.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.7.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 130.0.6723.116 | [Firefox](https://www.mozilla.org/en-US/firefox/) 132.0.1 |
| [Puppeteer v23.7.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.7.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 130.0.6723.91  | [Firefox](https://www.mozilla.org/en-US/firefox/) 132.0   |
| [Puppeteer v23.6.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.6.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 130.0.6723.69  | [Firefox](https://www.mozilla.org/en-US/firefox/) 131.0.3 |
| [Puppeteer v23.6.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.6.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 130.0.6723.58  | [Firefox](https://www.mozilla.org/en-US/firefox/) 131.0.3 |
| [Puppeteer v23.5.3](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.5.3/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 129.0.6668.100 | [Firefox](https://www.mozilla.org/en-US/firefox/) 131.0.2 |
| [Puppeteer v23.5.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.5.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 129.0.6668.91  | [Firefox](https://www.mozilla.org/en-US/firefox/) 131.0   |
| [Puppeteer v23.5.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.5.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 129.0.6668.89  | [Firefox](https://www.mozilla.org/en-US/firefox/) 131.0   |
| [Puppeteer v23.4.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.4.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 129.0.6668.70  | [Firefox](https://www.mozilla.org/en-US/firefox/) 130.0.1 |
| [Puppeteer v23.4.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.4.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 129.0.6668.58  | [Firefox](https://www.mozilla.org/en-US/firefox/) 130.0.1 |
| [Puppeteer v23.3.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.3.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 128.0.6613.137 | [Firefox](https://www.mozilla.org/en-US/firefox/) 130.0   |
| [Puppeteer v23.3.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.3.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 128.0.6613.119 | [Firefox](https://www.mozilla.org/en-US/firefox/) 130.0   |
| [Puppeteer v23.2.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.2.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 128.0.6613.119 | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0.2 |
| [Puppeteer v23.2.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.2.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 128.0.6613.86  | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0.2 |
| [Puppeteer v23.2.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.2.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 128.0.6613.84  | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0.2 |
| [Puppeteer v23.1.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.1.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.119 | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0.2 |
| [Puppeteer v23.1.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.1.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.119 | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0   |
| [Puppeteer v23.0.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.0.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.99  | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0   |
| [Puppeteer v23.0.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v23.0.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.88  | [Firefox](https://www.mozilla.org/en-US/firefox/) 129.0   |
| [Puppeteer v22.15.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.15.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.88  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.14.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.14.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 127.0.6533.72  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.13.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.13.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 126.0.6478.182 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.12.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.12.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 126.0.6478.126 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.12.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.12.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 126.0.6478.63  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.11.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.11.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 126.0.6478.61  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.11.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.11.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 126.0.6478.55  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.10.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.10.1/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 125.0.6422.141 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.10.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.10.0/docs/api/index.md) | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 125.0.6422.78  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.9.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.9.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 125.0.6422.60  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.8.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.8.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 124.0.6367.207 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.8.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.8.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 124.0.6367.201 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.8.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.8.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 124.0.6367.91  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.7.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.7.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 124.0.6367.78  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.7.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.7.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 124.0.6367.60  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.6.4](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.6.4/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 123.0.6312.122 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.6.3](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.6.3/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 123.0.6312.105 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.6.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.6.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 123.0.6312.86  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.6.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.6.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 123.0.6312.58  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.5.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.5.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 122.0.6261.128 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.4.1](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.4.1/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 122.0.6261.111 | Firefox Nightly (at the time)                             |
| [Puppeteer v22.4.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.4.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 122.0.6261.94  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.3.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.3.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 122.0.6261.69  | Firefox Nightly (at the time)                             |
| [Puppeteer v22.2.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v22.2.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 122.0.6261.57  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.9.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.9.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 121.0.6167.85  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.8.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.8.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 120.0.6099.109 | Firefox Nightly (at the time)                             |
| [Puppeteer v21.5.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.5.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 119.0.6045.105 | Firefox Nightly (at the time)                             |
| [Puppeteer v21.4.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.4.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 118.0.5993.70  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.3.7](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.3.7/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 117.0.5938.149 | Firefox Nightly (at the time)                             |
| [Puppeteer v21.3.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.3.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 117.0.5938.92  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.3.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.3.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 117.0.5938.62  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.1.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.1.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 116.0.5845.96  | Firefox Nightly (at the time)                             |
| [Puppeteer v21.0.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.0.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 115.0.5790.170 | Firefox Nightly (at the time)                             |
| [Puppeteer v21.0.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.0.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 115.0.5790.102 | Firefox Nightly (at the time)                             |
| [Puppeteer v20.9.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v20.9.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 115.0.5790.98  | Firefox Nightly (at the time)                             |
| [Puppeteer v20.7.2](https://github.com/puppeteer/puppeteer/blob/puppeteer-v20.7.2/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 114.0.5735.133 | Firefox Nightly (at the time)                             |
| [Puppeteer v20.6.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v20.6.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 114.0.5735.90  | Firefox Nightly (at the time)                             |
| [Puppeteer v20.1.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v20.1.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 113.0.5672.63  | Firefox Nightly (at the time)                             |
| [Puppeteer v20.0.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v20.0.0/docs/api/index.md)   | [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) 112.0.5615.121 | Firefox Nightly (at the time)                             |
| [Puppeteer v19.8.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v19.8.0/docs/api/index.md)   | Chromium 112.0.5614.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v19.7.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v19.7.0/docs/api/index.md)   | Chromium 111.0.5556.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v19.6.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v19.6.0/docs/api/index.md)   | Chromium 110.0.5479.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v19.4.0](https://github.com/puppeteer/puppeteer/blob/puppeteer-v19.4.0/docs/api/index.md)   | Chromium 109.0.5412.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v19.2.0](https://github.com/puppeteer/puppeteer/blob/v19.2.0/docs/api/index.md)             | Chromium 108.0.5351.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v18.1.0](https://github.com/puppeteer/puppeteer/blob/v18.1.0/docs/api/index.md)             | Chromium 107.0.5296.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v17.1.0](https://github.com/puppeteer/puppeteer/blob/v17.1.0/docs/api/index.md)             | Chromium 106.0.5249.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v15.5.0](https://github.com/puppeteer/puppeteer/blob/v15.5.0/docs/api/index.md)             | Chromium 105.0.5173.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v15.1.0](https://github.com/puppeteer/puppeteer/blob/v15.1.0/docs/api.md)                   | Chromium 104.0.5109.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v14.2.0](https://github.com/puppeteer/puppeteer/blob/v14.2.0/docs/api.md)                   | Chromium 103.0.5059.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v14.0.0](https://github.com/puppeteer/puppeteer/blob/v14.0.0/docs/api.md)                   | Chromium 102.0.5002.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v13.6.0](https://github.com/puppeteer/puppeteer/blob/v13.6.0/docs/api.md)                   | Chromium 101.0.4950.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v13.5.0](https://github.com/puppeteer/puppeteer/blob/v13.5.0/docs/api.md)                   | Chromium 100.0.4889.0                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v13.2.0](https://github.com/puppeteer/puppeteer/blob/v13.2.0/docs/api.md)                   | Chromium 99.0.4844.16                                                                      | Firefox Nightly (at the time)                             |
| [Puppeteer v13.1.0](https://github.com/puppeteer/puppeteer/blob/v13.1.0/docs/api.md)                   | Chromium 98.0.4758.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v12.0.0](https://github.com/puppeteer/puppeteer/blob/v12.0.0/docs/api.md)                   | Chromium 97.0.4692.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v10.2.0](https://github.com/puppeteer/puppeteer/blob/v10.2.0/docs/api.md)                   | Chromium 93.0.4577.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v10.0.0](https://github.com/puppeteer/puppeteer/blob/v10.0.0/docs/api.md)                   | Chromium 92.0.4512.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v9.0.0](https://github.com/puppeteer/puppeteer/blob/v9.0.0/docs/api.md)                     | Chromium 91.0.4469.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v8.0.0](https://github.com/puppeteer/puppeteer/blob/v8.0.0/docs/api.md)                     | Chromium 90.0.4427.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v7.0.0](https://github.com/puppeteer/puppeteer/blob/v7.0.0/docs/api.md)                     | Chromium 90.0.4403.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v6.0.0](https://github.com/puppeteer/puppeteer/blob/v6.0.0/docs/api.md)                     | Chromium 89.0.4389.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v5.5.0](https://github.com/puppeteer/puppeteer/blob/v5.5.0/docs/api.md)                     | Chromium 88.0.4298.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v5.4.0](https://github.com/puppeteer/puppeteer/blob/v5.4.0/docs/api.md)                     | Chromium 87.0.4272.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v5.3.0](https://github.com/puppeteer/puppeteer/blob/v5.3.0/docs/api.md)                     | Chromium 86.0.4240.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v5.2.1](https://github.com/puppeteer/puppeteer/blob/v5.2.1/docs/api.md)                     | Chromium 85.0.4182.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v5.1.0](https://github.com/puppeteer/puppeteer/blob/v5.1.0/docs/api.md)                     | Chromium 84.0.4147.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v3.1.0](https://github.com/puppeteer/puppeteer/blob/v3.1.0/docs/api.md)                     | Chromium 83.0.4103.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v3.0.0](https://github.com/puppeteer/puppeteer/blob/v3.0.0/docs/api.md)                     | Chromium 81.0.4044.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v2.1.0](https://github.com/puppeteer/puppeteer/blob/v2.1.0/docs/api.md)                     | Chromium 80.0.3987.0                                                                       | Firefox Nightly (at the time)                             |
| [Puppeteer v2.0.0](https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md)                     | Chromium 79.0.3942.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.20.0](https://github.com/puppeteer/puppeteer/blob/v1.20.0/docs/api.md)                   | Chromium 78.0.3882.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.19.0](https://github.com/puppeteer/puppeteer/blob/v1.19.0/docs/api.md)                   | Chromium 77.0.3803.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.17.0](https://github.com/puppeteer/puppeteer/blob/v1.17.0/docs/api.md)                   | Chromium 76.0.3803.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.15.0](https://github.com/puppeteer/puppeteer/blob/v1.15.0/docs/api.md)                   | Chromium 75.0.3765.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.13.0](https://github.com/puppeteer/puppeteer/blob/v1.13.0/docs/api.md)                   | Chromium 74.0.3723.0                                                                       | Firefox not supported                                     |
| [Puppeteer v1.12.2](https://github.com/puppeteer/puppeteer/blob/v1.12.2/docs/api.md)                   | Chromium 73.0.3679.0                                                                       | Firefox not supported                                     |

<!-- version-end -->

# WebDriver BiDi support

Source: https://pptr.dev/webdriver-bidi

[WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) is a new
cross-browser automation protocol currently under development, aiming to
combine the best of both WebDriver “Classic” and CDP. WebDriver BiDi
enables bi-directional communication, making it fast by default, and it
comes packed with low-level control.

## Automate with Chrome and Firefox

Puppeteer supports WebDriver BiDi automation with Chrome and Firefox.
When launching Firefox with Puppeteer, the WebDriver BiDi Protocol is
enabled by default. When launching Chrome, CDP is still used by default
since not all CDP features are supported by WebDriver BiDi yet. If a
certain Puppeteer feature is not supported over WebDriver BiDi yet,
[`UnsupportedOperation`](https://pptr.dev/api/puppeteer.unsupportedoperation)
error is thrown. Also see the lists below on what is supported with
WebDriver BiDi.

## Get started

Below is an example of launching Firefox or Chrome with WebDriver BiDi:

```ts
import puppeteer from 'puppeteer';

const firefoxBrowser = await puppeteer.launch({
  browser: 'firefox', // WebDriver BiDi is used by default.
});
const page = await firefoxBrowser.newPage();
...
await firefoxBrowser.close();

const chromeBrowser = await puppeteer.launch({
  browser: 'chrome',
  protocol: 'webDriverBiDi', // CDP would be used by default for Chrome.
});
const page = await chromeBrowser.newPage();
...
await chromeBrowser.close();
```

## Puppeteer features not supported over WebDriver BiDi

- Various emulations
    - Page.emulate()
    - Page.emulateCPUThrottling()
    - Page.emulateIdleState()
    - Page.emulateMediaFeatures()
    - Page.emulateMediaType()
    - Page.emulateVisionDeficiency()
    - Page.setBypassCSP()

- CDP-specific features
    - HTTPRequest.client()
    - HTTPRequest.resourceType()
    - Page.createCDPSession()
    - Page.extensionRealms()
    - Page.triggerExtensionAction()
    - Frame.extensionRealms()
    - Realm.extension()
    - Realm.realmId()

- Accessibility
- Coverage
- Tracing

- Other methods:
    - Frame.waitForDevicePrompt()
    - HTTPResponse.buffer()
    - HTTPResponse.content()
    - HTTPResponse.text()
    - HTTPResponse.fromServiceWorker()
    - HTTPResponse.securityDetails()
    - Input.drag()
    - Input.dragAndDrop()
    - Input.dragOver()
    - Input.drop()
    - Page.emulateNetworkConditions()
    - Page.isDragInterceptionEnabled()
    - Page.isServiceWorkerBypassed()
    - Page.metrics()
    - Page.queryObjects()
    - Page.screencast()
    - Page.setBypassServiceWorker()
    - Page.setDragInterception()
    - Page.setOfflineMode()
    - Page.waitForDevicePrompt()
    - PageEvent.popup

## Puppeteer features fully supported over WebDriver BiDi

- Browser automation
    - Browser.close()
    - Browser.userAgent()
    - Browser.version()
    - Puppeteer.launch()

- Page automation
    - Frame.goto() (except `referer` and `referrerPolicy`)
    - Page 'popup' event
    - Page.bringToFront()
    - Page.cookies()
    - Page.deleteCookie()
    - Page.goBack()
    - Page.goForward()
    - Page.goto (except `referer` and `referrerPolicy`)
    - Page.reload (except for `ignoreCache` parameter)
    - Page.setCacheEnabled()
    - Page.setCookie()
    - Page.setExtraHTTPHeaders()
    - Page.setGeolocation()
    - Page.setViewport (`width`, `height`, `deviceScaleFactor` only)
    - Page.waitForFileChooser()
    - Page.workers()
    - PageEvent.WorkerCreated
    - PageEvent.WorkerDestroyed
    - Target.opener()

- [Script evaluation](https://pptr.dev/guides/evaluate-javascript):
    - JSHandle.evaluate()
    - JSHandle.evaluateHandle()
    - Page.evaluate()
    - Page.evaluateOnNewDocument()
    - Page.exposeFunction()

- [Selectors](https://pptr.dev/guides/query-selectors) and [locators](https://pptr.dev/guides/locators) except for ARIA:
    - Page.$
    - Page.$$
    - Page.$$eval
    - Page.$eval
    - Page.waitForSelector
    - Page.locator() and all locator APIs

- Input
    - ElementHandle.click
    - ElementHandle.uploadFile
    - Keyboard.down
    - Keyboard.press
    - Keyboard.sendCharacter
    - Keyboard.type
    - Keyboard.up
    - Mouse events (except for dedicated drag'n'drop API methods)
    - Page.tap
    - TouchScreen.\*

- JavaScript dialog interception
    - page.on('dialog')
    - Dialog.\*

- Screenshots (not all parameters are supported)
    - Page.screenshot (supported parameters are `clip`, `encoding`, `fullPage`)

- PDF generation (not all parameters are supported)
    - Page.pdf (only `format`, `height`, `landscape`, `margin`, `pageRanges`, `printBackground`, `scale`, `width` are supported)
    - Page.createPDFStream (only `format`, `height`, `landscape`, `margin`, `pageRanges`, `printBackground`, `scale`, `width` are supported)

- Permissions
    - BrowserContext.clearPermissionOverrides()
    - BrowserContext.overridePermissions()

- Various emulations
    - Page.emulateTimezone()
    - Page.isJavaScriptEnabled()
    - Page.setJavaScriptEnabled()

- [Request interception](https://pptr.dev/guides/request-interception)
    - HTTPRequest.abort() (no custom error support)
    - HTTPRequest.abortErrorReason()
    - HTTPRequest.continue()
    - HTTPRequest.continueRequestOverrides()
    - HTTPRequest.failure()
    - HTTPRequest.finalizeInterceptions()
    - HTTPRequest.interceptResolutionState()
    - HTTPRequest.isInterceptResolutionHandled()
    - HTTPRequest.respond()
    - HTTPRequest.responseForRequest()
    - Page.authenticate()
    - Page.setRequestInterception()
    - Page.setUserAgent()

## See also

- [WebDriver BiDi - The future of cross-browser automation](https://developer.chrome.com/articles/webdriver-bidi/)
- [WebDriver BiDi: 2023 status update](https://developer.chrome.com/blog/webdriver-bidi-2023/)
- [Puppeteer Support for the Cross-Browser WebDriver BiDi Standard](https://hacks.mozilla.org/2023/12/puppeteer-webdriver-bidi/)

# API Reference

Source: https://pptr.dev/api

## Classes

<table><thead><tr><th>

Class

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="accessibility">[Accessibility](./puppeteer.accessibility.md)</span>

</td><td>

The Accessibility class provides methods for inspecting the browser's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or [switches](https://en.wikipedia.org/wiki/Switch_access).

**Remarks:**

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Blink - Chrome's rendering engine - has a concept of "accessibility tree", which is then translated into different platform-specific APIs. Accessibility namespace gives users access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by assistive technologies themselves. By default, Puppeteer tries to approximate this filtering, exposing only the "interesting" nodes of the tree.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Accessibility` class.

</td></tr>
<tr><td>

<span id="browser">[Browser](./puppeteer.browser.md)</span>

</td><td>

[Browser](./puppeteer.browser.md) represents a browser instance that is either:

- connected to via [Puppeteer.connect()](./puppeteer.puppeteer.connect.md) or - launched by [PuppeteerNode.launch()](./puppeteer.puppeteernode.launch.md).

[Browser](./puppeteer.browser.md) [emits](./puppeteer.eventemitter.emit.md) various events which are documented in the [BrowserEvent](./puppeteer.browserevent.md) enum.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Browser` class.

</td></tr>
<tr><td>

<span id="browsercontext">[BrowserContext](./puppeteer.browsercontext.md)</span>

</td><td>

[BrowserContext](./puppeteer.browsercontext.md) represents individual user contexts within a [browser](./puppeteer.browser.md).

When a [browser](./puppeteer.browser.md) is launched, it has at least one default [browser context](./puppeteer.browsercontext.md). Others can be created using [Browser.createBrowserContext()](./puppeteer.browser.createbrowsercontext.md). Each context has isolated storage (cookies/localStorage/etc.)

[BrowserContext](./puppeteer.browsercontext.md) [emits](./puppeteer.eventemitter.md) various events which are documented in the [BrowserContextEvent](./puppeteer.browsercontextevent.md) enum.

If a [page](./puppeteer.page.md) opens another [page](./puppeteer.page.md), e.g. using `window.open`, the popup will belong to the parent [page's browser context](./puppeteer.page.browsercontext.md).

**Remarks:**

In Chrome all non-default contexts are incognito, and [default browser context](./puppeteer.browser.defaultbrowsercontext.md) might be incognito if you provide the `--incognito` argument when launching the browser.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `BrowserContext` class.

</td></tr>
<tr><td>

<span id="browserlauncher">[BrowserLauncher](./puppeteer.browserlauncher.md)</span>

</td><td>

Describes a launcher - a class that is able to create and launch a browser instance.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `BrowserLauncher` class.

</td></tr>
<tr><td>

<span id="cdpsession">[CDPSession](./puppeteer.cdpsession.md)</span>

</td><td>

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol.

**Remarks:**

Protocol methods can be called with [CDPSession.send()](./puppeteer.cdpsession.send.md) method and protocol events can be subscribed to with `CDPSession.on` method.

Useful links: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) and [Getting Started with DevTools Protocol](https://github.com/aslushnikov/getting-started-with-cdp/blob/HEAD/README.md).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `CDPSession` class.

</td></tr>
<tr><td>

<span id="connection">[Connection](./puppeteer.connection.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="connectionclosederror">[ConnectionClosedError](./puppeteer.connectionclosederror.md)</span>

</td><td>

Thrown if underlying protocol connection has been closed.

</td></tr>
<tr><td>

<span id="consolemessage">[ConsoleMessage](./puppeteer.consolemessage.md)</span>

</td><td>

ConsoleMessage objects are dispatched by page via the 'console' event.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ConsoleMessage` class.

</td></tr>
<tr><td>

<span id="coverage">[Coverage](./puppeteer.coverage.md)</span>

</td><td>

The Coverage class provides methods to gather information about parts of JavaScript and CSS that were used by the page.

**Remarks:**

To output coverage in a form consumable by [Istanbul](https://github.com/istanbuljs), see [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Coverage` class.

</td></tr>
<tr><td>

<span id="csscoverage">[CSSCoverage](./puppeteer.csscoverage.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="devicerequestprompt">[DeviceRequestPrompt](./puppeteer.devicerequestprompt.md)</span>

</td><td>

Device request prompts let you respond to the page requesting for a device through an API like WebBluetooth.

**Remarks:**

`DeviceRequestPrompt` instances are returned via the [Page.waitForDevicePrompt()](./puppeteer.page.waitfordeviceprompt.md) method.

</td></tr>
<tr><td>

<span id="dialog">[Dialog](./puppeteer.dialog.md)</span>

</td><td>

Dialog instances are dispatched by the [Page](./puppeteer.page.md) via the `dialog` event.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Dialog` class.

</td></tr>
<tr><td>

<span id="elementhandle">[ElementHandle](./puppeteer.elementhandle.md)</span>

</td><td>

ElementHandle represents an in-page DOM element.

**Remarks:**

ElementHandles can be created with the [Page.$()](./puppeteer.page._.md) method.

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
const hrefElement = await page.$('a');
await hrefElement.click();
// ...
```

ElementHandle prevents the DOM element from being garbage-collected unless the handle is [disposed](./puppeteer.jshandle.dispose.md). ElementHandles are auto-disposed when their associated frame is navigated away or the parent context gets destroyed.

ElementHandle instances can be used as arguments in [Page.$eval()](./puppeteer.page._eval.md) and [Page.evaluate()](./puppeteer.page.evaluate.md) methods.

If you're using TypeScript, ElementHandle takes a generic argument that denotes the type of element the handle is holding within. For example, if you have a handle to a `<select>` element, you can type it as `ElementHandle<HTMLSelectElement>` and you get some nicer type checks.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ElementHandle` class.

</td></tr>
<tr><td>

<span id="eventemitter">[EventEmitter](./puppeteer.eventemitter.md)</span>

</td><td>

The EventEmitter class that many Puppeteer classes extend.

**Remarks:**

This allows you to listen to events that Puppeteer classes fire and act accordingly. Therefore you'll mostly use [on](./puppeteer.eventemitter.on.md) and [off](./puppeteer.eventemitter.off.md) to bind and unbind to event listeners.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `EventEmitter` class.

</td></tr>
<tr><td>

<span id="extension">[Extension](./puppeteer.extension.md)</span>

</td><td>

**_(Experimental)_** [Extension](./puppeteer.extension.md) represents a browser extension installed in the browser. It provides access to the extension's ID, name, and version, as well as methods for interacting with the extension's background workers and pages.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Extension` class.

</td></tr>
<tr><td>

<span id="extensiontransport">[ExtensionTransport](./puppeteer.extensiontransport.md)</span>

</td><td>

**_(Experimental)_** Experimental ExtensionTransport allows establishing a connection via chrome.debugger API if Puppeteer runs in an extension. Since Chrome DevTools Protocol is restricted for extensions, the transport implements missing commands and events.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ExtensionTransport` class.

</td></tr>
<tr><td>

<span id="filechooser">[FileChooser](./puppeteer.filechooser.md)</span>

</td><td>

File choosers let you react to the page requesting for a file.

**Remarks:**

`FileChooser` instances are returned via the [Page.waitForFileChooser()](./puppeteer.page.waitforfilechooser.md) method.

In browsers, only one file chooser can be opened at a time. All file choosers must be accepted or canceled. Not doing so will prevent subsequent file choosers from appearing.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `FileChooser` class.

</td></tr>
<tr><td>

<span id="frame">[Frame](./puppeteer.frame.md)</span>

</td><td>

Represents a DOM frame.

To understand frames, you can think of frames as `<iframe>` elements. Just like iframes, frames can be nested, and when JavaScript is executed in a frame, the JavaScript does not affect frames inside the ambient frame the JavaScript executes in.

**Remarks:**

Frame lifecycles are controlled by three events that are all dispatched on the parent [page](./puppeteer.frame.page.md):

- [PageEvent.FrameAttached](./puppeteer.pageevent.md) - [PageEvent.FrameNavigated](./puppeteer.pageevent.md) - [PageEvent.FrameDetached](./puppeteer.pageevent.md)

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Frame` class.

</td></tr>
<tr><td>

<span id="httprequest">[HTTPRequest](./puppeteer.httprequest.md)</span>

</td><td>

Represents an HTTP request sent by a page.

**Remarks:**

Whenever the page sends a request, such as for a network resource, the following events are emitted by Puppeteer's `page`:

- `request`: emitted when the request is issued by the page.

- `requestfinished` - emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `requestfinished` event the `requestfailed` event is emitted.

All of these events provide an instance of `HTTPRequest` representing the request that occurred:

```
page.on('request', request => ...)
```

NOTE: HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `requestfinished` event.

If request gets a 'redirect' response, the request is successfully finished with the `requestfinished` event, and a new request is issued to a redirected url.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `HTTPRequest` class.

</td></tr>
<tr><td>

<span id="httpresponse">[HTTPResponse](./puppeteer.httpresponse.md)</span>

</td><td>

The HTTPResponse class represents responses which are received by the [Page](./puppeteer.page.md) class.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `HTTPResponse` class.

</td></tr>
<tr><td>

<span id="jscoverage">[JSCoverage](./puppeteer.jscoverage.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `JSCoverage` class.

</td></tr>
<tr><td>

<span id="jshandle">[JSHandle](./puppeteer.jshandle.md)</span>

</td><td>

Represents a reference to a JavaScript object. Instances can be created using [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md).

Handles prevent the referenced JavaScript object from being garbage-collected unless the handle is purposely [disposed](./puppeteer.jshandle.dispose.md). JSHandles are auto-disposed when their associated frame is navigated away or the parent context gets destroyed.

Handles can be used as arguments for any evaluation function such as [Page.$eval()](./puppeteer.page._eval.md), [Page.evaluate()](./puppeteer.page.evaluate.md), and [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md). They are resolved to their referenced object.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `JSHandle` class.

</td></tr>
<tr><td>

<span id="keyboard">[Keyboard](./puppeteer.keyboard.md)</span>

</td><td>

Keyboard provides an api for managing a virtual keyboard. The high level api is [Keyboard.type()](./puppeteer.keyboard.type.md), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

**Remarks:**

For finer control, you can use [Keyboard.down()](./puppeteer.keyboard.down.md), [Keyboard.up()](./puppeteer.keyboard.up.md), and [Keyboard.sendCharacter()](./puppeteer.keyboard.sendcharacter.md) to manually fire events as if they were generated from a real keyboard.

On macOS, keyboard shortcuts like `⌘ A` -&gt; Select All do not work. See [\#1313](https://github.com/puppeteer/puppeteer/issues/1313).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Keyboard` class.

</td></tr>
<tr><td>

<span id="locator">[Locator](./puppeteer.locator.md)</span>

</td><td>

Locators describe a strategy of locating objects and performing an action on them. If the action fails because the object is not ready for the action, the whole operation is retried. Various preconditions for a successful action are checked automatically.

See [https://pptr.dev/guides/page-interactions\#locators](https://pptr.dev/guides/page-interactions#locators) for details.

</td></tr>
<tr><td>

<span id="mouse">[Mouse](./puppeteer.mouse.md)</span>

</td><td>

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

**Remarks:**

Every `page` object has its own Mouse, accessible with [Page.mouse](./puppeteer.page.md#mouse).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Mouse` class.

</td></tr>
<tr><td>

<span id="page">[Page](./puppeteer.page.md)</span>

</td><td>

Page provides methods to interact with a single tab or [extension background page](https://developer.chrome.com/extensions/background_pages) in the browser.

:::note

One Browser instance might have multiple Page instances.

:::

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Page` class.

</td></tr>
<tr><td>

<span id="protocolerror">[ProtocolError](./puppeteer.protocolerror.md)</span>

</td><td>

ProtocolError is emitted whenever there is an error from the protocol.

</td></tr>
<tr><td>

<span id="puppeteer">[Puppeteer](./puppeteer.puppeteer.md)</span>

</td><td>

The main Puppeteer class.

IMPORTANT: if you are using Puppeteer in a Node environment, you will get an instance of [PuppeteerNode](./puppeteer.puppeteernode.md) when you import or require `puppeteer`. That class extends `Puppeteer`, so has all the methods documented below as well as all that are defined on [PuppeteerNode](./puppeteer.puppeteernode.md).

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Puppeteer` class.

</td></tr>
<tr><td>

<span id="puppeteererror">[PuppeteerError](./puppeteer.puppeteererror.md)</span>

</td><td>

The base class for all Puppeteer-specific errors

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `PuppeteerError` class.

</td></tr>
<tr><td>

<span id="puppeteernode">[PuppeteerNode](./puppeteer.puppeteernode.md)</span>

</td><td>

Extends the main [Puppeteer](./puppeteer.puppeteer.md) class with Node specific behaviour for fetching and downloading browsers.

If you're using Puppeteer in a Node environment, this is the class you'll get when you run `require('puppeteer')` (or the equivalent ES `import`).

**Remarks:**

The most common method to use is [launch](./puppeteer.puppeteernode.launch.md), which is used to launch and connect to a new browser instance.

See [the main Puppeteer class](./puppeteer.puppeteer.md) for methods common to all environments, such as [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `PuppeteerNode` class.

</td></tr>
<tr><td>

<span id="realm">[Realm](./puppeteer.realm.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Realm` class.

</td></tr>
<tr><td>

<span id="screenrecorder">[ScreenRecorder](./puppeteer.screenrecorder.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ScreenRecorder` class.

</td></tr>
<tr><td>

<span id="securitydetails">[SecurityDetails](./puppeteer.securitydetails.md)</span>

</td><td>

The SecurityDetails class represents the security details of a response that was received over a secure connection.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `SecurityDetails` class.

</td></tr>
<tr><td>

<span id="target">[Target](./puppeteer.target.md)</span>

</td><td>

Target represents a [CDP target](https://chromedevtools.github.io/devtools-protocol/tot/Target/). In CDP a target is something that can be debugged such a frame, a page or a worker.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Target` class.

</td></tr>
<tr><td>

<span id="timeouterror">[TimeoutError](./puppeteer.timeouterror.md)</span>

</td><td>

TimeoutError is emitted whenever certain operations are terminated due to timeout.

**Remarks:**

Example operations are [page.waitForSelector](./puppeteer.page.waitforselector.md) or [puppeteer.launch](./puppeteer.puppeteernode.launch.md).

</td></tr>
<tr><td>

<span id="toucherror">[TouchError](./puppeteer.toucherror.md)</span>

</td><td>

TouchError is thrown when an attempt is made to move or end a touch that does not exist.

</td></tr>
<tr><td>

<span id="touchscreen">[Touchscreen](./puppeteer.touchscreen.md)</span>

</td><td>

The Touchscreen class exposes touchscreen events.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Touchscreen` class.

</td></tr>
<tr><td>

<span id="tracing">[Tracing](./puppeteer.tracing.md)</span>

</td><td>

The Tracing class exposes the tracing audit interface.

**Remarks:**

You can use `tracing.start` and `tracing.stop` to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Tracing` class.

</td></tr>
<tr><td>

<span id="unsupportedoperation">[UnsupportedOperation](./puppeteer.unsupportedoperation.md)</span>

</td><td>

Puppeteer will throw this error if a method is not supported by the currently used protocol

</td></tr>
<tr><td>

<span id="webmcp">[WebMCP](./puppeteer.webmcp.md)</span>

</td><td>

**_(Experimental)_** The experimental WebMCP class provides an API for the WebMCP API.

See the [WebMCP guide](https://pptr.dev/guides/webmcp) for more details.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCP` class.

</td></tr>
<tr><td>

<span id="webmcptool">[WebMCPTool](./puppeteer.webmcptool.md)</span>

</td><td>

Represents a registered WebMCP tool available on the page.

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCPTool` class.

</td></tr>
<tr><td>

<span id="webmcptoolcall">[WebMCPToolCall](./puppeteer.webmcptoolcall.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCPToolCall` class.

</td></tr>
<tr><td>

<span id="webworker">[WebWorker](./puppeteer.webworker.md)</span>

</td><td>

This class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

**Remarks:**

The events `workercreated` and `workerdestroyed` are emitted on the page object to signal the worker lifecycle.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebWorker` class.

</td></tr>
</tbody></table>

## Enumerations

<table><thead><tr><th>

Enumeration

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="autofilladdressfield">[AutofillAddressField](./puppeteer.autofilladdressfield.md)</span>

</td><td>

Supported autofill address field names.

</td></tr>
<tr><td>

<span id="browsercontextevent">[BrowserContextEvent](./puppeteer.browsercontextevent.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="browserevent">[BrowserEvent](./puppeteer.browserevent.md)</span>

</td><td>

All the events a [browser instance](./puppeteer.browser.md) may emit.

</td></tr>
<tr><td>

<span id="interceptresolutionaction">[InterceptResolutionAction](./puppeteer.interceptresolutionaction.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="locatorevent">[LocatorEvent](./puppeteer.locatorevent.md)</span>

</td><td>

All the events that a locator instance may emit.

</td></tr>
<tr><td>

<span id="pageevent">[PageEvent](./puppeteer.pageevent.md)</span>

</td><td>

All the events that a page instance may emit.

</td></tr>
<tr><td>

<span id="targettype">[TargetType](./puppeteer.targettype.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webworkerevent">[WebWorkerEvent](./puppeteer.webworkerevent.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Functions

<table><thead><tr><th>

Function

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="connect">[connect(options)](./puppeteer.connect.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="defaultargs">[defaultArgs(options)](./puppeteer.defaultargs.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="launch">[launch(options)](./puppeteer.launch.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="trimcache">[trimCache()](./puppeteer.trimcache.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Interfaces

<table><thead><tr><th>

Interface

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="actionoptions">[ActionOptions](./puppeteer.actionoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="addscreenparams">[AddScreenParams](./puppeteer.addscreenparams.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="bluetoothemulation">[BluetoothEmulation](./puppeteer.bluetoothemulation.md)</span>

</td><td>

**_(Experimental)_** Exposes the bluetooth emulation abilities.

**Remarks:**

[Web Bluetooth specification](https://webbluetoothcg.github.io/web-bluetooth/#simulated-bluetooth-adapter) requires the emulated adapters should be isolated per top-level navigable. However, at the moment Chromium's bluetooth emulation implementation is tight to the browser context, not the page. This means the bluetooth emulation exposed from different pages of the same browser context would interfere their states.

</td></tr>
<tr><td>

<span id="bluetoothmanufacturerdata">[BluetoothManufacturerData](./puppeteer.bluetoothmanufacturerdata.md)</span>

</td><td>

Represents the simulated bluetooth peripheral's manufacturer data.

</td></tr>
<tr><td>

<span id="boundingbox">[BoundingBox](./puppeteer.boundingbox.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="boxmodel">[BoxModel](./puppeteer.boxmodel.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="browsercontextevents">[BrowserContextEvents](./puppeteer.browsercontextevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="browsercontextoptions">[BrowserContextOptions](./puppeteer.browsercontextoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="browserevents">[BrowserEvents](./puppeteer.browserevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="cdpsessionevents">[CDPSessionEvents](./puppeteer.cdpsessionevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="chromeheadlessshellsettings">[ChromeHeadlessShellSettings](./puppeteer.chromeheadlessshellsettings.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="chromesettings">[ChromeSettings](./puppeteer.chromesettings.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="clickoptions">[ClickOptions](./puppeteer.clickoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="commandoptions">[CommandOptions](./puppeteer.commandoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="commoneventemitter">[CommonEventEmitter](./puppeteer.commoneventemitter.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="configuration">[Configuration](./puppeteer.configuration.md)</span>

</td><td>

Defines options to configure Puppeteer's behavior during installation and runtime.

See individual properties for more information.

</td></tr>
<tr><td>

<span id="connectiontransport">[ConnectionTransport](./puppeteer.connectiontransport.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="connectoptions">[ConnectOptions](./puppeteer.connectoptions.md)</span>

</td><td>

Generic browser options that can be passed when launching any browser or when connecting to an existing browser instance.

</td></tr>
<tr><td>

<span id="consolemessagelocation">[ConsoleMessageLocation](./puppeteer.consolemessagelocation.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="continuerequestoverrides">[ContinueRequestOverrides](./puppeteer.continuerequestoverrides.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="cookie">[Cookie](./puppeteer.cookie.md)</span>

</td><td>

Represents a cookie object.

</td></tr>
<tr><td>

<span id="cookiedata">[CookieData](./puppeteer.cookiedata.md)</span>

</td><td>

Cookie parameter object used to set cookies in the browser-level cookies API.

</td></tr>
<tr><td>

<span id="cookieparam">[CookieParam](./puppeteer.cookieparam.md)</span>

</td><td>

Cookie parameter object used to set cookies in the page-level cookies API.

</td></tr>
<tr><td>

<span id="cookiepartitionkey">[CookiePartitionKey](./puppeteer.cookiepartitionkey.md)</span>

</td><td>

Represents a cookie partition key in Chrome.

</td></tr>
<tr><td>

<span id="coverageentry">[CoverageEntry](./puppeteer.coverageentry.md)</span>

</td><td>

The CoverageEntry class represents one entry of the coverage report.

</td></tr>
<tr><td>

<span id="credentials">[Credentials](./puppeteer.credentials.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="csscoverageoptions">[CSSCoverageOptions](./puppeteer.csscoverageoptions.md)</span>

</td><td>

Set of configurable options for CSS coverage.

</td></tr>
<tr><td>

<span id="customqueryhandler">[CustomQueryHandler](./puppeteer.customqueryhandler.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="debuginfo">[DebugInfo](./puppeteer.debuginfo.md)</span>

</td><td>

**_(Experimental)_**

</td></tr>
<tr><td>

<span id="deletecookiesrequest">[DeleteCookiesRequest](./puppeteer.deletecookiesrequest.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="device">[Device](./puppeteer.device.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="devicerequestpromptdevice">[DeviceRequestPromptDevice](./puppeteer.devicerequestpromptdevice.md)</span>

</td><td>

Device in a request prompt.

</td></tr>
<tr><td>

<span id="downloadbehavior">[DownloadBehavior](./puppeteer.downloadbehavior.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="elementscreenshotoptions">[ElementScreenshotOptions](./puppeteer.elementscreenshotoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="firefoxsettings">[FirefoxSettings](./puppeteer.firefoxsettings.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="frameaddscripttagoptions">[FrameAddScriptTagOptions](./puppeteer.frameaddscripttagoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="frameaddstyletagoptions">[FrameAddStyleTagOptions](./puppeteer.frameaddstyletagoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="frameevents">[FrameEvents](./puppeteer.frameevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="framewaitforfunctionoptions">[FrameWaitForFunctionOptions](./puppeteer.framewaitforfunctionoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="geolocationoptions">[GeolocationOptions](./puppeteer.geolocationoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="gotooptions">[GoToOptions](./puppeteer.gotooptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="heapsnapshotoptions">[HeapSnapshotOptions](./puppeteer.heapsnapshotoptions.md)</span>

</td><td>

Options for [Page.captureHeapSnapshot()](./puppeteer.page.captureheapsnapshot.md).

</td></tr>
<tr><td>

<span id="interceptresolutionstate">[InterceptResolutionState](./puppeteer.interceptresolutionstate.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="internalnetworkconditions">[InternalNetworkConditions](./puppeteer.internalnetworkconditions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="issue">[Issue](./puppeteer.issue.md)</span>

</td><td>

The Issue interface represents a DevTools issue.

</td></tr>
<tr><td>

<span id="jscoverageentry">[JSCoverageEntry](./puppeteer.jscoverageentry.md)</span>

</td><td>

The CoverageEntry class for JavaScript

</td></tr>
<tr><td>

<span id="jscoverageoptions">[JSCoverageOptions](./puppeteer.jscoverageoptions.md)</span>

</td><td>

Set of configurable options for JS coverage.

</td></tr>
<tr><td>

<span id="keyboardtypeoptions">[KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="keydownoptions">[KeyDownOptions](./puppeteer.keydownoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="launchoptions">[LaunchOptions](./puppeteer.launchoptions.md)</span>

</td><td>

Generic launch options that can be passed when launching any browser.

</td></tr>
<tr><td>

<span id="locatorevents">[LocatorEvents](./puppeteer.locatorevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="locatorfilloptions">[LocatorFillOptions](./puppeteer.locatorfilloptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="locatorscrolloptions">[LocatorScrollOptions](./puppeteer.locatorscrolloptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mediafeature">[MediaFeature](./puppeteer.mediafeature.md)</span>

</td><td>

A media feature to emulate.

</td></tr>
<tr><td>

<span id="metrics">[Metrics](./puppeteer.metrics.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mouseclickoptions">[MouseClickOptions](./puppeteer.mouseclickoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mousemoveoptions">[MouseMoveOptions](./puppeteer.mousemoveoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mouseoptions">[MouseOptions](./puppeteer.mouseoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mousewheeloptions">[MouseWheelOptions](./puppeteer.mousewheeloptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="moveable">[Moveable](./puppeteer.moveable.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="networkconditions">[NetworkConditions](./puppeteer.networkconditions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="newdocumentscriptevaluation">[NewDocumentScriptEvaluation](./puppeteer.newdocumentscriptevaluation.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="offset">[Offset](./puppeteer.offset.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="pageevents">[PageEvents](./puppeteer.pageevents.md)</span>

</td><td>

Denotes the objects received by callback functions for page events.

See [PageEvent](./puppeteer.pageevent.md) for more detail on the events and when they are emitted.

</td></tr>
<tr><td>

<span id="pdfmargin">[PDFMargin](./puppeteer.pdfmargin.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="pdfoptions">[PDFOptions](./puppeteer.pdfoptions.md)</span>

</td><td>

Valid options to configure PDF generation via [Page.pdf()](./puppeteer.page.pdf.md).

</td></tr>
<tr><td>

<span id="permissiondescriptor_2">[PermissionDescriptor_2](./puppeteer.permissiondescriptor_2.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="point">[Point](./puppeteer.point.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="preconnectedperipheral">[PreconnectedPeripheral](./puppeteer.preconnectedperipheral.md)</span>

</td><td>

A bluetooth peripheral to be simulated.

</td></tr>
<tr><td>

<span id="queryoptions">[QueryOptions](./puppeteer.queryoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="reloadoptions">[ReloadOptions](./puppeteer.reloadoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="remoteaddress">[RemoteAddress](./puppeteer.remoteaddress.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="responseforrequest">[ResponseForRequest](./puppeteer.responseforrequest.md)</span>

</td><td>

Required response data to fulfill a request with.

</td></tr>
<tr><td>

<span id="screencastoptions">[ScreencastOptions](./puppeteer.screencastoptions.md)</span>

</td><td>

**_(Experimental)_**

</td></tr>
<tr><td>

<span id="screeninfo">[ScreenInfo](./puppeteer.screeninfo.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="screenorientation_2">[ScreenOrientation_2](./puppeteer.screenorientation_2.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="screenshotclip">[ScreenshotClip](./puppeteer.screenshotclip.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="screenshotoptions">[ScreenshotOptions](./puppeteer.screenshotoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="serializedaxnode">[SerializedAXNode](./puppeteer.serializedaxnode.md)</span>

</td><td>

Represents a Node and the properties of it that are relevant to Accessibility.

</td></tr>
<tr><td>

<span id="setcontentwaitforoptions">[SetContentWaitForOptions](./puppeteer.setcontentwaitforoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="snapshotoptions">[SnapshotOptions](./puppeteer.snapshotoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="supportedwebdrivercapabilities">[SupportedWebDriverCapabilities](./puppeteer.supportedwebdrivercapabilities.md)</span>

</td><td>

WebDriver BiDi capabilities that are not set by Puppeteer itself.

</td></tr>
<tr><td>

<span id="touchhandle">[TouchHandle](./puppeteer.touchhandle.md)</span>

</td><td>

The TouchHandle interface exposes methods to manipulate touches that have been started

</td></tr>
<tr><td>

<span id="tracingoptions">[TracingOptions](./puppeteer.tracingoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="viewport">[Viewport](./puppeteer.viewport.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="waitfornetworkidleoptions">[WaitForNetworkIdleOptions](./puppeteer.waitfornetworkidleoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="waitforoptions">[WaitForOptions](./puppeteer.waitforoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="waitforselectoroptions">[WaitForSelectorOptions](./puppeteer.waitforselectoroptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="waitfortargetoptions">[WaitForTargetOptions](./puppeteer.waitfortargetoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="waittimeoutoptions">[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webmcpannotation">[WebMCPAnnotation](./puppeteer.webmcpannotation.md)</span>

</td><td>

Tool annotations

</td></tr>
<tr><td>

<span id="webmcptoolcallresult">[WebMCPToolCallResult](./puppeteer.webmcptoolcallresult.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webmcptoolsaddedevent">[WebMCPToolsAddedEvent](./puppeteer.webmcptoolsaddedevent.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webmcptoolsremovedevent">[WebMCPToolsRemovedEvent](./puppeteer.webmcptoolsremovedevent.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webworkerevents">[WebWorkerEvents](./puppeteer.webworkerevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="windowbounds">[WindowBounds](./puppeteer.windowbounds.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="workareainsets">[WorkAreaInsets](./puppeteer.workareainsets.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Namespaces

<table><thead><tr><th>

Namespace

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="cdpsessionevent">[CDPSessionEvent](./puppeteer.cdpsessionevent.md)</span>

</td><td>

Events that the CDPSession class emits.

</td></tr>
</tbody></table>

## Variables

<table><thead><tr><th>

Variable

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="default_intercept_resolution_priority">[DEFAULT_INTERCEPT_RESOLUTION_PRIORITY](./puppeteer.default_intercept_resolution_priority.md)</span>

</td><td>

The default cooperative request interception resolution priority

</td></tr>
<tr><td>

<span id="executablepath">[executablePath](./puppeteer.executablepath.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="knowndevices">[KnownDevices](./puppeteer.knowndevices.md)</span>

</td><td>

A list of devices to be used with [Page.emulate()](./puppeteer.page.emulate.md).

</td></tr>
<tr><td>

<span id="mousebutton">[MouseButton](./puppeteer.mousebutton.md)</span>

</td><td>

Enum of valid mouse buttons.

</td></tr>
<tr><td>

<span id="predefinednetworkconditions">[PredefinedNetworkConditions](./puppeteer.predefinednetworkconditions.md)</span>

</td><td>

A list of pre-defined network conditions to be used with [Page.emulateNetworkConditions()](./puppeteer.page.emulatenetworkconditions.md).

</td></tr>
<tr><td>

<span id="puppeteer">[puppeteer](./puppeteer.puppeteer.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Type Aliases

<table><thead><tr><th>

Type Alias

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="actionresult">[ActionResult](./puppeteer.actionresult.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="adapterstate">[AdapterState](./puppeteer.adapterstate.md)</span>

</td><td>

Emulated bluetooth adapter state.

</td></tr>
<tr><td>

<span id="autofilldata">[AutofillData](./puppeteer.autofilldata.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="awaitable">[Awaitable](./puppeteer.awaitable.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="awaitableiterable">[AwaitableIterable](./puppeteer.awaitableiterable.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="awaitablepredicate">[AwaitablePredicate](./puppeteer.awaitablepredicate.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="awaitedlocator">[AwaitedLocator](./puppeteer.awaitedlocator.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="cdpevents">[CDPEvents](./puppeteer.cdpevents.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="chromereleasechannel">[ChromeReleaseChannel](./puppeteer.chromereleasechannel.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="consolemessagetype">[ConsoleMessageType](./puppeteer.consolemessagetype.md)</span>

</td><td>

The supported types for console messages.

</td></tr>
<tr><td>

<span id="cookiepriority">[CookiePriority](./puppeteer.cookiepriority.md)</span>

</td><td>

Represents the cookie's 'Priority' status: https://tools.ietf.org/html/draft-west-cookie-priority-00

</td></tr>
<tr><td>

<span id="cookiesamesite">[CookieSameSite](./puppeteer.cookiesamesite.md)</span>

</td><td>

Represents the cookie's 'SameSite' status: https://tools.ietf.org/html/draft-west-first-party-cookies

</td></tr>
<tr><td>

<span id="cookiesourcescheme">[CookieSourceScheme](./puppeteer.cookiesourcescheme.md)</span>

</td><td>

Represents the source scheme of the origin that originally set the cookie. A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme. This is a temporary ability and it will be removed in the future.

</td></tr>
<tr><td>

<span id="createpageoptions">[CreatePageOptions](./puppeteer.createpageoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="downloadpolicy">[DownloadPolicy](./puppeteer.downloadpolicy.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="elementfor">[ElementFor](./puppeteer.elementfor.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="errorcode">[ErrorCode](./puppeteer.errorcode.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="evaluatefunc">[EvaluateFunc](./puppeteer.evaluatefunc.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="evaluatefuncwith">[EvaluateFuncWith](./puppeteer.evaluatefuncwith.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="eventswithwildcard">[EventsWithWildcard](./puppeteer.eventswithwildcard.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="eventtype">[EventType](./puppeteer.eventtype.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="experimentsconfiguration">[ExperimentsConfiguration](./puppeteer.experimentsconfiguration.md)</span>

</td><td>

Defines experiment options for Puppeteer.

See individual properties for more information.

</td></tr>
<tr><td>

<span id="flattenhandle">[FlattenHandle](./puppeteer.flattenhandle.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="handlefor">[HandleFor](./puppeteer.handlefor.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="handleor">[HandleOr](./puppeteer.handleor.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="handler">[Handler](./puppeteer.handler.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="imageformat">[ImageFormat](./puppeteer.imageformat.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="innerparams">[InnerParams](./puppeteer.innerparams.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="keyinput">[KeyInput](./puppeteer.keyinput.md)</span>

</td><td>

All the valid keys that can be passed to functions that take user input, such as [keyboard.press](./puppeteer.keyboard.press.md)

</td></tr>
<tr><td>

<span id="keypressoptions">[KeyPressOptions](./puppeteer.keypressoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="locatorclickoptions">[LocatorClickOptions](./puppeteer.locatorclickoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="lowercasepaperformat">[LowerCasePaperFormat](./puppeteer.lowercasepaperformat.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mapper">[Mapper](./puppeteer.mapper.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="mousebutton">[MouseButton](./puppeteer.mousebutton.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="nodefor">[NodeFor](./puppeteer.nodefor.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="paperformat">[PaperFormat](./puppeteer.paperformat.md)</span>

</td><td>

All the valid paper format types when printing a PDF.

**Remarks:**

The sizes of each format are as follows:

- `Letter`: 8.5in x 11in / 21.59cm x 27.94cm

- `Legal`: 8.5in x 14in / 21.59cm x 35.56cm

- `Tabloid`: 11in x 17in / 27.94cm x 43.18cm

- `Ledger`: 17in x 11in / 43.18cm x 27.94cm

- `A0`: 33.1102in x 46.811in / 84.1cm x 118.9cm

- `A1`: 23.3858in x 33.1102in / 59.4cm x 84.1cm

- `A2`: 16.5354in x 23.3858in / 42cm x 59.4cm

- `A3`: 11.6929in x 16.5354in / 29.7cm x 42cm

- `A4`: 8.2677in x 11.6929in / 21cm x 29.7cm

- `A5`: 5.8268in x 8.2677in / 14.8cm x 21cm

- `A6`: 4.1339in x 5.8268in / 10.5cm x 14.8cm

</td></tr>
<tr><td>

<span id="permission">[Permission](./puppeteer.permission.md)</span>

</td><td>

**Deprecated:**

in favor of .

</td></tr>
<tr><td>

<span id="permissionstate_2">[PermissionState_2](./puppeteer.permissionstate_2.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="predicate">[Predicate](./puppeteer.predicate.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="protocollifecycleevent">[ProtocolLifeCycleEvent](./puppeteer.protocollifecycleevent.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="protocoltype">[ProtocolType](./puppeteer.protocoltype.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="puppeteerlifecycleevent">[PuppeteerLifeCycleEvent](./puppeteer.puppeteerlifecycleevent.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="quad">[Quad](./puppeteer.quad.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="resourcetype">[ResourceType](./puppeteer.resourcetype.md)</span>

</td><td>

Resource types for HTTPRequests as perceived by the rendering engine.

</td></tr>
<tr><td>

<span id="supportedbrowser">[SupportedBrowser](./puppeteer.supportedbrowser.md)</span>

</td><td>

Browsers supported by Puppeteer.

</td></tr>
<tr><td>

<span id="supportedwebdrivercapability">[SupportedWebDriverCapability](./puppeteer.supportedwebdrivercapability.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="targetfiltercallback">[TargetFilterCallback](./puppeteer.targetfiltercallback.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="videoformat">[VideoFormat](./puppeteer.videoformat.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="visibilityoption">[VisibilityOption](./puppeteer.visibilityoption.md)</span>

</td><td>

Whether to wait for the element to be [visible](./puppeteer.elementhandle.isvisible.md) or [hidden](./puppeteer.elementhandle.ishidden.md). `null` to disable visibility checks.

</td></tr>
<tr><td>

<span id="webmcpinvocationstatus">[WebMCPInvocationStatus](./puppeteer.webmcpinvocationstatus.md)</span>

</td><td>

Represents the status of a tool invocation.

</td></tr>
<tr><td>

<span id="windowid">[WindowId](./puppeteer.windowid.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="windowstate">[WindowState](./puppeteer.windowstate.md)</span>

</td><td>

</td></tr>
</tbody></table>

# Accessibility class

Source: https://pptr.dev/api/puppeteer.accessibility

The Accessibility class provides methods for inspecting the browser's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or [switches](https://en.wikipedia.org/wiki/Switch_access).

### Signature

```typescript
export declare class Accessibility
```

## Remarks

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Blink - Chrome's rendering engine - has a concept of "accessibility tree", which is then translated into different platform-specific APIs. Accessibility namespace gives users access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by assistive technologies themselves. By default, Puppeteer tries to approximate this filtering, exposing only the "interesting" nodes of the tree.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Accessibility` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="snapshot">[snapshot(options)](./puppeteer.accessibility.snapshot.md)</span>

</td><td>

</td><td>

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page.

**Remarks:**

**NOTE** The Chrome accessibility tree contains nodes that go unused on most platforms and by most screen readers. Puppeteer will discard them as well for an easier to process tree, unless `interestingOnly` is set to `false`.

</td></tr>
</tbody></table>

# Accessibility.snapshot() method

Source: https://pptr.dev/api/puppeteer.accessibility.snapshot

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page.

### Signature

```typescript
class Accessibility {
	snapshot(options?: SnapshotOptions): Promise<SerializedAXNode | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[SnapshotOptions](./puppeteer.snapshotoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[SerializedAXNode](./puppeteer.serializedaxnode.md) \| null&gt;

An AXNode object representing the snapshot.

## Remarks

**NOTE** The Chrome accessibility tree contains nodes that go unused on most platforms and by most screen readers. Puppeteer will discard them as well for an easier to process tree, unless `interestingOnly` is set to `false`.

## Example 1

An example of dumping the entire accessibility tree:

```ts
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);
```

## Example 2

An example of logging the focused node's name:

```ts
const snapshot = await page.accessibility.snapshot();
const node = findFocusedNode(snapshot);
console.log(node && node.name);

function findFocusedNode(node) {
	if (node.focused) return node;
	for (const child of node.children || []) {
		const foundNode = findFocusedNode(child);
		return foundNode;
	}
	return null;
}
```

# ActionOptions interface

Source: https://pptr.dev/api/puppeteer.actionoptions

### Signature

```typescript
export interface ActionOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal to abort the locator action.

</td><td>

</td></tr>
</tbody></table>

# ActionResult type

Source: https://pptr.dev/api/puppeteer.actionresult

### Signature

```typescript
export type ActionResult = 'continue' | 'abort' | 'respond';
```

# AdapterState type

Source: https://pptr.dev/api/puppeteer.adapterstate

Emulated bluetooth adapter state.

### Signature

```typescript
export type AdapterState = 'absent' | 'powered-off' | 'powered-on';
```

# AddScreenParams interface

Source: https://pptr.dev/api/puppeteer.addscreenparams

### Signature

```typescript
export interface AddScreenParams
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="colordepth">colorDepth</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="devicepixelratio">devicePixelRatio</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="height">height</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="isinternal">isInternal</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="label">label</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="left">left</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="rotation">rotation</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="top">top</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="workareainsets">workAreaInsets</span>

</td><td>

`optional`

</td><td>

[WorkAreaInsets](./puppeteer.workareainsets.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# AutofillAddressField enum

Source: https://pptr.dev/api/puppeteer.autofilladdressfield

Supported autofill address field names.

### Signature

```typescript
export declare const enum AutofillAddressField
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

AddressHomeCity

</td><td>

`"ADDRESS_HOME_CITY"`

</td><td>

</td></tr>
<tr><td>

AddressHomeCountry

</td><td>

`"ADDRESS_HOME_COUNTRY"`

</td><td>

</td></tr>
<tr><td>

AddressHomeLine1

</td><td>

`"ADDRESS_HOME_LINE1"`

</td><td>

</td></tr>
<tr><td>

AddressHomeLine2

</td><td>

`"ADDRESS_HOME_LINE2"`

</td><td>

</td></tr>
<tr><td>

AddressHomeState

</td><td>

`"ADDRESS_HOME_STATE"`

</td><td>

</td></tr>
<tr><td>

AddressHomeStreetAddress

</td><td>

`"ADDRESS_HOME_STREET_ADDRESS"`

</td><td>

</td></tr>
<tr><td>

AddressHomeZip

</td><td>

`"ADDRESS_HOME_ZIP"`

</td><td>

</td></tr>
<tr><td>

EmailAddress

</td><td>

`"EMAIL_ADDRESS"`

</td><td>

</td></tr>
<tr><td>

NameFirst

</td><td>

`"NAME_FIRST"`

</td><td>

</td></tr>
<tr><td>

NameFull

</td><td>

`"NAME_FULL"`

</td><td>

</td></tr>
<tr><td>

NameLast

</td><td>

`"NAME_LAST"`

</td><td>

</td></tr>
<tr><td>

NameMiddle

</td><td>

`"NAME_MIDDLE"`

</td><td>

</td></tr>
<tr><td>

PhoneHomeCityAndNumber

</td><td>

`"PHONE_HOME_CITY_AND_NUMBER"`

</td><td>

</td></tr>
<tr><td>

PhoneHomeNumber

</td><td>

`"PHONE_HOME_NUMBER"`

</td><td>

</td></tr>
<tr><td>

PhoneHomeWholeNumber

</td><td>

`"PHONE_HOME_WHOLE_NUMBER"`

</td><td>

</td></tr>
</tbody></table>

# AutofillData type

Source: https://pptr.dev/api/puppeteer.autofilldata

### Signature

```typescript
export type AutofillData =
	| {
			creditCard: {
				number: string;
				name: string;
				expiryMonth: string;
				expiryYear: string;
				cvc: string;
			};
			address?: never;
	  }
	| {
			address: {
				fields: Array<{
					name: AutofillAddressField | (string & Record<never, never>);
					value: string;
				}>;
			};
			creditCard?: never;
	  };
```

**References:** [AutofillAddressField](./puppeteer.autofilladdressfield.md)

# Awaitable type

Source: https://pptr.dev/api/puppeteer.awaitable

### Signature

```typescript
export type Awaitable<T> = T | PromiseLike<T>;
```

# AwaitableIterable type

Source: https://pptr.dev/api/puppeteer.awaitableiterable

### Signature

```typescript
export type AwaitableIterable<T> = Iterable<T> | AsyncIterable<T>;
```

# AwaitablePredicate type

Source: https://pptr.dev/api/puppeteer.awaitablepredicate

### Signature

```typescript
export type AwaitablePredicate<T> = (value: T) => Awaitable<boolean>;
```

**References:** [Awaitable](./puppeteer.awaitable.md)

# AwaitedLocator type

Source: https://pptr.dev/api/puppeteer.awaitedlocator

### Signature

```typescript
export type AwaitedLocator<T> = T extends Locator<infer S> ? S : never;
```

**References:** [Locator](./puppeteer.locator.md)

# BluetoothEmulation.disableEmulation() method

Source: https://pptr.dev/api/puppeteer.bluetoothemulation.disableemulation

Disable emulated bluetooth adapter. See [bluetooth.disableSimulation](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-disableSimulation-command).

### Signature

```typescript
interface BluetoothEmulation {
	disableEmulation(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# BluetoothEmulation.emulateAdapter() method

Source: https://pptr.dev/api/puppeteer.bluetoothemulation.emulateadapter

Emulate Bluetooth adapter. Required for bluetooth simulations See [bluetooth.simulateAdapter](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateAdapter-command).

### Signature

```typescript
interface BluetoothEmulation {
	emulateAdapter(state: AdapterState, leSupported?: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

state

</td><td>

[AdapterState](./puppeteer.adapterstate.md)

</td><td>

The desired bluetooth adapter state.

</td></tr>
<tr><td>

leSupported

</td><td>

boolean

</td><td>

_(Optional)_ Mark if the adapter supports low-energy bluetooth.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BluetoothEmulation interface

Source: https://pptr.dev/api/puppeteer.bluetoothemulation

Exposes the bluetooth emulation abilities.

### Signature

```typescript
export interface BluetoothEmulation
```

## Remarks

[Web Bluetooth specification](https://webbluetoothcg.github.io/web-bluetooth/#simulated-bluetooth-adapter) requires the emulated adapters should be isolated per top-level navigable. However, at the moment Chromium's bluetooth emulation implementation is tight to the browser context, not the page. This means the bluetooth emulation exposed from different pages of the same browser context would interfere their states.

## Example

```ts
await page.bluetooth.emulateAdapter('powered-on');
await page.bluetooth.simulatePreconnectedPeripheral({
	address: '09:09:09:09:09:09',
	name: 'SOME_NAME',
	manufacturerData: [
		{
			key: 17,
			data: 'AP8BAX8=',
		},
	],
	knownServiceUuids: ['12345678-1234-5678-9abc-def123456789'],
});
await page.bluetooth.disableEmulation();
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="disableemulation">[disableEmulation()](./puppeteer.bluetoothemulation.disableemulation.md)</span>

</td><td>

**_(Experimental)_** Disable emulated bluetooth adapter. See [bluetooth.disableSimulation](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-disableSimulation-command).

</td></tr>
<tr><td>

<span id="emulateadapter">[emulateAdapter(state, leSupported)](./puppeteer.bluetoothemulation.emulateadapter.md)</span>

</td><td>

**_(Experimental)_** Emulate Bluetooth adapter. Required for bluetooth simulations See [bluetooth.simulateAdapter](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateAdapter-command).

</td></tr>
<tr><td>

<span id="simulatepreconnectedperipheral">[simulatePreconnectedPeripheral(preconnectedPeripheral)](./puppeteer.bluetoothemulation.simulatepreconnectedperipheral.md)</span>

</td><td>

**_(Experimental)_** Simulated preconnected Bluetooth Peripheral. See [bluetooth.simulatePreconnectedPeripheral](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateconnectedperipheral-command).

</td></tr>
</tbody></table>

# BluetoothEmulation.simulatePreconnectedPeripheral() method

Source: https://pptr.dev/api/puppeteer.bluetoothemulation.simulatepreconnectedperipheral

Simulated preconnected Bluetooth Peripheral. See [bluetooth.simulatePreconnectedPeripheral](https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateconnectedperipheral-command).

### Signature

```typescript
interface BluetoothEmulation {
	simulatePreconnectedPeripheral(preconnectedPeripheral: PreconnectedPeripheral): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

preconnectedPeripheral

</td><td>

[PreconnectedPeripheral](./puppeteer.preconnectedperipheral.md)

</td><td>

The peripheral to simulate.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BluetoothManufacturerData interface

Source: https://pptr.dev/api/puppeteer.bluetoothmanufacturerdata

Represents the simulated bluetooth peripheral's manufacturer data.

### Signature

```typescript
export interface BluetoothManufacturerData
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="data">data</span>

</td><td>

</td><td>

string

</td><td>

The manufacturer-specific data as a base64-encoded string.

</td><td>

</td></tr>
<tr><td>

<span id="key">key</span>

</td><td>

</td><td>

number

</td><td>

The company identifier, as defined by the [Bluetooth SIG](https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/).

</td><td>

</td></tr>
</tbody></table>

# BoundingBox interface

Source: https://pptr.dev/api/puppeteer.boundingbox

### Signature

```typescript
export interface BoundingBox extends Point
```

**Extends:** [Point](./puppeteer.point.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="height">height</span>

</td><td>

</td><td>

number

</td><td>

the height of the element in pixels.

</td><td>

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

</td><td>

number

</td><td>

the width of the element in pixels.

</td><td>

</td></tr>
</tbody></table>

# BoxModel interface

Source: https://pptr.dev/api/puppeteer.boxmodel

### Signature

```typescript
export interface BoxModel
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="border">border</span>

</td><td>

</td><td>

[Quad](./puppeteer.quad.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="content">content</span>

</td><td>

</td><td>

[Quad](./puppeteer.quad.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="height">height</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="margin">margin</span>

</td><td>

</td><td>

[Quad](./puppeteer.quad.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="padding">padding</span>

</td><td>

</td><td>

[Quad](./puppeteer.quad.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Browser.addScreen() method

Source: https://pptr.dev/api/puppeteer.browser.addscreen

Adds a new screen, returns the added [screen information object](./puppeteer.screeninfo.md).

### Signature

```typescript
class Browser {
	abstract addScreen(params: AddScreenParams): Promise<ScreenInfo>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

params

</td><td>

[AddScreenParams](./puppeteer.addscreenparams.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ScreenInfo](./puppeteer.screeninfo.md)&gt;

## Remarks

Only supported in headless mode.

# Browser.browserContexts() method

Source: https://pptr.dev/api/puppeteer.browser.browsercontexts

Gets a list of open [browser contexts](./puppeteer.browsercontext.md).

In a newly-created [browser](./puppeteer.browser.md), this will return a single instance of [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	abstract browserContexts(): BrowserContext[];
}
```

**Returns:**

[BrowserContext](./puppeteer.browsercontext.md)\[\]

# Browser.close() method

Source: https://pptr.dev/api/puppeteer.browser.close

Closes this [browser](./puppeteer.browser.md) and all associated [pages](./puppeteer.page.md).

### Signature

```typescript
class Browser {
	abstract close(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Browser.cookies() method

Source: https://pptr.dev/api/puppeteer.browser.cookies

Returns all cookies in the default [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	cookies(): Promise<Cookie[]>;
}
```

**Returns:**

Promise&lt;[Cookie](./puppeteer.cookie.md)\[\]&gt;

## Remarks

Shortcut for [browser.defaultBrowserContext().cookies()](./puppeteer.browsercontext.cookies.md).

# Browser.createBrowserContext() method

Source: https://pptr.dev/api/puppeteer.browser.createbrowsercontext

Creates a new [browser context](./puppeteer.browsercontext.md).

This won't share cookies/cache with other [browser contexts](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	abstract createBrowserContext(options?: BrowserContextOptions): Promise<BrowserContext>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[BrowserContextOptions](./puppeteer.browsercontextoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[BrowserContext](./puppeteer.browsercontext.md)&gt;

## Example

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
// Create a new browser context.
const context = await browser.createBrowserContext();
// Create a new page in a pristine context.
const page = await context.newPage();
// Do stuff
await page.goto('https://example.com');
```

# Browser.defaultBrowserContext() method

Source: https://pptr.dev/api/puppeteer.browser.defaultbrowsercontext

Gets the default [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	abstract defaultBrowserContext(): BrowserContext;
}
```

**Returns:**

[BrowserContext](./puppeteer.browsercontext.md)

## Remarks

The default [browser context](./puppeteer.browsercontext.md) cannot be closed.

# Browser.deleteCookie() method

Source: https://pptr.dev/api/puppeteer.browser.deletecookie

Removes cookies from the default [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	deleteCookie(...cookies: Cookie[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[Cookie](./puppeteer.cookie.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Shortcut for [browser.defaultBrowserContext().deleteCookie()](./puppeteer.browsercontext.deletecookie.md).

# Browser.deleteMatchingCookies() method

Source: https://pptr.dev/api/puppeteer.browser.deletematchingcookies

Deletes cookies matching the provided filters from the default [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	deleteMatchingCookies(...filters: DeleteCookiesRequest[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

filters

</td><td>

[DeleteCookiesRequest](./puppeteer.deletecookiesrequest.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Shortcut for [browser.defaultBrowserContext().deleteMatchingCookies()](./puppeteer.browsercontext.deletematchingcookies.md).

# Browser.disconnect() method

Source: https://pptr.dev/api/puppeteer.browser.disconnect

Disconnects Puppeteer from this [browser](./puppeteer.browser.md), but leaves the process running.

### Signature

```typescript
class Browser {
	abstract disconnect(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Browser.extensions() method

Source: https://pptr.dev/api/puppeteer.browser.extensions

Retrieves a map of all extensions installed in the browser, where the keys are extension IDs and the values are the corresponding [Extension](./puppeteer.extension.md) instances.

### Signature

```typescript
class Browser {
	abstract extensions(): Promise<Map<string, Extension>>;
}
```

**Returns:**

Promise&lt;Map&lt;string, [Extension](./puppeteer.extension.md)&gt;&gt;

# Browser.getWindowBounds() method

Source: https://pptr.dev/api/puppeteer.browser.getwindowbounds

Gets the specified window [bounds](./puppeteer.windowbounds.md).

### Signature

```typescript
class Browser {
	abstract getWindowBounds(windowId: WindowId): Promise<WindowBounds>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

windowId

</td><td>

[WindowId](./puppeteer.windowid.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[WindowBounds](./puppeteer.windowbounds.md)&gt;

# Browser.installExtension() method

Source: https://pptr.dev/api/puppeteer.browser.installextension

Installs an extension and returns the ID. In Chrome, this is only available if the browser was created using `pipe: true` and the `--enable-unsafe-extension-debugging` flag is set.

### Signature

```typescript
class Browser {
	abstract installExtension(path: string): Promise<string>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

path

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

# Browser.isConnected() method

Source: https://pptr.dev/api/puppeteer.browser.isconnected

> Warning: This API is now obsolete.
>
> Use [Browser.connected](./puppeteer.browser.md).

Whether Puppeteer is connected to this [browser](./puppeteer.browser.md).

### Signature

```typescript
class Browser {
	isConnected(): boolean;
}
```

**Returns:**

boolean

# Browser class

Source: https://pptr.dev/api/puppeteer.browser

[Browser](./puppeteer.browser.md) represents a browser instance that is either:

- connected to via [Puppeteer.connect()](./puppeteer.puppeteer.connect.md) or - launched by [PuppeteerNode.launch()](./puppeteer.puppeteernode.launch.md).

[Browser](./puppeteer.browser.md) [emits](./puppeteer.eventemitter.emit.md) various events which are documented in the [BrowserEvent](./puppeteer.browserevent.md) enum.

### Signature

```typescript
export declare abstract class Browser extends EventEmitter<BrowserEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[BrowserEvents](./puppeteer.browserevents.md)&gt;

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Browser` class.

## Example 1

Using a [Browser](./puppeteer.browser.md) to create a [Page](./puppeteer.page.md):

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
await browser.close();
```

## Example 2

Disconnecting from and reconnecting to a [Browser](./puppeteer.browser.md):

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
// Store the endpoint to be able to reconnect to the browser.
const browserWSEndpoint = browser.wsEndpoint();
// Disconnect puppeteer from the browser.
await browser.disconnect();

// Use the endpoint to reestablish a connection
const browser2 = await puppeteer.connect({ browserWSEndpoint });
// Close the browser.
await browser2.close();
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="connected">connected</span>

</td><td>

`readonly`

</td><td>

boolean

</td><td>

Whether Puppeteer is connected to this [browser](./puppeteer.browser.md).

</td></tr>
<tr><td>

<span id="debuginfo">debugInfo</span>

</td><td>

`readonly`

</td><td>

[DebugInfo](./puppeteer.debuginfo.md)

</td><td>

**_(Experimental)_** Get debug information from Puppeteer.

**Remarks:**

Currently, includes pending protocol calls. In the future, we might add more info.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="addscreen">[addScreen(params)](./puppeteer.browser.addscreen.md)</span>

</td><td>

</td><td>

Adds a new screen, returns the added [screen information object](./puppeteer.screeninfo.md).

**Remarks:**

Only supported in headless mode.

</td></tr>
<tr><td>

<span id="browsercontexts">[browserContexts()](./puppeteer.browser.browsercontexts.md)</span>

</td><td>

</td><td>

Gets a list of open [browser contexts](./puppeteer.browsercontext.md).

In a newly-created [browser](./puppeteer.browser.md), this will return a single instance of [BrowserContext](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="close">[close()](./puppeteer.browser.close.md)</span>

</td><td>

</td><td>

Closes this [browser](./puppeteer.browser.md) and all associated [pages](./puppeteer.page.md).

</td></tr>
<tr><td>

<span id="cookies">[cookies()](./puppeteer.browser.cookies.md)</span>

</td><td>

</td><td>

Returns all cookies in the default [BrowserContext](./puppeteer.browsercontext.md).

**Remarks:**

Shortcut for [browser.defaultBrowserContext().cookies()](./puppeteer.browsercontext.cookies.md).

</td></tr>
<tr><td>

<span id="createbrowsercontext">[createBrowserContext(options)](./puppeteer.browser.createbrowsercontext.md)</span>

</td><td>

</td><td>

Creates a new [browser context](./puppeteer.browsercontext.md).

This won't share cookies/cache with other [browser contexts](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="defaultbrowsercontext">[defaultBrowserContext()](./puppeteer.browser.defaultbrowsercontext.md)</span>

</td><td>

</td><td>

Gets the default [browser context](./puppeteer.browsercontext.md).

**Remarks:**

The default [browser context](./puppeteer.browsercontext.md) cannot be closed.

</td></tr>
<tr><td>

<span id="deletecookie">[deleteCookie(cookies)](./puppeteer.browser.deletecookie.md)</span>

</td><td>

</td><td>

Removes cookies from the default [BrowserContext](./puppeteer.browsercontext.md).

**Remarks:**

Shortcut for [browser.defaultBrowserContext().deleteCookie()](./puppeteer.browsercontext.deletecookie.md).

</td></tr>
<tr><td>

<span id="deletematchingcookies">[deleteMatchingCookies(filters)](./puppeteer.browser.deletematchingcookies.md)</span>

</td><td>

</td><td>

Deletes cookies matching the provided filters from the default [BrowserContext](./puppeteer.browsercontext.md).

**Remarks:**

Shortcut for [browser.defaultBrowserContext().deleteMatchingCookies()](./puppeteer.browsercontext.deletematchingcookies.md).

</td></tr>
<tr><td>

<span id="disconnect">[disconnect()](./puppeteer.browser.disconnect.md)</span>

</td><td>

</td><td>

Disconnects Puppeteer from this [browser](./puppeteer.browser.md), but leaves the process running.

</td></tr>
<tr><td>

<span id="extensions">[extensions()](./puppeteer.browser.extensions.md)</span>

</td><td>

</td><td>

Retrieves a map of all extensions installed in the browser, where the keys are extension IDs and the values are the corresponding [Extension](./puppeteer.extension.md) instances.

</td></tr>
<tr><td>

<span id="getwindowbounds">[getWindowBounds(windowId)](./puppeteer.browser.getwindowbounds.md)</span>

</td><td>

</td><td>

Gets the specified window [bounds](./puppeteer.windowbounds.md).

</td></tr>
<tr><td>

<span id="installextension">[installExtension(path)](./puppeteer.browser.installextension.md)</span>

</td><td>

</td><td>

Installs an extension and returns the ID. In Chrome, this is only available if the browser was created using `pipe: true` and the `--enable-unsafe-extension-debugging` flag is set.

</td></tr>
<tr><td>

<span id="isconnected">[isConnected()](./puppeteer.browser.isconnected.md)</span>

</td><td>

`deprecated`

</td><td>

Whether Puppeteer is connected to this [browser](./puppeteer.browser.md).

**Deprecated:**

Use [Browser.connected](./puppeteer.browser.md).

</td></tr>
<tr><td>

<span id="newpage">[newPage(options)](./puppeteer.browser.newpage.md)</span>

</td><td>

</td><td>

Creates a new [page](./puppeteer.page.md) in the [default browser context](./puppeteer.browser.defaultbrowsercontext.md).

</td></tr>
<tr><td>

<span id="pages">[pages(includeAll)](./puppeteer.browser.pages.md)</span>

</td><td>

</td><td>

Gets a list of all open [pages](./puppeteer.page.md) inside this [Browser](./puppeteer.browser.md).

If there are multiple [browser contexts](./puppeteer.browsercontext.md), this returns all [pages](./puppeteer.page.md) in all [browser contexts](./puppeteer.browsercontext.md).

**Remarks:**

Non-visible [pages](./puppeteer.page.md), such as `"background_page"`, will not be listed here. You can find them using [Target.page()](./puppeteer.target.page.md).

</td></tr>
<tr><td>

<span id="process">[process()](./puppeteer.browser.process.md)</span>

</td><td>

</td><td>

Gets the associated [ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess).

</td></tr>
<tr><td>

<span id="removescreen">[removeScreen(screenId)](./puppeteer.browser.removescreen.md)</span>

</td><td>

</td><td>

Removes a screen.

**Remarks:**

Only supported in headless mode. Fails if the primary screen id is specified.

</td></tr>
<tr><td>

<span id="screens">[screens()](./puppeteer.browser.screens.md)</span>

</td><td>

</td><td>

Gets a list of [screen information objects](./puppeteer.screeninfo.md).

</td></tr>
<tr><td>

<span id="setcookie">[setCookie(cookies)](./puppeteer.browser.setcookie.md)</span>

</td><td>

</td><td>

Sets cookies in the default [BrowserContext](./puppeteer.browsercontext.md).

**Remarks:**

Shortcut for [browser.defaultBrowserContext().setCookie()](./puppeteer.browsercontext.setcookie.md).

</td></tr>
<tr><td>

<span id="setpermission">[setPermission(origin, permissions)](./puppeteer.browser.setpermission.md)</span>

</td><td>

</td><td>

Sets the permission for a specific origin in the default [BrowserContext](./puppeteer.browsercontext.md).

**Remarks:**

Shortcut for [browser.defaultBrowserContext().setPermission()](./puppeteer.browsercontext.setpermission.md).

</td></tr>
<tr><td>

<span id="setwindowbounds">[setWindowBounds(windowId, windowBounds)](./puppeteer.browser.setwindowbounds.md)</span>

</td><td>

</td><td>

Sets the specified window [bounds](./puppeteer.windowbounds.md).

</td></tr>
<tr><td>

<span id="target">[target()](./puppeteer.browser.target.md)</span>

</td><td>

</td><td>

Gets the [target](./puppeteer.target.md) associated with the [default browser context](./puppeteer.browser.defaultbrowsercontext.md)).

</td></tr>
<tr><td>

<span id="targets">[targets()](./puppeteer.browser.targets.md)</span>

</td><td>

</td><td>

Gets all active [targets](./puppeteer.target.md).

In case of multiple [browser contexts](./puppeteer.browsercontext.md), this returns all [targets](./puppeteer.target.md) in all [browser contexts](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="uninstallextension">[uninstallExtension(id)](./puppeteer.browser.uninstallextension.md)</span>

</td><td>

</td><td>

Uninstalls an extension. In Chrome, this is only available if the browser was created using `pipe: true` and the `--enable-unsafe-extension-debugging` flag is set.

</td></tr>
<tr><td>

<span id="useragent">[userAgent()](./puppeteer.browser.useragent.md)</span>

</td><td>

</td><td>

Gets this [browser's](./puppeteer.browser.md) original user agent.

[Pages](./puppeteer.page.md) can override the user agent with [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2).

</td></tr>
<tr><td>

<span id="version">[version()](./puppeteer.browser.version.md)</span>

</td><td>

</td><td>

Gets a string representing this [browser's](./puppeteer.browser.md) name and version.

For headless browser, this is similar to `"HeadlessChrome/61.0.3153.0"`. For non-headless or new-headless, this is similar to `"Chrome/61.0.3153.0"`. For Firefox, it is similar to `"Firefox/116.0a1"`.

The format of [Browser.version()](./puppeteer.browser.version.md) might change with future releases of browsers.

</td></tr>
<tr><td>

<span id="waitfortarget">[waitForTarget(predicate, options)](./puppeteer.browser.waitfortarget.md)</span>

</td><td>

</td><td>

Waits until a [target](./puppeteer.target.md) matching the given `predicate` appears and returns it.

This will look all open [browser contexts](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="wsendpoint">[wsEndpoint()](./puppeteer.browser.wsendpoint.md)</span>

</td><td>

</td><td>

Gets the WebSocket URL to connect to this [browser](./puppeteer.browser.md).

This is usually used with [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

You can find the debugger URL (`webSocketDebuggerUrl`) from `http://HOST:PORT/json/version`.

See [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target) for more information.

**Remarks:**

The format is always `ws://HOST:PORT/devtools/browser/<id>`.

</td></tr>
</tbody></table>

# Browser.newPage() method

Source: https://pptr.dev/api/puppeteer.browser.newpage

Creates a new [page](./puppeteer.page.md) in the [default browser context](./puppeteer.browser.defaultbrowsercontext.md).

### Signature

```typescript
class Browser {
	abstract newPage(options?: CreatePageOptions): Promise<Page>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[CreatePageOptions](./puppeteer.createpageoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)&gt;

# Browser.pages() method

Source: https://pptr.dev/api/puppeteer.browser.pages

Gets a list of all open [pages](./puppeteer.page.md) inside this [Browser](./puppeteer.browser.md).

If there are multiple [browser contexts](./puppeteer.browsercontext.md), this returns all [pages](./puppeteer.page.md) in all [browser contexts](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	pages(includeAll?: boolean): Promise<Page[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

includeAll

</td><td>

boolean

</td><td>

_(Optional)_ experimental, setting to true includes all kinds of pages.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)\[\]&gt;

## Remarks

Non-visible [pages](./puppeteer.page.md), such as `"background_page"`, will not be listed here. You can find them using [Target.page()](./puppeteer.target.page.md).

# Browser.process() method

Source: https://pptr.dev/api/puppeteer.browser.process

Gets the associated [ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess).

### Signature

```typescript
class Browser {
	abstract process(): ChildProcess | null;
}
```

**Returns:**

ChildProcess \| null

`null` if this instance was connected to via [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

# Browser.removeScreen() method

Source: https://pptr.dev/api/puppeteer.browser.removescreen

Removes a screen.

### Signature

```typescript
class Browser {
	abstract removeScreen(screenId: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

screenId

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Only supported in headless mode. Fails if the primary screen id is specified.

# Browser.screens() method

Source: https://pptr.dev/api/puppeteer.browser.screens

Gets a list of [screen information objects](./puppeteer.screeninfo.md).

### Signature

```typescript
class Browser {
	abstract screens(): Promise<ScreenInfo[]>;
}
```

**Returns:**

Promise&lt;[ScreenInfo](./puppeteer.screeninfo.md)\[\]&gt;

# Browser.setCookie() method

Source: https://pptr.dev/api/puppeteer.browser.setcookie

Sets cookies in the default [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	setCookie(...cookies: CookieData[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[CookieData](./puppeteer.cookiedata.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Shortcut for [browser.defaultBrowserContext().setCookie()](./puppeteer.browsercontext.setcookie.md).

# Browser.setPermission() method

Source: https://pptr.dev/api/puppeteer.browser.setpermission

Sets the permission for a specific origin in the default [BrowserContext](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	setPermission(
		origin: string,
		...permissions: Array<{
			permission: PermissionDescriptor;
			state: PermissionState;
		}>
	): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

origin

</td><td>

string

</td><td>

The origin to set the permission for.

</td></tr>
<tr><td>

permissions

</td><td>

Array&lt;&#123; permission: [PermissionDescriptor](./puppeteer.permissiondescriptor_2.md); state: [PermissionState](./puppeteer.permissionstate_2.md); &#125;&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Shortcut for [browser.defaultBrowserContext().setPermission()](./puppeteer.browsercontext.setpermission.md).

# Browser.setWindowBounds() method

Source: https://pptr.dev/api/puppeteer.browser.setwindowbounds

Sets the specified window [bounds](./puppeteer.windowbounds.md).

### Signature

```typescript
class Browser {
	abstract setWindowBounds(windowId: WindowId, windowBounds: WindowBounds): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

windowId

</td><td>

[WindowId](./puppeteer.windowid.md)

</td><td>

</td></tr>
<tr><td>

windowBounds

</td><td>

[WindowBounds](./puppeteer.windowbounds.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Browser.target() method

Source: https://pptr.dev/api/puppeteer.browser.target

Gets the [target](./puppeteer.target.md) associated with the [default browser context](./puppeteer.browser.defaultbrowsercontext.md)).

### Signature

```typescript
class Browser {
	abstract target(): Target;
}
```

**Returns:**

[Target](./puppeteer.target.md)

# Browser.targets() method

Source: https://pptr.dev/api/puppeteer.browser.targets

Gets all active [targets](./puppeteer.target.md).

In case of multiple [browser contexts](./puppeteer.browsercontext.md), this returns all [targets](./puppeteer.target.md) in all [browser contexts](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	abstract targets(): Target[];
}
```

**Returns:**

[Target](./puppeteer.target.md)\[\]

# Browser.uninstallExtension() method

Source: https://pptr.dev/api/puppeteer.browser.uninstallextension

Uninstalls an extension. In Chrome, this is only available if the browser was created using `pipe: true` and the `--enable-unsafe-extension-debugging` flag is set.

### Signature

```typescript
class Browser {
	abstract uninstallExtension(id: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Browser.userAgent() method

Source: https://pptr.dev/api/puppeteer.browser.useragent

Gets this [browser's](./puppeteer.browser.md) original user agent.

[Pages](./puppeteer.page.md) can override the user agent with [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2).

### Signature

```typescript
class Browser {
	abstract userAgent(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

# Browser.version() method

Source: https://pptr.dev/api/puppeteer.browser.version

Gets a string representing this [browser's](./puppeteer.browser.md) name and version.

For headless browser, this is similar to `"HeadlessChrome/61.0.3153.0"`. For non-headless or new-headless, this is similar to `"Chrome/61.0.3153.0"`. For Firefox, it is similar to `"Firefox/116.0a1"`.

The format of [Browser.version()](./puppeteer.browser.version.md) might change with future releases of browsers.

### Signature

```typescript
class Browser {
	abstract version(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

# Browser.waitForTarget() method

Source: https://pptr.dev/api/puppeteer.browser.waitfortarget

Waits until a [target](./puppeteer.target.md) matching the given `predicate` appears and returns it.

This will look all open [browser contexts](./puppeteer.browsercontext.md).

### Signature

```typescript
class Browser {
	waitForTarget(predicate: (x: Target) => boolean | Promise<boolean>, options?: WaitForTargetOptions): Promise<Target>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

predicate

</td><td>

(x: [Target](./puppeteer.target.md)) =&gt; boolean \| Promise&lt;boolean&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

[WaitForTargetOptions](./puppeteer.waitfortargetoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Target](./puppeteer.target.md)&gt;

## Example

Finding a target for a page opened via `window.open`:

```ts
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browser.waitForTarget((target) => target.url() === 'https://www.example.com/');
```

# Browser.wsEndpoint() method

Source: https://pptr.dev/api/puppeteer.browser.wsendpoint

Gets the WebSocket URL to connect to this [browser](./puppeteer.browser.md).

This is usually used with [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

You can find the debugger URL (`webSocketDebuggerUrl`) from `http://HOST:PORT/json/version`.

See [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target) for more information.

### Signature

```typescript
class Browser {
	abstract wsEndpoint(): string;
}
```

**Returns:**

string

## Remarks

The format is always `ws://HOST:PORT/devtools/browser/<id>`.

# BrowserContext.browser() method

Source: https://pptr.dev/api/puppeteer.browsercontext.browser

Gets the [browser](./puppeteer.browser.md) associated with this [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	abstract browser(): Browser;
}
```

**Returns:**

[Browser](./puppeteer.browser.md)

# BrowserContext.clearPermissionOverrides() method

Source: https://pptr.dev/api/puppeteer.browsercontext.clearpermissionoverrides

Clears all permission overrides for this [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	abstract clearPermissionOverrides(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

## Example

Clearing overridden permissions in the [default browser context](./puppeteer.browser.defaultbrowsercontext.md):

```ts
const context = browser.defaultBrowserContext();
context.overridePermissions('https://example.com', ['clipboard-read']);
// do stuff ..
context.clearPermissionOverrides();
```

# BrowserContext.close() method

Source: https://pptr.dev/api/puppeteer.browsercontext.close

Closes this [browser context](./puppeteer.browsercontext.md) and all associated [pages](./puppeteer.page.md).

### Signature

```typescript
class BrowserContext {
	abstract close(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

## Remarks

The [default browser context](./puppeteer.browser.defaultbrowsercontext.md) cannot be closed.

# BrowserContext.cookies() method

Source: https://pptr.dev/api/puppeteer.browsercontext.cookies

Gets all cookies in the browser context.

### Signature

```typescript
class BrowserContext {
	abstract cookies(): Promise<Cookie[]>;
}
```

**Returns:**

Promise&lt;[Cookie](./puppeteer.cookie.md)\[\]&gt;

# BrowserContext.deleteCookie() method

Source: https://pptr.dev/api/puppeteer.browsercontext.deletecookie

Removes cookie in this browser context.

### Signature

```typescript
class BrowserContext {
	deleteCookie(...cookies: Cookie[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[Cookie](./puppeteer.cookie.md)\[\]

</td><td>

Complete [cookie](./puppeteer.cookie.md) object to be removed.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BrowserContext.deleteMatchingCookies() method

Source: https://pptr.dev/api/puppeteer.browsercontext.deletematchingcookies

Deletes cookies matching the provided filters in this browser context.

### Signature

```typescript
class BrowserContext {
	deleteMatchingCookies(...filters: DeleteCookiesRequest[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

filters

</td><td>

[DeleteCookiesRequest](./puppeteer.deletecookiesrequest.md)\[\]

</td><td>

[DeleteCookiesRequest](./puppeteer.deletecookiesrequest.md)

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BrowserContext class

Source: https://pptr.dev/api/puppeteer.browsercontext

[BrowserContext](./puppeteer.browsercontext.md) represents individual user contexts within a [browser](./puppeteer.browser.md).

When a [browser](./puppeteer.browser.md) is launched, it has at least one default [browser context](./puppeteer.browsercontext.md). Others can be created using [Browser.createBrowserContext()](./puppeteer.browser.createbrowsercontext.md). Each context has isolated storage (cookies/localStorage/etc.)

[BrowserContext](./puppeteer.browsercontext.md) [emits](./puppeteer.eventemitter.md) various events which are documented in the [BrowserContextEvent](./puppeteer.browsercontextevent.md) enum.

If a [page](./puppeteer.page.md) opens another [page](./puppeteer.page.md), e.g. using `window.open`, the popup will belong to the parent [page's browser context](./puppeteer.page.browsercontext.md).

### Signature

```typescript
export declare abstract class BrowserContext extends EventEmitter<BrowserContextEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[BrowserContextEvents](./puppeteer.browsercontextevents.md)&gt;

## Remarks

In Chrome all non-default contexts are incognito, and [default browser context](./puppeteer.browser.defaultbrowsercontext.md) might be incognito if you provide the `--incognito` argument when launching the browser.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `BrowserContext` class.

## Example

Creating a new [browser context](./puppeteer.browsercontext.md):

```ts
// Create a new browser context
const context = await browser.createBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="closed">closed</span>

</td><td>

`readonly`

</td><td>

boolean

</td><td>

Whether this [browser context](./puppeteer.browsercontext.md) is closed.

</td></tr>
<tr><td>

<span id="id">id</span>

</td><td>

`readonly`

</td><td>

string \| undefined

</td><td>

Identifier for this [browser context](./puppeteer.browsercontext.md).

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="browser">[browser()](./puppeteer.browsercontext.browser.md)</span>

</td><td>

</td><td>

Gets the [browser](./puppeteer.browser.md) associated with this [browser context](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="clearpermissionoverrides">[clearPermissionOverrides()](./puppeteer.browsercontext.clearpermissionoverrides.md)</span>

</td><td>

</td><td>

Clears all permission overrides for this [browser context](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="close">[close()](./puppeteer.browsercontext.close.md)</span>

</td><td>

</td><td>

Closes this [browser context](./puppeteer.browsercontext.md) and all associated [pages](./puppeteer.page.md).

**Remarks:**

The [default browser context](./puppeteer.browser.defaultbrowsercontext.md) cannot be closed.

</td></tr>
<tr><td>

<span id="cookies">[cookies()](./puppeteer.browsercontext.cookies.md)</span>

</td><td>

</td><td>

Gets all cookies in the browser context.

</td></tr>
<tr><td>

<span id="deletecookie">[deleteCookie(cookies)](./puppeteer.browsercontext.deletecookie.md)</span>

</td><td>

</td><td>

Removes cookie in this browser context.

</td></tr>
<tr><td>

<span id="deletematchingcookies">[deleteMatchingCookies(filters)](./puppeteer.browsercontext.deletematchingcookies.md)</span>

</td><td>

</td><td>

Deletes cookies matching the provided filters in this browser context.

</td></tr>
<tr><td>

<span id="newpage">[newPage(options)](./puppeteer.browsercontext.newpage.md)</span>

</td><td>

</td><td>

Creates a new [page](./puppeteer.page.md) in this [browser context](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="overridepermissions">[overridePermissions(origin, permissions)](./puppeteer.browsercontext.overridepermissions.md)</span>

</td><td>

`deprecated`

</td><td>

Grants this [browser context](./puppeteer.browsercontext.md) the given `permissions` within the given `origin`.

**Deprecated:**

in favor of [BrowserContext.setPermission()](./puppeteer.browsercontext.setpermission.md).

</td></tr>
<tr><td>

<span id="pages">[pages(includeAll)](./puppeteer.browsercontext.pages.md)</span>

</td><td>

</td><td>

Gets a list of all open [pages](./puppeteer.page.md) inside this [browser context](./puppeteer.browsercontext.md).

**Remarks:**

Non-visible [pages](./puppeteer.page.md), such as `"background_page"`, will not be listed here. You can find them using [Target.page()](./puppeteer.target.page.md).

</td></tr>
<tr><td>

<span id="setcookie">[setCookie(cookies)](./puppeteer.browsercontext.setcookie.md)</span>

</td><td>

</td><td>

Sets a cookie in the browser context.

</td></tr>
<tr><td>

<span id="setpermission">[setPermission(origin, permissions)](./puppeteer.browsercontext.setpermission.md)</span>

</td><td>

</td><td>

Sets the permission for a specific origin.

</td></tr>
<tr><td>

<span id="targets">[targets()](./puppeteer.browsercontext.targets.md)</span>

</td><td>

</td><td>

Gets all active [targets](./puppeteer.target.md) inside this [browser context](./puppeteer.browsercontext.md).

</td></tr>
<tr><td>

<span id="waitfortarget">[waitForTarget(predicate, options)](./puppeteer.browsercontext.waitfortarget.md)</span>

</td><td>

</td><td>

Waits until a [target](./puppeteer.target.md) matching the given `predicate` appears and returns it.

This will look all open [browser contexts](./puppeteer.browsercontext.md).

</td></tr>
</tbody></table>

# BrowserContext.newPage() method

Source: https://pptr.dev/api/puppeteer.browsercontext.newpage

Creates a new [page](./puppeteer.page.md) in this [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	abstract newPage(options?: CreatePageOptions): Promise<Page>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[CreatePageOptions](./puppeteer.createpageoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)&gt;

# BrowserContext.overridePermissions() method

Source: https://pptr.dev/api/puppeteer.browsercontext.overridepermissions

> Warning: This API is now obsolete.
>
> in favor of [BrowserContext.setPermission()](./puppeteer.browsercontext.setpermission.md).

Grants this [browser context](./puppeteer.browsercontext.md) the given `permissions` within the given `origin`.

### Signature

```typescript
class BrowserContext {
	abstract overridePermissions(origin: string, permissions: Permission[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

origin

</td><td>

string

</td><td>

The origin to grant permissions to, e.g. "https://example.com".

</td></tr>
<tr><td>

permissions

</td><td>

[Permission](./puppeteer.permission.md)\[\]

</td><td>

An array of permissions to grant. All permissions that are not listed here will be automatically denied.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

Overriding permissions in the [default browser context](./puppeteer.browser.defaultbrowsercontext.md):

```ts
const context = browser.defaultBrowserContext();
await context.overridePermissions('https://html5demos.com', ['geolocation']);
```

# BrowserContext.pages() method

Source: https://pptr.dev/api/puppeteer.browsercontext.pages

Gets a list of all open [pages](./puppeteer.page.md) inside this [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	abstract pages(includeAll?: boolean): Promise<Page[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

includeAll

</td><td>

boolean

</td><td>

_(Optional)_ experimental, setting to true includes all kinds of pages.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)\[\]&gt;

## Remarks

Non-visible [pages](./puppeteer.page.md), such as `"background_page"`, will not be listed here. You can find them using [Target.page()](./puppeteer.target.page.md).

# BrowserContext.setCookie() method

Source: https://pptr.dev/api/puppeteer.browsercontext.setcookie

Sets a cookie in the browser context.

### Signature

```typescript
class BrowserContext {
	abstract setCookie(...cookies: CookieData[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[CookieData](./puppeteer.cookiedata.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BrowserContext.setPermission() method

Source: https://pptr.dev/api/puppeteer.browsercontext.setpermission

Sets the permission for a specific origin.

### Signature

```typescript
class BrowserContext {
	abstract setPermission(
		origin: string | '*',
		...permissions: Array<{
			permission: PermissionDescriptor;
			state: PermissionState;
		}>
	): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

origin

</td><td>

string \| '\*'

</td><td>

The origin to set the permission for.

</td></tr>
<tr><td>

permissions

</td><td>

Array&lt;&#123; permission: [PermissionDescriptor](./puppeteer.permissiondescriptor_2.md); state: [PermissionState](./puppeteer.permissionstate_2.md); &#125;&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# BrowserContext.targets() method

Source: https://pptr.dev/api/puppeteer.browsercontext.targets

Gets all active [targets](./puppeteer.target.md) inside this [browser context](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	abstract targets(): Target[];
}
```

**Returns:**

[Target](./puppeteer.target.md)\[\]

# BrowserContext.waitForTarget() method

Source: https://pptr.dev/api/puppeteer.browsercontext.waitfortarget

Waits until a [target](./puppeteer.target.md) matching the given `predicate` appears and returns it.

This will look all open [browser contexts](./puppeteer.browsercontext.md).

### Signature

```typescript
class BrowserContext {
	waitForTarget(predicate: (x: Target) => boolean | Promise<boolean>, options?: WaitForTargetOptions): Promise<Target>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

predicate

</td><td>

(x: [Target](./puppeteer.target.md)) =&gt; boolean \| Promise&lt;boolean&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

[WaitForTargetOptions](./puppeteer.waitfortargetoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Target](./puppeteer.target.md)&gt;

## Example

Finding a target for a page opened via `window.open`:

```ts
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browserContext.waitForTarget((target) => target.url() === 'https://www.example.com/');
```

# BrowserContextEvent enum

Source: https://pptr.dev/api/puppeteer.browsercontextevent

### Signature

```typescript
export declare const enum BrowserContextEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

TargetChanged

</td><td>

`"targetchanged"`

</td><td>

Emitted when the url of a target inside the browser context changes. Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
<tr><td>

TargetCreated

</td><td>

`"targetcreated"`

</td><td>

Emitted when a target is created within the browser context, for example when a new page is opened by [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or by [browserContext.newPage](./puppeteer.browsercontext.newpage.md)

Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
<tr><td>

TargetDestroyed

</td><td>

`"targetdestroyed"`

</td><td>

Emitted when a target is destroyed within the browser context, for example when a page is closed. Contains a [Target](./puppeteer.target.md) instance.

</td></tr>
</tbody></table>

# BrowserContextEvents interface

Source: https://pptr.dev/api/puppeteer.browsercontextevents

### Signature

```typescript
export interface BrowserContextEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="targetchanged">targetchanged</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="targetcreated">targetcreated</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="targetdestroyed">targetdestroyed</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# BrowserContextOptions interface

Source: https://pptr.dev/api/puppeteer.browsercontextoptions

### Signature

```typescript
export interface BrowserContextOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="downloadbehavior">downloadBehavior</span>

</td><td>

`optional`

</td><td>

[DownloadBehavior](./puppeteer.downloadbehavior.md)

</td><td>

Behavior definition for when downloading a file.

**Remarks:**

If not set, the default behavior will be used.

</td><td>

</td></tr>
<tr><td>

<span id="proxybypasslist">proxyBypassList</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

Bypass the proxy for the given list of hosts.

</td><td>

</td></tr>
<tr><td>

<span id="proxyserver">proxyServer</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Proxy server with optional port to use for all requests. Username and password can be set in `Page.authenticate`.

</td><td>

</td></tr>
</tbody></table>

# BrowserEvent enum

Source: https://pptr.dev/api/puppeteer.browserevent

All the events a [browser instance](./puppeteer.browser.md) may emit.

### Signature

```typescript
export declare const enum BrowserEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Disconnected

</td><td>

`"disconnected"`

</td><td>

Emitted when Puppeteer gets disconnected from the browser instance. This might happen because either:

- The browser closes/crashes or - [Browser.disconnect()](./puppeteer.browser.disconnect.md) was called.

</td></tr>
<tr><td>

TargetChanged

</td><td>

`"targetchanged"`

</td><td>

Emitted when the URL of a target changes. Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target changes in all browser contexts.

</td></tr>
<tr><td>

TargetCreated

</td><td>

`"targetcreated"`

</td><td>

Emitted when a target is created, for example when a new page is opened by [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or by [browser.newPage](./puppeteer.browser.newpage.md)

Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target creations in all browser contexts.

</td></tr>
<tr><td>

TargetDestroyed

</td><td>

`"targetdestroyed"`

</td><td>

Emitted when a target is destroyed, for example when a page is closed. Contains a [Target](./puppeteer.target.md) instance.

**Remarks:**

Note that this includes target destructions in all browser contexts.

</td></tr>
</tbody></table>

# BrowserEvents interface

Source: https://pptr.dev/api/puppeteer.browserevents

### Signature

```typescript
export interface BrowserEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="disconnected">disconnected</span>

</td><td>

</td><td>

undefined

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="targetchanged">targetchanged</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="targetcreated">targetcreated</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="targetdestroyed">targetdestroyed</span>

</td><td>

</td><td>

[Target](./puppeteer.target.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# BrowserLauncher.defaultArgs() method

Source: https://pptr.dev/api/puppeteer.browserlauncher.defaultargs

### Signature

```typescript
class BrowserLauncher {
	abstract defaultArgs(object: LaunchOptions): string[];
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

object

</td><td>

[LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string\[\]

# BrowserLauncher.executablePath() method

Source: https://pptr.dev/api/puppeteer.browserlauncher.executablepath

### Signature

```typescript
class BrowserLauncher {
	abstract executablePath(channel?: ChromeReleaseChannel, validatePath?: boolean): string;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

channel

</td><td>

[ChromeReleaseChannel](./puppeteer.chromereleasechannel.md)

</td><td>

_(Optional)_

</td></tr>
<tr><td>

validatePath

</td><td>

boolean

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

string

# BrowserLauncher.launch() method

Source: https://pptr.dev/api/puppeteer.browserlauncher.launch

### Signature

```typescript
class BrowserLauncher {
	launch(options?: LaunchOptions): Promise<Browser>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Browser](./puppeteer.browser.md)&gt;

# BrowserLauncher class

Source: https://pptr.dev/api/puppeteer.browserlauncher

Describes a launcher - a class that is able to create and launch a browser instance.

### Signature

```typescript
export declare abstract class BrowserLauncher
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `BrowserLauncher` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

`readonly`

</td><td>

[SupportedBrowser](./puppeteer.supportedbrowser.md)

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="defaultargs">[defaultArgs(object)](./puppeteer.browserlauncher.defaultargs.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="executablepath">[executablePath(channel, validatePath)](./puppeteer.browserlauncher.executablepath.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="launch">[launch(options)](./puppeteer.browserlauncher.launch.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CDPEvents type

Source: https://pptr.dev/api/puppeteer.cdpevents

### Signature

```typescript
export type CDPEvents = {
	[Property in keyof ProtocolMapping.Events]: ProtocolMapping.Events[Property][0];
};
```

# CDPSession.connection() method

Source: https://pptr.dev/api/puppeteer.cdpsession.connection

The underlying connection for this session, if any.

### Signature

```typescript
class CDPSession {
	abstract connection(): Connection | undefined;
}
```

**Returns:**

[Connection](./puppeteer.connection.md) \| undefined

# CDPSession.detach() method

Source: https://pptr.dev/api/puppeteer.cdpsession.detach

Detaches the cdpSession from the target. Once detached, the cdpSession object won't emit any events and can't be used to send messages.

### Signature

```typescript
class CDPSession {
	abstract detach(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# CDPSession.id() method

Source: https://pptr.dev/api/puppeteer.cdpsession.id

Returns the session's id.

### Signature

```typescript
class CDPSession {
	abstract id(): string;
}
```

**Returns:**

string

# CDPSession class

Source: https://pptr.dev/api/puppeteer.cdpsession

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol.

### Signature

```typescript
export declare abstract class CDPSession extends EventEmitter<CDPSessionEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[CDPSessionEvents](./puppeteer.cdpsessionevents.md)&gt;

## Remarks

Protocol methods can be called with [CDPSession.send()](./puppeteer.cdpsession.send.md) method and protocol events can be subscribed to with `CDPSession.on` method.

Useful links: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) and [Getting Started with DevTools Protocol](https://github.com/aslushnikov/getting-started-with-cdp/blob/HEAD/README.md).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `CDPSession` class.

## Example

```ts
const client = await page.createCDPSession();
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
	playbackRate: response.playbackRate / 2,
});
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="detached">detached</span>

</td><td>

`readonly`

</td><td>

boolean

</td><td>

True if the session has been detached, false otherwise.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="connection">[connection()](./puppeteer.cdpsession.connection.md)</span>

</td><td>

</td><td>

The underlying connection for this session, if any.

</td></tr>
<tr><td>

<span id="detach">[detach()](./puppeteer.cdpsession.detach.md)</span>

</td><td>

</td><td>

Detaches the cdpSession from the target. Once detached, the cdpSession object won't emit any events and can't be used to send messages.

</td></tr>
<tr><td>

<span id="id">[id()](./puppeteer.cdpsession.id.md)</span>

</td><td>

</td><td>

Returns the session's id.

</td></tr>
<tr><td>

<span id="send">[send(method, params, options)](./puppeteer.cdpsession.send.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CDPSession.send() method

Source: https://pptr.dev/api/puppeteer.cdpsession.send

### Signature

```typescript
class CDPSession {
	abstract send<T extends keyof ProtocolMapping.Commands>(method: T, params?: ProtocolMapping.Commands[T]['paramsType'][0], options?: CommandOptions): Promise<ProtocolMapping.Commands[T]['returnType']>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

method

</td><td>

T

</td><td>

</td></tr>
<tr><td>

params

</td><td>

ProtocolMapping.Commands\[T\]\['paramsType'\]\[0\]

</td><td>

_(Optional)_

</td></tr>
<tr><td>

options

</td><td>

[CommandOptions](./puppeteer.commandoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;ProtocolMapping.Commands\[T\]\['returnType'\]&gt;

# CDPSessionEvent namespace

Source: https://pptr.dev/api/puppeteer.cdpsessionevent

Events that the CDPSession class emits.

### Signature

```typescript
export declare namespace CDPSessionEvent
```

## Variables

<table><thead><tr><th>

Variable

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="sessionattached">[SessionAttached](./puppeteer.cdpsessionevent.sessionattached.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="sessiondetached">[SessionDetached](./puppeteer.cdpsessionevent.sessiondetached.md)</span>

</td><td>

</td></tr>
</tbody></table>

# CDPSessionEvent.SessionAttached variable

Source: https://pptr.dev/api/puppeteer.cdpsessionevent.sessionattached

### Signature

```typescript
SessionAttached: 'sessionattached';
```

# CDPSessionEvent.SessionDetached variable

Source: https://pptr.dev/api/puppeteer.cdpsessionevent.sessiondetached

### Signature

```typescript
SessionDetached: 'sessiondetached';
```

# CDPSessionEvents interface

Source: https://pptr.dev/api/puppeteer.cdpsessionevents

### Signature

```typescript
export interface CDPSessionEvents extends CDPEvents, Record<EventType, unknown>
```

**Extends:** [CDPEvents](./puppeteer.cdpevents.md), Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="sessionattached">sessionattached</span>

</td><td>

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="sessiondetached">sessiondetached</span>

</td><td>

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ChromeHeadlessShellSettings interface

Source: https://pptr.dev/api/puppeteer.chromeheadlessshellsettings

### Signature

```typescript
export interface ChromeHeadlessShellSettings
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="downloadbaseurl">downloadBaseUrl</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies the URL prefix that is used to download the browser.

Can be overridden by `PUPPETEER_CHROME_HEADLESS_SHELL_DOWNLOAD_BASE_URL`.

**Remarks:**

This must include the protocol and may even need a path prefix. This must **not** include a trailing slash similar to the default.

</td><td>

https://storage.googleapis.com/chrome-for-testing-public

</td></tr>
<tr><td>

<span id="skipdownload">skipDownload</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Tells Puppeteer to not download the browser during installation.

Can be overridden by `PUPPETEER_CHROME_HEADLESS_SHELL_SKIP_DOWNLOAD` or `PUPPETEER_SKIP_CHROME_HEADLESS_SHELL_DOWNLOAD`.

</td><td>

false

</td></tr>
<tr><td>

<span id="version">version</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies a certain version of the browser you'd like Puppeteer to use.

Can be overridden by `PUPPETEER_CHROME_HEADLESS_SHELL_VERSION`.

See [puppeteer.launch](./puppeteer.puppeteernode.launch.md) on how executable path is inferred.

</td><td>

The pinned browser version supported by the current Puppeteer version.

</td></tr>
</tbody></table>

# ChromeReleaseChannel type

Source: https://pptr.dev/api/puppeteer.chromereleasechannel

### Signature

```typescript
export type ChromeReleaseChannel = 'chrome' | 'chrome-beta' | 'chrome-canary' | 'chrome-dev';
```

# ChromeSettings interface

Source: https://pptr.dev/api/puppeteer.chromesettings

### Signature

```typescript
export interface ChromeSettings
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="downloadbaseurl">downloadBaseUrl</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies the URL prefix that is used to download the browser.

Can be overridden by `PUPPETEER_CHROME_DOWNLOAD_BASE_URL`.

**Remarks:**

This must include the protocol and may even need a path prefix. This must **not** include a trailing slash similar to the default.

</td><td>

https://storage.googleapis.com/chrome-for-testing-public

</td></tr>
<tr><td>

<span id="skipdownload">skipDownload</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Tells Puppeteer to not download the browser during installation.

Can be overridden by `PUPPETEER_CHROME_SKIP_DOWNLOAD`.

</td><td>

false

</td></tr>
<tr><td>

<span id="version">version</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies a certain version of the browser you'd like Puppeteer to use.

Can be overridden by `PUPPETEER_CHROME_VERSION` or `PUPPETEER_SKIP_CHROME_DOWNLOAD`.

See [puppeteer.launch](./puppeteer.puppeteernode.launch.md) on how executable path is inferred.

</td><td>

The pinned browser version supported by the current Puppeteer version.

</td></tr>
</tbody></table>

# ClickOptions interface

Source: https://pptr.dev/api/puppeteer.clickoptions

### Signature

```typescript
export interface ClickOptions extends MouseClickOptions
```

**Extends:** [MouseClickOptions](./puppeteer.mouseclickoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="debughighlight">debugHighlight</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

**_(Experimental)_** An experimental debugging feature. If true, inserts an element into the page to highlight the click location for 10 seconds. Might not work on all pages and does not persist across navigations.

</td><td>

</td></tr>
<tr><td>

<span id="offset">offset</span>

</td><td>

`optional`

</td><td>

[Offset](./puppeteer.offset.md)

</td><td>

Offset for the clickable point relative to the top-left corner of the border box.

</td><td>

</td></tr>
</tbody></table>

# CommandOptions interface

Source: https://pptr.dev/api/puppeteer.commandoptions

### Signature

```typescript
export interface CommandOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="timeout">timeout</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CommonEventEmitter.emit() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.emit

### Signature

```typescript
interface CommonEventEmitter {
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): boolean;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

</td></tr>
<tr><td>

event

</td><td>

Events\[Key\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

boolean

# CommonEventEmitter.listenerCount() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.listenercount

### Signature

```typescript
interface CommonEventEmitter {
	listenerCount(event: keyof Events): number;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

event

</td><td>

keyof Events

</td><td>

</td></tr>
</tbody></table>

**Returns:**

number

# CommonEventEmitter interface

Source: https://pptr.dev/api/puppeteer.commoneventemitter

### Signature

```typescript
export interface CommonEventEmitter<Events extends Record<EventType, unknown>>
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="emit">[emit(type, event)](./puppeteer.commoneventemitter.emit.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="listenercount">[listenerCount(event)](./puppeteer.commoneventemitter.listenercount.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="off">[off(type, handler)](./puppeteer.commoneventemitter.off.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="on">[on(type, handler)](./puppeteer.commoneventemitter.on.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="once">[once(type, handler)](./puppeteer.commoneventemitter.once.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="removealllisteners">[removeAllListeners(event)](./puppeteer.commoneventemitter.removealllisteners.md)</span>

</td><td>

</td></tr>
</tbody></table>

# CommonEventEmitter.off() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.off

### Signature

```typescript
interface CommonEventEmitter {
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;Events\[Key\]&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

this

# CommonEventEmitter.on() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.on

### Signature

```typescript
interface CommonEventEmitter {
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;Events\[Key\]&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

this

# CommonEventEmitter.once() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.once

### Signature

```typescript
interface CommonEventEmitter {
	once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;Events\[Key\]&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

this

# CommonEventEmitter.removeAllListeners() method

Source: https://pptr.dev/api/puppeteer.commoneventemitter.removealllisteners

### Signature

```typescript
interface CommonEventEmitter {
	removeAllListeners(event?: keyof Events): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

event

</td><td>

keyof Events

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

this

# Configuration interface

Source: https://pptr.dev/api/puppeteer.configuration

Defines options to configure Puppeteer's behavior during installation and runtime.

See individual properties for more information.

### Signature

```typescript
export interface Configuration
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="_chrome-headless-shell_">"chrome-headless-shell"</span>

</td><td>

`optional`

</td><td>

[ChromeHeadlessShellSettings](./puppeteer.chromeheadlessshellsettings.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="cachedirectory">cacheDirectory</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Defines the directory to be used by Puppeteer for caching.

Can be overridden by `PUPPETEER_CACHE_DIR`.

</td><td>

`path.join(os.homedir(), '.cache', 'puppeteer')`

</td></tr>
<tr><td>

<span id="chrome">chrome</span>

</td><td>

`optional`

</td><td>

[ChromeSettings](./puppeteer.chromesettings.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="defaultbrowser">defaultBrowser</span>

</td><td>

`optional`

</td><td>

[SupportedBrowser](./puppeteer.supportedbrowser.md)

</td><td>

Specifies which browser you'd like Puppeteer to use.

Can be overridden by `PUPPETEER_BROWSER`.

</td><td>

`chrome`

</td></tr>
<tr><td>

<span id="executablepath">executablePath</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies an executable path to be used in [puppeteer.launch](./puppeteer.puppeteernode.launch.md).

Can be overridden by `PUPPETEER_EXECUTABLE_PATH`.

</td><td>

**Auto-computed.**

</td></tr>
<tr><td>

<span id="experiments">experiments</span>

</td><td>

`optional`

</td><td>

[ExperimentsConfiguration](./puppeteer.experimentsconfiguration.md)

</td><td>

Defines experimental options for Puppeteer.

</td><td>

</td></tr>
<tr><td>

<span id="firefox">firefox</span>

</td><td>

`optional`

</td><td>

[FirefoxSettings](./puppeteer.firefoxsettings.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="loglevel">logLevel</span>

</td><td>

`optional`

</td><td>

'silent' \| 'error' \| 'warn'

</td><td>

Tells Puppeteer to log at the given level.

</td><td>

`warn`

</td></tr>
<tr><td>

<span id="skipdownload">skipDownload</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Tells Puppeteer to not download during installation.

Can be overridden by `PUPPETEER_SKIP_DOWNLOAD`.

</td><td>

</td></tr>
<tr><td>

<span id="temporarydirectory">temporaryDirectory</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Defines the directory to be used by Puppeteer for creating temporary files.

Can be overridden by `PUPPETEER_TMP_DIR`.

</td><td>

`os.tmpdir()`

</td></tr>
</tbody></table>

# connect() function

Source: https://pptr.dev/api/puppeteer.connect

### Signature

```typescript
connect: (options: PuppeteerCore.ConnectOptions) => Promise<PuppeteerCore.Browser>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[PuppeteerCore.ConnectOptions](./puppeteer.connectoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[PuppeteerCore.Browser](./puppeteer.browser.md)&gt;

# Connection.(constructor)

Source: https://pptr.dev/api/puppeteer.connection._constructor_

Constructs a new instance of the `Connection` class

### Signature

```typescript
class Connection {
	constructor(url: string, transport: ConnectionTransport, delay?: number, timeout?: number, rawErrors?: boolean, idGenerator?: () => number);
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

url

</td><td>

string

</td><td>

</td></tr>
<tr><td>

transport

</td><td>

[ConnectionTransport](./puppeteer.connectiontransport.md)

</td><td>

</td></tr>
<tr><td>

delay

</td><td>

number

</td><td>

_(Optional)_

</td></tr>
<tr><td>

timeout

</td><td>

number

</td><td>

_(Optional)_

</td></tr>
<tr><td>

rawErrors

</td><td>

boolean

</td><td>

_(Optional)_

</td></tr>
<tr><td>

idGenerator

</td><td>

() =&gt; number

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

# Connection.createSession() method

Source: https://pptr.dev/api/puppeteer.connection.createsession

### Signature

```typescript
class Connection {
	createSession(targetInfo: Protocol.Target.TargetInfo): Promise<CDPSession>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

targetInfo

</td><td>

Protocol.Target.TargetInfo

</td><td>

The target info

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[CDPSession](./puppeteer.cdpsession.md)&gt;

The CDP session that is created

# Connection.dispose() method

Source: https://pptr.dev/api/puppeteer.connection.dispose

### Signature

```typescript
class Connection {
	dispose(): void;
}
```

**Returns:**

void

# Connection.fromSession() method

Source: https://pptr.dev/api/puppeteer.connection.fromsession

### Signature

```typescript
class Connection {
	static fromSession(session: CDPSession): Connection | undefined;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

session

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Connection](./puppeteer.connection.md) \| undefined

# Connection class

Source: https://pptr.dev/api/puppeteer.connection

### Signature

```typescript
export declare class Connection extends EventEmitter<CDPSessionEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[CDPSessionEvents](./puppeteer.cdpsessionevents.md)&gt;

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_constructor_">[(constructor)(url, transport, delay, timeout, rawErrors, idGenerator)](./puppeteer.connection._constructor_.md)</span>

</td><td>

</td><td>

Constructs a new instance of the `Connection` class

</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="timeout">timeout</span>

</td><td>

`readonly`

</td><td>

number

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="createsession">[createSession(targetInfo)](./puppeteer.connection.createsession.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="dispose">[dispose()](./puppeteer.connection.dispose.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="fromsession">[fromSession(session)](./puppeteer.connection.fromsession.md)</span>

</td><td>

`static`

</td><td>

</td></tr>
<tr><td>

<span id="send">[send(method, params, options)](./puppeteer.connection.send.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="session">[session(sessionId)](./puppeteer.connection.session.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.connection.url.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Connection.send() method

Source: https://pptr.dev/api/puppeteer.connection.send

### Signature

```typescript
class Connection {
	send<T extends keyof ProtocolMapping.Commands>(method: T, params?: ProtocolMapping.Commands[T]['paramsType'][0], options?: CommandOptions): Promise<ProtocolMapping.Commands[T]['returnType']>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

method

</td><td>

T

</td><td>

</td></tr>
<tr><td>

params

</td><td>

ProtocolMapping.Commands\[T\]\['paramsType'\]\[0\]

</td><td>

_(Optional)_

</td></tr>
<tr><td>

options

</td><td>

[CommandOptions](./puppeteer.commandoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;ProtocolMapping.Commands\[T\]\['returnType'\]&gt;

# Connection.session() method

Source: https://pptr.dev/api/puppeteer.connection.session

### Signature

```typescript
class Connection {
	session(sessionId: string): CDPSession | null;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

sessionId

</td><td>

string

</td><td>

The session id

</td></tr>
</tbody></table>

**Returns:**

[CDPSession](./puppeteer.cdpsession.md) \| null

The current CDP session if it exists

# Connection.url() method

Source: https://pptr.dev/api/puppeteer.connection.url

### Signature

```typescript
class Connection {
	url(): string;
}
```

**Returns:**

string

# ConnectionClosedError class

Source: https://pptr.dev/api/puppeteer.connectionclosederror

Thrown if underlying protocol connection has been closed.

### Signature

```typescript
export declare class ConnectionClosedError extends ProtocolError
```

**Extends:** [ProtocolError](./puppeteer.protocolerror.md)

# ConnectionTransport.close() method

Source: https://pptr.dev/api/puppeteer.connectiontransport.close

### Signature

```typescript
interface ConnectionTransport {
	close(): void;
}
```

**Returns:**

void

# ConnectionTransport interface

Source: https://pptr.dev/api/puppeteer.connectiontransport

### Signature

```typescript
export interface ConnectionTransport
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="onclose">onclose</span>

</td><td>

`optional`

</td><td>

() =&gt; void

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="onmessage">onmessage</span>

</td><td>

`optional`

</td><td>

(message: string) =&gt; void

</td><td>

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="close">[close()](./puppeteer.connectiontransport.close.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="send">[send(message)](./puppeteer.connectiontransport.send.md)</span>

</td><td>

</td></tr>
</tbody></table>

# ConnectionTransport.send() method

Source: https://pptr.dev/api/puppeteer.connectiontransport.send

### Signature

```typescript
interface ConnectionTransport {
	send(message: string): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

message

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

void

# ConnectOptions interface

Source: https://pptr.dev/api/puppeteer.connectoptions

Generic browser options that can be passed when launching any browser or when connecting to an existing browser instance.

### Signature

```typescript
export interface ConnectOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="acceptinsecurecerts">acceptInsecureCerts</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to ignore HTTPS errors during navigation.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="allowlist">allowlist</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

**_(Experimental)_** A list of URL patterns to allow.

**Requires Chrome 149+.**

This option allows you to restrict the browser from accessing any URLs except for those that match the patterns in the allowList. It uses the standard \[URLPattern\](https://urlpattern.spec.whatwg.org/) API to match URLs.

When connecting to an existing browser, Puppeteer will silently detach from any already open targets that violate the patterns.

For any network requests made by the browser (including navigations and subresources like images or scripts), the request will fail with an error if the URL does not match any pattern in the allowlist.

**Remarks:**

Currently only supported for CDP connections.

Inner `<iframe>` content loading is currently not blocked.

Cannot be used along with [ConnectOptions.blocklist](./puppeteer.connectoptions.md#blocklist).

</td><td>

</td></tr>
<tr><td>

<span id="blocklist">blocklist</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

**_(Experimental)_** A list of URL patterns to block.

This option allows you to restrict the browser from accessing specific URLs or origins. It uses the standard \[URLPattern\](https://urlpattern.spec.whatwg.org/) API to match URLs.

When connecting to an existing browser, Puppeteer will silently detach from any already open targets that violate the patterns.

For any network requests made by the browser (including navigations and subresources like images or scripts), the request will fail with an error if the URL matches a blocked pattern.

**Remarks:**

Currently only supported for CDP connections.

Inner `<iframe>` content loading is currently not blocked.

Cannot be used along with [ConnectOptions.allowlist](./puppeteer.connectoptions.md#allowlist).

</td><td>

</td></tr>
<tr><td>

<span id="browserurl">browserURL</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="browserwsendpoint">browserWSEndpoint</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="capabilities">capabilities</span>

</td><td>

`optional`

</td><td>

[SupportedWebDriverCapabilities](./puppeteer.supportedwebdrivercapabilities.md)

</td><td>

WebDriver BiDi capabilities passed to BiDi `session.new`.

**Remarks:**

Only works for `protocol="webDriverBiDi"` and [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

</td><td>

</td></tr>
<tr><td>

<span id="channel">channel</span>

</td><td>

`optional`

</td><td>

[ChromeReleaseChannel](./puppeteer.chromereleasechannel.md)

</td><td>

**_(Experimental)_** If specified, puppeteer looks for an open WebSocket at the well-known default user data directory for the specified channel and attempts to connect to it using ws://localhost:$ActivePort/devtools/browser. Only works for Chrome and when run in Node.js.

This option is experimental when used with puppeteer.connect().

</td><td>

</td></tr>
<tr><td>

<span id="defaultviewport">defaultViewport</span>

</td><td>

`optional`

</td><td>

[Viewport](./puppeteer.viewport.md) \| null

</td><td>

Sets the viewport for each page.

</td><td>

'&#123;width: 800, height: 600&#125;'

</td></tr>
<tr><td>

<span id="downloadbehavior">downloadBehavior</span>

</td><td>

`optional`

</td><td>

[DownloadBehavior](./puppeteer.downloadbehavior.md)

</td><td>

Sets the download behavior for the context.

</td><td>

</td></tr>
<tr><td>

<span id="handledevtoolsaspage">handleDevToolsAsPage</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to handle the DevTools windows as pages in Puppeteer. Supported only in Chrome with CDP.

</td><td>

'false'

</td></tr>
<tr><td>

<span id="headers">headers</span>

</td><td>

`optional`

</td><td>

Record&lt;string, string&gt;

</td><td>

Headers to use for the web socket connection.

**Remarks:**

Only works in the Node.js environment.

</td><td>

</td></tr>
<tr><td>

<span id="issuesenabled">issuesEnabled</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

**_(Experimental)_** Experimental setting to disable monitoring issue events by default.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="networkenabled">networkEnabled</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

**_(Experimental)_** Experimental setting to disable monitoring network events by default. When set to `false`, parts of Puppeteer that depend on network events would not work such as HTTPRequest and HTTPResponse.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="protocol">protocol</span>

</td><td>

`optional`

</td><td>

[ProtocolType](./puppeteer.protocoltype.md)

</td><td>

</td><td>

Determined at run time:

- Launching Chrome - 'cdp'.

- Launching Firefox - 'webDriverBiDi'.

- Connecting to a browser - 'cdp'.

</td></tr>
<tr><td>

<span id="protocoltimeout">protocolTimeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Timeout setting for individual protocol (CDP) calls.

</td><td>

`180_000`

</td></tr>
<tr><td>

<span id="slowmo">slowMo</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Slows down Puppeteer operations by the specified amount of milliseconds to aid debugging.

</td><td>

</td></tr>
<tr><td>

<span id="targetfilter">targetFilter</span>

</td><td>

`optional`

</td><td>

[TargetFilterCallback](./puppeteer.targetfiltercallback.md)

</td><td>

Callback to decide if Puppeteer should connect to a given target or not.

</td><td>

</td></tr>
<tr><td>

<span id="transport">transport</span>

</td><td>

`optional`

</td><td>

[ConnectionTransport](./puppeteer.connectiontransport.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ConsoleMessage.args() method

Source: https://pptr.dev/api/puppeteer.consolemessage.args

An array of arguments passed to the console.

### Signature

```typescript
class ConsoleMessage {
	args(): JSHandle[];
}
```

**Returns:**

[JSHandle](./puppeteer.jshandle.md)\[\]

# ConsoleMessage.location() method

Source: https://pptr.dev/api/puppeteer.consolemessage.location

The location of the console message.

### Signature

```typescript
class ConsoleMessage {
	location(): ConsoleMessageLocation;
}
```

**Returns:**

[ConsoleMessageLocation](./puppeteer.consolemessagelocation.md)

# ConsoleMessage class

Source: https://pptr.dev/api/puppeteer.consolemessage

ConsoleMessage objects are dispatched by page via the 'console' event.

### Signature

```typescript
export declare class ConsoleMessage
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ConsoleMessage` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="args">[args()](./puppeteer.consolemessage.args.md)</span>

</td><td>

</td><td>

An array of arguments passed to the console.

</td></tr>
<tr><td>

<span id="location">[location()](./puppeteer.consolemessage.location.md)</span>

</td><td>

</td><td>

The location of the console message.

</td></tr>
<tr><td>

<span id="stacktrace">[stackTrace()](./puppeteer.consolemessage.stacktrace.md)</span>

</td><td>

</td><td>

The array of locations on the stack of the console message.

</td></tr>
<tr><td>

<span id="text">[text()](./puppeteer.consolemessage.text.md)</span>

</td><td>

</td><td>

The text of the console message.

</td></tr>
<tr><td>

<span id="type">[type()](./puppeteer.consolemessage.type.md)</span>

</td><td>

</td><td>

The type of the console message.

</td></tr>
</tbody></table>

# ConsoleMessage.stackTrace() method

Source: https://pptr.dev/api/puppeteer.consolemessage.stacktrace

The array of locations on the stack of the console message.

### Signature

```typescript
class ConsoleMessage {
	stackTrace(): ConsoleMessageLocation[];
}
```

**Returns:**

[ConsoleMessageLocation](./puppeteer.consolemessagelocation.md)\[\]

# ConsoleMessage.text() method

Source: https://pptr.dev/api/puppeteer.consolemessage.text

The text of the console message.

### Signature

```typescript
class ConsoleMessage {
	text(): string;
}
```

**Returns:**

string

# ConsoleMessage.type() method

Source: https://pptr.dev/api/puppeteer.consolemessage.type

The type of the console message.

### Signature

```typescript
class ConsoleMessage {
	type(): ConsoleMessageType;
}
```

**Returns:**

[ConsoleMessageType](./puppeteer.consolemessagetype.md)

# ConsoleMessageLocation interface

Source: https://pptr.dev/api/puppeteer.consolemessagelocation

### Signature

```typescript
export interface ConsoleMessageLocation
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="columnnumber">columnNumber</span>

</td><td>

`optional`

</td><td>

number

</td><td>

0-based column number in the resource if known or `undefined` otherwise.

</td><td>

</td></tr>
<tr><td>

<span id="linenumber">lineNumber</span>

</td><td>

`optional`

</td><td>

number

</td><td>

0-based line number in the resource if known or `undefined` otherwise.

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

URL of the resource if known or `undefined` otherwise.

</td><td>

</td></tr>
</tbody></table>

# ConsoleMessageType type

Source: https://pptr.dev/api/puppeteer.consolemessagetype

The supported types for console messages.

### Signature

```typescript
export type ConsoleMessageType = 'log' | 'debug' | 'info' | 'error' | 'warn' | 'dir' | 'dirxml' | 'table' | 'trace' | 'clear' | 'startGroup' | 'startGroupCollapsed' | 'endGroup' | 'assert' | 'profile' | 'profileEnd' | 'count' | 'timeEnd' | 'verbose';
```

# ContinueRequestOverrides interface

Source: https://pptr.dev/api/puppeteer.continuerequestoverrides

### Signature

```typescript
export interface ContinueRequestOverrides
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="headers">headers</span>

</td><td>

`optional`

</td><td>

Record&lt;string, string&gt;

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="method">method</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="postdata">postData</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If set, the request URL will change. This is not a redirect.

</td><td>

</td></tr>
</tbody></table>

# Cookie interface

Source: https://pptr.dev/api/puppeteer.cookie

Represents a cookie object.

### Signature

```typescript
export interface Cookie extends CookieData
```

**Extends:** [CookieData](./puppeteer.cookiedata.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="expires">expires</span>

</td><td>

</td><td>

number

</td><td>

Cookie expiration date as the number of seconds since the UNIX epoch. Set to `-1` for session cookies

</td><td>

</td></tr>
<tr><td>

<span id="partitionkeyopaque">partitionKeyOpaque</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

True if cookie partition key is opaque. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

</td><td>

string

</td><td>

Cookie path.

</td><td>

</td></tr>
<tr><td>

<span id="secure">secure</span>

</td><td>

</td><td>

boolean

</td><td>

True if cookie is secure.

</td><td>

</td></tr>
<tr><td>

<span id="session">session</span>

</td><td>

</td><td>

boolean

</td><td>

True in case of session cookie.

</td><td>

</td></tr>
<tr><td>

<span id="size">size</span>

</td><td>

</td><td>

number

</td><td>

Cookie size.

</td><td>

</td></tr>
</tbody></table>

# CookieData interface

Source: https://pptr.dev/api/puppeteer.cookiedata

Cookie parameter object used to set cookies in the browser-level cookies API.

### Signature

```typescript
export interface CookieData
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="domain">domain</span>

</td><td>

</td><td>

string

</td><td>

Cookie domain.

</td><td>

</td></tr>
<tr><td>

<span id="expires">expires</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Cookie expiration date, session cookie if not set

</td><td>

</td></tr>
<tr><td>

<span id="httponly">httpOnly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

True if cookie is http-only.

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

Cookie name.

</td><td>

</td></tr>
<tr><td>

<span id="partitionkey">partitionKey</span>

</td><td>

`optional`

</td><td>

[CookiePartitionKey](./puppeteer.cookiepartitionkey.md) \| string

</td><td>

Cookie partition key. In Chrome, it matches the top-level site the partitioned cookie is available in. In Firefox, it matches the source origin in the [PartitionKey](https://w3c.github.io/webdriver-bidi/#type-storage-PartitionKey).

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Cookie path.

</td><td>

</td></tr>
<tr><td>

<span id="priority">priority</span>

</td><td>

`optional`

</td><td>

[CookiePriority](./puppeteer.cookiepriority.md)

</td><td>

Cookie Priority. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="sameparty">sameParty</span>

</td><td>

`optional, deprecated`

</td><td>

boolean

</td><td>

**Deprecated:**

Always set to false. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="samesite">sameSite</span>

</td><td>

`optional`

</td><td>

[CookieSameSite](./puppeteer.cookiesamesite.md)

</td><td>

Cookie SameSite type.

</td><td>

</td></tr>
<tr><td>

<span id="secure">secure</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

True if cookie is secure.

</td><td>

</td></tr>
<tr><td>

<span id="sourcescheme">sourceScheme</span>

</td><td>

`optional`

</td><td>

[CookieSourceScheme](./puppeteer.cookiesourcescheme.md)

</td><td>

Cookie source scheme type. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="value">value</span>

</td><td>

</td><td>

string

</td><td>

Cookie value.

</td><td>

</td></tr>
</tbody></table>

# CookieParam interface

Source: https://pptr.dev/api/puppeteer.cookieparam

Cookie parameter object used to set cookies in the page-level cookies API.

### Signature

```typescript
export interface CookieParam
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="domain">domain</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Cookie domain.

</td><td>

</td></tr>
<tr><td>

<span id="expires">expires</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Cookie expiration date, session cookie if not set

</td><td>

</td></tr>
<tr><td>

<span id="httponly">httpOnly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

True if cookie is http-only.

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

Cookie name.

</td><td>

</td></tr>
<tr><td>

<span id="partitionkey">partitionKey</span>

</td><td>

`optional`

</td><td>

[CookiePartitionKey](./puppeteer.cookiepartitionkey.md) \| string

</td><td>

Cookie partition key. In Chrome, it matches the top-level site the partitioned cookie is available in. In Firefox, it matches the source origin in the [PartitionKey](https://w3c.github.io/webdriver-bidi/#type-storage-PartitionKey).

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Cookie path.

</td><td>

</td></tr>
<tr><td>

<span id="priority">priority</span>

</td><td>

`optional`

</td><td>

[CookiePriority](./puppeteer.cookiepriority.md)

</td><td>

Cookie Priority. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="sameparty">sameParty</span>

</td><td>

`optional, deprecated`

</td><td>

boolean

</td><td>

**Deprecated:**

Always ignored.

</td><td>

</td></tr>
<tr><td>

<span id="samesite">sameSite</span>

</td><td>

`optional`

</td><td>

[CookieSameSite](./puppeteer.cookiesamesite.md)

</td><td>

Cookie SameSite type.

</td><td>

</td></tr>
<tr><td>

<span id="secure">secure</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

True if cookie is secure.

</td><td>

</td></tr>
<tr><td>

<span id="sourcescheme">sourceScheme</span>

</td><td>

`optional`

</td><td>

[CookieSourceScheme](./puppeteer.cookiesourcescheme.md)

</td><td>

Cookie source scheme type. Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The request-URI to associate with the setting of the cookie. This value can affect the default domain, path, and source scheme values of the created cookie.

</td><td>

</td></tr>
<tr><td>

<span id="value">value</span>

</td><td>

</td><td>

string

</td><td>

Cookie value.

</td><td>

</td></tr>
</tbody></table>

# CookiePartitionKey interface

Source: https://pptr.dev/api/puppeteer.cookiepartitionkey

Represents a cookie partition key in Chrome.

### Signature

```typescript
export interface CookiePartitionKey
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="hascrosssiteancestor">hasCrossSiteAncestor</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Indicates if the cookie has any ancestors that are cross-site to the topLevelSite.

Supported only in Chrome.

</td><td>

</td></tr>
<tr><td>

<span id="sourceorigin">sourceOrigin</span>

</td><td>

</td><td>

string

</td><td>

The site of the top-level URL the browser was visiting at the start of the request to the endpoint that set the cookie.

In Chrome, maps to the CDP's `topLevelSite` partition key.

</td><td>

</td></tr>
</tbody></table>

# CookiePriority type

Source: https://pptr.dev/api/puppeteer.cookiepriority

Represents the cookie's 'Priority' status: https://tools.ietf.org/html/draft-west-cookie-priority-00

### Signature

```typescript
export type CookiePriority = 'Low' | 'Medium' | 'High';
```

# CookieSameSite type

Source: https://pptr.dev/api/puppeteer.cookiesamesite

Represents the cookie's 'SameSite' status: https://tools.ietf.org/html/draft-west-first-party-cookies

### Signature

```typescript
export type CookieSameSite = 'Strict' | 'Lax' | 'None' | 'Default';
```

# CookieSourceScheme type

Source: https://pptr.dev/api/puppeteer.cookiesourcescheme

Represents the source scheme of the origin that originally set the cookie. A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme. This is a temporary ability and it will be removed in the future.

### Signature

```typescript
export type CookieSourceScheme = 'Unset' | 'NonSecure' | 'Secure';
```

# Coverage class

Source: https://pptr.dev/api/puppeteer.coverage

The Coverage class provides methods to gather information about parts of JavaScript and CSS that were used by the page.

### Signature

```typescript
export declare class Coverage
```

## Remarks

To output coverage in a form consumable by [Istanbul](https://github.com/istanbuljs), see [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Coverage` class.

## Example

An example of using JavaScript and CSS coverage to get percentage of initially executed code:

```ts
// Enable both JavaScript and CSS coverage
await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
// Navigate to page
await page.goto('https://example.com');
// Disable both JavaScript and CSS coverage
const [jsCoverage, cssCoverage] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()]);
let totalBytes = 0;
let usedBytes = 0;
const coverage = [...jsCoverage, ...cssCoverage];
for (const entry of coverage) {
	totalBytes += entry.text.length;
	for (const range of entry.ranges) usedBytes += range.end - range.start - 1;
}
console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="startcsscoverage">[startCSSCoverage(options)](./puppeteer.coverage.startcsscoverage.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="startjscoverage">[startJSCoverage(options)](./puppeteer.coverage.startjscoverage.md)</span>

</td><td>

</td><td>

**Remarks:**

Anonymous scripts are ones that don't have an associated url. These are scripts that are dynamically created on the page using `eval` or `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous scripts URL will start with `debugger://VM` (unless a magic //\# sourceURL comment is present, in which case that will the be URL).

</td></tr>
<tr><td>

<span id="stopcsscoverage">[stopCSSCoverage()](./puppeteer.coverage.stopcsscoverage.md)</span>

</td><td>

</td><td>

Promise that resolves to the array of coverage reports for all stylesheets.

**Remarks:**

CSS Coverage doesn't include dynamically injected style tags without sourceURLs.

</td></tr>
<tr><td>

<span id="stopjscoverage">[stopJSCoverage()](./puppeteer.coverage.stopjscoverage.md)</span>

</td><td>

</td><td>

Promise that resolves to the array of coverage reports for all scripts.

**Remarks:**

JavaScript Coverage doesn't include anonymous scripts by default. However, scripts with sourceURLs are reported.

</td></tr>
</tbody></table>

# Coverage.startCSSCoverage() method

Source: https://pptr.dev/api/puppeteer.coverage.startcsscoverage

### Signature

```typescript
class Coverage {
	startCSSCoverage(options?: CSSCoverageOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[CSSCoverageOptions](./puppeteer.csscoverageoptions.md)

</td><td>

_(Optional)_ Set of configurable options for coverage, defaults to `resetOnNavigation : true`

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise that resolves when coverage is started.

# Coverage.startJSCoverage() method

Source: https://pptr.dev/api/puppeteer.coverage.startjscoverage

### Signature

```typescript
class Coverage {
	startJSCoverage(options?: JSCoverageOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[JSCoverageOptions](./puppeteer.jscoverageoptions.md)

</td><td>

_(Optional)_ Set of configurable options for coverage defaults to `resetOnNavigation : true, reportAnonymousScripts : false,` `includeRawScriptCoverage : false, useBlockCoverage : true`

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise that resolves when coverage is started.

## Remarks

Anonymous scripts are ones that don't have an associated url. These are scripts that are dynamically created on the page using `eval` or `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous scripts URL will start with `debugger://VM` (unless a magic //\# sourceURL comment is present, in which case that will the be URL).

# Coverage.stopCSSCoverage() method

Source: https://pptr.dev/api/puppeteer.coverage.stopcsscoverage

Promise that resolves to the array of coverage reports for all stylesheets.

### Signature

```typescript
class Coverage {
	stopCSSCoverage(): Promise<CoverageEntry[]>;
}
```

**Returns:**

Promise&lt;[CoverageEntry](./puppeteer.coverageentry.md)\[\]&gt;

## Remarks

CSS Coverage doesn't include dynamically injected style tags without sourceURLs.

# Coverage.stopJSCoverage() method

Source: https://pptr.dev/api/puppeteer.coverage.stopjscoverage

Promise that resolves to the array of coverage reports for all scripts.

### Signature

```typescript
class Coverage {
	stopJSCoverage(): Promise<JSCoverageEntry[]>;
}
```

**Returns:**

Promise&lt;[JSCoverageEntry](./puppeteer.jscoverageentry.md)\[\]&gt;

## Remarks

JavaScript Coverage doesn't include anonymous scripts by default. However, scripts with sourceURLs are reported.

# CoverageEntry interface

Source: https://pptr.dev/api/puppeteer.coverageentry

The CoverageEntry class represents one entry of the coverage report.

### Signature

```typescript
export interface CoverageEntry
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="ranges">ranges</span>

</td><td>

</td><td>

Array&lt;&#123; start: number; end: number; &#125;&gt;

</td><td>

The covered range as start and end positions.

</td><td>

</td></tr>
<tr><td>

<span id="text">text</span>

</td><td>

</td><td>

string

</td><td>

The content of the style sheet or script.

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

</td><td>

string

</td><td>

The URL of the style sheet or script.

</td><td>

</td></tr>
</tbody></table>

# CreatePageOptions type

Source: https://pptr.dev/api/puppeteer.createpageoptions

### Signature

```typescript
export type CreatePageOptions = (
	| {
			type?: 'tab';
	  }
	| {
			type: 'window';
			windowBounds?: WindowBounds;
	  }
) & {
	background?: boolean;
};
```

**References:** [WindowBounds](./puppeteer.windowbounds.md)

# Credentials interface

Source: https://pptr.dev/api/puppeteer.credentials

### Signature

```typescript
export interface Credentials
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="password">password</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="username">username</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CSSCoverage.(constructor)

Source: https://pptr.dev/api/puppeteer.csscoverage._constructor_

Constructs a new instance of the `CSSCoverage` class

### Signature

```typescript
class CSSCoverage {
	constructor(client: CDPSession);
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

client

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

</td></tr>
</tbody></table>

# CSSCoverage class

Source: https://pptr.dev/api/puppeteer.csscoverage

### Signature

```typescript
export declare class CSSCoverage
```

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_constructor_">[(constructor)(client)](./puppeteer.csscoverage._constructor_.md)</span>

</td><td>

</td><td>

Constructs a new instance of the `CSSCoverage` class

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="start">[start(options)](./puppeteer.csscoverage.start.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="stop">[stop()](./puppeteer.csscoverage.stop.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CSSCoverage.start() method

Source: https://pptr.dev/api/puppeteer.csscoverage.start

### Signature

```typescript
class CSSCoverage {
	start(options?: { resetOnNavigation?: boolean }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; resetOnNavigation?: boolean; &#125;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# CSSCoverage.stop() method

Source: https://pptr.dev/api/puppeteer.csscoverage.stop

### Signature

```typescript
class CSSCoverage {
	stop(): Promise<CoverageEntry[]>;
}
```

**Returns:**

Promise&lt;[CoverageEntry](./puppeteer.coverageentry.md)\[\]&gt;

# CSSCoverageOptions interface

Source: https://pptr.dev/api/puppeteer.csscoverageoptions

Set of configurable options for CSS coverage.

### Signature

```typescript
export interface CSSCoverageOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="resetonnavigation">resetOnNavigation</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to reset coverage on every navigation.

</td><td>

</td></tr>
</tbody></table>

# CustomQueryHandler interface

Source: https://pptr.dev/api/puppeteer.customqueryhandler

### Signature

```typescript
export interface CustomQueryHandler
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="queryall">queryAll</span>

</td><td>

`optional`

</td><td>

(node: Node, selector: string) =&gt; Iterable&lt;Node&gt;

</td><td>

Searches for some [Nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node) matching the given `selector` from [node](https://developer.mozilla.org/en-US/docs/Web/API/Node).

</td><td>

</td></tr>
<tr><td>

<span id="queryone">queryOne</span>

</td><td>

`optional`

</td><td>

(node: Node, selector: string) =&gt; Node \| null

</td><td>

Searches for a [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) matching the given `selector` from [node](https://developer.mozilla.org/en-US/docs/Web/API/Node).

</td><td>

</td></tr>
</tbody></table>

# DebugInfo interface

Source: https://pptr.dev/api/puppeteer.debuginfo

### Signature

```typescript
export interface DebugInfo
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="pendingprotocolerrors">pendingProtocolErrors</span>

</td><td>

</td><td>

Error\[\]

</td><td>

</td><td>

</td></tr>
</tbody></table>

# DEFAULT_INTERCEPT_RESOLUTION_PRIORITY variable

Source: https://pptr.dev/api/puppeteer.default_intercept_resolution_priority

The default cooperative request interception resolution priority

### Signature

```typescript
DEFAULT_INTERCEPT_RESOLUTION_PRIORITY = 0;
```

# defaultArgs() function

Source: https://pptr.dev/api/puppeteer.defaultargs

### Signature

```typescript
defaultArgs: (options?: PuppeteerCore.LaunchOptions) => string[]
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[PuppeteerCore.LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

string\[\]

# DeleteCookiesRequest interface

Source: https://pptr.dev/api/puppeteer.deletecookiesrequest

### Signature

```typescript
export interface DeleteCookiesRequest
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="domain">domain</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If specified, deletes only cookies with the exact domain.

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

Name of the cookies to remove.

</td><td>

</td></tr>
<tr><td>

<span id="partitionkey">partitionKey</span>

</td><td>

`optional`

</td><td>

[CookiePartitionKey](./puppeteer.cookiepartitionkey.md) \| string

</td><td>

If specified, deletes cookies in the given partition key. In Chrome, partitionKey matches the top-level site the partitioned cookie is available in. In Firefox, it matches the source origin in the [PartitionKey](https://w3c.github.io/webdriver-bidi/#type-storage-PartitionKey).

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If specified, deletes only cookies with the exact path.

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If specified, deletes all the cookies with the given name where domain and path match provided URL. Otherwise, deletes only cookies related to the current page's domain.

</td><td>

</td></tr>
</tbody></table>

# Device interface

Source: https://pptr.dev/api/puppeteer.device

### Signature

```typescript
export interface Device
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="useragent">userAgent</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="viewport">viewport</span>

</td><td>

</td><td>

[Viewport](./puppeteer.viewport.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# DeviceRequestPrompt.cancel() method

Source: https://pptr.dev/api/puppeteer.devicerequestprompt.cancel

Cancel the prompt.

### Signature

```typescript
class DeviceRequestPrompt {
	abstract cancel(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# DeviceRequestPrompt class

Source: https://pptr.dev/api/puppeteer.devicerequestprompt

Device request prompts let you respond to the page requesting for a device through an API like WebBluetooth.

### Signature

```typescript
export declare abstract class DeviceRequestPrompt
```

## Remarks

`DeviceRequestPrompt` instances are returned via the [Page.waitForDevicePrompt()](./puppeteer.page.waitfordeviceprompt.md) method.

## Example

```ts
const [devicePrompt] = Promise.all([page.waitForDevicePrompt(), page.click('#connect-bluetooth')]);
await devicePrompt.select(await devicePrompt.waitForDevice(({ name }) => name.includes('My Device')));
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="devices">devices</span>

</td><td>

`readonly`

</td><td>

[DeviceRequestPromptDevice](./puppeteer.devicerequestpromptdevice.md)\[\]

</td><td>

Current list of selectable devices.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="cancel">[cancel()](./puppeteer.devicerequestprompt.cancel.md)</span>

</td><td>

</td><td>

Cancel the prompt.

</td></tr>
<tr><td>

<span id="select">[select(device)](./puppeteer.devicerequestprompt.select.md)</span>

</td><td>

</td><td>

Select a device in the prompt's list.

</td></tr>
<tr><td>

<span id="waitfordevice">[waitForDevice(filter, options)](./puppeteer.devicerequestprompt.waitfordevice.md)</span>

</td><td>

</td><td>

Resolve to the first device in the prompt matching a filter.

</td></tr>
</tbody></table>

# DeviceRequestPrompt.select() method

Source: https://pptr.dev/api/puppeteer.devicerequestprompt.select

Select a device in the prompt's list.

### Signature

```typescript
class DeviceRequestPrompt {
	abstract select(device: DeviceRequestPromptDevice): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

device

</td><td>

[DeviceRequestPromptDevice](./puppeteer.devicerequestpromptdevice.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# DeviceRequestPrompt.waitForDevice() method

Source: https://pptr.dev/api/puppeteer.devicerequestprompt.waitfordevice

Resolve to the first device in the prompt matching a filter.

### Signature

```typescript
class DeviceRequestPrompt {
	abstract waitForDevice(filter: (device: DeviceRequestPromptDevice) => boolean, options?: WaitTimeoutOptions): Promise<DeviceRequestPromptDevice>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

filter

</td><td>

(device: [DeviceRequestPromptDevice](./puppeteer.devicerequestpromptdevice.md)) =&gt; boolean

</td><td>

</td></tr>
<tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[DeviceRequestPromptDevice](./puppeteer.devicerequestpromptdevice.md)&gt;

# DeviceRequestPromptDevice interface

Source: https://pptr.dev/api/puppeteer.devicerequestpromptdevice

Device in a request prompt.

### Signature

```typescript
export interface DeviceRequestPromptDevice
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="id">id</span>

</td><td>

</td><td>

string

</td><td>

Device id during a prompt.

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

Device name as it appears in a prompt.

</td><td>

</td></tr>
</tbody></table>

# Dialog.accept() method

Source: https://pptr.dev/api/puppeteer.dialog.accept

A promise that resolves when the dialog has been accepted.

### Signature

```typescript
class Dialog {
	accept(promptText?: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

promptText

</td><td>

string

</td><td>

_(Optional)_ optional text that will be entered in the dialog prompt. Has no effect if the dialog's type is not `prompt`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Dialog.defaultValue() method

Source: https://pptr.dev/api/puppeteer.dialog.defaultvalue

The default value of the prompt, or an empty string if the dialog is not a `prompt`.

### Signature

```typescript
class Dialog {
	defaultValue(): string;
}
```

**Returns:**

string

# Dialog.dismiss() method

Source: https://pptr.dev/api/puppeteer.dialog.dismiss

A promise which will resolve once the dialog has been dismissed

### Signature

```typescript
class Dialog {
	dismiss(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Dialog class

Source: https://pptr.dev/api/puppeteer.dialog

Dialog instances are dispatched by the [Page](./puppeteer.page.md) via the `dialog` event.

### Signature

```typescript
export declare abstract class Dialog
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Dialog` class.

## Example

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
page.on('dialog', async (dialog) => {
	console.log(dialog.message());
	await dialog.dismiss();
	await browser.close();
});
await page.evaluate(() => alert('1'));
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="accept">[accept(promptText)](./puppeteer.dialog.accept.md)</span>

</td><td>

</td><td>

A promise that resolves when the dialog has been accepted.

</td></tr>
<tr><td>

<span id="defaultvalue">[defaultValue()](./puppeteer.dialog.defaultvalue.md)</span>

</td><td>

</td><td>

The default value of the prompt, or an empty string if the dialog is not a `prompt`.

</td></tr>
<tr><td>

<span id="dismiss">[dismiss()](./puppeteer.dialog.dismiss.md)</span>

</td><td>

</td><td>

A promise which will resolve once the dialog has been dismissed

</td></tr>
<tr><td>

<span id="message">[message()](./puppeteer.dialog.message.md)</span>

</td><td>

</td><td>

The message displayed in the dialog.

</td></tr>
<tr><td>

<span id="type">[type()](./puppeteer.dialog.type.md)</span>

</td><td>

</td><td>

The type of the dialog.

</td></tr>
</tbody></table>

# Dialog.message() method

Source: https://pptr.dev/api/puppeteer.dialog.message

The message displayed in the dialog.

### Signature

```typescript
class Dialog {
	message(): string;
}
```

**Returns:**

string

# Dialog.type() method

Source: https://pptr.dev/api/puppeteer.dialog.type

The type of the dialog.

### Signature

```typescript
class Dialog {
	type(): Protocol.Page.DialogType;
}
```

**Returns:**

Protocol.Page.DialogType

# DownloadBehavior interface

Source: https://pptr.dev/api/puppeteer.downloadbehavior

### Signature

```typescript
export interface DownloadBehavior
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="downloadpath">downloadPath</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The default path to save downloaded files to.

**Remarks:**

Setting this is required if behavior is set to `allow` or `allowAndName`.

</td><td>

</td></tr>
<tr><td>

<span id="policy">policy</span>

</td><td>

</td><td>

[DownloadPolicy](./puppeteer.downloadpolicy.md)

</td><td>

Whether to allow all or deny all download requests, or use default behavior if available.

**Remarks:**

Setting this to `allowAndName` will name all files according to their download guids.

</td><td>

</td></tr>
</tbody></table>

# DownloadPolicy type

Source: https://pptr.dev/api/puppeteer.downloadpolicy

### Signature

```typescript
export type DownloadPolicy = 'deny' | 'allow' | 'allowAndName' | 'default';
```

# ElementFor type

Source: https://pptr.dev/api/puppeteer.elementfor

### Signature

```typescript
export type ElementFor<TagName extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap> = TagName extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[TagName] : TagName extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[TagName] : never;
```

# ElementHandle.$() method

Source: https://pptr.dev/api/puppeteer.elementhandle._

Queries the current element for an element matching the given selector.

### Signature

```typescript
class ElementHandle {
	$<Selector extends string>(selector: Selector): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

A [element handle](./puppeteer.elementhandle.md) to the first element matching the given selector. Otherwise, `null`.

# ElementHandle.$$() method

Source: https://pptr.dev/api/puppeteer.elementhandle.__

Queries the current element for all elements matching the given selector.

### Signature

```typescript
class ElementHandle {
	$$<Selector extends string>(selector: Selector, options?: QueryOptions): Promise<Array<ElementHandle<NodeFor<Selector>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

options

</td><td>

[QueryOptions](./puppeteer.queryoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Array&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt;&gt;&gt;

An array of [element handles](./puppeteer.elementhandle.md) that point to elements matching the given selector.

# ElementHandle.$$eval() method

Source: https://pptr.dev/api/puppeteer.elementhandle.__eval

Runs the given function on an array of elements matching the given selector in the current element.

If the given function returns a promise, then this method will wait till the promise resolves.

### Signature

```typescript
class ElementHandle {
	$$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<Array<NodeFor<Selector>>, Params> = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

The function to be evaluated in the element's page's context. An array of elements matching the given selector will be passed to the function as its first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Additional arguments to pass to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

A promise to the result of the function.

## Example

HTML:

```html
<div class="feed">
	<div class="tweet">Hello!</div>
	<div class="tweet">Hi!</div>
</div>
```

JavaScript:

```ts
const feedHandle = await page.$('.feed');

const listOfTweets = await feedHandle.$$eval('.tweet', (nodes) => nodes.map((n) => n.innerText));
```

# ElementHandle.$eval() method

Source: https://pptr.dev/api/puppeteer.elementhandle._eval

Runs the given function on the first element matching the given selector in the current element.

If the given function returns a promise, then this method will wait till the promise resolves.

### Signature

```typescript
class ElementHandle {
	$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

The function to be evaluated in this element's page's context. The first element matching the selector will be passed in as the first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Additional arguments to pass to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

A promise to the result of the function.

## Example

```ts
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', (node) => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', (node) => node.innerText)).toBe('10');
```

# ElementHandle.asLocator() method

Source: https://pptr.dev/api/puppeteer.elementhandle.aslocator

Creates a locator based on an ElementHandle. This would not allow refreshing the element handle if it is stale but it allows re-using other locator pre-conditions.

### Signature

```typescript
class ElementHandle {
	asLocator(this: ElementHandle<Element>): Locator<Element>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;Element&gt;

# ElementHandle.autofill() method

Source: https://pptr.dev/api/puppeteer.elementhandle.autofill

If the element is a form input, you can use [ElementHandle.autofill()](./puppeteer.elementhandle.autofill.md) to test if the form is compatible with the browser's autofill implementation. Throws an error if the form cannot be autofilled.

### Signature

```typescript
class ElementHandle {
	abstract autofill(data: AutofillData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[AutofillData](./puppeteer.autofilldata.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Currently, Puppeteer supports auto-filling credit card information only and in Chrome in the new headless and headful modes only.

```ts
// Select an input on the credit card form.
const name = await page.waitForSelector('form #name');
// Trigger autofill with the desired data.
await name.autofill({
	creditCard: {
		number: '4444444444444444',
		name: 'John Smith',
		expiryMonth: '01',
		expiryYear: '2030',
		cvc: '123',
	},
});
```

# ElementHandle.backendNodeId() method

Source: https://pptr.dev/api/puppeteer.elementhandle.backendnodeid

When connected using Chrome DevTools Protocol, it returns a DOM.BackendNodeId for the element.

### Signature

```typescript
class ElementHandle {
	abstract backendNodeId(): Promise<number>;
}
```

**Returns:**

Promise&lt;number&gt;

# ElementHandle.boundingBox() method

Source: https://pptr.dev/api/puppeteer.elementhandle.boundingbox

This method returns the bounding box of the element (relative to the main frame), or `null` if the element is [not part of the layout](https://drafts.csswg.org/css-display-4/#box-generation) (example: `display: none`).

### Signature

```typescript
class ElementHandle {
	boundingBox(): Promise<BoundingBox | null>;
}
```

**Returns:**

Promise&lt;[BoundingBox](./puppeteer.boundingbox.md) \| null&gt;

# ElementHandle.boxModel() method

Source: https://pptr.dev/api/puppeteer.elementhandle.boxmodel

This method returns boxes of the element, or `null` if the element is [not part of the layout](https://drafts.csswg.org/css-display-4/#box-generation) (example: `display: none`).

### Signature

```typescript
class ElementHandle {
	boxModel(): Promise<BoxModel | null>;
}
```

**Returns:**

Promise&lt;[BoxModel](./puppeteer.boxmodel.md) \| null&gt;

## Remarks

Boxes are represented as an array of points; Each Point is an object `{x, y}`. Box points are sorted clock-wise.

# ElementHandle.click() method

Source: https://pptr.dev/api/puppeteer.elementhandle.click

This method scrolls element into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to click in the center of the element. If the element is detached from DOM, the method throws an error.

### Signature

```typescript
class ElementHandle {
	click(this: ElementHandle<Element>, options?: Readonly<ClickOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[ClickOptions](./puppeteer.clickoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.clickablePoint() method

Source: https://pptr.dev/api/puppeteer.elementhandle.clickablepoint

Returns the middle point within an element unless a specific offset is provided.

### Signature

```typescript
class ElementHandle {
	clickablePoint(offset?: Offset): Promise<Point>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

offset

</td><td>

[Offset](./puppeteer.offset.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Point](./puppeteer.point.md)&gt;

# ElementHandle.contentFrame() method

Source: https://pptr.dev/api/puppeteer.elementhandle.contentframe

<h2 id="overload-1">contentFrame(): Promise&lt;Frame&gt;</h2>

Resolves the frame associated with the element, if any. Always exists for HTMLIFrameElements.

### Signature

```typescript
class ElementHandle {
	abstract contentFrame(this: ElementHandle<HTMLIFrameElement>): Promise<Frame>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLIFrameElement&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Frame](./puppeteer.frame.md)&gt;

<h2 id="overload-2">contentFrame(): Promise&lt;Frame \| null&gt;</h2>

### Signature

```typescript
class ElementHandle {
	abstract contentFrame(): Promise<Frame | null>;
}
```

**Returns:**

Promise&lt;[Frame](./puppeteer.frame.md) \| null&gt;

# ElementHandle.drag() method

Source: https://pptr.dev/api/puppeteer.elementhandle.drag

Drags an element over the given element or point.

### Signature

```typescript
class ElementHandle {
	drag(this: ElementHandle<Element>, target: Point | ElementHandle<Element>): Promise<Protocol.Input.DragData | void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

target

</td><td>

[Point](./puppeteer.point.md) \| [ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Protocol.Input.DragData \| void&gt;

DEPRECATED. When drag interception is enabled, the drag payload is returned.

# ElementHandle.dragAndDrop() method

Source: https://pptr.dev/api/puppeteer.elementhandle.draganddrop

> Warning: This API is now obsolete.
>
> Use `ElementHandle.drop` instead.

### Signature

```typescript
class ElementHandle {
	dragAndDrop(
		this: ElementHandle<Element>,
		target: ElementHandle<Node>,
		options?: {
			delay: number;
		},
	): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

target

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Node&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

&#123; delay: number; &#125;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.dragEnter() method

Source: https://pptr.dev/api/puppeteer.elementhandle.dragenter

> Warning: This API is now obsolete.
>
> Do not use. `dragenter` will automatically be performed during dragging.

### Signature

```typescript
class ElementHandle {
	dragEnter(this: ElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.dragOver() method

Source: https://pptr.dev/api/puppeteer.elementhandle.dragover

> Warning: This API is now obsolete.
>
> Do not use. `dragover` will automatically be performed during dragging.

### Signature

```typescript
class ElementHandle {
	dragOver(this: ElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.drop() method

Source: https://pptr.dev/api/puppeteer.elementhandle.drop

<h2 id="overload-1">drop(): Promise&lt;void&gt;</h2>

Drops the given element onto the current one.

### Signature

```typescript
class ElementHandle {
	drop(this: ElementHandle<Element>, element: ElementHandle<Element>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

element

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

<h2 id="overload-2">drop(): Promise&lt;void&gt;</h2>

> Warning: This API is now obsolete.
>
> No longer supported.

### Signature

```typescript
class ElementHandle {
	drop(this: ElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.focus() method

Source: https://pptr.dev/api/puppeteer.elementhandle.focus

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

### Signature

```typescript
class ElementHandle {
	focus(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# ElementHandle.hover() method

Source: https://pptr.dev/api/puppeteer.elementhandle.hover

This method scrolls element into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to hover over the center of the element. If the element is detached from DOM, the method throws an error.

### Signature

```typescript
class ElementHandle {
	hover(this: ElementHandle<Element>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.isHidden() method

Source: https://pptr.dev/api/puppeteer.elementhandle.ishidden

An element is considered to be hidden if at least one of the following is true:

- the element has no [computed styles](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

- the element has an empty [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

- the element's [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is `hidden` or `collapse`.

### Signature

```typescript
class ElementHandle {
	isHidden(): Promise<boolean>;
}
```

**Returns:**

Promise&lt;boolean&gt;

# ElementHandle.isIntersectingViewport() method

Source: https://pptr.dev/api/puppeteer.elementhandle.isintersectingviewport

Resolves to true if the element is visible in the current viewport. If an element is an SVG, we check if the svg owner element is in the viewport instead. See https://crbug.com/963246.

### Signature

```typescript
class ElementHandle {
	isIntersectingViewport(
		this: ElementHandle<Element>,
		options?: {
			threshold?: number;
		},
	): Promise<boolean>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

&#123; threshold?: number; &#125;

</td><td>

_(Optional)_ Threshold for the intersection between 0 (no intersection) and 1 (full intersection). Defaults to 1.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;boolean&gt;

# ElementHandle.isVisible() method

Source: https://pptr.dev/api/puppeteer.elementhandle.isvisible

An element is considered to be visible if all of the following is true:

- the element has [computed styles](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

- the element has a non-empty [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

- the element's [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is not `hidden` or `collapse`.

### Signature

```typescript
class ElementHandle {
	isVisible(): Promise<boolean>;
}
```

**Returns:**

Promise&lt;boolean&gt;

# ElementHandle class

Source: https://pptr.dev/api/puppeteer.elementhandle

ElementHandle represents an in-page DOM element.

### Signature

```typescript
export declare abstract class ElementHandle<ElementType extends Node = Element> extends JSHandle<ElementType>
```

**Extends:** [JSHandle](./puppeteer.jshandle.md)&lt;ElementType&gt;

## Remarks

ElementHandles can be created with the [Page.$()](./puppeteer.page._.md) method.

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
const hrefElement = await page.$('a');
await hrefElement.click();
// ...
```

ElementHandle prevents the DOM element from being garbage-collected unless the handle is [disposed](./puppeteer.jshandle.dispose.md). ElementHandles are auto-disposed when their associated frame is navigated away or the parent context gets destroyed.

ElementHandle instances can be used as arguments in [Page.$eval()](./puppeteer.page._eval.md) and [Page.evaluate()](./puppeteer.page.evaluate.md) methods.

If you're using TypeScript, ElementHandle takes a generic argument that denotes the type of element the handle is holding within. For example, if you have a handle to a `<select>` element, you can type it as `ElementHandle<HTMLSelectElement>` and you get some nicer type checks.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ElementHandle` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="frame">frame</span>

</td><td>

`readonly`

</td><td>

[Frame](./puppeteer.frame.md)

</td><td>

Frame corresponding to the current handle.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_">[$(selector)](./puppeteer.elementhandle._.md)</span>

</td><td>

</td><td>

Queries the current element for an element matching the given selector.

</td></tr>
<tr><td>

<span id="__">[$$(selector, options)](./puppeteer.elementhandle.__.md)</span>

</td><td>

</td><td>

Queries the current element for all elements matching the given selector.

</td></tr>
<tr><td>

<span id="__eval">[$$eval(selector, pageFunction, args)](./puppeteer.elementhandle.__eval.md)</span>

</td><td>

</td><td>

Runs the given function on an array of elements matching the given selector in the current element.

If the given function returns a promise, then this method will wait till the promise resolves.

</td></tr>
<tr><td>

<span id="_eval">[$eval(selector, pageFunction, args)](./puppeteer.elementhandle._eval.md)</span>

</td><td>

</td><td>

Runs the given function on the first element matching the given selector in the current element.

If the given function returns a promise, then this method will wait till the promise resolves.

</td></tr>
<tr><td>

<span id="aslocator">[asLocator(this)](./puppeteer.elementhandle.aslocator.md)</span>

</td><td>

</td><td>

Creates a locator based on an ElementHandle. This would not allow refreshing the element handle if it is stale but it allows re-using other locator pre-conditions.

</td></tr>
<tr><td>

<span id="autofill">[autofill(data)](./puppeteer.elementhandle.autofill.md)</span>

</td><td>

</td><td>

If the element is a form input, you can use [ElementHandle.autofill()](./puppeteer.elementhandle.autofill.md) to test if the form is compatible with the browser's autofill implementation. Throws an error if the form cannot be autofilled.

**Remarks:**

Currently, Puppeteer supports auto-filling credit card information only and in Chrome in the new headless and headful modes only.

```ts
// Select an input on the credit card form.
const name = await page.waitForSelector('form #name');
// Trigger autofill with the desired data.
await name.autofill({
	creditCard: {
		number: '4444444444444444',
		name: 'John Smith',
		expiryMonth: '01',
		expiryYear: '2030',
		cvc: '123',
	},
});
```

</td></tr>
<tr><td>

<span id="backendnodeid">[backendNodeId()](./puppeteer.elementhandle.backendnodeid.md)</span>

</td><td>

</td><td>

When connected using Chrome DevTools Protocol, it returns a DOM.BackendNodeId for the element.

</td></tr>
<tr><td>

<span id="boundingbox">[boundingBox()](./puppeteer.elementhandle.boundingbox.md)</span>

</td><td>

</td><td>

This method returns the bounding box of the element (relative to the main frame), or `null` if the element is [not part of the layout](https://drafts.csswg.org/css-display-4/#box-generation) (example: `display: none`).

</td></tr>
<tr><td>

<span id="boxmodel">[boxModel()](./puppeteer.elementhandle.boxmodel.md)</span>

</td><td>

</td><td>

This method returns boxes of the element, or `null` if the element is [not part of the layout](https://drafts.csswg.org/css-display-4/#box-generation) (example: `display: none`).

**Remarks:**

Boxes are represented as an array of points; Each Point is an object `{x, y}`. Box points are sorted clock-wise.

</td></tr>
<tr><td>

<span id="click">[click(this, options)](./puppeteer.elementhandle.click.md)</span>

</td><td>

</td><td>

This method scrolls element into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to click in the center of the element. If the element is detached from DOM, the method throws an error.

</td></tr>
<tr><td>

<span id="clickablepoint">[clickablePoint(offset)](./puppeteer.elementhandle.clickablepoint.md)</span>

</td><td>

</td><td>

Returns the middle point within an element unless a specific offset is provided.

</td></tr>
<tr><td>

<span id="contentframe">[contentFrame(this)](./puppeteer.elementhandle.contentframe.md)</span>

</td><td>

</td><td>

Resolves the frame associated with the element, if any. Always exists for HTMLIFrameElements.

</td></tr>
<tr><td>

<span id="contentframe">[contentFrame()](./puppeteer.elementhandle.contentframe.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="drag">[drag(this, target)](./puppeteer.elementhandle.drag.md)</span>

</td><td>

</td><td>

Drags an element over the given element or point.

</td></tr>
<tr><td>

<span id="draganddrop">[dragAndDrop(this, target, options)](./puppeteer.elementhandle.draganddrop.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Use `ElementHandle.drop` instead.

</td></tr>
<tr><td>

<span id="dragenter">[dragEnter(this, data)](./puppeteer.elementhandle.dragenter.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Do not use. `dragenter` will automatically be performed during dragging.

</td></tr>
<tr><td>

<span id="dragover">[dragOver(this, data)](./puppeteer.elementhandle.dragover.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Do not use. `dragover` will automatically be performed during dragging.

</td></tr>
<tr><td>

<span id="drop">[drop(this, element)](./puppeteer.elementhandle.drop.md)</span>

</td><td>

</td><td>

Drops the given element onto the current one.

</td></tr>
<tr><td>

<span id="drop">[drop(this, data)](./puppeteer.elementhandle.drop.md#overload-2)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

No longer supported.

</td></tr>
<tr><td>

<span id="focus">[focus()](./puppeteer.elementhandle.focus.md)</span>

</td><td>

</td><td>

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

</td></tr>
<tr><td>

<span id="hover">[hover(this)](./puppeteer.elementhandle.hover.md)</span>

</td><td>

</td><td>

This method scrolls element into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to hover over the center of the element. If the element is detached from DOM, the method throws an error.

</td></tr>
<tr><td>

<span id="ishidden">[isHidden()](./puppeteer.elementhandle.ishidden.md)</span>

</td><td>

</td><td>

An element is considered to be hidden if at least one of the following is true:

- the element has no [computed styles](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

- the element has an empty [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

- the element's [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is `hidden` or `collapse`.

</td></tr>
<tr><td>

<span id="isintersectingviewport">[isIntersectingViewport(this, options)](./puppeteer.elementhandle.isintersectingviewport.md)</span>

</td><td>

</td><td>

Resolves to true if the element is visible in the current viewport. If an element is an SVG, we check if the svg owner element is in the viewport instead. See https://crbug.com/963246.

</td></tr>
<tr><td>

<span id="isvisible">[isVisible()](./puppeteer.elementhandle.isvisible.md)</span>

</td><td>

</td><td>

An element is considered to be visible if all of the following is true:

- the element has [computed styles](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

- the element has a non-empty [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

- the element's [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) is not `hidden` or `collapse`.

</td></tr>
<tr><td>

<span id="press">[press(key, options)](./puppeteer.elementhandle.press.md)</span>

</td><td>

</td><td>

Focuses the element, and then uses [Keyboard.down()](./puppeteer.keyboard.down.md) and [Keyboard.up()](./puppeteer.keyboard.up.md).

**Remarks:**

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also be generated. The `text` option can be specified to force an input event to be generated.

**NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift` will type the text in upper case.

</td></tr>
<tr><td>

<span id="screenshot">[screenshot(options)](./puppeteer.elementhandle.screenshot.md)</span>

</td><td>

</td><td>

This method scrolls element into view if needed, and then uses [Page.screenshot()](./puppeteer.page.screenshot.md#overload-2) to take a screenshot of the element. If the element is detached from DOM, the method throws an error.

</td></tr>
<tr><td>

<span id="screenshot">[screenshot(options)](./puppeteer.elementhandle.screenshot.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="scrollintoview">[scrollIntoView(this)](./puppeteer.elementhandle.scrollintoview.md)</span>

</td><td>

</td><td>

Scrolls the element into view using either the automation protocol client or by calling element.scrollIntoView.

</td></tr>
<tr><td>

<span id="select">[select(values)](./puppeteer.elementhandle.select.md)</span>

</td><td>

</td><td>

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

</td></tr>
<tr><td>

<span id="tap">[tap(this)](./puppeteer.elementhandle.tap.md)</span>

</td><td>

</td><td>

This method scrolls element into view if needed, and then uses [Touchscreen.tap()](./puppeteer.touchscreen.tap.md) to tap in the center of the element. If the element is detached from DOM, the method throws an error.

</td></tr>
<tr><td>

<span id="toelement">[toElement(tagName)](./puppeteer.elementhandle.toelement.md)</span>

</td><td>

</td><td>

Converts the current handle to the given element type.

</td></tr>
<tr><td>

<span id="touchend">[touchEnd(this)](./puppeteer.elementhandle.touchend.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="touchmove">[touchMove(this, touch)](./puppeteer.elementhandle.touchmove.md)</span>

</td><td>

</td><td>

This method scrolls the element into view if needed, and then moves the touch to the center of the element.

</td></tr>
<tr><td>

<span id="touchstart">[touchStart(this)](./puppeteer.elementhandle.touchstart.md)</span>

</td><td>

</td><td>

This method scrolls the element into view if needed, and then starts a touch in the center of the element.

</td></tr>
<tr><td>

<span id="type">[type(text, options)](./puppeteer.elementhandle.type.md)</span>

</td><td>

</td><td>

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [ElementHandle.press()](./puppeteer.elementhandle.press.md).

</td></tr>
<tr><td>

<span id="uploadfile">[uploadFile(this, paths)](./puppeteer.elementhandle.uploadfile.md)</span>

</td><td>

</td><td>

Sets the value of an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) to the given file paths.

**Remarks:**

This will not validate whether the file paths exists. Also, if a path is relative, then it is resolved against the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). For locals script connecting to remote chrome environments, paths must be absolute.

</td></tr>
<tr><td>

<span id="waitforselector">[waitForSelector(selector, options)](./puppeteer.elementhandle.waitforselector.md)</span>

</td><td>

</td><td>

Wait for an element matching the given selector to appear in the current element.

Unlike [Frame.waitForSelector()](./puppeteer.frame.waitforselector.md), this method does not work across navigations or if the element is detached from DOM.

</td></tr>
</tbody></table>

# ElementHandle.press() method

Source: https://pptr.dev/api/puppeteer.elementhandle.press

Focuses the element, and then uses [Keyboard.down()](./puppeteer.keyboard.down.md) and [Keyboard.up()](./puppeteer.keyboard.up.md).

### Signature

```typescript
class ElementHandle {
	press(key: KeyInput, options?: Readonly<KeyPressOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

[KeyInput](./puppeteer.keyinput.md)

</td><td>

Name of key to press, such as `ArrowLeft`. See [KeyInput](./puppeteer.keyinput.md) for a list of all key names.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyPressOptions](./puppeteer.keypressoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also be generated. The `text` option can be specified to force an input event to be generated.

**NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift` will type the text in upper case.

# ElementHandle.screenshot() method

Source: https://pptr.dev/api/puppeteer.elementhandle.screenshot

<h2 id="overload-1">screenshot(): Promise&lt;string&gt;</h2>

This method scrolls element into view if needed, and then uses [Page.screenshot()](./puppeteer.page.screenshot.md#overload-2) to take a screenshot of the element. If the element is detached from DOM, the method throws an error.

### Signature

```typescript
class ElementHandle {
	screenshot(
		options: Readonly<ScreenshotOptions> & {
			encoding: 'base64';
		},
	): Promise<string>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ScreenshotOptions](./puppeteer.screenshotoptions.md)&gt; &amp; &#123; encoding: 'base64'; &#125;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

<h2 id="overload-2">screenshot(): Promise&lt;Uint8Array&gt;</h2>

### Signature

```typescript
class ElementHandle {
	screenshot(options?: Readonly<ScreenshotOptions>): Promise<Uint8Array>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ScreenshotOptions](./puppeteer.screenshotoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Uint8Array&gt;

# ElementHandle.scrollIntoView() method

Source: https://pptr.dev/api/puppeteer.elementhandle.scrollintoview

Scrolls the element into view using either the automation protocol client or by calling element.scrollIntoView.

### Signature

```typescript
class ElementHandle {
	scrollIntoView(this: ElementHandle<Element>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.select() method

Source: https://pptr.dev/api/puppeteer.elementhandle.select

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

### Signature

```typescript
class ElementHandle {
	select(...values: string[]): Promise<string[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

values

</td><td>

string\[\]

</td><td>

Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string\[\]&gt;

## Example

```ts
handle.select('blue'); // single selection
handle.select('red', 'green', 'blue'); // multiple selections
```

# ElementHandle.tap() method

Source: https://pptr.dev/api/puppeteer.elementhandle.tap

This method scrolls element into view if needed, and then uses [Touchscreen.tap()](./puppeteer.touchscreen.tap.md) to tap in the center of the element. If the element is detached from DOM, the method throws an error.

### Signature

```typescript
class ElementHandle {
	tap(this: ElementHandle<Element>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.toElement() method

Source: https://pptr.dev/api/puppeteer.elementhandle.toelement

Converts the current handle to the given element type.

### Signature

```typescript
class ElementHandle {
	toElement<K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>(tagName: K): Promise<HandleFor<ElementFor<K>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

tagName

</td><td>

K

</td><td>

The tag name of the desired element type.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;[ElementFor](./puppeteer.elementfor.md)&lt;K&gt;&gt;&gt;

## Exceptions

An error if the handle does not match. **The handle will not be automatically disposed.**

## Example

```ts
const element: ElementHandle<Element> = await page.$('.class-name-of-anchor');
// DO NOT DISPOSE `element`, this will be always be the same handle.
const anchor: ElementHandle<HTMLAnchorElement> = await element.toElement('a');
```

# ElementHandle.touchEnd() method

Source: https://pptr.dev/api/puppeteer.elementhandle.touchend

### Signature

```typescript
class ElementHandle {
	touchEnd(this: ElementHandle<Element>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.touchMove() method

Source: https://pptr.dev/api/puppeteer.elementhandle.touchmove

This method scrolls the element into view if needed, and then moves the touch to the center of the element.

### Signature

```typescript
class ElementHandle {
	touchMove(this: ElementHandle<Element>, touch?: TouchHandle): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
<tr><td>

touch

</td><td>

[TouchHandle](./puppeteer.touchhandle.md)

</td><td>

_(Optional)_ An optional [TouchHandle](./puppeteer.touchhandle.md). If provided, this touch will be moved. If not provided, the first active touch will be moved.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# ElementHandle.touchStart() method

Source: https://pptr.dev/api/puppeteer.elementhandle.touchstart

This method scrolls the element into view if needed, and then starts a touch in the center of the element.

### Signature

```typescript
class ElementHandle {
	touchStart(this: ElementHandle<Element>): Promise<TouchHandle>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Element&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[TouchHandle](./puppeteer.touchhandle.md)&gt;

A [TouchHandle](./puppeteer.touchhandle.md) representing the touch that was started

# ElementHandle.type() method

Source: https://pptr.dev/api/puppeteer.elementhandle.type

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [ElementHandle.press()](./puppeteer.elementhandle.press.md).

### Signature

```typescript
class ElementHandle {
	type(text: string, options?: Readonly<KeyboardTypeOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

text

</td><td>

string

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)&gt;

</td><td>

_(Optional)_ Delay in milliseconds. Defaults to 0.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example 1

```ts
await elementHandle.type('Hello'); // Types instantly
await elementHandle.type('World', { delay: 100 }); // Types slower, like a user
```

## Example 2

An example of typing into a text field and then submitting the form:

```ts
const elementHandle = await page.$('input');
await elementHandle.type('some text');
await elementHandle.press('Enter');
```

# ElementHandle.uploadFile() method

Source: https://pptr.dev/api/puppeteer.elementhandle.uploadfile

Sets the value of an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) to the given file paths.

### Signature

```typescript
class ElementHandle {
	abstract uploadFile(this: ElementHandle<HTMLInputElement>, ...paths: string[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLInputElement&gt;

</td><td>

</td></tr>
<tr><td>

paths

</td><td>

string\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

This will not validate whether the file paths exists. Also, if a path is relative, then it is resolved against the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). For locals script connecting to remote chrome environments, paths must be absolute.

# ElementHandle.waitForSelector() method

Source: https://pptr.dev/api/puppeteer.elementhandle.waitforselector

Wait for an element matching the given selector to appear in the current element.

Unlike [Frame.waitForSelector()](./puppeteer.frame.waitforselector.md), this method does not work across navigations or if the element is detached from DOM.

### Signature

```typescript
class ElementHandle {
	waitForSelector<Selector extends string>(selector: Selector, options?: WaitForSelectorOptions): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

The selector to query and wait for.

</td></tr>
<tr><td>

options

</td><td>

[WaitForSelectorOptions](./puppeteer.waitforselectoroptions.md)

</td><td>

_(Optional)_ Options for customizing waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

An element matching the given selector.

## Exceptions

Throws if an element matching the given selector doesn't appear.

## Example

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
let currentURL;
page.mainFrame()
	.waitForSelector('img')
	.then(() => console.log('First URL with image: ' + currentURL));

for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
	await page.goto(currentURL);
}
await browser.close();
```

# ElementScreenshotOptions interface

Source: https://pptr.dev/api/puppeteer.elementscreenshotoptions

### Signature

```typescript
export interface ElementScreenshotOptions extends ScreenshotOptions
```

**Extends:** [ScreenshotOptions](./puppeteer.screenshotoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="scrollintoview">scrollIntoView</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

`true`

</td></tr>
</tbody></table>

# ErrorCode type

Source: https://pptr.dev/api/puppeteer.errorcode

### Signature

```typescript
export type ErrorCode = 'aborted' | 'accessdenied' | 'addressunreachable' | 'blockedbyclient' | 'blockedbyresponse' | 'connectionaborted' | 'connectionclosed' | 'connectionfailed' | 'connectionrefused' | 'connectionreset' | 'internetdisconnected' | 'namenotresolved' | 'timedout' | 'failed';
```

# EvaluateFunc type

Source: https://pptr.dev/api/puppeteer.evaluatefunc

### Signature

```typescript
export type EvaluateFunc<T extends unknown[]> = (...params: InnerParams<T>) => Awaitable<unknown>;
```

**References:** [InnerParams](./puppeteer.innerparams.md), [Awaitable](./puppeteer.awaitable.md)

# EvaluateFuncWith type

Source: https://pptr.dev/api/puppeteer.evaluatefuncwith

### Signature

```typescript
export type EvaluateFuncWith<V, T extends unknown[]> = (...params: [V, ...InnerParams<T>]) => Awaitable<unknown>;
```

**References:** [InnerParams](./puppeteer.innerparams.md), [Awaitable](./puppeteer.awaitable.md)

# EventEmitter.emit() method

Source: https://pptr.dev/api/puppeteer.eventemitter.emit

Emit an event and call any associated listeners.

### Signature

```typescript
class EventEmitter {
	emit<Key extends keyof EventsWithWildcard<Events>>(type: Key, event: EventsWithWildcard<Events>[Key]): boolean;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

the event you'd like to emit

</td></tr>
<tr><td>

event

</td><td>

[EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;\[Key\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

boolean

`true` if there are any listeners, `false` if there are not.

# EventEmitter.listenerCount() method

Source: https://pptr.dev/api/puppeteer.eventemitter.listenercount

Gets the number of listeners for a given event.

### Signature

```typescript
class EventEmitter {
	listenerCount(type: keyof EventsWithWildcard<Events>): number;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

keyof [EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;

</td><td>

the event to get the listener count for

</td></tr>
</tbody></table>

**Returns:**

number

the number of listeners bound to the given event

# EventEmitter class

Source: https://pptr.dev/api/puppeteer.eventemitter

The EventEmitter class that many Puppeteer classes extend.

### Signature

```typescript
export declare class EventEmitter<Events extends Record<EventType, unknown>> implements CommonEventEmitter<EventsWithWildcard<Events>>
```

**Implements:** [CommonEventEmitter](./puppeteer.commoneventemitter.md)&lt;[EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;&gt;

## Remarks

This allows you to listen to events that Puppeteer classes fire and act accordingly. Therefore you'll mostly use [on](./puppeteer.eventemitter.on.md) and [off](./puppeteer.eventemitter.off.md) to bind and unbind to event listeners.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `EventEmitter` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="emit">[emit(type, event)](./puppeteer.eventemitter.emit.md)</span>

</td><td>

</td><td>

Emit an event and call any associated listeners.

</td></tr>
<tr><td>

<span id="listenercount">[listenerCount(type)](./puppeteer.eventemitter.listenercount.md)</span>

</td><td>

</td><td>

Gets the number of listeners for a given event.

</td></tr>
<tr><td>

<span id="off">[off(type, handler)](./puppeteer.eventemitter.off.md)</span>

</td><td>

</td><td>

Remove an event listener from firing.

</td></tr>
<tr><td>

<span id="on">[on(type, handler)](./puppeteer.eventemitter.on.md)</span>

</td><td>

</td><td>

Bind an event listener to fire when an event occurs.

</td></tr>
<tr><td>

<span id="once">[once(type, handler)](./puppeteer.eventemitter.once.md)</span>

</td><td>

</td><td>

Like `on` but the listener will only be fired once and then it will be removed.

</td></tr>
<tr><td>

<span id="removealllisteners">[removeAllListeners(type)](./puppeteer.eventemitter.removealllisteners.md)</span>

</td><td>

</td><td>

Removes all listeners. If given an event argument, it will remove only listeners for that event.

</td></tr>
</tbody></table>

# EventEmitter.off() method

Source: https://pptr.dev/api/puppeteer.eventemitter.off

Remove an event listener from firing.

### Signature

```typescript
class EventEmitter {
	off<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler?: Handler<EventsWithWildcard<Events>[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

the event type you'd like to stop listening to.

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;[EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;\[Key\]&gt;

</td><td>

_(Optional)_ the function that should be removed.

</td></tr>
</tbody></table>

**Returns:**

this

`this` to enable you to chain method calls.

# EventEmitter.on() method

Source: https://pptr.dev/api/puppeteer.eventemitter.on

Bind an event listener to fire when an event occurs.

### Signature

```typescript
class EventEmitter {
	on<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler: Handler<EventsWithWildcard<Events>[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

the event type you'd like to listen to. Can be a string or symbol.

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;[EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;\[Key\]&gt;

</td><td>

the function to be called when the event occurs.

</td></tr>
</tbody></table>

**Returns:**

this

`this` to enable you to chain method calls.

# EventEmitter.once() method

Source: https://pptr.dev/api/puppeteer.eventemitter.once

Like `on` but the listener will only be fired once and then it will be removed.

### Signature

```typescript
class EventEmitter {
	once<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler: Handler<EventsWithWildcard<Events>[Key]>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Key

</td><td>

the event you'd like to listen to

</td></tr>
<tr><td>

handler

</td><td>

[Handler](./puppeteer.handler.md)&lt;[EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;\[Key\]&gt;

</td><td>

the handler function to run when the event occurs

</td></tr>
</tbody></table>

**Returns:**

this

`this` to enable you to chain method calls.

# EventEmitter.removeAllListeners() method

Source: https://pptr.dev/api/puppeteer.eventemitter.removealllisteners

Removes all listeners. If given an event argument, it will remove only listeners for that event.

### Signature

```typescript
class EventEmitter {
	removeAllListeners(type?: keyof EventsWithWildcard<Events>): this;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

keyof [EventsWithWildcard](./puppeteer.eventswithwildcard.md)&lt;Events&gt;

</td><td>

_(Optional)_ the event to remove listeners for.

</td></tr>
</tbody></table>

**Returns:**

this

`this` to enable you to chain method calls.

# EventsWithWildcard type

Source: https://pptr.dev/api/puppeteer.eventswithwildcard

### Signature

```typescript
export type EventsWithWildcard<Events extends Record<EventType, unknown>> = Events & {
	'*': Events[keyof Events];
};
```

**References:** [EventType](./puppeteer.eventtype.md)

# EventType type

Source: https://pptr.dev/api/puppeteer.eventtype

### Signature

```typescript
export type EventType = string | symbol;
```

# executablePath variable

Source: https://pptr.dev/api/puppeteer.executablepath

### Signature

```typescript
executablePath: {
    (channel: PuppeteerCore.ChromeReleaseChannel): string;
    (options: PuppeteerCore.LaunchOptions): string;
    (): string;
}
```

# ExperimentsConfiguration type

Source: https://pptr.dev/api/puppeteer.experimentsconfiguration

Defines experiment options for Puppeteer.

See individual properties for more information.

### Signature

```typescript
export type ExperimentsConfiguration = Record<string, never>;
```

# Extension class

Source: https://pptr.dev/api/puppeteer.extension

[Extension](./puppeteer.extension.md) represents a browser extension installed in the browser. It provides access to the extension's ID, name, and version, as well as methods for interacting with the extension's background workers and pages.

### Signature

```typescript
export declare abstract class Extension
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Extension` class.

## Example

To get all extensions installed in the browser:

```ts
const extensions = await browser.extensions();
for (const [id, extension] of extensions) {
	console.log(extension.name, id);
}
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="enabled">enabled</span>

</td><td>

`readonly`

</td><td>

boolean

</td><td>

Whether the extension is enabled.

</td></tr>
<tr><td>

<span id="id">id</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

The unique identifier of the extension.

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

The name of the extension as specified in its manifest.

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

The path in the file system where the extension is located.

</td></tr>
<tr><td>

<span id="version">version</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

The version of the extension as specified in its manifest.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="pages">[pages()](./puppeteer.extension.pages.md)</span>

</td><td>

</td><td>

Returns a list of the currently active and visible pages belonging to the extension.

</td></tr>
<tr><td>

<span id="triggeraction">[triggerAction(page)](./puppeteer.extension.triggeraction.md)</span>

</td><td>

</td><td>

Triggers the default action of the extension for a specified page. This typically simulates a user clicking the extension's action icon in the browser toolbar, potentially opening a popup or executing an action script.

</td></tr>
<tr><td>

<span id="workers">[workers()](./puppeteer.extension.workers.md)</span>

</td><td>

</td><td>

Returns a list of the currently active service workers belonging to the extension.

</td></tr>
</tbody></table>

# Extension.pages() method

Source: https://pptr.dev/api/puppeteer.extension.pages

Returns a list of the currently active and visible pages belonging to the extension.

### Signature

```typescript
class Extension {
	abstract pages(): Promise<Page[]>;
}
```

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)\[\]&gt;

# Extension.triggerAction() method

Source: https://pptr.dev/api/puppeteer.extension.triggeraction

Triggers the default action of the extension for a specified page. This typically simulates a user clicking the extension's action icon in the browser toolbar, potentially opening a popup or executing an action script.

### Signature

```typescript
class Extension {
	abstract triggerAction(page: Page): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

page

</td><td>

[Page](./puppeteer.page.md)

</td><td>

The page to trigger the action on.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Extension.workers() method

Source: https://pptr.dev/api/puppeteer.extension.workers

Returns a list of the currently active service workers belonging to the extension.

### Signature

```typescript
class Extension {
	abstract workers(): Promise<WebWorker[]>;
}
```

**Returns:**

Promise&lt;[WebWorker](./puppeteer.webworker.md)\[\]&gt;

# ExtensionTransport.close() method

Source: https://pptr.dev/api/puppeteer.extensiontransport.close

### Signature

```typescript
class ExtensionTransport {
	close(): void;
}
```

**Returns:**

void

# ExtensionTransport.connectTab() method

Source: https://pptr.dev/api/puppeteer.extensiontransport.connecttab

### Signature

```typescript
class ExtensionTransport {
	static connectTab(tabId: number): Promise<ExtensionTransport>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

tabId

</td><td>

number

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ExtensionTransport](./puppeteer.extensiontransport.md)&gt;

# ExtensionTransport class

Source: https://pptr.dev/api/puppeteer.extensiontransport

Experimental ExtensionTransport allows establishing a connection via chrome.debugger API if Puppeteer runs in an extension. Since Chrome DevTools Protocol is restricted for extensions, the transport implements missing commands and events.

### Signature

```typescript
export declare class ExtensionTransport implements ConnectionTransport
```

**Implements:** [ConnectionTransport](./puppeteer.connectiontransport.md)

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ExtensionTransport` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="onclose">onclose</span>

</td><td>

`optional`

</td><td>

() =&gt; void

</td><td>

</td></tr>
<tr><td>

<span id="onmessage">onmessage</span>

</td><td>

`optional`

</td><td>

(message: string) =&gt; void

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="close">[close()](./puppeteer.extensiontransport.close.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="connecttab">[connectTab(tabId)](./puppeteer.extensiontransport.connecttab.md)</span>

</td><td>

`static`

</td><td>

</td></tr>
<tr><td>

<span id="send">[send(message)](./puppeteer.extensiontransport.send.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ExtensionTransport.send() method

Source: https://pptr.dev/api/puppeteer.extensiontransport.send

### Signature

```typescript
class ExtensionTransport {
	send(message: string): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

message

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

void

# FileChooser.accept() method

Source: https://pptr.dev/api/puppeteer.filechooser.accept

Accept the file chooser request with the given file paths.

### Signature

```typescript
class FileChooser {
	accept(paths: string[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

paths

</td><td>

string\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

This will not validate whether the file paths exists. Also, if a path is relative, then it is resolved against the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). For locals script connecting to remote chrome environments, paths must be absolute.

# FileChooser.cancel() method

Source: https://pptr.dev/api/puppeteer.filechooser.cancel

Closes the file chooser without selecting any files.

### Signature

```typescript
class FileChooser {
	cancel(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# FileChooser.isMultiple() method

Source: https://pptr.dev/api/puppeteer.filechooser.ismultiple

Whether file chooser allow for [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple) file selection.

### Signature

```typescript
class FileChooser {
	isMultiple(): boolean;
}
```

**Returns:**

boolean

# FileChooser class

Source: https://pptr.dev/api/puppeteer.filechooser

File choosers let you react to the page requesting for a file.

### Signature

```typescript
export declare class FileChooser
```

## Remarks

`FileChooser` instances are returned via the [Page.waitForFileChooser()](./puppeteer.page.waitforfilechooser.md) method.

In browsers, only one file chooser can be opened at a time. All file choosers must be accepted or canceled. Not doing so will prevent subsequent file choosers from appearing.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `FileChooser` class.

## Example

```ts
const [fileChooser] = await Promise.all([
	page.waitForFileChooser(),
	page.click('#upload-file-button'), // some button that triggers file selection
]);
await fileChooser.accept(['/tmp/myfile.pdf']);
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="accept">[accept(paths)](./puppeteer.filechooser.accept.md)</span>

</td><td>

</td><td>

Accept the file chooser request with the given file paths.

**Remarks:**

This will not validate whether the file paths exists. Also, if a path is relative, then it is resolved against the [current working directory](https://nodejs.org/api/process.html#process_process_cwd). For locals script connecting to remote chrome environments, paths must be absolute.

</td></tr>
<tr><td>

<span id="cancel">[cancel()](./puppeteer.filechooser.cancel.md)</span>

</td><td>

</td><td>

Closes the file chooser without selecting any files.

</td></tr>
<tr><td>

<span id="ismultiple">[isMultiple()](./puppeteer.filechooser.ismultiple.md)</span>

</td><td>

</td><td>

Whether file chooser allow for [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple) file selection.

</td></tr>
</tbody></table>

# FirefoxSettings interface

Source: https://pptr.dev/api/puppeteer.firefoxsettings

### Signature

```typescript
export interface FirefoxSettings
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="downloadbaseurl">downloadBaseUrl</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies the URL prefix that is used to download the browser.

Can be overridden by `PUPPETEER_FIREFOX_DOWNLOAD_BASE_URL`.

**Remarks:**

This must include the protocol and may even need a path prefix. This must **not** include a trailing slash similar to the default.

</td><td>

https://archive.mozilla.org/pub/firefox/releases

</td></tr>
<tr><td>

<span id="skipdownload">skipDownload</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Tells Puppeteer to not download the browser during installation.

Can be overridden by `PUPPETEER_FIREFOX_SKIP_DOWNLOAD`.

</td><td>

true

</td></tr>
<tr><td>

<span id="version">version</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Specifies a certain version of the browser you'd like Puppeteer to use.

Can be overridden by `PUPPETEER_FIREFOX_VERSION`.

See [puppeteer.launch](./puppeteer.puppeteernode.launch.md) on how executable path is inferred.

</td><td>

The pinned browser version supported by the current Puppeteer version.

</td></tr>
</tbody></table>

# FlattenHandle type

Source: https://pptr.dev/api/puppeteer.flattenhandle

### Signature

```typescript
export type FlattenHandle<T> = T extends HandleOr<infer U> ? U : never;
```

**References:** [HandleOr](./puppeteer.handleor.md)

# Frame.$() method

Source: https://pptr.dev/api/puppeteer.frame._

Queries the frame for an element matching the given selector.

### Signature

```typescript
class Frame {
	$<Selector extends string>(selector: Selector): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

A [element handle](./puppeteer.elementhandle.md) to the first element matching the given selector. Otherwise, `null`.

# Frame.$$() method

Source: https://pptr.dev/api/puppeteer.frame.__

Queries the frame for all elements matching the given selector.

### Signature

```typescript
class Frame {
	$$<Selector extends string>(selector: Selector, options?: QueryOptions): Promise<Array<ElementHandle<NodeFor<Selector>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

options

</td><td>

[QueryOptions](./puppeteer.queryoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Array&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt;&gt;&gt;

An array of [element handles](./puppeteer.elementhandle.md) that point to elements matching the given selector.

# Frame.$$eval() method

Source: https://pptr.dev/api/puppeteer.frame.__eval

Runs the given function on an array of elements matching the given selector in the frame.

If the given function returns a promise, then this method will wait till the promise resolves.

### Signature

```typescript
class Frame {
	$$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<Array<NodeFor<Selector>>, Params> = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>>(selector: Selector, pageFunction: string | Func, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

string \| Func

</td><td>

The function to be evaluated in the frame's context. An array of elements matching the given selector will be passed to the function as its first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Additional arguments to pass to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

A promise to the result of the function.

## Example

```ts
const divsCounts = await frame.$$eval('div', (divs) => divs.length);
```

# Frame.$eval() method

Source: https://pptr.dev/api/puppeteer.frame._eval

Runs the given function on the first element matching the given selector in the frame.

If the given function returns a promise, then this method will wait till the promise resolves.

### Signature

```typescript
class Frame {
	$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: string | Func, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

string \| Func

</td><td>

The function to be evaluated in the frame's context. The first element matching the selector will be passed to the function as its first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Additional arguments to pass to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

A promise to the result of the function.

## Example

```ts
const searchValue = await frame.$eval('#search', (el) => el.value);
```

# Frame.addScriptTag() method

Source: https://pptr.dev/api/puppeteer.frame.addscripttag

Adds a `<script>` tag into the page with the desired url or content.

### Signature

```typescript
class Frame {
	addScriptTag(options: FrameAddScriptTagOptions): Promise<ElementHandle<HTMLScriptElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[FrameAddScriptTagOptions](./puppeteer.frameaddscripttagoptions.md)

</td><td>

Options for the script.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLScriptElement&gt;&gt;

An [element handle](./puppeteer.elementhandle.md) to the injected `<script>` element.

# Frame.addStyleTag() method

Source: https://pptr.dev/api/puppeteer.frame.addstyletag

<h2 id="overload-1">addStyleTag(): Promise&lt;ElementHandle&lt;HTMLStyleElement&gt;&gt;</h2>

Adds a `HTMLStyleElement` into the frame with the desired URL

### Signature

```typescript
class Frame {
	addStyleTag(options: Omit<FrameAddStyleTagOptions, 'url'>): Promise<ElementHandle<HTMLStyleElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Omit&lt;[FrameAddStyleTagOptions](./puppeteer.frameaddstyletagoptions.md), 'url'&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLStyleElement&gt;&gt;

An [element handle](./puppeteer.elementhandle.md) to the loaded `<style>` element.

<h2 id="overload-2">addStyleTag(): Promise&lt;ElementHandle&lt;HTMLLinkElement&gt;&gt;</h2>

Adds a `HTMLLinkElement` into the frame with the desired URL

### Signature

```typescript
class Frame {
	addStyleTag(options: FrameAddStyleTagOptions): Promise<ElementHandle<HTMLLinkElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[FrameAddStyleTagOptions](./puppeteer.frameaddstyletagoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLLinkElement&gt;&gt;

An [element handle](./puppeteer.elementhandle.md) to the loaded `<link>` element.

# Frame.childFrames() method

Source: https://pptr.dev/api/puppeteer.frame.childframes

An array of child frames.

### Signature

```typescript
class Frame {
	abstract childFrames(): Frame[];
}
```

**Returns:**

[Frame](./puppeteer.frame.md)\[\]

# Frame.click() method

Source: https://pptr.dev/api/puppeteer.frame.click

Clicks the first element found that matches `selector`.

### Signature

```typescript
class Frame {
	click(selector: string, options?: Readonly<ClickOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

The selector to query for.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[ClickOptions](./puppeteer.clickoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

If `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```ts
const [response] = await Promise.all([page.waitForNavigation(waitOptions), frame.click(selector, clickOptions)]);
```

# Frame.content() method

Source: https://pptr.dev/api/puppeteer.frame.content

The full HTML contents of the frame, including the DOCTYPE.

### Signature

```typescript
class Frame {
	content(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

# Frame.evaluate() method

Source: https://pptr.dev/api/puppeteer.frame.evaluate

Behaves identically to [Page.evaluate()](./puppeteer.page.evaluate.md) except it's run within the context of this frame.

See [Page.evaluate()](./puppeteer.page.evaluate.md) for details.

### Signature

```typescript
class Frame {
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

# Frame.evaluateHandle() method

Source: https://pptr.dev/api/puppeteer.frame.evaluatehandle

Behaves identically to [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md) except it's run within the context of this frame.

See [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md) for details.

### Signature

```typescript
class Frame {
	evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

# Frame.extensionRealms() method

Source: https://pptr.dev/api/puppeteer.frame.extensionrealms

Retrieves the list of extension execution realms associated with this frame. Extension execution realms are created by extension content scripts injected into the frame.

### Signature

```typescript
class Frame {
	abstract extensionRealms(): Realm[];
}
```

**Returns:**

[Realm](./puppeteer.realm.md)\[\]

# Frame.focus() method

Source: https://pptr.dev/api/puppeteer.frame.focus

Focuses the first element that matches the `selector`.

### Signature

```typescript
class Frame {
	focus(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

The selector to query for.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Exceptions

Throws if there's no element matching `selector`.

# Frame.frameElement() method

Source: https://pptr.dev/api/puppeteer.frame.frameelement

### Signature

```typescript
class Frame {
	frameElement(): Promise<HandleFor<HTMLIFrameElement> | null>;
}
```

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;HTMLIFrameElement&gt; \| null&gt;

The frame element associated with this frame (if any).

# Frame.goto() method

Source: https://pptr.dev/api/puppeteer.frame.goto

Navigates the frame or page to the given `url`.

### Signature

```typescript
class Frame {
	abstract goto(url: string, options?: GoToOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

url

</td><td>

string

</td><td>

URL to navigate the frame to. The URL should include scheme, e.g. `https://`

</td></tr>
<tr><td>

options

</td><td>

[GoToOptions](./puppeteer.gotooptions.md)

</td><td>

_(Optional)_ Options to configure waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

A promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

## Exceptions

If:

- there's an SSL error (e.g. in case of self-signed certificates).

- target URL is invalid.

- the timeout is exceeded during navigation.

- the remote server does not respond or is unreachable.

- the main resource failed to load.

- the URL is blocked by blocklist/allowlist rules.

## Remarks

Navigation to `about:blank` or navigation to the same URL with a different hash will succeed and return `null`.

:::warning

Headless shell mode doesn't support navigation to a PDF document. See the [upstream issue](https://crbug.com/761295).

:::

In headless shell, this method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error". The status code for such responses can be retrieved by calling [HTTPResponse.status()](./puppeteer.httpresponse.status.md).

# Frame.hover() method

Source: https://pptr.dev/api/puppeteer.frame.hover

Hovers the pointer over the center of the first element that matches the `selector`.

### Signature

```typescript
class Frame {
	hover(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

The selector to query for.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Exceptions

Throws if there's no element matching `selector`.

# Frame.isDetached() method

Source: https://pptr.dev/api/puppeteer.frame.isdetached

> Warning: This API is now obsolete.
>
> Use the `detached` getter.

Is`true` if the frame has been detached. Otherwise, `false`.

### Signature

```typescript
class Frame {
	isDetached(): boolean;
}
```

**Returns:**

boolean

# Frame.locator() method

Source: https://pptr.dev/api/puppeteer.frame.locator

<h2 id="overload-1">locator(): Locator&lt;NodeFor&lt;Selector&gt;&gt;</h2>

Creates a locator for the provided selector. See [Locator](./puppeteer.locator.md) for details and supported actions.

### Signature

```typescript
class Frame {
	locator<Selector extends string>(selector: Selector): Locator<NodeFor<Selector>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt;

<h2 id="overload-2">locator(): Locator&lt;Ret&gt;</h2>

Creates a locator for the provided function. See [Locator](./puppeteer.locator.md) for details and supported actions.

### Signature

```typescript
class Frame {
	locator<Ret>(func: () => Awaitable<Ret>): Locator<Ret>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

func

</td><td>

() =&gt; [Awaitable](./puppeteer.awaitable.md)&lt;Ret&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;Ret&gt;

# Frame class

Source: https://pptr.dev/api/puppeteer.frame

Represents a DOM frame.

To understand frames, you can think of frames as `<iframe>` elements. Just like iframes, frames can be nested, and when JavaScript is executed in a frame, the JavaScript does not affect frames inside the ambient frame the JavaScript executes in.

### Signature

```typescript
export declare abstract class Frame extends EventEmitter<FrameEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[FrameEvents](./puppeteer.frameevents.md)&gt;

## Remarks

Frame lifecycles are controlled by three events that are all dispatched on the parent [page](./puppeteer.frame.page.md):

- [PageEvent.FrameAttached](./puppeteer.pageevent.md) - [PageEvent.FrameNavigated](./puppeteer.pageevent.md) - [PageEvent.FrameDetached](./puppeteer.pageevent.md)

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Frame` class.

## Example 1

At any point in time, [pages](./puppeteer.page.md) expose their current frame tree via the [Page.mainFrame()](./puppeteer.page.mainframe.md) and [Frame.childFrames()](./puppeteer.frame.childframes.md) methods.

## Example 2

An example of dumping frame tree:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.google.com/chrome/browser/canary.html');
dumpFrameTree(page.mainFrame(), '');
await browser.close();

function dumpFrameTree(frame, indent) {
	console.log(indent + frame.url());
	for (const child of frame.childFrames()) {
		dumpFrameTree(child, indent + '  ');
	}
}
```

## Example 3

An example of getting text from an iframe element:

```ts
const frames = page.frames();
let frame = null;
for (const currentFrame of frames) {
	const frameElement = await currentFrame.frameElement();
	const name = await frameElement.evaluate((el) => el.getAttribute('name'));
	if (name === 'myframe') {
		frame = currentFrame;
		break;
	}
}
if (frame) {
	const text = await frame.$eval('.selector', (element) => element.textContent);
	console.log(text);
} else {
	console.error('Frame with name "myframe" not found.');
}
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="detached">detached</span>

</td><td>

`readonly`

</td><td>

boolean

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_">[$(selector)](./puppeteer.frame._.md)</span>

</td><td>

</td><td>

Queries the frame for an element matching the given selector.

</td></tr>
<tr><td>

<span id="__">[$$(selector, options)](./puppeteer.frame.__.md)</span>

</td><td>

</td><td>

Queries the frame for all elements matching the given selector.

</td></tr>
<tr><td>

<span id="__eval">[$$eval(selector, pageFunction, args)](./puppeteer.frame.__eval.md)</span>

</td><td>

</td><td>

Runs the given function on an array of elements matching the given selector in the frame.

If the given function returns a promise, then this method will wait till the promise resolves.

</td></tr>
<tr><td>

<span id="_eval">[$eval(selector, pageFunction, args)](./puppeteer.frame._eval.md)</span>

</td><td>

</td><td>

Runs the given function on the first element matching the given selector in the frame.

If the given function returns a promise, then this method will wait till the promise resolves.

</td></tr>
<tr><td>

<span id="addscripttag">[addScriptTag(options)](./puppeteer.frame.addscripttag.md)</span>

</td><td>

</td><td>

Adds a `<script>` tag into the page with the desired url or content.

</td></tr>
<tr><td>

<span id="addstyletag">[addStyleTag(options)](./puppeteer.frame.addstyletag.md)</span>

</td><td>

</td><td>

Adds a `HTMLStyleElement` into the frame with the desired URL

</td></tr>
<tr><td>

<span id="addstyletag">[addStyleTag(options)](./puppeteer.frame.addstyletag.md#overload-2)</span>

</td><td>

</td><td>

Adds a `HTMLLinkElement` into the frame with the desired URL

</td></tr>
<tr><td>

<span id="childframes">[childFrames()](./puppeteer.frame.childframes.md)</span>

</td><td>

</td><td>

An array of child frames.

</td></tr>
<tr><td>

<span id="click">[click(selector, options)](./puppeteer.frame.click.md)</span>

</td><td>

</td><td>

Clicks the first element found that matches `selector`.

**Remarks:**

If `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```ts
const [response] = await Promise.all([page.waitForNavigation(waitOptions), frame.click(selector, clickOptions)]);
```

</td></tr>
<tr><td>

<span id="content">[content()](./puppeteer.frame.content.md)</span>

</td><td>

</td><td>

The full HTML contents of the frame, including the DOCTYPE.

</td></tr>
<tr><td>

<span id="evaluate">[evaluate(pageFunction, args)](./puppeteer.frame.evaluate.md)</span>

</td><td>

</td><td>

Behaves identically to [Page.evaluate()](./puppeteer.page.evaluate.md) except it's run within the context of this frame.

See [Page.evaluate()](./puppeteer.page.evaluate.md) for details.

</td></tr>
<tr><td>

<span id="evaluatehandle">[evaluateHandle(pageFunction, args)](./puppeteer.frame.evaluatehandle.md)</span>

</td><td>

</td><td>

Behaves identically to [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md) except it's run within the context of this frame.

See [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md) for details.

</td></tr>
<tr><td>

<span id="extensionrealms">[extensionRealms()](./puppeteer.frame.extensionrealms.md)</span>

</td><td>

</td><td>

Retrieves the list of extension execution realms associated with this frame. Extension execution realms are created by extension content scripts injected into the frame.

</td></tr>
<tr><td>

<span id="focus">[focus(selector)](./puppeteer.frame.focus.md)</span>

</td><td>

</td><td>

Focuses the first element that matches the `selector`.

</td></tr>
<tr><td>

<span id="frameelement">[frameElement()](./puppeteer.frame.frameelement.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="goto">[goto(url, options)](./puppeteer.frame.goto.md)</span>

</td><td>

</td><td>

Navigates the frame or page to the given `url`.

**Remarks:**

Navigation to `about:blank` or navigation to the same URL with a different hash will succeed and return `null`.

:::warning

Headless shell mode doesn't support navigation to a PDF document. See the [upstream issue](https://crbug.com/761295).

:::

In headless shell, this method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error". The status code for such responses can be retrieved by calling [HTTPResponse.status()](./puppeteer.httpresponse.status.md).

</td></tr>
<tr><td>

<span id="hover">[hover(selector)](./puppeteer.frame.hover.md)</span>

</td><td>

</td><td>

Hovers the pointer over the center of the first element that matches the `selector`.

</td></tr>
<tr><td>

<span id="isdetached">[isDetached()](./puppeteer.frame.isdetached.md)</span>

</td><td>

`deprecated`

</td><td>

Is`true` if the frame has been detached. Otherwise, `false`.

**Deprecated:**

Use the `detached` getter.

</td></tr>
<tr><td>

<span id="locator">[locator(selector)](./puppeteer.frame.locator.md)</span>

</td><td>

</td><td>

Creates a locator for the provided selector. See [Locator](./puppeteer.locator.md) for details and supported actions.

</td></tr>
<tr><td>

<span id="locator">[locator(func)](./puppeteer.frame.locator.md#overload-2)</span>

</td><td>

</td><td>

Creates a locator for the provided function. See [Locator](./puppeteer.locator.md) for details and supported actions.

</td></tr>
<tr><td>

<span id="name">[name()](./puppeteer.frame.name.md)</span>

</td><td>

`deprecated`

</td><td>

The frame's `name` attribute as specified in the tag.

**Deprecated:**

Use

```ts
const element = await frame.frameElement();
const nameOrId = await element.evaluate((frame) => frame.name ?? frame.id);
```

**Remarks:**

This value is calculated once when the frame is created, and will not update if the attribute is changed later.

</td></tr>
<tr><td>

<span id="page">[page()](./puppeteer.frame.page.md)</span>

</td><td>

</td><td>

The page associated with the frame.

</td></tr>
<tr><td>

<span id="parentframe">[parentFrame()](./puppeteer.frame.parentframe.md)</span>

</td><td>

</td><td>

The parent frame, if any. Detached and main frames return `null`.

</td></tr>
<tr><td>

<span id="select">[select(selector, values)](./puppeteer.frame.select.md)</span>

</td><td>

</td><td>

Selects a set of value on the first `<select>` element that matches the `selector`.

</td></tr>
<tr><td>

<span id="setcontent">[setContent(html, options)](./puppeteer.frame.setcontent.md)</span>

</td><td>

</td><td>

Set the content of the frame.

</td></tr>
<tr><td>

<span id="tap">[tap(selector)](./puppeteer.frame.tap.md)</span>

</td><td>

</td><td>

Taps the first element that matches the `selector`.

</td></tr>
<tr><td>

<span id="title">[title()](./puppeteer.frame.title.md)</span>

</td><td>

</td><td>

The frame's title.

</td></tr>
<tr><td>

<span id="type">[type(selector, text, options)](./puppeteer.frame.type.md)</span>

</td><td>

</td><td>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

**Remarks:**

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.frame.url.md)</span>

</td><td>

</td><td>

The frame's URL.

</td></tr>
<tr><td>

<span id="waitforfunction">[waitForFunction(pageFunction, options, args)](./puppeteer.frame.waitforfunction.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="waitfornavigation">[waitForNavigation(options)](./puppeteer.frame.waitfornavigation.md)</span>

</td><td>

</td><td>

Waits for the frame to navigate. It is useful for when you run code which will indirectly cause the frame to navigate.

Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

</td></tr>
<tr><td>

<span id="waitforselector">[waitForSelector(selector, options)](./puppeteer.frame.waitforselector.md)</span>

</td><td>

</td><td>

Waits for an element matching the given selector to appear in the frame.

This method works across navigations.

</td></tr>
</tbody></table>

# Frame.name() method

Source: https://pptr.dev/api/puppeteer.frame.name

> Warning: This API is now obsolete.
>
> Use
>
> ```ts
> const element = await frame.frameElement();
> const nameOrId = await element.evaluate((frame) => frame.name ?? frame.id);
> ```

The frame's `name` attribute as specified in the tag.

### Signature

```typescript
class Frame {
	name(): string;
}
```

**Returns:**

string

## Remarks

This value is calculated once when the frame is created, and will not update if the attribute is changed later.

# Frame.page() method

Source: https://pptr.dev/api/puppeteer.frame.page

The page associated with the frame.

### Signature

```typescript
class Frame {
	abstract page(): Page;
}
```

**Returns:**

[Page](./puppeteer.page.md)

# Frame.parentFrame() method

Source: https://pptr.dev/api/puppeteer.frame.parentframe

The parent frame, if any. Detached and main frames return `null`.

### Signature

```typescript
class Frame {
	abstract parentFrame(): Frame | null;
}
```

**Returns:**

[Frame](./puppeteer.frame.md) \| null

# Frame.select() method

Source: https://pptr.dev/api/puppeteer.frame.select

Selects a set of value on the first `<select>` element that matches the `selector`.

### Signature

```typescript
class Frame {
	select(selector: string, ...values: string[]): Promise<string[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

The selector to query for.

</td></tr>
<tr><td>

values

</td><td>

string\[\]

</td><td>

The array of values to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string\[\]&gt;

the list of values that were successfully selected.

## Exceptions

Throws if there's no `<select>` matching `selector`.

## Example

```ts
frame.select('select#colors', 'blue'); // single selection
frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

# Frame.setContent() method

Source: https://pptr.dev/api/puppeteer.frame.setcontent

Set the content of the frame.

### Signature

```typescript
class Frame {
	abstract setContent(html: string, options?: SetContentWaitForOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

html

</td><td>

string

</td><td>

HTML markup to assign to the page.

</td></tr>
<tr><td>

options

</td><td>

[SetContentWaitForOptions](./puppeteer.setcontentwaitforoptions.md)

</td><td>

_(Optional)_ Options to configure how long before timing out and at what point to consider the content setting successful.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Frame.tap() method

Source: https://pptr.dev/api/puppeteer.frame.tap

Taps the first element that matches the `selector`.

### Signature

```typescript
class Frame {
	tap(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

The selector to query for.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Exceptions

Throws if there's no element matching `selector`.

# Frame.title() method

Source: https://pptr.dev/api/puppeteer.frame.title

The frame's title.

### Signature

```typescript
class Frame {
	title(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

# Frame.type() method

Source: https://pptr.dev/api/puppeteer.frame.type

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

### Signature

```typescript
class Frame {
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

the selector for the element to type into. If there are multiple the first will be used.

</td></tr>
<tr><td>

text

</td><td>

string

</td><td>

text to type into the element

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)&gt;

</td><td>

_(Optional)_ takes one option, `delay`, which sets the time to wait between key presses in milliseconds. Defaults to `0`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

## Example

```ts
await frame.type('#mytextarea', 'Hello'); // Types instantly
await frame.type('#mytextarea', 'World', { delay: 100 }); // Types slower, like a user
```

# Frame.url() method

Source: https://pptr.dev/api/puppeteer.frame.url

The frame's URL.

### Signature

```typescript
class Frame {
	abstract url(): string;
}
```

**Returns:**

string

# Frame.waitForFunction() method

Source: https://pptr.dev/api/puppeteer.frame.waitforfunction

### Signature

```typescript
class Frame {
	waitForFunction<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, options?: FrameWaitForFunctionOptions, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

the function to evaluate in the frame context.

</td></tr>
<tr><td>

options

</td><td>

[FrameWaitForFunctionOptions](./puppeteer.framewaitforfunctionoptions.md)

</td><td>

_(Optional)_ options to configure the polling method, timeout and signal.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

arguments to pass to the `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

the promise which resolve when the `pageFunction` returns a truthy value.

## Example

The `waitForFunction` can be used to observe viewport size change:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
page.setViewport({ width: 50, height: 50 });
await watchDog;
await browser.close();
```

To pass arguments from Node.js to the predicate of `page.waitForFunction` function:

```ts
const selector = '.foo';
await frame.waitForFunction(
	(selector) => !!document.querySelector(selector),
	{}, // empty options object
	selector,
);
```

# Frame.waitForNavigation() method

Source: https://pptr.dev/api/puppeteer.frame.waitfornavigation

Waits for the frame to navigate. It is useful for when you run code which will indirectly cause the frame to navigate.

Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

### Signature

```typescript
class Frame {
	abstract waitForNavigation(options?: WaitForOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitForOptions](./puppeteer.waitforoptions.md)

</td><td>

_(Optional)_ Options to configure waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

A promise which resolves to the main resource response.

## Example

```ts
const [response] = await Promise.all([
	// The navigation promise resolves after navigation has finished
	frame.waitForNavigation(),
	// Clicking the link will indirectly cause a navigation
	frame.click('a.my-link'),
]);
```

# Frame.waitForSelector() method

Source: https://pptr.dev/api/puppeteer.frame.waitforselector

Waits for an element matching the given selector to appear in the frame.

This method works across navigations.

### Signature

```typescript
class Frame {
	waitForSelector<Selector extends string>(selector: Selector, options?: WaitForSelectorOptions): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

The selector to query and wait for.

</td></tr>
<tr><td>

options

</td><td>

[WaitForSelectorOptions](./puppeteer.waitforselectoroptions.md)

</td><td>

_(Optional)_ Options for customizing waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

An element matching the given selector.

## Exceptions

Throws if an element matching the given selector doesn't appear.

## Example

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
let currentURL;
page.mainFrame()
	.waitForSelector('img')
	.then(() => console.log('First URL with image: ' + currentURL));

for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
	await page.goto(currentURL);
}
await browser.close();
```

# FrameAddScriptTagOptions interface

Source: https://pptr.dev/api/puppeteer.frameaddscripttagoptions

### Signature

```typescript
export interface FrameAddScriptTagOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="content">content</span>

</td><td>

`optional`

</td><td>

string

</td><td>

JavaScript to be injected into the frame.

</td><td>

</td></tr>
<tr><td>

<span id="id">id</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Sets the `id` of the script.

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Path to a JavaScript file to be injected into the frame.

**Remarks:**

If `path` is a relative path, it is resolved relative to the current working directory (`process.cwd()` in Node.js).

</td><td>

</td></tr>
<tr><td>

<span id="type">type</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Sets the `type` of the script. Use `module` in order to load an ES2015 module.

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

URL of the script to be added.

</td><td>

</td></tr>
</tbody></table>

# FrameAddStyleTagOptions interface

Source: https://pptr.dev/api/puppeteer.frameaddstyletagoptions

### Signature

```typescript
export interface FrameAddStyleTagOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="content">content</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Raw CSS content to be injected into the frame.

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The path to a CSS file to be injected into the frame.

**Remarks:**

If `path` is a relative path, it is resolved relative to the current working directory (`process.cwd()` in Node.js).

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

the URL of the CSS file to be added.

</td><td>

</td></tr>
</tbody></table>

# FrameEvents interface

Source: https://pptr.dev/api/puppeteer.frameevents

### Signature

```typescript
export interface FrameEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

# FrameWaitForFunctionOptions interface

Source: https://pptr.dev/api/puppeteer.framewaitforfunctionoptions

### Signature

```typescript
export interface FrameWaitForFunctionOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="polling">polling</span>

</td><td>

`optional`

</td><td>

'raf' \| 'mutation' \| number

</td><td>

An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:

- `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.

- `mutation` - to execute `pageFunction` on every DOM mutation.

</td><td>

</td></tr>
<tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal object that allows you to cancel a waitForFunction call.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum time to wait in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable the timeout. Puppeteer's default timeout can be changed using [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md).

</td><td>

</td></tr>
</tbody></table>

# GeolocationOptions interface

Source: https://pptr.dev/api/puppeteer.geolocationoptions

### Signature

```typescript
export interface GeolocationOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="accuracy">accuracy</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Optional non-negative accuracy value.

</td><td>

</td></tr>
<tr><td>

<span id="latitude">latitude</span>

</td><td>

</td><td>

number

</td><td>

Longitude between `-180` and `180`.

</td><td>

</td></tr>
<tr><td>

<span id="longitude">longitude</span>

</td><td>

</td><td>

number

</td><td>

Latitude between `-90` and `90`.

</td><td>

</td></tr>
</tbody></table>

# GoToOptions interface

Source: https://pptr.dev/api/puppeteer.gotooptions

### Signature

```typescript
export interface GoToOptions extends WaitForOptions
```

**Extends:** [WaitForOptions](./puppeteer.waitforoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="referer">referer</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If provided, it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](./puppeteer.page.setextrahttpheaders.md).

</td><td>

</td></tr>
<tr><td>

<span id="referrerpolicy">referrerPolicy</span>

</td><td>

`optional`

</td><td>

string

</td><td>

If provided, it will take preference over the referer-policy header value set by [page.setExtraHTTPHeaders()](./puppeteer.page.setextrahttpheaders.md).

</td><td>

</td></tr>
</tbody></table>

# HandleFor type

Source: https://pptr.dev/api/puppeteer.handlefor

### Signature

```typescript
export type HandleFor<T> = T extends Node ? ElementHandle<T> : JSHandle<T>;
```

**References:** [ElementHandle](./puppeteer.elementhandle.md), [JSHandle](./puppeteer.jshandle.md)

# HandleOr type

Source: https://pptr.dev/api/puppeteer.handleor

### Signature

```typescript
export type HandleOr<T> = HandleFor<T> | JSHandle<T> | T;
```

**References:** [HandleFor](./puppeteer.handlefor.md), [JSHandle](./puppeteer.jshandle.md)

# Handler type

Source: https://pptr.dev/api/puppeteer.handler

### Signature

```typescript
export type Handler<T = unknown> = (event: T) => void;
```

# HeapSnapshotOptions interface

Source: https://pptr.dev/api/puppeteer.heapsnapshotoptions

Options for [Page.captureHeapSnapshot()](./puppeteer.page.captureheapsnapshot.md).

### Signature

```typescript
export interface HeapSnapshotOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="path">path</span>

</td><td>

</td><td>

string

</td><td>

The file path to save the heap snapshot to.

</td><td>

</td></tr>
</tbody></table>

# HTTPRequest.abort() method

Source: https://pptr.dev/api/puppeteer.httprequest.abort

Aborts a request.

### Signature

```typescript
class HTTPRequest {
	abort(errorCode?: ErrorCode, priority?: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

errorCode

</td><td>

[ErrorCode](./puppeteer.errorcode.md)

</td><td>

_(Optional)_ optional error code to provide.

</td></tr>
<tr><td>

priority

</td><td>

number

</td><td>

_(Optional)_ If provided, intercept is resolved using cooperative handling rules. Otherwise, intercept is resolved immediately.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md). If it is not enabled, this method will throw an exception immediately.

# HTTPRequest.abortErrorReason() method

Source: https://pptr.dev/api/puppeteer.httprequest.aborterrorreason

The most recent reason for aborting the request

### Signature

```typescript
class HTTPRequest {
	abortErrorReason(): Protocol.Network.ErrorReason | null;
}
```

**Returns:**

Protocol.Network.ErrorReason \| null

# HTTPRequest.continue() method

Source: https://pptr.dev/api/puppeteer.httprequest.continue

Continues request with optional request overrides.

### Signature

```typescript
class HTTPRequest {
	continue(overrides?: ContinueRequestOverrides, priority?: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

overrides

</td><td>

[ContinueRequestOverrides](./puppeteer.continuerequestoverrides.md)

</td><td>

_(Optional)_ optional overrides to apply to the request.

</td></tr>
<tr><td>

priority

</td><td>

number

</td><td>

_(Optional)_ If provided, intercept is resolved using cooperative handling rules. Otherwise, intercept is resolved immediately.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md).

Exception is immediately thrown if the request interception is not enabled.

## Example

```ts
await page.setRequestInterception(true);
page.on('request', (request) => {
	// Override headers
	const headers = Object.assign({}, request.headers(), {
		foo: 'bar', // set "foo" header
		origin: undefined, // remove "origin" header
	});
	request.continue({ headers });
});
```

# HTTPRequest.continueRequestOverrides() method

Source: https://pptr.dev/api/puppeteer.httprequest.continuerequestoverrides

The `ContinueRequestOverrides` that will be used if the interception is allowed to continue (ie, `abort()` and `respond()` aren't called).

### Signature

```typescript
class HTTPRequest {
	continueRequestOverrides(): ContinueRequestOverrides;
}
```

**Returns:**

[ContinueRequestOverrides](./puppeteer.continuerequestoverrides.md)

# HTTPRequest.enqueueInterceptAction() method

Source: https://pptr.dev/api/puppeteer.httprequest.enqueueinterceptaction

Adds an async request handler to the processing queue. Deferred handlers are not guaranteed to execute in any particular order, but they are guaranteed to resolve before the request interception is finalized.

### Signature

```typescript
class HTTPRequest {
	enqueueInterceptAction(pendingHandler: () => void | PromiseLike<unknown>): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pendingHandler

</td><td>

() =&gt; void \| PromiseLike&lt;unknown&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

void

# HTTPRequest.failure() method

Source: https://pptr.dev/api/puppeteer.httprequest.failure

Access information about the request's failure.

### Signature

```typescript
class HTTPRequest {
	abstract failure(): {
		errorText: string;
	} | null;
}
```

**Returns:**

&#123; errorText: string; &#125; \| null

`null` unless the request failed. If the request fails this can return an object with `errorText` containing a human-readable error message, e.g. `net::ERR_FAILED`. It is not guaranteed that there will be failure text if the request fails.

## Remarks

## Example

Example of logging all failed requests:

```ts
page.on('requestfailed', (request) => {
	console.log(request.url() + ' ' + request.failure().errorText);
});
```

# HTTPRequest.fetchPostData() method

Source: https://pptr.dev/api/puppeteer.httprequest.fetchpostdata

Fetches the POST data for the request from the browser.

### Signature

```typescript
class HTTPRequest {
	abstract fetchPostData(): Promise<string | undefined>;
}
```

**Returns:**

Promise&lt;string \| undefined&gt;

# HTTPRequest.finalizeInterceptions() method

Source: https://pptr.dev/api/puppeteer.httprequest.finalizeinterceptions

Awaits pending interception handlers and then decides how to fulfill the request interception.

### Signature

```typescript
class HTTPRequest {
	finalizeInterceptions(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# HTTPRequest.frame() method

Source: https://pptr.dev/api/puppeteer.httprequest.frame

The frame that initiated the request, or null if navigating to error pages.

### Signature

```typescript
class HTTPRequest {
	abstract frame(): Frame | null;
}
```

**Returns:**

[Frame](./puppeteer.frame.md) \| null

# HTTPRequest.hasPostData() method

Source: https://pptr.dev/api/puppeteer.httprequest.haspostdata

True when the request has POST data. Note that [HTTPRequest.postData()](./puppeteer.httprequest.postdata.md) might still be undefined when this flag is true when the data is too long or not readily available in the decoded form. In that case, use [HTTPRequest.fetchPostData()](./puppeteer.httprequest.fetchpostdata.md).

### Signature

```typescript
class HTTPRequest {
	abstract hasPostData(): boolean;
}
```

**Returns:**

boolean

# HTTPRequest.headers() method

Source: https://pptr.dev/api/puppeteer.httprequest.headers

An object with HTTP headers associated with the request. All header names are lower-case.

### Signature

```typescript
class HTTPRequest {
	abstract headers(): Record<string, string>;
}
```

**Returns:**

Record&lt;string, string&gt;

# HTTPRequest.initiator() method

Source: https://pptr.dev/api/puppeteer.httprequest.initiator

The initiator of the request.

### Signature

```typescript
class HTTPRequest {
	abstract initiator(): Protocol.Network.Initiator | undefined;
}
```

**Returns:**

Protocol.Network.Initiator \| undefined

# HTTPRequest.interceptResolutionState() method

Source: https://pptr.dev/api/puppeteer.httprequest.interceptresolutionstate

An InterceptResolutionState object describing the current resolution action and priority.

InterceptResolutionState contains: action: InterceptResolutionAction priority?: number

InterceptResolutionAction is one of: `abort`, `respond`, `continue`, `disabled`, `none`, or `already-handled`.

### Signature

```typescript
class HTTPRequest {
	interceptResolutionState(): InterceptResolutionState;
}
```

**Returns:**

[InterceptResolutionState](./puppeteer.interceptresolutionstate.md)

# HTTPRequest.isInterceptResolutionHandled() method

Source: https://pptr.dev/api/puppeteer.httprequest.isinterceptresolutionhandled

Is `true` if the intercept resolution has already been handled, `false` otherwise.

### Signature

```typescript
class HTTPRequest {
	isInterceptResolutionHandled(): boolean;
}
```

**Returns:**

boolean

# HTTPRequest.isNavigationRequest() method

Source: https://pptr.dev/api/puppeteer.httprequest.isnavigationrequest

True if the request is the driver of the current frame's navigation.

### Signature

```typescript
class HTTPRequest {
	abstract isNavigationRequest(): boolean;
}
```

**Returns:**

boolean

# HTTPRequest class

Source: https://pptr.dev/api/puppeteer.httprequest

Represents an HTTP request sent by a page.

### Signature

```typescript
export declare abstract class HTTPRequest
```

## Remarks

Whenever the page sends a request, such as for a network resource, the following events are emitted by Puppeteer's `page`:

- `request`: emitted when the request is issued by the page.

- `requestfinished` - emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `requestfinished` event the `requestfailed` event is emitted.

All of these events provide an instance of `HTTPRequest` representing the request that occurred:

```
page.on('request', request => ...)
```

NOTE: HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `requestfinished` event.

If request gets a 'redirect' response, the request is successfully finished with the `requestfinished` event, and a new request is issued to a redirected url.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `HTTPRequest` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="client">client</span>

</td><td>

`readonly`

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

**_(Experimental)_** Warning! Using this client can break Puppeteer. Use with caution.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="abort">[abort(errorCode, priority)](./puppeteer.httprequest.abort.md)</span>

</td><td>

</td><td>

Aborts a request.

**Remarks:**

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md). If it is not enabled, this method will throw an exception immediately.

</td></tr>
<tr><td>

<span id="aborterrorreason">[abortErrorReason()](./puppeteer.httprequest.aborterrorreason.md)</span>

</td><td>

</td><td>

The most recent reason for aborting the request

</td></tr>
<tr><td>

<span id="continue">[continue(overrides, priority)](./puppeteer.httprequest.continue.md)</span>

</td><td>

</td><td>

Continues request with optional request overrides.

**Remarks:**

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md).

Exception is immediately thrown if the request interception is not enabled.

</td></tr>
<tr><td>

<span id="continuerequestoverrides">[continueRequestOverrides()](./puppeteer.httprequest.continuerequestoverrides.md)</span>

</td><td>

</td><td>

The `ContinueRequestOverrides` that will be used if the interception is allowed to continue (ie, `abort()` and `respond()` aren't called).

</td></tr>
<tr><td>

<span id="enqueueinterceptaction">[enqueueInterceptAction(pendingHandler)](./puppeteer.httprequest.enqueueinterceptaction.md)</span>

</td><td>

</td><td>

Adds an async request handler to the processing queue. Deferred handlers are not guaranteed to execute in any particular order, but they are guaranteed to resolve before the request interception is finalized.

</td></tr>
<tr><td>

<span id="failure">[failure()](./puppeteer.httprequest.failure.md)</span>

</td><td>

</td><td>

Access information about the request's failure.

**Remarks:**

</td></tr>
<tr><td>

<span id="fetchpostdata">[fetchPostData()](./puppeteer.httprequest.fetchpostdata.md)</span>

</td><td>

</td><td>

Fetches the POST data for the request from the browser.

</td></tr>
<tr><td>

<span id="finalizeinterceptions">[finalizeInterceptions()](./puppeteer.httprequest.finalizeinterceptions.md)</span>

</td><td>

</td><td>

Awaits pending interception handlers and then decides how to fulfill the request interception.

</td></tr>
<tr><td>

<span id="frame">[frame()](./puppeteer.httprequest.frame.md)</span>

</td><td>

</td><td>

The frame that initiated the request, or null if navigating to error pages.

</td></tr>
<tr><td>

<span id="haspostdata">[hasPostData()](./puppeteer.httprequest.haspostdata.md)</span>

</td><td>

</td><td>

True when the request has POST data. Note that [HTTPRequest.postData()](./puppeteer.httprequest.postdata.md) might still be undefined when this flag is true when the data is too long or not readily available in the decoded form. In that case, use [HTTPRequest.fetchPostData()](./puppeteer.httprequest.fetchpostdata.md).

</td></tr>
<tr><td>

<span id="headers">[headers()](./puppeteer.httprequest.headers.md)</span>

</td><td>

</td><td>

An object with HTTP headers associated with the request. All header names are lower-case.

</td></tr>
<tr><td>

<span id="initiator">[initiator()](./puppeteer.httprequest.initiator.md)</span>

</td><td>

</td><td>

The initiator of the request.

</td></tr>
<tr><td>

<span id="interceptresolutionstate">[interceptResolutionState()](./puppeteer.httprequest.interceptresolutionstate.md)</span>

</td><td>

</td><td>

An InterceptResolutionState object describing the current resolution action and priority.

InterceptResolutionState contains: action: InterceptResolutionAction priority?: number

InterceptResolutionAction is one of: `abort`, `respond`, `continue`, `disabled`, `none`, or `already-handled`.

</td></tr>
<tr><td>

<span id="isinterceptresolutionhandled">[isInterceptResolutionHandled()](./puppeteer.httprequest.isinterceptresolutionhandled.md)</span>

</td><td>

</td><td>

Is `true` if the intercept resolution has already been handled, `false` otherwise.

</td></tr>
<tr><td>

<span id="isnavigationrequest">[isNavigationRequest()](./puppeteer.httprequest.isnavigationrequest.md)</span>

</td><td>

</td><td>

True if the request is the driver of the current frame's navigation.

</td></tr>
<tr><td>

<span id="method">[method()](./puppeteer.httprequest.method.md)</span>

</td><td>

</td><td>

The method used (`GET`, `POST`, etc.)

</td></tr>
<tr><td>

<span id="postdata">[postData()](./puppeteer.httprequest.postdata.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Use [HTTPRequest.fetchPostData()](./puppeteer.httprequest.fetchpostdata.md).

</td></tr>
<tr><td>

<span id="redirectchain">[redirectChain()](./puppeteer.httprequest.redirectchain.md)</span>

</td><td>

</td><td>

A `redirectChain` is a chain of requests initiated to fetch a resource.

**Remarks:**

`redirectChain` is shared between all the requests of the same chain.

For example, if the website `http://example.com` has a single redirect to `https://example.com`, then the chain will contain one request:

```ts
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects, then the chain will be empty:

```ts
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

</td></tr>
<tr><td>

<span id="resourcetype">[resourceType()](./puppeteer.httprequest.resourcetype.md)</span>

</td><td>

</td><td>

Contains the request's resource type as it was perceived by the rendering engine.

</td></tr>
<tr><td>

<span id="respond">[respond(response, priority)](./puppeteer.httprequest.respond.md)</span>

</td><td>

</td><td>

Fulfills a request with the given response.

**Remarks:**

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md).

Exception is immediately thrown if the request interception is not enabled.

</td></tr>
<tr><td>

<span id="response">[response()](./puppeteer.httprequest.response.md)</span>

</td><td>

</td><td>

A matching `HTTPResponse` object, or null if the response has not been received yet.

</td></tr>
<tr><td>

<span id="responseforrequest">[responseForRequest()](./puppeteer.httprequest.responseforrequest.md)</span>

</td><td>

</td><td>

The `ResponseForRequest` that gets used if the interception is allowed to respond (ie, `abort()` is not called).

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.httprequest.url.md)</span>

</td><td>

</td><td>

The URL of the request

</td></tr>
</tbody></table>

# HTTPRequest.method() method

Source: https://pptr.dev/api/puppeteer.httprequest.method

The method used (`GET`, `POST`, etc.)

### Signature

```typescript
class HTTPRequest {
	abstract method(): string;
}
```

**Returns:**

string

# HTTPRequest.postData() method

Source: https://pptr.dev/api/puppeteer.httprequest.postdata

> Warning: This API is now obsolete.
>
> Use [HTTPRequest.fetchPostData()](./puppeteer.httprequest.fetchpostdata.md).

### Signature

```typescript
class HTTPRequest {
	abstract postData(): string | undefined;
}
```

**Returns:**

string \| undefined

# HTTPRequest.redirectChain() method

Source: https://pptr.dev/api/puppeteer.httprequest.redirectchain

A `redirectChain` is a chain of requests initiated to fetch a resource.

### Signature

```typescript
class HTTPRequest {
	abstract redirectChain(): HTTPRequest[];
}
```

**Returns:**

[HTTPRequest](./puppeteer.httprequest.md)\[\]

the chain of requests - if a server responds with at least a single redirect, this chain will contain all requests that were redirected.

## Remarks

`redirectChain` is shared between all the requests of the same chain.

For example, if the website `http://example.com` has a single redirect to `https://example.com`, then the chain will contain one request:

```ts
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects, then the chain will be empty:

```ts
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

# HTTPRequest.resourceType() method

Source: https://pptr.dev/api/puppeteer.httprequest.resourcetype

Contains the request's resource type as it was perceived by the rendering engine.

### Signature

```typescript
class HTTPRequest {
	abstract resourceType(): ResourceType;
}
```

**Returns:**

[ResourceType](./puppeteer.resourcetype.md)

# HTTPRequest.respond() method

Source: https://pptr.dev/api/puppeteer.httprequest.respond

Fulfills a request with the given response.

### Signature

```typescript
class HTTPRequest {
	respond(response: Partial<ResponseForRequest>, priority?: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

response

</td><td>

Partial&lt;[ResponseForRequest](./puppeteer.responseforrequest.md)&gt;

</td><td>

the response to fulfill the request with.

</td></tr>
<tr><td>

priority

</td><td>

number

</td><td>

_(Optional)_ If provided, intercept is resolved using cooperative handling rules. Otherwise, intercept is resolved immediately.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To use this, request interception should be enabled with [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md).

Exception is immediately thrown if the request interception is not enabled.

## Example

An example of fulfilling all requests with 404 responses:

```ts
await page.setRequestInterception(true);
page.on('request', (request) => {
	request.respond({
		status: 404,
		contentType: 'text/plain',
		body: 'Not Found!',
	});
});
```

NOTE: Mocking responses for dataURL requests is not supported. Calling `request.respond` for a dataURL request is a noop.

# HTTPRequest.response() method

Source: https://pptr.dev/api/puppeteer.httprequest.response

A matching `HTTPResponse` object, or null if the response has not been received yet.

### Signature

```typescript
class HTTPRequest {
	abstract response(): HTTPResponse | null;
}
```

**Returns:**

[HTTPResponse](./puppeteer.httpresponse.md) \| null

# HTTPRequest.responseForRequest() method

Source: https://pptr.dev/api/puppeteer.httprequest.responseforrequest

The `ResponseForRequest` that gets used if the interception is allowed to respond (ie, `abort()` is not called).

### Signature

```typescript
class HTTPRequest {
	responseForRequest(): Partial<ResponseForRequest> | null;
}
```

**Returns:**

Partial&lt;[ResponseForRequest](./puppeteer.responseforrequest.md)&gt; \| null

# HTTPRequest.url() method

Source: https://pptr.dev/api/puppeteer.httprequest.url

The URL of the request

### Signature

```typescript
class HTTPRequest {
	abstract url(): string;
}
```

**Returns:**

string

# HTTPResponse.buffer() method

Source: https://pptr.dev/api/puppeteer.httpresponse.buffer

Promise which resolves to a buffer with response body.

### Signature

```typescript
class HTTPResponse {
	buffer(): Promise<Buffer>;
}
```

**Returns:**

Promise&lt;Buffer&gt;

## Remarks

The buffer might be re-encoded by the browser based on HTTP-headers or other heuristics. If the browser failed to detect the correct encoding, the buffer might be encoded incorrectly. See https://github.com/puppeteer/puppeteer/issues/6478.

# HTTPResponse.content() method

Source: https://pptr.dev/api/puppeteer.httpresponse.content

Promise which resolves to a buffer with response body.

### Signature

```typescript
class HTTPResponse {
	abstract content(): Promise<Uint8Array>;
}
```

**Returns:**

Promise&lt;Uint8Array&gt;

## Remarks

The buffer might be re-encoded by the browser based on HTTP-headers or other heuristics. If the browser failed to detect the correct encoding, the buffer might be encoded incorrectly. See https://github.com/puppeteer/puppeteer/issues/6478.

# HTTPResponse.frame() method

Source: https://pptr.dev/api/puppeteer.httpresponse.frame

A [Frame](./puppeteer.frame.md) that initiated this response, or `null` if navigating to error pages.

### Signature

```typescript
class HTTPResponse {
	abstract frame(): Frame | null;
}
```

**Returns:**

[Frame](./puppeteer.frame.md) \| null

# HTTPResponse.fromCache() method

Source: https://pptr.dev/api/puppeteer.httpresponse.fromcache

True if the response was served from either the browser's disk cache or memory cache.

### Signature

```typescript
class HTTPResponse {
	abstract fromCache(): boolean;
}
```

**Returns:**

boolean

# HTTPResponse.fromServiceWorker() method

Source: https://pptr.dev/api/puppeteer.httpresponse.fromserviceworker

True if the response was served by a service worker.

### Signature

```typescript
class HTTPResponse {
	abstract fromServiceWorker(): boolean;
}
```

**Returns:**

boolean

# HTTPResponse.headers() method

Source: https://pptr.dev/api/puppeteer.httpresponse.headers

An object with HTTP headers associated with the response. All header names are lower-case.

### Signature

```typescript
class HTTPResponse {
	abstract headers(): Record<string, string>;
}
```

**Returns:**

Record&lt;string, string&gt;

# HTTPResponse.json() method

Source: https://pptr.dev/api/puppeteer.httpresponse.json

Promise which resolves to a JSON representation of response body.

### Signature

```typescript
class HTTPResponse {
	json(): Promise<any>;
}
```

**Returns:**

Promise&lt;any&gt;

## Remarks

This method will throw if the response body is not parsable via `JSON.parse`.

# HTTPResponse class

Source: https://pptr.dev/api/puppeteer.httpresponse

The HTTPResponse class represents responses which are received by the [Page](./puppeteer.page.md) class.

### Signature

```typescript
export declare abstract class HTTPResponse
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `HTTPResponse` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="buffer">[buffer()](./puppeteer.httpresponse.buffer.md)</span>

</td><td>

</td><td>

Promise which resolves to a buffer with response body.

**Remarks:**

The buffer might be re-encoded by the browser based on HTTP-headers or other heuristics. If the browser failed to detect the correct encoding, the buffer might be encoded incorrectly. See https://github.com/puppeteer/puppeteer/issues/6478.

</td></tr>
<tr><td>

<span id="content">[content()](./puppeteer.httpresponse.content.md)</span>

</td><td>

</td><td>

Promise which resolves to a buffer with response body.

**Remarks:**

The buffer might be re-encoded by the browser based on HTTP-headers or other heuristics. If the browser failed to detect the correct encoding, the buffer might be encoded incorrectly. See https://github.com/puppeteer/puppeteer/issues/6478.

</td></tr>
<tr><td>

<span id="frame">[frame()](./puppeteer.httpresponse.frame.md)</span>

</td><td>

</td><td>

A [Frame](./puppeteer.frame.md) that initiated this response, or `null` if navigating to error pages.

</td></tr>
<tr><td>

<span id="fromcache">[fromCache()](./puppeteer.httpresponse.fromcache.md)</span>

</td><td>

</td><td>

True if the response was served from either the browser's disk cache or memory cache.

</td></tr>
<tr><td>

<span id="fromserviceworker">[fromServiceWorker()](./puppeteer.httpresponse.fromserviceworker.md)</span>

</td><td>

</td><td>

True if the response was served by a service worker.

</td></tr>
<tr><td>

<span id="headers">[headers()](./puppeteer.httpresponse.headers.md)</span>

</td><td>

</td><td>

An object with HTTP headers associated with the response. All header names are lower-case.

</td></tr>
<tr><td>

<span id="json">[json()](./puppeteer.httpresponse.json.md)</span>

</td><td>

</td><td>

Promise which resolves to a JSON representation of response body.

**Remarks:**

This method will throw if the response body is not parsable via `JSON.parse`.

</td></tr>
<tr><td>

<span id="ok">[ok()](./puppeteer.httpresponse.ok.md)</span>

</td><td>

</td><td>

True if the response was successful (status in the range 200-299).

</td></tr>
<tr><td>

<span id="remoteaddress">[remoteAddress()](./puppeteer.httpresponse.remoteaddress.md)</span>

</td><td>

</td><td>

The IP address and port number used to connect to the remote server.

</td></tr>
<tr><td>

<span id="request">[request()](./puppeteer.httpresponse.request.md)</span>

</td><td>

</td><td>

A matching [HTTPRequest](./puppeteer.httprequest.md) object.

</td></tr>
<tr><td>

<span id="securitydetails">[securityDetails()](./puppeteer.httpresponse.securitydetails.md)</span>

</td><td>

</td><td>

[SecurityDetails](./puppeteer.securitydetails.md) if the response was received over the secure connection, or `null` otherwise.

</td></tr>
<tr><td>

<span id="status">[status()](./puppeteer.httpresponse.status.md)</span>

</td><td>

</td><td>

The status code of the response (e.g., 200 for a success).

</td></tr>
<tr><td>

<span id="statustext">[statusText()](./puppeteer.httpresponse.statustext.md)</span>

</td><td>

</td><td>

The status text of the response (e.g. usually an "OK" for a success).

</td></tr>
<tr><td>

<span id="text">[text()](./puppeteer.httpresponse.text.md)</span>

</td><td>

</td><td>

Promise which resolves to a text (utf8) representation of response body.

**Remarks:**

This method will throw if the content is not utf-8 string

</td></tr>
<tr><td>

<span id="timing">[timing()](./puppeteer.httpresponse.timing.md)</span>

</td><td>

</td><td>

Timing information related to the response.

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.httpresponse.url.md)</span>

</td><td>

</td><td>

The URL of the response.

</td></tr>
</tbody></table>

# HTTPResponse.ok() method

Source: https://pptr.dev/api/puppeteer.httpresponse.ok

True if the response was successful (status in the range 200-299).

### Signature

```typescript
class HTTPResponse {
	ok(): boolean;
}
```

**Returns:**

boolean

# HTTPResponse.remoteAddress() method

Source: https://pptr.dev/api/puppeteer.httpresponse.remoteaddress

The IP address and port number used to connect to the remote server.

### Signature

```typescript
class HTTPResponse {
	abstract remoteAddress(): RemoteAddress;
}
```

**Returns:**

[RemoteAddress](./puppeteer.remoteaddress.md)

# HTTPResponse.request() method

Source: https://pptr.dev/api/puppeteer.httpresponse.request

A matching [HTTPRequest](./puppeteer.httprequest.md) object.

### Signature

```typescript
class HTTPResponse {
	abstract request(): HTTPRequest;
}
```

**Returns:**

[HTTPRequest](./puppeteer.httprequest.md)

# HTTPResponse.securityDetails() method

Source: https://pptr.dev/api/puppeteer.httpresponse.securitydetails

[SecurityDetails](./puppeteer.securitydetails.md) if the response was received over the secure connection, or `null` otherwise.

### Signature

```typescript
class HTTPResponse {
	abstract securityDetails(): SecurityDetails | null;
}
```

**Returns:**

[SecurityDetails](./puppeteer.securitydetails.md) \| null

# HTTPResponse.status() method

Source: https://pptr.dev/api/puppeteer.httpresponse.status

The status code of the response (e.g., 200 for a success).

### Signature

```typescript
class HTTPResponse {
	abstract status(): number;
}
```

**Returns:**

number

# HTTPResponse.statusText() method

Source: https://pptr.dev/api/puppeteer.httpresponse.statustext

The status text of the response (e.g. usually an "OK" for a success).

### Signature

```typescript
class HTTPResponse {
	abstract statusText(): string;
}
```

**Returns:**

string

# HTTPResponse.text() method

Source: https://pptr.dev/api/puppeteer.httpresponse.text

Promise which resolves to a text (utf8) representation of response body.

### Signature

```typescript
class HTTPResponse {
	text(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

## Remarks

This method will throw if the content is not utf-8 string

# HTTPResponse.timing() method

Source: https://pptr.dev/api/puppeteer.httpresponse.timing

Timing information related to the response.

### Signature

```typescript
class HTTPResponse {
	abstract timing(): Protocol.Network.ResourceTiming | null;
}
```

**Returns:**

Protocol.Network.ResourceTiming \| null

# HTTPResponse.url() method

Source: https://pptr.dev/api/puppeteer.httpresponse.url

The URL of the response.

### Signature

```typescript
class HTTPResponse {
	abstract url(): string;
}
```

**Returns:**

string

# ImageFormat type

Source: https://pptr.dev/api/puppeteer.imageformat

### Signature

```typescript
export type ImageFormat = 'png' | 'jpeg' | 'webp';
```

# InnerParams type

Source: https://pptr.dev/api/puppeteer.innerparams

### Signature

```typescript
export type InnerParams<T extends unknown[]> = {
	[K in keyof T]: FlattenHandle<T[K]>;
};
```

**References:** [FlattenHandle](./puppeteer.flattenhandle.md)

# InterceptResolutionAction enum

Source: https://pptr.dev/api/puppeteer.interceptresolutionaction

### Signature

```typescript
export declare enum InterceptResolutionAction
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Abort

</td><td>

`"abort"`

</td><td>

</td></tr>
<tr><td>

AlreadyHandled

</td><td>

`"already-handled"`

</td><td>

</td></tr>
<tr><td>

Continue

</td><td>

`"continue"`

</td><td>

</td></tr>
<tr><td>

Disabled

</td><td>

`"disabled"`

</td><td>

</td></tr>
<tr><td>

None

</td><td>

`"none"`

</td><td>

</td></tr>
<tr><td>

Respond

</td><td>

`"respond"`

</td><td>

</td></tr>
</tbody></table>

# InterceptResolutionState interface

Source: https://pptr.dev/api/puppeteer.interceptresolutionstate

### Signature

```typescript
export interface InterceptResolutionState
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="action">action</span>

</td><td>

</td><td>

[InterceptResolutionAction](./puppeteer.interceptresolutionaction.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="priority">priority</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# InternalNetworkConditions interface

Source: https://pptr.dev/api/puppeteer.internalnetworkconditions

### Signature

```typescript
export interface InternalNetworkConditions extends NetworkConditions
```

**Extends:** [NetworkConditions](./puppeteer.networkconditions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="offline">offline</span>

</td><td>

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Issue interface

Source: https://pptr.dev/api/puppeteer.issue

The Issue interface represents a DevTools issue.

### Signature

```typescript
export interface Issue
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="code">code</span>

</td><td>

</td><td>

string

</td><td>

The code of the issue.

</td><td>

</td></tr>
<tr><td>

<span id="details">details</span>

</td><td>

</td><td>

Protocol.Audits.InspectorIssueDetails

</td><td>

The details of the issue.

</td><td>

</td></tr>
</tbody></table>

# JSCoverage class

Source: https://pptr.dev/api/puppeteer.jscoverage

### Signature

```typescript
export declare class JSCoverage
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `JSCoverage` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="start">[start(options)](./puppeteer.jscoverage.start.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="stop">[stop()](./puppeteer.jscoverage.stop.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# JSCoverage.start() method

Source: https://pptr.dev/api/puppeteer.jscoverage.start

### Signature

```typescript
class JSCoverage {
	start(options?: { resetOnNavigation?: boolean; reportAnonymousScripts?: boolean; includeRawScriptCoverage?: boolean; useBlockCoverage?: boolean }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; resetOnNavigation?: boolean; reportAnonymousScripts?: boolean; includeRawScriptCoverage?: boolean; useBlockCoverage?: boolean; &#125;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# JSCoverage.stop() method

Source: https://pptr.dev/api/puppeteer.jscoverage.stop

### Signature

```typescript
class JSCoverage {
	stop(): Promise<JSCoverageEntry[]>;
}
```

**Returns:**

Promise&lt;[JSCoverageEntry](./puppeteer.jscoverageentry.md)\[\]&gt;

# JSCoverageEntry interface

Source: https://pptr.dev/api/puppeteer.jscoverageentry

The CoverageEntry class for JavaScript

### Signature

```typescript
export interface JSCoverageEntry extends CoverageEntry
```

**Extends:** [CoverageEntry](./puppeteer.coverageentry.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="rawscriptcoverage">rawScriptCoverage</span>

</td><td>

`optional`

</td><td>

Protocol.Profiler.ScriptCoverage

</td><td>

Raw V8 script coverage entry.

</td><td>

</td></tr>
</tbody></table>

# JSCoverageOptions interface

Source: https://pptr.dev/api/puppeteer.jscoverageoptions

Set of configurable options for JS coverage.

### Signature

```typescript
export interface JSCoverageOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="includerawscriptcoverage">includeRawScriptCoverage</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether the result includes raw V8 script coverage entries.

</td><td>

</td></tr>
<tr><td>

<span id="reportanonymousscripts">reportAnonymousScripts</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether anonymous scripts generated by the page should be reported.

</td><td>

</td></tr>
<tr><td>

<span id="resetonnavigation">resetOnNavigation</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to reset coverage on every navigation.

</td><td>

</td></tr>
<tr><td>

<span id="useblockcoverage">useBlockCoverage</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to collect coverage information at the block level. If true, coverage will be collected at the block level (this is the default). If false, coverage will be collected at the function level.

</td><td>

</td></tr>
</tbody></table>

# JSHandle.asElement() method

Source: https://pptr.dev/api/puppeteer.jshandle.aselement

Either `null` or the handle itself if the handle is an instance of [ElementHandle](./puppeteer.elementhandle.md).

### Signature

```typescript
class JSHandle {
	abstract asElement(): ElementHandle<Node> | null;
}
```

**Returns:**

[ElementHandle](./puppeteer.elementhandle.md)&lt;Node&gt; \| null

# JSHandle.dispose() method

Source: https://pptr.dev/api/puppeteer.jshandle.dispose

Releases the object referenced by the handle for garbage collection.

### Signature

```typescript
class JSHandle {
	abstract dispose(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# JSHandle.evaluate() method

Source: https://pptr.dev/api/puppeteer.jshandle.evaluate

Evaluates the given function with the current handle as its first argument.

### Signature

```typescript
class JSHandle {
	evaluate<Params extends unknown[], Func extends EvaluateFuncWith<T, Params> = EvaluateFuncWith<T, Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

# JSHandle.evaluateHandle() method

Source: https://pptr.dev/api/puppeteer.jshandle.evaluatehandle

Evaluates the given function with the current handle as its first argument.

### Signature

```typescript
class JSHandle {
	evaluateHandle<Params extends unknown[], Func extends EvaluateFuncWith<T, Params> = EvaluateFuncWith<T, Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

# JSHandle.getProperties() method

Source: https://pptr.dev/api/puppeteer.jshandle.getproperties

Gets a map of handles representing the properties of the current handle.

### Signature

```typescript
class JSHandle {
	getProperties(): Promise<Map<string, JSHandle>>;
}
```

**Returns:**

Promise&lt;Map&lt;string, [JSHandle](./puppeteer.jshandle.md)&gt;&gt;

## Example

```ts
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
	const element = property.asElement();
	if (element) {
		children.push(element);
	}
}
children; // holds elementHandles to all children of document.body
```

# JSHandle.getProperty() method

Source: https://pptr.dev/api/puppeteer.jshandle.getproperty

<h2 id="overload-1">getProperty(): Promise&lt;HandleFor&lt;T\[K\]&gt;&gt;</h2>

Fetches a single property from the referenced object.

### Signature

```typescript
class JSHandle {
	getProperty<K extends keyof T>(propertyName: HandleOr<K>): Promise<HandleFor<T[K]>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

propertyName

</td><td>

[HandleOr](./puppeteer.handleor.md)&lt;K&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;T\[K\]&gt;&gt;

<h2 id="overload-2">getProperty(): Promise&lt;JSHandle&lt;unknown&gt;&gt;</h2>

### Signature

```typescript
class JSHandle {
	getProperty(propertyName: string): Promise<JSHandle<unknown>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

propertyName

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[JSHandle](./puppeteer.jshandle.md)&lt;unknown&gt;&gt;

# JSHandle.jsonValue() method

Source: https://pptr.dev/api/puppeteer.jshandle.jsonvalue

A vanilla object representing the serializable portions of the referenced object.

### Signature

```typescript
class JSHandle {
	abstract jsonValue(): Promise<T>;
}
```

**Returns:**

Promise&lt;T&gt;

## Exceptions

Throws if the object cannot be serialized due to circularity.

## Remarks

If the object has a `toJSON` function, it **will not** be called.

# JSHandle class

Source: https://pptr.dev/api/puppeteer.jshandle

Represents a reference to a JavaScript object. Instances can be created using [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md).

Handles prevent the referenced JavaScript object from being garbage-collected unless the handle is purposely [disposed](./puppeteer.jshandle.dispose.md). JSHandles are auto-disposed when their associated frame is navigated away or the parent context gets destroyed.

Handles can be used as arguments for any evaluation function such as [Page.$eval()](./puppeteer.page._eval.md), [Page.evaluate()](./puppeteer.page.evaluate.md), and [Page.evaluateHandle()](./puppeteer.page.evaluatehandle.md). They are resolved to their referenced object.

### Signature

```typescript
export declare abstract class JSHandle<T = unknown>
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `JSHandle` class.

## Example

```ts
const windowHandle = await page.evaluateHandle(() => window);
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_">\_</span>

</td><td>

`optional`

</td><td>

T

</td><td>

Used for nominally typing [JSHandle](./puppeteer.jshandle.md).

</td></tr>
<tr><td>

<span id="move">move</span>

</td><td>

</td><td>

() =&gt; this

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="aselement">[asElement()](./puppeteer.jshandle.aselement.md)</span>

</td><td>

</td><td>

Either `null` or the handle itself if the handle is an instance of [ElementHandle](./puppeteer.elementhandle.md).

</td></tr>
<tr><td>

<span id="dispose">[dispose()](./puppeteer.jshandle.dispose.md)</span>

</td><td>

</td><td>

Releases the object referenced by the handle for garbage collection.

</td></tr>
<tr><td>

<span id="evaluate">[evaluate(pageFunction, args)](./puppeteer.jshandle.evaluate.md)</span>

</td><td>

</td><td>

Evaluates the given function with the current handle as its first argument.

</td></tr>
<tr><td>

<span id="evaluatehandle">[evaluateHandle(pageFunction, args)](./puppeteer.jshandle.evaluatehandle.md)</span>

</td><td>

</td><td>

Evaluates the given function with the current handle as its first argument.

</td></tr>
<tr><td>

<span id="getproperties">[getProperties()](./puppeteer.jshandle.getproperties.md)</span>

</td><td>

</td><td>

Gets a map of handles representing the properties of the current handle.

</td></tr>
<tr><td>

<span id="getproperty">[getProperty(propertyName)](./puppeteer.jshandle.getproperty.md)</span>

</td><td>

</td><td>

Fetches a single property from the referenced object.

</td></tr>
<tr><td>

<span id="getproperty">[getProperty(propertyName)](./puppeteer.jshandle.getproperty.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="jsonvalue">[jsonValue()](./puppeteer.jshandle.jsonvalue.md)</span>

</td><td>

</td><td>

A vanilla object representing the serializable portions of the referenced object.

**Remarks:**

If the object has a `toJSON` function, it **will not** be called.

</td></tr>
<tr><td>

<span id="remoteobject">[remoteObject()](./puppeteer.jshandle.remoteobject.md)</span>

</td><td>

</td><td>

Provides access to the [Protocol.Runtime.RemoteObject](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) backing this handle.

</td></tr>
<tr><td>

<span id="tostring">[toString()](./puppeteer.jshandle.tostring.md)</span>

</td><td>

</td><td>

Returns a string representation of the JSHandle.

**Remarks:**

Useful during debugging.

</td></tr>
</tbody></table>

# JSHandle.remoteObject() method

Source: https://pptr.dev/api/puppeteer.jshandle.remoteobject

Provides access to the [Protocol.Runtime.RemoteObject](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) backing this handle.

### Signature

```typescript
class JSHandle {
	abstract remoteObject(): Protocol.Runtime.RemoteObject;
}
```

**Returns:**

Protocol.Runtime.RemoteObject

# JSHandle.toString() method

Source: https://pptr.dev/api/puppeteer.jshandle.tostring

Returns a string representation of the JSHandle.

### Signature

```typescript
class JSHandle {
	abstract toString(): string;
}
```

**Returns:**

string

## Remarks

Useful during debugging.

# Keyboard.down() method

Source: https://pptr.dev/api/puppeteer.keyboard.down

Dispatches a `keydown` event.

### Signature

```typescript
class Keyboard {
	abstract down(key: KeyInput, options?: Readonly<KeyDownOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

[KeyInput](./puppeteer.keyinput.md)

</td><td>

Name of key to press, such as `ArrowLeft`. See [KeyInput](./puppeteer.keyinput.md) for a list of all key names.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyDownOptions](./puppeteer.keydownoptions.md)&gt;

</td><td>

_(Optional)_ An object of options. Accepts text which, if specified, generates an input event with this text. Accepts commands which, if specified, is the commands of keyboard shortcuts, see [Chromium Source Code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h) for valid command names.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated. If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier active. To release the modifier key, use [Keyboard.up()](./puppeteer.keyboard.up.md).

After the key is pressed once, subsequent calls to [Keyboard.down()](./puppeteer.keyboard.down.md) will have [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use [Keyboard.up()](./puppeteer.keyboard.up.md).

Modifier keys DO influence [Keyboard.down()](./puppeteer.keyboard.down.md). Holding down `Shift` will type the text in upper case.

# Keyboard class

Source: https://pptr.dev/api/puppeteer.keyboard

Keyboard provides an api for managing a virtual keyboard. The high level api is [Keyboard.type()](./puppeteer.keyboard.type.md), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

### Signature

```typescript
export declare abstract class Keyboard
```

## Remarks

For finer control, you can use [Keyboard.down()](./puppeteer.keyboard.down.md), [Keyboard.up()](./puppeteer.keyboard.up.md), and [Keyboard.sendCharacter()](./puppeteer.keyboard.sendcharacter.md) to manually fire events as if they were generated from a real keyboard.

On macOS, keyboard shortcuts like `⌘ A` -&gt; Select All do not work. See [\#1313](https://github.com/puppeteer/puppeteer/issues/1313).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Keyboard` class.

## Example 1

An example of holding down `Shift` in order to select and delete some text:

```ts
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++) await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

## Example 2

An example of pressing `A`

```ts
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="down">[down(key, options)](./puppeteer.keyboard.down.md)</span>

</td><td>

</td><td>

Dispatches a `keydown` event.

**Remarks:**

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated. If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier active. To release the modifier key, use [Keyboard.up()](./puppeteer.keyboard.up.md).

After the key is pressed once, subsequent calls to [Keyboard.down()](./puppeteer.keyboard.down.md) will have [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use [Keyboard.up()](./puppeteer.keyboard.up.md).

Modifier keys DO influence [Keyboard.down()](./puppeteer.keyboard.down.md). Holding down `Shift` will type the text in upper case.

</td></tr>
<tr><td>

<span id="press">[press(key, options)](./puppeteer.keyboard.press.md)</span>

</td><td>

</td><td>

Shortcut for [Keyboard.down()](./puppeteer.keyboard.down.md) and [Keyboard.up()](./puppeteer.keyboard.up.md).

**Remarks:**

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

Modifier keys DO effect [Keyboard.press()](./puppeteer.keyboard.press.md). Holding down `Shift` will type the text in upper case.

</td></tr>
<tr><td>

<span id="sendcharacter">[sendCharacter(char)](./puppeteer.keyboard.sendcharacter.md)</span>

</td><td>

</td><td>

Dispatches a `keypress` and `input` event. This does not send a `keydown` or `keyup` event.

**Remarks:**

Modifier keys DO NOT effect [Keyboard.sendCharacter](./puppeteer.keyboard.sendcharacter.md). Holding down `Shift` will not type the text in upper case.

</td></tr>
<tr><td>

<span id="type">[type(text, options)](./puppeteer.keyboard.type.md)</span>

</td><td>

</td><td>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

**Remarks:**

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

</td></tr>
<tr><td>

<span id="up">[up(key)](./puppeteer.keyboard.up.md)</span>

</td><td>

</td><td>

Dispatches a `keyup` event.

</td></tr>
</tbody></table>

# Keyboard.press() method

Source: https://pptr.dev/api/puppeteer.keyboard.press

Shortcut for [Keyboard.down()](./puppeteer.keyboard.down.md) and [Keyboard.up()](./puppeteer.keyboard.up.md).

### Signature

```typescript
class Keyboard {
	abstract press(key: KeyInput, options?: Readonly<KeyPressOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

[KeyInput](./puppeteer.keyinput.md)

</td><td>

Name of key to press, such as `ArrowLeft`. See [KeyInput](./puppeteer.keyinput.md) for a list of all key names.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyPressOptions](./puppeteer.keypressoptions.md)&gt;

</td><td>

_(Optional)_ An object of options. Accepts text which, if specified, generates an input event with this text. Accepts delay which, if specified, is the time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0. Accepts commands which, if specified, is the commands of keyboard shortcuts, see [Chromium Source Code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h) for valid command names.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

Modifier keys DO effect [Keyboard.press()](./puppeteer.keyboard.press.md). Holding down `Shift` will type the text in upper case.

# Keyboard.sendCharacter() method

Source: https://pptr.dev/api/puppeteer.keyboard.sendcharacter

Dispatches a `keypress` and `input` event. This does not send a `keydown` or `keyup` event.

### Signature

```typescript
class Keyboard {
	abstract sendCharacter(char: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

char

</td><td>

string

</td><td>

Character to send into the page.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Modifier keys DO NOT effect [Keyboard.sendCharacter](./puppeteer.keyboard.sendcharacter.md). Holding down `Shift` will not type the text in upper case.

## Example

```ts
page.keyboard.sendCharacter('嗨');
```

# Keyboard.type() method

Source: https://pptr.dev/api/puppeteer.keyboard.type

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

### Signature

```typescript
class Keyboard {
	abstract type(text: string, options?: Readonly<KeyboardTypeOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

text

</td><td>

string

</td><td>

A text to type into a focused element.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)&gt;

</td><td>

_(Optional)_ An object of options. Accepts delay which, if specified, is the time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

## Example

```ts
await page.keyboard.type('Hello'); // Types instantly
await page.keyboard.type('World', { delay: 100 }); // Types slower, like a user
```

# Keyboard.up() method

Source: https://pptr.dev/api/puppeteer.keyboard.up

Dispatches a `keyup` event.

### Signature

```typescript
class Keyboard {
	abstract up(key: KeyInput): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

key

</td><td>

[KeyInput](./puppeteer.keyinput.md)

</td><td>

Name of key to release, such as `ArrowLeft`. See [KeyInput](./puppeteer.keyinput.md) for a list of all key names.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# KeyboardTypeOptions interface

Source: https://pptr.dev/api/puppeteer.keyboardtypeoptions

### Signature

```typescript
export interface KeyboardTypeOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="delay">delay</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# KeyDownOptions interface

Source: https://pptr.dev/api/puppeteer.keydownoptions

### Signature

```typescript
export interface KeyDownOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="commands">commands</span>

</td><td>

`optional, deprecated`

</td><td>

string\[\]

</td><td>

**Deprecated:**

Do not use. This is automatically handled.

</td><td>

</td></tr>
<tr><td>

<span id="text">text</span>

</td><td>

`optional, deprecated`

</td><td>

string

</td><td>

**Deprecated:**

Do not use. This is automatically handled.

</td><td>

</td></tr>
</tbody></table>

# KeyInput type

Source: https://pptr.dev/api/puppeteer.keyinput

All the valid keys that can be passed to functions that take user input, such as [keyboard.press](./puppeteer.keyboard.press.md)

### Signature

```typescript
export type KeyInput =
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| 'Power'
	| 'Eject'
	| 'Abort'
	| 'Help'
	| 'Backspace'
	| 'Tab'
	| 'Numpad5'
	| 'NumpadEnter'
	| 'Enter'
	| '\r'
	| '\n'
	| 'ShiftLeft'
	| 'ShiftRight'
	| 'ControlLeft'
	| 'ControlRight'
	| 'AltLeft'
	| 'AltRight'
	| 'Pause'
	| 'CapsLock'
	| 'Escape'
	| 'Convert'
	| 'NonConvert'
	| 'Space'
	| 'Numpad9'
	| 'PageUp'
	| 'Numpad3'
	| 'PageDown'
	| 'End'
	| 'Numpad1'
	| 'Home'
	| 'Numpad7'
	| 'ArrowLeft'
	| 'Numpad4'
	| 'Numpad8'
	| 'ArrowUp'
	| 'ArrowRight'
	| 'Numpad6'
	| 'Numpad2'
	| 'ArrowDown'
	| 'Select'
	| 'Open'
	| 'PrintScreen'
	| 'Insert'
	| 'Numpad0'
	| 'Delete'
	| 'NumpadDecimal'
	| 'Digit0'
	| 'Digit1'
	| 'Digit2'
	| 'Digit3'
	| 'Digit4'
	| 'Digit5'
	| 'Digit6'
	| 'Digit7'
	| 'Digit8'
	| 'Digit9'
	| 'KeyA'
	| 'KeyB'
	| 'KeyC'
	| 'KeyD'
	| 'KeyE'
	| 'KeyF'
	| 'KeyG'
	| 'KeyH'
	| 'KeyI'
	| 'KeyJ'
	| 'KeyK'
	| 'KeyL'
	| 'KeyM'
	| 'KeyN'
	| 'KeyO'
	| 'KeyP'
	| 'KeyQ'
	| 'KeyR'
	| 'KeyS'
	| 'KeyT'
	| 'KeyU'
	| 'KeyV'
	| 'KeyW'
	| 'KeyX'
	| 'KeyY'
	| 'KeyZ'
	| 'MetaLeft'
	| 'MetaRight'
	| 'ContextMenu'
	| 'NumpadMultiply'
	| 'NumpadAdd'
	| 'NumpadSubtract'
	| 'NumpadDivide'
	| 'F1'
	| 'F2'
	| 'F3'
	| 'F4'
	| 'F5'
	| 'F6'
	| 'F7'
	| 'F8'
	| 'F9'
	| 'F10'
	| 'F11'
	| 'F12'
	| 'F13'
	| 'F14'
	| 'F15'
	| 'F16'
	| 'F17'
	| 'F18'
	| 'F19'
	| 'F20'
	| 'F21'
	| 'F22'
	| 'F23'
	| 'F24'
	| 'NumLock'
	| 'ScrollLock'
	| 'AudioVolumeMute'
	| 'AudioVolumeDown'
	| 'AudioVolumeUp'
	| 'MediaTrackNext'
	| 'MediaTrackPrevious'
	| 'MediaStop'
	| 'MediaPlayPause'
	| 'Semicolon'
	| 'Equal'
	| 'NumpadEqual'
	| 'Comma'
	| 'Minus'
	| 'Period'
	| 'Slash'
	| 'Backquote'
	| 'BracketLeft'
	| 'Backslash'
	| 'BracketRight'
	| 'Quote'
	| 'AltGraph'
	| 'Props'
	| 'Cancel'
	| 'Clear'
	| 'Shift'
	| 'Control'
	| 'Alt'
	| 'Accept'
	| 'ModeChange'
	| ' '
	| 'Print'
	| 'Execute'
	| '\u0000'
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z'
	| 'Meta'
	| '*'
	| '+'
	| '-'
	| '/'
	| ';'
	| '='
	| ','
	| '.'
	| '`'
	| '['
	| '\\'
	| ']'
	| "'"
	| 'Attn'
	| 'CrSel'
	| 'ExSel'
	| 'EraseEof'
	| 'Play'
	| 'ZoomOut'
	| ')'
	| '!'
	| '@'
	| '#'
	| '$'
	| '%'
	| '^'
	| '&'
	| '('
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'
	| ':'
	| '<'
	| '_'
	| '>'
	| '?'
	| '~'
	| '{'
	| '|'
	| '}'
	| '"'
	| 'SoftLeft'
	| 'SoftRight'
	| 'Camera'
	| 'Call'
	| 'EndCall'
	| 'VolumeDown'
	| 'VolumeUp';
```

# KeyPressOptions type

Source: https://pptr.dev/api/puppeteer.keypressoptions

### Signature

```typescript
export type KeyPressOptions = KeyDownOptions & KeyboardTypeOptions;
```

**References:** [KeyDownOptions](./puppeteer.keydownoptions.md), [KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)

# KnownDevices variable

Source: https://pptr.dev/api/puppeteer.knowndevices

A list of devices to be used with [Page.emulate()](./puppeteer.page.emulate.md).

### Signature

```typescript
KnownDevices: Readonly<
	Record<
		| 'Blackberry PlayBook'
		| 'Blackberry PlayBook landscape'
		| 'BlackBerry Z30'
		| 'BlackBerry Z30 landscape'
		| 'Galaxy Note 3'
		| 'Galaxy Note 3 landscape'
		| 'Galaxy Note II'
		| 'Galaxy Note II landscape'
		| 'Galaxy S III'
		| 'Galaxy S III landscape'
		| 'Galaxy S5'
		| 'Galaxy S5 landscape'
		| 'Galaxy S8'
		| 'Galaxy S8 landscape'
		| 'Galaxy S9+'
		| 'Galaxy S9+ landscape'
		| 'Galaxy Tab S4'
		| 'Galaxy Tab S4 landscape'
		| 'iPad'
		| 'iPad landscape'
		| 'iPad (gen 6)'
		| 'iPad (gen 6) landscape'
		| 'iPad (gen 7)'
		| 'iPad (gen 7) landscape'
		| 'iPad Mini'
		| 'iPad Mini landscape'
		| 'iPad Pro'
		| 'iPad Pro landscape'
		| 'iPad Pro 11'
		| 'iPad Pro 11 landscape'
		| 'iPhone 4'
		| 'iPhone 4 landscape'
		| 'iPhone 5'
		| 'iPhone 5 landscape'
		| 'iPhone 6'
		| 'iPhone 6 landscape'
		| 'iPhone 6 Plus'
		| 'iPhone 6 Plus landscape'
		| 'iPhone 7'
		| 'iPhone 7 landscape'
		| 'iPhone 7 Plus'
		| 'iPhone 7 Plus landscape'
		| 'iPhone 8'
		| 'iPhone 8 landscape'
		| 'iPhone 8 Plus'
		| 'iPhone 8 Plus landscape'
		| 'iPhone SE'
		| 'iPhone SE landscape'
		| 'iPhone X'
		| 'iPhone X landscape'
		| 'iPhone XR'
		| 'iPhone XR landscape'
		| 'iPhone 11'
		| 'iPhone 11 landscape'
		| 'iPhone 11 Pro'
		| 'iPhone 11 Pro landscape'
		| 'iPhone 11 Pro Max'
		| 'iPhone 11 Pro Max landscape'
		| 'iPhone 12'
		| 'iPhone 12 landscape'
		| 'iPhone 12 Pro'
		| 'iPhone 12 Pro landscape'
		| 'iPhone 12 Pro Max'
		| 'iPhone 12 Pro Max landscape'
		| 'iPhone 12 Mini'
		| 'iPhone 12 Mini landscape'
		| 'iPhone 13'
		| 'iPhone 13 landscape'
		| 'iPhone 13 Pro'
		| 'iPhone 13 Pro landscape'
		| 'iPhone 13 Pro Max'
		| 'iPhone 13 Pro Max landscape'
		| 'iPhone 13 Mini'
		| 'iPhone 13 Mini landscape'
		| 'iPhone 14'
		| 'iPhone 14 landscape'
		| 'iPhone 14 Plus'
		| 'iPhone 14 Plus landscape'
		| 'iPhone 14 Pro'
		| 'iPhone 14 Pro landscape'
		| 'iPhone 14 Pro Max'
		| 'iPhone 14 Pro Max landscape'
		| 'iPhone 15'
		| 'iPhone 15 landscape'
		| 'iPhone 15 Plus'
		| 'iPhone 15 Plus landscape'
		| 'iPhone 15 Pro'
		| 'iPhone 15 Pro landscape'
		| 'iPhone 15 Pro Max'
		| 'iPhone 15 Pro Max landscape'
		| 'JioPhone 2'
		| 'JioPhone 2 landscape'
		| 'Kindle Fire HDX'
		| 'Kindle Fire HDX landscape'
		| 'LG Optimus L70'
		| 'LG Optimus L70 landscape'
		| 'Microsoft Lumia 550'
		| 'Microsoft Lumia 950'
		| 'Microsoft Lumia 950 landscape'
		| 'Nexus 10'
		| 'Nexus 10 landscape'
		| 'Nexus 4'
		| 'Nexus 4 landscape'
		| 'Nexus 5'
		| 'Nexus 5 landscape'
		| 'Nexus 5X'
		| 'Nexus 5X landscape'
		| 'Nexus 6'
		| 'Nexus 6 landscape'
		| 'Nexus 6P'
		| 'Nexus 6P landscape'
		| 'Nexus 7'
		| 'Nexus 7 landscape'
		| 'Nokia Lumia 520'
		| 'Nokia Lumia 520 landscape'
		| 'Nokia N9'
		| 'Nokia N9 landscape'
		| 'Pixel 2'
		| 'Pixel 2 landscape'
		| 'Pixel 2 XL'
		| 'Pixel 2 XL landscape'
		| 'Pixel 3'
		| 'Pixel 3 landscape'
		| 'Pixel 4'
		| 'Pixel 4 landscape'
		| 'Pixel 4a (5G)'
		| 'Pixel 4a (5G) landscape'
		| 'Pixel 5'
		| 'Pixel 5 landscape'
		| 'Moto G4'
		| 'Moto G4 landscape',
		Device
	>
>;
```

## Example

```ts
import { KnownDevices } from 'puppeteer';
const iPhone = KnownDevices['iPhone 15 Pro'];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulate(iPhone);
await page.goto('https://www.google.com');
// other actions...
await browser.close();
```

# launch() function

Source: https://pptr.dev/api/puppeteer.launch

### Signature

```typescript
launch: (options?: PuppeteerCore.LaunchOptions) => Promise<PuppeteerCore.Browser>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[PuppeteerCore.LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[PuppeteerCore.Browser](./puppeteer.browser.md)&gt;

# LaunchOptions interface

Source: https://pptr.dev/api/puppeteer.launchoptions

Generic launch options that can be passed when launching any browser.

### Signature

```typescript
export interface LaunchOptions extends ConnectOptions
```

**Extends:** [ConnectOptions](./puppeteer.connectoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="args">args</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

Additional command line arguments to pass to the browser instance.

</td><td>

</td></tr>
<tr><td>

<span id="browser">browser</span>

</td><td>

`optional`

</td><td>

[SupportedBrowser](./puppeteer.supportedbrowser.md)

</td><td>

Which browser to launch.

</td><td>

`chrome`

</td></tr>
<tr><td>

<span id="channel">channel</span>

</td><td>

`optional`

</td><td>

[ChromeReleaseChannel](./puppeteer.chromereleasechannel.md)

</td><td>

If specified for Chrome, looks for a regular Chrome installation at a known system location instead of using the bundled Chrome binary.

</td><td>

</td></tr>
<tr><td>

<span id="debuggingport">debuggingPort</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specify the debugging port number to use

</td><td>

</td></tr>
<tr><td>

<span id="devtools">devtools</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to auto-open a DevTools panel for each tab. If this is set to `true`, then `headless` will be forced to `false`.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="dumpio">dumpio</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If true, pipes the browser process stdout and stderr to `process.stdout` and `process.stderr`.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="enableextensions">enableExtensions</span>

</td><td>

`optional`

</td><td>

boolean \| string\[\]

</td><td>

If `true`, avoids passing default arguments to the browser that would prevent extensions from being enabled. Passing a list of strings will load the provided paths as unpacked extensions.

</td><td>

</td></tr>
<tr><td>

<span id="env">env</span>

</td><td>

`optional`

</td><td>

Record&lt;string, string \| undefined&gt;

</td><td>

Specify environment variables that will be visible to the browser.

</td><td>

The contents of `process.env`.

</td></tr>
<tr><td>

<span id="executablepath">executablePath</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Path to a browser executable to use instead of the bundled browser. Note that Puppeteer is only guaranteed to work with the bundled browser, so use this setting at your own risk.

**Remarks:**

When using this is recommended to set the `browser` property as well as Puppeteer will default to `chrome` by default.

</td><td>

</td></tr>
<tr><td>

<span id="extraprefsfirefox">extraPrefsFirefox</span>

</td><td>

`optional`

</td><td>

Record&lt;string, unknown&gt;

</td><td>

[Additional preferences](https://searchfox.org/mozilla-release/source/modules/libpref/init/all.js) that can be passed when launching with Firefox.

</td><td>

</td></tr>
<tr><td>

<span id="handlesighup">handleSIGHUP</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Close the browser process on `SIGHUP`.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="handlesigint">handleSIGINT</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Close the browser process on `Ctrl+C`.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="handlesigterm">handleSIGTERM</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Close the browser process on `SIGTERM`.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="headless">headless</span>

</td><td>

`optional`

</td><td>

boolean \| 'shell'

</td><td>

Whether to run the browser in headless mode.

**Remarks:**

- `true` launches the browser in the [new headless](https://developer.chrome.com/articles/new-headless/) mode.

- `'shell'` launches [shell](https://developer.chrome.com/blog/chrome-headless-shell) known as the old headless mode.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="ignoredefaultargs">ignoreDefaultArgs</span>

</td><td>

`optional`

</td><td>

boolean \| string\[\]

</td><td>

If `true`, do not use `puppeteer.defaultArgs()` when creating a browser. If an array is provided, these args will be filtered out. Use this with care - you probably want the default arguments Puppeteer uses.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="pipe">pipe</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Connect to a browser over a pipe instead of a WebSocket. Only supported with Chrome.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

If provided, the browser will be closed when the signal is aborted.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum time in milliseconds to wait for the browser to start. Pass `0` to disable the timeout.

</td><td>

`30_000` (30 seconds).

</td></tr>
<tr><td>

<span id="userdatadir">userDataDir</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Path to a user data directory. [see the Chromium docs](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/user_data_dir.md) for more info.

</td><td>

</td></tr>
<tr><td>

<span id="waitforinitialpage">waitForInitialPage</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to wait for the initial page to be ready. Useful when a user explicitly disables that (e.g. `--no-startup-window` for Chrome).

</td><td>

`true`

</td></tr>
</tbody></table>

# Locator.click() method

Source: https://pptr.dev/api/puppeteer.locator.click

Clicks the located element.

### Signature

```typescript
class Locator {
	click<ElementType extends Element>(this: Locator<ElementType>, options?: Readonly<LocatorClickOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[LocatorClickOptions](./puppeteer.locatorclickoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Locator.clone() method

Source: https://pptr.dev/api/puppeteer.locator.clone

Clones the locator.

### Signature

```typescript
class Locator {
	clone(): Locator<T>;
}
```

**Returns:**

[Locator](./puppeteer.locator.md)&lt;T&gt;

# Locator.fill() method

Source: https://pptr.dev/api/puppeteer.locator.fill

Fills out the input identified by the locator using the provided value. The type of the input is determined at runtime and the appropriate fill-out method is chosen based on the type. `contenteditable`, select, textarea and input elements are supported. For checkboxes, radio buttons and switches specify a boolean value.

### Signature

```typescript
class Locator {
	fill<ElementType extends Element>(this: Locator<ElementType>, value: string | boolean, options?: Readonly<LocatorFillOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

value

</td><td>

string \| boolean

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[LocatorFillOptions](./puppeteer.locatorfilloptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Locator.filter() method

Source: https://pptr.dev/api/puppeteer.locator.filter

Creates an expectation that is evaluated against located values.

If the expectations do not match, then the locator will retry.

### Signature

```typescript
class Locator {
	filter<S extends T>(predicate: Predicate<T, S>): Locator<S>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

predicate

</td><td>

[Predicate](./puppeteer.predicate.md)&lt;T, S&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;S&gt;

# Locator.hover() method

Source: https://pptr.dev/api/puppeteer.locator.hover

Hovers over the located element.

### Signature

```typescript
class Locator {
	hover<ElementType extends Element>(this: Locator<ElementType>, options?: Readonly<ActionOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[ActionOptions](./puppeteer.actionoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Locator.map() method

Source: https://pptr.dev/api/puppeteer.locator.map

Maps the locator using the provided mapper.

### Signature

```typescript
class Locator {
	map<To>(mapper: Mapper<T, To>): Locator<To>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

mapper

</td><td>

[Mapper](./puppeteer.mapper.md)&lt;T, To&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;To&gt;

# Locator class

Source: https://pptr.dev/api/puppeteer.locator

Locators describe a strategy of locating objects and performing an action on them. If the action fails because the object is not ready for the action, the whole operation is retried. Various preconditions for a successful action are checked automatically.

See [https://pptr.dev/guides/page-interactions\#locators](https://pptr.dev/guides/page-interactions#locators) for details.

### Signature

```typescript
export declare abstract class Locator<T> extends EventEmitter<LocatorEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[LocatorEvents](./puppeteer.locatorevents.md)&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_">\_</span>

</td><td>

`optional`

</td><td>

T

</td><td>

Used for nominally typing [Locator](./puppeteer.locator.md).

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`readonly`

</td><td>

number

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="click">[click(this, options)](./puppeteer.locator.click.md)</span>

</td><td>

</td><td>

Clicks the located element.

</td></tr>
<tr><td>

<span id="clone">[clone()](./puppeteer.locator.clone.md)</span>

</td><td>

</td><td>

Clones the locator.

</td></tr>
<tr><td>

<span id="fill">[fill(this, value, options)](./puppeteer.locator.fill.md)</span>

</td><td>

</td><td>

Fills out the input identified by the locator using the provided value. The type of the input is determined at runtime and the appropriate fill-out method is chosen based on the type. `contenteditable`, select, textarea and input elements are supported. For checkboxes, radio buttons and switches specify a boolean value.

</td></tr>
<tr><td>

<span id="filter">[filter(predicate)](./puppeteer.locator.filter.md)</span>

</td><td>

</td><td>

Creates an expectation that is evaluated against located values.

If the expectations do not match, then the locator will retry.

</td></tr>
<tr><td>

<span id="hover">[hover(this, options)](./puppeteer.locator.hover.md)</span>

</td><td>

</td><td>

Hovers over the located element.

</td></tr>
<tr><td>

<span id="map">[map(mapper)](./puppeteer.locator.map.md)</span>

</td><td>

</td><td>

Maps the locator using the provided mapper.

</td></tr>
<tr><td>

<span id="race">[race(locators)](./puppeteer.locator.race.md)</span>

</td><td>

`static`

</td><td>

Creates a race between multiple locators trying to locate elements in parallel but ensures that only a single element receives the action.

</td></tr>
<tr><td>

<span id="scroll">[scroll(this, options)](./puppeteer.locator.scroll.md)</span>

</td><td>

</td><td>

Scrolls the located element.

</td></tr>
<tr><td>

<span id="setensureelementisintheviewport">[setEnsureElementIsInTheViewport(this, value)](./puppeteer.locator.setensureelementisintheviewport.md)</span>

</td><td>

</td><td>

Creates a new locator instance by cloning the current locator and specifying whether the locator should scroll the element into viewport if it is not in the viewport already.

</td></tr>
<tr><td>

<span id="settimeout">[setTimeout(timeout)](./puppeteer.locator.settimeout.md)</span>

</td><td>

</td><td>

Creates a new locator instance by cloning the current locator and setting the total timeout for the locator actions.

Pass `0` to disable timeout.

</td></tr>
<tr><td>

<span id="setvisibility">[setVisibility(this, visibility)](./puppeteer.locator.setvisibility.md)</span>

</td><td>

</td><td>

Creates a new locator instance by cloning the current locator with the visibility property changed to the specified value.

</td></tr>
<tr><td>

<span id="setwaitforenabled">[setWaitForEnabled(this, value)](./puppeteer.locator.setwaitforenabled.md)</span>

</td><td>

</td><td>

Creates a new locator instance by cloning the current locator and specifying whether to wait for input elements to become enabled before the action. Applicable to `click` and `fill` actions.

</td></tr>
<tr><td>

<span id="setwaitforstableboundingbox">[setWaitForStableBoundingBox(this, value)](./puppeteer.locator.setwaitforstableboundingbox.md)</span>

</td><td>

</td><td>

Creates a new locator instance by cloning the current locator and specifying whether the locator has to wait for the element's bounding box to be same between two consecutive animation frames.

</td></tr>
<tr><td>

<span id="wait">[wait(options)](./puppeteer.locator.wait.md)</span>

</td><td>

</td><td>

Waits for the locator to get the serialized value from the page.

Note this requires the value to be JSON-serializable.

</td></tr>
<tr><td>

<span id="waithandle">[waitHandle(options)](./puppeteer.locator.waithandle.md)</span>

</td><td>

</td><td>

Waits for the locator to get a handle from the page.

</td></tr>
</tbody></table>

# Locator.race() method

Source: https://pptr.dev/api/puppeteer.locator.race

Creates a race between multiple locators trying to locate elements in parallel but ensures that only a single element receives the action.

### Signature

```typescript
class Locator {
	static race<Locators extends readonly unknown[] | []>(locators: Locators): Locator<AwaitedLocator<Locators[number]>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

locators

</td><td>

Locators

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;[AwaitedLocator](./puppeteer.awaitedlocator.md)&lt;Locators\[number\]&gt;&gt;

# Locator.scroll() method

Source: https://pptr.dev/api/puppeteer.locator.scroll

Scrolls the located element.

### Signature

```typescript
class Locator {
	scroll<ElementType extends Element>(this: Locator<ElementType>, options?: Readonly<LocatorScrollOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[LocatorScrollOptions](./puppeteer.locatorscrolloptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Locator.setEnsureElementIsInTheViewport() method

Source: https://pptr.dev/api/puppeteer.locator.setensureelementisintheviewport

Creates a new locator instance by cloning the current locator and specifying whether the locator should scroll the element into viewport if it is not in the viewport already.

### Signature

```typescript
class Locator {
	setEnsureElementIsInTheViewport<ElementType extends Element>(this: Locator<ElementType>, value: boolean): Locator<ElementType>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

value

</td><td>

boolean

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

#### Default value:

`true`

# Locator.setTimeout() method

Source: https://pptr.dev/api/puppeteer.locator.settimeout

Creates a new locator instance by cloning the current locator and setting the total timeout for the locator actions.

Pass `0` to disable timeout.

### Signature

```typescript
class Locator {
	setTimeout(timeout: number): Locator<T>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

timeout

</td><td>

number

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;T&gt;

#### Default value:

`Page.getDefaultTimeout()`

# Locator.setVisibility() method

Source: https://pptr.dev/api/puppeteer.locator.setvisibility

Creates a new locator instance by cloning the current locator with the visibility property changed to the specified value.

### Signature

```typescript
class Locator {
	setVisibility<NodeType extends Node>(this: Locator<NodeType>, visibility: VisibilityOption): Locator<NodeType>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;NodeType&gt;

</td><td>

</td></tr>
<tr><td>

visibility

</td><td>

[VisibilityOption](./puppeteer.visibilityoption.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;NodeType&gt;

# Locator.setWaitForEnabled() method

Source: https://pptr.dev/api/puppeteer.locator.setwaitforenabled

Creates a new locator instance by cloning the current locator and specifying whether to wait for input elements to become enabled before the action. Applicable to `click` and `fill` actions.

### Signature

```typescript
class Locator {
	setWaitForEnabled<NodeType extends Node>(this: Locator<NodeType>, value: boolean): Locator<NodeType>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;NodeType&gt;

</td><td>

</td></tr>
<tr><td>

value

</td><td>

boolean

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;NodeType&gt;

#### Default value:

`true`

# Locator.setWaitForStableBoundingBox() method

Source: https://pptr.dev/api/puppeteer.locator.setwaitforstableboundingbox

Creates a new locator instance by cloning the current locator and specifying whether the locator has to wait for the element's bounding box to be same between two consecutive animation frames.

### Signature

```typescript
class Locator {
	setWaitForStableBoundingBox<ElementType extends Element>(this: Locator<ElementType>, value: boolean): Locator<ElementType>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

this

</td><td>

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

</td><td>

</td></tr>
<tr><td>

value

</td><td>

boolean

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;ElementType&gt;

#### Default value:

`true`

# Locator.wait() method

Source: https://pptr.dev/api/puppeteer.locator.wait

Waits for the locator to get the serialized value from the page.

Note this requires the value to be JSON-serializable.

### Signature

```typescript
class Locator {
	wait(options?: Readonly<ActionOptions>): Promise<T>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ActionOptions](./puppeteer.actionoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;T&gt;

# Locator.waitHandle() method

Source: https://pptr.dev/api/puppeteer.locator.waithandle

Waits for the locator to get a handle from the page.

### Signature

```typescript
class Locator {
	waitHandle(options?: Readonly<ActionOptions>): Promise<HandleFor<T>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ActionOptions](./puppeteer.actionoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;T&gt;&gt;

# LocatorClickOptions type

Source: https://pptr.dev/api/puppeteer.locatorclickoptions

### Signature

```typescript
export type LocatorClickOptions = ClickOptions & ActionOptions;
```

**References:** [ClickOptions](./puppeteer.clickoptions.md), [ActionOptions](./puppeteer.actionoptions.md)

# LocatorEvent enum

Source: https://pptr.dev/api/puppeteer.locatorevent

All the events that a locator instance may emit.

### Signature

```typescript
export declare enum LocatorEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Action

</td><td>

`"action"`

</td><td>

Emitted every time before the locator performs an action on the located element(s).

</td></tr>
</tbody></table>

# LocatorEvents interface

Source: https://pptr.dev/api/puppeteer.locatorevents

### Signature

```typescript
export interface LocatorEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="action">action</span>

</td><td>

</td><td>

undefined

</td><td>

</td><td>

</td></tr>
</tbody></table>

# LocatorFillOptions interface

Source: https://pptr.dev/api/puppeteer.locatorfilloptions

### Signature

```typescript
export interface LocatorFillOptions extends ActionOptions
```

**Extends:** [ActionOptions](./puppeteer.actionoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="typingthreshold">typingThreshold</span>

</td><td>

`optional`

</td><td>

number

</td><td>

The number of characters to type before switching to a faster fill-out method.

</td><td>

`100`

</td></tr>
</tbody></table>

# LocatorScrollOptions interface

Source: https://pptr.dev/api/puppeteer.locatorscrolloptions

### Signature

```typescript
export interface LocatorScrollOptions extends ActionOptions
```

**Extends:** [ActionOptions](./puppeteer.actionoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="scrollleft">scrollLeft</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="scrolltop">scrollTop</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# LowerCasePaperFormat type

Source: https://pptr.dev/api/puppeteer.lowercasepaperformat

### Signature

```typescript
export type LowerCasePaperFormat = 'letter' | 'legal' | 'tabloid' | 'ledger' | 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6';
```

# Mapper type

Source: https://pptr.dev/api/puppeteer.mapper

### Signature

```typescript
export type Mapper<From, To> = (value: From) => Awaitable<To>;
```

**References:** [Awaitable](./puppeteer.awaitable.md)

# MediaFeature interface

Source: https://pptr.dev/api/puppeteer.mediafeature

A media feature to emulate.

### Signature

```typescript
export interface MediaFeature
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

A name of the feature, for example, 'prefers-reduced-motion'.

</td><td>

</td></tr>
<tr><td>

<span id="value">value</span>

</td><td>

</td><td>

string

</td><td>

A value for the feature, for example, 'reduce'.

</td><td>

</td></tr>
</tbody></table>

# Metrics interface

Source: https://pptr.dev/api/puppeteer.metrics

### Signature

```typescript
export interface Metrics
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="documents">Documents</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="frames">Frames</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="jseventlisteners">JSEventListeners</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="jsheaptotalsize">JSHeapTotalSize</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="jsheapusedsize">JSHeapUsedSize</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="layoutcount">LayoutCount</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="layoutduration">LayoutDuration</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="nodes">Nodes</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="recalcstylecount">RecalcStyleCount</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="recalcstyleduration">RecalcStyleDuration</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="scriptduration">ScriptDuration</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="taskduration">TaskDuration</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="timestamp">Timestamp</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Mouse.click() method

Source: https://pptr.dev/api/puppeteer.mouse.click

Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.

### Signature

```typescript
class Mouse {
	abstract click(x: number, y: number, options?: Readonly<MouseClickOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the mouse.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the mouse.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[MouseClickOptions](./puppeteer.mouseclickoptions.md)&gt;

</td><td>

_(Optional)_ Options to configure behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.down() method

Source: https://pptr.dev/api/puppeteer.mouse.down

Presses the mouse.

### Signature

```typescript
class Mouse {
	abstract down(options?: Readonly<MouseOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[MouseOptions](./puppeteer.mouseoptions.md)&gt;

</td><td>

_(Optional)_ Options to configure behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.drag() method

Source: https://pptr.dev/api/puppeteer.mouse.drag

Dispatches a `drag` event.

### Signature

```typescript
class Mouse {
	abstract drag(start: Point, target: Point): Promise<Protocol.Input.DragData>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

start

</td><td>

[Point](./puppeteer.point.md)

</td><td>

starting point for drag

</td></tr>
<tr><td>

target

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point to drag to

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Protocol.Input.DragData&gt;

# Mouse.dragAndDrop() method

Source: https://pptr.dev/api/puppeteer.mouse.draganddrop

Performs a drag, dragenter, dragover, and drop in sequence.

### Signature

```typescript
class Mouse {
	abstract dragAndDrop(
		start: Point,
		target: Point,
		options?: {
			delay?: number;
		},
	): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

start

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point to drag from

</td></tr>
<tr><td>

target

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point to drop on

</td></tr>
<tr><td>

options

</td><td>

&#123; delay?: number; &#125;

</td><td>

_(Optional)_ An object of options. Accepts delay which, if specified, is the time to wait between `dragover` and `drop` in milliseconds. Defaults to 0.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.dragEnter() method

Source: https://pptr.dev/api/puppeteer.mouse.dragenter

Dispatches a `dragenter` event.

### Signature

```typescript
class Mouse {
	abstract dragEnter(target: Point, data: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

target

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point for emitting `dragenter` event

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

drag data containing items and operations mask

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.dragOver() method

Source: https://pptr.dev/api/puppeteer.mouse.dragover

Dispatches a `dragover` event.

### Signature

```typescript
class Mouse {
	abstract dragOver(target: Point, data: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

target

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point for emitting `dragover` event

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

drag data containing items and operations mask

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.drop() method

Source: https://pptr.dev/api/puppeteer.mouse.drop

Performs a dragenter, dragover, and drop in sequence.

### Signature

```typescript
class Mouse {
	abstract drop(target: Point, data: Protocol.Input.DragData): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

target

</td><td>

[Point](./puppeteer.point.md)

</td><td>

point to drop on

</td></tr>
<tr><td>

data

</td><td>

Protocol.Input.DragData

</td><td>

drag data containing items and operations mask

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse class

Source: https://pptr.dev/api/puppeteer.mouse

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

### Signature

```typescript
export declare abstract class Mouse
```

## Remarks

Every `page` object has its own Mouse, accessible with [Page.mouse](./puppeteer.page.md#mouse).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Mouse` class.

## Example 1

```ts
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

**Note**: The mouse events trigger synthetic `MouseEvent`s. This means that it does not fully replicate the functionality of what a normal user would be able to do with their mouse.

For example, dragging and selecting text is not possible using `page.mouse`. Instead, you can use the [\`DocumentOrShadowRoot.getSelection()\`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/getSelection) functionality implemented in the platform.

## Example 2

For example, if you want to select all content between nodes:

```ts
await page.evaluate(
	(from, to) => {
		const selection = from.getRootNode().getSelection();
		const range = document.createRange();
		range.setStartBefore(from);
		range.setEndAfter(to);
		selection.removeAllRanges();
		selection.addRange(range);
	},
	fromJSHandle,
	toJSHandle,
);
```

If you then would want to copy-paste your selection, you can use the clipboard api:

```ts
// The clipboard api does not allow you to copy, unless the tab is focused.
await page.bringToFront();
await page.evaluate(() => {
	// Copy the selected content to the clipboard
	document.execCommand('copy');
	// Obtain the content of the clipboard as a string
	return navigator.clipboard.readText();
});
```

**Note**: If you want access to the clipboard API, you have to give it permission to do so:

```ts
await browser.defaultBrowserContext().overridePermissions('<your origin>', ['clipboard-read', 'clipboard-write']);
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="click">[click(x, y, options)](./puppeteer.mouse.click.md)</span>

</td><td>

</td><td>

Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.

</td></tr>
<tr><td>

<span id="down">[down(options)](./puppeteer.mouse.down.md)</span>

</td><td>

</td><td>

Presses the mouse.

</td></tr>
<tr><td>

<span id="drag">[drag(start, target)](./puppeteer.mouse.drag.md)</span>

</td><td>

</td><td>

Dispatches a `drag` event.

</td></tr>
<tr><td>

<span id="draganddrop">[dragAndDrop(start, target, options)](./puppeteer.mouse.draganddrop.md)</span>

</td><td>

</td><td>

Performs a drag, dragenter, dragover, and drop in sequence.

</td></tr>
<tr><td>

<span id="dragenter">[dragEnter(target, data)](./puppeteer.mouse.dragenter.md)</span>

</td><td>

</td><td>

Dispatches a `dragenter` event.

</td></tr>
<tr><td>

<span id="dragover">[dragOver(target, data)](./puppeteer.mouse.dragover.md)</span>

</td><td>

</td><td>

Dispatches a `dragover` event.

</td></tr>
<tr><td>

<span id="drop">[drop(target, data)](./puppeteer.mouse.drop.md)</span>

</td><td>

</td><td>

Performs a dragenter, dragover, and drop in sequence.

</td></tr>
<tr><td>

<span id="move">[move(x, y, options)](./puppeteer.mouse.move.md)</span>

</td><td>

</td><td>

Moves the mouse to the given coordinate.

</td></tr>
<tr><td>

<span id="reset">[reset()](./puppeteer.mouse.reset.md)</span>

</td><td>

</td><td>

Resets the mouse to the default state: No buttons pressed; position at (0,0).

</td></tr>
<tr><td>

<span id="up">[up(options)](./puppeteer.mouse.up.md)</span>

</td><td>

</td><td>

Releases the mouse.

</td></tr>
<tr><td>

<span id="wheel">[wheel(options)](./puppeteer.mouse.wheel.md)</span>

</td><td>

</td><td>

Dispatches a `mousewheel` event.

</td></tr>
</tbody></table>

# Mouse.move() method

Source: https://pptr.dev/api/puppeteer.mouse.move

Moves the mouse to the given coordinate.

### Signature

```typescript
class Mouse {
	abstract move(x: number, y: number, options?: Readonly<MouseMoveOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the mouse.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the mouse.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[MouseMoveOptions](./puppeteer.mousemoveoptions.md)&gt;

</td><td>

_(Optional)_ Options to configure behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.reset() method

Source: https://pptr.dev/api/puppeteer.mouse.reset

Resets the mouse to the default state: No buttons pressed; position at (0,0).

### Signature

```typescript
class Mouse {
	abstract reset(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Mouse.up() method

Source: https://pptr.dev/api/puppeteer.mouse.up

Releases the mouse.

### Signature

```typescript
class Mouse {
	abstract up(options?: Readonly<MouseOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[MouseOptions](./puppeteer.mouseoptions.md)&gt;

</td><td>

_(Optional)_ Options to configure behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Mouse.wheel() method

Source: https://pptr.dev/api/puppeteer.mouse.wheel

Dispatches a `mousewheel` event.

### Signature

```typescript
class Mouse {
	abstract wheel(options?: Readonly<MouseWheelOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[MouseWheelOptions](./puppeteer.mousewheeloptions.md)&gt;

</td><td>

_(Optional)_ Optional: `MouseWheelOptions`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

An example of zooming into an element:

```ts
await page.goto('https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366');

const elem = await page.$('div');
const boundingBox = await elem.boundingBox();
await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);

await page.mouse.wheel({ deltaY: -100 });
```

# MouseButton variable

Source: https://pptr.dev/api/puppeteer.mousebutton

Enum of valid mouse buttons.

### Signature

```typescript
MouseButton: Readonly<{
	Left: 'left';
	Right: 'right';
	Middle: 'middle';
	Back: 'back';
	Forward: 'forward';
}>;
```

# MouseClickOptions interface

Source: https://pptr.dev/api/puppeteer.mouseclickoptions

### Signature

```typescript
export interface MouseClickOptions extends MouseOptions
```

**Extends:** [MouseOptions](./puppeteer.mouseoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="count">count</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Number of clicks to perform.

</td><td>

`1`

</td></tr>
<tr><td>

<span id="delay">delay</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Time (in ms) to delay the mouse release after the mouse press.

</td><td>

</td></tr>
</tbody></table>

# MouseMoveOptions interface

Source: https://pptr.dev/api/puppeteer.mousemoveoptions

### Signature

```typescript
export interface MouseMoveOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="steps">steps</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Determines the number of movements to make from the current mouse position to the new one.

</td><td>

`1`

</td></tr>
</tbody></table>

# MouseOptions interface

Source: https://pptr.dev/api/puppeteer.mouseoptions

### Signature

```typescript
export interface MouseOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="button">button</span>

</td><td>

`optional`

</td><td>

[MouseButton](./puppeteer.mousebutton.md)

</td><td>

Determines which button will be pressed.

</td><td>

`'left'`

</td></tr>
<tr><td>

<span id="clickcount">clickCount</span>

</td><td>

`optional, deprecated`

</td><td>

number

</td><td>

Determines the click count for the mouse event. This does not perform multiple clicks.

**Deprecated:**

Use [MouseClickOptions.count](./puppeteer.mouseclickoptions.md#count).

</td><td>

`1`

</td></tr>
</tbody></table>

# MouseWheelOptions interface

Source: https://pptr.dev/api/puppeteer.mousewheeloptions

### Signature

```typescript
export interface MouseWheelOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="deltax">deltaX</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="deltay">deltaY</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Moveable interface

Source: https://pptr.dev/api/puppeteer.moveable

### Signature

```typescript
export interface Moveable
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="move">[move()](./puppeteer.moveable.move.md)</span>

</td><td>

Moves the resource when 'using'.

</td></tr>
</tbody></table>

# Moveable.move() method

Source: https://pptr.dev/api/puppeteer.moveable.move

Moves the resource when 'using'.

### Signature

```typescript
interface Moveable {
	move(): this;
}
```

**Returns:**

this

# NetworkConditions interface

Source: https://pptr.dev/api/puppeteer.networkconditions

### Signature

```typescript
export interface NetworkConditions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="download">download</span>

</td><td>

</td><td>

number

</td><td>

Download speed (bytes/s)

</td><td>

</td></tr>
<tr><td>

<span id="latency">latency</span>

</td><td>

</td><td>

number

</td><td>

Latency (ms)

</td><td>

</td></tr>
<tr><td>

<span id="offline">offline</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Emulates the offline mode.

**Remarks:**

Shortcut for [Page.setOfflineMode()](./puppeteer.page.setofflinemode.md).

</td><td>

</td></tr>
<tr><td>

<span id="upload">upload</span>

</td><td>

</td><td>

number

</td><td>

Upload speed (bytes/s)

</td><td>

</td></tr>
</tbody></table>

# NewDocumentScriptEvaluation interface

Source: https://pptr.dev/api/puppeteer.newdocumentscriptevaluation

### Signature

```typescript
export interface NewDocumentScriptEvaluation
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="identifier">identifier</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
</tbody></table>

# NodeFor type

Source: https://pptr.dev/api/puppeteer.nodefor

### Signature

```typescript
export type NodeFor<ComplexSelector extends string> = ParseSelector<ComplexSelector>;
```

# Offset interface

Source: https://pptr.dev/api/puppeteer.offset

### Signature

```typescript
export interface Offset
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="x">x</span>

</td><td>

</td><td>

number

</td><td>

x-offset for the clickable point relative to the top-left corner of the border box.

</td><td>

</td></tr>
<tr><td>

<span id="y">y</span>

</td><td>

</td><td>

number

</td><td>

y-offset for the clickable point relative to the top-left corner of the border box.

</td><td>

</td></tr>
</tbody></table>

# Page.$() method

Source: https://pptr.dev/api/puppeteer.page._

Finds the first element that matches the selector. If no element matches the selector, the return value resolves to `null`.

### Signature

```typescript
class Page {
	$<Selector extends string>(selector: Selector): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

## Remarks

Shortcut for [Page.mainFrame().$(selector)](./puppeteer.frame._.md).

# Page.$$() method

Source: https://pptr.dev/api/puppeteer.page.__

Finds elements on the page that match the selector. If no elements match the selector, the return value resolves to `[]`.

### Signature

```typescript
class Page {
	$$<Selector extends string>(selector: Selector, options?: QueryOptions): Promise<Array<ElementHandle<NodeFor<Selector>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

options

</td><td>

[QueryOptions](./puppeteer.queryoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Array&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt;&gt;&gt;

## Remarks

Shortcut for [Page.mainFrame().$$(selector)](./puppeteer.frame.__.md).

# Page.$$eval() method

Source: https://pptr.dev/api/puppeteer.page.__eval

This method returns all elements matching the selector and passes the resulting array as the first argument to the `pageFunction`.

### Signature

```typescript
class Page {
	$$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<Array<NodeFor<Selector>>, Params> = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

the function to be evaluated in the page context. Will be passed an array of matching elements as its first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

any additional arguments to pass through to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

The result of calling `pageFunction`. If it returns an element it is wrapped in an [ElementHandle](./puppeteer.elementhandle.md), else the raw value itself is returned.

## Remarks

If `pageFunction` returns a promise `$$eval` will wait for the promise to resolve and then return its value.

## Example 1

```ts
// get the amount of divs on the page
const divCount = await page.$$eval('div', (divs) => divs.length);

// get the text content of all the `.options` elements:
const options = await page.$$eval('div > span.options', (options) => {
	return options.map((option) => option.textContent);
});
```

If you are using TypeScript, you may have to provide an explicit type to the first argument of the `pageFunction`. By default it is typed as `Element[]`, but you may need to provide a more specific sub-type:

## Example 2

```ts
await page.$$eval('input', (elements) => {
	return elements.map((e) => e.value);
});
```

The compiler should be able to infer the return type from the `pageFunction` you provide. If it is unable to, you can use the generic type to tell the compiler what return type you expect from `$$eval`:

## Example 3

```ts
const allInputValues = await page.$$eval('input', (elements) => elements.map((e) => e.textContent));
```

# Page.$eval() method

Source: https://pptr.dev/api/puppeteer.page._eval

This method finds the first element within the page that matches the selector and passes the result as the first argument to the `pageFunction`.

### Signature

```typescript
class Page {
	$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

the function to be evaluated in the page context. Will be passed the result of the element matching the selector as its first argument.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

any additional arguments to pass through to `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

The result of calling `pageFunction`. If it returns an element it is wrapped in an [ElementHandle](./puppeteer.elementhandle.md), else the raw value itself is returned.

## Remarks

If no element is found matching `selector`, the method will throw an error.

If `pageFunction` returns a promise `$eval` will wait for the promise to resolve and then return its value.

## Example 1

```ts
const searchValue = await page.$eval('#search', (el) => el.value);
const preloadHref = await page.$eval('link[rel=preload]', (el) => el.href);
const html = await page.$eval('.main-container', (el) => el.outerHTML);
```

If you are using TypeScript, you may have to provide an explicit type to the first argument of the `pageFunction`. By default it is typed as `Element`, but you may need to provide a more specific sub-type:

## Example 2

```ts
// if you don't provide HTMLInputElement here, TS will error
// as `value` is not on `Element`
const searchValue = await page.$eval('#search', (el: HTMLInputElement) => el.value);
```

The compiler should be able to infer the return type from the `pageFunction` you provide. If it is unable to, you can use the generic type to tell the compiler what return type you expect from `$eval`:

## Example 3

```ts
// The compiler can infer the return type in this case, but if it can't
// or if you want to be more explicit, provide it as the generic type.
const searchValue = await page.$eval<string>('#search', (el: HTMLInputElement) => el.value);
```

# Page.addScriptTag() method

Source: https://pptr.dev/api/puppeteer.page.addscripttag

Adds a `<script>` tag into the page with the desired URL or content.

### Signature

```typescript
class Page {
	addScriptTag(options: FrameAddScriptTagOptions): Promise<ElementHandle<HTMLScriptElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[FrameAddScriptTagOptions](./puppeteer.frameaddscripttagoptions.md)

</td><td>

Options for the script.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLScriptElement&gt;&gt;

An [element handle](./puppeteer.elementhandle.md) to the injected `<script>` element.

## Remarks

Shortcut for [page.mainFrame().addScriptTag(options)](./puppeteer.frame.addscripttag.md).

# Page.addStyleTag() method

Source: https://pptr.dev/api/puppeteer.page.addstyletag

<h2 id="overload-1">addStyleTag(): Promise&lt;ElementHandle&lt;HTMLStyleElement&gt;&gt;</h2>

Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.

Shortcut for [page.mainFrame().addStyleTag(options)](./puppeteer.frame.addstyletag.md#overload-2).

### Signature

```typescript
class Page {
	addStyleTag(options: Omit<FrameAddStyleTagOptions, 'url'>): Promise<ElementHandle<HTMLStyleElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Omit&lt;[FrameAddStyleTagOptions](./puppeteer.frameaddstyletagoptions.md), 'url'&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLStyleElement&gt;&gt;

An [element handle](./puppeteer.elementhandle.md) to the injected `<link>` or `<style>` element.

<h2 id="overload-2">addStyleTag(): Promise&lt;ElementHandle&lt;HTMLLinkElement&gt;&gt;</h2>

### Signature

```typescript
class Page {
	addStyleTag(options: FrameAddStyleTagOptions): Promise<ElementHandle<HTMLLinkElement>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[FrameAddStyleTagOptions](./puppeteer.frameaddstyletagoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLLinkElement&gt;&gt;

# Page.authenticate() method

Source: https://pptr.dev/api/puppeteer.page.authenticate

Provide credentials for `HTTP authentication`.

:::note

Request interception will be turned on behind the scenes to implement authentication. This might affect performance.

:::

### Signature

```typescript
class Page {
	abstract authenticate(credentials: Credentials | null): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

credentials

</td><td>

[Credentials](./puppeteer.credentials.md) \| null

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

To disable authentication, pass `null`.

# Page.bringToFront() method

Source: https://pptr.dev/api/puppeteer.page.bringtofront

Brings page to front (activates tab).

### Signature

```typescript
class Page {
	abstract bringToFront(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Page.browser() method

Source: https://pptr.dev/api/puppeteer.page.browser

Get the browser the page belongs to.

### Signature

```typescript
class Page {
	abstract browser(): Browser;
}
```

**Returns:**

[Browser](./puppeteer.browser.md)

# Page.browserContext() method

Source: https://pptr.dev/api/puppeteer.page.browsercontext

Get the browser context that the page belongs to.

### Signature

```typescript
class Page {
	abstract browserContext(): BrowserContext;
}
```

**Returns:**

[BrowserContext](./puppeteer.browsercontext.md)

# Page.captureHeapSnapshot() method

Source: https://pptr.dev/api/puppeteer.page.captureheapsnapshot

Captures a snapshot of the JavaScript heap and writes it to a file.

### Signature

```typescript
class Page {
	abstract captureHeapSnapshot(options: HeapSnapshotOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[HeapSnapshotOptions](./puppeteer.heapsnapshotoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.click() method

Source: https://pptr.dev/api/puppeteer.page.click

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to click in the center of the element. If there's no element matching `selector`, the method throws an error.

### Signature

```typescript
class Page {
	click(selector: string, options?: Readonly<ClickOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax). If there are multiple elements satisfying the `selector`, the first will be clicked

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[ClickOptions](./puppeteer.clickoptions.md)&gt;

</td><td>

_(Optional)_ `Object`

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

## Remarks

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```ts
const [response] = await Promise.all([page.waitForNavigation(waitOptions), page.click(selector, clickOptions)]);
```

Shortcut for [page.mainFrame().click(selector\[, options\])](./puppeteer.frame.click.md).

# Page.close() method

Source: https://pptr.dev/api/puppeteer.page.close

### Signature

```typescript
class Page {
	abstract close(options?: { runBeforeUnload?: boolean }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; runBeforeUnload?: boolean; &#125;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.content() method

Source: https://pptr.dev/api/puppeteer.page.content

The full HTML contents of the page, including the DOCTYPE.

### Signature

```typescript
class Page {
	content(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

# Page.cookies() method

Source: https://pptr.dev/api/puppeteer.page.cookies

> Warning: This API is now obsolete.
>
> Page-level cookie API is deprecated. Use [Browser.cookies()](./puppeteer.browser.cookies.md) or [BrowserContext.cookies()](./puppeteer.browsercontext.cookies.md) instead.

If no URLs are specified, this method returns cookies for the current page URL. If URLs are specified, only cookies for those URLs are returned.

### Signature

```typescript
class Page {
	abstract cookies(...urls: string[]): Promise<Cookie[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

urls

</td><td>

string\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Cookie](./puppeteer.cookie.md)\[\]&gt;

# Page.createCDPSession() method

Source: https://pptr.dev/api/puppeteer.page.createcdpsession

Creates a Chrome Devtools Protocol session attached to the page.

### Signature

```typescript
class Page {
	abstract createCDPSession(): Promise<CDPSession>;
}
```

**Returns:**

Promise&lt;[CDPSession](./puppeteer.cdpsession.md)&gt;

# Page.createPDFStream() method

Source: https://pptr.dev/api/puppeteer.page.createpdfstream

Generates a PDF of the page with the `print` CSS media type.

### Signature

```typescript
class Page {
	abstract createPDFStream(options?: PDFOptions): Promise<ReadableStream<Uint8Array>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[PDFOptions](./puppeteer.pdfoptions.md)

</td><td>

_(Optional)_ options for generating the PDF.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;ReadableStream&lt;Uint8Array&gt;&gt;

## Remarks

To generate a PDF with the `screen` media type, call [\`page.emulateMediaType('screen')\`](./puppeteer.page.emulatemediatype.md) before calling `page.pdf()`.

By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [\`-webkit-print-color-adjust\`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

# Page.deleteCookie() method

Source: https://pptr.dev/api/puppeteer.page.deletecookie

> Warning: This API is now obsolete.
>
> Page-level cookie API is deprecated. Use [Browser.deleteCookie()](./puppeteer.browser.deletecookie.md), [BrowserContext.deleteCookie()](./puppeteer.browsercontext.deletecookie.md), [Browser.deleteMatchingCookies()](./puppeteer.browser.deletematchingcookies.md) or [BrowserContext.deleteMatchingCookies()](./puppeteer.browsercontext.deletematchingcookies.md) instead.

### Signature

```typescript
class Page {
	abstract deleteCookie(...cookies: DeleteCookiesRequest[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[DeleteCookiesRequest](./puppeteer.deletecookiesrequest.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.emulate() method

Source: https://pptr.dev/api/puppeteer.page.emulate

Emulates a given device's metrics and user agent.

To aid emulation, Puppeteer provides a list of known devices that can be via [KnownDevices](./puppeteer.knowndevices.md).

### Signature

```typescript
class Page {
	emulate(device: Device): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

device

</td><td>

[Device](./puppeteer.device.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

This method is a shortcut for calling two methods: [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2) and [Page.setViewport()](./puppeteer.page.setviewport.md).

This method will resize the page. A lot of websites don't expect phones to change size, so you should emulate before navigating to the page.

## Example

```ts
import { KnownDevices } from 'puppeteer';
const iPhone = KnownDevices['iPhone 15 Pro'];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulate(iPhone);
await page.goto('https://www.google.com');
// other actions...
await browser.close();
```

# Page.emulateCPUThrottling() method

Source: https://pptr.dev/api/puppeteer.page.emulatecputhrottling

Enables CPU throttling to emulate slow CPUs.

### Signature

```typescript
class Page {
	abstract emulateCPUThrottling(factor: number | null): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

factor

</td><td>

number \| null

</td><td>

slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.emulateFocusedPage() method

Source: https://pptr.dev/api/puppeteer.page.emulatefocusedpage

Emulates focus state of the page.

### Signature

```typescript
class Page {
	abstract emulateFocusedPage(enabled: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

Whether to emulate focus.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.emulateIdleState() method

Source: https://pptr.dev/api/puppeteer.page.emulateidlestate

Emulates the idle state. If no arguments set, clears idle state emulation.

### Signature

```typescript
class Page {
	abstract emulateIdleState(overrides?: { isUserActive: boolean; isScreenUnlocked: boolean }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

overrides

</td><td>

&#123; isUserActive: boolean; isScreenUnlocked: boolean; &#125;

</td><td>

_(Optional)_ Mock idle state. If not set, clears idle overrides

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
// set idle emulation
await page.emulateIdleState({isUserActive: true, isScreenUnlocked: false});

// do some checks here
...

// clear idle emulation
await page.emulateIdleState();
```

# Page.emulateMediaFeatures() method

Source: https://pptr.dev/api/puppeteer.page.emulatemediafeatures

### Signature

```typescript
class Page {
	abstract emulateMediaFeatures(features?: MediaFeature[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

features

</td><td>

[MediaFeature](./puppeteer.mediafeature.md)\[\]

</td><td>

_(Optional)_ `<?Array<Object>>` Given an array of media feature objects, emulates CSS media features on the page. Each media feature object must have the following properties:

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
// → false

await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-reduced-motion: no-preference)').matches);
// → false

await page.emulateMediaFeatures([
	{ name: 'prefers-color-scheme', value: 'dark' },
	{ name: 'prefers-reduced-motion', value: 'reduce' },
]);
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
// → false
await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-reduced-motion: no-preference)').matches);
// → false

await page.emulateMediaFeatures([{ name: 'color-gamut', value: 'p3' }]);
await page.evaluate(() => matchMedia('(color-gamut: srgb)').matches);
// → true
await page.evaluate(() => matchMedia('(color-gamut: p3)').matches);
// → true
await page.evaluate(() => matchMedia('(color-gamut: rec2020)').matches);
// → false
```

# Page.emulateMediaType() method

Source: https://pptr.dev/api/puppeteer.page.emulatemediatype

### Signature

```typescript
class Page {
	abstract emulateMediaType(type?: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

string

</td><td>

_(Optional)_ Changes the CSS media type of the page. The only allowed values are `screen`, `print` and `null`. Passing `null` disables CSS media emulation.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false

await page.emulateMediaType('print');
await page.evaluate(() => matchMedia('screen').matches);
// → false
await page.evaluate(() => matchMedia('print').matches);
// → true

await page.emulateMediaType(null);
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false
```

# Page.emulateNetworkConditions() method

Source: https://pptr.dev/api/puppeteer.page.emulatenetworkconditions

This does not affect WebSockets and WebRTC PeerConnections (see https://crbug.com/563644). To set the page offline, you can use [Page.setOfflineMode()](./puppeteer.page.setofflinemode.md).

A list of predefined network conditions can be used by importing [PredefinedNetworkConditions](./puppeteer.predefinednetworkconditions.md).

### Signature

```typescript
class Page {
	abstract emulateNetworkConditions(networkConditions: NetworkConditions | null): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

networkConditions

</td><td>

[NetworkConditions](./puppeteer.networkconditions.md) \| null

</td><td>

Passing `null` disables network condition emulation.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
import { PredefinedNetworkConditions } from 'puppeteer';
const slow3G = PredefinedNetworkConditions['Slow 3G'];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulateNetworkConditions(slow3G);
await page.goto('https://www.google.com');
// other actions...
await browser.close();
```

# Page.emulateTimezone() method

Source: https://pptr.dev/api/puppeteer.page.emulatetimezone

### Signature

```typescript
class Page {
	abstract emulateTimezone(timezoneId?: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

timezoneId

</td><td>

string

</td><td>

_(Optional)_ Changes the timezone of the page. See [ICU’s metaZones.txt](https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt) for a list of supported timezone IDs. Passing `null` disables timezone emulation.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.emulateVisionDeficiency() method

Source: https://pptr.dev/api/puppeteer.page.emulatevisiondeficiency

Simulates the given vision deficiency on the page.

### Signature

```typescript
class Page {
	abstract emulateVisionDeficiency(type?: Protocol.Emulation.SetEmulatedVisionDeficiencyRequest['type']): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

type

</td><td>

Protocol.Emulation.SetEmulatedVisionDeficiencyRequest\['type'\]

</td><td>

_(Optional)_ the type of deficiency to simulate, or `'none'` to reset.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://v8.dev/blog/10-years');

await page.emulateVisionDeficiency('achromatopsia');
await page.screenshot({ path: 'achromatopsia.png' });

await page.emulateVisionDeficiency('deuteranopia');
await page.screenshot({ path: 'deuteranopia.png' });

await page.emulateVisionDeficiency('blurredVision');
await page.screenshot({ path: 'blurred-vision.png' });

await page.emulateVisionDeficiency('reducedContrast');
await page.screenshot({ path: 'reduced-contrast.png' });

await browser.close();
```

# Page.evaluate() method

Source: https://pptr.dev/api/puppeteer.page.evaluate

Evaluates a function in the page's context and returns the result.

If the function passed to `page.evaluate` returns a Promise, the function will wait for the promise to resolve and return its value.

### Signature

```typescript
class Page {
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

a function that is run within the page

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

arguments to be passed to the pageFunction

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

the return value of `pageFunction`.

## Example 1

```ts
const result = await frame.evaluate(() => {
	return Promise.resolve(8 * 7);
});
console.log(result); // prints "56"
```

You can pass a string instead of a function (although functions are recommended as they are easier to debug and use with TypeScript):

## Example 2

```ts
const aHandle = await page.evaluate('1 + 2');
```

To get the best TypeScript experience, you should pass in as the generic the type of `pageFunction`:

```ts
const aHandle = await page.evaluate(() => 2);
```

## Example 3

[ElementHandle](./puppeteer.elementhandle.md) instances (including [JSHandle](./puppeteer.jshandle.md)s) can be passed as arguments to the `pageFunction`:

```ts
const bodyHandle = await page.$('body');
const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

# Page.evaluateHandle() method

Source: https://pptr.dev/api/puppeteer.page.evaluatehandle

### Signature

```typescript
class Page {
	evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

a function that is run within the page

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

arguments to be passed to the pageFunction

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

## Remarks

The only difference between [page.evaluate](./puppeteer.page.evaluate.md) and `page.evaluateHandle` is that `evaluateHandle` will return the value wrapped in an in-page object.

If the function passed to `page.evaluateHandle` returns a Promise, the function will wait for the promise to resolve and return its value.

You can pass a string instead of a function (although functions are recommended as they are easier to debug and use with TypeScript):

## Example 1

```ts
const aHandle = await page.evaluateHandle('document');
```

## Example 2

[JSHandle](./puppeteer.jshandle.md) instances can be passed as arguments to the `pageFunction`:

```ts
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle((body) => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

Most of the time this function returns a [JSHandle](./puppeteer.jshandle.md), but if `pageFunction` returns a reference to an element, you instead get an [ElementHandle](./puppeteer.elementhandle.md) back:

## Example 3

```ts
const button = await page.evaluateHandle(() => document.querySelector('button'));
// can call `click` because `button` is an `ElementHandle`
await button.click();
```

The TypeScript definitions assume that `evaluateHandle` returns a `JSHandle`, but if you know it's going to return an `ElementHandle`, pass it as the generic argument:

```ts
const button = await page.evaluateHandle<ElementHandle>(...);
```

# Page.evaluateOnNewDocument() method

Source: https://pptr.dev/api/puppeteer.page.evaluateonnewdocument

Adds a function which would be invoked in one of the following scenarios:

- whenever the page is navigated

- whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame.

The function is invoked after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

### Signature

```typescript
class Page {
	abstract evaluateOnNewDocument<Params extends unknown[], Func extends (...args: Params) => unknown = (...args: Params) => unknown>(pageFunction: Func | string, ...args: Params): Promise<NewDocumentScriptEvaluation>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

Function to be evaluated in browser context

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to pass to `pageFunction`

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[NewDocumentScriptEvaluation](./puppeteer.newdocumentscriptevaluation.md)&gt;

## Example

An example of overriding the navigator.languages property before the page loads:

```ts
// preload.js

// overwrite the `languages` property to use a custom getter
Object.defineProperty(navigator, 'languages', {
	get: function () {
		return ['en-US', 'en', 'bn'];
	},
});

// In your puppeteer script, assuming the preload.js file is
// in same folder of our script.
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

# Page.exposeFunction() method

Source: https://pptr.dev/api/puppeteer.page.exposefunction

The method adds a function called `name` on the page's `window` object. When called, the function executes `puppeteerFunction` in node.js and returns a `Promise` which resolves to the return value of `puppeteerFunction`.

If the puppeteerFunction returns a `Promise`, it will be awaited.

:::note

Functions installed via `page.exposeFunction` survive navigations.

:::

### Signature

```typescript
class Page {
	abstract exposeFunction(
		name: string,
		pptrFunction:
			| Function
			| {
					default: Function;
			  },
	): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

name

</td><td>

string

</td><td>

Name of the function on the window object

</td></tr>
<tr><td>

pptrFunction

</td><td>

Function \| &#123; default: Function; &#125;

</td><td>

Callback function which will be called in Puppeteer's context.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example 1

An example of adding an `md5` function into the page:

```ts
import puppeteer from 'puppeteer';
import crypto from 'crypto';

const browser = await puppeteer.launch();
const page = await browser.newPage();
page.on('console', (msg) => console.log(msg.text()));
await page.exposeFunction('md5', (text) => crypto.createHash('md5').update(text).digest('hex'));
await page.evaluate(async () => {
	// use window.md5 to compute hashes
	const myString = 'PUPPETEER';
	const myHash = await window.md5(myString);
	console.log(`md5 of ${myString} is ${myHash}`);
});
await browser.close();
```

## Example 2

An example of adding a `window.readfile` function into the page:

```ts
import puppeteer from 'puppeteer';
import fs from 'node:fs';

const browser = await puppeteer.launch();
const page = await browser.newPage();
page.on('console', (msg) => console.log(msg.text()));
await page.exposeFunction('readfile', async (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, text) => {
			if (err) reject(err);
			else resolve(text);
		});
	});
});
await page.evaluate(async () => {
	// use window.readfile to read contents of a file
	const content = await window.readfile('/etc/hosts');
	console.log(content);
});
await browser.close();
```

# Page.extensionRealms() method

Source: https://pptr.dev/api/puppeteer.page.extensionrealms

Retrieves the list of extension execution realms in the main frame of the page. These realms correspond to extension content scripts running on the page.

Shortcut for [mainFrame().extensionRealms()](./puppeteer.frame.extensionrealms.md).

### Signature

```typescript
class Page {
	abstract extensionRealms(): Realm[];
}
```

**Returns:**

[Realm](./puppeteer.realm.md)\[\]

# Page.focus() method

Source: https://pptr.dev/api/puppeteer.page.focus

This method fetches an element with `selector` and focuses it. If there's no element matching `selector`, the method throws an error.

### Signature

```typescript
class Page {
	focus(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax). If there are multiple elements satisfying the selector, the first will be focused.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the element matching selector is successfully focused. The promise will be rejected if there is no element matching selector.

## Remarks

Shortcut for [page.mainFrame().focus(selector)](./puppeteer.frame.focus.md).

# Page.frames() method

Source: https://pptr.dev/api/puppeteer.page.frames

An array of all frames attached to the page.

### Signature

```typescript
class Page {
	abstract frames(): Frame[];
}
```

**Returns:**

[Frame](./puppeteer.frame.md)\[\]

# Page.getDefaultNavigationTimeout() method

Source: https://pptr.dev/api/puppeteer.page.getdefaultnavigationtimeout

Maximum navigation time in milliseconds.

### Signature

```typescript
class Page {
	abstract getDefaultNavigationTimeout(): number;
}
```

**Returns:**

number

# Page.getDefaultTimeout() method

Source: https://pptr.dev/api/puppeteer.page.getdefaulttimeout

Maximum time in milliseconds.

### Signature

```typescript
class Page {
	abstract getDefaultTimeout(): number;
}
```

**Returns:**

number

# Page.goBack() method

Source: https://pptr.dev/api/puppeteer.page.goback

This method navigate to the previous page in history.

### Signature

```typescript
class Page {
	abstract goBack(options?: WaitForOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitForOptions](./puppeteer.waitforoptions.md)

</td><td>

_(Optional)_ Navigation parameters

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If the navigation is same page, returns null. If no history entry is found throws.

# Page.goForward() method

Source: https://pptr.dev/api/puppeteer.page.goforward

This method navigate to the next page in history.

### Signature

```typescript
class Page {
	abstract goForward(options?: WaitForOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitForOptions](./puppeteer.waitforoptions.md)

</td><td>

_(Optional)_ Navigation Parameter

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If the navigation is same page, returns null. If no history entry is found throws.

# Page.goto() method

Source: https://pptr.dev/api/puppeteer.page.goto

Navigates the frame or page to the given `url`.

### Signature

```typescript
class Page {
	goto(url: string, options?: GoToOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

url

</td><td>

string

</td><td>

URL to navigate the frame to. The URL should include scheme, e.g. `https://`

</td></tr>
<tr><td>

options

</td><td>

[GoToOptions](./puppeteer.gotooptions.md)

</td><td>

_(Optional)_ Options to configure waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

A promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

## Remarks

Navigation to `about:blank` or navigation to the same URL with a different hash will succeed and return `null`.

:::warning

Headless shell mode doesn't support navigation to a PDF document. See the [upstream issue](https://crbug.com/761295).

:::

In headless shell, this method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error". The status code for such responses can be retrieved by calling [HTTPResponse.status()](./puppeteer.httpresponse.status.md).

# Page.hasDevTools() method

Source: https://pptr.dev/api/puppeteer.page.hasdevtools

Returns true if DevTools is attached to the current page. Use [Page.openDevTools()](./puppeteer.page.opendevtools.md) to get the DevTools page.

### Signature

```typescript
class Page {
	abstract hasDevTools(): Promise<boolean>;
}
```

**Returns:**

Promise&lt;boolean&gt;

# Page.hover() method

Source: https://pptr.dev/api/puppeteer.page.hover

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to hover over the center of the element. If there's no element matching `selector`, the method throws an error.

### Signature

```typescript
class Page {
	hover(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax). If there are multiple elements satisfying the `selector`, the first will be hovered.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

## Remarks

Shortcut for [page.mainFrame().hover(selector)](./puppeteer.page.hover.md).

# Page.isClosed() method

Source: https://pptr.dev/api/puppeteer.page.isclosed

Indicates that the page has been closed.

### Signature

```typescript
class Page {
	abstract isClosed(): boolean;
}
```

**Returns:**

boolean

# Page.isDragInterceptionEnabled() method

Source: https://pptr.dev/api/puppeteer.page.isdraginterceptionenabled

> Warning: This API is now obsolete.
>
> We no longer support intercepting drag payloads. Use the new drag APIs found on [ElementHandle](./puppeteer.elementhandle.md) to drag (or just use the [Page.mouse](./puppeteer.page.md#mouse)).

`true` if drag events are being intercepted, `false` otherwise.

### Signature

```typescript
class Page {
	abstract isDragInterceptionEnabled(): boolean;
}
```

**Returns:**

boolean

# Page.isJavaScriptEnabled() method

Source: https://pptr.dev/api/puppeteer.page.isjavascriptenabled

`true` if the page has JavaScript enabled, `false` otherwise.

### Signature

```typescript
class Page {
	abstract isJavaScriptEnabled(): boolean;
}
```

**Returns:**

boolean

# Page.isServiceWorkerBypassed() method

Source: https://pptr.dev/api/puppeteer.page.isserviceworkerbypassed

`true` if the service worker are being bypassed, `false` otherwise.

### Signature

```typescript
class Page {
	abstract isServiceWorkerBypassed(): boolean;
}
```

**Returns:**

boolean

# Page.locator() method

Source: https://pptr.dev/api/puppeteer.page.locator

<h2 id="overload-1">locator(): Locator&lt;NodeFor&lt;Selector&gt;&gt;</h2>

Creates a locator for the provided selector. See [Locator](./puppeteer.locator.md) for details and supported actions.

### Signature

```typescript
class Page {
	locator<Selector extends string>(selector: Selector): Locator<NodeFor<Selector>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt;

<h2 id="overload-2">locator(): Locator&lt;Ret&gt;</h2>

Creates a locator for the provided function. See [Locator](./puppeteer.locator.md) for details and supported actions.

### Signature

```typescript
class Page {
	locator<Ret>(func: () => Awaitable<Ret>): Locator<Ret>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

func

</td><td>

() =&gt; [Awaitable](./puppeteer.awaitable.md)&lt;Ret&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Locator](./puppeteer.locator.md)&lt;Ret&gt;

# Page.mainFrame() method

Source: https://pptr.dev/api/puppeteer.page.mainframe

The page's main frame.

### Signature

```typescript
class Page {
	abstract mainFrame(): Frame;
}
```

**Returns:**

[Frame](./puppeteer.frame.md)

# Page class

Source: https://pptr.dev/api/puppeteer.page

Page provides methods to interact with a single tab or [extension background page](https://developer.chrome.com/extensions/background_pages) in the browser.

:::note

One Browser instance might have multiple Page instances.

:::

### Signature

```typescript
export declare abstract class Page extends EventEmitter<PageEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[PageEvents](./puppeteer.pageevents.md)&gt;

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Page` class.

## Example 1

This example creates a page, navigates it to a URL, and then saves a screenshot:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
```

The Page class extends from Puppeteer's [EventEmitter](./puppeteer.eventemitter.md) class and will emit various events which are documented in the [PageEvent](./puppeteer.pageevent.md) enum.

## Example 2

This example logs a message for a single page `load` event:

```ts
page.once('load', () => console.log('Page loaded!'));
```

To unsubscribe from events use the [EventEmitter.off()](./puppeteer.eventemitter.off.md) method:

```ts
function logRequest(interceptedRequest) {
	console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.off('request', logRequest);
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="accessibility">accessibility</span>

</td><td>

`readonly`

</td><td>

[Accessibility](./puppeteer.accessibility.md)

</td><td>

The Accessibility class provides methods for inspecting the browser's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or [switches](https://en.wikipedia.org/wiki/Switch_access).

**Remarks:**

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Blink - Chrome's rendering engine - has a concept of "accessibility tree", which is then translated into different platform-specific APIs. Accessibility namespace gives users access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by assistive technologies themselves. By default, Puppeteer tries to approximate this filtering, exposing only the "interesting" nodes of the tree.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Accessibility` class.

</td></tr>
<tr><td>

<span id="bluetooth">bluetooth</span>

</td><td>

`readonly`

</td><td>

[BluetoothEmulation](./puppeteer.bluetoothemulation.md)

</td><td>

Exposes the bluetooth emulation abilities.

**Remarks:**

[Web Bluetooth specification](https://webbluetoothcg.github.io/web-bluetooth/#simulated-bluetooth-adapter) requires the emulated adapters should be isolated per top-level navigable. However, at the moment Chromium's bluetooth emulation implementation is tight to the browser context, not the page. This means the bluetooth emulation exposed from different pages of the same browser context would interfere their states.

</td></tr>
<tr><td>

<span id="coverage">coverage</span>

</td><td>

`readonly`

</td><td>

[Coverage](./puppeteer.coverage.md)

</td><td>

The Coverage class provides methods to gather information about parts of JavaScript and CSS that were used by the page.

**Remarks:**

To output coverage in a form consumable by [Istanbul](https://github.com/istanbuljs), see [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Coverage` class.

</td></tr>
<tr><td>

<span id="keyboard">keyboard</span>

</td><td>

`readonly`

</td><td>

[Keyboard](./puppeteer.keyboard.md)

</td><td>

Keyboard provides an api for managing a virtual keyboard. The high level api is [Keyboard.type()](./puppeteer.keyboard.type.md), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

**Remarks:**

For finer control, you can use [Keyboard.down()](./puppeteer.keyboard.down.md), [Keyboard.up()](./puppeteer.keyboard.up.md), and [Keyboard.sendCharacter()](./puppeteer.keyboard.sendcharacter.md) to manually fire events as if they were generated from a real keyboard.

On macOS, keyboard shortcuts like `⌘ A` -&gt; Select All do not work. See [\#1313](https://github.com/puppeteer/puppeteer/issues/1313).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Keyboard` class.

</td></tr>
<tr><td>

<span id="mouse">mouse</span>

</td><td>

`readonly`

</td><td>

[Mouse](./puppeteer.mouse.md)

</td><td>

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

**Remarks:**

Every `page` object has its own Mouse, accessible with [Page.mouse](./puppeteer.page.md#mouse).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Mouse` class.

</td></tr>
<tr><td>

<span id="touchscreen">touchscreen</span>

</td><td>

`readonly`

</td><td>

[Touchscreen](./puppeteer.touchscreen.md)

</td><td>

The Touchscreen class exposes touchscreen events.

</td></tr>
<tr><td>

<span id="tracing">tracing</span>

</td><td>

`readonly`

</td><td>

[Tracing](./puppeteer.tracing.md)

</td><td>

The Tracing class exposes the tracing audit interface.

**Remarks:**

You can use `tracing.start` and `tracing.stop` to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Tracing` class.

</td></tr>
<tr><td>

<span id="webmcp">webmcp</span>

</td><td>

`readonly`

</td><td>

[WebMCP](./puppeteer.webmcp.md)

</td><td>

**_(Experimental)_** Experimental API for [WebMCP](https://github.com/webmachinelearning/webmcp). Requires Chrome 149+ with the `--enable-features=WebMCPTesting,DevToolsWebMCPSupport` flags enabled.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_">[$(selector)](./puppeteer.page._.md)</span>

</td><td>

</td><td>

Finds the first element that matches the selector. If no element matches the selector, the return value resolves to `null`.

**Remarks:**

Shortcut for [Page.mainFrame().$(selector)](./puppeteer.frame._.md).

</td></tr>
<tr><td>

<span id="__">[$$(selector, options)](./puppeteer.page.__.md)</span>

</td><td>

</td><td>

Finds elements on the page that match the selector. If no elements match the selector, the return value resolves to `[]`.

**Remarks:**

Shortcut for [Page.mainFrame().$$(selector)](./puppeteer.frame.__.md).

</td></tr>
<tr><td>

<span id="__eval">[$$eval(selector, pageFunction, args)](./puppeteer.page.__eval.md)</span>

</td><td>

</td><td>

This method returns all elements matching the selector and passes the resulting array as the first argument to the `pageFunction`.

**Remarks:**

If `pageFunction` returns a promise `$$eval` will wait for the promise to resolve and then return its value.

</td></tr>
<tr><td>

<span id="_eval">[$eval(selector, pageFunction, args)](./puppeteer.page._eval.md)</span>

</td><td>

</td><td>

This method finds the first element within the page that matches the selector and passes the result as the first argument to the `pageFunction`.

**Remarks:**

If no element is found matching `selector`, the method will throw an error.

If `pageFunction` returns a promise `$eval` will wait for the promise to resolve and then return its value.

</td></tr>
<tr><td>

<span id="addscripttag">[addScriptTag(options)](./puppeteer.page.addscripttag.md)</span>

</td><td>

</td><td>

Adds a `<script>` tag into the page with the desired URL or content.

**Remarks:**

Shortcut for [page.mainFrame().addScriptTag(options)](./puppeteer.frame.addscripttag.md).

</td></tr>
<tr><td>

<span id="addstyletag">[addStyleTag(options)](./puppeteer.page.addstyletag.md)</span>

</td><td>

</td><td>

Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.

Shortcut for [page.mainFrame().addStyleTag(options)](./puppeteer.frame.addstyletag.md#overload-2).

</td></tr>
<tr><td>

<span id="addstyletag">[addStyleTag(options)](./puppeteer.page.addstyletag.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="authenticate">[authenticate(credentials)](./puppeteer.page.authenticate.md)</span>

</td><td>

</td><td>

Provide credentials for `HTTP authentication`.

:::note

Request interception will be turned on behind the scenes to implement authentication. This might affect performance.

:::

**Remarks:**

To disable authentication, pass `null`.

</td></tr>
<tr><td>

<span id="bringtofront">[bringToFront()](./puppeteer.page.bringtofront.md)</span>

</td><td>

</td><td>

Brings page to front (activates tab).

</td></tr>
<tr><td>

<span id="browser">[browser()](./puppeteer.page.browser.md)</span>

</td><td>

</td><td>

Get the browser the page belongs to.

</td></tr>
<tr><td>

<span id="browsercontext">[browserContext()](./puppeteer.page.browsercontext.md)</span>

</td><td>

</td><td>

Get the browser context that the page belongs to.

</td></tr>
<tr><td>

<span id="captureheapsnapshot">[captureHeapSnapshot(options)](./puppeteer.page.captureheapsnapshot.md)</span>

</td><td>

</td><td>

Captures a snapshot of the JavaScript heap and writes it to a file.

</td></tr>
<tr><td>

<span id="click">[click(selector, options)](./puppeteer.page.click.md)</span>

</td><td>

</td><td>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to click in the center of the element. If there's no element matching `selector`, the method throws an error.

**Remarks:**

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```ts
const [response] = await Promise.all([page.waitForNavigation(waitOptions), page.click(selector, clickOptions)]);
```

Shortcut for [page.mainFrame().click(selector\[, options\])](./puppeteer.frame.click.md).

</td></tr>
<tr><td>

<span id="close">[close(options)](./puppeteer.page.close.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="content">[content()](./puppeteer.page.content.md)</span>

</td><td>

</td><td>

The full HTML contents of the page, including the DOCTYPE.

</td></tr>
<tr><td>

<span id="cookies">[cookies(urls)](./puppeteer.page.cookies.md)</span>

</td><td>

`deprecated`

</td><td>

If no URLs are specified, this method returns cookies for the current page URL. If URLs are specified, only cookies for those URLs are returned.

**Deprecated:**

Page-level cookie API is deprecated. Use [Browser.cookies()](./puppeteer.browser.cookies.md) or [BrowserContext.cookies()](./puppeteer.browsercontext.cookies.md) instead.

</td></tr>
<tr><td>

<span id="createcdpsession">[createCDPSession()](./puppeteer.page.createcdpsession.md)</span>

</td><td>

</td><td>

Creates a Chrome Devtools Protocol session attached to the page.

</td></tr>
<tr><td>

<span id="createpdfstream">[createPDFStream(options)](./puppeteer.page.createpdfstream.md)</span>

</td><td>

</td><td>

Generates a PDF of the page with the `print` CSS media type.

**Remarks:**

To generate a PDF with the `screen` media type, call [\`page.emulateMediaType('screen')\`](./puppeteer.page.emulatemediatype.md) before calling `page.pdf()`.

By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [\`-webkit-print-color-adjust\`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

</td></tr>
<tr><td>

<span id="deletecookie">[deleteCookie(cookies)](./puppeteer.page.deletecookie.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Page-level cookie API is deprecated. Use [Browser.deleteCookie()](./puppeteer.browser.deletecookie.md), [BrowserContext.deleteCookie()](./puppeteer.browsercontext.deletecookie.md), [Browser.deleteMatchingCookies()](./puppeteer.browser.deletematchingcookies.md) or [BrowserContext.deleteMatchingCookies()](./puppeteer.browsercontext.deletematchingcookies.md) instead.

</td></tr>
<tr><td>

<span id="emulate">[emulate(device)](./puppeteer.page.emulate.md)</span>

</td><td>

</td><td>

Emulates a given device's metrics and user agent.

To aid emulation, Puppeteer provides a list of known devices that can be via [KnownDevices](./puppeteer.knowndevices.md).

**Remarks:**

This method is a shortcut for calling two methods: [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2) and [Page.setViewport()](./puppeteer.page.setviewport.md).

This method will resize the page. A lot of websites don't expect phones to change size, so you should emulate before navigating to the page.

</td></tr>
<tr><td>

<span id="emulatecputhrottling">[emulateCPUThrottling(factor)](./puppeteer.page.emulatecputhrottling.md)</span>

</td><td>

</td><td>

Enables CPU throttling to emulate slow CPUs.

</td></tr>
<tr><td>

<span id="emulatefocusedpage">[emulateFocusedPage(enabled)](./puppeteer.page.emulatefocusedpage.md)</span>

</td><td>

</td><td>

Emulates focus state of the page.

</td></tr>
<tr><td>

<span id="emulateidlestate">[emulateIdleState(overrides)](./puppeteer.page.emulateidlestate.md)</span>

</td><td>

</td><td>

Emulates the idle state. If no arguments set, clears idle state emulation.

</td></tr>
<tr><td>

<span id="emulatemediafeatures">[emulateMediaFeatures(features)](./puppeteer.page.emulatemediafeatures.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="emulatemediatype">[emulateMediaType(type)](./puppeteer.page.emulatemediatype.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="emulatenetworkconditions">[emulateNetworkConditions(networkConditions)](./puppeteer.page.emulatenetworkconditions.md)</span>

</td><td>

</td><td>

This does not affect WebSockets and WebRTC PeerConnections (see https://crbug.com/563644). To set the page offline, you can use [Page.setOfflineMode()](./puppeteer.page.setofflinemode.md).

A list of predefined network conditions can be used by importing [PredefinedNetworkConditions](./puppeteer.predefinednetworkconditions.md).

</td></tr>
<tr><td>

<span id="emulatetimezone">[emulateTimezone(timezoneId)](./puppeteer.page.emulatetimezone.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="emulatevisiondeficiency">[emulateVisionDeficiency(type)](./puppeteer.page.emulatevisiondeficiency.md)</span>

</td><td>

</td><td>

Simulates the given vision deficiency on the page.

</td></tr>
<tr><td>

<span id="evaluate">[evaluate(pageFunction, args)](./puppeteer.page.evaluate.md)</span>

</td><td>

</td><td>

Evaluates a function in the page's context and returns the result.

If the function passed to `page.evaluate` returns a Promise, the function will wait for the promise to resolve and return its value.

</td></tr>
<tr><td>

<span id="evaluatehandle">[evaluateHandle(pageFunction, args)](./puppeteer.page.evaluatehandle.md)</span>

</td><td>

</td><td>

**Remarks:**

The only difference between [page.evaluate](./puppeteer.page.evaluate.md) and `page.evaluateHandle` is that `evaluateHandle` will return the value wrapped in an in-page object.

If the function passed to `page.evaluateHandle` returns a Promise, the function will wait for the promise to resolve and return its value.

You can pass a string instead of a function (although functions are recommended as they are easier to debug and use with TypeScript):

</td></tr>
<tr><td>

<span id="evaluateonnewdocument">[evaluateOnNewDocument(pageFunction, args)](./puppeteer.page.evaluateonnewdocument.md)</span>

</td><td>

</td><td>

Adds a function which would be invoked in one of the following scenarios:

- whenever the page is navigated

- whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame.

The function is invoked after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

</td></tr>
<tr><td>

<span id="exposefunction">[exposeFunction(name, pptrFunction)](./puppeteer.page.exposefunction.md)</span>

</td><td>

</td><td>

The method adds a function called `name` on the page's `window` object. When called, the function executes `puppeteerFunction` in node.js and returns a `Promise` which resolves to the return value of `puppeteerFunction`.

If the puppeteerFunction returns a `Promise`, it will be awaited.

:::note

Functions installed via `page.exposeFunction` survive navigations.

:::

</td></tr>
<tr><td>

<span id="extensionrealms">[extensionRealms()](./puppeteer.page.extensionrealms.md)</span>

</td><td>

</td><td>

Retrieves the list of extension execution realms in the main frame of the page. These realms correspond to extension content scripts running on the page.

Shortcut for [mainFrame().extensionRealms()](./puppeteer.frame.extensionrealms.md).

</td></tr>
<tr><td>

<span id="focus">[focus(selector)](./puppeteer.page.focus.md)</span>

</td><td>

</td><td>

This method fetches an element with `selector` and focuses it. If there's no element matching `selector`, the method throws an error.

**Remarks:**

Shortcut for [page.mainFrame().focus(selector)](./puppeteer.frame.focus.md).

</td></tr>
<tr><td>

<span id="frames">[frames()](./puppeteer.page.frames.md)</span>

</td><td>

</td><td>

An array of all frames attached to the page.

</td></tr>
<tr><td>

<span id="getdefaultnavigationtimeout">[getDefaultNavigationTimeout()](./puppeteer.page.getdefaultnavigationtimeout.md)</span>

</td><td>

</td><td>

Maximum navigation time in milliseconds.

</td></tr>
<tr><td>

<span id="getdefaulttimeout">[getDefaultTimeout()](./puppeteer.page.getdefaulttimeout.md)</span>

</td><td>

</td><td>

Maximum time in milliseconds.

</td></tr>
<tr><td>

<span id="goback">[goBack(options)](./puppeteer.page.goback.md)</span>

</td><td>

</td><td>

This method navigate to the previous page in history.

</td></tr>
<tr><td>

<span id="goforward">[goForward(options)](./puppeteer.page.goforward.md)</span>

</td><td>

</td><td>

This method navigate to the next page in history.

</td></tr>
<tr><td>

<span id="goto">[goto(url, options)](./puppeteer.page.goto.md)</span>

</td><td>

</td><td>

Navigates the frame or page to the given `url`.

**Remarks:**

Navigation to `about:blank` or navigation to the same URL with a different hash will succeed and return `null`.

:::warning

Headless shell mode doesn't support navigation to a PDF document. See the [upstream issue](https://crbug.com/761295).

:::

In headless shell, this method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error". The status code for such responses can be retrieved by calling [HTTPResponse.status()](./puppeteer.httpresponse.status.md).

</td></tr>
<tr><td>

<span id="hasdevtools">[hasDevTools()](./puppeteer.page.hasdevtools.md)</span>

</td><td>

</td><td>

**_(Experimental)_** Returns true if DevTools is attached to the current page. Use [Page.openDevTools()](./puppeteer.page.opendevtools.md) to get the DevTools page.

</td></tr>
<tr><td>

<span id="hover">[hover(selector)](./puppeteer.page.hover.md)</span>

</td><td>

</td><td>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.mouse](./puppeteer.page.md#mouse) to hover over the center of the element. If there's no element matching `selector`, the method throws an error.

**Remarks:**

Shortcut for [page.mainFrame().hover(selector)](./puppeteer.page.hover.md).

</td></tr>
<tr><td>

<span id="isclosed">[isClosed()](./puppeteer.page.isclosed.md)</span>

</td><td>

</td><td>

Indicates that the page has been closed.

</td></tr>
<tr><td>

<span id="isdraginterceptionenabled">[isDragInterceptionEnabled()](./puppeteer.page.isdraginterceptionenabled.md)</span>

</td><td>

`deprecated`

</td><td>

`true` if drag events are being intercepted, `false` otherwise.

**Deprecated:**

We no longer support intercepting drag payloads. Use the new drag APIs found on [ElementHandle](./puppeteer.elementhandle.md) to drag (or just use the [Page.mouse](./puppeteer.page.md#mouse)).

</td></tr>
<tr><td>

<span id="isjavascriptenabled">[isJavaScriptEnabled()](./puppeteer.page.isjavascriptenabled.md)</span>

</td><td>

</td><td>

`true` if the page has JavaScript enabled, `false` otherwise.

</td></tr>
<tr><td>

<span id="isserviceworkerbypassed">[isServiceWorkerBypassed()](./puppeteer.page.isserviceworkerbypassed.md)</span>

</td><td>

</td><td>

`true` if the service worker are being bypassed, `false` otherwise.

</td></tr>
<tr><td>

<span id="locator">[locator(selector)](./puppeteer.page.locator.md)</span>

</td><td>

</td><td>

Creates a locator for the provided selector. See [Locator](./puppeteer.locator.md) for details and supported actions.

</td></tr>
<tr><td>

<span id="locator">[locator(func)](./puppeteer.page.locator.md#overload-2)</span>

</td><td>

</td><td>

Creates a locator for the provided function. See [Locator](./puppeteer.locator.md) for details and supported actions.

</td></tr>
<tr><td>

<span id="mainframe">[mainFrame()](./puppeteer.page.mainframe.md)</span>

</td><td>

</td><td>

The page's main frame.

</td></tr>
<tr><td>

<span id="metrics">[metrics()](./puppeteer.page.metrics.md)</span>

</td><td>

</td><td>

Object containing metrics as key/value pairs.

**Remarks:**

All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

</td></tr>
<tr><td>

<span id="opendevtools">[openDevTools()](./puppeteer.page.opendevtools.md)</span>

</td><td>

</td><td>

Opens DevTools for the this page if not already open and returns the DevTools page. This method is only available in Chrome.

</td></tr>
<tr><td>

<span id="pdf">[pdf(options)](./puppeteer.page.pdf.md)</span>

</td><td>

</td><td>

Generates a PDF of the page with the `print` CSS media type.

**Remarks:**

To generate a PDF with the `screen` media type, call [\`page.emulateMediaType('screen')\`](./puppeteer.page.emulatemediatype.md) before calling `page.pdf()`.

By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [\`-webkit-print-color-adjust\`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

</td></tr>
<tr><td>

<span id="queryobjects">[queryObjects(prototypeHandle)](./puppeteer.page.queryobjects.md)</span>

</td><td>

</td><td>

This method iterates the JavaScript heap and finds all objects with the given prototype.

</td></tr>
<tr><td>

<span id="reload">[reload(options)](./puppeteer.page.reload.md)</span>

</td><td>

</td><td>

Reloads the page.

</td></tr>
<tr><td>

<span id="removeexposedfunction">[removeExposedFunction(name)](./puppeteer.page.removeexposedfunction.md)</span>

</td><td>

</td><td>

The method removes a previously added function via $[Page.exposeFunction()](./puppeteer.page.exposefunction.md) called `name` from the page's `window` object.

</td></tr>
<tr><td>

<span id="removescripttoevaluateonnewdocument">[removeScriptToEvaluateOnNewDocument(identifier)](./puppeteer.page.removescripttoevaluateonnewdocument.md)</span>

</td><td>

</td><td>

Removes script that injected into page by Page.evaluateOnNewDocument.

</td></tr>
<tr><td>

<span id="resize">[resize(params)](./puppeteer.page.resize.md)</span>

</td><td>

</td><td>

**_(Experimental)_** Resizes the browser window of this page so that the content area (excluding browser UI) has the specified width and height.

</td></tr>
<tr><td>

<span id="screencast">[screencast(options)](./puppeteer.page.screencast.md)</span>

</td><td>

</td><td>

**_(Experimental)_** Captures a screencast of this [page](./puppeteer.page.md).

**Remarks:**

By default, all recordings will be [WebM](https://www.webmproject.org/) format using the [VP9](https://www.webmproject.org/vp9/) video codec, with a frame rate of 30 FPS.

You must have [ffmpeg](https://ffmpeg.org/) installed on your system.

</td></tr>
<tr><td>

<span id="screenshot">[screenshot(options)](./puppeteer.page.screenshot.md)</span>

</td><td>

</td><td>

Captures a screenshot of this [page](./puppeteer.page.md).

**Remarks:**

While a screenshot is being taken in a [BrowserContext](./puppeteer.browsercontext.md), the following methods will automatically wait for the screenshot to finish to prevent interference with the screenshot process: [BrowserContext.newPage()](./puppeteer.browsercontext.newpage.md), [Browser.newPage()](./puppeteer.browser.newpage.md), [Page.close()](./puppeteer.page.close.md).

Calling [Page.bringToFront()](./puppeteer.page.bringtofront.md) will not wait for existing screenshot operations.

</td></tr>
<tr><td>

<span id="screenshot">[screenshot(options)](./puppeteer.page.screenshot.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="select">[select(selector, values)](./puppeteer.page.select.md)</span>

</td><td>

</td><td>

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

**Remarks:**

Shortcut for [page.mainFrame().select()](./puppeteer.frame.select.md)

</td></tr>
<tr><td>

<span id="setbypasscsp">[setBypassCSP(enabled)](./puppeteer.page.setbypasscsp.md)</span>

</td><td>

</td><td>

Toggles bypassing page's Content-Security-Policy.

**Remarks:**

NOTE: CSP bypassing happens at the moment of CSP initialization rather than evaluation. Usually, this means that `page.setBypassCSP` should be called before navigating to the domain.

</td></tr>
<tr><td>

<span id="setbypassserviceworker">[setBypassServiceWorker(bypass)](./puppeteer.page.setbypassserviceworker.md)</span>

</td><td>

</td><td>

Toggles ignoring of service worker for each request.

</td></tr>
<tr><td>

<span id="setcacheenabled">[setCacheEnabled(enabled)](./puppeteer.page.setcacheenabled.md)</span>

</td><td>

</td><td>

Toggles ignoring cache for each request based on the enabled state. By default, caching is enabled.

</td></tr>
<tr><td>

<span id="setcontent">[setContent(html, options)](./puppeteer.page.setcontent.md)</span>

</td><td>

</td><td>

Set the content of the page.

</td></tr>
<tr><td>

<span id="setcookie">[setCookie(cookies)](./puppeteer.page.setcookie.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Page-level cookie API is deprecated. Use [Browser.setCookie()](./puppeteer.browser.setcookie.md) or [BrowserContext.setCookie()](./puppeteer.browsercontext.setcookie.md) instead.

</td></tr>
<tr><td>

<span id="setdefaultnavigationtimeout">[setDefaultNavigationTimeout(timeout)](./puppeteer.page.setdefaultnavigationtimeout.md)</span>

</td><td>

</td><td>

This setting will change the default maximum navigation time for the following methods and related shortcuts:

- [page.goBack(options)](./puppeteer.page.goback.md)

- [page.goForward(options)](./puppeteer.page.goforward.md)

- [page.goto(url,options)](./puppeteer.page.goto.md)

- [page.reload(options)](./puppeteer.page.reload.md)

- [page.setContent(html,options)](./puppeteer.page.setcontent.md)

- [page.waitForNavigation(options)](./puppeteer.page.waitfornavigation.md)

</td></tr>
<tr><td>

<span id="setdefaulttimeout">[setDefaultTimeout(timeout)](./puppeteer.page.setdefaulttimeout.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="setdraginterception">[setDragInterception(enabled)](./puppeteer.page.setdraginterception.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

We no longer support intercepting drag payloads. Use the new drag APIs found on [ElementHandle](./puppeteer.elementhandle.md) to drag (or just use the [Page.mouse](./puppeteer.page.md#mouse)).

</td></tr>
<tr><td>

<span id="setextrahttpheaders">[setExtraHTTPHeaders(headers)](./puppeteer.page.setextrahttpheaders.md)</span>

</td><td>

</td><td>

The extra HTTP headers will be sent with every request the page initiates.

:::tip

All HTTP header names are lowercased. (HTTP headers are case-insensitive, so this shouldn’t impact your server code.)

:::

:::note

page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

:::

</td></tr>
<tr><td>

<span id="setgeolocation">[setGeolocation(options)](./puppeteer.page.setgeolocation.md)</span>

</td><td>

</td><td>

Sets the page's geolocation.

**Remarks:**

Consider using [BrowserContext.overridePermissions()](./puppeteer.browsercontext.overridepermissions.md) to grant permissions for the page to read its geolocation.

</td></tr>
<tr><td>

<span id="setjavascriptenabled">[setJavaScriptEnabled(enabled)](./puppeteer.page.setjavascriptenabled.md)</span>

</td><td>

</td><td>

**Remarks:**

NOTE: changing this value won't affect scripts that have already been run. It will take full effect on the next navigation.

</td></tr>
<tr><td>

<span id="setofflinemode">[setOfflineMode(enabled)](./puppeteer.page.setofflinemode.md)</span>

</td><td>

</td><td>

Emulates the offline mode.

It does not change the download/upload/latency parameters set by [Page.emulateNetworkConditions()](./puppeteer.page.emulatenetworkconditions.md)

</td></tr>
<tr><td>

<span id="setrequestinterception">[setRequestInterception(value)](./puppeteer.page.setrequestinterception.md)</span>

</td><td>

</td><td>

Activating request interception enables [HTTPRequest.abort()](./puppeteer.httprequest.abort.md), [HTTPRequest.continue()](./puppeteer.httprequest.continue.md) and [HTTPRequest.respond()](./puppeteer.httprequest.respond.md) methods. This provides the capability to modify network requests that are made by a page.

Once request interception is enabled, every request will stall unless it's continued, responded or aborted; or completed using the browser cache.

See the [Request interception guide](https://pptr.dev/guides/network-interception) for more details.

</td></tr>
<tr><td>

<span id="setuseragent">[setUserAgent(userAgent, userAgentMetadata)](./puppeteer.page.setuseragent.md)</span>

</td><td>

`deprecated`

</td><td>

**Deprecated:**

Use [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2) instead.

</td></tr>
<tr><td>

<span id="setuseragent">[setUserAgent(options)](./puppeteer.page.setuseragent.md#overload-2)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="setviewport">[setViewport(viewport)](./puppeteer.page.setviewport.md)</span>

</td><td>

</td><td>

`page.setViewport` will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport before navigating to the page.

In the case of multiple pages in a single browser, each page can have its own viewport size. Setting the viewport to `null` resets the viewport to its default value.

**Remarks:**

NOTE: in certain cases, setting viewport will reload the page in order to set the isMobile or hasTouch properties.

</td></tr>
<tr><td>

<span id="tap">[tap(selector)](./puppeteer.page.tap.md)</span>

</td><td>

</td><td>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.touchscreen](./puppeteer.page.md#touchscreen) to tap in the center of the element. If there's no element matching `selector`, the method throws an error.

**Remarks:**

Shortcut for [page.mainFrame().tap(selector)](./puppeteer.frame.tap.md).

</td></tr>
<tr><td>

<span id="target">[target()](./puppeteer.page.target.md)</span>

</td><td>

`deprecated`

</td><td>

A target this page was created from.

**Deprecated:**

Use [Page.createCDPSession()](./puppeteer.page.createcdpsession.md) directly.

</td></tr>
<tr><td>

<span id="title">[title()](./puppeteer.page.title.md)</span>

</td><td>

</td><td>

The page's title

**Remarks:**

Shortcut for [page.mainFrame().title()](./puppeteer.frame.title.md).

</td></tr>
<tr><td>

<span id="triggerextensionaction">[triggerExtensionAction(extension)](./puppeteer.page.triggerextensionaction.md)</span>

</td><td>

</td><td>

Triggers the default action of the specified extension for this page. This simulates clicking the extension's icon in the browser's toolbar.

</td></tr>
<tr><td>

<span id="type">[type(selector, text, options)](./puppeteer.page.type.md)</span>

</td><td>

</td><td>

Sends a `keydown`, `keypress/input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.page.url.md)</span>

</td><td>

</td><td>

The page's URL.

**Remarks:**

Shortcut for [page.mainFrame().url()](./puppeteer.frame.url.md).

</td></tr>
<tr><td>

<span id="viewport">[viewport()](./puppeteer.page.viewport.md)</span>

</td><td>

</td><td>

Returns the current page viewport settings without checking the actual page viewport.

This is either the viewport set with the previous [Page.setViewport()](./puppeteer.page.setviewport.md) call or the default viewport set via [ConnectOptions.defaultViewport](./puppeteer.connectoptions.md#defaultviewport).

</td></tr>
<tr><td>

<span id="waitfordeviceprompt">[waitForDevicePrompt(options)](./puppeteer.page.waitfordeviceprompt.md)</span>

</td><td>

</td><td>

This method is typically coupled with an action that triggers a device request from an api such as WebBluetooth.

:::caution

This must be called before the device request is made. It will not return a currently active device prompt.

:::

</td></tr>
<tr><td>

<span id="waitforfilechooser">[waitForFileChooser(options)](./puppeteer.page.waitforfilechooser.md)</span>

</td><td>

</td><td>

This method is typically coupled with an action that triggers file choosing.

:::caution

This must be called before the file chooser is launched. It will not return a currently active file chooser.

:::

:::caution

Interception of file dialogs triggered via DOM APIs such as window.showOpenFilePicker is currently not supported.

:::

**Remarks:**

In the "headful" browser, this method results in the native file picker dialog `not showing up` for the user.

</td></tr>
<tr><td>

<span id="waitforframe">[waitForFrame(urlOrPredicate, options)](./puppeteer.page.waitforframe.md)</span>

</td><td>

</td><td>

Waits for a frame matching the given conditions to appear.

</td></tr>
<tr><td>

<span id="waitforfunction">[waitForFunction(pageFunction, options, args)](./puppeteer.page.waitforfunction.md)</span>

</td><td>

</td><td>

Waits for the provided function, `pageFunction`, to return a truthy value when evaluated in the page's context.

</td></tr>
<tr><td>

<span id="waitfornavigation">[waitForNavigation(options)](./puppeteer.page.waitfornavigation.md)</span>

</td><td>

</td><td>

Waits for the page to navigate to a new URL or to reload. It is useful when you run code that will indirectly cause the page to navigate.

**Remarks:**

Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

</td></tr>
<tr><td>

<span id="waitfornetworkidle">[waitForNetworkIdle(options)](./puppeteer.page.waitfornetworkidle.md)</span>

</td><td>

</td><td>

Waits for the network to be idle.

**Remarks:**

The function will always wait at least the set [IdleTime](./puppeteer.waitfornetworkidleoptions.md#idletime).

</td></tr>
<tr><td>

<span id="waitforrequest">[waitForRequest(urlOrPredicate, options)](./puppeteer.page.waitforrequest.md)</span>

</td><td>

</td><td>

**Remarks:**

Optional Waiting Parameters have:

- `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass `0` to disable the timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForRequest call.

</td></tr>
<tr><td>

<span id="waitforresponse">[waitForResponse(urlOrPredicate, options)](./puppeteer.page.waitforresponse.md)</span>

</td><td>

</td><td>

**Remarks:**

Optional Parameter have:

- `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass `0` to disable the timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForResponse call.

</td></tr>
<tr><td>

<span id="waitforselector">[waitForSelector(selector, options)](./puppeteer.page.waitforselector.md)</span>

</td><td>

</td><td>

Wait for the `selector` to appear in page. If at the moment of calling the method the `selector` already exists, the method will return immediately. If the `selector` doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

**Remarks:**

The optional Parameter in Arguments `options` are:

- `visible`: A boolean wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.

- `hidden`: Wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.

- `timeout`: maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForSelector call.

</td></tr>
<tr><td>

<span id="windowid">[windowId()](./puppeteer.page.windowid.md)</span>

</td><td>

</td><td>

**_(Experimental)_** Returns the page's window id.

</td></tr>
<tr><td>

<span id="workers">[workers()](./puppeteer.page.workers.md)</span>

</td><td>

</td><td>

All of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.

**Remarks:**

This does not contain ServiceWorkers

</td></tr>
</tbody></table>

# Page.metrics() method

Source: https://pptr.dev/api/puppeteer.page.metrics

Object containing metrics as key/value pairs.

### Signature

```typescript
class Page {
	abstract metrics(): Promise<Metrics>;
}
```

**Returns:**

Promise&lt;[Metrics](./puppeteer.metrics.md)&gt;

- `Timestamp` : The timestamp when the metrics sample was taken.

- `Documents` : Number of documents in the page.

- `Frames` : Number of frames in the page.

- `JSEventListeners` : Number of events in the page.

- `Nodes` : Number of DOM nodes in the page.

- `LayoutCount` : Total number of full or partial page layout.

- `RecalcStyleCount` : Total number of page style recalculations.

- `LayoutDuration` : Combined durations of all page layouts.

- `RecalcStyleDuration` : Combined duration of all page style recalculations.

- `ScriptDuration` : Combined duration of JavaScript execution.

- `TaskDuration` : Combined duration of all tasks performed by the browser.

- `JSHeapUsedSize` : Used JavaScript heap size.

- `JSHeapTotalSize` : Total JavaScript heap size.

## Remarks

All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

# Page.openDevTools() method

Source: https://pptr.dev/api/puppeteer.page.opendevtools

Opens DevTools for the this page if not already open and returns the DevTools page. This method is only available in Chrome.

### Signature

```typescript
class Page {
	abstract openDevTools(): Promise<Page>;
}
```

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)&gt;

# Page.pdf() method

Source: https://pptr.dev/api/puppeteer.page.pdf

Generates a PDF of the page with the `print` CSS media type.

### Signature

```typescript
class Page {
	abstract pdf(options?: PDFOptions): Promise<Uint8Array>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[PDFOptions](./puppeteer.pdfoptions.md)

</td><td>

_(Optional)_ options for generating the PDF.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Uint8Array&gt;

## Remarks

To generate a PDF with the `screen` media type, call [\`page.emulateMediaType('screen')\`](./puppeteer.page.emulatemediatype.md) before calling `page.pdf()`.

By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [\`-webkit-print-color-adjust\`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

# Page.queryObjects() method

Source: https://pptr.dev/api/puppeteer.page.queryobjects

This method iterates the JavaScript heap and finds all objects with the given prototype.

### Signature

```typescript
class Page {
	abstract queryObjects<Prototype>(prototypeHandle: JSHandle<Prototype>): Promise<JSHandle<Prototype[]>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

prototypeHandle

</td><td>

[JSHandle](./puppeteer.jshandle.md)&lt;Prototype&gt;

</td><td>

a handle to the object prototype.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[JSHandle](./puppeteer.jshandle.md)&lt;Prototype\[\]&gt;&gt;

Promise which resolves to a handle to an array of objects with this prototype.

## Example

```ts
// Create a Map object
await page.evaluate(() => (window.map = new Map()));
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate((maps) => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

# Page.reload() method

Source: https://pptr.dev/api/puppeteer.page.reload

Reloads the page.

### Signature

```typescript
class Page {
	abstract reload(options?: ReloadOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[ReloadOptions](./puppeteer.reloadoptions.md)

</td><td>

_(Optional)_ Options to configure waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

A promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

# Page.removeExposedFunction() method

Source: https://pptr.dev/api/puppeteer.page.removeexposedfunction

The method removes a previously added function via $[Page.exposeFunction()](./puppeteer.page.exposefunction.md) called `name` from the page's `window` object.

### Signature

```typescript
class Page {
	abstract removeExposedFunction(name: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

name

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.removeScriptToEvaluateOnNewDocument() method

Source: https://pptr.dev/api/puppeteer.page.removescripttoevaluateonnewdocument

Removes script that injected into page by Page.evaluateOnNewDocument.

### Signature

```typescript
class Page {
	abstract removeScriptToEvaluateOnNewDocument(identifier: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

identifier

</td><td>

string

</td><td>

script identifier

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.resize() method

Source: https://pptr.dev/api/puppeteer.page.resize

Resizes the browser window of this page so that the content area (excluding browser UI) has the specified width and height.

### Signature

```typescript
class Page {
	abstract resize(params: { contentWidth: number; contentHeight: number }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

params

</td><td>

&#123; contentWidth: number; contentHeight: number; &#125;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.screencast() method

Source: https://pptr.dev/api/puppeteer.page.screencast

Captures a screencast of this [page](./puppeteer.page.md).

### Signature

```typescript
class Page {
	screencast(options?: Readonly<ScreencastOptions>): Promise<ScreenRecorder>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ScreencastOptions](./puppeteer.screencastoptions.md)&gt;

</td><td>

_(Optional)_ Configures screencast behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ScreenRecorder](./puppeteer.screenrecorder.md)&gt;

## Remarks

By default, all recordings will be [WebM](https://www.webmproject.org/) format using the [VP9](https://www.webmproject.org/vp9/) video codec, with a frame rate of 30 FPS.

You must have [ffmpeg](https://ffmpeg.org/) installed on your system.

## Example

Recording a [page](./puppeteer.page.md):

```
import puppeteer from 'puppeteer';

// Launch a browser
const browser = await puppeteer.launch();

// Create a new page
const page = await browser.newPage();

// Go to your site.
await page.goto("https://www.example.com");

// Start recording.
const recorder = await page.screencast({path: 'recording.webm'});

// Do something.

// Stop recording.
await recorder.stop();

browser.close();
```

# Page.screenshot() method

Source: https://pptr.dev/api/puppeteer.page.screenshot

<h2 id="overload-1">screenshot(): Promise&lt;string&gt;</h2>

Captures a screenshot of this [page](./puppeteer.page.md).

### Signature

```typescript
class Page {
	screenshot(
		options: Readonly<ScreenshotOptions> & {
			encoding: 'base64';
		},
	): Promise<string>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ScreenshotOptions](./puppeteer.screenshotoptions.md)&gt; &amp; &#123; encoding: 'base64'; &#125;

</td><td>

Configures screenshot behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

## Remarks

While a screenshot is being taken in a [BrowserContext](./puppeteer.browsercontext.md), the following methods will automatically wait for the screenshot to finish to prevent interference with the screenshot process: [BrowserContext.newPage()](./puppeteer.browsercontext.newpage.md), [Browser.newPage()](./puppeteer.browser.newpage.md), [Page.close()](./puppeteer.page.close.md).

Calling [Page.bringToFront()](./puppeteer.page.bringtofront.md) will not wait for existing screenshot operations.

<h2 id="overload-2">screenshot(): Promise&lt;Uint8Array&gt;</h2>

### Signature

```typescript
class Page {
	screenshot(options?: Readonly<ScreenshotOptions>): Promise<Uint8Array>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Readonly&lt;[ScreenshotOptions](./puppeteer.screenshotoptions.md)&gt;

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Uint8Array&gt;

# Page.select() method

Source: https://pptr.dev/api/puppeteer.page.select

Triggers a `change` and `input` event once all the provided options have been selected. If there's no `<select>` element matching `selector`, the method throws an error.

### Signature

```typescript
class Page {
	select(selector: string, ...values: string[]): Promise<string[]>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

values

</td><td>

string\[\]

</td><td>

Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string\[\]&gt;

## Remarks

Shortcut for [page.mainFrame().select()](./puppeteer.frame.select.md)

## Example

```ts
page.select('select#colors', 'blue'); // single selection
page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

# Page.setBypassCSP() method

Source: https://pptr.dev/api/puppeteer.page.setbypasscsp

Toggles bypassing page's Content-Security-Policy.

### Signature

```typescript
class Page {
	abstract setBypassCSP(enabled: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

sets bypassing of page's Content-Security-Policy.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

NOTE: CSP bypassing happens at the moment of CSP initialization rather than evaluation. Usually, this means that `page.setBypassCSP` should be called before navigating to the domain.

# Page.setBypassServiceWorker() method

Source: https://pptr.dev/api/puppeteer.page.setbypassserviceworker

Toggles ignoring of service worker for each request.

### Signature

```typescript
class Page {
	abstract setBypassServiceWorker(bypass: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

bypass

</td><td>

boolean

</td><td>

Whether to bypass service worker and load from network.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.setCacheEnabled() method

Source: https://pptr.dev/api/puppeteer.page.setcacheenabled

Toggles ignoring cache for each request based on the enabled state. By default, caching is enabled.

### Signature

```typescript
class Page {
	abstract setCacheEnabled(enabled?: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

_(Optional)_ sets the `enabled` state of cache

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

#### Default value:

`true`

# Page.setContent() method

Source: https://pptr.dev/api/puppeteer.page.setcontent

Set the content of the page.

### Signature

```typescript
class Page {
	setContent(html: string, options?: SetContentWaitForOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

html

</td><td>

string

</td><td>

HTML markup to assign to the page.

</td></tr>
<tr><td>

options

</td><td>

[SetContentWaitForOptions](./puppeteer.setcontentwaitforoptions.md)

</td><td>

_(Optional)_ Parameters that has some properties.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.setCookie() method

Source: https://pptr.dev/api/puppeteer.page.setcookie

> Warning: This API is now obsolete.
>
> Page-level cookie API is deprecated. Use [Browser.setCookie()](./puppeteer.browser.setcookie.md) or [BrowserContext.setCookie()](./puppeteer.browsercontext.setcookie.md) instead.

### Signature

```typescript
class Page {
	abstract setCookie(...cookies: CookieParam[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

cookies

</td><td>

[CookieParam](./puppeteer.cookieparam.md)\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
await page.setCookie(cookieObject1, cookieObject2);
```

# Page.setDefaultNavigationTimeout() method

Source: https://pptr.dev/api/puppeteer.page.setdefaultnavigationtimeout

This setting will change the default maximum navigation time for the following methods and related shortcuts:

- [page.goBack(options)](./puppeteer.page.goback.md)

- [page.goForward(options)](./puppeteer.page.goforward.md)

- [page.goto(url,options)](./puppeteer.page.goto.md)

- [page.reload(options)](./puppeteer.page.reload.md)

- [page.setContent(html,options)](./puppeteer.page.setcontent.md)

- [page.waitForNavigation(options)](./puppeteer.page.waitfornavigation.md)

### Signature

```typescript
class Page {
	abstract setDefaultNavigationTimeout(timeout: number): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

timeout

</td><td>

number

</td><td>

Maximum navigation time in milliseconds.

</td></tr>
</tbody></table>

**Returns:**

void

# Page.setDefaultTimeout() method

Source: https://pptr.dev/api/puppeteer.page.setdefaulttimeout

### Signature

```typescript
class Page {
	abstract setDefaultTimeout(timeout: number): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

timeout

</td><td>

number

</td><td>

Maximum time in milliseconds.

</td></tr>
</tbody></table>

**Returns:**

void

# Page.setDragInterception() method

Source: https://pptr.dev/api/puppeteer.page.setdraginterception

> Warning: This API is now obsolete.
>
> We no longer support intercepting drag payloads. Use the new drag APIs found on [ElementHandle](./puppeteer.elementhandle.md) to drag (or just use the [Page.mouse](./puppeteer.page.md#mouse)).

### Signature

```typescript
class Page {
	abstract setDragInterception(enabled: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

Whether to enable drag interception.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.setExtraHTTPHeaders() method

Source: https://pptr.dev/api/puppeteer.page.setextrahttpheaders

The extra HTTP headers will be sent with every request the page initiates.

:::tip

All HTTP header names are lowercased. (HTTP headers are case-insensitive, so this shouldn’t impact your server code.)

:::

:::note

page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

:::

### Signature

```typescript
class Page {
	abstract setExtraHTTPHeaders(headers: Record<string, string>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

headers

</td><td>

Record&lt;string, string&gt;

</td><td>

An object containing additional HTTP headers to be sent with every request. All header values must be strings.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.setGeolocation() method

Source: https://pptr.dev/api/puppeteer.page.setgeolocation

Sets the page's geolocation.

### Signature

```typescript
class Page {
	abstract setGeolocation(options: GeolocationOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[GeolocationOptions](./puppeteer.geolocationoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Consider using [BrowserContext.overridePermissions()](./puppeteer.browsercontext.overridepermissions.md) to grant permissions for the page to read its geolocation.

## Example

```ts
await page.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
```

# Page.setJavaScriptEnabled() method

Source: https://pptr.dev/api/puppeteer.page.setjavascriptenabled

### Signature

```typescript
class Page {
	abstract setJavaScriptEnabled(enabled: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

Whether or not to enable JavaScript on the page.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

NOTE: changing this value won't affect scripts that have already been run. It will take full effect on the next navigation.

# Page.setOfflineMode() method

Source: https://pptr.dev/api/puppeteer.page.setofflinemode

Emulates the offline mode.

It does not change the download/upload/latency parameters set by [Page.emulateNetworkConditions()](./puppeteer.page.emulatenetworkconditions.md)

### Signature

```typescript
class Page {
	abstract setOfflineMode(enabled: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

enabled

</td><td>

boolean

</td><td>

When `true`, enables offline mode for the page.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.setRequestInterception() method

Source: https://pptr.dev/api/puppeteer.page.setrequestinterception

Activating request interception enables [HTTPRequest.abort()](./puppeteer.httprequest.abort.md), [HTTPRequest.continue()](./puppeteer.httprequest.continue.md) and [HTTPRequest.respond()](./puppeteer.httprequest.respond.md) methods. This provides the capability to modify network requests that are made by a page.

Once request interception is enabled, every request will stall unless it's continued, responded or aborted; or completed using the browser cache.

See the [Request interception guide](https://pptr.dev/guides/network-interception) for more details.

### Signature

```typescript
class Page {
	abstract setRequestInterception(value: boolean): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

value

</td><td>

boolean

</td><td>

Whether to enable request interception.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

An example of a naïve request interceptor that aborts all image requests:

```ts
import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', (interceptedRequest) => {
	if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) interceptedRequest.abort();
	else interceptedRequest.continue();
});
await page.goto('https://example.com');
await browser.close();
```

# Page.setUserAgent() method

Source: https://pptr.dev/api/puppeteer.page.setuseragent

<h2 id="overload-1">setUserAgent(): Promise&lt;void&gt;</h2>

> Warning: This API is now obsolete.
>
> Use [Page.setUserAgent()](./puppeteer.page.setuseragent.md#overload-2) instead.

### Signature

```typescript
class Page {
	abstract setUserAgent(userAgent: string, userAgentMetadata?: Protocol.Emulation.UserAgentMetadata): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

userAgent

</td><td>

string

</td><td>

Specific user agent to use in this page

</td></tr>
<tr><td>

userAgentMetadata

</td><td>

Protocol.Emulation.UserAgentMetadata

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the user agent is set.

<h2 id="overload-2">setUserAgent(): Promise&lt;void&gt;</h2>

### Signature

```typescript
class Page {
	abstract setUserAgent(options: { userAgent?: string; userAgentMetadata?: Protocol.Emulation.UserAgentMetadata; platform?: string }): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; userAgent?: string; userAgentMetadata?: Protocol.Emulation.UserAgentMetadata; platform?: string; &#125;

</td><td>

Object containing user agent and optional user agent metadata

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

Promise which resolves when the user agent is set.

# Page.setViewport() method

Source: https://pptr.dev/api/puppeteer.page.setviewport

`page.setViewport` will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport before navigating to the page.

In the case of multiple pages in a single browser, each page can have its own viewport size. Setting the viewport to `null` resets the viewport to its default value.

### Signature

```typescript
class Page {
	abstract setViewport(viewport: Viewport | null): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

viewport

</td><td>

[Viewport](./puppeteer.viewport.md) \| null

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

NOTE: in certain cases, setting viewport will reload the page in order to set the isMobile or hasTouch properties.

## Example

```ts
const page = await browser.newPage();
await page.setViewport({
	width: 640,
	height: 480,
	deviceScaleFactor: 1,
});
await page.goto('https://example.com');
```

# Page.tap() method

Source: https://pptr.dev/api/puppeteer.page.tap

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [Page.touchscreen](./puppeteer.page.md#touchscreen) to tap in the center of the element. If there's no element matching `selector`, the method throws an error.

### Signature

```typescript
class Page {
	tap(selector: string): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax). If there are multiple elements satisfying the selector, the first will be tapped.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Shortcut for [page.mainFrame().tap(selector)](./puppeteer.frame.tap.md).

# Page.target() method

Source: https://pptr.dev/api/puppeteer.page.target

> Warning: This API is now obsolete.
>
> Use [Page.createCDPSession()](./puppeteer.page.createcdpsession.md) directly.

A target this page was created from.

### Signature

```typescript
class Page {
	abstract target(): Target;
}
```

**Returns:**

[Target](./puppeteer.target.md)

# Page.title() method

Source: https://pptr.dev/api/puppeteer.page.title

The page's title

### Signature

```typescript
class Page {
	title(): Promise<string>;
}
```

**Returns:**

Promise&lt;string&gt;

## Remarks

Shortcut for [page.mainFrame().title()](./puppeteer.frame.title.md).

# Page.triggerExtensionAction() method

Source: https://pptr.dev/api/puppeteer.page.triggerextensionaction

Triggers the default action of the specified extension for this page. This simulates clicking the extension's icon in the browser's toolbar.

### Signature

```typescript
class Page {
	abstract triggerExtensionAction(extension: Extension): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

extension

</td><td>

[Extension](./puppeteer.extension.md)

</td><td>

The [Extension](./puppeteer.extension.md) whose action to trigger.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Page.type() method

Source: https://pptr.dev/api/puppeteer.page.type

Sends a `keydown`, `keypress/input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [Keyboard.press()](./puppeteer.keyboard.press.md).

### Signature

```typescript
class Page {
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

string

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

text

</td><td>

string

</td><td>

A text to type into a focused element.

</td></tr>
<tr><td>

options

</td><td>

Readonly&lt;[KeyboardTypeOptions](./puppeteer.keyboardtypeoptions.md)&gt;

</td><td>

_(Optional)_ have property `delay` which is the Time to wait between key presses in milliseconds. Defaults to `0`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Example

```ts
await page.type('#mytextarea', 'Hello');
// Types instantly
await page.type('#mytextarea', 'World', { delay: 100 });
// Types slower, like a user
```

# Page.url() method

Source: https://pptr.dev/api/puppeteer.page.url

The page's URL.

### Signature

```typescript
class Page {
	url(): string;
}
```

**Returns:**

string

## Remarks

Shortcut for [page.mainFrame().url()](./puppeteer.frame.url.md).

# Page.viewport() method

Source: https://pptr.dev/api/puppeteer.page.viewport

Returns the current page viewport settings without checking the actual page viewport.

This is either the viewport set with the previous [Page.setViewport()](./puppeteer.page.setviewport.md) call or the default viewport set via [ConnectOptions.defaultViewport](./puppeteer.connectoptions.md#defaultviewport).

### Signature

```typescript
class Page {
	abstract viewport(): Viewport | null;
}
```

**Returns:**

[Viewport](./puppeteer.viewport.md) \| null

# Page.waitForDevicePrompt() method

Source: https://pptr.dev/api/puppeteer.page.waitfordeviceprompt

This method is typically coupled with an action that triggers a device request from an api such as WebBluetooth.

:::caution

This must be called before the device request is made. It will not return a currently active device prompt.

:::

### Signature

```typescript
class Page {
	abstract waitForDevicePrompt(options?: WaitTimeoutOptions): Promise<DeviceRequestPrompt>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[DeviceRequestPrompt](./puppeteer.devicerequestprompt.md)&gt;

## Example

```ts
const [devicePrompt] = Promise.all([page.waitForDevicePrompt(), page.click('#connect-bluetooth')]);
await devicePrompt.select(await devicePrompt.waitForDevice(({ name }) => name.includes('My Device')));
```

# Page.waitForFileChooser() method

Source: https://pptr.dev/api/puppeteer.page.waitforfilechooser

This method is typically coupled with an action that triggers file choosing.

:::caution

This must be called before the file chooser is launched. It will not return a currently active file chooser.

:::

:::caution

Interception of file dialogs triggered via DOM APIs such as window.showOpenFilePicker is currently not supported.

:::

### Signature

```typescript
class Page {
	abstract waitForFileChooser(options?: WaitTimeoutOptions): Promise<FileChooser>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[FileChooser](./puppeteer.filechooser.md)&gt;

## Remarks

In the "headful" browser, this method results in the native file picker dialog `not showing up` for the user.

## Example

The following example clicks a button that issues a file chooser and then responds with `/tmp/myfile.pdf` as if a user has selected this file.

```ts
const [fileChooser] = await Promise.all([
	page.waitForFileChooser(),
	page.click('#upload-file-button'),
	// some button that triggers file selection
]);
await fileChooser.accept(['/tmp/myfile.pdf']);
```

# Page.waitForFrame() method

Source: https://pptr.dev/api/puppeteer.page.waitforframe

Waits for a frame matching the given conditions to appear.

### Signature

```typescript
class Page {
	waitForFrame(urlOrPredicate: string | ((frame: Frame) => Awaitable<boolean>), options?: WaitTimeoutOptions): Promise<Frame>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

urlOrPredicate

</td><td>

string \| ((frame: [Frame](./puppeteer.frame.md)) =&gt; [Awaitable](./puppeteer.awaitable.md)&lt;boolean&gt;)

</td><td>

</td></tr>
<tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Frame](./puppeteer.frame.md)&gt;

## Example

```ts
const frame = await page.waitForFrame(async (frame) => {
	const frameElement = await frame.frameElement();
	if (!frameElement) {
		return false;
	}
	const name = await frameElement.evaluate((el) => el.getAttribute('name'));
	return name === 'test';
});
```

# Page.waitForFunction() method

Source: https://pptr.dev/api/puppeteer.page.waitforfunction

Waits for the provided function, `pageFunction`, to return a truthy value when evaluated in the page's context.

### Signature

```typescript
class Page {
	waitForFunction<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, options?: FrameWaitForFunctionOptions, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

Function to be evaluated in browser context until it returns a truthy value.

</td></tr>
<tr><td>

options

</td><td>

[FrameWaitForFunctionOptions](./puppeteer.framewaitforfunctionoptions.md)

</td><td>

_(Optional)_ Options for configuring waiting behavior.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

## Example 1

[Page.waitForFunction()](./puppeteer.page.waitforfunction.md) can be used to observe a viewport size change:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
const watchDog = page.waitForFunction('window.innerWidth < 100');
await page.setViewport({ width: 50, height: 50 });
await watchDog;
await browser.close();
```

## Example 2

Arguments can be passed from Node.js to `pageFunction`:

```ts
const selector = '.foo';
await page.waitForFunction((selector) => !!document.querySelector(selector), {}, selector);
```

## Example 3

The provided `pageFunction` can be asynchronous:

```ts
const username = 'github-username';
await page.waitForFunction(
	async (username) => {
		const githubResponse = await fetch(`https://api.github.com/users/${username}`);
		const githubUser = await githubResponse.json();
		// show the avatar
		const img = document.createElement('img');
		img.src = githubUser.avatar_url;
		// wait 3 seconds
		await new Promise((resolve, reject) => setTimeout(resolve, 3000));
		img.remove();
	},
	{},
	username,
);
```

# Page.waitForNavigation() method

Source: https://pptr.dev/api/puppeteer.page.waitfornavigation

Waits for the page to navigate to a new URL or to reload. It is useful when you run code that will indirectly cause the page to navigate.

### Signature

```typescript
class Page {
	waitForNavigation(options?: WaitForOptions): Promise<HTTPResponse | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitForOptions](./puppeteer.waitforoptions.md)

</td><td>

_(Optional)_ Navigation parameters which might have the following properties:

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md) \| null&gt;

A `Promise` which resolves to the main resource response.

- In case of multiple redirects, the navigation will resolve with the response of the last redirect. - In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

## Remarks

Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

## Example

```ts
const [response] = await Promise.all([
	page.waitForNavigation(), // The promise resolves after navigation has finished
	page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

# Page.waitForNetworkIdle() method

Source: https://pptr.dev/api/puppeteer.page.waitfornetworkidle

Waits for the network to be idle.

### Signature

```typescript
class Page {
	waitForNetworkIdle(options?: WaitForNetworkIdleOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[WaitForNetworkIdleOptions](./puppeteer.waitfornetworkidleoptions.md)

</td><td>

_(Optional)_ Options to configure waiting behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

A promise which resolves once the network is idle.

## Remarks

The function will always wait at least the set [IdleTime](./puppeteer.waitfornetworkidleoptions.md#idletime).

# Page.waitForRequest() method

Source: https://pptr.dev/api/puppeteer.page.waitforrequest

### Signature

```typescript
class Page {
	waitForRequest(urlOrPredicate: string | AwaitablePredicate<HTTPRequest>, options?: WaitTimeoutOptions): Promise<HTTPRequest>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

urlOrPredicate

</td><td>

string \| [AwaitablePredicate](./puppeteer.awaitablepredicate.md)&lt;[HTTPRequest](./puppeteer.httprequest.md)&gt;

</td><td>

A URL or predicate to wait for

</td></tr>
<tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_ Optional waiting parameters

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPRequest](./puppeteer.httprequest.md)&gt;

Promise which resolves to the matched request

## Remarks

Optional Waiting Parameters have:

- `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass `0` to disable the timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForRequest call.

## Example

```ts
const firstRequest = await page.waitForRequest('https://example.com/resource');
const finalRequest = await page.waitForRequest((request) => request.url() === 'https://example.com');
return finalRequest.response()?.ok();
```

# Page.waitForResponse() method

Source: https://pptr.dev/api/puppeteer.page.waitforresponse

### Signature

```typescript
class Page {
	waitForResponse(urlOrPredicate: string | AwaitablePredicate<HTTPResponse>, options?: WaitTimeoutOptions): Promise<HTTPResponse>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

urlOrPredicate

</td><td>

string \| [AwaitablePredicate](./puppeteer.awaitablepredicate.md)&lt;[HTTPResponse](./puppeteer.httpresponse.md)&gt;

</td><td>

A URL or predicate to wait for.

</td></tr>
<tr><td>

options

</td><td>

[WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

</td><td>

_(Optional)_ Optional waiting parameters

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HTTPResponse](./puppeteer.httpresponse.md)&gt;

Promise which resolves to the matched response.

## Remarks

Optional Parameter have:

- `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass `0` to disable the timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForResponse call.

## Example

```ts
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse((response) => response.url() === 'https://example.com' && response.status() === 200);
const finalResponse = await page.waitForResponse(async (response) => {
	return (await response.text()).includes('<html>');
});
return finalResponse.ok();
```

# Page.waitForSelector() method

Source: https://pptr.dev/api/puppeteer.page.waitforselector

Wait for the `selector` to appear in page. If at the moment of calling the method the `selector` already exists, the method will return immediately. If the `selector` doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

### Signature

```typescript
class Page {
	waitForSelector<Selector extends string>(selector: Selector, options?: WaitForSelectorOptions): Promise<ElementHandle<NodeFor<Selector>> | null>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

selector

</td><td>

Selector

</td><td>

[selector](https://pptr.dev/guides/page-interactions#selectors) to query the page for. [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be passed as-is and a [Puppeteer-specific selector syntax](https://pptr.dev/guides/page-interactions#non-css-selectors) allows querying by [text](https://pptr.dev/guides/page-interactions#text-selectors--p-text), [a11y role and name](https://pptr.dev/guides/page-interactions#aria-selectors--p-aria), and [xpath](https://pptr.dev/guides/page-interactions#xpath-selectors--p-xpath) and [combining these queries across shadow roots](https://pptr.dev/guides/page-interactions#querying-elements-in-shadow-dom). Alternatively, you can specify the selector type using a [prefix](https://pptr.dev/guides/page-interactions#prefixed-selector-syntax).

</td></tr>
<tr><td>

options

</td><td>

[WaitForSelectorOptions](./puppeteer.waitforselectoroptions.md)

</td><td>

_(Optional)_ Optional waiting parameters

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;[NodeFor](./puppeteer.nodefor.md)&lt;Selector&gt;&gt; \| null&gt;

Promise which resolves when element specified by selector string is added to DOM. Resolves to `null` if waiting for hidden: `true` and selector is not found in DOM.

## Remarks

The optional Parameter in Arguments `options` are:

- `visible`: A boolean wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.

- `hidden`: Wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.

- `timeout`: maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

- `signal`: A signal object that allows you to cancel a waitForSelector call.

## Example

This method works across navigations:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
let currentURL;
page.waitForSelector('img').then(() => console.log('First URL with image: ' + currentURL));
for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
	await page.goto(currentURL);
}
await browser.close();
```

# Page.windowId() method

Source: https://pptr.dev/api/puppeteer.page.windowid

Returns the page's window id.

### Signature

```typescript
class Page {
	abstract windowId(): Promise<WindowId>;
}
```

**Returns:**

Promise&lt;[WindowId](./puppeteer.windowid.md)&gt;

# Page.workers() method

Source: https://pptr.dev/api/puppeteer.page.workers

All of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.

### Signature

```typescript
class Page {
	abstract workers(): WebWorker[];
}
```

**Returns:**

[WebWorker](./puppeteer.webworker.md)\[\]

## Remarks

This does not contain ServiceWorkers

# PageEvent enum

Source: https://pptr.dev/api/puppeteer.pageevent

All the events that a page instance may emit.

### Signature

```typescript
export declare const enum PageEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Close

</td><td>

`"close"`

</td><td>

Emitted when the page closes.

</td></tr>
<tr><td>

Console

</td><td>

`"console"`

</td><td>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`. Also emitted if the page throws an error or a warning.

**Remarks:**

A `console` event provides a [ConsoleMessage](./puppeteer.consolemessage.md) representing the console message that was logged.

</td></tr>
<tr><td>

Dialog

</td><td>

`"dialog"`

</td><td>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Puppeteer can respond to the dialog via [Dialog.accept()](./puppeteer.dialog.accept.md) or [Dialog.dismiss()](./puppeteer.dialog.dismiss.md).

</td></tr>
<tr><td>

DOMContentLoaded

</td><td>

`"domcontentloaded"`

</td><td>

Emitted when the JavaScript [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.

</td></tr>
<tr><td>

Error

</td><td>

`"error"`

</td><td>

Emitted when the page crashes. Will contain an `Error`.

</td></tr>
<tr><td>

FrameAttached

</td><td>

`"frameattached"`

</td><td>

Emitted when a frame is attached. Will contain a [Frame](./puppeteer.frame.md).

</td></tr>
<tr><td>

FrameDetached

</td><td>

`"framedetached"`

</td><td>

Emitted when a frame is detached. Will contain a [Frame](./puppeteer.frame.md).

</td></tr>
<tr><td>

FrameNavigated

</td><td>

`"framenavigated"`

</td><td>

Emitted when a frame is navigated to a new URL. Will contain a [Frame](./puppeteer.frame.md).

</td></tr>
<tr><td>

Issue

</td><td>

`"issue"`

</td><td>

**_(Experimental)_** Emitted when a DevTools issue is reported.

</td></tr>
<tr><td>

Load

</td><td>

`"load"`

</td><td>

Emitted when the JavaScript [load](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.

</td></tr>
<tr><td>

Metrics

</td><td>

`"metrics"`

</td><td>

Emitted when the JavaScript code makes a call to `console.timeStamp`. For the list of metrics see [page.metrics](./puppeteer.page.metrics.md).

**Remarks:**

Contains an object with two properties:

- `title`: the title passed to `console.timeStamp` - `metrics`: object containing metrics as key/value pairs. The values will be `number`s.

</td></tr>
<tr><td>

PageError

</td><td>

`"pageerror"`

</td><td>

Emitted when an uncaught exception happens within the page. Contains an `Error` or data of type unknown.

</td></tr>
<tr><td>

Popup

</td><td>

`"popup"`

</td><td>

Emitted when the page opens a new tab or window.

Contains a [Page](./puppeteer.page.md) corresponding to the popup window.

</td></tr>
<tr><td>

Request

</td><td>

`"request"`

</td><td>

Emitted when a page issues a request and contains a [HTTPRequest](./puppeteer.httprequest.md).

**Remarks:**

The object is readonly. See [Page.setRequestInterception()](./puppeteer.page.setrequestinterception.md) for intercepting and mutating requests.

</td></tr>
<tr><td>

RequestFailed

</td><td>

`"requestfailed"`

</td><td>

Emitted when a request fails, for example by timing out.

Contains a [HTTPRequest](./puppeteer.httprequest.md).

**Remarks:**

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `requestfinished` event and not with `requestfailed`.

</td></tr>
<tr><td>

RequestFinished

</td><td>

`"requestfinished"`

</td><td>

Emitted when a request finishes successfully. Contains a [HTTPRequest](./puppeteer.httprequest.md).

</td></tr>
<tr><td>

RequestServedFromCache

</td><td>

`"requestservedfromcache"`

</td><td>

Emitted when a request ended up loading from cache. Contains a [HTTPRequest](./puppeteer.httprequest.md).

**Remarks:**

For certain requests, might contain undefined. [https://crbug.com/750469](https://crbug.com/750469)

</td></tr>
<tr><td>

Response

</td><td>

`"response"`

</td><td>

Emitted when a response is received. Contains a [HTTPResponse](./puppeteer.httpresponse.md).

</td></tr>
<tr><td>

WorkerCreated

</td><td>

`"workercreated"`

</td><td>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the page.

</td></tr>
<tr><td>

WorkerDestroyed

</td><td>

`"workerdestroyed"`

</td><td>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is destroyed by the page.

</td></tr>
</tbody></table>

# PageEvents interface

Source: https://pptr.dev/api/puppeteer.pageevents

Denotes the objects received by callback functions for page events.

See [PageEvent](./puppeteer.pageevent.md) for more detail on the events and when they are emitted.

### Signature

```typescript
export interface PageEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="close">close</span>

</td><td>

</td><td>

undefined

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="console">console</span>

</td><td>

</td><td>

[ConsoleMessage](./puppeteer.consolemessage.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="dialog">dialog</span>

</td><td>

</td><td>

[Dialog](./puppeteer.dialog.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="domcontentloaded">domcontentloaded</span>

</td><td>

</td><td>

undefined

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="error">error</span>

</td><td>

</td><td>

Error

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="frameattached">frameattached</span>

</td><td>

</td><td>

[Frame](./puppeteer.frame.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="framedetached">framedetached</span>

</td><td>

</td><td>

[Frame](./puppeteer.frame.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="framenavigated">framenavigated</span>

</td><td>

</td><td>

[Frame](./puppeteer.frame.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="issue">issue</span>

</td><td>

</td><td>

[Issue](./puppeteer.issue.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="load">load</span>

</td><td>

</td><td>

undefined

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="metrics">metrics</span>

</td><td>

</td><td>

&#123; title: string; metrics: [Metrics](./puppeteer.metrics.md); &#125;

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="pageerror">pageerror</span>

</td><td>

</td><td>

Error \| unknown

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="popup">popup</span>

</td><td>

</td><td>

[Page](./puppeteer.page.md) \| null

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="request">request</span>

</td><td>

</td><td>

[HTTPRequest](./puppeteer.httprequest.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="requestfailed">requestfailed</span>

</td><td>

</td><td>

[HTTPRequest](./puppeteer.httprequest.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="requestfinished">requestfinished</span>

</td><td>

</td><td>

[HTTPRequest](./puppeteer.httprequest.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="requestservedfromcache">requestservedfromcache</span>

</td><td>

</td><td>

[HTTPRequest](./puppeteer.httprequest.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="response">response</span>

</td><td>

</td><td>

[HTTPResponse](./puppeteer.httpresponse.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="workercreated">workercreated</span>

</td><td>

</td><td>

[WebWorker](./puppeteer.webworker.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="workerdestroyed">workerdestroyed</span>

</td><td>

</td><td>

[WebWorker](./puppeteer.webworker.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# PaperFormat type

Source: https://pptr.dev/api/puppeteer.paperformat

All the valid paper format types when printing a PDF.

### Signature

```typescript
export type PaperFormat = Uppercase<LowerCasePaperFormat> | Capitalize<LowerCasePaperFormat> | LowerCasePaperFormat;
```

**References:** [LowerCasePaperFormat](./puppeteer.lowercasepaperformat.md)

## Remarks

The sizes of each format are as follows:

- `Letter`: 8.5in x 11in / 21.59cm x 27.94cm

- `Legal`: 8.5in x 14in / 21.59cm x 35.56cm

- `Tabloid`: 11in x 17in / 27.94cm x 43.18cm

- `Ledger`: 17in x 11in / 43.18cm x 27.94cm

- `A0`: 33.1102in x 46.811in / 84.1cm x 118.9cm

- `A1`: 23.3858in x 33.1102in / 59.4cm x 84.1cm

- `A2`: 16.5354in x 23.3858in / 42cm x 59.4cm

- `A3`: 11.6929in x 16.5354in / 29.7cm x 42cm

- `A4`: 8.2677in x 11.6929in / 21cm x 29.7cm

- `A5`: 5.8268in x 8.2677in / 14.8cm x 21cm

- `A6`: 4.1339in x 5.8268in / 10.5cm x 14.8cm

# PDFMargin interface

Source: https://pptr.dev/api/puppeteer.pdfmargin

### Signature

```typescript
export interface PDFMargin
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="bottom">bottom</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="left">left</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="right">right</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="top">top</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# PDFOptions interface

Source: https://pptr.dev/api/puppeteer.pdfoptions

Valid options to configure PDF generation via [Page.pdf()](./puppeteer.page.pdf.md).

### Signature

```typescript
export interface PDFOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="displayheaderfooter">displayHeaderFooter</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to show the header and footer.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="footertemplate">footerTemplate</span>

</td><td>

`optional`

</td><td>

string

</td><td>

HTML template for the print footer. Has the same constraints and support for special classes as [PDFOptions.headerTemplate](./puppeteer.pdfoptions.md#headertemplate).

</td><td>

</td></tr>
<tr><td>

<span id="format">format</span>

</td><td>

`optional`

</td><td>

[PaperFormat](./puppeteer.paperformat.md)

</td><td>

**Remarks:**

If set, this takes priority over the `width` and `height` options.

</td><td>

`letter`.

</td></tr>
<tr><td>

<span id="headertemplate">headerTemplate</span>

</td><td>

`optional`

</td><td>

string

</td><td>

HTML template for the print header. Should be valid HTML with the following classes used to inject values into them:

- `date` formatted print date

- `title` document title

- `url` document location

- `pageNumber` current page number

- `totalPages` total pages in the document

</td><td>

</td></tr>
<tr><td>

<span id="height">height</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

Sets the height of paper. You can pass in a number or a string with a unit.

</td><td>

</td></tr>
<tr><td>

<span id="landscape">landscape</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to print in landscape orientation.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="margin">margin</span>

</td><td>

`optional`

</td><td>

[PDFMargin](./puppeteer.pdfmargin.md)

</td><td>

Set the PDF margins.

</td><td>

`undefined` no margins are set.

</td></tr>
<tr><td>

<span id="omitbackground">omitBackground</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Hides default white background and allows generating pdfs with transparency.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="outline">outline</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

**_(Experimental)_** Generate document outline.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="pageranges">pageRanges</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Paper ranges to print, e.g. `1-5, 8, 11-13`.

</td><td>

The empty string, which means all pages are printed.

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The path to save the file to.

**Remarks:**

If the path is relative, it's resolved relative to the current working directory.

</td><td>

`undefined`, which means the PDF will not be written to disk.

</td></tr>
<tr><td>

<span id="prefercsspagesize">preferCSSPageSize</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Give any CSS `@page` size declared in the page priority over what is declared in the `width` or `height` or `format` option.

</td><td>

`false`, which will scale the content to fit the paper size.

</td></tr>
<tr><td>

<span id="printbackground">printBackground</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Set to `true` to print background graphics.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="scale">scale</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Scales the rendering of the web page. Amount must be between `0.1` and `2`.

</td><td>

`1`

</td></tr>
<tr><td>

<span id="tagged">tagged</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

**_(Experimental)_** Generate tagged (accessible) PDF.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Timeout in milliseconds. Pass `0` to disable timeout.

The default value can be changed by using [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md)

</td><td>

`30_000`

</td></tr>
<tr><td>

<span id="waitforfonts">waitForFonts</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If true, waits for `document.fonts.ready` to resolve. This might require activating the page using [Page.bringToFront()](./puppeteer.page.bringtofront.md) if the page is in the background.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

Sets the width of paper. You can pass in a number or a string with a unit.

</td><td>

</td></tr>
</tbody></table>

# Permission type

Source: https://pptr.dev/api/puppeteer.permission

> Warning: This API is now obsolete.
>
> in favor of .

### Signature

```typescript
export type Permission =
	| 'accelerometer'
	| 'ambient-light-sensor'
	| 'background-sync'
	| 'camera'
	| 'clipboard-read'
	| 'clipboard-sanitized-write'
	| 'clipboard-write'
	| 'geolocation'
	| 'gyroscope'
	| 'idle-detection'
	| 'keyboard-lock'
	| 'magnetometer'
	| 'microphone'
	| 'midi-sysex'
	| 'midi'
	| 'notifications'
	| 'payment-handler'
	| 'persistent-storage'
	| 'pointer-lock';
```

# PermissionDescriptor_2 interface

Source: https://pptr.dev/api/puppeteer.permissiondescriptor_2

### Signature

```typescript
export interface PermissionDescriptor
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="allowwithoutsanitization">allowWithoutSanitization</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="pantiltzoom">panTiltZoom</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="sysex">sysex</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="uservisibleonly">userVisibleOnly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
</tbody></table>

# PermissionState_2 type

Source: https://pptr.dev/api/puppeteer.permissionstate_2

### Signature

```typescript
export type PermissionState = 'granted' | 'denied' | 'prompt';
```

# Point interface

Source: https://pptr.dev/api/puppeteer.point

### Signature

```typescript
export interface Point
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="x">x</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="y">y</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# PreconnectedPeripheral interface

Source: https://pptr.dev/api/puppeteer.preconnectedperipheral

A bluetooth peripheral to be simulated.

### Signature

```typescript
export interface PreconnectedPeripheral
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="address">address</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="knownserviceuuids">knownServiceUuids</span>

</td><td>

</td><td>

string\[\]

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="manufacturerdata">manufacturerData</span>

</td><td>

</td><td>

[BluetoothManufacturerData](./puppeteer.bluetoothmanufacturerdata.md)\[\]

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
</tbody></table>

# PredefinedNetworkConditions variable

Source: https://pptr.dev/api/puppeteer.predefinednetworkconditions

A list of pre-defined network conditions to be used with [Page.emulateNetworkConditions()](./puppeteer.page.emulatenetworkconditions.md).

### Signature

```typescript
PredefinedNetworkConditions: Readonly<{
	'Slow 3G': NetworkConditions;
	'Fast 3G': NetworkConditions;
	'Slow 4G': NetworkConditions;
	'Fast 4G': NetworkConditions;
}>;
```

## Example

```ts
import { PredefinedNetworkConditions } from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulateNetworkConditions(PredefinedNetworkConditions['Slow 3G']);
await page.goto('https://www.google.com');
await page.emulateNetworkConditions(PredefinedNetworkConditions['Fast 3G']);
await page.goto('https://www.google.com');
// alias to Fast 3G.
await page.emulateNetworkConditions(PredefinedNetworkConditions['Slow 4G']);
await page.goto('https://www.google.com');
await page.emulateNetworkConditions(PredefinedNetworkConditions['Fast 4G']);
await page.goto('https://www.google.com');
// other actions...
await browser.close();
```

# Predicate type

Source: https://pptr.dev/api/puppeteer.predicate

### Signature

```typescript
export type Predicate<From, To extends From = From> = ((value: From) => value is To) | ((value: From) => Awaitable<boolean>);
```

**References:** [Awaitable](./puppeteer.awaitable.md)

# ProtocolError class

Source: https://pptr.dev/api/puppeteer.protocolerror

ProtocolError is emitted whenever there is an error from the protocol.

### Signature

```typescript
export declare class ProtocolError extends PuppeteerError
```

**Extends:** [PuppeteerError](./puppeteer.puppeteererror.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="code">code</span>

</td><td>

`readonly`

</td><td>

number \| undefined

</td><td>

</td></tr>
<tr><td>

<span id="originalmessage">originalMessage</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

# ProtocolLifeCycleEvent type

Source: https://pptr.dev/api/puppeteer.protocollifecycleevent

### Signature

```typescript
export type ProtocolLifeCycleEvent = 'load' | 'DOMContentLoaded' | 'networkIdle' | 'networkAlmostIdle';
```

# ProtocolType type

Source: https://pptr.dev/api/puppeteer.protocoltype

### Signature

```typescript
export type ProtocolType = 'cdp' | 'webDriverBiDi';
```

# Puppeteer.clearCustomQueryHandlers() method

Source: https://pptr.dev/api/puppeteer.puppeteer.clearcustomqueryhandlers

Unregisters all custom query handlers.

### Signature

```typescript
class Puppeteer {
	static clearCustomQueryHandlers(): void;
}
```

**Returns:**

void

# Puppeteer.connect() method

Source: https://pptr.dev/api/puppeteer.puppeteer.connect

This method attaches Puppeteer to an existing browser instance.

### Signature

```typescript
class Puppeteer {
	connect(options: ConnectOptions): Promise<Browser>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[ConnectOptions](./puppeteer.connectoptions.md)

</td><td>

Set of configurable options to set on the browser.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Browser](./puppeteer.browser.md)&gt;

Promise which resolves to browser instance.

## Remarks

# Puppeteer.customQueryHandlerNames() method

Source: https://pptr.dev/api/puppeteer.puppeteer.customqueryhandlernames

Gets the names of all custom query handlers.

### Signature

```typescript
class Puppeteer {
	static customQueryHandlerNames(): string[];
}
```

**Returns:**

string\[\]

# puppeteer variable

Source: https://pptr.dev/api/puppeteer.puppeteer

### Signature

```typescript
puppeteer: PuppeteerCore.PuppeteerNode;
```

# Puppeteer.registerCustomQueryHandler() method

Source: https://pptr.dev/api/puppeteer.puppeteer.registercustomqueryhandler

Registers a [custom query handler](./puppeteer.customqueryhandler.md).

### Signature

```typescript
class Puppeteer {
	static registerCustomQueryHandler(name: string, queryHandler: CustomQueryHandler): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

name

</td><td>

string

</td><td>

The name that the custom query handler will be registered under.

</td></tr>
<tr><td>

queryHandler

</td><td>

[CustomQueryHandler](./puppeteer.customqueryhandler.md)

</td><td>

The [custom query handler](./puppeteer.customqueryhandler.md) to register.

</td></tr>
</tbody></table>

**Returns:**

void

## Remarks

After registration, the handler can be used everywhere where a selector is expected by prepending the selection string with `<name>/`. The name is only allowed to consist of lower- and upper case latin letters.

## Example

```
import {Puppeteer}, puppeteer from 'puppeteer';

Puppeteer.registerCustomQueryHandler('text', { … });
const aHandle = await page.$('text/…');
```

# Puppeteer.unregisterCustomQueryHandler() method

Source: https://pptr.dev/api/puppeteer.puppeteer.unregistercustomqueryhandler

Unregisters a custom query handler for a given name.

### Signature

```typescript
class Puppeteer {
	static unregisterCustomQueryHandler(name: string): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

name

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

void

# PuppeteerError class

Source: https://pptr.dev/api/puppeteer.puppeteererror

The base class for all Puppeteer-specific errors

### Signature

```typescript
export declare class PuppeteerError extends Error
```

**Extends:** Error

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `PuppeteerError` class.

# PuppeteerLifeCycleEvent type

Source: https://pptr.dev/api/puppeteer.puppeteerlifecycleevent

### Signature

```typescript
export type PuppeteerLifeCycleEvent =
	/**
	 * Waits for the 'load' event.
	 */
	| 'load'
	/**
	 * Waits for the 'DOMContentLoaded' event.
	 */
	| 'domcontentloaded'
	/**
	 * Waits till there are no more than 0 network connections for at least `500`
	 * ms.
	 */
	| 'networkidle0'
	/**
	 * Waits till there are no more than 2 network connections for at least `500`
	 * ms.
	 */
	| 'networkidle2';
```

# PuppeteerNode.connect() method

Source: https://pptr.dev/api/puppeteer.puppeteernode.connect

This method attaches Puppeteer to an existing browser instance.

### Signature

```typescript
class PuppeteerNode {
	connect(options: ConnectOptions): Promise<Browser>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[ConnectOptions](./puppeteer.connectoptions.md)

</td><td>

Set of configurable options to set on the browser.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Browser](./puppeteer.browser.md)&gt;

Promise which resolves to browser instance.

# PuppeteerNode.defaultArgs() method

Source: https://pptr.dev/api/puppeteer.puppeteernode.defaultargs

### Signature

```typescript
class PuppeteerNode {
	defaultArgs(options?: LaunchOptions): string[];
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

_(Optional)_ Set of configurable options to set on the browser.

</td></tr>
</tbody></table>

**Returns:**

string\[\]

The default arguments that the browser will be launched with.

# PuppeteerNode.executablePath() method

Source: https://pptr.dev/api/puppeteer.puppeteernode.executablepath

<h2 id="overload-1">executablePath(): string</h2>

The default executable path for a given ChromeReleaseChannel.

### Signature

```typescript
class PuppeteerNode {
	executablePath(channel: ChromeReleaseChannel): string;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

channel

</td><td>

[ChromeReleaseChannel](./puppeteer.chromereleasechannel.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

<h2 id="overload-2">executablePath(): string</h2>

The default executable path given LaunchOptions.

### Signature

```typescript
class PuppeteerNode {
	executablePath(options: LaunchOptions): string;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

<h2 id="overload-3">executablePath(): string</h2>

The default executable path.

### Signature

```typescript
class PuppeteerNode {
	executablePath(): string;
}
```

**Returns:**

string

# PuppeteerNode.launch() method

Source: https://pptr.dev/api/puppeteer.puppeteernode.launch

Launches a browser instance with given arguments and options when specified.

When using with `puppeteer-core`, [options.executablePath](./puppeteer.launchoptions.md#executablepath) or [options.channel](./puppeteer.launchoptions.md#channel) must be provided.

### Signature

```typescript
class PuppeteerNode {
	launch(options?: LaunchOptions): Promise<Browser>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[LaunchOptions](./puppeteer.launchoptions.md)

</td><td>

_(Optional)_ Options to configure launching behavior.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[Browser](./puppeteer.browser.md)&gt;

## Remarks

Puppeteer can also be used to control the Chrome browser, but it works best with the version of Chrome for Testing downloaded by default. There is no guarantee it will work with any other version. If Google Chrome (rather than Chrome for Testing) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested. See [this article](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [This article](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users. See [this doc](https://developer.chrome.com/blog/chrome-for-testing/) for the description of Chrome for Testing.

## Example

You can use [options.ignoreDefaultArgs](./puppeteer.launchoptions.md#ignoredefaultargs) to filter out `--mute-audio` from default arguments:

```ts
const browser = await puppeteer.launch({
	ignoreDefaultArgs: ['--mute-audio'],
});
```

# PuppeteerNode class

Source: https://pptr.dev/api/puppeteer.puppeteernode

Extends the main [Puppeteer](./puppeteer.puppeteer.md) class with Node specific behaviour for fetching and downloading browsers.

If you're using Puppeteer in a Node environment, this is the class you'll get when you run `require('puppeteer')` (or the equivalent ES `import`).

### Signature

```typescript
export declare class PuppeteerNode extends Puppeteer
```

**Extends:** [Puppeteer](./puppeteer.puppeteer.md)

## Remarks

The most common method to use is [launch](./puppeteer.puppeteernode.launch.md), which is used to launch and connect to a new browser instance.

See [the main Puppeteer class](./puppeteer.puppeteer.md) for methods common to all environments, such as [Puppeteer.connect()](./puppeteer.puppeteer.connect.md).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `PuppeteerNode` class.

## Example

The following is a typical example of using Puppeteer to drive automation:

```ts
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.google.com');
// other actions...
await browser.close();
```

Once you have created a `page` you have access to a large API to interact with the page, navigate, or find certain elements in that page. The [\`page\` documentation](./puppeteer.page.md) lists all the available methods.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="defaultbrowser">defaultBrowser</span>

</td><td>

`readonly`

</td><td>

[SupportedBrowser](./puppeteer.supportedbrowser.md)

</td><td>

The name of the browser that will be launched by default. For `puppeteer`, this is influenced by your configuration. Otherwise, it's `chrome`.

</td></tr>
<tr><td>

<span id="lastlaunchedbrowser">lastLaunchedBrowser</span>

</td><td>

`readonly`

</td><td>

[SupportedBrowser](./puppeteer.supportedbrowser.md)

</td><td>

The name of the browser that was last launched.

</td></tr>
<tr><td>

<span id="product">product</span>

</td><td>

`readonly, deprecated`

</td><td>

string

</td><td>

**Deprecated:**

Do not use as this field as it does not take into account multiple browsers of different types. Use [defaultBrowser](./puppeteer.puppeteernode.md#defaultbrowser) or [lastLaunchedBrowser](./puppeteer.puppeteernode.md#lastlaunchedbrowser).

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="connect">[connect(options)](./puppeteer.puppeteernode.connect.md)</span>

</td><td>

</td><td>

This method attaches Puppeteer to an existing browser instance.

</td></tr>
<tr><td>

<span id="defaultargs">[defaultArgs(options)](./puppeteer.puppeteernode.defaultargs.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="executablepath">[executablePath(channel)](./puppeteer.puppeteernode.executablepath.md)</span>

</td><td>

</td><td>

The default executable path for a given ChromeReleaseChannel.

</td></tr>
<tr><td>

<span id="executablepath">[executablePath(options)](./puppeteer.puppeteernode.executablepath.md#overload-2)</span>

</td><td>

</td><td>

The default executable path given LaunchOptions.

</td></tr>
<tr><td>

<span id="executablepath">[executablePath()](./puppeteer.puppeteernode.executablepath.md#overload-3)</span>

</td><td>

</td><td>

The default executable path.

</td></tr>
<tr><td>

<span id="launch">[launch(options)](./puppeteer.puppeteernode.launch.md)</span>

</td><td>

</td><td>

Launches a browser instance with given arguments and options when specified.

When using with `puppeteer-core`, [options.executablePath](./puppeteer.launchoptions.md#executablepath) or [options.channel](./puppeteer.launchoptions.md#channel) must be provided.

**Remarks:**

Puppeteer can also be used to control the Chrome browser, but it works best with the version of Chrome for Testing downloaded by default. There is no guarantee it will work with any other version. If Google Chrome (rather than Chrome for Testing) is preferred, a [Chrome Canary](https://www.google.com/chrome/browser/canary.html) or [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) build is suggested. See [this article](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) for a description of the differences between Chromium and Chrome. [This article](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md) describes some differences for Linux users. See [this doc](https://developer.chrome.com/blog/chrome-for-testing/) for the description of Chrome for Testing.

</td></tr>
<tr><td>

<span id="trimcache">[trimCache()](./puppeteer.puppeteernode.trimcache.md)</span>

</td><td>

</td><td>

Removes all non-current Firefox and Chrome binaries in the cache directory identified by the provided Puppeteer configuration. The current browser version is determined by resolving PUPPETEER_REVISIONS from Puppeteer unless `configuration.browserRevision` is provided.

**Remarks:**

Note that the method does not check if any other Puppeteer versions installed on the host that use the same cache directory require the non-current binaries.

</td></tr>
</tbody></table>

# PuppeteerNode.trimCache() method

Source: https://pptr.dev/api/puppeteer.puppeteernode.trimcache

Removes all non-current Firefox and Chrome binaries in the cache directory identified by the provided Puppeteer configuration. The current browser version is determined by resolving PUPPETEER_REVISIONS from Puppeteer unless `configuration.browserRevision` is provided.

### Signature

```typescript
class PuppeteerNode {
	trimCache(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

## Remarks

Note that the method does not check if any other Puppeteer versions installed on the host that use the same cache directory require the non-current binaries.

# Quad type

Source: https://pptr.dev/api/puppeteer.quad

### Signature

```typescript
export type Quad = [Point, Point, Point, Point];
```

**References:** [Point](./puppeteer.point.md)

# QueryOptions interface

Source: https://pptr.dev/api/puppeteer.queryoptions

### Signature

```typescript
export interface QueryOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="isolate">isolate</span>

</td><td>

</td><td>

boolean

</td><td>

Whether to run the query in isolation. When returning many elements from [Page.$$()](./puppeteer.page.__.md) or similar methods, it might be useful to turn off the isolation to improve performance. By default, the querying code will be executed in a separate sandbox realm.

</td><td>

`true`

</td></tr>
</tbody></table>

# Realm.evaluate() method

Source: https://pptr.dev/api/puppeteer.realm.evaluate

Evaluates a function in the realm's context and returns the resulting value.

If the function passed to `realm.evaluate` returns a Promise, the method will wait for the promise to resolve and return its value.

[JSHandle](./puppeteer.jshandle.md) instances can be passed as arguments to the function.

### Signature

```typescript
class Realm {
	abstract evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

A function to be evaluated in the realm.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to be passed to the `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

A promise that resolves to the return value of the function.

## Example

```ts
const result = await realm.evaluate(() => {
	return Promise.resolve(8 * 7);
});
console.log(result); // prints "56"
```

# Realm.evaluateHandle() method

Source: https://pptr.dev/api/puppeteer.realm.evaluatehandle

Evaluates a function in the realm's context and returns a [JSHandle](./puppeteer.jshandle.md) to the result.

If the function passed to `realm.evaluateHandle` returns a Promise, the method will wait for the promise to resolve and return its value.

[JSHandle](./puppeteer.jshandle.md) instances can be passed as arguments to the function.

### Signature

```typescript
class Realm {
	abstract evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

A function to be evaluated in the realm.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to be passed to the `pageFunction`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

A promise that resolves to a [JSHandle](./puppeteer.jshandle.md) containing the result.

## Example

```ts
const aHandle = await realm.evaluateHandle(() => document.body);
const resultHandle = await realm.evaluateHandle((body) => body.innerHTML, aHandle);
```

# Realm.extension() method

Source: https://pptr.dev/api/puppeteer.realm.extension

Returns the [Extension](./puppeteer.extension.md) that created this realm, if applicable. This is typically populated when the realm was created by an extension content script injected into a page.

### Signature

```typescript
class Realm {
	abstract extension(): Promise<Extension | null>;
}
```

**Returns:**

Promise&lt;[Extension](./puppeteer.extension.md) \| null&gt;

A promise that resolves to the [Extension](./puppeteer.extension.md) or `null` if not created by an extension.

# Realm class

Source: https://pptr.dev/api/puppeteer.realm

### Signature

```typescript
export declare abstract class Realm
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Realm` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="origin">origin</span>

</td><td>

`readonly`

</td><td>

string \| undefined

</td><td>

**_(Experimental)_** Returns the origin that created the Realm. For example, if the realm was created by an extension content script, this will return the origin of the extension (e.g., `chrome-extension://<extension-id>`).

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="evaluate">[evaluate(pageFunction, args)](./puppeteer.realm.evaluate.md)</span>

</td><td>

</td><td>

Evaluates a function in the realm's context and returns the resulting value.

If the function passed to `realm.evaluate` returns a Promise, the method will wait for the promise to resolve and return its value.

[JSHandle](./puppeteer.jshandle.md) instances can be passed as arguments to the function.

</td></tr>
<tr><td>

<span id="evaluatehandle">[evaluateHandle(pageFunction, args)](./puppeteer.realm.evaluatehandle.md)</span>

</td><td>

</td><td>

Evaluates a function in the realm's context and returns a [JSHandle](./puppeteer.jshandle.md) to the result.

If the function passed to `realm.evaluateHandle` returns a Promise, the method will wait for the promise to resolve and return its value.

[JSHandle](./puppeteer.jshandle.md) instances can be passed as arguments to the function.

</td></tr>
<tr><td>

<span id="extension">[extension()](./puppeteer.realm.extension.md)</span>

</td><td>

</td><td>

**_(Experimental)_** Returns the [Extension](./puppeteer.extension.md) that created this realm, if applicable. This is typically populated when the realm was created by an extension content script injected into a page.

</td></tr>
<tr><td>

<span id="waitforfunction">[waitForFunction(pageFunction, options, args)](./puppeteer.realm.waitforfunction.md)</span>

</td><td>

</td><td>

Waits for a function to return a truthy value when evaluated in the realm's context.

Arguments can be passed from Node.js to `pageFunction`.

</td></tr>
</tbody></table>

# Realm.waitForFunction() method

Source: https://pptr.dev/api/puppeteer.realm.waitforfunction

Waits for a function to return a truthy value when evaluated in the realm's context.

Arguments can be passed from Node.js to `pageFunction`.

### Signature

```typescript
class Realm {
	waitForFunction<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(
		pageFunction: Func | string,
		options?: {
			polling?: 'raf' | 'mutation' | number;
			timeout?: number;
			root?: ElementHandle<Node>;
			signal?: AbortSignal;
		},
		...args: Params
	): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

pageFunction

</td><td>

Func \| string

</td><td>

A function to evaluate in the realm.

</td></tr>
<tr><td>

options

</td><td>

&#123; polling?: 'raf' \| 'mutation' \| number; timeout?: number; root?: [ElementHandle](./puppeteer.elementhandle.md)&lt;Node&gt;; signal?: AbortSignal; &#125;

</td><td>

_(Optional)_ Options for polling and timeouts.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to pass to the function.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

A promise that resolves when the function returns a truthy value.

## Example

```ts
const selector = '.foo';
await realm.waitForFunction((selector) => !!document.querySelector(selector), {}, selector);
```

# ReloadOptions interface

Source: https://pptr.dev/api/puppeteer.reloadoptions

### Signature

```typescript
export interface ReloadOptions extends WaitForOptions
```

**Extends:** [WaitForOptions](./puppeteer.waitforoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="ignorecache">ignoreCache</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If set to true, the browser caches are ignored for the page reload.

</td><td>

true

</td></tr>
</tbody></table>

# RemoteAddress interface

Source: https://pptr.dev/api/puppeteer.remoteaddress

### Signature

```typescript
export interface RemoteAddress
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="ip">ip</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="port">port</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ResourceType type

Source: https://pptr.dev/api/puppeteer.resourcetype

Resource types for HTTPRequests as perceived by the rendering engine.

### Signature

```typescript
export type ResourceType = Lowercase<Protocol.Network.ResourceType>;
```

# ResponseForRequest interface

Source: https://pptr.dev/api/puppeteer.responseforrequest

Required response data to fulfill a request with.

### Signature

```typescript
export interface ResponseForRequest
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="body">body</span>

</td><td>

</td><td>

string \| Uint8Array

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="contenttype">contentType</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="headers">headers</span>

</td><td>

</td><td>

Record&lt;string, string \| string\[\] \| unknown&gt;

</td><td>

Optional response headers.

The record values will be converted to string following: Arrays' values will be mapped to String (Used when you need multiple headers with the same name). Non-arrays will be converted to String.

</td><td>

</td></tr>
<tr><td>

<span id="status">status</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ScreencastOptions interface

Source: https://pptr.dev/api/puppeteer.screencastoptions

### Signature

```typescript
export interface ScreencastOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="colors">colors</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the maximum number of [palette](https://ffmpeg.org/ffmpeg-filters.html#palettegen) colors to quantize, with GIF limited to `256`. Restrict the palette to only necessary colors to reduce output file size.

</td><td>

`256`

</td></tr>
<tr><td>

<span id="crop">crop</span>

</td><td>

`optional`

</td><td>

[BoundingBox](./puppeteer.boundingbox.md)

</td><td>

Specifies the region of the viewport to crop.

</td><td>

</td></tr>
<tr><td>

<span id="delay">delay</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the delay between iterations of a loop, in ms. `-1` is a special value to re-use the previous delay.

</td><td>

`-1`

</td></tr>
<tr><td>

<span id="ffmpegpath">ffmpegPath</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Path to the [ffmpeg](https://ffmpeg.org/).

Required if `ffmpeg` is not in your PATH.

</td><td>

`'ffmpeg'`

</td></tr>
<tr><td>

<span id="format">format</span>

</td><td>

`optional`

</td><td>

[VideoFormat](./puppeteer.videoformat.md)

</td><td>

Specifies the output file format.

</td><td>

`'webm'`

</td></tr>
<tr><td>

<span id="fps">fps</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the frame rate in frames per second.

</td><td>

`30` (`20` for GIF)

</td></tr>
<tr><td>

<span id="loop">loop</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the number of times to loop playback, from `0` to `Infinity`. A value of `0` or `undefined` will disable looping.

</td><td>

`undefined`

</td></tr>
<tr><td>

<span id="overwrite">overwrite</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Specifies whether to overwrite output file, or exit immediately if it already exists.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

\`$&#123;string&#125;.$&#123;[VideoFormat](./puppeteer.videoformat.md)&#125;\`

</td><td>

File path to save the screencast to.

</td><td>

</td></tr>
<tr><td>

<span id="quality">quality</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the recording [quality](https://trac.ffmpeg.org/wiki/Encode/VP9#constantq) Constant Rate Factor between `0`–`63`. Lower values mean better quality.

</td><td>

`30`

</td></tr>
<tr><td>

<span id="scale">scale</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Scales the output video.

For example, `0.5` will shrink the width and height of the output video by half. `2` will double the width and height of the output video.

</td><td>

`1`

</td></tr>
<tr><td>

<span id="speed">speed</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specifies the speed to record at.

For example, `0.5` will slowdown the output video by 50%. `2` will double the speed of the output video.

</td><td>

`1`

</td></tr>
</tbody></table>

# ScreenInfo interface

Source: https://pptr.dev/api/puppeteer.screeninfo

### Signature

```typescript
export interface ScreenInfo
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="availheight">availHeight</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="availleft">availLeft</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="availtop">availTop</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="availwidth">availWidth</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="colordepth">colorDepth</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="devicepixelratio">devicePixelRatio</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="height">height</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="id">id</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="isextended">isExtended</span>

</td><td>

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="isinternal">isInternal</span>

</td><td>

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="isprimary">isPrimary</span>

</td><td>

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="label">label</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="left">left</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="orientation">orientation</span>

</td><td>

</td><td>

[ScreenOrientation](./puppeteer.screenorientation_2.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="top">top</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ScreenOrientation_2 interface

Source: https://pptr.dev/api/puppeteer.screenorientation_2

### Signature

```typescript
export interface ScreenOrientation
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="angle">angle</span>

</td><td>

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="type">type</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
</tbody></table>

# ScreenRecorder class

Source: https://pptr.dev/api/puppeteer.screenrecorder

### Signature

```typescript
export declare class ScreenRecorder extends PassThrough
```

**Extends:** PassThrough

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ScreenRecorder` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="stop">[stop()](./puppeteer.screenrecorder.stop.md)</span>

</td><td>

</td><td>

Stops the recorder.

</td></tr>
</tbody></table>

# ScreenRecorder.stop() method

Source: https://pptr.dev/api/puppeteer.screenrecorder.stop

Stops the recorder.

### Signature

```typescript
class ScreenRecorder {
	stop(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# ScreenshotClip interface

Source: https://pptr.dev/api/puppeteer.screenshotclip

### Signature

```typescript
export interface ScreenshotClip extends BoundingBox
```

**Extends:** [BoundingBox](./puppeteer.boundingbox.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="scale">scale</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

`1`

</td></tr>
</tbody></table>

# ScreenshotOptions interface

Source: https://pptr.dev/api/puppeteer.screenshotoptions

### Signature

```typescript
export interface ScreenshotOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="capturebeyondviewport">captureBeyondViewport</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Capture the screenshot beyond the viewport.

</td><td>

`false` if there is no `clip`. `true` otherwise.

</td></tr>
<tr><td>

<span id="clip">clip</span>

</td><td>

`optional`

</td><td>

[ScreenshotClip](./puppeteer.screenshotclip.md)

</td><td>

Specifies the region of the page/element to clip.

</td><td>

</td></tr>
<tr><td>

<span id="encoding">encoding</span>

</td><td>

`optional`

</td><td>

'base64' \| 'binary'

</td><td>

Encoding of the image.

</td><td>

`'binary'`

</td></tr>
<tr><td>

<span id="fromsurface">fromSurface</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Capture the screenshot from the surface, rather than the view.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="fullpage">fullPage</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

When `true`, takes a screenshot of the full page.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="omitbackground">omitBackground</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Hides default white background and allows capturing screenshots with transparency.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="optimizeforspeed">optimizeForSpeed</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

`false`

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The file path to save the image to. The screenshot type will be inferred from file extension. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the image won't be saved to the disk.

</td><td>

</td></tr>
<tr><td>

<span id="quality">quality</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Quality of the image, between 0-100. Not applicable to `png` images.

</td><td>

</td></tr>
<tr><td>

<span id="type">type</span>

</td><td>

`optional`

</td><td>

[ImageFormat](./puppeteer.imageformat.md)

</td><td>

</td><td>

`'png'`

</td></tr>
</tbody></table>

# SecurityDetails.issuer() method

Source: https://pptr.dev/api/puppeteer.securitydetails.issuer

The name of the issuer of the certificate.

### Signature

```typescript
class SecurityDetails {
	issuer(): string;
}
```

**Returns:**

string

# SecurityDetails class

Source: https://pptr.dev/api/puppeteer.securitydetails

The SecurityDetails class represents the security details of a response that was received over a secure connection.

### Signature

```typescript
export declare class SecurityDetails
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `SecurityDetails` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="issuer">[issuer()](./puppeteer.securitydetails.issuer.md)</span>

</td><td>

</td><td>

The name of the issuer of the certificate.

</td></tr>
<tr><td>

<span id="protocol">[protocol()](./puppeteer.securitydetails.protocol.md)</span>

</td><td>

</td><td>

The security protocol being used, e.g. "TLS 1.2".

</td></tr>
<tr><td>

<span id="subjectalternativenames">[subjectAlternativeNames()](./puppeteer.securitydetails.subjectalternativenames.md)</span>

</td><td>

</td><td>

The list of [subject alternative names (SANs)](https://en.wikipedia.org/wiki/Subject_Alternative_Name) of the certificate.

</td></tr>
<tr><td>

<span id="subjectname">[subjectName()](./puppeteer.securitydetails.subjectname.md)</span>

</td><td>

</td><td>

The name of the subject to which the certificate was issued.

</td></tr>
<tr><td>

<span id="validfrom">[validFrom()](./puppeteer.securitydetails.validfrom.md)</span>

</td><td>

</td><td>

[Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) marking the start of the certificate's validity.

</td></tr>
<tr><td>

<span id="validto">[validTo()](./puppeteer.securitydetails.validto.md)</span>

</td><td>

</td><td>

[Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) marking the end of the certificate's validity.

</td></tr>
</tbody></table>

# SecurityDetails.protocol() method

Source: https://pptr.dev/api/puppeteer.securitydetails.protocol

The security protocol being used, e.g. "TLS 1.2".

### Signature

```typescript
class SecurityDetails {
	protocol(): string;
}
```

**Returns:**

string

# SecurityDetails.subjectAlternativeNames() method

Source: https://pptr.dev/api/puppeteer.securitydetails.subjectalternativenames

The list of [subject alternative names (SANs)](https://en.wikipedia.org/wiki/Subject_Alternative_Name) of the certificate.

### Signature

```typescript
class SecurityDetails {
	subjectAlternativeNames(): string[];
}
```

**Returns:**

string\[\]

# SecurityDetails.subjectName() method

Source: https://pptr.dev/api/puppeteer.securitydetails.subjectname

The name of the subject to which the certificate was issued.

### Signature

```typescript
class SecurityDetails {
	subjectName(): string;
}
```

**Returns:**

string

# SecurityDetails.validFrom() method

Source: https://pptr.dev/api/puppeteer.securitydetails.validfrom

[Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) marking the start of the certificate's validity.

### Signature

```typescript
class SecurityDetails {
	validFrom(): number;
}
```

**Returns:**

number

# SecurityDetails.validTo() method

Source: https://pptr.dev/api/puppeteer.securitydetails.validto

[Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) marking the end of the certificate's validity.

### Signature

```typescript
class SecurityDetails {
	validTo(): number;
}
```

**Returns:**

number

# SerializedAXNode.elementHandle() method

Source: https://pptr.dev/api/puppeteer.serializedaxnode.elementhandle

Get an ElementHandle for this AXNode if available.

If the underlying DOM element has been disposed, the method might return an error.

### Signature

```typescript
interface SerializedAXNode {
	elementHandle(): Promise<ElementHandle | null>;
}
```

**Returns:**

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md) \| null&gt;

# SerializedAXNode interface

Source: https://pptr.dev/api/puppeteer.serializedaxnode

Represents a Node and the properties of it that are relevant to Accessibility.

### Signature

```typescript
export interface SerializedAXNode
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="atomic">atomic</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether the live region is [atomic](https://www.w3.org/TR/wai-aria/#aria-atomic).

</td><td>

</td></tr>
<tr><td>

<span id="autocomplete">autocomplete</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="busy">busy</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether the node is [busy](https://www.w3.org/TR/wai-aria/#aria-busy).

</td><td>

</td></tr>
<tr><td>

<span id="checked">checked</span>

</td><td>

`optional`

</td><td>

boolean \| 'mixed'

</td><td>

Whether the checkbox is checked, or in a [mixed state](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html).

</td><td>

</td></tr>
<tr><td>

<span id="children">children</span>

</td><td>

`optional`

</td><td>

[SerializedAXNode](./puppeteer.serializedaxnode.md)\[\]

</td><td>

Children of this node, if there are any.

</td><td>

</td></tr>
<tr><td>

<span id="description">description</span>

</td><td>

`optional`

</td><td>

string

</td><td>

An additional human readable description of the node.

</td><td>

</td></tr>
<tr><td>

<span id="details">details</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The [details](https://www.w3.org/TR/wai-aria/#aria-details) for the node.

</td><td>

</td></tr>
<tr><td>

<span id="disabled">disabled</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="errormessage">errormessage</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The [error message](https://www.w3.org/TR/wai-aria/#aria-errormessage) for the node.

</td><td>

</td></tr>
<tr><td>

<span id="expanded">expanded</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="focused">focused</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="haspopup">haspopup</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="invalid">invalid</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Whether and in what way this node's value is invalid.

</td><td>

</td></tr>
<tr><td>

<span id="keyshortcuts">keyshortcuts</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Any keyboard shortcuts associated with this node.

</td><td>

</td></tr>
<tr><td>

<span id="level">level</span>

</td><td>

`optional`

</td><td>

number

</td><td>

The level of a heading.

</td><td>

</td></tr>
<tr><td>

<span id="live">live</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The [live](https://www.w3.org/TR/wai-aria/#aria-live) status of the node.

</td><td>

</td></tr>
<tr><td>

<span id="modal">modal</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="multiline">multiline</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="multiselectable">multiselectable</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether more than one child can be selected.

</td><td>

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

`optional`

</td><td>

string

</td><td>

A human readable name for the node.

</td><td>

</td></tr>
<tr><td>

<span id="orientation">orientation</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="pressed">pressed</span>

</td><td>

`optional`

</td><td>

boolean \| 'mixed'

</td><td>

Whether the node is checked or in a mixed state.

</td><td>

</td></tr>
<tr><td>

<span id="readonly">readonly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="relevant">relevant</span>

</td><td>

`optional`

</td><td>

string

</td><td>

The [relevant](https://www.w3.org/TR/wai-aria/#aria-relevant) changes for the live region.

</td><td>

</td></tr>
<tr><td>

<span id="required">required</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="role">role</span>

</td><td>

</td><td>

string

</td><td>

The [role](https://www.w3.org/TR/wai-aria/#usage_intro) of the node.

</td><td>

</td></tr>
<tr><td>

<span id="roledescription">roledescription</span>

</td><td>

`optional`

</td><td>

string

</td><td>

A human readable alternative to the role.

</td><td>

</td></tr>
<tr><td>

<span id="selected">selected</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="url">url</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Url for link elements.

</td><td>

</td></tr>
<tr><td>

<span id="value">value</span>

</td><td>

`optional`

</td><td>

string \| number

</td><td>

The current value of the node.

</td><td>

</td></tr>
<tr><td>

<span id="valuemax">valuemax</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="valuemin">valuemin</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="valuetext">valuetext</span>

</td><td>

`optional`

</td><td>

string

</td><td>

A description of the current value.

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="elementhandle">[elementHandle()](./puppeteer.serializedaxnode.elementhandle.md)</span>

</td><td>

Get an ElementHandle for this AXNode if available.

If the underlying DOM element has been disposed, the method might return an error.

</td></tr>
</tbody></table>

# SetContentWaitForOptions interface

Source: https://pptr.dev/api/puppeteer.setcontentwaitforoptions

### Signature

```typescript
export interface SetContentWaitForOptions extends WaitForOptions
```

**Extends:** [WaitForOptions](./puppeteer.waitforoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="waituntil">waitUntil</span>

</td><td>

`optional`

</td><td>

Exclude&lt;[PuppeteerLifeCycleEvent](./puppeteer.puppeteerlifecycleevent.md), 'networkidle0' \| 'networkidle2'&gt; \| Array&lt;Exclude&lt;[PuppeteerLifeCycleEvent](./puppeteer.puppeteerlifecycleevent.md), 'networkidle0' \| 'networkidle2'&gt;&gt;

</td><td>

When to consider waiting succeeds. Given an array of event strings, waiting is considered to be successful after all events have been fired.

</td><td>

`'load'`

</td></tr>
</tbody></table>

# SnapshotOptions interface

Source: https://pptr.dev/api/puppeteer.snapshotoptions

### Signature

```typescript
export interface SnapshotOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="includeiframes">includeIframes</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If true, gets accessibility trees for each of the iframes in the frame subtree.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="interestingonly">interestingOnly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Prune uninteresting nodes from the tree.

</td><td>

`true`

</td></tr>
<tr><td>

<span id="root">root</span>

</td><td>

`optional`

</td><td>

[ElementHandle](./puppeteer.elementhandle.md)&lt;Node&gt;

</td><td>

Root node to get the accessibility tree for

</td><td>

The root node of the entire page.

</td></tr>
</tbody></table>

# SupportedBrowser type

Source: https://pptr.dev/api/puppeteer.supportedbrowser

Browsers supported by Puppeteer.

### Signature

```typescript
export type SupportedBrowser = 'chrome' | 'firefox';
```

# SupportedWebDriverCapabilities interface

Source: https://pptr.dev/api/puppeteer.supportedwebdrivercapabilities

WebDriver BiDi capabilities that are not set by Puppeteer itself.

### Signature

```typescript
export interface SupportedWebDriverCapabilities
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="alwaysmatch">alwaysMatch</span>

</td><td>

`optional`

</td><td>

[SupportedWebDriverCapability](./puppeteer.supportedwebdrivercapability.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="firstmatch">firstMatch</span>

</td><td>

`optional`

</td><td>

[SupportedWebDriverCapability](./puppeteer.supportedwebdrivercapability.md)\[\]

</td><td>

</td><td>

</td></tr>
</tbody></table>

# SupportedWebDriverCapability type

Source: https://pptr.dev/api/puppeteer.supportedwebdrivercapability

### Signature

```typescript
export type SupportedWebDriverCapability = Exclude<Session.CapabilityRequest, 'unhandledPromptBehavior' | 'acceptInsecureCerts'>;
```

# Target.asPage() method

Source: https://pptr.dev/api/puppeteer.target.aspage

Forcefully creates a page for a target of any type. It is useful if you want to handle a CDP target of type `other` as a page. If you deal with a regular page target, use [Target.page()](./puppeteer.target.page.md).

### Signature

```typescript
class Target {
	abstract asPage(): Promise<Page>;
}
```

**Returns:**

Promise&lt;[Page](./puppeteer.page.md)&gt;

# Target.browser() method

Source: https://pptr.dev/api/puppeteer.target.browser

Get the browser the target belongs to.

### Signature

```typescript
class Target {
	abstract browser(): Browser;
}
```

**Returns:**

[Browser](./puppeteer.browser.md)

# Target.browserContext() method

Source: https://pptr.dev/api/puppeteer.target.browsercontext

Get the browser context the target belongs to.

### Signature

```typescript
class Target {
	abstract browserContext(): BrowserContext;
}
```

**Returns:**

[BrowserContext](./puppeteer.browsercontext.md)

# Target.createCDPSession() method

Source: https://pptr.dev/api/puppeteer.target.createcdpsession

Creates a Chrome Devtools Protocol session attached to the target.

### Signature

```typescript
class Target {
	abstract createCDPSession(): Promise<CDPSession>;
}
```

**Returns:**

Promise&lt;[CDPSession](./puppeteer.cdpsession.md)&gt;

# Target class

Source: https://pptr.dev/api/puppeteer.target

Target represents a [CDP target](https://chromedevtools.github.io/devtools-protocol/tot/Target/). In CDP a target is something that can be debugged such a frame, a page or a worker.

### Signature

```typescript
export declare abstract class Target
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Target` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="aspage">[asPage()](./puppeteer.target.aspage.md)</span>

</td><td>

</td><td>

Forcefully creates a page for a target of any type. It is useful if you want to handle a CDP target of type `other` as a page. If you deal with a regular page target, use [Target.page()](./puppeteer.target.page.md).

</td></tr>
<tr><td>

<span id="browser">[browser()](./puppeteer.target.browser.md)</span>

</td><td>

</td><td>

Get the browser the target belongs to.

</td></tr>
<tr><td>

<span id="browsercontext">[browserContext()](./puppeteer.target.browsercontext.md)</span>

</td><td>

</td><td>

Get the browser context the target belongs to.

</td></tr>
<tr><td>

<span id="createcdpsession">[createCDPSession()](./puppeteer.target.createcdpsession.md)</span>

</td><td>

</td><td>

Creates a Chrome Devtools Protocol session attached to the target.

</td></tr>
<tr><td>

<span id="opener">[opener()](./puppeteer.target.opener.md)</span>

</td><td>

</td><td>

Get the target that opened this target. Top-level targets return `null`.

</td></tr>
<tr><td>

<span id="page">[page()](./puppeteer.target.page.md)</span>

</td><td>

</td><td>

If the target is not of type `"page"`, `"webview"` or `"background_page"`, returns `null`.

</td></tr>
<tr><td>

<span id="type">[type()](./puppeteer.target.type.md)</span>

</td><td>

</td><td>

Identifies what kind of target this is.

**Remarks:**

See [docs](https://developer.chrome.com/extensions/background_pages) for more info about background pages.

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.target.url.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="worker">[worker()](./puppeteer.target.worker.md)</span>

</td><td>

</td><td>

If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.

</td></tr>
</tbody></table>

# Target.opener() method

Source: https://pptr.dev/api/puppeteer.target.opener

Get the target that opened this target. Top-level targets return `null`.

### Signature

```typescript
class Target {
	abstract opener(): Target | undefined;
}
```

**Returns:**

[Target](./puppeteer.target.md) \| undefined

# Target.page() method

Source: https://pptr.dev/api/puppeteer.target.page

If the target is not of type `"page"`, `"webview"` or `"background_page"`, returns `null`.

### Signature

```typescript
class Target {
	page(): Promise<Page | null>;
}
```

**Returns:**

Promise&lt;[Page](./puppeteer.page.md) \| null&gt;

# Target.type() method

Source: https://pptr.dev/api/puppeteer.target.type

Identifies what kind of target this is.

### Signature

```typescript
class Target {
	abstract type(): TargetType;
}
```

**Returns:**

[TargetType](./puppeteer.targettype.md)

## Remarks

See [docs](https://developer.chrome.com/extensions/background_pages) for more info about background pages.

# Target.url() method

Source: https://pptr.dev/api/puppeteer.target.url

### Signature

```typescript
class Target {
	abstract url(): string;
}
```

**Returns:**

string

# Target.worker() method

Source: https://pptr.dev/api/puppeteer.target.worker

If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.

### Signature

```typescript
class Target {
	worker(): Promise<WebWorker | null>;
}
```

**Returns:**

Promise&lt;[WebWorker](./puppeteer.webworker.md) \| null&gt;

# TargetFilterCallback type

Source: https://pptr.dev/api/puppeteer.targetfiltercallback

### Signature

```typescript
export type TargetFilterCallback = (target: Target) => boolean;
```

**References:** [Target](./puppeteer.target.md)

# TargetType enum

Source: https://pptr.dev/api/puppeteer.targettype

### Signature

```typescript
export declare enum TargetType
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

BACKGROUND_PAGE

</td><td>

`"background_page"`

</td><td>

</td></tr>
<tr><td>

BROWSER

</td><td>

`"browser"`

</td><td>

</td></tr>
<tr><td>

OTHER

</td><td>

`"other"`

</td><td>

</td></tr>
<tr><td>

PAGE

</td><td>

`"page"`

</td><td>

</td></tr>
<tr><td>

SERVICE_WORKER

</td><td>

`"service_worker"`

</td><td>

</td></tr>
<tr><td>

SHARED_WORKER

</td><td>

`"shared_worker"`

</td><td>

</td></tr>
<tr><td>

WEBVIEW

</td><td>

`"webview"`

</td><td>

</td></tr>
</tbody></table>

# TimeoutError class

Source: https://pptr.dev/api/puppeteer.timeouterror

TimeoutError is emitted whenever certain operations are terminated due to timeout.

### Signature

```typescript
export declare class TimeoutError extends PuppeteerError
```

**Extends:** [PuppeteerError](./puppeteer.puppeteererror.md)

## Remarks

Example operations are [page.waitForSelector](./puppeteer.page.waitforselector.md) or [puppeteer.launch](./puppeteer.puppeteernode.launch.md).

# TouchError class

Source: https://pptr.dev/api/puppeteer.toucherror

TouchError is thrown when an attempt is made to move or end a touch that does not exist.

### Signature

```typescript
export declare class TouchError extends PuppeteerError
```

**Extends:** [PuppeteerError](./puppeteer.puppeteererror.md)

# TouchHandle.end() method

Source: https://pptr.dev/api/puppeteer.touchhandle.end

Dispatches a `touchend` event for this touch.

### Signature

```typescript
interface TouchHandle {
	end(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# TouchHandle interface

Source: https://pptr.dev/api/puppeteer.touchhandle

The TouchHandle interface exposes methods to manipulate touches that have been started

### Signature

```typescript
export interface TouchHandle
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="end">[end()](./puppeteer.touchhandle.end.md)</span>

</td><td>

Dispatches a `touchend` event for this touch.

</td></tr>
<tr><td>

<span id="move">[move(x, y)](./puppeteer.touchhandle.move.md)</span>

</td><td>

Dispatches a `touchMove` event for this touch.

</td></tr>
</tbody></table>

# TouchHandle.move() method

Source: https://pptr.dev/api/puppeteer.touchhandle.move

Dispatches a `touchMove` event for this touch.

### Signature

```typescript
interface TouchHandle {
	move(x: number, y: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the move.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the move.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Touchscreen class

Source: https://pptr.dev/api/puppeteer.touchscreen

The Touchscreen class exposes touchscreen events.

### Signature

```typescript
export declare abstract class Touchscreen
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Touchscreen` class.

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="tap">[tap(x, y)](./puppeteer.touchscreen.tap.md)</span>

</td><td>

</td><td>

Dispatches a `touchstart` and `touchend` event.

</td></tr>
<tr><td>

<span id="touchend">[touchEnd()](./puppeteer.touchscreen.touchend.md)</span>

</td><td>

</td><td>

Dispatches a `touchend` event on the first touch that is active.

</td></tr>
<tr><td>

<span id="touchmove">[touchMove(x, y)](./puppeteer.touchscreen.touchmove.md)</span>

</td><td>

</td><td>

Dispatches a `touchMove` event on the first touch that is active.

**Remarks:**

Not every `touchMove` call results in a `touchmove` event being emitted, depending on the browser's optimizations. For example, Chrome [throttles](https://developer.chrome.com/blog/a-more-compatible-smoother-touch/#chromes-new-model-the-throttled-async-touchmove-model) touch move events.

</td></tr>
<tr><td>

<span id="touchstart">[touchStart(x, y)](./puppeteer.touchscreen.touchstart.md)</span>

</td><td>

</td><td>

Dispatches a `touchstart` event.

</td></tr>
</tbody></table>

# Touchscreen.tap() method

Source: https://pptr.dev/api/puppeteer.touchscreen.tap

Dispatches a `touchstart` and `touchend` event.

### Signature

```typescript
class Touchscreen {
	tap(x: number, y: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the tap.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the tap.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# Touchscreen.touchEnd() method

Source: https://pptr.dev/api/puppeteer.touchscreen.touchend

Dispatches a `touchend` event on the first touch that is active.

### Signature

```typescript
class Touchscreen {
	touchEnd(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Touchscreen.touchMove() method

Source: https://pptr.dev/api/puppeteer.touchscreen.touchmove

Dispatches a `touchMove` event on the first touch that is active.

### Signature

```typescript
class Touchscreen {
	touchMove(x: number, y: number): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the move.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the move.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Not every `touchMove` call results in a `touchmove` event being emitted, depending on the browser's optimizations. For example, Chrome [throttles](https://developer.chrome.com/blog/a-more-compatible-smoother-touch/#chromes-new-model-the-throttled-async-touchmove-model) touch move events.

# Touchscreen.touchStart() method

Source: https://pptr.dev/api/puppeteer.touchscreen.touchstart

Dispatches a `touchstart` event.

### Signature

```typescript
class Touchscreen {
	abstract touchStart(x: number, y: number): Promise<TouchHandle>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

x

</td><td>

number

</td><td>

Horizontal position of the tap.

</td></tr>
<tr><td>

y

</td><td>

number

</td><td>

Vertical position of the tap.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[TouchHandle](./puppeteer.touchhandle.md)&gt;

A handle for the touch that was started.

# Tracing class

Source: https://pptr.dev/api/puppeteer.tracing

The Tracing class exposes the tracing audit interface.

### Signature

```typescript
export declare class Tracing
```

## Remarks

You can use `tracing.start` and `tracing.stop` to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `Tracing` class.

## Example

```ts
await page.tracing.start({ path: 'trace.json' });
await page.goto('https://www.google.com');
await page.tracing.stop();
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="start">[start(options)](./puppeteer.tracing.start.md)</span>

</td><td>

</td><td>

Starts a trace for the current page.

**Remarks:**

Only one trace can be active at a time per browser.

</td></tr>
<tr><td>

<span id="stop">[stop()](./puppeteer.tracing.stop.md)</span>

</td><td>

</td><td>

Stops a trace started with the `start` method.

</td></tr>
</tbody></table>

# Tracing.start() method

Source: https://pptr.dev/api/puppeteer.tracing.start

Starts a trace for the current page.

### Signature

```typescript
class Tracing {
	start(options?: TracingOptions): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[TracingOptions](./puppeteer.tracingoptions.md)

</td><td>

_(Optional)_ Optional `TracingOptions`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

## Remarks

Only one trace can be active at a time per browser.

# Tracing.stop() method

Source: https://pptr.dev/api/puppeteer.tracing.stop

Stops a trace started with the `start` method.

### Signature

```typescript
class Tracing {
	stop(): Promise<Uint8Array | undefined>;
}
```

**Returns:**

Promise&lt;Uint8Array \| undefined&gt;

Promise which resolves to buffer with trace data.

# TracingOptions interface

Source: https://pptr.dev/api/puppeteer.tracingoptions

### Signature

```typescript
export interface TracingOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="categories">categories</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`optional`

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="screenshots">screenshots</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

</td><td>

</td></tr>
</tbody></table>

# trimCache() function

Source: https://pptr.dev/api/puppeteer.trimcache

### Signature

```typescript
trimCache: () => Promise<void>;
```

**Returns:**

Promise&lt;void&gt;

# UnsupportedOperation class

Source: https://pptr.dev/api/puppeteer.unsupportedoperation

Puppeteer will throw this error if a method is not supported by the currently used protocol

### Signature

```typescript
export declare class UnsupportedOperation extends PuppeteerError
```

**Extends:** [PuppeteerError](./puppeteer.puppeteererror.md)

# VideoFormat type

Source: https://pptr.dev/api/puppeteer.videoformat

### Signature

```typescript
export type VideoFormat = 'webm' | 'gif' | 'mp4';
```

# Viewport interface

Source: https://pptr.dev/api/puppeteer.viewport

### Signature

```typescript
export interface Viewport
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="devicescalefactor">deviceScaleFactor</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Specify device scale factor. See [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) for more info.

**Remarks:**

Setting this value to `0` will reset this value to the system default.

</td><td>

`1`

</td></tr>
<tr><td>

<span id="hastouch">hasTouch</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Specify if the viewport supports touch events.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="height">height</span>

</td><td>

</td><td>

number

</td><td>

The page height in CSS pixels.

**Remarks:**

Setting this value to `0` will reset this value to the system default.

</td><td>

</td></tr>
<tr><td>

<span id="islandscape">isLandscape</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Specifies if the viewport is in landscape mode.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="ismobile">isMobile</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether the `meta viewport` tag is taken into account.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

</td><td>

number

</td><td>

The page width in CSS pixels.

**Remarks:**

Setting this value to `0` will reset this value to the system default.

</td><td>

</td></tr>
</tbody></table>

# VisibilityOption type

Source: https://pptr.dev/api/puppeteer.visibilityoption

Whether to wait for the element to be [visible](./puppeteer.elementhandle.isvisible.md) or [hidden](./puppeteer.elementhandle.ishidden.md). `null` to disable visibility checks.

### Signature

```typescript
export type VisibilityOption = 'hidden' | 'visible' | null;
```

# WaitForNetworkIdleOptions interface

Source: https://pptr.dev/api/puppeteer.waitfornetworkidleoptions

### Signature

```typescript
export interface WaitForNetworkIdleOptions extends WaitTimeoutOptions
```

**Extends:** [WaitTimeoutOptions](./puppeteer.waittimeoutoptions.md)

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="concurrency">concurrency</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum number concurrent of network connections to be considered inactive.

</td><td>

`0`

</td></tr>
<tr><td>

<span id="idletime">idleTime</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Time (in milliseconds) the network should be idle.

</td><td>

`500`

</td></tr>
</tbody></table>

# WaitForOptions interface

Source: https://pptr.dev/api/puppeteer.waitforoptions

### Signature

```typescript
export interface WaitForOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal object that allows you to cancel the call.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum wait time in milliseconds. Pass 0 to disable the timeout.

The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) or [Page.setDefaultNavigationTimeout()](./puppeteer.page.setdefaultnavigationtimeout.md) methods.

</td><td>

`30000`

</td></tr>
<tr><td>

<span id="waituntil">waitUntil</span>

</td><td>

`optional`

</td><td>

[PuppeteerLifeCycleEvent](./puppeteer.puppeteerlifecycleevent.md) \| [PuppeteerLifeCycleEvent](./puppeteer.puppeteerlifecycleevent.md)\[\]

</td><td>

When to consider waiting succeeds. Given an array of event strings, waiting is considered to be successful after all events have been fired.

</td><td>

`'load'`

</td></tr>
</tbody></table>

# WaitForSelectorOptions interface

Source: https://pptr.dev/api/puppeteer.waitforselectoroptions

### Signature

```typescript
export interface WaitForSelectorOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="hidden">hidden</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Wait for the selected element to not be found in the DOM or to be hidden. See [ElementHandle.isHidden()](./puppeteer.elementhandle.ishidden.md) for the definition of element invisibility.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal object that allows you to cancel a waitForSelector call.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum time to wait in milliseconds. Pass `0` to disable timeout.

The default value can be changed by using [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md)

</td><td>

`30_000` (30 seconds)

</td></tr>
<tr><td>

<span id="visible">visible</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Wait for the selected element to be present in DOM and to be visible. See [ElementHandle.isVisible()](./puppeteer.elementhandle.isvisible.md) for the definition of element visibility.

</td><td>

`false`

</td></tr>
</tbody></table>

# WaitForTargetOptions interface

Source: https://pptr.dev/api/puppeteer.waitfortargetoptions

### Signature

```typescript
export interface WaitForTargetOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal object that allows you to cancel a waitFor call.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum wait time in milliseconds. Pass `0` to disable the timeout.

</td><td>

`30_000`

</td></tr>
</tbody></table>

# WaitTimeoutOptions interface

Source: https://pptr.dev/api/puppeteer.waittimeoutoptions

### Signature

```typescript
export interface WaitTimeoutOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

A signal object that allows you to cancel a waitFor call.

</td><td>

</td></tr>
<tr><td>

<span id="timeout">timeout</span>

</td><td>

`optional`

</td><td>

number

</td><td>

Maximum wait time in milliseconds. Pass 0 to disable the timeout.

The default value can be changed by using the [Page.setDefaultTimeout()](./puppeteer.page.setdefaulttimeout.md) method.

</td><td>

`30_000`

</td></tr>
</tbody></table>

# WebMCP class

Source: https://pptr.dev/api/puppeteer.webmcp

The experimental WebMCP class provides an API for the WebMCP API.

See the [WebMCP guide](https://pptr.dev/guides/webmcp) for more details.

### Signature

```typescript
export declare class WebMCP extends EventEmitter<{
    toolsadded: WebMCPToolsAddedEvent;
    toolsremoved: WebMCPToolsRemovedEvent;
    toolinvoked: WebMCPToolCall;
    toolresponded: WebMCPToolCallResult;
}>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;&#123; toolsadded: [WebMCPToolsAddedEvent](./puppeteer.webmcptoolsaddedevent.md); toolsremoved: [WebMCPToolsRemovedEvent](./puppeteer.webmcptoolsremovedevent.md); toolinvoked: [WebMCPToolCall](./puppeteer.webmcptoolcall.md); toolresponded: [WebMCPToolCallResult](./puppeteer.webmcptoolcallresult.md); &#125;&gt;

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCP` class.

## Example

```ts
await page.goto('https://www.example.com');
const tools = page.webmcp.tools();
for (const tool of tools) {
	console.log(`Tool found: ${tool.name} - ${tool.description}`);
}
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="tools">[tools()](./puppeteer.webmcp.tools.md)</span>

</td><td>

</td><td>

Gets all WebMCP tools defined by the page.

</td></tr>
</tbody></table>

# WebMCP.tools() method

Source: https://pptr.dev/api/puppeteer.webmcp.tools

Gets all WebMCP tools defined by the page.

### Signature

```typescript
class WebMCP {
	tools(): WebMCPTool[];
}
```

**Returns:**

[WebMCPTool](./puppeteer.webmcptool.md)\[\]

# WebMCPAnnotation interface

Source: https://pptr.dev/api/puppeteer.webmcpannotation

Tool annotations

### Signature

```typescript
export interface WebMCPAnnotation
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="autosubmit">autosubmit</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If the declarative tool was declared with the autosubmit attribute.

</td><td>

</td></tr>
<tr><td>

<span id="readonly">readOnly</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

A hint indicating that the tool does not modify any state.

</td><td>

</td></tr>
<tr><td>

<span id="untrustedcontent">untrustedContent</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

A hint indicating that the tool output may contain untrusted content, ex: UGC, 3rd party data.

</td><td>

</td></tr>
</tbody></table>

# WebMCPInvocationStatus type

Source: https://pptr.dev/api/puppeteer.webmcpinvocationstatus

Represents the status of a tool invocation.

### Signature

```typescript
export type WebMCPInvocationStatus = 'Completed' | 'Canceled' | 'Error';
```

# WebMCPTool.execute() method

Source: https://pptr.dev/api/puppeteer.webmcptool.execute

Executes tool with input parameters, matching tool's `inputSchema`.

### Signature

```typescript
class WebMCPTool {
	execute(input?: object): Promise<WebMCPToolCallResult>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

input

</td><td>

object

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[WebMCPToolCallResult](./puppeteer.webmcptoolcallresult.md)&gt;

# WebMCPTool class

Source: https://pptr.dev/api/puppeteer.webmcptool

Represents a registered WebMCP tool available on the page.

### Signature

```typescript
export declare class WebMCPTool extends EventEmitter<{
    toolinvoked: WebMCPToolCall;
}>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;&#123; toolinvoked: [WebMCPToolCall](./puppeteer.webmcptoolcall.md); &#125;&gt;

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCPTool` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="annotations">annotations</span>

</td><td>

`optional`

</td><td>

[WebMCPAnnotation](./puppeteer.webmcpannotation.md)

</td><td>

Optional annotations for the tool.

</td></tr>
<tr><td>

<span id="description">description</span>

</td><td>

</td><td>

string

</td><td>

Tool description.

</td></tr>
<tr><td>

<span id="formelement">formElement</span>

</td><td>

`readonly`

</td><td>

Promise&lt;[ElementHandle](./puppeteer.elementhandle.md)&lt;HTMLFormElement&gt; \| undefined&gt;

</td><td>

The corresponding ElementHandle when tool was registered via a form.

</td></tr>
<tr><td>

<span id="frame">frame</span>

</td><td>

</td><td>

[Frame](./puppeteer.frame.md)

</td><td>

Frame the tool was defined for.

</td></tr>
<tr><td>

<span id="inputschema">inputSchema</span>

</td><td>

`optional`

</td><td>

object

</td><td>

Schema for the tool's input parameters.

</td></tr>
<tr><td>

<span id="location">location</span>

</td><td>

`optional`

</td><td>

[ConsoleMessageLocation](./puppeteer.consolemessagelocation.md)

</td><td>

Source location that defined the tool (if available).

</td></tr>
<tr><td>

<span id="name">name</span>

</td><td>

</td><td>

string

</td><td>

Tool name.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="execute">[execute(input)](./puppeteer.webmcptool.execute.md)</span>

</td><td>

</td><td>

Executes tool with input parameters, matching tool's `inputSchema`.

</td></tr>
</tbody></table>

# WebMCPToolCall class

Source: https://pptr.dev/api/puppeteer.webmcptoolcall

### Signature

```typescript
export declare class WebMCPToolCall
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebMCPToolCall` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="id">id</span>

</td><td>

</td><td>

string

</td><td>

Tool invocation identifier.

</td></tr>
<tr><td>

<span id="input">input</span>

</td><td>

</td><td>

object

</td><td>

The input parameters used for the call.

</td></tr>
<tr><td>

<span id="tool">tool</span>

</td><td>

</td><td>

[WebMCPTool](./puppeteer.webmcptool.md)

</td><td>

Tool that was called.

</td></tr>
</tbody></table>

# WebMCPToolCallResult interface

Source: https://pptr.dev/api/puppeteer.webmcptoolcallresult

### Signature

```typescript
export interface WebMCPToolCallResult
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="call">call</span>

</td><td>

`optional`

</td><td>

[WebMCPToolCall](./puppeteer.webmcptoolcall.md)

</td><td>

The corresponding tool call if available.

</td><td>

</td></tr>
<tr><td>

<span id="errortext">errorText</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Error text.

</td><td>

</td></tr>
<tr><td>

<span id="exception">exception</span>

</td><td>

`optional`

</td><td>

Protocol.Runtime.RemoteObject

</td><td>

The exception object, if the javascript tool threw an error.

</td><td>

</td></tr>
<tr><td>

<span id="id">id</span>

</td><td>

</td><td>

string

</td><td>

Tool invocation identifier.

</td><td>

</td></tr>
<tr><td>

<span id="output">output</span>

</td><td>

`optional`

</td><td>

any

</td><td>

Output or error delivered as delivered to the agent. Missing if `status` is anything other than Completed.

</td><td>

</td></tr>
<tr><td>

<span id="status">status</span>

</td><td>

</td><td>

[WebMCPInvocationStatus](./puppeteer.webmcpinvocationstatus.md)

</td><td>

Status of the invocation.

</td><td>

</td></tr>
</tbody></table>

# WebMCPToolsAddedEvent interface

Source: https://pptr.dev/api/puppeteer.webmcptoolsaddedevent

### Signature

```typescript
export interface WebMCPToolsAddedEvent
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="tools">tools</span>

</td><td>

</td><td>

[WebMCPTool](./puppeteer.webmcptool.md)\[\]

</td><td>

Array of tools that were added.

</td><td>

</td></tr>
</tbody></table>

# WebMCPToolsRemovedEvent interface

Source: https://pptr.dev/api/puppeteer.webmcptoolsremovedevent

### Signature

```typescript
export interface WebMCPToolsRemovedEvent
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="tools">tools</span>

</td><td>

</td><td>

[WebMCPTool](./puppeteer.webmcptool.md)\[\]

</td><td>

Array of tools that were removed.

</td><td>

</td></tr>
</tbody></table>

# WebWorker.close() method

Source: https://pptr.dev/api/puppeteer.webworker.close

### Signature

```typescript
class WebWorker {
	close(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# WebWorker.evaluate() method

Source: https://pptr.dev/api/puppeteer.webworker.evaluate

Evaluates a given function in the [worker](./puppeteer.webworker.md).

### Signature

```typescript
class WebWorker {
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(func: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

func

</td><td>

Func \| string

</td><td>

Function to be evaluated.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to pass into `func`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;

The result of `func`.

## Remarks

If the given function returns a promise, [evaluate](./puppeteer.webworker.evaluate.md) will wait for the promise to resolve.

As a rule of thumb, if the return value of the given function is more complicated than a JSON object (e.g. most classes), then [evaluate](./puppeteer.webworker.evaluate.md) will \_likely\_ return some truncated value (or `{}`). This is because we are not returning the actual return value, but a deserialized version as a result of transferring the return value through a protocol to Puppeteer.

In general, you should use [evaluateHandle](./puppeteer.webworker.evaluatehandle.md) if [evaluate](./puppeteer.webworker.evaluate.md) cannot serialize the return value properly or you need a mutable [handle](./puppeteer.jshandle.md) to the return object.

# WebWorker.evaluateHandle() method

Source: https://pptr.dev/api/puppeteer.webworker.evaluatehandle

Evaluates a given function in the [worker](./puppeteer.webworker.md).

### Signature

```typescript
class WebWorker {
	evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(func: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

func

</td><td>

Func \| string

</td><td>

Function to be evaluated.

</td></tr>
<tr><td>

args

</td><td>

Params

</td><td>

Arguments to pass into `func`.

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[HandleFor](./puppeteer.handlefor.md)&lt;Awaited&lt;ReturnType&lt;Func&gt;&gt;&gt;&gt;

A [handle](./puppeteer.jshandle.md) to the return value of `func`.

## Remarks

If the given function returns a promise, [evaluate](./puppeteer.webworker.evaluate.md) will wait for the promise to resolve.

In general, you should use [evaluateHandle](./puppeteer.webworker.evaluatehandle.md) if [evaluate](./puppeteer.webworker.evaluate.md) cannot serialize the return value properly or you need a mutable [handle](./puppeteer.jshandle.md) to the return object.

# WebWorker class

Source: https://pptr.dev/api/puppeteer.webworker

This class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

### Signature

```typescript
export declare abstract class WebWorker extends EventEmitter<WebWorkerEvents>
```

**Extends:** [EventEmitter](./puppeteer.eventemitter.md)&lt;[WebWorkerEvents](./puppeteer.webworkerevents.md)&gt;

## Remarks

The events `workercreated` and `workerdestroyed` are emitted on the page object to signal the worker lifecycle.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `WebWorker` class.

## Example

```ts
page.on('workercreated', (worker) => console.log('Worker created: ' + worker.url()));
page.on('workerdestroyed', (worker) => console.log('Worker destroyed: ' + worker.url()));

console.log('Current workers:');
for (const worker of page.workers()) {
	console.log('  ' + worker.url());
}
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="client">client</span>

</td><td>

`readonly`

</td><td>

[CDPSession](./puppeteer.cdpsession.md)

</td><td>

The CDP session client the WebWorker belongs to.

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="close">[close()](./puppeteer.webworker.close.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="evaluate">[evaluate(func, args)](./puppeteer.webworker.evaluate.md)</span>

</td><td>

</td><td>

Evaluates a given function in the [worker](./puppeteer.webworker.md).

**Remarks:**

If the given function returns a promise, [evaluate](./puppeteer.webworker.evaluate.md) will wait for the promise to resolve.

As a rule of thumb, if the return value of the given function is more complicated than a JSON object (e.g. most classes), then [evaluate](./puppeteer.webworker.evaluate.md) will \_likely\_ return some truncated value (or `{}`). This is because we are not returning the actual return value, but a deserialized version as a result of transferring the return value through a protocol to Puppeteer.

In general, you should use [evaluateHandle](./puppeteer.webworker.evaluatehandle.md) if [evaluate](./puppeteer.webworker.evaluate.md) cannot serialize the return value properly or you need a mutable [handle](./puppeteer.jshandle.md) to the return object.

</td></tr>
<tr><td>

<span id="evaluatehandle">[evaluateHandle(func, args)](./puppeteer.webworker.evaluatehandle.md)</span>

</td><td>

</td><td>

Evaluates a given function in the [worker](./puppeteer.webworker.md).

**Remarks:**

If the given function returns a promise, [evaluate](./puppeteer.webworker.evaluate.md) will wait for the promise to resolve.

In general, you should use [evaluateHandle](./puppeteer.webworker.evaluatehandle.md) if [evaluate](./puppeteer.webworker.evaluate.md) cannot serialize the return value properly or you need a mutable [handle](./puppeteer.jshandle.md) to the return object.

</td></tr>
<tr><td>

<span id="url">[url()](./puppeteer.webworker.url.md)</span>

</td><td>

</td><td>

The URL of this web worker.

</td></tr>
</tbody></table>

# WebWorker.url() method

Source: https://pptr.dev/api/puppeteer.webworker.url

The URL of this web worker.

### Signature

```typescript
class WebWorker {
	url(): string;
}
```

**Returns:**

string

# WebWorkerEvent enum

Source: https://pptr.dev/api/puppeteer.webworkerevent

### Signature

```typescript
export declare enum WebWorkerEvent
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

Console

</td><td>

`"console"`

</td><td>

Emitted when the worker calls a console API.

</td></tr>
<tr><td>

Error

</td><td>

`"error"`

</td><td>

Emitted when the worker throws an exception.

</td></tr>
</tbody></table>

# WebWorkerEvents interface

Source: https://pptr.dev/api/puppeteer.webworkerevents

### Signature

```typescript
export interface WebWorkerEvents extends Record<EventType, unknown>
```

**Extends:** Record&lt;[EventType](./puppeteer.eventtype.md), unknown&gt;

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="console">console</span>

</td><td>

</td><td>

[ConsoleMessage](./puppeteer.consolemessage.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="error">error</span>

</td><td>

</td><td>

Error

</td><td>

</td><td>

</td></tr>
</tbody></table>

# WindowBounds interface

Source: https://pptr.dev/api/puppeteer.windowbounds

### Signature

```typescript
export interface WindowBounds
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="height">height</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="left">left</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="top">top</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="width">width</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="windowstate">windowState</span>

</td><td>

`optional`

</td><td>

[WindowState](./puppeteer.windowstate.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# WindowId type

Source: https://pptr.dev/api/puppeteer.windowid

### Signature

```typescript
export type WindowId = string;
```

# WindowState type

Source: https://pptr.dev/api/puppeteer.windowstate

### Signature

```typescript
export type WindowState = 'normal' | 'minimized' | 'maximized' | 'fullscreen';
```

# WorkAreaInsets interface

Source: https://pptr.dev/api/puppeteer.workareainsets

### Signature

```typescript
export interface WorkAreaInsets
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="bottom">bottom</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="left">left</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="right">right</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="top">top</span>

</td><td>

`optional`

</td><td>

number

</td><td>

</td><td>

</td></tr>
</tbody></table>

# @puppeteer/browsers

Source: https://pptr.dev/browsers-api

Manage and launch browsers/drivers from a CLI or programmatically.

## System requirements

- A compatible Node version (see `engines` in `package.json`).
- For Firefox downloads:
    - Linux builds: `xz` and `bzip2` utilities are required to unpack `.tar.gz` and `.tar.bz2` archives.
    - MacOS builds: `hdiutil` is required to unpack `.dmg` archives.

## CLI

Use `npx` to run the CLI:

```bash
# This will install and run the @puppeteer/browsers package.
# If it is already installed in the current directory, the installed
# version will be used.
npx @puppeteer/browsers --help
```

Built-in per-command `help` will provide all documentation you need to use the CLI.

```bash
npx @puppeteer/browsers --help # help for all commands
npx @puppeteer/browsers install --help # help for the install command
npx @puppeteer/browsers launch --help # help for the launch command
npx @puppeteer/browsers clear --help # help for the clear command
npx @puppeteer/browsers list --help # help for the list command
```

You can specify the version of the `@puppeteer/browsers` when using
`npx`:

```bash
# Always install and use the latest version from the registry.
npx @puppeteer/browsers@latest --help
# Always use a specifc version.
npx @puppeteer/browsers@2.4.1 --help
# Always install the latest version and automatically confirm the installation.
npx --yes @puppeteer/browsers@latest --help
```

To clear all installed browsers, use the `clear` command:

```bash
npx @puppeteer/browsers clear
```

To list all installed browsers, use the `list` command:

```bash
npx @puppeteer/browsers list
```

Some example to give an idea of what the CLI looks like (use the `--help` command for more examples):

```sh
# Download the latest available Chrome for Testing binary corresponding to the Stable channel.
npx @puppeteer/browsers install chrome@stable

# Download a specific Chrome for Testing version.
npx @puppeteer/browsers install chrome@116.0.5793.0

# Download the latest Chrome for Testing version for the given milestone.
npx @puppeteer/browsers install chrome@117

# Download the latest available ChromeDriver version corresponding to the Canary channel.
npx @puppeteer/browsers install chromedriver@canary

# Download a specific ChromeDriver version.
npx @puppeteer/browsers install chromedriver@116.0.5793.0

# On Ubuntu/Debian and only for Chrome, install the browser and required system dependencies.
# If the browser version has already been installed, the command
# will still attempt to install system dependencies.
# Requires root privileges.
npx puppeteer browsers install chrome --install-deps
```

## Known limitations

1. Launching the system browsers is only possible for Chrome/Chromium.

## Custom Providers

You can implement custom browser providers to download from alternative sources like corporate mirrors, private repositories, or specialized browser builds.

```typescript
import { BrowserProvider, DownloadOptions, Browser, BrowserPlatform } from '@puppeteer/browsers';

class SimpleMirrorProvider implements BrowserProvider {
	constructor(private mirrorUrl: string) {}

	supports(options: DownloadOptions): boolean {
		return options.browser === Browser.CHROME;
	}

	getDownloadUrl(options: DownloadOptions): URL | null {
		const { buildId, platform } = options;
		const filenameMap = {
			[BrowserPlatform.LINUX]: 'chrome-linux64.zip',
			[BrowserPlatform.MAC]: 'chrome-mac-x64.zip',
			[BrowserPlatform.MAC_ARM]: 'chrome-mac-arm64.zip',
			[BrowserPlatform.WIN32]: 'chrome-win32.zip',
			[BrowserPlatform.WIN64]: 'chrome-win64.zip',
		};
		const filename = filenameMap[platform];
		if (!filename) return null;
		return new URL(`${this.mirrorUrl}/chrome/${buildId}/${filename}`);
	}

	getExecutablePath(options: DownloadOptions): string {
		const { platform } = options;
		if (platform === BrowserPlatform.MAC || platform === BrowserPlatform.MAC_ARM) {
			return 'chrome-mac/Chromium.app/Contents/MacOS/Chromium';
		} else if (platform === BrowserPlatform.LINUX) {
			return 'chrome-linux64/chrome';
		} else if (platform.includes('win')) {
			return 'chrome-win64/chrome.exe';
		}
		throw new Error(`Unsupported platform: ${platform}`);
	}
}
```

Use with the `install` API:

```typescript
import { install } from '@puppeteer/browsers';

const customProvider = new SimpleMirrorProvider('https://internal.company.com');

await install({
	browser: Browser.CHROME,
	buildId: '120.0.6099.109',
	platform: BrowserPlatform.LINUX,
	cacheDir: '/tmp/puppeteer-cache',
	providers: [customProvider],
});
```

Multiple providers can be chained - they're tried in order until one succeeds, with a default provider such as Chrome for Testing, as an automatic fallback.

:::caution
Custom providers are NOT officially supported by Puppeteer. You accept full responsibility for binary compatibility, testing, and maintenance.
:::

## API

The programmatic API allows installing and launching browsers from your code. See the `test` folder for examples on how to use the `install`, `canInstall`, `launch`, `computeExecutablePath`, `computeSystemExecutablePath` and other methods.

## Classes

<table><thead><tr><th>

Class

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="cli">[CLI](./browsers.cli.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="defaultprovider">[DefaultProvider](./browsers.defaultprovider.md)</span>

</td><td>

Default provider implementation that uses default sources. This is the standard provider used by Puppeteer.

</td></tr>
<tr><td>

<span id="installedbrowser">[InstalledBrowser](./browsers.installedbrowser.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `InstalledBrowser` class.

</td></tr>
<tr><td>

<span id="process">[Process](./browsers.process.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="timeouterror">[TimeoutError](./browsers.timeouterror.md)</span>

</td><td>

**Remarks:**

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `TimeoutError` class.

</td></tr>
</tbody></table>

## Enumerations

<table><thead><tr><th>

Enumeration

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="browser">[Browser](./browsers.browser.md)</span>

</td><td>

Supported browsers.

</td></tr>
<tr><td>

<span id="browserplatform">[BrowserPlatform](./browsers.browserplatform.md)</span>

</td><td>

Platform names used to identify a OS platform x architecture combination in the way that is relevant for the browser download.

</td></tr>
<tr><td>

<span id="browsertag">[BrowserTag](./browsers.browsertag.md)</span>

</td><td>

Enum describing a release channel for a browser.

You can use this in combination with [resolveBuildId()](./browsers.resolvebuildid.md) to resolve a build ID based on a release channel.

</td></tr>
<tr><td>

<span id="chromereleasechannel">[ChromeReleaseChannel](./browsers.chromereleasechannel.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Functions

<table><thead><tr><th>

Function

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="buildarchivefilename">[buildArchiveFilename(browser, platform, buildId, extension)](./browsers.buildarchivefilename.md)</span>

</td><td>

Utility function to build a standard archive filename.

</td></tr>
<tr><td>

<span id="candownload">[canDownload(options)](./browsers.candownload.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="computeexecutablepath">[computeExecutablePath(options)](./browsers.computeexecutablepath.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="computesystemexecutablepath">[computeSystemExecutablePath(options)](./browsers.computesystemexecutablepath.md)</span>

</td><td>

Returns a path to a system-wide Chrome installation given a release channel name by checking known installation locations (using [https://pptr.dev/browsers-api/browsers.computesystemexecutablepath](https://pptr.dev/browsers-api/browsers.computesystemexecutablepath)). If Chrome instance is not found at the expected path, an error is thrown.

</td></tr>
<tr><td>

<span id="createprofile">[createProfile(browser, opts)](./browsers.createprofile.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="detectbrowserplatform">[detectBrowserPlatform()](./browsers.detectbrowserplatform.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="getdownloadurl">[getDownloadUrl(browser, platform, buildId, baseUrl)](./browsers.getdownloadurl.md)</span>

</td><td>

Retrieves a URL for downloading the binary archive of a given browser.

The archive is bound to the specific platform and build ID specified.

</td></tr>
<tr><td>

<span id="getinstalledbrowsers">[getInstalledBrowsers(options)](./browsers.getinstalledbrowsers.md)</span>

</td><td>

Returns metadata about browsers installed in the cache directory.

</td></tr>
<tr><td>

<span id="getversioncomparator">[getVersionComparator(browser)](./browsers.getversioncomparator.md)</span>

</td><td>

Returns a version comparator for the given browser that can be used to sort browser versions.

</td></tr>
<tr><td>

<span id="install">[install(options)](./browsers.install.md)</span>

</td><td>

Downloads and unpacks the browser archive according to the [InstallOptions](./browsers.installoptions.md).

</td></tr>
<tr><td>

<span id="install">[install(options)](./browsers.install.md#overload-2)</span>

</td><td>

Downloads the browser archive according to the [InstallOptions](./browsers.installoptions.md) without unpacking.

</td></tr>
<tr><td>

<span id="launch">[launch(opts)](./browsers.launch.md)</span>

</td><td>

Launches a browser process according to [LaunchOptions](./browsers.launchoptions.md).

</td></tr>
<tr><td>

<span id="makeprogresscallback">[makeProgressCallback(browser, buildId)](./browsers.makeprogresscallback.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="resolvebuildid">[resolveBuildId(browser, platform, tag)](./browsers.resolvebuildid.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="resolvedefaultuserdatadir">[resolveDefaultUserDataDir(browser, platform, channel)](./browsers.resolvedefaultuserdatadir.md)</span>

</td><td>

Returns the expected default user data dir for the given channel. It does not check if the dir actually exists.

</td></tr>
<tr><td>

<span id="uninstall">[uninstall(options)](./browsers.uninstall.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Interfaces

<table><thead><tr><th>

Interface

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="browserprovider">[BrowserProvider](./browsers.browserprovider.md)</span>

</td><td>

Interface for custom browser provider implementations. Allows users to implement alternative download sources for browsers.

⚠️ **IMPORTANT**: Custom providers are NOT officially supported by Puppeteer.

By implementing this interface, you accept full responsibility for:

- Ensuring downloaded binaries are compatible with Puppeteer's expectations - Testing that browser launch and other features work with your binaries - Maintaining compatibility when Puppeteer or your download source changes - Version consistency across platforms if mixing sources

Puppeteer only tests and guarantees Chrome for Testing binaries.

</td></tr>
<tr><td>

<span id="downloadoptions">[DownloadOptions](./browsers.downloadoptions.md)</span>

</td><td>

Options passed to a provider.

</td></tr>
<tr><td>

<span id="getinstalledbrowsersoptions">[GetInstalledBrowsersOptions](./browsers.getinstalledbrowsersoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="installoptions">[InstallOptions](./browsers.installoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="launchoptions">[LaunchOptions](./browsers.launchoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="metadata">[Metadata](./browsers.metadata.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="options">[Options](./browsers.options.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="profileoptions">[ProfileOptions](./browsers.profileoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="systemoptions">[SystemOptions](./browsers.systemoptions.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="uninstalloptions">[UninstallOptions](./browsers.uninstalloptions.md)</span>

</td><td>

</td></tr>
</tbody></table>

## Variables

<table><thead><tr><th>

Variable

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="cdp_websocket_endpoint_regex">[CDP_WEBSOCKET_ENDPOINT_REGEX](./browsers.cdp_websocket_endpoint_regex.md)</span>

</td><td>

</td></tr>
<tr><td>

<span id="webdriver_bidi_websocket_endpoint_regex">[WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX](./browsers.webdriver_bidi_websocket_endpoint_regex.md)</span>

</td><td>

</td></tr>
</tbody></table>

# Browser enum

Source: https://pptr.dev/browsers-api/browsers.browser

Supported browsers.

### Signature

```typescript
export declare enum Browser
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

CHROME

</td><td>

`"chrome"`

</td><td>

</td></tr>
<tr><td>

CHROMEDRIVER

</td><td>

`"chromedriver"`

</td><td>

</td></tr>
<tr><td>

CHROMEHEADLESSSHELL

</td><td>

`"chrome-headless-shell"`

</td><td>

</td></tr>
<tr><td>

CHROMIUM

</td><td>

`"chromium"`

</td><td>

</td></tr>
<tr><td>

FIREFOX

</td><td>

`"firefox"`

</td><td>

</td></tr>
</tbody></table>

# BrowserPlatform enum

Source: https://pptr.dev/browsers-api/browsers.browserplatform

Platform names used to identify a OS platform x architecture combination in the way that is relevant for the browser download.

### Signature

```typescript
export declare enum BrowserPlatform
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

LINUX

</td><td>

`"linux"`

</td><td>

</td></tr>
<tr><td>

LINUX_ARM

</td><td>

`"linux_arm"`

</td><td>

</td></tr>
<tr><td>

MAC

</td><td>

`"mac"`

</td><td>

</td></tr>
<tr><td>

MAC_ARM

</td><td>

`"mac_arm"`

</td><td>

</td></tr>
<tr><td>

WIN32

</td><td>

`"win32"`

</td><td>

</td></tr>
<tr><td>

WIN64

</td><td>

`"win64"`

</td><td>

</td></tr>
</tbody></table>

# BrowserProvider.getDownloadUrl() method

Source: https://pptr.dev/browsers-api/browsers.browserprovider.getdownloadurl

Get the download URL for the requested browser.

The buildId can be either an exact version (e.g., "131.0.6778.109") or an alias (e.g., "latest", "stable"). Custom providers should handle version resolution internally if they support aliases.

Returns null if the buildId cannot be resolved to a valid version. The URL is not validated - download will fail later if URL doesn't exist.

Can be synchronous for simple URL construction or asynchronous if version resolution/network requests are needed.

### Signature

```typescript
interface BrowserProvider {
	getDownloadUrl(options: DownloadOptions): Promise<URL | null> | URL | null;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[DownloadOptions](./browsers.downloadoptions.md)

</td><td>

Download options (buildId may be alias or exact version)

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;URL \| null&gt; \| URL \| null

Download URL, or null if version cannot be resolved

## Example

```ts
// Synchronous example
getDownloadUrl(options) {
  const platform = mapPlatform(options.platform);
  return new URL(`https://releases.example.com/v${options.buildId}/${platform}.zip`);
}

// Asynchronous example with version mapping
async getDownloadUrl(options) {
  const electronVersion = await resolveElectronVersion(options.buildId);
  if (!electronVersion) return null;

  const platform = mapPlatform(options.platform);
  return new URL(`https://github.com/electron/electron/releases/download/v${electronVersion}/${platform}.zip`);
}
```

# BrowserProvider.getExecutablePath() method

Source: https://pptr.dev/browsers-api/browsers.browserprovider.getexecutablepath

Get the relative path to the executable within the extracted archive.

### Signature

```typescript
interface BrowserProvider {
	getExecutablePath(options: { browser: Browser; buildId: string; platform: BrowserPlatform }): Promise<string> | string;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; browser: [Browser](./browsers.browser.md); buildId: string; platform: [BrowserPlatform](./browsers.browserplatform.md); &#125;

</td><td>

Browser, buildId, and platform

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt; \| string

Relative path to the executable

## Example

```ts
// Electron uses simple structure
getExecutablePath() {
  return 'chromedriver/chromedriver';
}

// Custom provider with platform-specific paths
getExecutablePath(options) {
  return `binaries/${options.browser}-${options.platform}`;
}
```

# BrowserProvider.getName() method

Source: https://pptr.dev/browsers-api/browsers.browserprovider.getname

Get the name of this provider. Used for error messages and logging purposes.

### Signature

```typescript
interface BrowserProvider {
	getName(): string;
}
```

**Returns:**

string

The provider name (e.g., "DefaultProvider", "CustomProvider")

## Remarks

This method is used instead of `constructor.name` to avoid issues with minification in production builds.

## Example

```ts
getName() {
  return 'MyCustomProvider';
}
```

# BrowserProvider interface

Source: https://pptr.dev/browsers-api/browsers.browserprovider

Interface for custom browser provider implementations. Allows users to implement alternative download sources for browsers.

⚠️ **IMPORTANT**: Custom providers are NOT officially supported by Puppeteer.

By implementing this interface, you accept full responsibility for:

- Ensuring downloaded binaries are compatible with Puppeteer's expectations - Testing that browser launch and other features work with your binaries - Maintaining compatibility when Puppeteer or your download source changes - Version consistency across platforms if mixing sources

Puppeteer only tests and guarantees Chrome for Testing binaries.

### Signature

```typescript
export interface BrowserProvider
```

## Example

```typescript
class ElectronDownloader implements BrowserProvider {
	supports(options: DownloadOptions): boolean {
		return options.browser === Browser.CHROMEDRIVER;
	}

	getDownloadUrl(options: DownloadOptions): URL {
		const platform = mapToPlatform(options.platform);
		return new URL(`v${options.buildId}/chromedriver-v${options.buildId}-${platform}.zip`, 'https://github.com/electron/electron/releases/download/');
	}

	getExecutablePath(options): string {
		const ext = options.platform.includes('win') ? '.exe' : '';
		return `chromedriver/chromedriver${ext}`;
	}
}
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="getdownloadurl">[getDownloadUrl(options)](./browsers.browserprovider.getdownloadurl.md)</span>

</td><td>

Get the download URL for the requested browser.

The buildId can be either an exact version (e.g., "131.0.6778.109") or an alias (e.g., "latest", "stable"). Custom providers should handle version resolution internally if they support aliases.

Returns null if the buildId cannot be resolved to a valid version. The URL is not validated - download will fail later if URL doesn't exist.

Can be synchronous for simple URL construction or asynchronous if version resolution/network requests are needed.

</td></tr>
<tr><td>

<span id="getexecutablepath">[getExecutablePath(options)](./browsers.browserprovider.getexecutablepath.md)</span>

</td><td>

Get the relative path to the executable within the extracted archive.

</td></tr>
<tr><td>

<span id="getname">[getName()](./browsers.browserprovider.getname.md)</span>

</td><td>

Get the name of this provider. Used for error messages and logging purposes.

**Remarks:**

This method is used instead of `constructor.name` to avoid issues with minification in production builds.

</td></tr>
<tr><td>

<span id="supports">[supports(options)](./browsers.browserprovider.supports.md)</span>

</td><td>

Check if this provider supports the given browser/platform. Used for filtering before attempting downloads.

Can be synchronous for quick checks or asynchronous if version resolution/network requests are needed.

</td></tr>
</tbody></table>

# BrowserProvider.supports() method

Source: https://pptr.dev/browsers-api/browsers.browserprovider.supports

Check if this provider supports the given browser/platform. Used for filtering before attempting downloads.

Can be synchronous for quick checks or asynchronous if version resolution/network requests are needed.

### Signature

```typescript
interface BrowserProvider {
	supports(options: DownloadOptions): Promise<boolean> | boolean;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[DownloadOptions](./browsers.downloadoptions.md)

</td><td>

Download options to check

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;boolean&gt; \| boolean

True if this provider supports the browser/platform combination

# BrowserTag enum

Source: https://pptr.dev/browsers-api/browsers.browsertag

Enum describing a release channel for a browser.

You can use this in combination with [resolveBuildId()](./browsers.resolvebuildid.md) to resolve a build ID based on a release channel.

### Signature

```typescript
export declare enum BrowserTag
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

BETA

</td><td>

`"beta"`

</td><td>

</td></tr>
<tr><td>

CANARY

</td><td>

`"canary"`

</td><td>

</td></tr>
<tr><td>

DEV

</td><td>

`"dev"`

</td><td>

</td></tr>
<tr><td>

DEVEDITION

</td><td>

`"devedition"`

</td><td>

</td></tr>
<tr><td>

ESR

</td><td>

`"esr"`

</td><td>

</td></tr>
<tr><td>

LATEST

</td><td>

`"latest"`

</td><td>

</td></tr>
<tr><td>

NIGHTLY

</td><td>

`"nightly"`

</td><td>

</td></tr>
<tr><td>

STABLE

</td><td>

`"stable"`

</td><td>

</td></tr>
</tbody></table>

# buildArchiveFilename() function

Source: https://pptr.dev/browsers-api/browsers.buildarchivefilename

Utility function to build a standard archive filename.

### Signature

```typescript
export declare function buildArchiveFilename(browser: Browser, platform: BrowserPlatform, buildId: string, extension?: string): string;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

platform

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td></tr>
<tr><td>

buildId

</td><td>

string

</td><td>

</td></tr>
<tr><td>

extension

</td><td>

string

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

string

# canDownload() function

Source: https://pptr.dev/browsers-api/browsers.candownload

### Signature

```typescript
export declare function canDownload(options: InstallOptions): Promise<boolean>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[InstallOptions](./browsers.installoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;boolean&gt;

# CDP_WEBSOCKET_ENDPOINT_REGEX variable

Source: https://pptr.dev/browsers-api/browsers.cdp_websocket_endpoint_regex

### Signature

```typescript
CDP_WEBSOCKET_ENDPOINT_REGEX: RegExp;
```

# ChromeReleaseChannel enum

Source: https://pptr.dev/browsers-api/browsers.chromereleasechannel

### Signature

```typescript
export declare enum ChromeReleaseChannel
```

## Enumeration Members

<table><thead><tr><th>

Member

</th><th>

Value

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

BETA

</td><td>

`"beta"`

</td><td>

</td></tr>
<tr><td>

CANARY

</td><td>

`"canary"`

</td><td>

</td></tr>
<tr><td>

DEV

</td><td>

`"dev"`

</td><td>

</td></tr>
<tr><td>

STABLE

</td><td>

`"stable"`

</td><td>

</td></tr>
</tbody></table>

# CLI.(constructor)

Source: https://pptr.dev/browsers-api/browsers.cli._constructor_

Constructs a new instance of the `CLI` class

### Signature

```typescript
class CLI {
	constructor(
		opts?:
			| string
			| {
					cachePath?: string;
					scriptName?: string;
					version?: string;
					prefixCommand?: {
						cmd: string;
						description: string;
					};
					allowCachePathOverride?: boolean;
					pinnedBrowsers?: Partial<
						Record<
							Browser,
							{
								buildId: string;
								skipDownload: boolean;
							}
						>
					>;
			  },
		rl?: readline.Interface,
	);
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

opts

</td><td>

string \| &#123; cachePath?: string; scriptName?: string; version?: string; prefixCommand?: &#123; cmd: string; description: string; &#125;; allowCachePathOverride?: boolean; pinnedBrowsers?: Partial&lt;Record&lt;[Browser](./browsers.browser.md), &#123; buildId: string; skipDownload: boolean; &#125;&gt;&gt;; &#125;

</td><td>

_(Optional)_

</td></tr>
<tr><td>

rl

</td><td>

readline.Interface

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

# CLI class

Source: https://pptr.dev/browsers-api/browsers.cli

### Signature

```typescript
export declare class CLI
```

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_constructor_">[(constructor)(opts, rl)](./browsers.cli._constructor_.md)</span>

</td><td>

</td><td>

Constructs a new instance of the `CLI` class

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="run">[run(argv)](./browsers.cli.run.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# CLI.run() method

Source: https://pptr.dev/browsers-api/browsers.cli.run

### Signature

```typescript
class CLI {
	run(argv: string[]): Promise<void>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

argv

</td><td>

string\[\]

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# computeExecutablePath() function

Source: https://pptr.dev/browsers-api/browsers.computeexecutablepath

### Signature

```typescript
export declare function computeExecutablePath(options: ComputeExecutablePathOptions): string;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[ComputeExecutablePathOptions](./browsers.options.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

# computeSystemExecutablePath() function

Source: https://pptr.dev/browsers-api/browsers.computesystemexecutablepath

Returns a path to a system-wide Chrome installation given a release channel name by checking known installation locations (using [https://pptr.dev/browsers-api/browsers.computesystemexecutablepath](https://pptr.dev/browsers-api/browsers.computesystemexecutablepath)). If Chrome instance is not found at the expected path, an error is thrown.

### Signature

```typescript
export declare function computeSystemExecutablePath(options: SystemOptions): string;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[SystemOptions](./browsers.systemoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

# createProfile() function

Source: https://pptr.dev/browsers-api/browsers.createprofile

### Signature

```typescript
export declare function createProfile(browser: Browser, opts: ProfileOptions): Promise<void>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

opts

</td><td>

[ProfileOptions](./browsers.profileoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# DefaultProvider.(constructor)

Source: https://pptr.dev/browsers-api/browsers.defaultprovider._constructor_

Constructs a new instance of the `DefaultProvider` class

### Signature

```typescript
class DefaultProvider {
	constructor(baseUrl?: string);
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

baseUrl

</td><td>

string

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

# DefaultProvider.getDownloadUrl() method

Source: https://pptr.dev/browsers-api/browsers.defaultprovider.getdownloadurl

### Signature

```typescript
class DefaultProvider {
	getDownloadUrl(options: DownloadOptions): URL;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[DownloadOptions](./browsers.downloadoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

URL

# DefaultProvider.getExecutablePath() method

Source: https://pptr.dev/browsers-api/browsers.defaultprovider.getexecutablepath

### Signature

```typescript
class DefaultProvider {
	getExecutablePath(options: { browser: Browser; buildId: string; platform: BrowserPlatform }): string;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

&#123; browser: [Browser](./browsers.browser.md); buildId: string; platform: [BrowserPlatform](./browsers.browserplatform.md); &#125;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

# DefaultProvider.getName() method

Source: https://pptr.dev/browsers-api/browsers.defaultprovider.getname

### Signature

```typescript
class DefaultProvider {
	getName(): string;
}
```

**Returns:**

string

# DefaultProvider class

Source: https://pptr.dev/browsers-api/browsers.defaultprovider

Default provider implementation that uses default sources. This is the standard provider used by Puppeteer.

### Signature

```typescript
export declare class DefaultProvider implements BrowserProvider
```

**Implements:** [BrowserProvider](./browsers.browserprovider.md)

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_constructor_">[(constructor)(baseUrl)](./browsers.defaultprovider._constructor_.md)</span>

</td><td>

</td><td>

Constructs a new instance of the `DefaultProvider` class

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="getdownloadurl">[getDownloadUrl(options)](./browsers.defaultprovider.getdownloadurl.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="getexecutablepath">[getExecutablePath(options)](./browsers.defaultprovider.getexecutablepath.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="getname">[getName()](./browsers.defaultprovider.getname.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="supports">[supports(\_options)](./browsers.defaultprovider.supports.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# DefaultProvider.supports() method

Source: https://pptr.dev/browsers-api/browsers.defaultprovider.supports

### Signature

```typescript
class DefaultProvider {
	supports(_options: DownloadOptions): boolean;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

\_options

</td><td>

[DownloadOptions](./browsers.downloadoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

boolean

# detectBrowserPlatform() function

Source: https://pptr.dev/browsers-api/browsers.detectbrowserplatform

### Signature

```typescript
export declare function detectBrowserPlatform(): BrowserPlatform | undefined;
```

**Returns:**

[BrowserPlatform](./browsers.browserplatform.md) \| undefined

# DownloadOptions interface

Source: https://pptr.dev/browsers-api/browsers.downloadoptions

Options passed to a provider.

### Signature

```typescript
export interface DownloadOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="buildid">buildId</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td><td>

</td></tr>
</tbody></table>

# getDownloadUrl() function

Source: https://pptr.dev/browsers-api/browsers.getdownloadurl

Retrieves a URL for downloading the binary archive of a given browser.

The archive is bound to the specific platform and build ID specified.

### Signature

```typescript
export declare function getDownloadUrl(browser: Browser, platform: BrowserPlatform, buildId: string, baseUrl?: string): URL;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

platform

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td></tr>
<tr><td>

buildId

</td><td>

string

</td><td>

</td></tr>
<tr><td>

baseUrl

</td><td>

string

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

URL

# getInstalledBrowsers() function

Source: https://pptr.dev/browsers-api/browsers.getinstalledbrowsers

Returns metadata about browsers installed in the cache directory.

### Signature

```typescript
export declare function getInstalledBrowsers(options: GetInstalledBrowsersOptions): Promise<InstalledBrowser[]>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[GetInstalledBrowsersOptions](./browsers.getinstalledbrowsersoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[InstalledBrowser](./browsers.installedbrowser.md)\[\]&gt;

# GetInstalledBrowsersOptions interface

Source: https://pptr.dev/browsers-api/browsers.getinstalledbrowsersoptions

### Signature

```typescript
export interface GetInstalledBrowsersOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="cachedir">cacheDir</span>

</td><td>

</td><td>

string

</td><td>

The path to the root of the cache directory.

</td><td>

</td></tr>
</tbody></table>

# getVersionComparator() function

Source: https://pptr.dev/browsers-api/browsers.getversioncomparator

Returns a version comparator for the given browser that can be used to sort browser versions.

### Signature

```typescript
export declare function getVersionComparator(browser: Browser): (a: string, b: string) => number;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

(a: string, b: string) =&gt; number

# install() function

Source: https://pptr.dev/browsers-api/browsers.install

<h2 id="overload-1">install(): Promise&lt;InstalledBrowser&gt;</h2>

Downloads and unpacks the browser archive according to the [InstallOptions](./browsers.installoptions.md).

### Signature

```typescript
export declare function install(
	options: InstallOptions & {
		unpack?: true;
	},
): Promise<InstalledBrowser>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[InstallOptions](./browsers.installoptions.md) &amp; &#123; unpack?: true; &#125;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;[InstalledBrowser](./browsers.installedbrowser.md)&gt;

a [InstalledBrowser](./browsers.installedbrowser.md) instance.

<h2 id="overload-2">install(): Promise&lt;string&gt;</h2>

Downloads the browser archive according to the [InstallOptions](./browsers.installoptions.md) without unpacking.

### Signature

```typescript
export declare function install(
	options: InstallOptions & {
		unpack: false;
	},
): Promise<string>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[InstallOptions](./browsers.installoptions.md) &amp; &#123; unpack: false; &#125;

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

the absolute path to the archive.

# InstalledBrowser class

Source: https://pptr.dev/browsers-api/browsers.installedbrowser

### Signature

```typescript
export declare class InstalledBrowser
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `InstalledBrowser` class.

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

<span id="buildid">buildId</span>

</td><td>

</td><td>

string

</td><td>

</td></tr>
<tr><td>

<span id="executablepath">executablePath</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

</td></tr>
<tr><td>

<span id="path">path</span>

</td><td>

`readonly`

</td><td>

string

</td><td>

Path to the root of the installation folder. Use [computeExecutablePath()](./browsers.computeexecutablepath.md) to get the path to the executable binary.

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="readmetadata">[readMetadata()](./browsers.installedbrowser.readmetadata.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="writemetadata">[writeMetadata(metadata)](./browsers.installedbrowser.writemetadata.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# InstalledBrowser.readMetadata() method

Source: https://pptr.dev/browsers-api/browsers.installedbrowser.readmetadata

### Signature

```typescript
class InstalledBrowser {
	readMetadata(): Metadata;
}
```

**Returns:**

[Metadata](./browsers.metadata.md)

# InstalledBrowser.writeMetadata() method

Source: https://pptr.dev/browsers-api/browsers.installedbrowser.writemetadata

### Signature

```typescript
class InstalledBrowser {
	writeMetadata(metadata: Metadata): void;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

metadata

</td><td>

[Metadata](./browsers.metadata.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

void

# InstallOptions interface

Source: https://pptr.dev/browsers-api/browsers.installoptions

### Signature

```typescript
export interface InstallOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="baseurl">baseUrl</span>

</td><td>

`optional`

</td><td>

string

</td><td>

Determines the host that will be used for downloading.

</td><td>

Either

- https://storage.googleapis.com/chrome-for-testing-public or - https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central

</td></tr>
<tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

Determines which browser to install.

</td><td>

</td></tr>
<tr><td>

<span id="buildid">buildId</span>

</td><td>

</td><td>

string

</td><td>

Determines which buildId to download. BuildId should uniquely identify binaries and they are used for caching.

</td><td>

</td></tr>
<tr><td>

<span id="buildidalias">buildIdAlias</span>

</td><td>

`optional`

</td><td>

string

</td><td>

An alias for the provided `buildId`. It will be used to maintain local metadata to support aliases in the `launch` command.

</td><td>

</td></tr>
<tr><td>

<span id="cachedir">cacheDir</span>

</td><td>

</td><td>

string

</td><td>

Determines the path to download browsers to.

</td><td>

</td></tr>
<tr><td>

<span id="downloadprogresscallback">downloadProgressCallback</span>

</td><td>

`optional`

</td><td>

'default' \| ((downloadedBytes: number, totalBytes: number) =&gt; void)

</td><td>

Provides information about the progress of the download. If set to 'default', the default callback implementing a progress bar will be used.

</td><td>

</td></tr>
<tr><td>

<span id="installdeps">installDeps</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to attempt to install system-level dependencies required for the browser.

Only supported for Chrome on Debian or Ubuntu. Requires system-level privileges to run `apt-get`.

</td><td>

`false`

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

`optional`

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

Determines which platform the browser will be suited for.

</td><td>

**Auto-detected.**

</td></tr>
<tr><td>

<span id="providers">providers</span>

</td><td>

`optional`

</td><td>

[BrowserProvider](./browsers.browserprovider.md)\[\]

</td><td>

Custom provider implementation for alternative download sources.

If not provided, uses the default provider. Multiple providers can be chained - they will be tried in order. The default provider is automatically added as the final fallback.

⚠️ **IMPORTANT**: Custom providers are NOT officially supported by Puppeteer.

By using custom providers, you accept full responsibility for:

- **Version compatibility**: Different platforms may receive different binary versions - **Archive compatibility**: Binary structure must match Puppeteer's expectations - **Feature integration**: Browser launch and other Puppeteer features may not work - **Testing**: You must validate that downloaded binaries work with Puppeteer

**Puppeteer only tests and guarantees compatibility with default binaries.**

</td><td>

</td></tr>
<tr><td>

<span id="unpack">unpack</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to unpack and install browser archives.

</td><td>

`true`

</td></tr>
</tbody></table>

# launch() function

Source: https://pptr.dev/browsers-api/browsers.launch

Launches a browser process according to [LaunchOptions](./browsers.launchoptions.md).

### Signature

```typescript
export declare function launch(opts: LaunchOptions): Process;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

opts

</td><td>

[LaunchOptions](./browsers.launchoptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

[Process](./browsers.process.md)

# LaunchOptions interface

Source: https://pptr.dev/browsers-api/browsers.launchoptions

### Signature

```typescript
export interface LaunchOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="args">args</span>

</td><td>

`optional`

</td><td>

string\[\]

</td><td>

Additional arguments to pass to the executable when launching.

</td><td>

</td></tr>
<tr><td>

<span id="detached">detached</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Whether to spawn process in the [detached](https://nodejs.org/api/child_process.html#optionsdetached) mode.

</td><td>

`true` except on Windows.

</td></tr>
<tr><td>

<span id="dumpio">dumpio</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

If true, forwards the browser's process stdout and stderr to the Node's process stdout and stderr.

</td><td>

`false`.

</td></tr>
<tr><td>

<span id="env">env</span>

</td><td>

`optional`

</td><td>

Record&lt;string, string \| undefined&gt;

</td><td>

Environment variables to set for the browser process.

</td><td>

</td></tr>
<tr><td>

<span id="executablepath">executablePath</span>

</td><td>

</td><td>

string

</td><td>

Absolute path to the browser's executable.

</td><td>

</td></tr>
<tr><td>

<span id="handlesighup">handleSIGHUP</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Handles SIGHUP in the Node process and tries to gracefully close the browser process.

</td><td>

`true`.

</td></tr>
<tr><td>

<span id="handlesigint">handleSIGINT</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Handles SIGINT in the Node process and tries to kill the browser process.

</td><td>

`true`.

</td></tr>
<tr><td>

<span id="handlesigterm">handleSIGTERM</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Handles SIGTERM in the Node process and tries to gracefully close the browser process.

</td><td>

`true`.

</td></tr>
<tr><td>

<span id="onexit">onExit</span>

</td><td>

`optional`

</td><td>

() =&gt; Promise&lt;void&gt;

</td><td>

A callback to run after the browser process exits or before the process will be closed via the [Process.close()](./browsers.process.close.md) call (including when handling signals). The callback is only run once.

</td><td>

</td></tr>
<tr><td>

<span id="pipe">pipe</span>

</td><td>

`optional`

</td><td>

boolean

</td><td>

Configures stdio streams to open two additional streams for automation over those streams instead of WebSocket.

</td><td>

`false`.

</td></tr>
<tr><td>

<span id="signal">signal</span>

</td><td>

`optional`

</td><td>

AbortSignal

</td><td>

If provided, the process will be killed when the signal is aborted.

</td><td>

</td></tr>
</tbody></table>

# makeProgressCallback() function

Source: https://pptr.dev/browsers-api/browsers.makeprogresscallback

### Signature

```typescript
export declare function makeProgressCallback(browser: Browser, buildId: string): (downloadedBytes: number, totalBytes: number) => void;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

buildId

</td><td>

string

</td><td>

</td></tr>
</tbody></table>

**Returns:**

(downloadedBytes: number, totalBytes: number) =&gt; void

# Metadata interface

Source: https://pptr.dev/browsers-api/browsers.metadata

### Signature

```typescript
export interface Metadata
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="aliases">aliases</span>

</td><td>

</td><td>

Record&lt;string, string&gt;

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="executablepaths">executablePaths</span>

</td><td>

`optional`

</td><td>

Record&lt;string, string&gt;

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Options interface

Source: https://pptr.dev/browsers-api/browsers.options

### Signature

```typescript
export interface ComputeExecutablePathOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

Determines which browser to launch.

</td><td>

</td></tr>
<tr><td>

<span id="buildid">buildId</span>

</td><td>

</td><td>

string

</td><td>

Determines which buildId to download. BuildId should uniquely identify binaries and they are used for caching.

</td><td>

</td></tr>
<tr><td>

<span id="cachedir">cacheDir</span>

</td><td>

</td><td>

string \| null

</td><td>

Root path to the storage directory.

Can be set to `null` if the executable path should be relative to the extracted download location. E.g. `./chrome-linux64/chrome`.

</td><td>

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

`optional`

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

Determines which platform the browser will be suited for.

</td><td>

**Auto-detected.**

</td></tr>
</tbody></table>

# Process.(constructor)

Source: https://pptr.dev/browsers-api/browsers.process._constructor_

Constructs a new instance of the `Process` class

### Signature

```typescript
class Process {
	constructor(opts: LaunchOptions);
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

opts

</td><td>

[LaunchOptions](./browsers.launchoptions.md)

</td><td>

</td></tr>
</tbody></table>

# Process.close() method

Source: https://pptr.dev/browsers-api/browsers.process.close

### Signature

```typescript
class Process {
	close(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Process.getRecentLogs() method

Source: https://pptr.dev/browsers-api/browsers.process.getrecentlogs

Get recent logs (stderr + stdout) emitted by the browser.

### Signature

```typescript
class Process {
	getRecentLogs(): string[];
}
```

**Returns:**

string\[\]

# Process.hasClosed() method

Source: https://pptr.dev/browsers-api/browsers.process.hasclosed

### Signature

```typescript
class Process {
	hasClosed(): Promise<void>;
}
```

**Returns:**

Promise&lt;void&gt;

# Process.kill() method

Source: https://pptr.dev/browsers-api/browsers.process.kill

### Signature

```typescript
class Process {
	kill(): void;
}
```

**Returns:**

void

# Process class

Source: https://pptr.dev/browsers-api/browsers.process

### Signature

```typescript
export declare class Process
```

## Constructors

<table><thead><tr><th>

Constructor

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="_constructor_">[(constructor)(opts)](./browsers.process._constructor_.md)</span>

</td><td>

</td><td>

Constructs a new instance of the `Process` class

</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="nodeprocess">nodeProcess</span>

</td><td>

`readonly`

</td><td>

childProcess.ChildProcess

</td><td>

</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method

</th><th>

Modifiers

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

<span id="close">[close()](./browsers.process.close.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="getrecentlogs">[getRecentLogs()](./browsers.process.getrecentlogs.md)</span>

</td><td>

</td><td>

Get recent logs (stderr + stdout) emitted by the browser.

</td></tr>
<tr><td>

<span id="hasclosed">[hasClosed()](./browsers.process.hasclosed.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="kill">[kill()](./browsers.process.kill.md)</span>

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="waitforlineoutput">[waitForLineOutput(regex, timeout)](./browsers.process.waitforlineoutput.md)</span>

</td><td>

</td><td>

</td></tr>
</tbody></table>

# Process.waitForLineOutput() method

Source: https://pptr.dev/browsers-api/browsers.process.waitforlineoutput

### Signature

```typescript
class Process {
	waitForLineOutput(regex: RegExp, timeout?: number): Promise<string>;
}
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

regex

</td><td>

RegExp

</td><td>

</td></tr>
<tr><td>

timeout

</td><td>

number

</td><td>

_(Optional)_

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

# ProfileOptions interface

Source: https://pptr.dev/browsers-api/browsers.profileoptions

### Signature

```typescript
export interface ProfileOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="path">path</span>

</td><td>

</td><td>

string

</td><td>

</td><td>

</td></tr>
<tr><td>

<span id="preferences">preferences</span>

</td><td>

</td><td>

Record&lt;string, unknown&gt;

</td><td>

</td><td>

</td></tr>
</tbody></table>

# resolveBuildId() function

Source: https://pptr.dev/browsers-api/browsers.resolvebuildid

### Signature

```typescript
export declare function resolveBuildId(browser: Browser, platform: BrowserPlatform, tag: string | BrowserTag): Promise<string>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

platform

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td></tr>
<tr><td>

tag

</td><td>

string \| [BrowserTag](./browsers.browsertag.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;string&gt;

# resolveDefaultUserDataDir() function

Source: https://pptr.dev/browsers-api/browsers.resolvedefaultuserdatadir

Returns the expected default user data dir for the given channel. It does not check if the dir actually exists.

### Signature

```typescript
export declare function resolveDefaultUserDataDir(browser: Browser, platform: BrowserPlatform, channel: ChromeReleaseChannel): string;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

browser

</td><td>

[Browser](./browsers.browser.md)

</td><td>

</td></tr>
<tr><td>

platform

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

</td></tr>
<tr><td>

channel

</td><td>

[ChromeReleaseChannel](./browsers.chromereleasechannel.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

string

# SystemOptions interface

Source: https://pptr.dev/browsers-api/browsers.systemoptions

### Signature

```typescript
export interface SystemOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

Determines which browser to launch.

</td><td>

</td></tr>
<tr><td>

<span id="channel">channel</span>

</td><td>

</td><td>

[ChromeReleaseChannel](./browsers.chromereleasechannel.md)

</td><td>

Release channel to look for on the system.

</td><td>

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

`optional`

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

Determines which platform the browser will be suited for.

</td><td>

**Auto-detected.**

</td></tr>
</tbody></table>

# TimeoutError class

Source: https://pptr.dev/browsers-api/browsers.timeouterror

### Signature

```typescript
export declare class TimeoutError extends Error
```

**Extends:** Error

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `TimeoutError` class.

# uninstall() function

Source: https://pptr.dev/browsers-api/browsers.uninstall

### Signature

```typescript
export declare function uninstall(options: UninstallOptions): Promise<void>;
```

## Parameters

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

[UninstallOptions](./browsers.uninstalloptions.md)

</td><td>

</td></tr>
</tbody></table>

**Returns:**

Promise&lt;void&gt;

# UninstallOptions interface

Source: https://pptr.dev/browsers-api/browsers.uninstalloptions

### Signature

```typescript
export interface UninstallOptions
```

## Properties

<table><thead><tr><th>

Property

</th><th>

Modifiers

</th><th>

Type

</th><th>

Description

</th><th>

Default

</th></tr></thead>
<tbody><tr><td>

<span id="browser">browser</span>

</td><td>

</td><td>

[Browser](./browsers.browser.md)

</td><td>

Determines which browser to uninstall.

</td><td>

</td></tr>
<tr><td>

<span id="buildid">buildId</span>

</td><td>

</td><td>

string

</td><td>

The browser build to uninstall

</td><td>

</td></tr>
<tr><td>

<span id="cachedir">cacheDir</span>

</td><td>

</td><td>

string

</td><td>

The path to the root of the cache directory.

</td><td>

</td></tr>
<tr><td>

<span id="platform">platform</span>

</td><td>

`optional`

</td><td>

[BrowserPlatform](./browsers.browserplatform.md)

</td><td>

Determines the platform for the browser binary.

</td><td>

**Auto-detected.**

</td></tr>
</tbody></table>

# WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX variable

Source: https://pptr.dev/browsers-api/browsers.webdriver_bidi_websocket_endpoint_regex

### Signature

```typescript
WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX: RegExp;
```
