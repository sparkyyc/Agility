
exports.up = function(knex, Promise) {
    return knex.schema.createTable('skill', function(table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.uuid('key')
        table.string('skill_name', 255).notNullable().defaultTo('')
        table.text('description').defaultTo('')
        table.timestamps(true, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('skill')
};
