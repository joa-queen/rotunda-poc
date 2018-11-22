import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Button } from 'semantic-ui-react';

const Wrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Error = ({
  history,
  message,
}) => {
  const goToSettings = () => history.push('/settings');

  return (
    <Wrapper>
      <Header as="h2" icon>
        <Icon name="dont" />
        There was an error
        <Header.Subheader>{message}</Header.Subheader>
        <Header.Subheader>{'This is most probably because you didn\'t set a GitHub token'}</Header.Subheader>
        <Button style={{ marginTop: '20px' }} onClick={goToSettings}>Go to settings</Button>
      </Header>
    </Wrapper>
  );
};

Error.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  message: PropTypes.string,
};

Error.defaultProps = {
  message: '',
};

export default withRouter(Error);
