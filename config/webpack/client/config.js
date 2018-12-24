const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

const isProductionMode = (process.env.NODE_ENV || 'development') === 'production';
const sourcePath = path.join(__dirname, '../../../src');
const distPath = path.join(__dirname, '../../../dist');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = '0.0.0.0';
const port = process.env.PORT || 5000;

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true
};

module.exports = {
  mode: isProductionMode ? 'production' : 'development',
  entry: {
    main: './browser.js'
  },
  output: {
    path: distPath,
    filename: isProductionMode ? '[name].[contenthash].bundle.js' : '[name].[hash].bundle.js' // @see: https://github.com/webpack/webpack.js.org/issues/2096
  },
  performance: {
    hints: isProductionMode ? 'warning' : false
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.s?css$/,
        //   chunks: 'all',
        //   enforce: true
        // }
      }
    }
  },
  module: {
    rules: loaders(isProductionMode, path.resolve(sourcePath))
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '../../../node_modules'), sourcePath]
  },
  plugins: plugins(isProductionMode, distPath),
  devtool: isProductionMode ? 'none' : 'inline-source-map',
  context: sourcePath,
  target: 'web',
  devServer: {
    contentBase: sourcePath,
    historyApiFallback: true,
    port,
    host,
    compress: isProductionMode,
    inline: !isProductionMode,
    hot: !isProductionMode,
    open: false,
    stats,
    hotOnly: true
  }
};
