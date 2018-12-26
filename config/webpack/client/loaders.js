/* eslint-disable import/no-extraneous-dependencies, global-require */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getLoaders(isProductionMode, srcPath) {
  return [
    {
      enforce: 'pre',
      test: /\.(js|jsx)$/,
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
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      include: [srcPath],
      use: {
        loader: 'babel-loader',
        options: {
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
                debug: !isProductionMode,
                modules: false,
                useBuiltIns: 'usage'
              }
            ],
            '@babel/preset-react',
            [
              '@babel/preset-typescript'
            ]
          ],
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        }
      }
    },
    // {
    //   test: /\.js$/,
    //   use: ['source-map-loader'],
    //   enforce: 'pre'
    // },
    {
      test: /\.s?css$/,
      include: [srcPath],
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
      include: [srcPath],
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
      include: [srcPath],
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 10000
          }
        }
      ]
    }
  ];
};
