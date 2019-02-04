const uuidv4 = require("uuid/v4")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pillar")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("pillar").insert([
        {
          id: 1,
          key: uuidv4(),
          title: "Product Sense",
          description:
            "This skill can help the Product Owner evaluate upcoming features, and to suggest cost effective or strategic alternatives"
        },
        {
          id: 2,
          key: uuidv4(),
          title: "Collaboration",
          description:
            "This skill promotes true collaboration between teammates, by sharing individual knowledge and skills."
        },
        {
          id: 3,
          key: uuidv4(),
          title: "Business Value",
          description:
            "This skill has a focus to deliver a finished product in a given timeframe. It is a reliable, predictable partner for the business."
        },
        {
          id: 4,
          key: uuidv4(),
          title: "Supportive Culture",
          description:
            "This skill promotes a trusting environment, where learning is expected and mistakes are tolerated."
        },
        {
          id: 5,
          key: uuidv4(),
          title: "Confidence",
          description:
            "This skill leads to readily reported project status in transparent, unambiguous terms, often with automated reports or big visible charts."
        },
        {
          id: 6,
          key: uuidv4(),
          title: "Technical Excellence",
          description:
            "This skill allows developers make sound technical choices and take a no-compromise attitude towards quality."
        },
        {
          id: 7,
          key: uuidv4(),
          title: "Self-Improvement",
          description:
            "This skill will ultimately enhance the team and the product through the growing individual."
        }
      ])
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('pillar_id_seq', (SELECT MAX(id) FROM pillar))"
      )
    })
}
