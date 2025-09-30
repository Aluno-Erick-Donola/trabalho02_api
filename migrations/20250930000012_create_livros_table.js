/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable('livros', function(table) {
    table.increments('id').primary();
    table.string('titulo').notNullable();
    table.string('autor').notNullable();
    table.integer('ano_publicacao').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('livros');
};
