/* eslint-disable @typescript-eslint/no-var-requires, global-require, react/display-name */
import React from 'react';
import { Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { Dispatch } from 'redux';
import asyncComponent from '../../components/asyncComponent';
import { GetBookDetailAction } from '../../redux/bookDetail/types';
import { RouteDefinition, RouteModuleInfo } from '../types';

export default function getRouteDefinition(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: RouteModuleInfo) => void,
  epicSubject$?: BehaviorSubject<Epic>
): RouteDefinition {
  return {
    exact: true,
    path: '/book/:bookId',
    render: props => {
      const AsyncHome = asyncComponent(
        appendAsyncReducer,
        epicSubject$,
        () =>
          (process.env.SERVER
            ? require('./index')
            : import(/* webpackChunkName: "bookDetail" */ './index')),
        loadedChunkNames,
        'bookDetail'
      );
      return <AsyncHome {...props} />;
    },
    loadSSRData: (dispatch: Dispatch<GetBookDetailAction>, routeParams) => {
      if (process.env.SERVER && routeParams.bookId) {
        const mod = require('./index');
        if (appendAsyncReducer)
          appendAsyncReducer(mod.routeModule);
        if (epicSubject$) epicSubject$.next(mod.epic);
        const { actions } = require('../../redux/bookDetail');
        dispatch(actions.getBookDetail(routeParams.bookId));
      }
    }
  };
}
