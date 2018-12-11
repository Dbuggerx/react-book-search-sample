// @flow
import { createSelector } from 'reselect';
import type { State } from '../store';
import type { BookDetail } from './types';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

export default createSelector<State, *, ?BookDetail, *>(
  (state: State) => (state.bookDetail ? state.bookDetail.bookDetail : null),
  bookDetail => bookDetail
);
