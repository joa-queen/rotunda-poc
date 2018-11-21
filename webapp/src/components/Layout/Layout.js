import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Image } from 'semantic-ui-react';

import logo from './logo.png';
import NavItem from './NavItem';
import Content from './Content';

const Layout = ({ children }) => (
  <div>
    <Menu>
      <Menu.Item header>
        <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
      </Menu.Item>
      <NavItem path="/" content="Home" />
      <NavItem path="/settings" content="Settings" />
    </Menu>
    <Content>
      {children}
    </Content>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
