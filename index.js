const fastify = require('fastify')({ logger: true });
const marcasRoutes = require('./routes/marcas');
const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');
const pedidosRoutes = require('./routes/pedidos');

fastify.register(marcasRoutes, { prefix: '/marcas' });
fastify.register(produtosRoutes, { prefix: '/produtos' });
fastify.register(clientesRoutes, { prefix: '/clientes' });
fastify.register(pedidosRoutes, { prefix: '/pedidos' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('API rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
