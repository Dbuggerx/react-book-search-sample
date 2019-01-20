import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import rxjs from 'rxjs';
import { ModuleInfo } from './redux/append-reducer';
import getRoutes from './routes';

type Props = {
  loadedChunkNames?: string[];
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void;
  epicSubject$?: rxjs.BehaviorSubject<unknown>;
};

const App = (props: Props) => (
  <Switch>
    {getRoutes(
      props.loadedChunkNames,
      props.appendAsyncReducer,
      props.epicSubject$
    ).map((route, key: number) => (
      <Route key={key} {...route} />
    ))}
  </Switch>
);

App.displayName = 'App';

export default hot(App);
