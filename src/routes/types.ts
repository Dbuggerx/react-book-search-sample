import { RouteProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { RouteModule as HomeRouteModule } from './home/types';
import { RouteModule as DetailRouteModule } from './detail/types';

export type RouteDefinition = RouteProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadSSRData?: (dispatch: Dispatch, routeParams: any) => any;
};

export type RouteModuleInfo = HomeRouteModule | DetailRouteModule;

export type AsyncReducers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in RouteModuleInfo['routeName']]: any
};
