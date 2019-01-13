import HomeComponent, { epic as HomeEpic, reducer as HomeReducer } from './index';

export type HomeRouteModule = {
  default: typeof HomeComponent,
  reducer: typeof HomeReducer,
  epic: typeof HomeEpic
};
