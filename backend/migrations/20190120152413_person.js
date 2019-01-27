
exports.up = function(knex, Promise) {
    return knex.schema.createTable('person', function(table) {
      table.increments()
      table.uuid('key')
      table.string('first_name', 255).defaultTo('')
      table.string('last_name', 255).defaultTo('')
      table.string('email', 255).unique().notNullable()
      table.text('password')
      table.text('user_picture_url').defaultTo('')
      table.string('position', 255).defaultTo('')
      table.boolean('teamLead').defaultTo(false)
      table.integer('team_id').references('id').inTable('team')
      table.json('skill_level')
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('person')
  }
