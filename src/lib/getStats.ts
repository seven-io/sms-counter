import {getEncoding} from './getEncoding';
import {getCharCount} from './getCharCount';
import {getMessageCount} from './getMessageCount';
import {getCharLimits} from './getCharLimits';
import {Encoding} from '../index';


export type CounterStats = {
    encoding: Encoding
    charCount: number
    msgCount: number
}

export const getStats = (textarea: HTMLTextAreaElement): CounterStats => {
    const encoding = getEncoding(textarea);
    const charCount = getCharCount(textarea, encoding);

    return {
        encoding,
        charCount,
        msgCount: getMessageCount(charCount, getCharLimits(encoding, charCount), encoding),
    };
};