/* eslint-disable */
import 'babel-core/register'
import 'babel-polyfill'
/* eslint-enable */

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import pkg from '../package.json';

import members from './members';
import issues from './issues';
import settings from './settings';

const { PORT } = process.env;

const app = express();
http.Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.json({
    name: pkg.name,
    version: pkg.version,
  });
});

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end('healthy');
});

app.use('/members', members);
app.use('/issues', issues);
app.use('/settings', settings);

app.listen(PORT || 8080);
