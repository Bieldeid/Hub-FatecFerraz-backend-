const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('aluno_turma', (table) => {
    table.increments('id').primary();
    table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

        table
        .integer('turma_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('turma')
        .onDelete('CASCADE')
    })
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('aluno_turma')
};
