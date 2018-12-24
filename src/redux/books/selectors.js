// @flow
import { createSelector } from 'reselect';
import type { State } from '../store';
import type { Book } from './types';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

export default createSelector<State, *, Book[], Book[]>(
  (state: State) => (state.home ? state.home.books : []),
  books => books
);
