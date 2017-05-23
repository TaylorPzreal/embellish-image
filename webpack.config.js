// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': './src/example/test.js',
  },
  output: {
    path: helpers.root('dist'),
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
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {

              return [
                require('precss'),
                require('autoprefixer'),
              ];
            
            },
          },
        }, {
          loader: 'sass-loader',
        }],
        publicPath: '/', // url路径处理
      }),
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {

              return [
                require('precss'),
                require('autoprefixer'),
              ];
            
            },
          },
        }],
        publicPath: '/', // url 路径处理
      }),
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({ // 可以自动注入 script, link标签
      template: 'src/example/index.html',
    }),
    // 提取出所有CSS为一个公共文件 主要用于生产环境
    new ExtractTextPlugin({
      filename: '[name].css',
      // disable: false,
      allChunks: true,
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
