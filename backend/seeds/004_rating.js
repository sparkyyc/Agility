const uuidv4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rating').del()
    .then(function() {
      // Inserts seed entries
      return knex('rating').insert([
        {id: 1, key: uuidv4(), rating_for: 1, rating_by: 1, skill_id: 1, rating: 3 } ,
        {id: 2, key: uuidv4(), rating_for: 1, rating_by: 2, skill_id: 1, rating: 4 },
        {id: 3, key: uuidv4(), rating_for: 2, rating_by: 2, skill_id: 3, rating: 2 }
      ])
    }).then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw("SELECT setval('rating_id_seq', (SELECT MAX(id) FROM rating))")
    })
}
