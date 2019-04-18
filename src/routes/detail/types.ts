import { Epic } from 'redux-observable';
import reducer from '../../redux/bookDetail';

export type RouteParams = {
  bookId: string;
};

export type RouteModule = {
  routeName: 'details';
  epic: Epic;
  reducer: typeof reducer;
  state: ReturnType<typeof reducer>;
};
