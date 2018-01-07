import React from 'react';
import { shallow } from 'enzyme';

import Scoreboard from '../Scoreboard';

test('Scoreboard renders', () => {
  const board = shallow(<Scoreboard scores={[]} />);
  expect(board.find('table').length).toEqual(1);
});

test('Scoreboard renders name and score', () => {
  const scores = [
    { name: 'Eka Ensimmäinen', points: 5 },
    { name: 'Kake Kakkonen', points: 4 },
    { name: 'Seppo', points: 3 },
    { name: null, points: -1 }
  ];
  const board = shallow(<Scoreboard scores={scores} />);

  expect(board.find('tr').length).toEqual(scores.length);
  expect(board.contains(<td>Eka</td>)).toEqual(true);
});
