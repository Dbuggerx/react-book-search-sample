/* eslint-disable @typescript-eslint/no-var-requires */
const { When, Then } = require('cucumber');
const HomePage = require('../pages/home');

/**
 * @typedef import("testcafe").TestController TestController
 */

When(
  /^I navigate to the home route$/,
  /** @type {(t: TestController} */ async t => {
    const page = new HomePage('http://localhost:3001', t);
    // eslint-disable-next-line no-param-reassign
    t.ctx.page = page;
    await page.navigate(t);
  }
);

Then(
  /^I should see (\d+) book cards$/,
  /** @type {(t: TestController, bookCardCount: number) => void} */
  async (t, [bookCardCount]) => {
    const bookCards = await t.ctx.page.getBookCards();
    await t.expect(bookCards.length).eql(parseInt(bookCardCount));
  }
);
