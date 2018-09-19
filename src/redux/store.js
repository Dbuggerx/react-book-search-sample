// @flow
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import initialReducers from './initial-reducers';
import { rootEpic } from './combined-epics';
import type { BookState } from './books/types';

function getServerPreloadedState() {
  // Grab the state from a global variable injected into the server-generated HTML
  // eslint-disable-next-line
  const preloadedState = typeof window === 'undefined' ? {} : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  // eslint-disable-next-line
  if (typeof window !== 'undefined') delete window.__PRELOADED_STATE__;
  return preloadedState;
}

const epicMiddleware = createEpicMiddleware({
  dependencies: { ajax }
});

function getMiddlewares() {
  const middlewares = [epicMiddleware];
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger'); // eslint-disable-line
    middlewares.push(logger);
  }
  return middlewares;
}

const store = createStore(
  combineReducers(initialReducers),
  getServerPreloadedState(),
  applyMiddleware(...getMiddlewares())
);

epicMiddleware.run(rootEpic);

export default store;

// @see: https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
// @see: https://flow.org/en/docs/types/utilities/#toc-objmap
type ExtractReturnType = <V>((...args: any) => V) => V;
type InitialState = $ObjMap<typeof initialReducers, ExtractReturnType>;

export type State = {|
  ...InitialState,
  ...BookState
|};
