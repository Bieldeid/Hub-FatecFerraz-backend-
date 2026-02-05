/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('email_tickets', (table) => {
    table.increments('id')

    table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.string('token').notNullable()
    table.timestamp('expira_em').notNullable()
    table.boolean('usado').defaultTo(false)


  })
};
exports.down = function(knex) {
  return knex.schema.dropTable('email_tickets')
};
