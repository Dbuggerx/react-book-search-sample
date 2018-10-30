import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import createReduxStore from '../redux/store';
import App from '../App';
import appendReducer from '../redux/append-reducer';

async function renderFullPage(html, preloadedState, asyncChunksScriptTags) {
  const preloadedStateScript = `<script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
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

  try {
    const fileContents = await Promise.all(
      loadedChunkNames
        .map(chunkName => manifest[`${chunkName}.js`])
        .map(fileName => promisify(fs.readFile)(path.join(__dirname, `../dist/${fileName}`), 'utf8'))
    );
    return fileContents.map(content => `<script>${content}</script>`).join('');
  } catch (error) {
    console.error('ERROR', error);
    return null;
  }
}

async function handleSsrReady(store, loadedChunkNames, renderedHtml) {
  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // eslint-disable-next-line no-debugger
  debugger;

  // Write initial async chuncks
  const asyncChunksScriptTags = await getAsyncChunksScriptTags(loadedChunkNames);

  return renderFullPage(renderedHtml, preloadedState, asyncChunksScriptTags);
}

function renderAppToString(store, req, reactRouterStaticContext, loadedChunkNames) {
  const appendAsyncReducer = newModuleInfo => {
    appendReducer(store, newModuleInfo);
  };
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={reactRouterStaticContext}>
        <App loadedChunkNames={loadedChunkNames} appendAsyncReducer={appendAsyncReducer} />
      </StaticRouter>
    </Provider>
  );
}

export default async function handleRender(req, res, next) {
  // eslint-disable-next-line no-debugger
  debugger;
  const store = createReduxStore();

  const reactRouterStaticContext = {};
  const loadedChunkNames = [];
  const ssr = new Promise(resolve => {
    // let renderedHtml = '';
    // let unsubscribeFromStore;
    // const onSsrReady = () => {
    //   unsubscribeFromStore();
    //   console.log('RENDERED!!!!!!!!!!!!!!');
    //   resolve(renderedHtml);
    // };

    // setTimeout(onSsrReady, 1000);

    // let curState = store.getState();
    // function handleStoreChange() {
    //   // if (getStore().getState().books && getStore().getState().books.books.length > 0);
    //   // unsubscribe();

    //   const prevState = curState;
    //   curState = store.getState();
    //   if (prevState !== curState)
    //     renderedHtml = renderAppToString(
    //       req,
    //       reactRouterStaticContext,
    //       loadedChunkNames,
    //       onSsrReady
    //     );
    // }
    // unsubscribeFromStore = getStore().subscribe(handleStoreChange);

    resolve(renderAppToString(store, req, reactRouterStaticContext, loadedChunkNames));
  });

  const renderedHtml = await ssr;
  const renderedApp = await handleSsrReady(store, loadedChunkNames, renderedHtml);

  // Send the rendered page back to the client
  try {
    res.send(renderedApp);
    next();
  } catch (error) {
    next(error);
  }
}
