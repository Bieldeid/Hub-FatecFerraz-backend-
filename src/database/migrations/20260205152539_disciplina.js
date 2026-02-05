const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('disciplina', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('sigla').notNullable();
    table
        .integer('curso_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('curso')
        .onDelete('CASCADE')
    table.string('carga_horaria').notNullable();
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('disciplina')
};
