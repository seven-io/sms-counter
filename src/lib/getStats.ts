import {getEncoding} from './getEncoding';
import {getCharCount} from './getCharCount';
import {getMessageCount} from './getMessageCount';
import {getCharLimits} from './getCharLimits';
import {CounterStats} from './types';
import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED,
    UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED
} from './constants';

export const getStats = (textarea: HTMLTextAreaElement): CounterStats => {
    const encoding = getEncoding(textarea);
    const charCount = getCharCount(textarea, encoding);
    const charLimits = getCharLimits(encoding, charCount);
    const msgCount = getMessageCount(charCount, charLimits, encoding);
    const isMultiMsg = msgCount > 1;
    const charLimit = 'UCS2' === encoding ?
        isMultiMsg ? UCS2_CHAR_LIMIT_REDUCED : UCS2_CHAR_LIMIT :
        isMultiMsg ? GSM7_CHAR_LIMIT_REDUCED : GSM7_CHAR_LIMIT;

    return {
        charCount,
        charLimit,
        encoding,
        msgCount,
    };
};