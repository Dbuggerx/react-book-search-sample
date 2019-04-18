import {
  GetCategoriesAction,
  CategoriesReceivedAction,
  CategoriesErrorAction,
  SearchParam
} from './types';

export function getCategories(): GetCategoriesAction {
  return {
    type: 'react-book-search/searchParams/GET_CATEGORIES'
  };
}

export function categoriesReceived(categories: SearchParam[]): CategoriesReceivedAction {
  return {
    type: 'react-book-search/searchParams/CATEGORIES_RECEIVED',
    payload: categories
  };
}

export function categoriesError(error: string): CategoriesErrorAction {
  return {
    type: 'react-book-search/searchParams/CATEGORIES_ERROR',
    payload: error
  };
}
