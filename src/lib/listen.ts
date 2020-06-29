import {setStyle} from './setStyle';
import {CounterOptions} from '../index';
import {getStats} from './getStats';

export const listen = ({initEvent, position, selector}: CounterOptions) =>
    document.addEventListener(initEvent, (): void =>
        (Array.from(document.querySelectorAll(selector)) as HTMLTextAreaElement[])
            .forEach((textarea: HTMLTextAreaElement): void => {
                textarea.insertAdjacentHTML(position, '<span style="position: absolute;"></span>');

                setStyle(textarea, getStats(textarea));

                textarea.addEventListener('input', () => {
                    const stats = getStats(textarea);

                    setStyle(textarea, stats);

                    document.dispatchEvent(new CustomEvent('sms77io_counter_input', {detail: stats}));
                });
            }), {once: true});