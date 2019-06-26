/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const { clearDir, getScreenshotsPath } = require('./utils');

const diffsPath = path.join(__dirname, 'screenshots', 'diffs');

function removeThumbnailsDir(browserDir) {
  const thumbsDir = path.join(browserDir, 'thumbnails');
  if (!fs.existsSync(thumbsDir)) return;
  clearDir(thumbsDir);
  fs.rmdirSync(thumbsDir);
}

function removeAllThumbnailsDirs() {
  const latestSnapshotsDir = getScreenshotsPath(false);
  const baseSnapshotsDir = getScreenshotsPath(true);
  fs.readdirSync(latestSnapshotsDir).forEach(browserDir => {
    removeThumbnailsDir(path.join(latestSnapshotsDir, browserDir));
    removeThumbnailsDir(path.join(baseSnapshotsDir, browserDir));
  });
}

function getPngData(imgPath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(imgPath)
      .on('error', reject)
      .pipe(new PNG())
      .on('parsed', function parsed() {
        resolve(this);
      });
  });
}

function getFileNamesFromDir(dir) {
  return fs.readdirSync(dir).filter(p => !fs.statSync(path.join(dir, p)).isDirectory());
}

function getScreenshotsPaths() {
  const latestSnapshotsDir = getScreenshotsPath(false);
  const baseSnapshotsDir = getScreenshotsPath(true);
  return fs
    .readdirSync(latestSnapshotsDir)
    .reduce(
      (acc, browserDir) =>
        acc.concat(
          getFileNamesFromDir(path.join(latestSnapshotsDir, browserDir)).map(fileName => [
            path.join(baseSnapshotsDir, browserDir, fileName),
            path.join(latestSnapshotsDir, browserDir, fileName)
          ])
        ),
      []
    );
}

async function compareImgs(imgPath1, imgPath2) {
  const imgs = await Promise.all([getPngData(imgPath1), getPngData(imgPath2)]);
  const diff = new PNG({ width: imgs[0].width, height: imgs[0].height });

  const mismatchedPixels = pixelmatch(
    imgs[0].data,
    imgs[1].data,
    diff.data,
    imgs[0].width,
    imgs[0].height,
    {
      threshold: 0.2
    }
  );

  if (mismatchedPixels === 0) return;

  const imgFileName = path.basename(imgPath1);
  const browserDir = path.basename(path.dirname(imgPath1));

  if (!fs.existsSync(path.join(diffsPath, browserDir)))
    fs.mkdirSync(path.join(diffsPath, browserDir));
  diff.pack().pipe(fs.createWriteStream(path.join(diffsPath, browserDir, imgFileName)));

  throw new Error(`${mismatchedPixels} mismatched pixels for "${imgFileName}"`);
}

async function diffScreenshots() {
  if (fs.existsSync(diffsPath)) clearDir(diffsPath);
  else fs.mkdirSync(diffsPath);
  await Promise.all(getScreenshotsPaths().map(r => compareImgs(...r)));
}

module.exports = function compareScreenshots() {
  removeAllThumbnailsDirs();
  return diffScreenshots();
};
