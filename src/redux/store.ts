import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { BookDetailState } from './bookDetail/types';
import { BookState } from './books/types';
import initialReducers from './initial-reducers';

// @see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type ReducerReturn<T> = T extends (...args: any[]) => infer R ? R : any;
type ReducersState<T> = { [P in keyof T]: ReducerReturn<T[P]> };

type InitialState = ReducersState<typeof initialReducers>;

export type State = InitialState & BookState & BookDetailState;

function getServerPreloadedState(): InitialState | null {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = typeof window === 'undefined' ? null : (window as any).__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  if (typeof window !== 'undefined')
    delete (window as any).__PRELOADED_STATE__;

  return preloadedState;
}

export default function createReduxStore(rootEpic: any) {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line: no-implicit-dependencies
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

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
