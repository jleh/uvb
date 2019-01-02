const Knex = require('knex');
const settings = require('./db/knexfile');

const knex = Knex(process.env.NODE_ENV === 'production' ? settings.production : settings.development);

const getUserByFacebookId = facebookId => knex.select().from('users').where('facebookId', facebookId).first();

const getUserById = userId => knex.select().from('users').where('id', userId).first();

const getOrCreateUser = async (facebookData) => {
  const user = await getUserByFacebookId(facebookData.id);

  if (!user) {
    const userId = await knex
      .insert({ name: facebookData.displayName, facebookId: facebookData.id })
      .into('users')
      .returning('id');

    return userId[0];
  }

  return user.id;
};

const addPoints = async (userId, venue, points) => knex.insert({
  userId,
  venue,
  points,
  year: process.env.YEAR
}).into('points');

const getUserPoints = async (userId) => {
  const pointData = await knex.select()
    .from('points')
    .where('userId', userId)
    .andWhere('year', process.env.YEAR);

  const points = {};

  pointData.forEach((data) => {
    if (!points[data.venue]) {
      points[data.venue] = [data.points];
    } else {
      points[data.venue].push(data.points);
    }
  });

  return points;
};

const getScores = () => knex('points')
  .join('users', 'users.id', '=', 'points.userId')
  .select('users.name')
  .where('year', process.env.YEAR)
  .sum('points as points')
  .groupBy('userId', 'name')
  .orderBy('points', 'desc');

const getVenues = () => knex('venues')
  .select()
  .where('year', 2018);

module.exports = {
  getUserByFacebookId,
  getOrCreateUser,
  getUserById,
  addPoints,
  getUserPoints,
  getScores,
  getVenues
};
