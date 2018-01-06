
exports.up = function createTablePoints(knex) {
  return knex.schema.createTable('points', (table) => {
    table.increments();
    table.integer('userId').notNullable();
    table.integer('points').notNullable();
    table.string('venue').notNullable();
    table.timestamp('logged').defaultTo(knex.fn.now());

    table.foreign('userId').references('users.id');
  });
};

exports.down = function dropTablePoints(knex) {
  return knex.schema.dropTable('points');
};
