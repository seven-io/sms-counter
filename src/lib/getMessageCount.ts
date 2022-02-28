import {CharacterLimits, Encoding} from './types'

export const getMessageCount = (
    charCount: number,
    charLimits: CharacterLimits,
    encoding: Encoding,
): number => {
    let count = charCount / charLimits[encoding]

    if (1 >= count) count = 1
    else {
        count = Number.parseFloat(String(count))
        count = Math.floor(count)
        count++
    }

    return count
}