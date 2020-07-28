class Color {
    static escape = 'sandybrown';
    static notGsm = 'darkgreen';
    static unicode = 'lightgreen';
    static regular = 'lightgray';
    static udh = 'lightblue';

    static get(char) {
        if (char.escape) {
            return Color.escape;
        }

        if (char.udh) {
            return Color.udh;
        }

        if (!char.gsm7) {
            return Color.notGsm; // force unicode as char is not in GSM charset
        }

        return char.unicode
            ? Color.unicode // unicode encoded char in GSM charset
            : Color.regular; // regular 7-bit character present in GSM charset;
    };
}