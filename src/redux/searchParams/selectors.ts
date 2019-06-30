import { createSelector } from 'reselect';
import { State } from '../store';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

const searchParamsSelector = (state: State) =>
  (state.home ? state.home.searchParams : null);

export const categories = createSelector(
  searchParamsSelector,
  searchParams => (searchParams ? searchParams.categories : {
    loading: false,
    results: []
  })
);

export const genres = createSelector(
  searchParamsSelector,
  searchParams => (searchParams ? searchParams.genres : {
    loading: false,
    results: []
  })
);
