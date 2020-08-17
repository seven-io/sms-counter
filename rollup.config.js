import 'core-js';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const extensions = ['.ts', '.js',];
const isProd = (process.env.NODE_ENV || '').startsWith('prod');
const plugins = [
    typescript(),
];

if (isProd) {
    plugins.push(
        commonjs(),
        terser({parse: {html5_comments: false,}}),
        babel({
            babelHelpers: 'bundled',
            exclude: 'src/*.spec.*',
            extensions,
            include: 'src/**/*',
        }),
    );
}

export default {
    input: 'src/index.ts',
    output: {
        exports: 'named',
        file: pkg.main,
        format: 'umd',
        name: 'Sms77Counter',
    },
    plugins,
};