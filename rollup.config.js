// 导入我们的第三方插件
import commonjs from 'rollup-plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import ts from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import dartSass from 'sass';
import path from 'path';
import json from '@rollup/plugin-json';

const lib = require("./package.json");
const year = new Date().getFullYear();
const banner = `// ${lib.name} v${lib.version} Copyright (c) ${year} ${lib.author}`;

export default {
  input: 'src/popper/index.ts',
  output: [
    // {
    //   file: 'dist/index.esm.js',
    //   format: 'esm',
    //   sourcemap: true,
    //   banner
    // },
    // {
    //   file: 'dist/popper-next.js',
    //   format: 'umd',
    //   sourcemap: true,
    //   name: 'createPopper',
    //   banner
    // },
    {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
      banner
    },
    {
      file: 'dist/popper-next.min.js',
      format: 'umd',
      sourcemap: true,
      name: 'createPopper',
      banner
    }
  ],
  plugins: [
    json(),
    babel({ babelHelpers: 'bundled' }),
    scss({ include: /\.scss$/, sass: dartSass }),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    commonjs(),
    terser()
  ]
}