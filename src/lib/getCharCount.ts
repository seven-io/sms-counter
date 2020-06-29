import {Encoding} from '../index';
import {TWO_BYTE_CHARS} from './chars';

export const getCharCount = (textarea: HTMLTextAreaElement, encoding: Encoding): number => {
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