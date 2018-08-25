import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import store from '../redux/store';
import App from '../App';

async function renderFullPage(html, preloadedState, asyncChunksScriptTags) {
  const script = `<script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
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
    `<div id="app">${html}</div>${script}${asyncChunksScriptTags}`
  );
}

async function getAsyncChunksScriptTags(loadedChunkNames) {
  const manifest = JSON.parse(
    await promisify(fs.readFile)(
      path.join(__dirname, '../dist/manifest.json'),
      'utf8'
    )
  );

  const fileContents = await Promise.all(
    loadedChunkNames
      .map(chunkName => manifest[`${chunkName}.js`])
      .map(fileName => promisify(fs.readFile)(
        path.join(__dirname, `../dist/${fileName}`),
        'utf8'
      ))
  );
  return fileContents.map(content => `<script>${content}</script>`).join('');
}

export default async function handleRender(req, res) {
  res.locals.loadedChunkNames = [];

  const staticContext = {};
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={staticContext}>
        <App loadedChunkNames={res.locals.loadedChunkNames} />
      </StaticRouter>
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Write initial async chuncks
  const asyncChunksScriptTags = await getAsyncChunksScriptTags(
    res.locals.loadedChunkNames
  );

  // Send the rendered page back to the client
  try {
    const renderedApp = await renderFullPage(
      html,
      preloadedState,
      asyncChunksScriptTags
    );
    res.status(staticContext.statusCode || 200).send(renderedApp);
  } catch (error) {
    console.error(error);
  }
}
