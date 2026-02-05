const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('rubrica_avaliacao', (table) => {
    table.increments('id').primary();
    table
        .integer('evidencia_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('evidencia')
        .onDelete('CASCADE')
    table
        .integer('rubrica_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('rubrica')
        .onDelete('CASCADE')
    table
        .integer('professor_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('professor')
        .onDelete('CASCADE')
    table.timestamp('data_avaliacao').defaultTo(knex.fn.now());
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('rubrica_avaliacao')
};
