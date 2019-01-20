module.exports = {
    development: {
      client: 'pg',
      connection: 'postgres://localhost/agility-dev'
    },
    test: {},
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
  }