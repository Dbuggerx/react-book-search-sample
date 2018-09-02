// @flow
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import type { Action, PagedBooksReceivedAction, Book } from './types';
import type { State } from '../store';

const filterGetBookPageAction = filter(
  (value: Action) => value.type === ('react-book-search/books/GET_BOOK_PAGE': $PropertyType<Action, 'type'>)
);

function callApi(getJSON: (url: string) => Observable<Book[]>) {
  return mergeMap(() => getJSON('http://localhost:3001/api').pipe(
    map(response => ({
      type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
      payload: {
        books: response,
        page: 1,
        pageCount: 1
      }
    }))
  ));
}

function getBookPageEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { getJSON }: { getJSON: (url: string) => Observable<Book[]> }
): Observable<PagedBooksReceivedAction> {
  return action$.pipe(
    filterGetBookPageAction,
    callApi(getJSON)
  );
}

export default combineEpics(getBookPageEpic);
