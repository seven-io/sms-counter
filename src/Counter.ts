import {CharacterLimits, Encoding, ONE_BYTE_CHARS, TWO_BYTE_CHARS} from './index';

export default class Counter {
    static readonly DEFAULT_CHAR_LIMITS: CharacterLimits = {
        GSM7: 160,
        UCS2: 70,
    };

    static readonly REDUCED_CHAR_LIMITS: CharacterLimits = {
        GSM7: 153,
        UCS2: 67,
    };

    constructor(protected selector: string = 'textarea[data-sms77-sms]') {
        this.selector = selector;
    }

    static setStyle(textarea: HTMLTextAreaElement): void {
        const encoding = Counter.getEncoding(textarea);
        const charCount = Counter.getCharCount(textarea, encoding);
        const msgCount = Counter.getMessageCount(charCount, Counter.getCharLimits(encoding, charCount), encoding);
        const $span = textarea.nextElementSibling as HTMLSpanElement;

        $span.textContent = `${charCount}/${msgCount} [${encoding}]`;
        $span.style.left = `${textarea.offsetWidth - $span.offsetWidth}px`;
        $span.style.top = `${textarea.offsetHeight - $span.offsetHeight}px`;
    };

    static getEncoding(textarea: HTMLTextAreaElement): Encoding {
        for (const char of textarea.value.split('')) {
            if (![...ONE_BYTE_CHARS, ...TWO_BYTE_CHARS].includes(char)) {
                return 'UCS2';
            }
        }

        return 'GSM7';
    };

    static getMessageCount(charCount: number, charLimits: CharacterLimits, encoding: Encoding): number {
        let count = charCount / charLimits[encoding];

        if (1 >= count) {
            count = 1;
        } else {
            count = Number.parseFloat(String(count));
            count = Math.floor(count);
            count++;
        }

        return count;
    };

    static getCharCount(textarea: HTMLTextAreaElement, encoding: Encoding): number {
        let charCount = textarea.value.length;

        if ('UCS2' === encoding) {
            for (const twoByteChar of TWO_BYTE_CHARS) {
                for (const char of textarea.value.split('')) {
                    if (char === twoByteChar) {
                        charCount++;
                    }
                }
            }
        }

        return charCount;
    };

    static getCharLimits(encoding: Encoding, charCount: number): CharacterLimits {
        return Counter.DEFAULT_CHAR_LIMITS[encoding] < charCount
            ? Counter.REDUCED_CHAR_LIMITS : Counter.DEFAULT_CHAR_LIMITS;
    };

    listen(event: string = 'DOMContentLoaded', insertPosition: InsertPosition = 'afterend'): void {
        document.addEventListener(event, (): void =>
            (Array.from(document.querySelectorAll(this.selector)) as HTMLTextAreaElement[])
                .forEach((textarea: HTMLTextAreaElement): void => {
                    textarea.insertAdjacentHTML(insertPosition,
                        '<span style="position: absolute;"></span>');

                    Counter.setStyle(textarea);

                    textarea.addEventListener('input', () => Counter.setStyle(textarea));
                }), {once: true});
    }
}