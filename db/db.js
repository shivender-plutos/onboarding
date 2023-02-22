const environment = 'development'; //process.env.NODE_ENV || 'development'
const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig[environment])

module.exports = knex;