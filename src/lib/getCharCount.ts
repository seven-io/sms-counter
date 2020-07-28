import {GSM_7BIT_ABC_EXTENSION} from './chars';
import {Encoding} from './types';

export const getCharCount = (textarea: HTMLTextAreaElement, encoding: Encoding): number => {
    let charCount = textarea.value.length;

    if ('GSM7' === encoding) {
        for (const twoByteChar of GSM_7BIT_ABC_EXTENSION) {
            for (const char of textarea.value.split('')) {
                if (char === twoByteChar) {
                    charCount++;
                }
            }
        }
    }

    return charCount;
};