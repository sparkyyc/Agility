var express = require("express")
const { postgraphile } = require("postgraphile")
var path = require("path")
var cookieParser = require("cookie-parser")
// const bodyParser = require('body-parser')
var logger = require("morgan")
var cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const passport = require("passport")
const knex = require("./knex")

const PassportLoginPlugin = require("./MySchemaExtensionPlugin")

var app = express()

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true // <-- REQUIRED backend setting
}

const store = new KnexSessionStore({
  knex: knex
})

app.use(express.static(path.join(__dirname, "public")))
app.use(cors(corsOptions))
app.use(cookieParser())
// app.use(bodyParser());
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "kitkat",
    // cookie: { maxAge: Date.now() + (30 * 86400 * 1000) },
    store: store
  })
)
app.use(passport.initialize())
app.use(passport.session())
// app.use((ctx, next) => {
//   // PostGraphile deals with (req, res) but we want access to sessions from `pgSettings`, so we make the ctx available on req.
//   if (ctx.req) {
//     ctx.req.ctx = ctx
//     return next()
//   }
// })
app.use(
  postgraphile(process.env.DATABASE_URL || "postgres:///agility-dev", {
    graphiql: true,
    appendPlugins: [PassportLoginPlugin],
    additionalGraphQLContextFromRequest: req => {
      debugger
      return {
        // Use this to tell Passport.js we're logged in
        ...req,
        login: req.login,
        logout: req.logout
      }
    }
  })
)

module.exports = app
