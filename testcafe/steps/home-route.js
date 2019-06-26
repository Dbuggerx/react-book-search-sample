/* eslint-disable @typescript-eslint/no-var-requires */
const { When, Then } = require('cucumber');
const HomePage = require('../pages/home');

When(/^I navigate to the home route$/, async t => {
  const page = new HomePage('http://localhost:3001', t);
  // eslint-disable-next-line no-param-reassign
  t.ctx.page = page;
  await page.navigate();
});

Then(
  'I should see {int} book cards',
  /**
   * @param {TestController}
   * @param {number}
   */
  async (t, [bookCardCount]) => {
    await t.ctx.page.mainLayoutSelector();

    const bookCards = await t.ctx.page.getBookCards();
    await t.expect(bookCards.length).eql(bookCardCount);

    await t.ctx.page.prepareForScreenshot();
    await t.takeElementScreenshot(t.ctx.page.booksContainer);
  }
);
