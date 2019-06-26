/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
const { Given, When, Then } = require('cucumber');
const { RequestLogger } = require('testcafe');
const HomePage = require('../pages/home');

const url = 'http://localhost:3001';

Given("I'm logging server responses", async t => {
  const logger = RequestLogger(new RegExp(url), {
    logResponseBody: true,
    stringifyResponseBody: true
  });
  t.ctx.requestLogger = logger;
  await t.addRequestHooks(logger);
});

When(/^I navigate to the home route$/, async t => {
  const page = new HomePage(url, t);
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

Then('some server response contains the Redux state', async t => {
  await t.ctx.page.mainLayoutSelector();

  /** @type { ReturnType<RequestLogger> } */
  const logger = t.ctx.requestLogger;

  await t
    .expect(
      logger.contains(
        record =>
          typeof record.response.body === 'string' &&
          /window.__PRELOADED_STATE__\s*=\s*\{.+"home":\{.+\}.+\}/.test(
            record.response.body
          )
      )
    )
    .ok();
});
