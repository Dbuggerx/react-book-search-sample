// @flow
import { createSelector } from 'reselect';
import type { State } from '../store';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

export default createSelector(
  (state: State) => (state.books ? state.books.currentPage : 1),
  (state: State) => (state.books ? state.books.books : []),
  (currentPage, books) => books || []
);
