import React from 'react';
import styled from 'styled-components';
import { Header, Icon } from 'semantic-ui-react';

const Wrapper = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const Loading = () => (
  <Wrapper>
    <Header as="h2" icon>
      <Icon name="spinner" loading />
      Loading...
    </Header>
  </Wrapper>
);

export default Loading;
