const knex = require('knex')(require('../knexfile').development);

async function produtosRoutes(fastify, options) {
  fastify.get('/', async () => {
    const produtos = await knex('produtos').select('*');
    return { message: 'Lista de produtos', data: produtos, error: false };
  });

  fastify.get('/:id', async (req) => {
    const produto = await knex('produtos').where('id', req.params.id).first();
    if (!produto) return { message: 'Produto não encontrado', data: {}, error: true };
    return { message: 'Produto encontrado', data: produto, error: false };
  });

  fastify.post('/', async (req) => {
    const [id] = await knex('produtos').insert(req.body);
    const produto = await knex('produtos').where('id', id).first();
    return { message: 'Produto criado', data: produto, error: false };
  });
}

module.exports = produtosRoutes;
