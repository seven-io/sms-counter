import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED, UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED
} from './constants';
import {Encoding} from './types';

export const getCharLimit = (isMultiMessage: boolean, encoding: Encoding) =>
    'GSM7' === encoding
        ? isMultiMessage
        ? GSM7_CHAR_LIMIT_REDUCED
        : GSM7_CHAR_LIMIT
        : isMultiMessage
        ? UCS2_CHAR_LIMIT_REDUCED
        : UCS2_CHAR_LIMIT;