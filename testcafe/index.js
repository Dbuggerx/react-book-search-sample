/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, no-console */
const createTestCafe = require('gherkin-testcafe');
const utils = require('./utils');
const app = require('../server-dist/server.bundle');

const port = 3001;
const addr = 'localhost';
const isBaseScreenshot = process.argv.slice(2).includes('--base-screenshots');
const isLive = process.argv.slice(2).includes('--live');
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

      const runner = isLive ? testcafe.createLiveModeRunner() : testcafe.createRunner();
      return (
        runner
          .src([`${__dirname}/steps/**/*.js`, `${__dirname}/features/**/*.feature`])
          .browsers(['chrome:headless'])
          .screenshots(
            utils.getScreenshotsPath(isBaseScreenshot),
            true,
            '${BROWSER}/${FIXTURE}-${TEST}-${FILE_INDEX}' // eslint-disable-line
          )
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
      require('./compare-imgs');
    })
    .catch(console.error)
    .finally(() => {
      testcafe.close();
      server.close();
    });
});
