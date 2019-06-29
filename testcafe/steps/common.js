/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */
const { Given, When, Then, BeforeAll } = require('cucumber');
const { RequestLogger } = require('testcafe');

BeforeAll(async ctx => {
  ctx.baseUrl = 'http://localhost:3001';
});

Given("I'm logging server responses", async t => {
  const logger = RequestLogger(new RegExp(t.fixtureCtx.baseUrl), {
    logResponseBody: true,
    stringifyResponseBody: true
  });
  t.ctx.requestLogger = logger;
  await t.addRequestHooks(logger);
});

/**
 * @typedef { import('../pages/base-page') } BasePage
 */

When(
  'I go to the {route} route',
  /**
   * @type {(t: TestController, route: [BasePage]) => void}
   */
  async (t, [route]) => {
    t.ctx.page = route;
    await route.open(t.fixtureCtx.baseUrl, t);
  }
);

Then('some server response contains the Redux state', async t => {
  /** @type { ReturnType<RequestLogger> } */
  const logger = t.ctx.requestLogger;

  /** @type {BasePage} */
  const currentPage = t.ctx.page;

  await t
    .expect(
      logger.contains(
        record =>
          typeof record.response.body === 'string' &&
          new RegExp(
            `window.__PRELOADED_STATE__\\s*=\\s*\\{.+"${
              currentPage.routeName
            }":\\{.+\\}.+\\}`
          ).test(record.response.body)
      )
    )
    .ok();
});

Then('some server response contains', async (t, _, table) => {
  /** @type { ReturnType<RequestLogger> } */
  const logger = t.ctx.requestLogger;

  // eslint-disable-next-line no-restricted-syntax
  for (const { pattern } of table.hashes())
    // eslint-disable-next-line no-await-in-loop
    await t
      .expect(
        logger.contains(
          record =>
            typeof record.response.body === 'string' &&
            new RegExp(pattern).test(record.response.body)
        )
      )
      .ok();
});
