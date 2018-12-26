// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').createTransformer({
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
});
