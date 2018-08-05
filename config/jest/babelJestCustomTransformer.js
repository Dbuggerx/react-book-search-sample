// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').createTransformer({
  plugins: ['transform-es2015-modules-commonjs', ['transform-object-rest-spread',
    {
      useBuiltIns: true
    }
  ]],
  presets: ['react']
});
