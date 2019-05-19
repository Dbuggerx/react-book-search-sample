import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import ssr from './ssr';

const app = express();

// Serve static files
app.use(
  express.static('dist', {
    index: false,
    maxAge: '1d'
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('access-control-expose-headers', 'x-total-count');
  next();
});

app.use(bodyParser.json()); // for parsing application/json

// Main API endpoint
app.use('/api', api);

// This is fired every time the server side receives a request
app.use(ssr);

export default app;
