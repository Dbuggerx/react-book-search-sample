/* eslint-disable import/no-extraneous-dependencies, global-require */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProductionMode = (process.env.NODE_ENV || 'development') === 'production';
const sourcePath = path.join(__dirname, '../../../src');
const distPath = path.join(__dirname, '../../../server-dist/');

// const nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(x => ['.bin'].indexOf(x) === -1)
//   .forEach(mod => {
//     nodeModules[mod] = `commonjs ${mod}`;
//   });

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  context: sourcePath,
  entry: './server/index.js',
  output: {
    path: distPath,
    filename: 'server.bundle.js'
  },
  // externals: nodeModules,
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new CleanWebpackPlugin([distPath], { root: process.cwd() }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      SERVER: true
    })
    // new webpack.BannerPlugin({
    //   banner: 'require("source-map-support").install();',
    //   raw: true,
    //   entryOnly: false
    // })
  ],
  // devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: 'config/linters/.eslintrc.json',
            failOnError: true
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'transform-object-rest-spread',
                {
                  useBuiltIns: true
                }
              ],
              'syntax-dynamic-import',
              'transform-runtime'
            ],
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: [
                      'last 2 versions',
                      'ios_saf >= 8',
                      'not IE <= 10',
                      'chrome >= 49',
                      'firefox >= 49',
                      '> 1%'
                    ]
                  },
                  debug: false,
                  loose: true,
                  modules: false,
                  useBuiltIns: true
                }
              ],
              'react'
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              sourceMap: !isProductionMode,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProductionMode,
              includePaths: ['node_modules']
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  }
};
