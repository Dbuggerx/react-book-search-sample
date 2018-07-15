// @flow
import { combineReducers } from 'redux';
import store from './store';
import initialReducers from './initial-reducers';

// @see: https://medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e
// @see: http://nicolasgallagher.com/redux-modules-and-code-splitting/

type ModuleInfo = {
  name: string,
  reducer: {}
};

const asyncReducers = {};

export default (newModuleInfo: ModuleInfo) => {
  console.log('appending reducer', newModuleInfo.name);

  asyncReducers[newModuleInfo.name] = newModuleInfo.reducer;

  store.replaceReducer(
    combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  );
};

