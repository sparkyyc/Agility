exports.up = function(knex, Promise) {
    return knex.schema.createTable('team', function(table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.uuid('key')
        table.string('name', 255).notNullable().defaultTo('')
        table.text('description').defaultTo('')
        table.timestamps(true, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('team')
};
