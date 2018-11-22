import express from 'express';
import fs from 'fs';

import * as config from '../config.json';

const settings = express();

settings.get('/', async (req, res) => {
  try {
    res.json(config);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

settings.post('/', async (req, res) => {
  try {
    const labels = req.body.LABELS.filter(filter => (
      filter.name.length > 0
      && Number.isInteger(filter.weight)
      && filter.weight > 0
    ));

    const data = {
      ...req.body,
      LABELS: labels,
    };

    fs.writeFileSync(`${__dirname}/../config.json`, JSON.stringify(data, null, 2), 'utf8');

    res.json(data);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default settings;
