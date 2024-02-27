window.SEVEN_COUNTER_OPTIONS = {
    stats: false,
};

const displayedChar = char => ' ' === char
    ? '␣' : '\n' === char
        ? 'LF' : char;

const msgChars = (color, msg) => msg.map(c => `<li 
                    class='seven-letter' 
                    style='background-color: ${color.get(c)};' 
                    title='${Object.keys(c).map(k => `${k}: ${c[k]}`).join('\n')}'
                    >
                        ${displayedChar(c.character)}
                    </li>
                `).join('');

document.addEventListener('seven_counter_input',
    ({detail}) => Object.keys(detail).forEach(k => {
        const value = detail[k];

        document.getElementById(k).innerHTML =
            'messages' === k
                ? value.map(msg =>
                    `<li><ul>${msgChars(new Color(detail), msg)}</ul></li>`).join('')
                : value;
    }));
