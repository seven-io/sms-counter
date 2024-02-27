import {GSM_7BIT_ABC_EXTENSION} from './chars'
import type {Encoding, SourceElement} from './types'

export const getCharCount = (input: SourceElement, encoding: Encoding): number => {
    let charCount = input.value.length

    if ('GSM7' === encoding) {
        for (const twoByteChar of GSM_7BIT_ABC_EXTENSION) {
            for (const char of input.value.split('')) {
                if (char === twoByteChar) {
                    charCount++
                }
            }
        }
    }

    return charCount
}