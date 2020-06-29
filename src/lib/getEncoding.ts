import {Encoding} from '../index';

import {ONE_BYTE_CHARS, TWO_BYTE_CHARS} from './chars';

export const getEncoding = (textarea: HTMLTextAreaElement): Encoding => {
    for (const char of textarea.value.split('')) {
        if (![...TWO_BYTE_CHARS, ...ONE_BYTE_CHARS].includes(char)) {
            return 'UCS2';
        }
    }

    return 'GSM7';
};