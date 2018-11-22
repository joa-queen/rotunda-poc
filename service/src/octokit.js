import Octokit from '@octokit/rest';
import { GH_KEY } from '../config.json';

const octokit = new Octokit();

if (GH_KEY) {
  octokit.authenticate({
    type: 'token',
    token: GH_KEY,
  });
}

export default octokit;
