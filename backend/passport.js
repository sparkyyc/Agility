const knex = require("./knex")
const passport = require("passport")

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    knex("person")
      .where({ id })
      .first()
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        done(err, null)
      })
  })
}
