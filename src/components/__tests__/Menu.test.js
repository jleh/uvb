import React from 'react';
import { shallow } from 'enzyme';

import Menu from '../Menu';

test('Menu component renders all menu items', () => {
  const changePage = jest.fn();
  const menu = shallow(<Menu changePage={changePage} />);

  expect(menu.find('a').length).toBe(3);
});

test('Page change is called', () => {
  const changePage = jest.fn();
  const menu = shallow(<Menu changePage={changePage} />);

  menu.find('a').forEach(a => a.simulate('click'));

  expect(changePage.mock.calls.length).toBe(3);
  expect(changePage.mock.calls[0][0]).toBe('frontPage');
  expect(changePage.mock.calls[1][0]).toBe('addPoints');
  expect(changePage.mock.calls[2][0]).toBe('scoreboard');
});
