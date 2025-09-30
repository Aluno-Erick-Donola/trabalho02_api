/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('marcas').del();
  await knex('marcas').insert([
    { nome: 'Marca 1' },
    { nome: 'Marca 2' },
    { nome: 'Marca 3' }
  ]);
};


