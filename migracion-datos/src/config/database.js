const knex = require('knex');
require('dotenv').config();

// conexion a la BD
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  },
  pool: { min: 2, max: 10 },
});

module.exports = db;
