/* eslint-disable */
import { StateObservable, combineEpics, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, withLatestFrom, map } from 'rxjs/operators';
import { State } from '../store';
import * as actions from './actions';
import { SsrRenderAction } from './types';

function setHomeSsrReady(action$: Observable<SsrRenderAction>, state$: StateObservable<State>) {
  return action$.pipe(
    filter(action => action.type !== 'react-book-search/ssr/RENDER_READY'),
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        !!state.home &&
        state.home.bookResults.books.length > 0 &&
        state.home.searchParams.categories.results.length > 0
    ),
    map(actions.ssrReady)
  );
}

function setDetailSsrReady(action$: Observable<SsrRenderAction>, state$: StateObservable<State>) {
  return action$.pipe(
    filter(action => action.type !== 'react-book-search/ssr/RENDER_READY'),
    withLatestFrom(state$),
    filter(([, state]) => !!state.details && !!state.details.bookDetail),
    map(actions.ssrReady)
  );
}

export default combineEpics(setHomeSsrReady, setDetailSsrReady);
