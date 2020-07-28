import {setStyle} from './setStyle';
import {getDetails} from './getDetails';
import {CounterOptions} from './types';
import {COUNTER_INPUT_EVENT} from './constants';

const onEvent = (options: CounterOptions) => {
    const eachTextarea = (textarea: HTMLTextAreaElement): void => {
        const onInput = () => {
            const detail = getDetails(textarea);

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

            setStyle(textarea, getDetails(textarea));
        }

        textarea.addEventListener('input', onInput);
    };

    return (Array.from(document.querySelectorAll(options.selector)) as HTMLTextAreaElement[])
        .forEach(eachTextarea);
};

export const listen = (options: CounterOptions) =>
    document.addEventListener(options.initEvent, (): void =>
        onEvent(options), {once: true});