import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import { Epic } from 'redux-observable';
import { ModuleInfo } from './redux/append-reducer';
import getRoutes from './routes';
import './components/mainStyles';

type Props = {
  loadedChunkNames?: string[];
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void;
  epicSubject$?: BehaviorSubject<Epic>;
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
