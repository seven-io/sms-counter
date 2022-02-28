import {setStyle} from './setStyle'
import {getDetails} from './getDetails'
import {CounterOptions, SourceElement} from './types'
import {COUNTER_INPUT_EVENT} from './constants'

const onEvent = (options: CounterOptions): void => {
    const eachSourceElement = (sourceElement: SourceElement): void => {
        const onInput = () => {
            const detail = getDetails(sourceElement)

            if (options.stats) setStyle(sourceElement, detail,
                sourceElement.nextElementSibling as HTMLElement)

            document.dispatchEvent(
                new CustomEvent(COUNTER_INPUT_EVENT, {detail}),
            )
        }

        if (options.stats) {
            sourceElement.insertAdjacentHTML(options.position,
                '<span style="position: absolute"></span>')

            setStyle(sourceElement, getDetails(sourceElement),
                sourceElement.nextElementSibling as HTMLElement)
        }

        sourceElement.addEventListener('input', onInput)
    }

    return (Array.from(document.querySelectorAll(options.selector)) as SourceElement[])
        .forEach(eachSourceElement)
}

export const listen = (options: CounterOptions): void =>
    document.addEventListener(options.initEvent, (): void =>
        onEvent(options), {once: true})