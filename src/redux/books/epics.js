// @flow
import { combineEpics } from 'redux-observable';
import type { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import typeof { ajax as AjaxCreationMethod } from 'rxjs/ajax';
import type { Action, PagedBooksReceivedAction } from './types';
import type { Action as SsrAction } from '../ssr/types';
import type { State } from '../store';

function getBookPageEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<PagedBooksReceivedAction> {
  return action$.pipe(
    filter(
      (value: Action) => value.type === ('react-book-search/books/GET_BOOK_PAGE': $PropertyType<Action, 'type'>)
    ),
    mergeMap((value: Action) => {
      const queryParams = Object.entries(value.payload).reduce(
        (agg, cur) => (cur[1] ? `${agg + (agg.length > 0 ? '&' : '')}${cur[0]}=${String(cur[1])}` : agg),
        ''
      );
      return ajax({
        url: `http://localhost:3001/api/books?${queryParams}`
      }).pipe(
        map(result => ({
          type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
          payload: {
            books: result.response,
            pageCount: parseInt(result.xhr.getResponseHeader('x-total-count'), 10)
          }
        }))
      );
    })
  );
}

function setBooksSsrReady(action$: Observable<*>): Observable<SsrAction> {
  return action$.pipe(
    filter(
      (value: Action) => Boolean(process.env.SERVER)
        && value.type
          === ('react-book-search/books/PAGED_BOOKS_RECEIVED': $PropertyType<Action, 'type'>)
    ),
    map(() => ({
      type: 'react-book-search/ssr/RENDER_READY',
      payload: {
        ready: true
      }
    }))
  );
}

export default combineEpics(getBookPageEpic, setBooksSsrReady);
