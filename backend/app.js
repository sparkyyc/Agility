var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const { postgraphile } = require('postgraphile')
const upsert = require('graphile-upsert-plugin')

var app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // <-- REQUIRED backend setting
  };

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(postgraphile(process.env.DATABASE_URL || "postgres:///agility-dev", {
    graphiql: true,
    // appendPlugins: [upsert]
}));




module.exports = app;
