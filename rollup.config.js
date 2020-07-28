import minify from 'rollup-plugin-babel-minify';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const isProd = (process.env.NODE_ENV || '').startsWith('prod');

const plugins = [
    typescript(),
];

if (isProd) {
    plugins.push(minify({comments: false}));
}

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
    plugins,
}];