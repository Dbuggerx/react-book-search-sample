export type SsrRenderAction = {
  type: 'react-book-search/ssr/RENDER_READY';
  payload: {
    ready: boolean;
  };
};

export type Action = SsrRenderAction;

export type State = Readonly<{
  ready?: boolean;
}>;
