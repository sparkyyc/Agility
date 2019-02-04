const uuidv4 = require("uuid/v4")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("team")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("team").insert([
        {
          id: 1,
          key: uuidv4(),
          name: "Mobile Development",
          description: "Team with a focus on mobile development."
        },
        {
          id: 2,
          key: uuidv4(),
          name: "Business Intelligence",
          description: "Team with a focus on business intelligence."
        },
        {
          id: 3,
          key: uuidv4(),
          name: "Systems and Architecture",
          description: "Team with a focus on systems and architecture."
        },
        {
          id: 4,
          key: uuidv4(),
          name: "Development Operations",
          description: "Team with a focus on dev ops."
        }
      ])
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('team_id_seq', (SELECT MAX(id) FROM team))"
      )
    })
}
