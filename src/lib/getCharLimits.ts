import {CharacterLimits, CharLimit, Encoding} from './types'

export const getCharLimits = (encoding: Encoding, charCount: number): CharacterLimits => {
    const limits: CharacterLimits = {
        GSM7: CharLimit.GSM7,
        UCS2: CharLimit.UCS2,
    }

    if (limits[encoding] < charCount) {
        limits.GSM7 = CharLimit.GSM7_REDUCED
        limits.UCS2 = CharLimit.UCS2_REDUCED
    }

    return limits
}