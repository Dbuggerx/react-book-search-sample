import HomeComponent, {
  epic as HomeEpic,
  reducer as HomeReducer
} from './index';

// eslint-disable-next-line
export type HomeRouteModule = {
  default: typeof HomeComponent;
  reducer: typeof HomeReducer;
  epic: typeof HomeEpic;
};
