import { shape, arrayOf, string, number } from 'prop-types';

export const venueType = shape({
  name: string.isRequired,
  time: string.isRequired
});

export const venuesType = arrayOf(venueType);

export const scoreType = shape({
  name: string.isRequired,
  points: number.isRequired
});

export const scoresType = arrayOf(scoreType);
