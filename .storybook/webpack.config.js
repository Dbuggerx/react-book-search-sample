const path = require('path');
const getLoaders = require('../config/webpack/client/loaders');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  });

  config.module.rules = config.module.rules.map(i =>
    i.test.source.includes('svg')
      ? { ...i, test: new RegExp(i.test.source.replace('svg|', '')) }
      : i
  );

  config.module.rules.push({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'svg-sprite-loader'
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
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
