/* global document */
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import App from './App';

render(<Root />, document.getElementById('root'));
