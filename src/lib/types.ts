import {
    GSM7_CHAR_LIMIT,
    GSM7_CHAR_LIMIT_REDUCED,
    UCS2_CHAR_LIMIT,
    UCS2_CHAR_LIMIT_REDUCED,
} from './constants'

export type Char = {
    character: string
    encoding: Encoding
    escape: boolean
    gsm7: boolean
    length: number
    udh: boolean
    unicode: boolean
}

export type CharacterLimits = {
    GSM7: typeof GSM7_CHAR_LIMIT | typeof GSM7_CHAR_LIMIT_REDUCED
    UCS2: typeof UCS2_CHAR_LIMIT | typeof UCS2_CHAR_LIMIT_REDUCED
};

export type CounterOptions = {
    initEvent: string
    position: InsertPosition
    selector: string
    standalone: boolean
    stats: boolean | HTMLElement | string
}

export type CounterStats = {
    charCount: number
    charLimit: number
    encoding: Encoding
    messages: Messages
    msgCount: number
}

export type Encoding = keyof CharacterLimits;

export type Messages = Array<Char[]>;

export type SourceElement = HTMLInputElement | HTMLTextAreaElement