// @flow
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import combinedEpics from './combined-epics';

function getServerPreloadedState() {
  // Grab the state from a global variable injected into the server-generated HTML
  // eslint-disable-next-line
  const preloadedState = typeof window === 'undefined' ? {} : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  // eslint-disable-next-line
  if (typeof window !== 'undefined') delete window.__PRELOADED_STATE__;
  return preloadedState;
}

const epicMiddleware = createEpicMiddleware();

function getMiddlewares() {
  const middlewares = [epicMiddleware];
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }
  return middlewares;
}

const store = createStore(
  combineReducers(reducers),
  getServerPreloadedState(),
  applyMiddleware(...getMiddlewares())
);

epicMiddleware.run(combinedEpics);

export default store;

// @see: https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
// @see: https://flow.org/en/docs/types/utilities/#toc-objmap
type ExtractReturnType = <V>((...args: any) => V) => V;
export type State = $ObjMap<typeof reducers, ExtractReturnType>;
