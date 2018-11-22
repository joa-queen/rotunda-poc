import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Image } from 'semantic-ui-react';

import logo from './logo.png';
import NavItem from './NavItem';
import Content from './Content';

const Sticky = styled.div`
  position: fixed;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const Layout = ({ children }) => (
  <div>
    <Sticky>
      <Menu>
        <Menu.Item header>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
        </Menu.Item>
        <NavItem path="/" content="Home" />
        <NavItem path="/settings" content="Settings" />
      </Menu>
    </Sticky>
    <Content>
      {children}
    </Content>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
