// @flow
import type {
  Book,
  SearchUpdatedAction,
  PagedBooksReceivedAction,
  GetBookPageAction
} from './types';

export function getBookPage(pageNumber: number): GetBookPageAction {
  return {
    type: 'react-book-search/home/GET_BOOK_PAGE',
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
    type: 'react-book-search/home/PAGED_BOOKS_RECEIVED',
    payload: {
      books,
      page,
      pageCount
    }
  };
}

export function searchUpdated(
  category: string,
  genre: string,
  term: string
): SearchUpdatedAction {
  return {
    type: 'react-book-search/home/SEARCH_UPDATED',
    payload: {
      category,
      genre,
      term
    }
  };
}
