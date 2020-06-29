import {CharacterLimits, Encoding} from '../index';

export const getCharLimits = (encoding: Encoding, charCount: number): CharacterLimits => {
    const limits: CharacterLimits = {
        GSM7: 160,
        UCS2: 70,
    };

    if (limits[encoding] < charCount) {
        limits.GSM7 = 153;
        limits.UCS2 = 67;
    }

    return limits;
};