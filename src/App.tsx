import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import { BehaviorSubject } from 'rxjs';
import { Epic } from 'redux-observable';
import { setConfig } from 'react-hot-loader';
import getRoutes from './routes';
import './components/mainStyles';
import { RouteModuleInfo } from './routes/types';

type Props = {
  loadedChunkNames?: string[];
  appendAsyncReducer?: (newModuleInfo: RouteModuleInfo) => void;
  epicSubject$?: BehaviorSubject<Epic>;
};

const App = (props: Props) => (
  <Switch>
    {getRoutes(
      props.loadedChunkNames,
      props.appendAsyncReducer,
      props.epicSubject$
    ).map((route, index: number) => (
      <Route key={index} {...route} />
    ))}
  </Switch>
);

App.displayName = 'App';

setConfig({
  logLevel: 'debug',
  ignoreSFC: true,
  pureRender: true
});
export default hot(App);
