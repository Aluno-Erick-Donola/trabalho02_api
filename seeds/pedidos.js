/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('pedidos').del();
  await knex('itens_pedidos').del();

  const clientes = await knex('clientes').select('id');
  const produtos = await knex('produtos').select('id');

  await knex('pedidos').insert([
    { cliente_id: clientes[0].id, data_pedido: '2025-09-30', total: 50.75 },
    { cliente_id: clientes[1].id, data_pedido: '2025-09-30', total: 80.00 }
  ]);

  const pedidos = await knex('pedidos').select('id');

  await knex('itens_pedidos').insert([
    { pedido_id: pedidos[0].id, produto_id: produtos[0].id, quantidade: 2 },
    { pedido_id: pedidos[0].id, produto_id: produtos[1].id, quantidade: 1 },
    { pedido_id: pedidos[1].id, produto_id: produtos[1].id, quantidade: 2 },
    { pedido_id: pedidos[1].id, produto_id: produtos[2].id, quantidade: 1 }
  ]);
};
