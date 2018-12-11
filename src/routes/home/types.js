// @flow

import typeof HomeComponent, { reducer as HomeReducer, epic as HomeEpic } from './index';

export type HomeRouteModule = {
  default: HomeComponent,
  reducer: HomeReducer,
  epic: HomeEpic
};
