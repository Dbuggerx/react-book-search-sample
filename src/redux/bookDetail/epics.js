// @flow
import { combineEpics } from 'redux-observable';
import type { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import typeof { ajax as AjaxCreationMethod } from 'rxjs/ajax';
import type { Action, GetBookDetailAction, BookDetailReceivedAction } from './types';
import type { Action as SsrAction } from '../ssr/types';
import type { State } from '../store';

function bookDetailEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<BookDetailReceivedAction> {
  return action$.pipe(
    filter(
      (value: Action) => value.type
        === ('react-book-search/bookDetail/GET_BOOK_DETAIL': $PropertyType<Action, 'type'>)
    ),
    mergeMap((value: GetBookDetailAction) => ajax({
      url: `http://localhost:3001/api/books/${value.payload.bookId}`
    }).pipe(
      map(result => ({
        type: 'react-book-search/bookDetail/BOOK_DETAIL_RECEIVED',
        payload: {
          bookDetail: result.response
        }
      }))
    ))
  );
}

function setSsrReady(action$: Observable<*>): Observable<SsrAction> {
  return action$.pipe(
    filter(
      (value: Action) => Boolean(process.env.SERVER)
        && value.type
          === ('react-book-search/bookDetail/BOOK_DETAIL_RECEIVED': $PropertyType<Action, 'type'>)
    ),
    map(() => ({
      type: 'react-book-search/ssr/RENDER_READY',
      payload: {
        ready: true
      }
    }))
  );
}

export default combineEpics(bookDetailEpic, setSsrReady);
