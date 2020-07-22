import {setStyle} from './setStyle';
import {getStats} from './getStats';
import {CounterOptions} from './types';

export const COUNTER_INPUT_EVENT = 'sms77io_counter_input';

const onEvent = (options: CounterOptions) => {
    const eachTextarea = (textarea: HTMLTextAreaElement): void => {
        const onInput = () => {
            const detail = getStats(textarea);

            if (options.stats) {
                setStyle(textarea, detail);
            }

            document.dispatchEvent(
                new CustomEvent(COUNTER_INPUT_EVENT, {detail})
            );
        };

        if (options.stats) {
            textarea.insertAdjacentHTML(options.position,
                '<span style="position: absolute;"></span>');

            setStyle(textarea, getStats(textarea));
        }

        textarea.addEventListener('input', onInput);
    };

    return (Array.from(document.querySelectorAll(options.selector)) as HTMLTextAreaElement[])
        .forEach(eachTextarea);
};

export const listen = (options: CounterOptions) =>
    document.addEventListener(options.initEvent, (): void =>
        onEvent(options), {once: true});