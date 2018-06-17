// @flow
// $FlowFixMe: React Flow typings are not updated to React 16 yet
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import store from './redux/store';
import Home from './containers/routes/home';

const App = () =>
  <Provider store={store}>
    <StrictMode>
      <Home />
    </StrictMode>
  </Provider>;

export default hot(module)(App);
