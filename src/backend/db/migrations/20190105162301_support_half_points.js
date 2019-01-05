exports.up = function createTablePoints(knex) {
  return knex.raw('alter table points alter column points type decimal');
};

exports.down = function dropTablePoints(knex) {
  return knex.raw('alter table points alter column points type integer');
};
