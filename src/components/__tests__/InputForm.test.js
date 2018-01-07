import React from 'react';
import { mount } from 'enzyme';

import InputForm from '../InputForm';

const venues = [{ name: 'Molotov', time: '' }, { name: 'Solmu', time: '' }];
const currentVenue = venues[1];

test('input form renders, current venue is set to default', () => {
  const inputForm = mount(<InputForm
    currentVenue={currentVenue}
    addPoints={jest.fn()}
    venues={venues}
  />);

  expect(inputForm.find('select').props().value).toBe('Solmu');
});

test('cancel point adding', () => {
  const addPoints = jest.fn();
  const inputForm = mount(<InputForm
    currentVenue={currentVenue}
    addPoints={addPoints}
    venues={venues}
  />);

  inputForm.find('button').at(0).simulate('click');
  expect(inputForm.find('.modal').hasClass('open')).toBe(true);

  inputForm.find('.confirm-buttons button').at(1).simulate('click');
  expect(inputForm.find('.modal').hasClass('open')).toBe(false);
  expect(addPoints.mock.calls.length).toBe(0);
});

test('Points can be added', () => {
  const addPoints = jest.fn();
  const inputForm = mount(<InputForm
    currentVenue={currentVenue}
    addPoints={addPoints}
    venues={venues}
  />);

  inputForm.find('button').at(0).simulate('click');
  expect(inputForm.find('.modal').hasClass('open')).toBe(true);

  inputForm.find('.confirm-buttons button').at(0).simulate('click');
  expect(inputForm.find('.modal').hasClass('open')).toBe(false);
  expect(addPoints.mock.calls.length).toBe(1);
  expect(addPoints.mock.calls[0][0]).toBe('Solmu');
  expect(addPoints.mock.calls[0][1]).toBe(2);
});
