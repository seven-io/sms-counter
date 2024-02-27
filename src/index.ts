import {listen} from './lib/listen'
import type {CounterOptions} from './lib/types'

export * from './lib/getCounterStats'
export * from './lib/types'

const isBrowser = 'window' in globalThis

const options: CounterOptions = {
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-seven-sms]',
    standalone: false,
    stats: true,
    ...(isBrowser ? (window as any).SEVEN_COUNTER_OPTIONS || {} : {}),
}

if (isBrowser && !options.standalone) listen(options)
