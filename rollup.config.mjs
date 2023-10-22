import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import jsx from 'rollup-plugin-jsx'
import packageJson from "./package.json" assert { type: "json" };
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import css from "rollup-plugin-import-css";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            nodeResolve({
                extensions: ['.js', 'jsx']
            }),
            babel({
                babelHelpers: 'bundled',
                presets: ['@babel/preset-react'],
                extensions: ['.js']
            }),
            commonjs(),
            replace({
                preventAssignment: false,
                'process.env.NODE_ENV': '"development"'
            }),
            jsx( {factory: 'React.createElement'} ),
            postcss({
                plugins: [autoprefixer()],
                sourceMap: true,
                extract: true,
                minimize: true
            }),
            css(),
        ],
    },
];
