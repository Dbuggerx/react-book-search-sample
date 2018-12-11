// @flow

import typeof Container, { reducer, epic } from './index';

export type DetailRouteModule = {
  default: Container,
  reducer: reducer,
  epic: epic
};
