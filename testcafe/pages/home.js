/* eslint-disable @typescript-eslint/no-var-requires */
const { Selector, ClientFunction } = require('testcafe');

class BookCard {
  /**
   * @param {SelectorAPI} selector
   */
  constructor(selector) {
    this.selector = selector;
  }

  get title() {
    return this.selector.find('.book-card__title');
  }

  get author() {
    return this.selector.find('.book-card__author');
  }

  get likeAction() {
    return this.selector.withAttribute('dataTestid', 'like-button');
  }

  get relativeDate() {
    return this.selector.withAttribute('dataTestid', 'relative-date');
  }
}

const removeImagesOnAllCards = ClientFunction(() =>
  document.querySelectorAll('.book-card').forEach(c => {
    // eslint-disable-next-line no-param-reassign
    c.style = 'background-image: none; background: green';
  })
);

module.exports = class HomePage {
  /**
   * @param {string} appUrl
   * @param {TestController} t
   */
  constructor(appUrl, t) {
    this.url = `${appUrl}/home`;
    this.t = t;
  }

  navigate() {
    return this.t.navigateTo(this.url);
  }

  get mainLayoutSelector() {
    return Selector('.main-layout').with({ boundTestRun: this.t });
  }

  // eslint-disable-next-line class-methods-use-this
  async getBookCards() {
    const bookCardSelector = await Selector('.book-card').with({ boundTestRun: this.t });

    return Array.from(
      { length: await bookCardSelector.count },
      (_, idx) => new BookCard(bookCardSelector.nth(idx))
    );
  }

  async prepareForScreenshot() {
    await this.t.resizeWindow(1280, 800);
    await removeImagesOnAllCards.with({ boundTestRun: this.t })();
  }
};
