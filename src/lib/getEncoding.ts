import {Encoding} from '../index';

const {oneByteChars, twoByteChars} = require('./chars.json');

export const getEncoding = (textarea: HTMLTextAreaElement): Encoding => {
    for (const char of textarea.value.split('')) {
        if (![...oneByteChars, ...twoByteChars].includes(char)) {
            return 'UCS2';
        }
    }

    return 'GSM7';
};