/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

function clearDir(dirPath) {
  return fs.readdirSync(dirPath).reduce((acc, cur) => {
    const joinedPath = path.join(dirPath, cur);
    if (fs.statSync(joinedPath).isDirectory()) {
      clearDir(joinedPath);
      fs.rmdirSync(joinedPath);
    } else fs.unlinkSync(joinedPath);
    return joinedPath;
  }, []);
}

module.exports = {
  getScreenshotsPath(isBase) {
    return path.join(__dirname, 'screenshots', isBase ? 'base' : 'latest');
  },
  clearDir
};
