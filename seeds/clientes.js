/** @type {import('knex').Knex.Seed} */
exports.seed = async function(knex) {
  await knex('clientes').del();
  await knex('clientes').insert([
    { id:1, nome:'Daniel Ventura', email:'daniel@email.com', cidade:'Juiz de Fora', telefone:'000000000' },
    { id:2, nome:'Danilu Samuel', email:'danilu@email.com', cidade:'Santana de Cataguases', telefone:'000000001' },
    { id:3, nome:'Larissa da Glória', email:'larissa@email.com', cidade:'Cataguases', telefone:'000000002' },
    { id:4, nome:'Lucas Araújo', email:'lucas.a@email.com', cidade:'Leopoldina', telefone:'000000003' },
    { id:5, nome:'João Pedro', email:'joao@email.com', cidade:'Rio de Janeiro', telefone:'000000004' },
    { id:6, nome:'Yasmin Dias', email:'yasmin@email.com', cidade:'São Paulo', telefone:'000000005' }
  ]);
};

