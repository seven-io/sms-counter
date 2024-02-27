import {getEncoding} from './getEncoding'
import {getMessageCount} from './getMessageCount'
import {getCharLimits} from './getCharLimits'
import type {CounterStats, SourceElement} from './types'
import {getCharsCount} from './getCharsCount'
import {getMessages} from './getMessages'
import {getCharLimit} from './getCharLimit'

export const getCounterStats = (source: SourceElement | string): CounterStats => {
    const letters = (typeof source === 'string' ? source : source.value).split('')
    const encoding = getEncoding(letters)
    const charCount = getCharsCount(encoding, letters)
    const charLimits = getCharLimits(encoding, charCount)
    const msgCount = getMessageCount(charCount, charLimits, encoding)
    const isMulti = msgCount > 1
    const charLimit = getCharLimit(isMulti, encoding)

    return {
        charCount,
        charLimit,
        encoding,
        messages: getMessages(encoding, isMulti, letters, msgCount, charLimit),
        msgCount,
    }
}