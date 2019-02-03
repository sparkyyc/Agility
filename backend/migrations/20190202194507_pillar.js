exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("pillar", function(table) {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments()
      table.uuid("key")
      table.string("title", 255).notNullable()
      table.text("description").defaultTo("")
      table.timestamps(true, true)
    })
    .then(() => {
      return knex.schema.table("skill", function(table) {
        table
          .integer("pillar_id")
          .references("id")
          .inTable("pillar")
      })
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .table("skill", function(table) {
      table.dropColumn("pillar_id")
    })
    .then(() => {
      return knex.schema.dropTableIfExists("pillar")
    })
}
