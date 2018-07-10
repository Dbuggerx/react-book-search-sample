// @flow
// $FlowFixMe: React Flow typings are not updated to React 16 yet
import React, { StrictMode, Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import asyncComponent from './components/asyncComponent';

type Props = {
  loadedChunkNames: ?[]
};

class App extends Component<Props> {
  AsyncHome: React$ComponentType<*>;

  constructor(props) {
    super(props);

    this.AsyncHome = asyncComponent(() =>
      (process.env.SERVER
        ? require('./containers/routes/home') // eslint-disable-line
        : import(/* webpackChunkName: "home" */ './containers/routes/home')));

    if (process.env.SERVER) props.loadedChunkNames.push('home');
  }

  render() {
    return (
      <StrictMode>
        <Link to="/">Go to Home</Link>
        <Route exact path="/" component={this.AsyncHome} />
      </StrictMode>
    );
  }
}

export default hot(module)(App);
