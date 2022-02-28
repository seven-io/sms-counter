import {listen} from './lib/listen'
import {CounterOptions} from './lib/types'

export * from './lib/getCounterStats'
export * from './lib/types'

const isBrowser = 'window' in globalThis

const options: CounterOptions = {
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-sms77-sms]',
    standalone: false,
    stats: true,
    ...(isBrowser ? (window as any).SMS77IO_COUNTER_OPTIONS || {} : {}),
}

if (isBrowser && !options.standalone) listen(options)