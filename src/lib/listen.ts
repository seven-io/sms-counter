import {setStyle} from './setStyle'
import {getCounterStats} from './getCounterStats'
import {CounterOptions, SourceElement} from './types'
import {onInput} from './onInput'
import {setText} from './setText'

const onEvent = (options: CounterOptions): void => {
    const eachSourceElement = (sourceElement: SourceElement): void => {
        let statsElement: HTMLElement | undefined | null
        let needsStyling = false

        if (options.stats !== false) {
            if (options.stats === true) {
                statsElement = document.createElement('span')
                statsElement.style.position = 'absolute'
                sourceElement.insertAdjacentElement(options.position, statsElement)
                needsStyling = true
                setStyle(sourceElement, statsElement)
            } else {
                statsElement = typeof options.stats === 'string'
                    ? document.querySelector<HTMLElement>(options.stats)
                    : options.stats
                needsStyling = false
            }

            if (statsElement) setText(statsElement, getCounterStats(sourceElement))
        }

        sourceElement.addEventListener('input',
            () => onInput(sourceElement, statsElement, needsStyling))
    }

    (Array.from(document.querySelectorAll(options.selector)) as SourceElement[])
        .forEach(eachSourceElement)
}

export const listen = (options: CounterOptions): void =>
    document.addEventListener(options.initEvent, (): void =>
        onEvent(options), {once: true})