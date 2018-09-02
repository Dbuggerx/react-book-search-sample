import express from 'express';
import bookData from './bookData.json';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  // fs.writeFileSync('./bookData.json', JSON.stringify(bookData.map(b => ({
  //   ...b,
  //   introduction: b.introduction.map(i => i.content).reduce((acc, cur) => {
  //     acc += cur; // eslint-disable-line
  //     return acc;
  //   })
  // }))));
  res.header('Access-Control-Allow-Origin', '*');
  res.json(bookData);
});

export default apiRouter;
