const path = require('path');
const getLoaders = require('../config/webpack/client/loaders');

module.exports = (baseConfig, env) => {
  baseConfig.module.rules = baseConfig.module.rules
    .filter(r => r.test.toString().indexOf('css') === -1)
    .concat(getLoaders(false, path.join(__dirname, '../src')));

  baseConfig.resolve.extensions.push('.ts', '.tsx');
  return baseConfig;
};
