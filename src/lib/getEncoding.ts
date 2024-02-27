import {GSM_7BIT_ABC} from './chars'
import type {Encoding} from './types'

export const getEncoding = (chars: string[]): Encoding => {
    for (const char of chars)
        if (!GSM_7BIT_ABC.includes(char)) return 'UCS2'

    return 'GSM7'
}