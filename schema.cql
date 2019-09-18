DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};

use reservations;

CREATE TABLE restaurants (
  id INT,
  total_seats INT,
  PRIMARY KEY (id)
)

CREATE TABLE reservations (
  id INT-> increment,
  restaurant_id,
  date date,
  time time,
  res_name TEXT,
  seats INT,
  PRIMARY KEY ((restaurant_id, date), time)
);
