
exports.up = function(knex, Promise) {
    return knex.schema.createTable('person', function(table) {
      table.increments()
      table.uuid('key').notNullable()
      table.string('first_name', 255).notNullable().defaultTo('')
      table.string('last_name', 255).notNullable().defaultTo('')
      table.string('email', 255).unique().notNullable().defaultTo('')
      table.text('user_picture_url').defaultTo('')
      table.string('postion', 255).defaultTo('')
      table.boolean('teamLead').defaultTo(false)
      table.integer('team_id').references('id').inTable('team')
      table.json('skill_level')
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('person')
  }
