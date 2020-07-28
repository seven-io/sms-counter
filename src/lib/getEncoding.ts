import {GSM_7BIT_ABC_DEFAULT, GSM_7BIT_ABC_EXTENSION} from './chars';
import {Encoding} from './types';

export const getEncoding = (textarea: HTMLTextAreaElement): Encoding => {
    for (const char of textarea.value.split('')) {
        if (![...GSM_7BIT_ABC_EXTENSION, ...GSM_7BIT_ABC_DEFAULT].includes(char)) {
            return 'UCS2';
        }
    }

    return 'GSM7';
};