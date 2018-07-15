// @flow
import type { State } from '../store';

export const category = (state: State) => state.search.category;
export const genre = (state: State) => state.search.genre;
export const search = (state: State) => state.search.term;

export default {
  category: (state: State) => state.search.category,
  genre: (state: State) => state.search.genre,
  search: (state: State) => state.search.term
};
