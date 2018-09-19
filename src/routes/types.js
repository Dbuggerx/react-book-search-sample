// @flow

import typeof HomeComponent, { reducer as HomeReducer, epic as HomeEpic } from './home';

export type RouteModule = {
  default: HomeComponent,
  reducer: HomeReducer,
  epic: HomeEpic
};
