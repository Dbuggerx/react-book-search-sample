import { Action, State } from './types';

const initialState: State = {
  categories: {
    loading: false,
    results: []
  },
  genres: {
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
    case 'react-book-search/searchParams/GET_GENRES':
      return {
        ...state,
        genres: {
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
    case 'react-book-search/searchParams/GENRES_RECEIVED':
      return {
        ...state,
        genres: {
          loading: false,
          results: action.payload
        }
      };
    case 'react-book-search/searchParams/CATEGORIES_ERROR':
      return {
        ...state,
        categories: {
          loading: false,
          results: [],
          error: action.payload
        }
      };
    case 'react-book-search/searchParams/GENRES_ERROR':
      return {
        ...state,
        genres: {
          loading: false,
          results: [],
          error: action.payload
        }
      };
    default:
      return state;
  }
}
