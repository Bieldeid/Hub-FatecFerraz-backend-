const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('projeto_curricularizacao', (table) => {
    table.increments('id').primary();
    table
        .integer('disciplina_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('disciplina')
        .onDelete('CASCADE')
    table.string('nome').notNullable()
    table.string('descricao').notNullable()
    table.string('limite_horas').notNullable()
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('projeto_curricularizacao')
};
