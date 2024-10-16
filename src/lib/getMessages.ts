import type {Char, Encoding, Messages} from './types'
import {getCharLength} from './getCharLength'
import {getCharEncoding} from './getCharEncoding'
import {isGSM7} from './isGSM7'
import {GSM_7BIT_ABC, GSM_7BIT_ABC_EXTENSION} from './chars'

const ESCAPE_CHARACTER = 'ESC'

type GetMessagesParams = {
    charLimit: number
    encoding: Encoding
    isMulti: boolean
    letters: string[]
    msgCount: number
}

function isUnicodeCharacter(char: string): boolean {
    return !GSM_7BIT_ABC.includes(char)
}

function isExtensionCharacter(char: string): boolean {
    return GSM_7BIT_ABC_EXTENSION.includes(char)
}

export const getMessages = ({
                                charLimit,
                                encoding,
                                isMulti,
                                letters,
                                msgCount,
                            }: GetMessagesParams): Messages => {
    const messages: Messages = []
    let startIndex = 0
    let unicode = false

    for (let [msgIndex, msg = []] of Array<string[]>(msgCount).entries()) {
        let i = 1
        const endIndex = startIndex + charLimit
        const headers = getHeaders(msgCount, msgIndex)
        const headerCount = headers.length
        const msgChars = letters.slice(startIndex, endIndex)

        msgChars.forEach(char => {
            const charIndex = (headerCount - 1) + i

            if (!unicode && isUnicodeCharacter(char)) unicode = true

            if (!unicode) {
                if (isExtensionCharacter(char)) {
                    console.log('extension character in a non-unicode message, ADDING ESCAPE CHARACTER', {
                        charIndex,
                        char,
                        msg
                    })

                    msg.push(ESCAPE_CHARACTER)
                }
            }

            msg.push(char)

            i++
        })

        startIndex = endIndex

        if (isMulti) msg.splice(0, 0, ...headers)

        messages.push([
            ...msg
                .filter(m => m)
                .map((character): Char => {
                    const isGSM7Char = character.length > 1 && ESCAPE_CHARACTER !== character

                    return {
                        character,
                        encoding: isGSM7Char
                            ? 'GSM7' : getCharEncoding(getCharLength(encoding, character)),
                        escape: isGSM7Char ? false : ESCAPE_CHARACTER === character,
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

function getHeaders(count: number, index: number): string[] {
    let countHex = count.toString(16)
    if (countHex.length === 1) countHex = `0${countHex}`
    let indexHex = index.toString(16)
    if (indexHex.length === 1) indexHex = `0${indexHex}`

    return [
        '05',
        '00',
        '03',
        'CC',
        countHex.toUpperCase(),
        indexHex.toUpperCase(),
    ]
}