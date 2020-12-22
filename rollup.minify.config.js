import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from "rollup-plugin-terser";
import { eslint } from 'rollup-plugin-eslint';
import sass from "rollup-plugin-sass";

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const production = !process.env.ROLLUP_WATCH;
const bundle = 'visualne-comment-plugin';

module.exports = {
    // mode: 'development',
    input: 'src/index.ts',
    external: ['visualne'],
    output: [
        {
            name: 'VisualNE',
            file: `dist/${bundle}.min.js`,
            format: 'umd',
            globals: {
                'visualne': 'visualne',
            },
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
        }),
        production && terser(),
    ]
};
