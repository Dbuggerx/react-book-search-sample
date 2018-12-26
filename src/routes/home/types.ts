import HomeComponent, { reducer as HomeReducer, epic as HomeEpic } from './index';

export type HomeRouteModule = {
  default: typeof HomeComponent,
  reducer: typeof HomeReducer,
  epic: typeof HomeEpic
};
