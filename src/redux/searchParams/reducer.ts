import { Action, State } from './types';

const initialState: State = {
  categories: {
    loading: false,
    results: []
  }
};

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'react-book-search/searchParams/GET_CATEGORIES':
      return {
        ...state,
        categories: {
          loading: true,
          results: []
        }
      };
    case 'react-book-search/searchParams/CATEGORIES_RECEIVED':
      return {
        ...state,
        categories: {
          loading: false,
          results: action.payload
        }
      };
    default:
      return state;
  }
}
