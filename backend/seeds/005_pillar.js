const uuidv4 = require("uuid/v4")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pillar")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("pillar").insert([
        { id: 1, key: uuidv4(), title: "Product Sense", description: "
A product is a bundle of services. A team with product sense understands how the product fits into its environment. Team members can talk about who uses the product, why they use it, and how this product fits together with all the other products they use." },
        { id: 2, key: uuidv4(), title: "Collaboration", description: "Teamwork is the heart of Agile software development; the productivity of the team as a whole is much greater than that of the individual members." },
        { id: 3, key: uuidv4(), title: "Focus on Business Value", description: "A team with a proper focus on business value has the right skills to deliver a finished product in a given timeframe. It is a reliable, predictable partner for the business." },
        { id: 4, key: uuidv4(), title: "Supportive Culture", description: "Executives, managers, and team members acknowledge that high productivity only exists in a trusting environment, where learning is expected and mistakes are tolerated." },
        { id: 5, key: uuidv4(), title: "Confidence", description: "Software health and project status are readily reported in transparent, unambiguous terms, often with automated reports or big visible charts." },
        { id: 6, key: uuidv4(), title: "Technical Excellence", description: "Developers make sound technical choices and take a no-compromise attitude towards quality." },
        { id: 7, key: uuidv4(), title: "Self-Improvement", description: "An Agile team member believes that improving oneself (in a collaborative spirit) will ultimately enhance the team and the product as well." }

      ])
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('pillar_id_seq', (SELECT MAX(id) FROM pillar))"
      )
    })
}
