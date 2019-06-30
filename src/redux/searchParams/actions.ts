import { SearchParam } from './types';

export function getCategories() {
  return {
    type: 'react-book-search/searchParams/GET_CATEGORIES'
  } as const;
}

export function categoriesReceived(categories: SearchParam[]) {
  return {
    type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
    payload: categories
  } as const;
}

export function categoriesError(error: string) {
  return {
    type: 'react-book-search/searchParams/CATEGORIES_ERROR',
    payload: error
  } as const;
}
