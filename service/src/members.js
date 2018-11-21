import express from 'express';
import Octokit from '@octokit/rest';

import { ORG } from '../config.json';

const octokit = new Octokit();


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
