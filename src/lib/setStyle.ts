import {CounterStats} from './types';

export const setStyle = (
    textarea: HTMLTextAreaElement,
    {charCount, encoding, msgCount}: CounterStats
) => {
    const $span = textarea.nextElementSibling as HTMLSpanElement;

    $span.textContent = `${charCount}/${msgCount} [${encoding}]`;

    $span.style.left = `${textarea.offsetWidth - $span.offsetWidth}px`;
    $span.style.top = `${textarea.offsetHeight - $span.offsetHeight}px`;
};