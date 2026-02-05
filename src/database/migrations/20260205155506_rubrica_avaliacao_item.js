const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('rubrica_avaliacao_item', (table) => {
    table.increments('id').primary();
    table
        .integer('rubrica_avaliacao_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('rubrica_avaliacao')
        .onDelete('CASCADE')
    table
        .integer('criterio_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('rubrica_criterio')
        .onDelete('CASCADE')
    table.float('nota')
    table.string('comentario')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('rubrica_avaliacao_item')
};
