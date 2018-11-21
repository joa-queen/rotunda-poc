import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled.table.attrs({
  cellSpacing: 0,
})`
  margin: 20px 0;
  padding: 0;
  border: 1px solid #aaa;
`;

const List = ({ children }) => (
  <ListContainer>
    <tbody>
      {children}
    </tbody>
  </ListContainer>
);

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default List;
