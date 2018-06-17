// @flow
import { createSelector } from 'reselect';
import type { State } from '../store';

export default createSelector(
  (state: State) => state.books.currentPage,
  (state: State) => state.books.pagedBooks,
  (
    currentPage: $PropertyType<$PropertyType<State, 'books'>, 'currentPage'>,
    pagedBooks: $PropertyType<$PropertyType<State, 'books'>, 'pagedBooks'>
  ) => (pagedBooks.length > 0 ? pagedBooks[currentPage] : [])
);
