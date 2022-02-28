import {CounterStats} from './types'

export const getText = ({charCount, encoding, msgCount}: CounterStats): string =>
    `${charCount}/${msgCount} [${encoding}]`