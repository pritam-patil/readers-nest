import React from 'react';
import PropTypes from 'prop-types';
import { PropagateLoader } from 'react-spinners';
import './spinner.css';

const Loader = props => (
  <div className="tab-spinner">
    <PropagateLoader loading={props.isFetching} color="orangered" />
  </div>
);

Loader.defaultProps = {
  isFetching: true,
};

Loader.propTypes = {
  isFetching: PropTypes.bool,
};

export default Loader;
