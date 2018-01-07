import React from 'react';
import { shallow } from 'enzyme';

import PointCard from '../PointCard';

const venues = [{ name: 'Molotov', time: '' }, { name: 'Solmu', time: '' }];
const currentVenue = venues[0];

test('Point card render venues', () => {
  const userPoints = {};
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('td').contains('Molotov')).toBe(true);
});

test('current venue is marked to point card', () => {
  const userPoints = {};
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('td').find('.current').contains('Molotov')).toBe(true);
  expect(card.find('td').find('.current').contains('Solmu')).toBe(false);
});

test('zero points for venue is not rendered', () => {
  const userPoints = {};
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('.pointCardPoints').at(0).text()).toBe('');
});

test('user points are rendered, single point for venue', () => {
  const userPoints = { Molotov: [2] };
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('.pointCardPoints').at(0).contains(2)).toBe(true);
});

test('user points are rendered, multiple points for venue', () => {
  const userPoints = { Molotov: [2, 2] };
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('.pointCardPoints').at(0).text()).toBe('2 + 2 = 4');
});

test('user points are rendered, multiple points for venue including negative score', () => {
  const userPoints = { Molotov: [2, 2, -1] };
  const card = shallow(<PointCard
    currentVenue={currentVenue}
    venues={venues}
    userPoints={userPoints}
  />);

  expect(card.find('.pointCardPoints').at(0).text()).toBe('2 + 2 -1 = 3');
});
