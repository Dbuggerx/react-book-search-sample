/* eslint-disable @typescript-eslint/no-var-requires */
const { Selector } = require('testcafe');

module.exports = class BasePage {
  /**
   * @param {string} routeName
   * @param {string} mainCssSelector
   */
  constructor(routeName, mainCssSelector) {
    this.routeName = routeName;
    this.mainCssSelector = mainCssSelector;
  }

  /**
   * @param {string} baseUrl
   * @param {TestController} t
   */
  async open(baseUrl, t) {
    this.t = t;
    await this.t.navigateTo(`${baseUrl}/${this.routeName}`);
    await Selector(this.mainCssSelector).with({ boundTestRun: this.t })();
  }
};
