const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '171030',
    database: 'trabalho02_db'
  }
});

async function pedidosRoutes(fastify, options) {

  fastify.get('/', async () => {
    const pedidos = await knex('pedidos');
    for (let pedido of pedidos) {
      const itens = await knex('itens_pedidos')
        .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
        .select('itens_pedidos.*', 'produtos.nome', 'produtos.preco')
        .where('pedido_id', pedido.id);
      pedido.itens = itens;
    }
    return { message: 'Lista de pedidos', data: pedidos, error: false };
  });

  fastify.get('/:id', async (req) => {
    const pedido = await knex('pedidos').where('id', req.params.id).first();
    if (!pedido) return { message: 'Pedido não encontrado', data: [], error: true };
    const itens = await knex('itens_pedidos')
      .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
      .select('itens_pedidos.*', 'produtos.nome', 'produtos.preco')
      .where('pedido_id', pedido.id);
    pedido.itens = itens;
    return { message: 'Pedido encontrado', data: pedido, error: false };
  });

  fastify.get('/cidade/:cidade', async (req) => {
    const pedidos = await knex('pedidos')
      .join('clientes', 'pedidos.cliente_id', 'clientes.id')
      .select('pedidos.*')
      .where('clientes.cidade', req.params.cidade);

    for (let pedido of pedidos) {
      const itens = await knex('itens_pedidos')
        .join('produtos', 'itens_pedidos.produto_id', 'produtos.id')
        .select('itens_pedidos.*', 'produtos.nome', 'produtos.preco')
        .where('pedido_id', pedido.id);
      pedido.itens = itens;
    }
    return { message: 'Pedidos filtrados por cidade', data: pedidos, error: false };
  });

  fastify.post('/', async (req) => {
    const { cliente_id, data_pedido, total, itens } = req.body;
    const [pedido_id] = await knex('pedidos').insert({ cliente_id, data_pedido, total });
    for (let item of itens) {
      await knex('itens_pedidos').insert({ pedido_id, produto_id: item.produto_id, quantidade: item.quantidade });
    }
    return { message: 'Pedido criado', data: { pedido_id }, error: false };
  });
}

module.exports = pedidosRoutes;
