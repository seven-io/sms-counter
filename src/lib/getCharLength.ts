import {GSM_7BIT_ABC_EXTENSION} from './chars'
import type {Encoding} from './types'

export const getCharLength = (encoding: Encoding, char: string): number => {
    let count = 1

    if ('GSM7' === encoding && GSM_7BIT_ABC_EXTENSION.includes(char)) count++

    return count
}