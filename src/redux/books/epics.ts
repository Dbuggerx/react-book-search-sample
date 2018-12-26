import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Action as SsrAction } from '../ssr/types';
import { State } from '../store';
import { Action, PagedBooksReceivedAction } from './types';

function bookPageEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<any> {
  return action$.pipe(
    filter(
      (value: Action) => value.type === 'react-book-search/books/GET_BOOK_PAGE'
    ),
    mergeMap(value => {
      const queryParams = Object.entries(value.payload).reduce(
        (agg, cur) => (cur[1]
          ? `${agg + (agg.length > 0 ? '&' : '')}${cur[0]}=${String(cur[1])}`
          : agg),
        ''
      );
      return ajax({
        url: `http://localhost:3001/api/books?${queryParams}`
      }).pipe(
        map(result => ({
          type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
          payload: {
            books: result.response,
            pageCount: parseInt(result.xhr.getResponseHeader('x-total-count') || '', 10)
          }
        }))
      );
    })
  );
}

function setBooksSsrReady(action$: Observable<any>): Observable<any> {
  return action$.pipe(
    filter(
      (value: Action) => Boolean(process.env.SERVER)
        && value.type === 'react-book-search/books/PAGED_BOOKS_RECEIVED'
    ),
    map(() => ({
      type: 'react-book-search/ssr/RENDER_READY',
      payload: {
        ready: true
      }
    }))
  );
}

export default combineEpics(bookPageEpic, setBooksSsrReady);
