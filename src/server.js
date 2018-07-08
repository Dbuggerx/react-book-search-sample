/* eslint-disable */
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import store from './redux/store';
import App from './App';

async function renderFullPage(html, preloadedState, asyncChunksScriptTags) {
  const script = `<script>
    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c'
    )}
  </script>`;

  return promisify(fs.readFile)(
    path.join(__dirname, '../dist/index.html'),
    'utf8'
  ).then(data =>
    data.replace(
      '<div id="app"></div>',
      `<div id="app">${html}</div>${script}${asyncChunksScriptTags}`
    )
  );
}

async function handleRender(req, res) {
  // console.log(req.url);
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
      .map(fileName =>
        promisify(fs.readFile)(
          path.join(__dirname, `../dist/${fileName}`),
          'utf8'
        )
      )
  );
  return fileContents.map(content => `<script>${content}</script>`).join('');
}

const app = Express();
const port = 3000;

// Serve static files
app.use(
  Express.static('dist', {
    dotfiles: 'allow',
    index: false,
    maxAge: '1d'
  })
);

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, '0.0.0.0', err => {
  if (err) console.error(err);
  else console.info('Listening at http://localhost:3000');
});
