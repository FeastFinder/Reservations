const { Pool } = require('pg');

const pool = new Pool({
  user: 'ryanzhong',
  host: 'localhost',
  database: 'reservations',
  port: 5432,
});

// test query
pool.query('SELECT * FROM time_slots T', (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log((results.rows));
    pool.end();
  }
});

module.exports = {
  pool,
};
