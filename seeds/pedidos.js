/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('pedidos').del();
  await knex('pedidos').insert([
    { id:1, data_pedido:'2025-09-17', cliente_id:1, total:11898 },
    { id:2, data_pedido:'2025-09-17', cliente_id:2, total:13598 },
    { id:3, data_pedido:'2025-09-17', cliente_id:3, total:12498 },
    { id:4, data_pedido:'2025-09-17', cliente_id:4, total:5298 }
  ]);
};
