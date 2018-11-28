import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const IssueContainer = styled.tr`
  padding: 10px 0;

  &:hover {
    background-color: #f4f4f4;
  }

  & td {
    border-bottom: 1px solid #aaa;
    padding: 15px;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const SubTitle = styled.div`
  color: #aaa;
`;

const Weight = styled.td.attrs(props => ({
  children: props.value,
}))`
  font-size: 20px;
  font-weight: bold;
  padding: 5px 15px;
  color: ${props => (props.overdue ? 'red' : '#666')};
  text-align: center;
  min-width: 68px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #333;
  background-color: #ddd;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

const Issue = ({
  title,
  weight,
  overdue,
  html_url,
  number,
  created_at,
  user,
  labels,
  assignees,
}) => (
  <IssueContainer>
    <Weight overdue={overdue} value={weight} />
    <td>
      <a href={html_url}>{title}</a>
      <SubTitle>
        {`#${number} opened ${moment(created_at).fromNow()} by @${user.login}`}
      </SubTitle>
      {assignees.length > 0 && (
        <SubTitle>
          {`Assigned to: ${assignees.map(assignee => `@${assignee.login}`).join(', ')}`}
        </SubTitle>
      )}
    </td>
    <td>
      {labels.map(({ id, name }) => (
        <Label key={id}>{name}</Label>
      ))}
    </td>
  </IssueContainer>
);

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  overdue: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }),
  ).isRequired,
  assignees: PropTypes.arrayOf(PropTypes.shape({
    login: PropTypes.string.isRequired,
  })).isRequired,
};

export default Issue;
