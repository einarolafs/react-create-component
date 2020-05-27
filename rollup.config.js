import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
    file: 'dist/bundle.js',
    format: 'cjs',
		sourcemap: true
	},
	plugins: [babel({ babelHelpers: 'bundled' })]
};
