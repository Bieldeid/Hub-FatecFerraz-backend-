/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('ra');
    table.string('matricula');
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('senha').notNullable();
    table.string('curso').notNullable();
    table.enum('role', ["admin", "professor", "coordenador", "aluno"]).defaultTo('aluno');
    table.boolean('ativo').notNullable();
    table.boolean('email_verificado').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
