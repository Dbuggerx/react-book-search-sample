/* eslint-disable @typescript-eslint/no-var-requires, global-require, react/display-name */
import React from 'react';
import { Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { Dispatch } from 'redux';
import asyncComponent from '../../components/asyncComponent';
import { GetBookPageAction } from '../../redux/books/types';
import { RouteDefinition, RouteModuleInfo } from '../types';

export const routePath = '/home';

export default function getRouteDefinition(
  loadedChunkNames?: string[],
  appendAsyncReducer?: (newModuleInfo: RouteModuleInfo) => void,
  epicSubject$?: BehaviorSubject<Epic>
): RouteDefinition {
  return {
    exact: true,
    path: routePath,
    render: props => {
      const AsyncHome = asyncComponent(
        appendAsyncReducer,
        epicSubject$,
        () =>
          (process.env.SERVER
            ? require('./index')
            : import(/* webpackChunkName: "home" */ './index')),
        loadedChunkNames,
        'home'
      );
      return <AsyncHome {...props} />;
    },
    loadSSRData: (dispatch: Dispatch<GetBookPageAction>) => {
      if (process.env.SERVER) {
        const mod = require('./index');
        if (appendAsyncReducer) appendAsyncReducer(mod.routeModule);
        if (epicSubject$) epicSubject$.next(mod.routeModule.epic);

        const { actions: booksActions } = require('../../redux/books');
        const { actions: searchActions } = require('../../redux/searchParams');
        dispatch(booksActions.getBookPage(1));
        dispatch(searchActions.getCategories());
      }
    }
  };
}
