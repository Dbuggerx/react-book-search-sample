// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').createTransformer({
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
        modules: 'commonjs'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
});
