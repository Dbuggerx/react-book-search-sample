// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import type { ComponentType } from 'react';
import asyncComponent from './components/asyncComponent';

type Props = {
  loadedChunkNames: ?(string[])
};

class App extends Component<Props> {
  AsyncHome: ComponentType<*>;

  constructor(props: Props) {
    super(props);

    this.AsyncHome = asyncComponent(
      () => (process.env.SERVER
          ? require('./routes/home') // eslint-disable-line
        : import(/* webpackChunkName: "books" */ './routes/home')),
      props.loadedChunkNames,
      'books'
    );
  }

  render() {
    return <Route exact path="/" component={this.AsyncHome} />;
  }
}

export default hot(module)(App);
