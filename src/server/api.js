// @flow
import express from 'express';
import type { $Request, $Response } from 'express';
import * as dataMock from './data-mock';

const apiRouter = express.Router();

apiRouter.get('/books', (req: $Request, res: $Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('access-control-expose-headers', 'x-total-count');
  res.header('X-total-count', dataMock.availablePages.toString());
  res.json(
    dataMock.getPagedBooksSearch({
      page: req.query.page ? parseInt(req.query.page, 10) : 1,
      category: Array.isArray(req.query.category) ? req.query.category[0] : req.query.category,
      genre: Array.isArray(req.query.genre) ? req.query.genre[0] : req.query.genre,
      query: Array.isArray(req.query.query) ? req.query.query[0] : req.query.query
    })
  );
});

export default apiRouter;
