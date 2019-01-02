exports.up = async (knex) => {
  await knex.schema.table('points', table => table.integer('year'));
  await knex('points').update('year', 2017);
};

exports.down = knex => knex.schema.table('points', table => table.dropColumn('year'));
