/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '../select';
import './styles.css';

const Picker = props => {
  const { value, isFetching, refreshClick, onChange, options, lastUpdated } = props;

  return (
    <div className="input-component">
      <Select onChange={onChange} options={options} />
    </div>
  );
};

const Picker1 = props => {
  const { value, isFetching, refreshClick, onChange, options, lastUpdated } = props;

  return (
    <div className="input-component">
      <Select onChange={onChange} options={options} />
      {lastUpdated && <p>{`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`}</p>}
      {
        <button className="btn-refresh" type="button" onClick={e => refreshClick(e)}>
          <img
            className="img-refresh"
            src="https://png.icons8.com/dusk/50/000000/synchronize.png"
          />
        </button>
      }
    </div>
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Picker;
