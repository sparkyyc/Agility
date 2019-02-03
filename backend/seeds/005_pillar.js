const uuidv4 = require("uuid/v4")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pillar")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("pillar").insert([
        { id: 1, key: uuidv4(), title: "pillone", description: "" },
        { id: 2, key: uuidv4(), title: "pilltwo", description: "" },
        { id: 3, key: uuidv4(), title: "pillthree", description: "" }
      ])
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('pillar_id_seq', (SELECT MAX(id) FROM pillar))"
      )
    })
}
