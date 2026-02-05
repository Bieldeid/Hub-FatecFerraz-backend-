
exports.up = function(knex) {
  return knex.schema.createTable('turma', (table) => {
    table.increments('id').primary();

    table
        .integer('curso_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('curso')
        .onDelete('CASCADE')

    table  
        .string('nome')
        .notNullable()

    table
        .string('ano')
        .notNullable()
    
    table
        .string('semestre')
        .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('turma')
};
