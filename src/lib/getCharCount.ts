import {Encoding} from '../index';

const {twoByteChars} = require('./chars.json');

export const getCharCount = (textarea: HTMLTextAreaElement, encoding: Encoding) => {
    let charCount = textarea.value.length;

    if ('UCS2' === encoding) {
        for (const twoByteChar of twoByteChars) {
            for (const char of textarea.value.split('')) {
                if (char === twoByteChar) {
                    charCount++;
                }
            }
        }
    }

    return charCount;
};