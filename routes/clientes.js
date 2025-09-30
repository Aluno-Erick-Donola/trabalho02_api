const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '171030',
    database: 'trabalho02_db'
  }
});

async function clientesRoutes(fastify, options) {

  fastify.get('/', async () => {
    const clientes = await knex('clientes').select('*');
    return { message: 'Lista de clientes', data: clientes, error: false };
  });

  fastify.get('/:id', async (req) => {
    const cliente = await knex('clientes').where('id', req.params.id).first();
    return { message: 'Cliente encontrado', data: cliente, error: false };
  });

  fastify.post('/', async (req) => {
    const { nome, email, telefone, cidade } = req.body;
    const [id] = await knex('clientes').insert({ nome, email, telefone, cidade });
    return { message: 'Cliente criado', data: { id }, error: false };
  });
}

module.exports = clientesRoutes;


