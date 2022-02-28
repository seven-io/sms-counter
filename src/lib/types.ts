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
    GSM7: CharLimit.GSM7 | CharLimit.GSM7_REDUCED
    UCS2: CharLimit.UCS2 | CharLimit.UCS2_REDUCED
};

export enum CharLimit {
    GSM7 = 160,
    GSM7_REDUCED = 153,
    UCS2 = 70,
    UCS2_REDUCED = 67,
}

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