import {CounterStats, SourceElement} from './types'

export const setStyle = (
    sourceElement: SourceElement,
    {charCount, encoding, msgCount}: CounterStats,
    targetElement: HTMLElement,
): void => {
    targetElement.textContent = `${charCount}/${msgCount} [${encoding}]`

    const widthDiff = sourceElement.offsetWidth - targetElement.offsetWidth
    targetElement.style.left = `${widthDiff}px`

    const heightDiff = sourceElement.offsetHeight - targetElement.offsetHeight
    targetElement.style.top = `${heightDiff}px`
}