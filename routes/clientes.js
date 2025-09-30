const knex = require('knex')(require('../knexfile').development);

async function clientesRoutes(fastify, options) {
  fastify.get('/', async () => {
    const clientes = await knex('clientes').select('*');
    return { message: 'Lista de clientes', data: clientes, error: false };
  });

  fastify.get('/:id', async (req) => {
    const cliente = await knex('clientes').where('id', req.params.id).first();
    if (!cliente) return { message: 'Cliente não encontrado', data: {}, error: true };
    return { message: 'Cliente encontrado', data: cliente, error: false };
  });

  fastify.post('/', async (req) => {
    const [id] = await knex('clientes').insert(req.body);
    const cliente = await knex('clientes').where('id', id).first();
    return { message: 'Cliente criado', data: cliente, error: false };
  });
}

module.exports = clientesRoutes;
