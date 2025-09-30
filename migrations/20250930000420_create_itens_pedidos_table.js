/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('itens_pedidos', function(table) {
    table.increments('id').primary();
    table.integer('pedido_id').unsigned().notNullable();
    table.foreign('pedido_id').references('id').inTable('pedidos').onDelete('CASCADE');
    table.integer('produto_id').unsigned().notNullable();
    table.foreign('produto_id').references('id').inTable('produtos').onDelete('CASCADE');
    table.integer('quantidade').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('itens_pedidos');
};
