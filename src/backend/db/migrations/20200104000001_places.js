exports.up = async (knex) => {
  await knex('venues').insert({ name: 'Iltakoulu', time: '16:00', year: 2020 });
  await knex('venues').insert({ name: 'Hilpeä Hauki', time: '16:30', year: 2020 });
  await knex('venues').insert({ name: 'Bar Palmu', time: '17:00', year: 2020 });
  await knex('venues').insert({ name: 'Solmu', time: '17:45', year: 2020 });
  await knex('venues').insert({ name: 'Kalliohovi', time: '18:20', year: 2020 });
  await knex('venues').insert({ name: 'Kustaa Vaasa', time: '18:55', year: 2020 });
  await knex('venues').insert({ name: 'Kallion B12', time: '19:30', year: 2020 });
  await knex('venues').insert({ name: 'Heinähattu', time: '20:00', year: 2020 });
  await knex('venues').insert({ name: 'Siima', time: '20:45', year: 2020 });
  await knex('venues').insert({ name: 'Stindebinde', time: '21:15', year: 2020 });
  await knex('venues').insert({ name: 'Molotov', time: '21:45', year: 2020 });
};

exports.down = knex => knex('venues').delete().where('year', 2020);
