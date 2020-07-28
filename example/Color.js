class Color {
    static extension = 'sandybrown';
    static notGsm = 'darkgreen';
    static unicode = 'lightgreen';
    static regular = 'lightgray';
    static udh = 'lightblue';

    static get(char) {
        if (char.udh) {
            return Color.udh;
        }

        if (!char.gsm7) {
            return Color.notGsm; /* char not in GSM charset, forces to use Unicode encoding */
        }

        if (char.extension) {
            return Color.extension;
        }

        return char.unicode
            ? Color.unicode /* unicode encoded char in GSM charset */
            : Color.regular; // regular 7-bit character present in GSM charset;
    };
}