import Container, { reducer, epic } from './index';

export type DetailRouteModule = {
  default: typeof Container,
  reducer: typeof reducer,
  epic: typeof epic
};
