import {Encoding} from './types';
import {getCharLength} from './getCharLength';

export const getCharsCount = (encoding: Encoding, characters: string[]): number => {
    let charCount = 0;

    for (const character of characters) {
        const length = getCharLength(encoding, character);

        charCount = charCount + length;
    }

    return charCount;
};