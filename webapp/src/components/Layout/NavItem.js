import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

const NavItem = ({
  path,
  content,
  history,
  location,
}) => {
  const active = path === location.pathname;
  const click = () => history.push(path);

  return (
    <Menu.Item
      name={path}
      active={active}
      content={content}
      onClick={click}
    />
  );
};

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(NavItem);
