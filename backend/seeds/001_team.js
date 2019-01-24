const uuidv4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('team').del()
    .then(function() {
      // Inserts seed entries
      return knex('team').insert([
        {id: 1, key: uuidv4(), name: 'front-end', description: 'The front-end team'},
        {id: 2, key: uuidv4(), name: 'back-end', description: 'The back-end team'},
        {id: 3, key: uuidv4(), name: 'Ctrl alt defeat'},
        {id: 4, key: uuidv4(), name: 'Hackstreet Boys'},
        {id: 5, key: uuidv4(), name: 'Byte me'},
        {id: 6, key: uuidv4(), name: 'Ctrl Alt Elite'},
        {id: 7, key: uuidv4(), name: 'Brogrammers'},
        {id: 8, key: uuidv4(), name: 'We Push to Master'},
        {id: 9, key: uuidv4(), name: '2SpaceMasterRace'},
        {id: 10, key: uuidv4(), name: 'Kernel Panic at the Disco'},
      ])
    }).then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw("SELECT setval('team_id_seq', (SELECT MAX(id) FROM team))")
    })
}
