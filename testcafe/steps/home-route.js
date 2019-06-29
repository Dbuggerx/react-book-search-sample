/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
const { Then } = require('cucumber');

Then(
  'I should see {int} book cards',
  /**
   * @type {(t: TestController, bookCardCount: [number]) => void}
   */
  async (t, [bookCardCount]) => {
    const bookCards = await t.ctx.page.getBookCards();
    await t.expect(bookCards.length).eql(bookCardCount);

    await t.ctx.page.prepareForScreenshot();
    await t.takeElementScreenshot(t.ctx.page.booksContainer);
  }
);
