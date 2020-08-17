window.SMS77IO_COUNTER_OPTIONS = {
    stats: false,
};

const displayedChar = char => ' ' === char
    ? '␣' : '\n' === char
        ? 'LF' : char;

const msgChars = msg => msg.map(char => `
                    <li 
                    class='sms77-letter' 
                    style='background-color: ${Color.get(char)};' 
                    title='${Object.keys(char).map(k => `${k}: ${char[k]}`).join('\n')}'
                    >
                        ${displayedChar(char.character)}
                    </li>
                `).join('');

document.addEventListener('sms77io_counter_input',
    ev => Object.keys(ev.detail).forEach(key => {
        const value = ev.detail[key];

        document.getElementById(key).innerHTML =
            'messages' === key
                ? value.map(msg => `<li><ul>${msgChars(msg)}</ul></li>`).join('')
                : value;
    }));