/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const devPlugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()];

const prodPlugins = distPath => [
  new CleanWebpackPlugin([distPath], { root: process.cwd() }),
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ManifestPlugin()
];

module.exports = function getPlugins(isProduction, distPath) {
  return (isProduction ? prodPlugins(distPath) : devPlugins).concat([
    new CopyWebpackPlugin([
      {
        from: 'img',
        to: `${distPath}/img`
      }
    ]),
    new StyleLintPlugin({
      configFile: 'config/linters/.stylelintrc.json',
      syntax: 'scss'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css' // @see: https://survivejs.com/webpack/optimizing/adding-hashes-to-filenames/
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      SERVER: false
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
        minifyURLs: true
      },
      inject: true
    })
  ]);
};
