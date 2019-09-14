DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

\connect reservations;

CREATE TABLE restaurant (
  restaurant_id INT PRIMARY KEY
);

CREATE TABLE dates (
  date date NOT NULL PRIMARY KEY,
  seatNumber SMALLINT NOT NULL,
  restaurant_id INT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

CREATE TABLE timeSlots (
  time VARCHAR(50) NOT NULL,
  open SMALLINT NOT NULL,
  dates_id date NOT NULL,
  FOREIGN KEY (dates_id) REFERENCES dates(date)
);

-- SELECT * FROM restaurant R INNER JOIN dates D ON D.restaurant_id=R.id AND R.id = 1 INNER JOIN timeSlots T ON T.dates_id=date AND T.dates_id>'2019-09-15';