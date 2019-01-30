exports.up = function(knex, Promise) {
  return knex.schema.createTable("team_skill", function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.uuid("key")
    table
      .integer("team_id")
      .references("id")
      .inTable("team")
    table
      .integer("skill_id")
      .references("id")
      .inTable("skill")
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("team_skill")
}
