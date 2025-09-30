/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function(knex) {
  await knex('marcas').del();
  await knex('marcas').insert([
    { nome: 'Marca A' },
    { nome: 'Marca B' },
    { nome: 'Marca C' }
  ]);
};
