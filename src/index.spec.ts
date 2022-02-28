import {getCharCount} from './lib/getCharCount'
import {getEncoding} from './lib/getEncoding'
import {SourceElement} from './lib/types'

const textarea = (text: string) => {
    document.body.insertAdjacentHTML(
        'afterbegin', `<textarea data-sms77-sms>${text}</textarea>`)

    return document.querySelector('textarea')!
}

const input = (text: string) => {
    document.body.insertAdjacentHTML(
        'afterbegin', `<input data-sms77-sms value='${text}' />`)

    return document.querySelector('input')!
}

const charCount = (sourceElement: SourceElement) => {
    return getCharCount(sourceElement, encoding(sourceElement))
}

const encoding =
    (sourceElement: SourceElement) => getEncoding(sourceElement.value.split(''))

describe('CharCount <textarea>', () => {
    test('GSM-7',
        () => expect(charCount(textarea('sms77'))).toBe(5))

    test('GSM-7 with spaces',
        () => expect(charCount(textarea('\ssms77\s'))).toBe(7))

    test('GSM-7 with line break LF',
        () => expect(charCount(textarea('hello\nworld'))).toBe(11))

    test('GSM-7 with line breaks CR',
        () => expect(charCount(textarea('\rsms77\r'))).toBe(6))

    test('GSM-7 with line breaks CR + LF',
        () => expect(charCount(textarea('\r\nsms77\r\n'))).toBe(6))

    test('UCS-2',
        () => expect(charCount(textarea('°sms77°'))).toBe(7))

    test('UCS-2 with special chars',
        () => expect(charCount(textarea('°€sms77€°'))).toBe(9))
})

describe('CharCount <input />', () => {
    test('GSM-7',
        () => expect(charCount(input('sms77'))).toBe(5))

    test('GSM-7 with spaces',
        () => expect(charCount(input('\ssms77\s'))).toBe(7))

    test('GSM-7 with line break LF',
        () => expect(charCount(input('hello\nworld'))).toBe(10))

    test('GSM-7 with line breaks CR',
        () => expect(charCount(input('\rsms77\r'))).toBe(5))

    test('GSM-7 with line breaks CR + LF',
        () => expect(charCount(input('\r\nsms77\r\n'))).toBe(5))

    test('UCS-2',
        () => expect(charCount(input('°sms77°'))).toBe(7))

    test('UCS-2 with special chars',
        () => expect(charCount(input('°€sms77€°'))).toBe(9))
})

describe('Encoding <textarea>', () => {
    test('GSM-7',
        () => expect(encoding(textarea(' sms77'))).toBe('GSM7'))

    test('UCS-2',
        () => expect(encoding(textarea(' sms77°'))).toBe('UCS2'))
})

describe('Encoding <input />', () => {
    test('GSM-7 ',
        () => expect(encoding(input(' sms77'))).toBe('GSM7'))

    test('UCS-2',
        () => expect(encoding(input(' sms77°'))).toBe('UCS2'))
})