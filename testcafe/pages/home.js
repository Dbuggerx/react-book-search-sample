/* eslint-disable @typescript-eslint/no-var-requires */
const { Selector } = require('testcafe');

class BookCard {
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

module.exports = class HomePage {
  constructor(appUrl, t) {
    this.url = `${appUrl}/home`;
    this.t = t;
  }

  navigate(t) {
    return t.navigateTo(this.url);
  }

  // eslint-disable-next-line class-methods-use-this
  async getBookCards() {
    const bookCardSelector = await Selector('.book-card')
      .with({ boundTestRun: this.t })
      .filterVisible();

    return Array.from(
      { length: await bookCardSelector.count },
      (_, idx) => new BookCard(bookCardSelector.nth(idx))
    );
  }
};
