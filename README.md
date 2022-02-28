![](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77 Logo")

# SMS Counter by Sms77

## Installation

### For Browsers

    ```html
    <script src='https://unpkg.com/@sms77.io/counter/dist/index.js'></script>
    ```

### For NodeJS

#### Yarn ```yarn add @sms77.io/counter```

#### NPM```npm install @sms77.io/counter```

```javascript
import '@sms77.io/counter'
```

## Usage

```html
<textarea data-sms77-sms></textarea>
```

For advanced usage see the [example](./example/index.html).

## Options

Set the window object before loading the library.

```javascript
window.SMS77IO_COUNTER_OPTIONS = {
    initEvent: string = 'DOMContentLoaded', // the DOM event for init
    position: InsertPosition = 'afterend', // where to add the counter span
    selector: string = 'textarea[data-sms77-sms]', // the inputs selector
    standalone: boolean = false, // stop attaching input listeners
    stats: boolean = false, // whether to output stats or not
}
```

## Support

Need help? Feel free to [contact us](https://www.sms77.io/en/company/contact/).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE.txt)