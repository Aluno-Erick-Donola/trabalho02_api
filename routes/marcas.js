const knex = require('knex')(require('../knexfile').development);

async function marcasRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    const marcas = await knex('marcas').select('*');
    return { message: 'Lista de marcas', data: marcas, error: false };
  });

  fastify.get('/:id', async (request, reply) => {
    const marca = await knex('marcas').where('id', request.params.id).first();
    if (!marca) return { message: 'Marca não encontrada', data: {}, error: true };
    return { message: 'Marca encontrada', data: marca, error: false };
  });

  fastify.delete('/:id', async (request, reply) => {
    await knex('marcas').where('id', request.params.id).del();
    return { message: 'Marca deletada', data: {}, error: false };
  });
}

module.exports = marcasRoutes;
