const { Pool } = require('pg');

const pool = new Pool({
  user: 'ryanzhong',
  host: 'localhost',
  database: 'reservations',
  port: 5432,
});

pool.query('select * from reservations R INNER JOIN restaurants E ON E.id = R.restaurant_id INNER JOIN time_slots T ON T.id = R.time_slot_id INNER JOIN dates D ON D.id = R.date_id WHERE E.id = 6195 AND D.date = \'2019-11-12\';', (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log(('INSERTED'));
    console.log(results.rows);
    pool.end();
  }
});

module.exports = {
  pool,
};
