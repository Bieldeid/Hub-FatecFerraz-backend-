const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('rubrica_criterio', (table) => {
    table.increments('id').primary();
    table
        .integer('rubrica_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('rubrica')
        .onDelete('CASCADE')
    table.string('descricao_criterio').notNullable()
    table.string('peso').notNullable()
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('rubrica_criterio')
};
