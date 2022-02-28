import {CharLimit, Encoding} from './types'

export const getCharLimit = (isMultiMessage: boolean, encoding: Encoding): number =>
    'GSM7' === encoding
        ? isMultiMessage
            ? CharLimit.GSM7_REDUCED
            : CharLimit.GSM7
        : isMultiMessage
            ? CharLimit.UCS2_REDUCED
            : CharLimit.UCS2