const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getStandardPlugins(isProduction) {
  return [
    new StyleLintPlugin({
      configFile: 'config/linters/.stylelintrc',
      syntax: 'scss'
    }),
    new ExtractTextPlugin({
      filename: isProduction ? '[chunkhash].[name].css' : '[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      BROWSER: 'true'
    }),
    new HtmlWebpackPlugin({
      title: 'React book search sample - By Danilo Cestari',
      template: './index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: 'img',
      to: 'img'
    }])
  ];
}

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
];

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
];

module.exports = function (isProductionMode) {
  return isProductionMode ?
    getStandardPlugins(true).concat(prodPlugins) :
    getStandardPlugins(false).concat(devPlugins)
}