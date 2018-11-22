import express from 'express';
import moment from 'moment-business-days';

import octokit from './octokit';
import { ORG, REPO, LABELS, OVERDUE_SCORE } from '../config.json';

moment.updateLocale('us', {
  workingWeekdays: [1, 2, 3, 4, 5],
});

const issues = express();

const labelsByWeight = LABELS.sort((a, b) => b.weight - a.weight);
const now = moment();

issues.get('/', async (req, res) => {
  try {
    const { data } = await octokit.issues.listForRepo({
      owner: ORG,
      repo: REPO,
      state: 'open',
      per_page: 100,
    });

    // Will expand the standar issue object with the information we need
    const payload = data.map((issue) => {
      let weight = 0;
      const labels = issue.labels.map(label => label.name); // I'm only interesed in label's name

      const date = moment(issue.created_at);
      const days = now.diff(date, 'days') + 1;
      const workdays = now.businessDiff(date, 'days') + (now.isBusinessDay() ? 1 : 0);

      labelsByWeight.forEach((label) => {
        // JS doesn't provide a method to break the forEach,
        // so I check weight = 0 to only use highest priority label
        if (labels.includes(label.name) && weight === 0) {
          weight += label.weight * workdays;
        }
      });

      const overdue = weight >= OVERDUE_SCORE;

      return {
        ...issue,
        weight,
        days,
        workdays,
        overdue,
      };
    });

    res.json(payload);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default issues;
