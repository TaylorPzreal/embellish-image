import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
// import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/embellish-image.js',
      format: 'umd',
      name: 'EmbellishImage',
      sourcemap: true
    },
    {
      file: 'dist/embellish-image.es.js',
      format: 'es',
      sourcemap: true
    }
  ],

  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    resolve({
      module: true,
      main: true
      // browser: true,
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    sass({
      processor: css =>
        postcss([autoprefixer])
          .process(css)
          .then(result => result.css)
    })
    // babel({exclude: 'node_modules/**'}),
    // uglify(),
  ],
  external: []

  // onwarn: [],
  // cache: []
};
