/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function(knex) {
  await knex('clientes').del();
  await knex('clientes').insert([
    { nome: 'João', email: 'joao@email.com', telefone: '123456789', cidade: 'Cidade A' },
    { nome: 'Maria', email: 'maria@email.com', telefone: '987654321', cidade: 'Cidade B' }
  ]);
};
