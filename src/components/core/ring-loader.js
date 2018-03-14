import React from 'react';
import { RingLoader } from 'react-spinners';
import './spinner.css';

const Loader = () => (
    <div className="icon-spinner">
        <RingLoader
            color={'#FFA500'}
            loading={true}
        />
    </div>
);

export default Loader;