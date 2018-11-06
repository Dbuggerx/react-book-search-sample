import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import createReduxStore from '../redux/store';
import App from '../App';
import appendReducer from '../redux/append-reducer';
import getRoutes from '../routes';
import configureEpic from '../redux/combined-epics';

async function renderFullPage(html, preloadedState, asyncChunksScriptTags) {
  // See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  const preloadedStateScript = `<script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  </script>`;

  const data = await promisify(fs.readFile)(path.join(__dirname, '../dist/index.html'), 'utf8');
  return data.replace(
    '<div id="app"></div>',
    `<div id="app">${html}</div>${preloadedStateScript}${asyncChunksScriptTags}`
  );
}

async function getAsyncChunksScriptTags(loadedChunkNames) {
  const manifest = JSON.parse(
    await promisify(fs.readFile)(path.join(__dirname, '../dist/manifest.json'), 'utf8')
  );

  const fileContents = await Promise.all(
    loadedChunkNames
      .map(chunkName => manifest[`${chunkName}.js`])
      .map(fileName => promisify(fs.readFile)(path.join(__dirname, `../dist/${fileName}`), 'utf8'))
  );
  return fileContents.map(content => `<script>${content}</script>`).join('');
}

async function handleSsrReady(state, loadedChunkNames, renderedHtml) {
  // Write initial async chuncks
  const asyncChunksScriptTags = await getAsyncChunksScriptTags(loadedChunkNames);
  return renderFullPage(renderedHtml, state, asyncChunksScriptTags);
}

function waitForInitialData(store, url, reactRouterStaticContext, loadedChunkNames) {
  return new Promise(resolve => {
    let unsubscribe;
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

export default async function handleRender(req, res, next) {
  const epicConfig = configureEpic();
  const store = createReduxStore(epicConfig.rootEpic);
  const loadedChunkNames = [];
  const appendAsyncReducer = newModuleInfo => {
    appendReducer(store, newModuleInfo);
  };

  const routeMatch = getRoutes(loadedChunkNames, appendAsyncReducer, epicConfig.epicSubject$).find(
    route => matchPath(req.path, route)
  );

  if (!routeMatch) {
    res.end();
    return;
  }

  const reactRouterStaticContext = {};

  try {
    if (routeMatch.loadData) routeMatch.loadData(store.dispatch);
    const renderedHtml = await waitForInitialData(
      store,
      req.url,
      reactRouterStaticContext,
      loadedChunkNames
    );
    const renderedApp = await handleSsrReady(store.getState(), loadedChunkNames, renderedHtml);
    res.send(renderedApp);
    next();
  } catch (error) {
    next(error);
  }
}
