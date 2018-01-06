const settings = require('./db/knexfile');
const knex = require('knex')(process.env.NODE_ENV === 'production' ? settings.production : settings.development);

function getUserByFacebookId(facebookId) {
  return knex.select().from('users').where('facebookId', facebookId).first();
}

function getUserById(userId) {
  return knex.select().from('users').where('id', userId).first();
}

async function getOrCreateUser(facebookData) {
  const user = await getUserByFacebookId(facebookData.id);

  if (!user) {
    const userId = await knex
      .insert({ name: facebookData.displayName, facebookId: facebookData.id })
      .into('users')
      .returning('id');

    return userId[0];
  }

  return user.id;
}

async function addPoints(userId, venue, points) {
  return knex.insert({ userId, venue, points }).into('points');
}

async function getUserPoints(userId) {
  const pointData = await knex.select().from('points').where('userId', userId);
  const points = {};

  pointData.forEach((data) => {
    if (!points[data.venue]) {
      points[data.venue] = [data.points];
    } else {
      points[data.venue].push(data.points);
    }
  });

  return points;
}

async function getScores() {
  return knex('points')
    .join('users', 'users.id', '=', 'points.userId')
    .select('users.name')
    .sum('points as points')
    .groupBy('userId', 'name')
    .orderBy('points', 'desc');
}

module.exports.getUserByFacebookId = getUserByFacebookId;
module.exports.getOrCreateUser = getOrCreateUser;
module.exports.getUserById = getUserById;
module.exports.addPoints = addPoints;
module.exports.getUserPoints = getUserPoints;
module.exports.getScores = getScores;
