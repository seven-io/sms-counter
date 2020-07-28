import {CharacterLimits, Encoding} from './types';
import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED,
    UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED
} from './constants';

export const getCharLimits = (encoding: Encoding, charCount: number): CharacterLimits => {
    const limits: CharacterLimits = {
        GSM7: GSM7_CHAR_LIMIT,
        UCS2: UCS2_CHAR_LIMIT,
    };

    if (limits[encoding] < charCount) {
        limits.GSM7 = GSM7_CHAR_LIMIT_REDUCED;
        limits.UCS2 = UCS2_CHAR_LIMIT_REDUCED;
    }

    return limits;
};