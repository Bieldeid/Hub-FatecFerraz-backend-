const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('evidencia_arquivos', (table) => {
    table.increments('id').primary();
    table
        .integer('evidencia_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('evidencia')
        .onDelete('CASCADE')
    table.string('caminho_arquivo').notNullable()
    table.string('nome_arquivo').notNullable()
    table.string('tamanho').notNullable()
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('projeto_curricularizacao')
};
