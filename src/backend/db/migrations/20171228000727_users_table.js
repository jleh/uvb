exports.up = function createTableUsers(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('facebookId');

    table.unique('facebookId');
  });
};

exports.down = function dropTableUsers(knex) {
  return knex.schema.dropTable('users');
};
