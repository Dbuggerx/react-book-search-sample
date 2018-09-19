/* eslint-disable import/no-extraneous-dependencies, global-require */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getLoaders(isProductionMode) {
  return [
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
            '@babel/preset-flow'
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProductionMode,
              modules: false,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
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
  ];
};
