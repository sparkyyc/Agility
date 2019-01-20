const uuidv4 = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {id: 1, key: uuidv4(), first_name: 'Christa', last_name: 'Sparks', email: "christa@test.com", postion: "full-stack developer", teamLead: true, team_id: 1 },
        {id: 2, key: uuidv4(), first_name: 'Austin', last_name: 'Tindle', email: "austin@test.com", postion: "front-end developer", team_id: 1 },
        {id: 3, key: uuidv4(), first_name: 'Veech', last_name: 'Big', email: "veech@test.com", postion: "backend developer", team_id: 2 }
      ]);
    });
};
