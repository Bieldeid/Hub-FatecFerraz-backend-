const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('evidencia', (table) => {
    table.increments('id').primary()

    table.integer('aluno_id').unsigned().notNullable()
      .references('id').inTable('aluno_turma').onDelete('CASCADE')

    table.integer('turma_id').unsigned().notNullable()
      .references('id').inTable('turma').onDelete('CASCADE')

    table.integer('disciplina_id').unsigned().notNullable()
      .references('id').inTable('disciplina').onDelete('CASCADE')

    table.integer('projeto_id').unsigned().notNullable()
      .references('id').inTable('projeto_curricularizacao').onDelete('CASCADE')

    table.string('titulo_atividade').notNullable()
    table.string('descricao').notNullable()
    table.string('horas_solicitadas').notNullable()
    table.string('horas_validadas').notNullable()
    table.enum('status', ['pendente', 'aprovada', 'rejeitada'])

    table.integer('professor_avaliador_id')
      .unsigned()
      .references('id')
      .inTable('professor')
      .onDelete('SET NULL')

    table.string('obs_prof').notNullable()

    table.timestamp('data_envio').defaultTo(knex.fn.now())
    table.timestamp('data_validacao').nullable()
  })
}
  

exports.down = function(knex) {
  return knex.schema.dropTable('evidencia')
};
