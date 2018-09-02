// @flow
// $FlowFixMe: React Flow typings are not updated to React 16 yet
import React, { StrictMode, Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import asyncComponent from './components/asyncComponent';

type Props = {
  loadedChunkNames: ?(string[])
};

class App extends Component<Props> {
  AsyncHome: React$ComponentType<*>;

  constructor(props: Props) {
    super(props);

    this.AsyncHome = asyncComponent(
      () => (process.env.SERVER
          ? require('./containers/routes/home') // eslint-disable-line
        : import(/* webpackChunkName: "books" */ './containers/routes/home')),
      props.loadedChunkNames,
      'books'
    );
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
