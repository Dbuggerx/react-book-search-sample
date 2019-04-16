// import { Epic } from 'redux-observable';
// import reducer from '../../redux/bookDetail';

// export type RouteModule = {
//   name: 'details';
//   reducer: typeof reducer;
//   epic: Epic;
// };

/* eslint-disable import/prefer-default-export */
export type RouteParams = {
  bookId: string;
};

// export type RouteState = {
//   [x in RouteModule['name']]: ReturnType<RouteModule['reducer']>
// };
