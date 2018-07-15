// @flow
import type {
  SearchUpdatedAction
} from './types';

// eslint-disable-next-line
export function searchUpdated(
  category: string,
  genre: string,
  term: string
): SearchUpdatedAction {
  return {
    type: 'react-book-search/search/SEARCH_UPDATED',
    payload: {
      category,
      genre,
      term
    }
  };
}
