import express from 'express';
import * as dataMock from './data-mock';

const apiRouter = express.Router();

apiRouter.get('/books', (req, res) => {
  const result = dataMock.getPagedBooksSearch({
    page: req.query.page ? parseInt(req.query.page, 10) : 1,
    category: Array.isArray(req.query.category) ? req.query.category[0] : req.query.category,
    genre: Array.isArray(req.query.genre) ? req.query.genre[0] : req.query.genre,
    query: Array.isArray(req.query.query) ? req.query.query[0] : req.query.query
  });

  res.header('X-total-count', result.totalPages.toString());
  res.json(result.books);
});

apiRouter.param('bookId', (req, res, next, id: string) => {
  const result = dataMock.getBookById(id);
  res.locals.book = result;
  next();
});

apiRouter.get('/books/:bookId', (req, res) => {
  res.json(res.locals.book);
});

apiRouter.patch('/books/:bookId', (req, res) => {
  res.locals.book.liked = req.body.liked;
  res.locals.book.likes += req.body.liked ? 1 : -1;
  res.json(res.locals.book);
});

apiRouter.get('/searchCategories', (req, res) => {
  res.json(dataMock.bookCategories);
});

apiRouter.get('/searchGenres', (req, res) => {
  res.json(dataMock.bookGenres);
});

export default apiRouter;
