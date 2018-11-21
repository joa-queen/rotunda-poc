import React, { useState } from 'react';

import { Select, Icon, Message } from 'semantic-ui-react';

import useIssues from 'state/issues/hook';
import useMembers from 'state/members/hook';

import Issues from 'components/Issues';

const issueFilter = filter => (issue) => {
  const assignees = issue.assignees.map(assignee => assignee.login);
  return !filter || assignees.includes(filter);
};

const Home = () => {
  const [memberSelected, setMemberSelected] = useState(null);
  const [issues] = useIssues();
  const [members] = useMembers();

  const memberOptions = members.data.map(member => ({
    key: member.id,
    value: member.id,
    text: `@${member.login}`,
  }));
  const selectedMember = (e, data) => setMemberSelected(data.value);
  const clearMember = () => setMemberSelected(null);

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

export default Home;
