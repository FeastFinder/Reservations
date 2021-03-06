DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

\connect reservations;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  total_seats INT
);
-- ALTER SEQUENCE restaurants_id_seq RESTART WITH 10000 INCREMENT BY 1;


CREATE TABLE dates (
  id SERIAL PRIMARY KEY,
  date date NOT NULL
);
-- ALTER SEQUENCE dates RESTART WITH 90 INCREMENT BY 1;

CREATE TABLE time_slots (
  id SERIAL PRIMARY KEY,
  time time NOT NULL
);
-- ALTER SEQUENCE time_slots RESTART WITH 10 INCREMENT BY 1;

CREATE TABLE reservations (
  res_id SERIAL PRIMARY KEY,
  res_name VARCHAR(100),
  seats INT NOT NULL,
  restaurant_id INT NOT NULL,
  date_id INT NOT NULL,
  time_slot_id INT NOT NULL,
  FOREIGN KEY(restaurant_id) REFERENCES restaurants (id),
  FOREIGN KEY(date_id) REFERENCES dates (id),
  FOREIGN KEY(time_slot_id) REFERENCES time_slots (id)
);
-- ALTER SEQUENCE reservations_res_id_seq RESTART WITH 10000000 INCREMENT BY 1;

-- SELECT * FROM restaurant R INNER JOIN dates D ON D.restaurant_id=R.id AND R.id = 1 INNER JOIN timeSlots T ON T.dates_id=date AND T.dates_id>'2019-09-15';
