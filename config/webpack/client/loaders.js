/* eslint-disable import/no-extraneous-dependencies,
  global-require, @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getLoaders(isProductionMode, srcPath) {
  return [
    {
      enforce: 'pre',
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      include: [srcPath],
      use: {
        loader: 'eslint-loader',
        options: {
          configFile: 'config/linters/.eslintrc.json',
          failOnError: true
        }
      }
    },
    {
      test: /\.jsx?$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack']
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      include: [srcPath],
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties'
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                debug: false,
                modules: false,
                useBuiltIns: 'usage',
                corejs: '3'
              }
            ],
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        }
      }
    },
    {
      test: /\.s?css$/,
      use: isProductionMode
        ? [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: !isProductionMode,
              modules: false,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProductionMode,
              plugins() {
                return [
                  require('autoprefixer')({
                    grid: true
                  })
                ];
              }
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
        : [
          'style-loader',
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProductionMode,
              plugins() {
                return [
                  require('autoprefixer')({
                    grid: true
                  })
                ];
              }
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
          loader: 'svg-sprite-loader',
          options: {
            // esModule: false
            // extract: true,
            // spriteFilename: '/img/icon.svg'
          }
        },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { removeTitle: true },
              { convertColors: { shorthex: false } },
              { convertPathData: false }
            ]
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      include: [srcPath],
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
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }
  ];
};
