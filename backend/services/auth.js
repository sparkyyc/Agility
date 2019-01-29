const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

const init = require("../passport")
const knex = require("../knex")
const authHelpers = require("./_helpers")

init()

const options = {
  usernameField: "email"
}

passport.use(
  new LocalStrategy(options, (email, password, done) => {
    // check to see if the username exists
    knex("person")
      .where({ email })
      .first()
      .then(user => {
        if (!user) return done(null, false, `Invalid Credentials`)
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          console.log("valid user", user)
          return done(null, user)
        })
      })
      .catch(err => {
        return done(err)
      })
  })
)

function signup({ email, password, context }) {
  if (!email || !password) {
    throw new Error("You must provide an email and password.")
  }
  return knex("person")
    .where({ email })
    .first()
    .then(existingUser => {
      if (existingUser) {
        throw new Error("Email in use")
      }
      return authHelpers.createUser(email, password)
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        context.login(user[0], err => {
          if (err) {
            reject(err)
          }
          resolve(user[0])
        })
      })
    })
}

function login({ email, password, context }) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user) => {
      if (!user) {
        reject(`Invalid credentials.`)
      }
      context.login(user, () => {
        resolve(user)
      })
    })({ body: { email, password, context } })
  })
}

module.exports = { signup, login }
