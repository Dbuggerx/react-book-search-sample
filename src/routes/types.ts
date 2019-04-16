import { RouteProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { routeModule as HomeRouteModule } from './home';
import { routeModule as DetailRouteModule } from './detail';

export type RouteDefinition = RouteProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadSSRData?: (dispatch: Dispatch, routeParams: any) => any;
};

export type RouteModuleInfo = typeof HomeRouteModule | typeof DetailRouteModule;

export type AsyncReducers = {
  [k in RouteModuleInfo['routeName']]: RouteModuleInfo['reducer']
};

export type AsyncState = ReturnType<RouteModuleInfo['reducer']>;
