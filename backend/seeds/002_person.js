const uuidv4 = require("uuid/v4")
const faker = require("faker")

const randomTeam = () => {
  const teamId = Math.floor(Math.random() * 11) + 1
  if (teamId > 10) {
    return null
  }
  return teamId
}

const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  position: faker.name.jobTitle(),
  team_id: randomTeam(),
  // user_picture_url: faker.image.imageUrl()
})

exports.seed = function(knex, Promise) {
  const fakeUsers = [
    {
      id: 1,
      first_name: "Christa",
      last_name: "Sparks",
      email: "christa@test.com",
      position: "full-stack developer",
      teamLead: true,
      team_id: 1,
      // user_picture_url: "https://www.placecage.com/c/300/300"
    },
    {
      first_name: "Austin",
      last_name: "Tindle",
      email: "austin@test.com",
      position: "front-end developer",
      team_id: null,
      // user_picture_url: "https://www.placecage.com/c/300/300"
    },
    {
      first_name: "Veech",
      last_name: "Big",
      email: "veech@test.com",
      position: "backend developer",
      team_id: null,
      // user_picture_url: "https://www.placecage.com/c/300/300"
    }
  ]
  const desiredUsers = 50
  for (let i = 0; i < desiredUsers; i++) {
    fakeUsers.push(createFakeUser())
  }
  // Deletes ALL existing entries
  return knex("person")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("person").insert(fakeUsers)
    })
    .then(function() {
      // Moves id column (PK) auto-incrementer to correct value after inserts
      return knex.raw(
        "SELECT setval('person_id_seq', (SELECT MAX(id) FROM person))"
      )
    })
}
