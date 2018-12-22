import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { Select, Icon, Message } from 'semantic-ui-react';

import { useOnMount } from 'hooks';
import useIssues from 'state/issues/hook';
import useMembers from 'state/members/hook';

import Loading from 'components/Loading';
import Issues from 'components/Issues';

import Error from './Error';

const issueFilter = filter => (issue) => {
  const assignees = issue.assignees.map(assignee => assignee.login);
  return !filter || assignees.includes(filter);
};

const Home = ({ history }) => {
  const [initialized, setInitialized] = useState(false);
  const [members, membersActions] = useMembers();
  const [issues, issuesActions] = useIssues();

  useOnMount(() => {
    membersActions.load();
    issuesActions.load();
    setInitialized(true);
  });

  const error = members.loadError || issues.loadError;
  if (error) return <Error message={`${error}`} />;

  if (
    !initialized
    || members.loading
    || issues.loading
    || !members.loaded
    || !issues.loaded
  ) return <Loading />;

  const memberOptions = members.data.map(member => ({
    key: member.id,
    value: member.login,
    text: `@${member.login}`,
  }));
  const params = qs.parse(history.location.search);
  const memberSelected = params.who;
  const selectedMember = (e, data) => history.push(`?who=${data.value}`);
  const clearMember = () => history.push('');
  console.log('memberSelected', memberSelected);

  const sortedIssues = issues.data
    .filter(issueFilter(memberSelected))
    .sort((a, b) => b.weight - a.weight);

  return (
    <div>
      <div>
        Show issues assigned to:
        {' '}
        <Select
          placeholder="Select a member"
          options={memberOptions}
          onChange={selectedMember}
          value={memberSelected}
          style={{ marginLeft: '10px' }}
        />
        <Icon
          name="remove"
          onClick={clearMember}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div>
        {sortedIssues.length > 0 ? (
          <Issues.List>
            {sortedIssues.map(issue => (
              <Issues.Item
                key={issue.id}
                {...issue}
              />
            ))}
          </Issues.List>
        ) : (
          <Message style={{ marginTop: '30px' }}>
            <Message.Header>No Issues found</Message.Header>
            <p>
              Congrats! No issues assigned!
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};
Home.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Home);
