import type {Char,  CounterStats} from "../lib/types";

export default class Color {
    scheme = {
        escape: 'sandybrown',
        notGsm: 'darkgreen',
        unicode: 'lightgreen',
        regular: 'lightgray',
        udh: 'lightblue',
    };

    constructor(public readonly detail: CounterStats) {}

    get(char: Char) {
        if (char.escape || '\n' === char.character) {
            return this.scheme.escape;
        }

        if (char.udh) {
            return this.scheme.udh;
        }

        if (!char.gsm7) {
            return this.scheme.notGsm; // force unicode as char is not in GSM charset
        }

        return char.unicode
            ? this.scheme.unicode // unicode encoded char in GSM charset
            : 'UCS2' === this.detail.encoding
                ? this.scheme.unicode
                : this.scheme.regular; // regular 7-bit character present in GSM charset;
    }
}