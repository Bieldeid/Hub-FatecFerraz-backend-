const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('professor_turma_disciplina', (table) => {
    table.increments('id').primary();
    table
        .integer('professor_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('professor')
        .onDelete('CASCADE')

    table
        .integer('turma_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('turma')
        .onDelete('CASCADE')

    table
        .integer('disciplina_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('disciplina')
        .onDelete('CASCADE')
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('professor_turma_disciplina')
};
