/* eslint-disable no-underscore-dangle */
// @flow
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import initialReducers from './initial-reducers';
import { rootEpic } from './combined-epics';
import type { BookState } from './books/types';

// Add XMLHttpRequest support on the server
if (process.env.SERVER)
  // $FlowFixMe
  global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // eslint-disable-line

function getMiddlewares() {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger'); // eslint-disable-line
    middlewares.push(logger);
  }
  return middlewares;
}

// @see: https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
// @see: https://flow.org/en/docs/types/utilities/#toc-objmap
type ExtractReturnType = <V>((...args: any) => V) => V;
type InitialState = $ObjMap<typeof initialReducers, ExtractReturnType>;

export type State = {|
  ...InitialState,
  ...BookState
|};

function getServerPreloadedState(): InitialState {
  // Grab the state from a global variable injected into the server-generated HTML
  // eslint-disable-next-line
  const preloadedState =
    typeof window === 'undefined' ? { dummy: null } : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  // eslint-disable-next-line
  if (typeof window !== 'undefined') delete window.__PRELOADED_STATE__;
  return preloadedState;
}

// eslint-disable-next-line import/no-mutable-exports
export default function createReduxStore() {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax }
  });

  const store = createStore(
    combineReducers(initialReducers),
    getServerPreloadedState(),
    applyMiddleware(epicMiddleware, ...getMiddlewares())
  );

  epicMiddleware.run(rootEpic);

  return store;
}
