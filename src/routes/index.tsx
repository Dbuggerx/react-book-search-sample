import { Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { ModuleInfo } from '../redux/append-reducer';
import { RouteDefinition } from './types';
import getHomeRoute from './home/routeDefinition';
import getBookDetailRoute from './bookDetail/routeDefinition';

export default function getRoutes(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<Epic>
): RouteDefinition[] {
  return [
    getHomeRoute(loadedChunkNames, appendAsyncReducer, epicSubject$),
    getBookDetailRoute(loadedChunkNames, appendAsyncReducer, epicSubject$)
  ];
}
