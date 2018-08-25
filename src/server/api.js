import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({
    aaa: 1,
    bbb: {
      ccc: 'test'
    }
  });
});

export default apiRouter;
