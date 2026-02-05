const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('professor', (table) => {
    table.increments('id').primary();
    table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
    
    
    
};

exports.down = function(knex) {
  return knex.schema.dropTable('professor')
};
