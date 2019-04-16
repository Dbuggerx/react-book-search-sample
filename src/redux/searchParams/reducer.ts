import { State } from './types';

const initialState: State = {
  categories: []
};

export default function reducer(state = initialState, action: unknown) {
  return state;
}
