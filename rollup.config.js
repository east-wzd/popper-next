// 导入我们的第三方插件
import commonjs from 'rollup-plugin-commonjs';
import VuePlugin from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import ts from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import dartSass from 'sass';
import path from 'path';

export default {
  input: 'src/popper/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      name: 'createPopper'
    },
    {
      file: 'dist/popper-next.min.js',
      format: 'umd',
      sourcemap: true,
      name: 'createPopper'
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    scss({ include: /\.scss$/, sass: dartSass }),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    VuePlugin(),
    commonjs(),
    terser()
  ],
  external: ['vue']
}