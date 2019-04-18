import { Epic } from 'redux-observable';
import { Reducer } from 'redux';
import booksReducer from '../../redux/books';
import searchReducer from '../../redux/searchParams';

type RouteState = {
  bookResults: ReturnType<typeof booksReducer>;
  searchParams: ReturnType<typeof searchReducer>;
};

export type RouteModule = {
  routeName: 'home';
  epic: Epic;
  reducer: Reducer<RouteState>;
  state: RouteState;
};
