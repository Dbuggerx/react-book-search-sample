// @flow
import { combineReducers } from 'redux';
import initialReducers from './initial-reducers';

// @see: https://medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e
// @see: http://nicolasgallagher.com/redux-modules-and-code-splitting/

export type ModuleInfo = {
  name: string,
  reducer: {}
};

const asyncReducers = {};

export default (store: *, newModuleInfo: ModuleInfo) => {
  asyncReducers[newModuleInfo.name] = newModuleInfo.reducer;

  store.replaceReducer(
    combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  );
};
