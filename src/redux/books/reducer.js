// @flow
import type { Action, State } from './types';

const initialState: State = {
  books: [],
  currentPage: 0,
  pageCount: 0
};

export default function booksReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'react-book-search/books/GET_BOOK_PAGE':
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case 'react-book-search/books/PAGED_BOOKS_RECEIVED':
      return {
        ...state,
        books: action.payload.books,
        pageCount: action.payload.pageCount
      };
    default:
      return state;
  }
}
