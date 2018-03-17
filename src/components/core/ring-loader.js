import React from 'react';
import { RingLoader } from 'react-spinners';
import './spinner.css';

const Loader = () => (
  <div className="icon-spinner">
    <RingLoader color="#8E44AD" loading />
  </div>
);

export default Loader;
