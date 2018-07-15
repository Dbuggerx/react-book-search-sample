// @flow
import type { Action, State } from './types';

const initialState: State = {
  category: '',
  genre: '',
  term: ''
};

export default function searchReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'react-book-search/search/SEARCH_UPDATED':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
