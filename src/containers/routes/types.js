// @flow

import typeof HomeComponent, { reducer as HomeReducer } from './home';

export type RouteModule = {
  default: HomeComponent,
  reducer: HomeReducer
};
