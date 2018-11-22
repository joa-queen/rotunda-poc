import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

const Label = ({
  name,
  weight,
  onRemove,
  onChange,
}) => (
  <div>
    <Input
      type="text"
      placeholder="Label"
      value={name}
      onChange={onChange('name')}
    />
    <Input
      type="number"
      min={1}
      placeholder="Weight"
      value={weight}
      onChange={onChange('weight')}
    />
    <Icon
      name="remove"
      style={{ cursor: 'pointer' }}
      onClick={onRemove}
    />
  </div>
);

Label.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Label;
