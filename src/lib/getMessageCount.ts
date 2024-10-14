import type {CharacterLimits, Encoding} from './types'

export const getMessageCount = (
    charCount: number,
    charLimits: CharacterLimits,
    encoding: Encoding,
): number => {
    let count = charCount / charLimits[encoding]

    if (1 >= count) count = 1
    else {
        count = Number.parseFloat(String(count))
        count = Math.ceil(count)
        //count++
    }

    //console.log(`getMessageCount: ${count}`)

    return Math.floor(count)
}