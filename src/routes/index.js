/* eslint-disable react/display-name */
// @flow
import React from 'react';
import type { Route } from 'react-router-dom';
import type { Component } from 'react';
import type { DispatchAPI } from 'redux';
import type { BehaviorSubject } from 'rxjs';
import asyncComponent from '../components/asyncComponent';
import type { ModuleInfo } from '../redux/append-reducer';
import type { GetBookPageAction } from '../redux/books/types';

type ExtractPropType = <T>(Component<T>) => T;
type RouteMatch = $Call<ExtractPropType, Route>;
type RouteDefinition = {
  ...RouteMatch,
  loadData?: (dispatch: DispatchAPI<GetBookPageAction>) => any
};

export default function getRoutes(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<any>
) {
  return ([
    {
      exact: true,
      path: '/',
      render: props => {
        const AsyncHome = asyncComponent(
          appendAsyncReducer,
          epicSubject$,
          () => (process.env.SERVER
              ? require('../routes/home') // eslint-disable-line
            : import(/* webpackChunkName: "books" */ './home')),
          loadedChunkNames,
          'books'
        );
        return <AsyncHome {...props} />;
      },
      loadData: (dispatch: DispatchAPI<GetBookPageAction>) => {
        if (process.env.SERVER) {
          // eslint-disable-next-line global-require
          const mod = require('./home');
          if (appendAsyncReducer)
            appendAsyncReducer({
              name: 'books',
              reducer: mod.reducer
            });

          if (epicSubject$) epicSubject$.next(mod.epic);

          // eslint-disable-next-line global-require
          const { actions } = require('../redux/books');
          dispatch(actions.getBookPage(1));
        }
      }
    }
  ]: RouteDefinition[]);
}
