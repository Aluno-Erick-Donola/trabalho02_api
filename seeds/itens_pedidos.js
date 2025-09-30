/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('itens_pedidos').del();

  const produtos = await knex('produtos').select('id', 'preco');

  const preco = (produto_id) => produtos.find(p => p.id === produto_id)?.preco || 0;

  await knex('itens_pedidos').insert([
    { pedido_id: 1, produto_id: 3, quantidade: 1, preco_unitario: preco(3) },
    { pedido_id: 1, produto_id: 4, quantidade: 1, preco_unitario: preco(4) },
    { pedido_id: 2, produto_id: 5, quantidade: 1, preco_unitario: preco(5) },
    { pedido_id: 2, produto_id: 6, quantidade: 1, preco_unitario: preco(6) },
    { pedido_id: 3, produto_id: 10, quantidade: 1, preco_unitario: preco(10) },
    { pedido_id: 3, produto_id: 11, quantidade: 1, preco_unitario: preco(11) },
    { pedido_id: 4, produto_id: 13, quantidade: 1, preco_unitario: preco(13) },
    { pedido_id: 4, produto_id: 14, quantidade: 1, preco_unitario: preco(14) }
  ]);
};
