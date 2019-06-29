/* eslint-disable @typescript-eslint/no-var-requires */
const { Selector, ClientFunction } = require('testcafe');
const BasePage = require('./base-page');

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

module.exports = class HomePage extends BasePage {
  constructor() {
    super('home', '.main-layout');
  }

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

  get booksContainer() {
    return Selector('.main-layout__books').with({ boundTestRun: this.t });
  }
};
