/* eslint-disable no-underscore-dangle */
// @flow
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import initialReducers from './initial-reducers';
import type { BookState } from './books/types';
import type { BookDetailState } from './bookDetail/types';

// @see: https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
// @see: https://flow.org/en/docs/types/utilities/#toc-objmap
type ExtractReturnType = <V>((...args: any) => V) => V;
type InitialState = $ObjMap<typeof initialReducers, ExtractReturnType>;

export type State = {|
  ...InitialState,
  ...BookState,
  ...BookDetailState
|};

function getServerPreloadedState(): InitialState | null {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = typeof window === 'undefined' ? null : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  if (typeof window !== 'undefined') delete window.__PRELOADED_STATE__;
  return preloadedState;
}

// Add XMLHttpRequest support on the server
if (process.env.SERVER)
  // $FlowFixMe
  global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // eslint-disable-line

export default function createReduxStore(rootEpic: *) {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger'); // eslint-disable-line
    middlewares.push(logger);
  }

  const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax }
  });

  // I just had to use this comment type syntax, otherwise I'd get syntax error issues
  const store = createStore/* ::<InitialState, *, *> */(
    combineReducers(initialReducers),
    getServerPreloadedState() || {
      dummy: null,
      ssr: {}
    },
    applyMiddleware(epicMiddleware, ...middlewares)
  );

  epicMiddleware.run(rootEpic);

  return store;
}
