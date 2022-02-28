export const getCharEncoding =
    (length: number): 'GSM7' | 'UCS2' => 1 === length ? 'GSM7' : 'UCS2'