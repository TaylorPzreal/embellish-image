import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/index.min.js',
      name: 'EmbellishBundle',
      format: 'iife',
      sourcemap: false,
      globals: {
        'd3': 'd3',
      },
    }
  ],

  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
  external: [],
  watch: {
    include: 'src/**'
  }

  // onwarn: [],
  // cache: []
};
