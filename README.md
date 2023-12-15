<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# SMS Counter by seven

Counts the SMS character usage for a textarea or text input.

## Installation

### For Browsers

```html

<script src='https://unpkg.com/@seven.io/counter/dist/index.js'></script>
```

### For NodeJS

#### Yarn `yarn add @seven.io/counter`

#### NPM `npm install @seven.io/counter`

```javascript
import '@seven.io/counter'
```

## Usage

```html
<textarea data-seven-sms></textarea>
<input data-seven-sms/>
```

For advanced usage see the [examples](examples).

- [textarea](examples/textarea.html)
- [input](examples/input.html)
- [CSS Selector](examples/selector.html)
- [stats](examples/stats.html)
- [getCounterStats](examples/counterStats.js)

## Options

Set the window object before loading the library.

```javascript
window.SEVEN_COUNTER_OPTIONS = {
    initEvent: string = 'DOMContentLoaded', // the DOM event for init
    position: InsertPosition = 'afterend', // where to add the counter stats span relative to the input
    selector: string = '*[data-seven-sms]', // the inputs selector
    standalone: boolean = false, // stop attaching input listeners
    stats: boolean = false, // whether to output stats or not - also accepts HTMLElement or CSS selector
}
```

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE.txt)
