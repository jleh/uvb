import axios from 'axios';

export const getVenues = () => axios('api/venues').then(res => res.data);
export const getScores = () => axios('/api/scores').then(res => res.data);
export const getUser = () => axios('/api/user');
export const getPoints = () => axios('/api/points').then(res => res.data);
export const updatePoints = (venue, points) => axios.post('/api/points', { venue, points });
export const getPointsWithData = () => axios('/api/pointsData').then(res => res.data);
