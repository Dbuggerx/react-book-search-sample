import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import redux from 'redux';
import { promisify } from 'util';
// @ts-ignore
import { XMLHttpRequest } from 'xmlhttprequest';
import App from '../App';
import { appendReducerServer, ModuleInfo } from '../redux/append-reducer';
import configureEpic from '../redux/combined-epics';
import createReduxStore from '../redux/store';
import getRoutes from '../routes';

// Add XMLHttpRequest support on the server
const g = global as any;
g.XMLHttpRequest = XMLHttpRequest;

function parseDistFolder() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../dist/manifest.json'), 'utf8')
  );
}

const distFiles = parseDistFolder();

async function renderFullPage(
  html: string,
  preloadedState: {},
  asyncChunksScriptTags: string
) {
  // See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  const preloadedStateScript = `<script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c'
    )}
  </script>`;

  const data = await promisify(fs.readFile)(
    path.join(__dirname, '../dist/index.html'),
    'utf8'
  );
  return data.replace(
    '<div id="app"></div>',
    `<div id="app">${html}</div>${preloadedStateScript}${asyncChunksScriptTags}`
  );
}

async function getAsyncChunksScriptTags(loadedChunkNames: string[]) {
  const fileContents = await Promise.all(
    loadedChunkNames
      .map(chunkName => distFiles[`${chunkName}.js`])
      .map(fileName =>
        promisify(fs.readFile)(
          path.join(__dirname, `../dist/${fileName}`),
          'utf8'
        )
      )
  );
  return fileContents.map(content => `<script>${content}</script>`).join('');
}

async function handleSsrReady(
  state: {},
  loadedChunkNames: string[],
  renderedHtml: string
) {
  // Write initial async chuncks
  const asyncChunksScriptTags = await getAsyncChunksScriptTags(
    loadedChunkNames
  );
  return renderFullPage(renderedHtml, state, asyncChunksScriptTags);
}

function waitForInitialData(
  store: redux.Store,
  url: string,
  reactRouterStaticContext: {},
  loadedChunkNames: string[]
): Promise<string> {
  return new Promise(resolve => {
    let unsubscribe: () => void;
    function handleStoreChange() {
      if (store.getState().ssr && store.getState().ssr.ready) {
        resolve(
          renderToString(
            <Provider store={store}>
              <StaticRouter location={url} context={reactRouterStaticContext}>
                <App loadedChunkNames={loadedChunkNames} />
              </StaticRouter>
            </Provider>
          )
        );
        unsubscribe();
      }
    }
    unsubscribe = store.subscribe(handleStoreChange);
  });
}

export default async function handleRender(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const epicConfig = configureEpic();
  const store = createReduxStore(epicConfig.rootEpic);
  const loadedChunkNames: string[] = [];
  const appendAsyncReducer = (newModuleInfo: ModuleInfo) => {
    appendReducerServer(store, newModuleInfo);
  };

  const routeMatch = getRoutes(
    loadedChunkNames,
    appendAsyncReducer,
    epicConfig.epicSubject$
  )
    .map(route => ({
      ...route,
      reactRouterMatch: matchPath(req.path, route)
    }))
    .find(r => !!r.reactRouterMatch);

  if (!routeMatch) {
    res.end();
    return;
  }

  const reactRouterStaticContext = {};

  try {
    if (routeMatch.loadData)
      routeMatch.loadData(
        store.dispatch,
        routeMatch.reactRouterMatch ? routeMatch.reactRouterMatch.params : null
      );
    const renderedHtml = await waitForInitialData(
      store,
      req.url,
      reactRouterStaticContext,
      loadedChunkNames
    );
    const renderedApp = await handleSsrReady(
      store.getState(),
      loadedChunkNames,
      renderedHtml
    );
    res.send(renderedApp);
    next();
  } catch (error) {
    next(error);
  }
}
