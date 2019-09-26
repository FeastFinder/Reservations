const { Pool } = require('pg');

const pool = new Pool({
  user: 'power_user',
  password: 'password',
  host: '13.59.255.23',
  database: 'reservations',
  port: 5432,
});

const getRes = (listing, cb) => {
  const queryString = `
    SELECT *
    FROM
      reservations
    WHERE
      res_id = ${listing}
  `;

  pool.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    cb(null, data.rows);
  });
};

const getListingData = (listing, day, cb) => {
  const queryString = `
    SELECT
      res_id,
      res_name,
      seats,
      restaurant_id,
      total_seats,
      date,
      time
    FROM
      reservations R
    INNER JOIN
      restaurants E ON E.id = R.restaurant_id
    INNER JOIN
      dates D ON D.id = R.date_id
      AND R.restaurant_id = ${listing}
      AND R.date_id = ${day}
    INNER JOIN
      time_slots T ON T.id = R.time_slot_id
  `;
  pool.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log('data', data.fields);
    cb(null, data.rows);
  });
};

const postNewRes = (param, data) => {
  const {
    res_name, seats, restaurant_id, date_id, time_slot_id,
  } = data;
  const queryString = 'INSERT INTO reservations (res_name, seats, restaurant_id, date_id, time_slot_id) values ($1, $2, $3, $4, $5)';
  pool.query(queryString, [res_name, seats, restaurant_id, date_id, time_slot_id], (err) => {
    if (err) {
      console.log(err);
    }
    console.log('INSERTED');
  });
};

const updateRes = (param, data) => {
  let queryString = ['UPDATE reservations'];
  queryString.push('SET');

  const set = [];
  const val = [];
  Object.keys(data).forEach((key, i) => {
    val.push(`${data[key]}`);
    set.push(`${key} = ($${i + 1})`);
  });

  queryString.push(set.join(', '));
  queryString.push(`WHERE res_id = ${param}`);

  queryString = queryString.join(' ');

  console.log(queryString);
  console.log(val);

  pool.query(queryString, val, (err) => {
    if (err) {
      throw err;
    }
  });
};

const deleteRes = (data) => {
  const { res_id } = data;
  const queryString = `
  DELETE
  FROM
    reservations
  WHERE
    res_id = ${res_id}`;

  pool.query(queryString, (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = {
  pool,
  getListingData,
  postNewRes,
  updateRes,
  deleteRes,
  getRes,
};

// try to implement date for query so it doesn't take too long

// select res_id, res_name, seats, restaurant_id, total_seats, date, time from reservations R INNER JOIN restaurants E ON E.id = R.restaurant_id INNER JOIN dates D ON D.id = R.date_id AND E.id = 1 INNER JOIN time_slots T ON T.id = R.time_slot_id AND D.date = '2019-09-27';
