const { Pool } = require('pg');

const pool = new Pool({
  user: 'ryanzhong',
  host: 'localhost',
  database: 'reservations',
  port: 5432,
});

pool.query("SELECT * FROM restaurant R INNER JOIN dates D ON D.restaurant_id=R.id AND R.id = 1 INNER JOIN timeSlots T ON T.dates_id=date AND T.dates_id<'2019-09-15'", (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log((results.rows));
  }
});
