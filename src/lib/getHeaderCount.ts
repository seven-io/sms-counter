import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED,
    UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED
} from './constants';
import {Encoding} from './types';

export const getHeaderCount = (encoding: Encoding) => 'UCS2' === encoding
    ? UCS2_CHAR_LIMIT - UCS2_CHAR_LIMIT_REDUCED
    : GSM7_CHAR_LIMIT - GSM7_CHAR_LIMIT_REDUCED;