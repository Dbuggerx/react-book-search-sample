/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ParameterTypeRegistry, ParameterType } = require('cucumber-expressions');
const HomePage = require('./pages/home');

const registry = new ParameterTypeRegistry();

registry.defineParameterType(
  new ParameterType('route', /Home|Details/, null, route => {
    switch (route) {
      case 'Home':
        return new HomePage();
      default:
        throw new Error('Undefined route');
    }
  })
);

module.exports = registry;
