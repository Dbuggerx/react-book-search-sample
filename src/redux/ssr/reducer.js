// @flow

import type { Action, State } from './types';

export default function ssrReducer(state: State = {}, action: Action): State {
  switch (action.type) {
    case 'react-book-search/ssr/RENDER_READY':
      return {
        ready: action.payload.ready
      };
    default:
      return state;
  }
}
