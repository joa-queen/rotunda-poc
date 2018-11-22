import express from 'express';

import octokit from './octokit';
import { ORG } from '../config.json';

const members = express();

members.get('/', async (req, res) => {
  try {
    const { data } = await octokit.orgs.listMembers({
      org: ORG,
    });

    res.json(data);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default members;
