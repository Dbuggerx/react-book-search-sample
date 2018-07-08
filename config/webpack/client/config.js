const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

const isProductionMode =
  (process.env.NODE_ENV || 'development') === 'production';
const sourcePath = path.join(__dirname, '../../../src');
const distPath = path.join(__dirname, '../../../dist');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

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
    main: './index.js'
  },
  output: {
    path: distPath,
    filename: '[chunkhash].[name].bundle.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: loaders(isProductionMode)
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '../../../node_modules'), sourcePath]
  },
  plugins: plugins(isProductionMode, distPath),
  devtool: isProductionMode ? 'none' : 'inline-source-map',
  context: sourcePath,
  target: 'web',
  stats: 'errors-only',
  devServer: {
    contentBase: sourcePath,
    historyApiFallback: true,
    port,
    host,
    compress: isProductionMode,
    inline: !isProductionMode,
    hot: !isProductionMode,
    open: false,
    stats
  }
};
