import {Char, Encoding, Messages} from './types'
import {getCharLength} from './getCharLength'
import {getCharEncoding} from './getCharEncoding'
import {isGSM7} from './isGSM7'
import {GSM_7BIT_ABC, GSM_7BIT_ABC_EXTENSION} from './chars'

const getHeaders = (count: number, index: number) => [
    '05',
    '00',
    '03',
    'CC',
    `0${count}`,
    `0${index}`,
]

export const getMessages = (
    encoding: Encoding,
    isMulti: boolean,
    letters: string[],
    msgCount: number,
    charLimit: number,
): Messages => {
    const messages: Messages = []
    let startIndex = 0
    let unicode = false

    for (let [msgIndex, msg] of Array(msgCount).entries()) {
        msg = []
        let i = 1
        const endIndex = startIndex + charLimit
        const headers = getHeaders(msgCount, msgIndex)
        const headerCount = headers.length
        const msgChars = letters.slice(startIndex, endIndex)

        for (const char of msgChars) {
            const charIndex = (headerCount - 1) + i

            if (!unicode) {
                if (!GSM_7BIT_ABC.includes(char)) {
                    unicode = true
                } else {
                    if (GSM_7BIT_ABC_EXTENSION.includes(char)) {
                        msg[charIndex - 1] = 'ESC'
                    }
                }
            }

            msg[charIndex] = char

            i++
        }

        startIndex = endIndex

        if (isMulti) {
            msg.splice(0, headerCount, ...headers)
        }

        messages.push([
            ...msg
                .filter((m: any) => m)
                .map((character: any): Char => {
                    const isGSM7Char = character.length > 1 && 'ESC' !== character

                    return {
                        character,
                        encoding: isGSM7Char
                            ? 'GSM7' : getCharEncoding(getCharLength(encoding, character)),
                        escape: isGSM7Char ? false : 'ESC' === character,
                        gsm7: isGSM7Char ? true : isGSM7(character),
                        length: 1,
                        udh: isGSM7Char,
                        unicode: isGSM7Char ? false : unicode,
                    }
                }),
        ])
    }

    return messages
}