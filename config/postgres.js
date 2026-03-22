require("dotenv").config();

const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
