import * as actions from './actions';

export type SsrRenderAction = ReturnType<typeof actions.ssrReady>;

export type Action = SsrRenderAction;

export type State = Readonly<{
  ready?: boolean;
}>;
