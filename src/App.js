/* eslint-disable */
// @flow
// $FlowFixMe: React Flow typings are not updated to React 16 yet
import React, { StrictMode, Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import asyncComponent from './components/asyncComponent';

const AsyncHome = asyncComponent(
  () =>
    process.env.SERVER
      ? require('./containers/routes/home')
      : import(/* webpackChunkName: "home" */ './containers/routes/home')
);

type Props = {
  loadedChunkNames?: []
};

class App extends Component<Props> {
  constructor(props) {
    super(props);
    if (process.env.SERVER) props.loadedChunkNames.push('home');
  }

  render() {
    return (
      <StrictMode>
        <Link to="/">Go to Home</Link>
        <Route exact path="/" component={AsyncHome} />
      </StrictMode>
    );
  }
}

export default hot(module)(App);
