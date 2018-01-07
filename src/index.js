import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import * as actions from './actions';

render(<App
  getVenues={actions.getVenues}
  getScores={actions.getScores}
  getUser={actions.getUser}
  getPoints={actions.getPoints}
  updatePoints={actions.updatePoints}
/>, document.getElementById('root'));
