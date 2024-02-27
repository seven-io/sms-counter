import {getText} from './getText'
import type {CounterStats} from './types'

export const setText = (
    targetElement: HTMLElement,
    counterStats: CounterStats,
): string => targetElement.textContent = getText(counterStats)