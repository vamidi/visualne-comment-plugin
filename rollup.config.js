import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import sass from 'rollup-plugin-sass';
import { eslint } from 'rollup-plugin-eslint';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const bundle = 'visualne-comment-plugin';
const globals = {
    'visualne': 'visualne',
};

module.exports = {
    // mode: 'development',
    input: 'src/index.ts',
    external: ['visualne'],
    globals: {
        'visualne': 'VisualNE',
    },
    output: [
        {
            name: 'VisualNE',
            sourceMap: true,
            file: `dist/${bundle}.common.js`,
            format: 'cjs',
            exports: 'named',
            globals,
        },
        {
            name: 'VisualNE',
            sourceMap: true,
            file: `dist/${bundle}.esm.js`,
            format: 'esm',
            exports: 'named',
            globals,
        },
    ],
    plugins: [
        sourcemaps(),
        eslint({
            exclude: [
                'src/**.scss',
                'src/**.css',
                'src/**.less',
            ]
        }),
        resolve({
            mainFields: ['module', 'main', 'jsnext:main', 'browser'],
            extensions
        }),
        babel({
            exclude: './node_modules/**',
            extensions,
        }),
        sass({
            insert: true
        })
    ]
};
