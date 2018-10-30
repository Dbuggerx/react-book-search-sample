// @flow
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createReduxStore from './redux/store';
import App from './App';
import appendReducer from './redux/append-reducer';
import type { ModuleInfo } from './redux/append-reducer';

const store = createReduxStore();
function appendAsyncReducer(newModuleInfo: ModuleInfo) {
  if (store) appendReducer(store, newModuleInfo);
}

function BrowserApp() {
  return (
    <Provider store={store}>
      <Router>
        <App appendAsyncReducer={appendAsyncReducer} />
      </Router>
    </Provider>
  );
}

const mountPoint = document.getElementById('app');
if (mountPoint) ReactDOM.hydrate(<BrowserApp />, mountPoint);
