import { Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { RouteDefinition, RouteModuleInfo } from './types';
import getHomeRoute from './home/routeDefinition';
import getDetailRoute from './detail/routeDefinition';

export default function getRoutes(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: RouteModuleInfo) => void,
  epicSubject$?: BehaviorSubject<Epic>
): RouteDefinition[] {
  return [
    getHomeRoute(loadedChunkNames, appendAsyncReducer, epicSubject$),
    getDetailRoute(loadedChunkNames, appendAsyncReducer, epicSubject$)
  ];
}
