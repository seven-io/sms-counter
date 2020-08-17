import {getCharCount} from './lib/getCharCount';
import {getEncoding} from './lib/getEncoding';

const textarea = (text: string) => {
    document.body.insertAdjacentHTML(
        'afterbegin', `<textarea data-sms77-sms>${text}</textarea>`);

    return document.querySelector('textarea')!;
};


const charCount = (text: string) => {
    const _textarea = textarea(text);

    return getCharCount(_textarea, encoding(_textarea));
};

const encoding =
    (_textarea: HTMLTextAreaElement) => getEncoding(_textarea.value.split(''));

describe('CharCount', () => {
    test('GSM-7',
        () => expect(charCount('sms77')).toBe(5));

    test('GSM-7 with spaces',
        () => expect(charCount('\ssms77\s')).toBe(7));

    test('GSM-7 with line break',
        () => expect(charCount('hello\nworld')).toBe(11));

    test('GSM-7 with line breaks',
        () => expect(charCount('\rsms77\r')).toBe(6));

    test('GSM-7 with line breaks',
        () => expect(charCount('\r\nsms77\r\n')).toBe(6));

    test('UCS-2',
        () => expect(charCount('°sms77°')).toBe(7));

    test('UCS-2 with special chars',
        () => expect(charCount('°€sms77€°')).toBe(9));
});

describe('Encoding', () => {
    test('GSM-7',
        () => expect(encoding(textarea(' sms77'))).toBe('GSM7'));

    test('UCS-2',
        () => expect(encoding(textarea(' sms77°'))).toBe('UCS2'));
});