const bcrypt = require("bcryptjs")
const knex = require("../knex")

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}

function createUser(email, password) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)
  return knex("person")
    .insert({
      email: email,
      password: hash,
    })
    .returning("*")
}

module.exports = {
  comparePass,
  createUser
}
