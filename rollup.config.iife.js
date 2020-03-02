import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/index.min.js',
      name: 'EmbellishBundle',
      format: 'iife',
      sourcemap: false
    }
  ],

  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: true,
    }),
    terser(),
  ],
  external: [],
  watch: {
    include: 'src/**'
  }

  // onwarn: [],
  // cache: []
};
