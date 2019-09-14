DROP KEYSPACE IF EXISTS reservations;

CREATE KEYSPACE reservations WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};

use reservations;

CREATE TABLE restaurants (
  restaurant_id INT,
  seats INT,
  date date,
  time_slot time,
  open INT,
  PRIMARY KEY ((restaurant_id, date), time_slot , open)
);