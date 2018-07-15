// @flow
import type {
  Book,
  PagedBooksReceivedAction,
  GetBookPageAction
} from './types';

export function getBookPage(pageNumber: number): GetBookPageAction {
  return {
    type: 'react-book-search/books/GET_BOOK_PAGE',
    payload: {
      pageNumber
    }
  };
}

export function booksReturned(
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

