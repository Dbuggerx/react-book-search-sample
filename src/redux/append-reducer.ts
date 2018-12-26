import { combineReducers, Store } from 'redux';
import initialReducers from './initial-reducers';

// @see: https://medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e
// @see: http://nicolasgallagher.com/redux-modules-and-code-splitting/

export interface ModuleInfo {
  name: string;
  reducer: {};
}

export function appendReducerServer(store: Store, newModuleInfo: ModuleInfo) {
  store.replaceReducer(
    combineReducers({
      ...initialReducers,
      [newModuleInfo.name]: newModuleInfo.reducer
    })
  );
}

const asyncReducers = {};
export function appendReducerBrowser(store: Store, newModuleInfo: ModuleInfo) {
  (asyncReducers as any)[newModuleInfo.name] = newModuleInfo.reducer;

  store.replaceReducer(
    combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  );
}
