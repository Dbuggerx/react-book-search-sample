import 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createReduxStore from './redux/store';
import App from './App';
import { appendReducerBrowser } from './redux/append-reducer';
import configureEpic from './redux/combined-epics';
import { RouteModuleInfo } from './routes/types';

const epicConfig = configureEpic();
const store = createReduxStore(epicConfig.rootEpic);
function appendAsyncReducer(newModuleInfo: RouteModuleInfo) {
  if (store) appendReducerBrowser(store, newModuleInfo);
}

function BrowserApp() {
  return (
    <Provider store={store}>
      <Router>
        <App
          appendAsyncReducer={appendAsyncReducer}
          epicSubject$={epicConfig.epicSubject$}
        />
      </Router>
    </Provider>
  );
}

const mountPoint = document.getElementById('app');
if (mountPoint) ReactDOM.hydrate(<BrowserApp />, mountPoint);
