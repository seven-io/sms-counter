import minify from 'rollup-plugin-babel-minify';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [{
    input: 'src/index.ts',
    output: [
        {
            exports: 'named',
            file: pkg.main,
            format: 'umd',
            name: 'Sms77Counter',
        },
    ],
    plugins: [
        typescript(),
        minify({comments: false}),
    ],
}];