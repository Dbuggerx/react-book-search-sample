// @flow
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import type { AjaxCreationMethod } from 'rxjs/ajax';
import type { Action, PagedBooksReceivedAction } from './types';
import type { State } from '../store';

const filterGetBookPageAction = filter(
  (value: Action) => value.type === ('react-book-search/books/GET_BOOK_PAGE': $PropertyType<Action, 'type'>)
);

function callApi(ajax: AjaxCreationMethod) {
  return mergeMap((value: Action) => {
    const params = Object.entries(value.payload).reduce(
      (agg, cur) => (cur[1] ? `${agg + (agg.length > 0 ? '&' : '')}${cur[0]}=${String(cur[1])}` : agg),
      ''
    );
    return ajax({ url: `http://localhost:3001/api/books?${params}` }).pipe(
      map(result => ({
        type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
        payload: {
          books: result.response,
          pageCount: parseInt(result.xhr.getResponseHeader('x-total-count'), 10)
        }
      }))
    );
  });
}

function getBookPageEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<PagedBooksReceivedAction> {
  return action$.pipe(
    filterGetBookPageAction,
    callApi(ajax)
  );
}

export default combineEpics(getBookPageEpic);
