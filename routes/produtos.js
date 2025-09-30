const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '171030',
    database: 'trabalho02_db'
  }
});

async function produtosRoutes(fastify, options) {

  fastify.get('/', async () => {
    const produtos = await knex('produtos').select('*');
    return { message: 'Lista de produtos', data: produtos, error: false };
  });

  fastify.get('/:id', async (req) => {
    const produto = await knex('produtos').where('id', req.params.id).first();
    return { message: 'Produto encontrado', data: produto, error: false };
  });

  fastify.post('/', async (req) => {
    const { nome, preco, marca_id } = req.body;
    const [id] = await knex('produtos').insert({ nome, preco, marca_id });
    return { message: 'Produto criado', data: { id }, error: false };
  });
}

module.exports = produtosRoutes;
