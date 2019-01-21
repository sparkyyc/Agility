const uuidv4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skill').del()
    .then(function() {
      // Inserts seed entries
      return knex('skill').insert([
        {id: 1, key: uuidv4(), skill_name: 'javascript', description: ''},
        {id: 2, key: uuidv4(), skill_name: 'python', description: ''},
        {id: 3, key: uuidv4(), skill_name: 'node.js'}
      ])
    })
}

