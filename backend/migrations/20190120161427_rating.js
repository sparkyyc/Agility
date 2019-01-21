
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rating', function(table) {
        // TABLE COLUMN DEFINITIONS HERE
        table.increments()
        table.uuid('key').notNullable()
        table.integer('rating_for').notNullable().references('id').inTable('person')
        table.integer('rating_by').notNullable().references('id').inTable('person')
        table.integer('skill_id').notNullable().references('id').inTable('skill')
        table.integer('rating').notNullable()
        table.timestamps(true, true)
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('rating')
};
