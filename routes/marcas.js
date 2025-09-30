const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '171030', // sua senha
    database: 'trabalho02_db'
  }
});

async function marcasRoutes(fastify, options) {

  fastify.get('/', async () => {
    const marcas = await knex('marcas').select('*');
    return { message: 'Lista de marcas', data: marcas, error: false };
  });

  fastify.get('/:id', async (req) => {
    const marca = await knex('marcas').where('id', req.params.id).first();
    return { message: 'Marca encontrada', data: marca, error: false };
  });

  fastify.delete('/:id', async (req) => {
    await knex('marcas').where('id', req.params.id).del();
    return { message: 'Marca deletada', data: [], error: false };
  });
}

module.exports = marcasRoutes;

