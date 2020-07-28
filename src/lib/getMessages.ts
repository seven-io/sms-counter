import {Char, Encoding, Messages} from './types';
import {getCharLength} from './getCharLength';
import {getCharEncoding} from './getCharEncoding';
import {isGSM7} from './isGSM7';
import {GSM_7BIT_ABC, GSM_7BIT_ABC_EXTENSION} from './chars';

export const getMessages = (encoding: Encoding, isMulti: boolean, letters: string[], msgCount: number, charLimit: number): Messages => {
    const messages: Messages = [];

    let startIndex = 0;

    let unicode = false;

    for (let [msgIndex, msg] of Array(msgCount).entries()) {
        msg = [];
        let i = 1;
        const endIndex = startIndex + charLimit;
        const headers = [
            '05', '00', '03', 'CC', `0${msgCount}`, `0${msgIndex}`,
        ];
        const headerCount = headers.length; // TODO??: + 1

        const msgChars = letters.slice(startIndex, endIndex);

        if (!unicode) {
            for (const char of msgChars) {
                if (!GSM_7BIT_ABC.includes(char)) {
                    unicode = true;

                    break;
                }
            }
        }

        for (const char of msgChars) {
            const charIndex = (headerCount - 1) + i;

            if (!unicode && GSM_7BIT_ABC_EXTENSION.includes(char)) {
                msg[charIndex - 1] = 'ESC';
            }

            msg[charIndex] = char;

            i++;
        }

        startIndex = endIndex;

        if (isMulti) {
            msg.splice(0, headerCount, ...headers);
        }

        const chars = msg.filter((m: any) => m).map((character: string): Char => {
            if (character.length > 1 && 'ESC' !== character) {
                return {
                    character,
                    encoding: 'GSM7',
                    escape: false,
                    gsm7: true,
                    length: 1,
                    udh: true,
                    unicode: false,
                };
            } else {
                const length = getCharLength(encoding, character);

                return {
                    character,
                    encoding: getCharEncoding(length), //TODO??
                    escape: 'ESC' === character,
                    gsm7: isGSM7(character),
                    length: 1,
                    udh: false,
                    unicode,
                };
            }
        });

        messages.push([...chars]);
    }

    return messages;
};