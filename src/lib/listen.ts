import {setStyle} from './setStyle';
import {CounterOptions} from '../index';

export const listen = ({initEvent, position, selector}: CounterOptions) =>
    document.addEventListener(initEvent, (): void =>
        (Array.from(document.querySelectorAll(selector)) as HTMLTextAreaElement[])
            .forEach((textarea: HTMLTextAreaElement): void => {
                textarea.insertAdjacentHTML(position, '<span style="position: absolute;"></span>');

                setStyle(textarea);

                textarea.addEventListener('input', () => setStyle(textarea));
            }), {once: true});