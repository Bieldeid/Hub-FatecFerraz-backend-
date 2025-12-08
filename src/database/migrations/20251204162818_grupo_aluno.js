/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('grupo_aluno', (table) => {
    table.increments('id');
    table.integer("grupo_id").unsigned().references('id').inTable('grupos')
    table.integer("aluno_id").unsigned().references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
