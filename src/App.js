// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import type { BehaviorSubject } from 'rxjs';
import getRoutes from './routes';
import type { ModuleInfo } from './redux/append-reducer';

type Props = {
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<any>
};

const App = (props: Props) => (
  <Switch>
    {getRoutes(props.loadedChunkNames, props.appendAsyncReducer, props.epicSubject$).map(
      (route, key) => {
        const { loadData, ...routeProps } = route;
        return <Route key={key} {...routeProps} />;
      }
    )}
  </Switch>
);

App.displayName = 'App';

export default (hot(module)(App): typeof App);
