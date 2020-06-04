export const ONE_BYTE_CHARS = ['@', 'Δ', '0', '¡', 'P', '¿', 'p', '£', '_', '!', '1', 'A', 'Q', 'a', 'q', '$', 'Φ', '"', '2', 'B', 'R', 'b', 'r', '¥', 'Γ', '#', '3', 'C', 'S', 'c', 's', 'è', 'Λ', '¤', '4', 'D', 'T', 'd', 't', 'é', 'Ω', '%', '5', 'E', 'U', 'e', 'u', 'ù', 'Π', '&', '6', 'F', 'V', 'f', 'v', 'ì', 'Ψ', '\'', '7', 'G', 'W', 'g', 'w', 'ò', 'Σ', '(', '8', 'H', 'X', 'h', 'x', 'Ç', 'Θ', ')', '9', 'I', 'Y', 'i', 'y', 'Ξ', '*', ':', 'J', 'Z', 'j', 'z', 'Ø', '+', ';', 'K', 'Ä', 'k', 'ä', 'ø', 'Æ', ',', '<', 'L', 'Ö', 'l', 'ö', 'æ', '-', '=', 'M', 'Ñ', 'm', 'ñ', 'Å', 'ß', '.', '>', 'N', 'Ü', 'n', 'ü', 'å', 'É', '/', '?', 'O', '§', 'o', 'à'];
export const TWO_BYTE_CHARS = ['^', '|', '€', '{', '}', '[', ']', '~', '\\'];

export type CharacterLimits = {
    GSM7: 160 | 153
    UCS2: 70 | 67
};

export const getEncoding = (textarea: HTMLTextAreaElement): keyof CharacterLimits => {
    for (const char of textarea.value.split('')) {
        if (![...ONE_BYTE_CHARS, ...TWO_BYTE_CHARS].includes(char)) {
            return 'UCS2';
        }
    }

    return 'GSM7';
};

export const getCharCount = (textarea: HTMLTextAreaElement, encoding: keyof CharacterLimits) => {
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

export const getMessageCount =
    (charCount: number, charLimits: CharacterLimits, encoding: keyof CharacterLimits): number => {
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

export const getCharLimits = (encoding: keyof CharacterLimits, charCount: number): CharacterLimits => {
    const limits: CharacterLimits = {
        GSM7: 160,
        UCS2: 70,
    };

    if (limits[encoding] < charCount) {
        limits.GSM7 = 153;
        limits.UCS2 = 67;
    }

    return limits;
};

document.addEventListener('DOMContentLoaded', (): void =>
    (Array.from(document.querySelectorAll('textarea[data-sms77-sms]')) as HTMLTextAreaElement[])
        .forEach((textarea: HTMLTextAreaElement): void => {
            const setStyle = () => {
                const encoding = getEncoding(textarea);
                const charCount = getCharCount(textarea, encoding);
                const msgCount = getMessageCount(charCount, getCharLimits(encoding, charCount), encoding);
                const $span = textarea.nextElementSibling as HTMLSpanElement;

                $span.textContent = `${charCount}/${msgCount} [${encoding}]`;
                $span.style.left = `${textarea.offsetWidth - $span.offsetWidth}px`;
                $span.style.top = `${textarea.offsetHeight - $span.offsetHeight}px`;
            };

            textarea.insertAdjacentHTML('afterend', '<span style="position: absolute;"></span>');

            setStyle();

            textarea.addEventListener('input', setStyle);
        }));