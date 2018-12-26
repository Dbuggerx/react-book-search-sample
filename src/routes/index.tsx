/* eslint-disable react/display-name */
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { ComponentType } from 'react';
import { Dispatch } from 'redux';
import { BehaviorSubject } from 'rxjs';
import asyncComponent from '../components/asyncComponent';
import { ModuleInfo } from '../redux/append-reducer';
import { GetBookPageAction } from '../redux/books/types';
import { GetBookDetailAction } from '../redux/bookDetail/types';

type RouteDefinition = RouteProps & {
  loadData?: (dispatch: Dispatch, routeParams: any) => any
};

export default function getRoutes(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<any>
): RouteDefinition[] {
  return [
    {
      exact: true,
      path: '/home',
      render: (props: any) => {
        const AsyncHome = asyncComponent(
          appendAsyncReducer,
          epicSubject$,
          () => (process.env.SERVER
              ? require('./home') // eslint-disable-line
            : import(/* webpackChunkName: "home" */ './home')),
          loadedChunkNames,
          'home'
        );
        return <AsyncHome {...props} />;
      },
      loadData: (dispatch: Dispatch<GetBookPageAction>) => {
        if (process.env.SERVER) {
          // eslint-disable-next-line global-require
          const mod = require('./home');
          if (appendAsyncReducer)
            appendAsyncReducer({
              name: 'home',
              reducer: mod.reducer
            });

          if (epicSubject$) epicSubject$.next(mod.epic);

          // eslint-disable-next-line global-require
          const { actions } = require('../redux/books');
          dispatch(actions.getBookPage(1));
        }
      }
    },
    {
      exact: true,
      path: '/book/:bookId',
      render: props => {
        const AsyncHome = asyncComponent(
          appendAsyncReducer,
          epicSubject$,
          () => (process.env.SERVER
              ? require('./bookDetail') // eslint-disable-line
            : import(/* webpackChunkName: "bookDetail" */ './bookDetail')),
          loadedChunkNames,
          'bookDetail'
        );
        return <AsyncHome {...props} />;
      },
      loadData: (dispatch: Dispatch<GetBookDetailAction>, routeParams) => {
        if (process.env.SERVER && routeParams.bookId) {
          // eslint-disable-next-line global-require
          const mod = require('./bookDetail');
          if (appendAsyncReducer)
            appendAsyncReducer({
              name: 'bookDetail',
              reducer: mod.reducer
            });
          if (epicSubject$) epicSubject$.next(mod.epic);
          // eslint-disable-next-line global-require
          const { actions } = require('../redux/bookDetail');
          dispatch(actions.getBookDetail(routeParams.bookId));
        }
      }
    }
  ];
}
