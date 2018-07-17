// @flow
import type {
  Book,
  PagedBooksReceivedAction,
  GetBookPageAction
} from './types';

function getBookPage(pageNumber: number): GetBookPageAction {
  return {
    type: 'react-book-search/books/GET_BOOK_PAGE',
    payload: {
      pageNumber
    }
  };
}

function booksReturned(
  books: Book[],
  page: number,
  pageCount: number
): PagedBooksReceivedAction {
  return {
    type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
    payload: {
      books,
      page,
      pageCount
    }
  };
}

export default {
  getBookPage,
  booksReturned
};
