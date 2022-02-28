import {getText} from './getText'
import {CounterStats} from './types'

export const setText = (
    targetElement: HTMLElement,
    counterStats: CounterStats,
): string => targetElement.textContent = getText(counterStats)