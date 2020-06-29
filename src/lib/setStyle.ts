import {getCharLimits} from './getCharLimits';
import {getEncoding} from './getEncoding';
import {getCharCount} from './getCharCount';
import {getMessageCount} from './getMessageCount';

export const setStyle = (textarea: HTMLTextAreaElement) => {
    const encoding = getEncoding(textarea);
    const charCount = getCharCount(textarea, encoding);
    const msgCount = getMessageCount(charCount, getCharLimits(encoding, charCount), encoding);
    const $span = textarea.nextElementSibling as HTMLSpanElement;

    $span.textContent = `${charCount}/${msgCount} [${encoding}]`;
    $span.style.left = `${textarea.offsetWidth - $span.offsetWidth}px`;
    $span.style.top = `${textarea.offsetHeight - $span.offsetHeight}px`;
};