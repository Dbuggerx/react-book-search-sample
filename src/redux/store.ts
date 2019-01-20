import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { BookDetailState } from './bookDetail/types';
import { BookState } from './books/types';
import initialReducers from './initial-reducers';

// @see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReducerReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type ReducersState<T> = { [P in keyof T]: ReducerReturnType<T[P]> };

type InitialState = ReducersState<typeof initialReducers>;

export type State = InitialState & BookState & BookDetailState;

declare const window: {
  __PRELOADED_STATE__: InitialState;
};

function getServerPreloadedState(): InitialState | null {
  /* eslint-disable no-underscore-dangle */
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState =
    typeof window === 'undefined' ? null : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  if (typeof window !== 'undefined')
    delete window.__PRELOADED_STATE__;

  return preloadedState;
}

export default function createReduxStore(rootEpic: Epic) {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development')
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    middlewares.push(require('redux-logger').logger);

  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax }
  });

  const store = createStore(
    combineReducers(initialReducers),
    getServerPreloadedState() || {},
    applyMiddleware(epicMiddleware, ...middlewares)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
