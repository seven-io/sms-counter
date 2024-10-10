import './counter.css';
import type {CounterOptions} from "../lib/types";
import '../'
import Color from "./Color";

export const createCounter = (props: CounterOptions) => {
    document.addEventListener('DOMContentLoaded', () =>
        Object.keys(Color)
            .filter(key => typeof Color[key] !== 'function')
            .forEach(key => document.getElementById(key).style.backgroundColor = Color[key])
    );

    return `
<h1>SMS Counter by seven.io</h1>

<h2>Message</h2>

<input aria-label='SMS Counter Example' data-seven-sms/>

<h2>Details</h2>

<table>
    <tr>
        <th>Encoding</th>
        <td id='encoding'></td>
    </tr>
    <tr>
        <th>Character Count</th>
        <td id='charCount'></td>
    </tr>
    <tr>
        <th>SMS Count</th>
        <td id='msgCount'></td>
    </tr>
    <tr>
        <th>SMS Character Limit</th>
        <td id='charLimit'></td>
    </tr>
</table>

<h2>Messages</h2>

<ul id='messages'></ul>

<h3>Legend</h3>

<dl>
    <dt id='escape'></dt>
    <dd>Escape character 0x1B required to access these characters:
        <code>| ^ € { } [ ] ~</code>
    </dd>

    <dt id='notGsm'></dt>
    <dd>Force Unicode encoding as character is not present in GSM charset</dd>

    <dt id='unicode'></dt>
    <dd>Unicode encoded character present in GSM charset</dd>

    <dt id='regular'></dt>
    <dd>Regular 7-bit character present in GSM charset</dd>

    <dt id='udh'></dt>
    <dd>User Defined Header (UDH) required for multipart sms</dd>
</dl>
`
};
