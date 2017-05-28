import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/js/embellish-image.js',

  // format: 'iife', // cjs , es , iife, 
  // dest: 'dist/js/embellish-image.browser.js',

  // format: 'es',
  // dest: 'dist/js/embellish-image.es.js',

  format: 'cjs',
  dest: 'dist/js/embellish-image.js',

  moduleName: 'EmbellishImage',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({exclude: 'node_modules/**'}),
    // uglify(),
  ],
};
