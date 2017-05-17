// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': 'src/example/test.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      use: 'eslint-loader',
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {
              modules: false, // tree shinking
              loose: false,
              cacheDirectory: true, // 添加缓存
            }],
          ],
        },
      }],
      exclude: /node_modules/,
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({ // 可以自动注入 script, link标签
      template: 'src/example/index.html',
    }),
  ],

  devServer: {
    compress: true, // gzip for everything served.
    // historyApiFallback: true, // HTML5 history API ,所有的跳转将指向index.html
    stats: 'minimal', // errors-only , minimal, 'normal', 'none'
    // hot: true, //热加载
    // clientLogLevel: 'info', // Possible values are none, error, warning or info (default).
    // host: options.host,
    // lazy: true, // the dev-server will only compile the bundle when it gets requested
    port: 3000,
    // publicPath: `http://${options.host}:${options.port}/`,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
