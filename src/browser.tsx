import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createReduxStore from './redux/store';
import App from './App';
import { appendReducerBrowser } from './redux/append-reducer';
import { ModuleInfo } from './redux/append-reducer';
import configureEpic from './redux/combined-epics';

const epicConfig = configureEpic();
const store = createReduxStore(epicConfig.rootEpic);
function appendAsyncReducer(newModuleInfo: ModuleInfo) {
  if (store) appendReducerBrowser(store, newModuleInfo);
}

function BrowserApp() {
  return (
    <Provider store={store}>
      <Router>
        <App appendAsyncReducer={appendAsyncReducer} epicSubject$={epicConfig.epicSubject$} />
      </Router>
    </Provider>
  );
}

const mountPoint = document.getElementById('app');
if (mountPoint) ReactDOM.hydrate(<BrowserApp />, mountPoint);
