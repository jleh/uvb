import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

const venues = [{ name: 'Molotov', time: '' }, { name: 'Solmu', time: '' }];
const mockFunction = () => Promise.resolve();

const getVenues = () => Promise.resolve(venues);
const getUserPoints = () => Promise.resolve({});

test('App renders', () => {
  const app = mount(<App
    getVenues={getVenues}
    getScores={mockFunction}
    getUser={mockFunction}
    getPoints={getUserPoints}
    updatePoints={mockFunction}
  />);

  expect(app.find('h1').text()).toBe('UVB 2018');
});
