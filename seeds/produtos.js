/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('produtos').del();
  const marcas = await knex('marcas').select('id');

  await knex('produtos').insert([
    { nome: 'Produto 1', preco: 10.5, marca_id: marcas[0].id },
    { nome: 'Produto 2', preco: 20, marca_id: marcas[1].id },
    { nome: 'Produto 3', preco: 15.75, marca_id: marcas[2].id }
  ]);
};

