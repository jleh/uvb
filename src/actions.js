import axios from 'axios';

export function getVenues() {
  return axios('api/venues').then(res => res.data.venues);
}

export function getScores() {
  return axios('/api/scores').then(res => res.data);
}

export function getUser() {
  return axios('/api/user');
}

export function getPoints() {
  return axios('/api/points').then(res => res.data);
}

export function updatePoints(venue, points) {
  return axios.post('/api/points', { venue, points });
}
