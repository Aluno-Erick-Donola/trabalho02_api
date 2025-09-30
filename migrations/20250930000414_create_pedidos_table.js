/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', function(table) {
    table.increments('id').primary();
    table.integer('cliente_id').unsigned().notNullable();
    table.foreign('cliente_id').references('id').inTable('clientes').onDelete('CASCADE');
    table.date('data_pedido').notNullable();
    table.decimal('total', 10, 2);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pedidos');
};
