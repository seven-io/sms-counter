window.SMS77IO_COUNTER_OPTIONS = {
    stats: false,
};

const messages = messages => {
    const getTitle = char => Object.entries(char).map(([k, v]) => `${k}: ${v}`).join('\n');

    const getStyle = char => `background-color: ${Color.get(char)};`;

    const chars = msg => msg.map(char => `
                    <li 
                    class='sms77-letter' 
                    style='${getStyle(char)}' 
                    title='${getTitle(char)}'
                    >
                        ${' ' === char.character ? '&nbsp;' : char.character}
                    </li>
                `).join('');

    return messages.map(msg => `<li><ul>${chars(msg)}</ul></li>`).join('');
};


const eachEntry = ([id, v]) => {
    document.getElementById(id).innerHTML =
        'messages' === id
            ? messages(v)
            : v;
};

document.addEventListener('sms77io_counter_input',
    ev => Object.entries(ev.detail).forEach(eachEntry));