import React from 'react';
import { render } from 'react-dom';

import { requestPermissions } from './notification';

import App from './components/App';

requestPermissions();

render(<App />, document.getElementById('root'));
