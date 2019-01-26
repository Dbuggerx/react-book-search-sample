import { RouteProps } from 'react-router-dom';
import { Dispatch } from 'redux';

// eslint-disable-next-line import/prefer-default-export
export type RouteDefinition = RouteProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadData?: (dispatch: Dispatch, routeParams: any) => any;
};
