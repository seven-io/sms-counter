import {Char, Encoding, Messages} from './types';
import {getHeaderCount} from './getHeaderCount';
import {getCharLength} from './getCharLength';
import {getCharEncoding} from './getCharEncoding';
import {isExtension} from './isExtension';
import {isGSM7} from './isGSM7';
import {isUnicode} from './isUnicode';

export const getMessages = (encoding: Encoding, isMulti: boolean, letters: string[], msgCount: number, charLimit: number): Messages => {
    const headerCount = getHeaderCount(encoding);
    const messages: Messages = [];

    let startIndex = 0;

    for (let msg of Array(msgCount)) {
        msg = [];
        let i = 1;
        const endIndex = startIndex + charLimit;

        for (const pick of letters.slice(startIndex, endIndex)) {
            msg[(headerCount - 1) + i] = pick;

            i++;
        }

        startIndex = endIndex;

        if (isMulti) {
            msg.splice(0, headerCount, ...Array(headerCount).fill('UDH'));
        }

        const chars = msg.filter((m: any) => m).map((character: string): Char => {
            if ('UDH' === character) {
                return {
                    character: 'H',
                    encoding: 'GSM7',
                    extension: false,
                    gsm7: true,
                    length: 1,
                    udh: true,
                    unicode: false,
                };
            } else {
                const length = getCharLength(encoding, character);

                return {
                    character,
                    encoding: getCharEncoding(length),
                    extension: isExtension(character),
                    gsm7: isGSM7(character),
                    length,
                    udh: false,
                    unicode: isUnicode(character),
                };
            }
        });

        messages.push([...chars]);
    }

    return messages;
};