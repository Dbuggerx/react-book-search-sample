import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import initialReducers from './initial-reducers';
import { RouteModule as HomeRouteModule } from '../routes/home/types';
import { RouteModule as DetailRouteModule } from '../routes/detail/types';
import { CombinedReducersState, RouteState } from './types';
import ssrReducer from './ssr/reducer';

type InitialState = CombinedReducersState<typeof initialReducers> &
Partial<{
  ssr: ReturnType<typeof ssrReducer>;
}>;
type AsyncState = RouteState<HomeRouteModule> & RouteState<DetailRouteModule>;

export type State = InitialState & Partial<AsyncState>;

declare const window: {
  __PRELOADED_STATE__: InitialState;
};

function getServerPreloadedState(): InitialState | null {
  /* eslint-disable no-underscore-dangle */
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState =
    typeof window === 'undefined' ? null : window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  if (typeof window !== 'undefined') delete window.__PRELOADED_STATE__;

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
