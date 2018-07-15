// @flow
import type { Action, State } from './types';

const initialState: State = {
  pagedBooks: [],
  currentPage: 0,
  pageCount: 0
};

export default function booksReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'react-book-search/books/PAGED_BOOKS_RECEIVED':
      return {
        ...state,
        pagedBooks: [...state.pagedBooks, action.payload.books],
        currentPage: action.payload.page,
        pageCount: action.payload.pageCount
      };
    default:
      return state;
  }
}
