import { combineEpics, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import {
  AjaxCreationMethod,
  AjaxError
} from 'rxjs/internal/observable/dom/AjaxObservable';
import { filter, map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { State } from '../store';
import {
  Action,
  PagedBooksReceivedAction,
  LikeBookAction,
  BookRefreshedAction,
  BookServerErrorAction
} from './types';
import actions from './actions';

function handleError(error: AjaxError) {
  return of<BookServerErrorAction>(actions.serverError(error));
}

function bookPageEpic(
  action$: Observable<Action>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<PagedBooksReceivedAction | BookServerErrorAction> {
  return action$.pipe(
    ofType('react-book-search/books/GET_BOOK_PAGE'),
    mergeMap(value => {
      const queryParams = Object.entries(value.payload).reduce(
        (agg, cur) =>
          (cur[1]
            ? `${agg + (agg.length > 0 ? '&' : '')}${cur[0]}=${String(cur[1])}`
            : agg),
        ''
      );
      return ajax({
        url: `http://localhost:3001/api/books?${queryParams}`
      }).pipe(
        map(
          result =>
            ({
              type: 'react-book-search/books/PAGED_BOOKS_RECEIVED',
              payload: {
                books: result.response,
                pageCount: parseInt(
                  result.xhr.getResponseHeader('x-total-count') || '',
                  10
                )
              }
            } as PagedBooksReceivedAction)
        ),
        catchError(handleError)
      );
    })
  );
}

function ssrReadyEpic(action$: Observable<Action>) {
  return action$.pipe(
    filter(
      (value: Action) =>
        Boolean(process.env.SERVER) &&
        value.type === 'react-book-search/books/PAGED_BOOKS_RECEIVED'
    ),
    map(() => ({
      type: 'react-book-search/ssr/RENDER_READY',
      payload: {
        ready: true
      }
    })),
    catchError(handleError)
  );
}

function likeBookEpic(
  action$: Observable<LikeBookAction>,
  state$: Observable<State>,
  { ajax }: { ajax: AjaxCreationMethod }
): Observable<BookRefreshedAction | BookServerErrorAction> {
  return action$.pipe(
    ofType('react-book-search/books/LIKE_BOOK'),
    switchMap(value => ajax.patch(
      `http://localhost:3001/api/books/${value.payload.bookId}`,
      {
        liked: value.payload.liked
      },
      {
        'Content-Type': 'application/json'
      }
    )),
    map(
      result =>
        ({
          type: 'react-book-search/books/BOOK_REFRESHED',
          payload: {
            book: result.response
          }
        } as BookRefreshedAction)
    ),
    catchError(handleError)
  );
}

export default combineEpics(bookPageEpic, ssrReadyEpic, likeBookEpic);
