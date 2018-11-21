import express from 'express';
import http from 'http';
import cors from 'cors';

import pkg from '../package.json';

import members from './members';
import issues from './issues';

const app = express();
http.Server(app);

app.use(cors());

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

app.listen(3000);
