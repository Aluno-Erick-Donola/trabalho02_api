const knex = require('knex')(require('../knexfile').development);

async function pedidosRoutes(fastify, options) {
  fastify.get('/', async () => {
    const pedidos = await knex('pedidos').select('*');
    for (const p of pedidos) {
      p.itens = await knex('itens_pedidos').where('pedido_id', p.id);
    }
    return { message: 'Lista de pedidos', data: pedidos, error: false };
  });

  fastify.get('/:id', async (req) => {
    const pedido = await knex('pedidos').where('id', req.params.id).first();
    if (!pedido) return { message: 'Pedido não encontrado', data: {}, error: true };
    pedido.itens = await knex('itens_pedidos').where('pedido_id', pedido.id);
    return { message: 'Pedido encontrado', data: pedido, error: false };
  });

  fastify.get('/cidade/:cidade', async (req) => {
    const pedidos = await knex('pedidos')
      .join('clientes', 'pedidos.cliente_id', 'clientes.id')
      .where('clientes.cidade', req.params.cidade)
      .select('pedidos.*');

    for (const p of pedidos) {
      p.itens = await knex('itens_pedidos').where('pedido_id', p.id);
    }

    return { message: `Pedidos da cidade ${req.params.cidade}`, data: pedidos, error: false };
  });

  fastify.post('/', async (req) => {
    const { cliente_id, data_pedido, total, itens } = req.body;
    const [pedidoId] = await knex('pedidos').insert({ cliente_id, data_pedido, total });

    for (const item of itens) {
      await knex('itens_pedidos').insert({
        pedido_id: pedidoId,
        produto_id: item.produto_id,
        quantidade: item.quantidade
      });
    }

    const pedido = await knex('pedidos').where('id', pedidoId).first();
    pedido.itens = await knex('itens_pedidos').where('pedido_id', pedidoId);
    return { message: 'Pedido criado', data: pedido, error: false };
  });
}

module.exports = pedidosRoutes;
