// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import type { ComponentType } from 'react';
import asyncComponent from './components/asyncComponent';
import type { ModuleInfo } from './redux/append-reducer';

type Props = {
  loadedChunkNames?: (string[]),
  appendAsyncReducer: (newModuleInfo: ModuleInfo) => void
};

class App extends Component<Props> {
  AsyncHome: ComponentType<*>;

  constructor(props: Props) {
    super(props);

    this.AsyncHome = asyncComponent(
      this.props.appendAsyncReducer,
      () => (process.env.SERVER
          ? require('./routes/home') // eslint-disable-line
        : import(/* webpackChunkName: "books" */ './routes/home')),
      props.loadedChunkNames,
      'books'
    );
  }

  render() {
    const Home = this.AsyncHome;
    return <Route exact path="/" render={props => <Home {...props} />} />;
  }
}

export default (hot(module)(App): typeof App);
