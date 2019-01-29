require("custom-env").env("staging")
var express = require("express")
const { postgraphile } = require("postgraphile")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const passport = require("passport")
const knex = require("./knex")

const PassportLoginPlugin = require("./MySchemaExtensionPlugin")

var app = express()

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true // <-- REQUIRED backend setting
}

const store = new KnexSessionStore({
  knex: knex
})

app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors(corsOptions))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: Date.now() + 30 * 86400 * 1000,
      httpOnly: false,
      sameSite: false
    },
    store: store
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(
  postgraphile(process.env.DATABASE_URL || "postgres:///agility-dev", {
    graphiql: true,
    appendPlugins: [PassportLoginPlugin],
    additionalGraphQLContextFromRequest: req => {
      return {
        ...req,
        login: req.login,
        logout: req.logout
      }
    }
  })
)

module.exports = app
