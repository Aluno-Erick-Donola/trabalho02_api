/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function(knex) {
  await knex('produtos').del();
  await knex('produtos').insert([
    { nome: 'Produto 1', preco: 10.5, marca_id: 1 },
    { nome: 'Produto 2', preco: 20.0, marca_id: 2 },
    { nome: 'Produto 3', preco: 15.75, marca_id: 3 }
  ]);
};
