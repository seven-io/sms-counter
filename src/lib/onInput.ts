import {getCounterStats} from './getCounterStats'
import {setStyle} from './setStyle'
import {COUNTER_INPUT_EVENT} from './constants'
import type {SourceElement} from './types'
import {setText} from './setText'

export const onInput = (
    sourceElement: SourceElement,
    statsElement: HTMLElement | undefined | null,
    needsStyling: boolean,
) => {
    const counterStats = getCounterStats(sourceElement)

    if (statsElement) {
        setText(statsElement, counterStats)
        if (needsStyling) setStyle(sourceElement, statsElement)
    }

    document.dispatchEvent(
        new CustomEvent(COUNTER_INPUT_EVENT, {detail: counterStats}),
    )
}