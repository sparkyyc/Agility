const uuidv4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('team').del()
    .then(function() {
      // Inserts seed entries
      return knex('team').insert([
        {id: 1, key: uuidv4(), name: 'front-end', description: ''},
        {id: 2, key: uuidv4(), name: 'back-end', description: ''},
        {id: 3, key: uuidv4(), name: 'TBD'}
      ])
    })
}
