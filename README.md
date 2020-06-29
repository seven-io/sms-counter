![sms77io Logo](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77io Logo")

# SMS Counter by Sms77

## Installation
- For Browsers

    ```<script src="https://unpkg.com/@sms77.io/counter@1.2.0/dist/index.js"></script>```
    
- For NodeJS

   ```yarn add @sms77.io/counter```

   ```import '@sms77.io/counter'```

### Usage
    <textarea data-sms77-sms></textarea>
    
#### Options
    Set the window object before loading the library.

    window.SMS77IO_COUNTER_OPTIONS = {
            initEvent: string = 'DOMContentLoaded', // the DOM event for init
            position: InsertPosition = 'afterend', // where to add the counter span
            selector: string = 'textarea[data-sms77-sms]', // the inputs selector
            standalone: boolean = false, // stop attaching input listeners
    }