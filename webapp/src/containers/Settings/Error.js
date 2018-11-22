import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Error = ({
  message,
}) => (
  <Wrapper>
    <Header as="h2" icon>
      <Icon name="dont" />
      There was an error
      <Header.Subheader>{message}</Header.Subheader>
    </Header>
  </Wrapper>
);

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: '',
};

export default Error;
