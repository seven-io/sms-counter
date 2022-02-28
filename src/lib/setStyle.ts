import {SourceElement} from './types'

export const setStyle = (
    sourceElement: SourceElement,
    targetElement: HTMLElement,
): void => {
    const widthDiff = sourceElement.offsetWidth - targetElement.offsetWidth
    targetElement.style.left = `${widthDiff}px`

    const heightDiff = sourceElement.offsetHeight - targetElement.offsetHeight
    targetElement.style.top = `${heightDiff}px`
}