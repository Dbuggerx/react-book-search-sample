// @flow
// $FlowFixMe: React Flow typings are not updated to React 16 yet
import React, { StrictMode } from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import asyncComponent from './components/asyncComponent';

const AsyncHome = asyncComponent(() =>
  (process.env.SERVER
    ? import(/* webpackMode: "weak" */ './containers/routes/home')
    : import('./containers/routes/home')));

const App = () => (
  <StrictMode>
    <Link to="/">Home</Link>
    <Route exact path="/" component={AsyncHome} />
  </StrictMode>
);

export default hot(module)(App);
