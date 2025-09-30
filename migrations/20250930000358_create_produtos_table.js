/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.integer('marca_id').unsigned().notNullable();
    table.foreign('marca_id').references('id').inTable('marcas').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('produtos');
};
