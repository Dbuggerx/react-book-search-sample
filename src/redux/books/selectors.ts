import { createSelector } from 'reselect';
import { State } from '../store';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

export const bookResults = (state: State) =>
  (state.home && state.home.bookResults ? state.home.bookResults : {
    books: [],
    loading: false,
    error: undefined
  });

export const loading = createSelector(
  bookResults,
  results => (results.loading)
);

export const error = createSelector(
  bookResults,
  results => (results.error)
);
