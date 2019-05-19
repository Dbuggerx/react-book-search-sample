/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
// const createTestCafe = require('testcafe');
const createTestCafe = require('gherkin-testcafe');
const utils = require('./utils');
/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('../server-dist/server.bundle');

const port = 3001;
const addr = '0.0.0.0';
const isBaseScreenshot = process.argv.slice(2).includes('--base-screenshots');
let testcafe = null;

const server = app.listen(port, addr, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`Listening at http://${addr}:${port}`);

  createTestCafe()
    .then(tc => {
      testcafe = tc;
      return (
        testcafe
          .createRunner()
          // .src(`${__dirname}/tests`)
          .src([`${__dirname}/steps/**/*.js`, `${__dirname}/features/**/*.feature`])
          .browsers(['firefox'])
          .screenshots(
            utils.getScreenshotsPath(isBaseScreenshot),
            true,
            '${BROWSER}/${FIXTURE}-${TEST}-${FILE_INDEX}' // eslint-disable-line
          )
          // .concurrency(3)
          .run({
            selectorTimeout: 20000,
            pageLoadTimeout: 10000,
            quarantineMode: true
          })
      );
    })
    .then(failedCount => {
      console.log(`Tests failed: ${failedCount}`);
      return failedCount;
    })
    .then(failedCount => {
      if (failedCount > 0) return;
      if (isBaseScreenshot) return;
      console.log('Comparing images...');
      // eslint-disable-next-line global-require
      // require('./compare-imgs');
    })
    .catch(console.error)
    .finally(() => {
      testcafe.close();
      server.close();
    });
});
