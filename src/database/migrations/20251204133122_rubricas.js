/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rubricas', (table) => {
        table.increments('id');
        table.integer('professor_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();

        table.integer('curso_id')
            .unsigned()
            .references('id')
            .inTable('cursos')
            .notNullable();

        table.integer('ano').notNullable();        // 2025
        table.integer('semestre').notNullable();   // 1 ou 2

        table.string('titulo').notNullable();
        table.text('descricao').nullable();

        table.timestamps(true, true);

        table.unique(['curso_id', 'ano', 'semestre']);


    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('rubricas')
}