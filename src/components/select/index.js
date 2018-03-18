import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Select = props => {
  const { onChange, options } = props;
  return (
    <select className="select" onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option className="option" value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Select;
