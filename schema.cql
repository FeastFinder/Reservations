DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};

use reservations;

CREATE TABLE reservations (
  id INT,
  restaurant_id INT,
  total_seats INT,
  date date,
  time time,
  res_name TEXT,
  seats INT,
  PRIMARY KEY ((restaurant_id, date), id)
);
