const uuidv4 = require("uuid/v4")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("skill")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("skill").insert([
        {
          id: 1,
          key: uuidv4(),
          skill_name: "JavaScript",
          description:
            "A lightweight, interpreted, object-oriented language with first-class functions, and is best known as the scripting language for Web pages."
        },
        {
          id: 2,
          key: uuidv4(),
          skill_name: "Python",
          description:
            "An interpreted, high-level, general-purpose programming language."
        },
        {
          id: 3,
          key: uuidv4(),
          skill_name: "Node.js",
          description:
            "An open source, cross-platform runtime environment for developing server-side and networking applications."
        },
        {
          id: 4,
          key: uuidv4(),
          skill_name: "HTML",
          description:
            "Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages."
        },
        {
          id: 5,
          key: uuidv4(),
          skill_name: "CSS",
          description:
            "Cascading style sheets are used to format the layout of Web pages."
        }
      ])
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('skill_id_seq', (SELECT MAX(id) FROM skill))"
      )
    })
}
