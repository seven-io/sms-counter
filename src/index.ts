import {listen} from './lib/listen';

export type CharacterLimits = {
    GSM7: typeof GSM7_CHAR_LIMIT | typeof GSM7_CHAR_LIMIT_REDUCED
    UCS2: typeof UCS2_CHAR_LIMIT | typeof UCS2_CHAR_LIMIT_REDUCED
};

export type Encoding = keyof CharacterLimits;

export const GSM7_CHAR_LIMIT = 160;
export const GSM7_CHAR_LIMIT_REDUCED = 153;
export const UCS2_CHAR_LIMIT = 70;
export const UCS2_CHAR_LIMIT_REDUCED = 67;

export type CounterOptions = {
    initEvent: string
    position: InsertPosition
    selector: string
}

listen({
    ...{
        initEvent: 'DOMContentLoaded',
        position: 'afterend',
        selector: 'textarea[data-sms77-sms]',
    },
    ...((window as any).SMS77IO_COUNTER_OPTIONS || {}),
});