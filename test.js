const { Pool } = require('pg');

const pool = new Pool({
  user: 'ryanzhong',
  host: 'localhost',
  database: 'reservations',
  port: 5432,
});

pool.query('INSERT INTO restaurant (id, total_seats) values(1, 10)', (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log(('INSERTED'));
    pool.end();
  }
});

module.exports = {
  pool,
};
