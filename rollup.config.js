import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: {
    index: 'src/index.ts',
    embellish: 'src/embellish.ts',
    file: 'src/file.ts',
    util: 'src/util.ts'
  },

  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true
    }
  ],

  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    terser(),
  ],
  external: [],
  watch: {
    include: 'src/**'
  }

  // onwarn: [],
  // cache: []
};
