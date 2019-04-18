/* eslint-disable */
import { StateObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, withLatestFrom, map } from 'rxjs/operators';
import { State } from '../store';

const ready = () => ({
  type: 'react-book-search/ssr/RENDER_READY',
  payload: {
    ready: true
  }
});

function setHomeSsrReady(action$: Observable<any>, state$: StateObservable<State>) {
  debugger;
  return action$.pipe(
    filter(action => action.type !== 'react-book-search/ssr/RENDER_READY'),
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        !!state.home &&
        state.home.bookResults.books.length > 0 &&
        state.home.searchParams.categories.results.length > 0
    ),
    map(ready)
  );
}

function setDetailSsrReady(action$: Observable<any>, state$: StateObservable<State>) {
  debugger;
  return action$.pipe(
    filter(action => action.type !== 'react-book-search/ssr/RENDER_READY'),
    withLatestFrom(state$),
    filter(([, state]) => !!state.details && !!state.details.bookDetail),
    map(ready)
  );
}

export default combineEpics(setHomeSsrReady, setDetailSsrReady);
