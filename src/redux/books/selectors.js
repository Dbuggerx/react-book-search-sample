// @flow
import { createSelector } from 'reselect';
import type { State } from '../store';

export default createSelector(
  (state: State) => (state.books ? state.books.currentPage : 0),
  (state: State) => (state.books ? state.books.pagedBooks : []),
  (
    currentPage,
    pagedBooks
  ) => (pagedBooks.length > 0 ? pagedBooks[currentPage] : [])
);
