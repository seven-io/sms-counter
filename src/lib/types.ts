import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED,
    UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED
} from './constants';

export type CharCount = {
    charCount: number
    reduced: boolean
}

export type CharacterLimits = {
    GSM7: typeof GSM7_CHAR_LIMIT | typeof GSM7_CHAR_LIMIT_REDUCED
    UCS2: typeof UCS2_CHAR_LIMIT | typeof UCS2_CHAR_LIMIT_REDUCED
};

export type Encoding = keyof CharacterLimits;

export type CounterOptions = {
    initEvent: string
    position: InsertPosition
    selector: string
    standalone: boolean
    stats: boolean
}

export type CounterStats = {
    charCount: number
    charLimit: number
    encoding: Encoding
    msgCount: number
}