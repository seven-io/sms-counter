import {listen} from './lib/listen'
import {CounterOptions} from './lib/types'

export * from './lib/getCounterStats'

const options: CounterOptions = {
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-sms77-sms]',
    standalone: false,
    stats: true,
    ...((window as any).SMS77IO_COUNTER_OPTIONS || {}),
}

if (!options.standalone) listen(options)