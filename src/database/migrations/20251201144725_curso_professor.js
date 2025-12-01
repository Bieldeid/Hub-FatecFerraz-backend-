/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('curso_professor', (table) =>{
    table.increments('id').primary();

    table
        .integer('curso_id')
        .unsigned()
        .references('id')
        .inTable('cursos')
        .onDelete("CASCADE");

    table
        .integer('professor_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
