import {getCharCount} from './lib/getCharCount'
import {getEncoding} from './lib/getEncoding'
import type {SourceElement} from './lib/types'

const textarea = (text: string) => {
    document.body.insertAdjacentHTML(
        'afterbegin', `<textarea data-seven-sms>${text}</textarea>`)

    return document.querySelector('textarea')!
}

const input = (text: string) => {
    document.body.insertAdjacentHTML(
        'afterbegin', `<input data-seven-sms value='${text}' />`)

    return document.querySelector('input')!
}

const charCount = (sourceElement: SourceElement) => {
    return getCharCount(sourceElement, encoding(sourceElement))
}

const encoding =
    (sourceElement: SourceElement) => getEncoding(sourceElement.value.split(''))

describe('CharCount <textarea>', () => {
    test('GSM-7',
        () => expect(charCount(textarea('seven'))).toBe(5))

    test('GSM-7 with spaces',
        () => expect(charCount(textarea('\sseven\s'))).toBe(7))

    test('GSM-7 with line break LF',
        () => expect(charCount(textarea('hello\nworld'))).toBe(11))

    test('GSM-7 with line breaks CR',
        () => expect(charCount(textarea('\rseven\r'))).toBe(6))

    test('GSM-7 with line breaks CR + LF',
        () => expect(charCount(textarea('\r\nseven\r\n'))).toBe(6))

    test('GSM-7 with escape characters',
        () => expect(charCount(textarea('€€'))).toBe(4))

    test('UCS-2',
        () => expect(charCount(textarea('°seven°'))).toBe(7))

    test('UCS-2 with special chars',
        () => expect(charCount(textarea('°€seven€°'))).toBe(9))
})

describe('CharCount <input />', () => {
    test('GSM-7',
        () => expect(charCount(input('seven'))).toBe(5))

    test('GSM-7 with spaces',
        () => expect(charCount(input('\sseven\s'))).toBe(7))

    test('GSM-7 with line break LF',
        () => expect(charCount(input('hello\nworld'))).toBe(10))

    test('GSM-7 with line breaks CR',
        () => expect(charCount(input('\rseven\r'))).toBe(5))

    test('GSM-7 with line breaks CR + LF',
        () => expect(charCount(input('\r\nseven\r\n'))).toBe(5))

    test('UCS-2',
        () => expect(charCount(input('°seven°'))).toBe(7))

    test('UCS-2 with special chars',
        () => expect(charCount(input('°€seven€°'))).toBe(9))
})

describe('Encoding <textarea>', () => {
    test('GSM-7',
        () => expect(encoding(textarea(' seven'))).toBe('GSM7'))

    test('UCS-2',
        () => expect(encoding(textarea(' seven°'))).toBe('UCS2'))
})

describe('Encoding <input />', () => {
    test('GSM-7 ',
        () => expect(encoding(input(' seven'))).toBe('GSM7'))

    test('UCS-2',
        () => expect(encoding(input(' seven°'))).toBe('UCS2'))
})
