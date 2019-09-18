const getData = require('./generateDataSDC.js');
const pg = require('./postgresqlDB.js');

// COPY restaurants (id,total_seats) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/restaurantsTable.csv' DELIMITER ',' CSV HEADER;

// COPY dates (id,date) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/datesTable.csv' DELIMITER ',' CSV HEADER;

// COPY time_slots (id,time) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/timeSlotsTable.csv' DELIMITER ',' CSV HEADER;

// COPY reservations(id,res_name, seats, restaurant_id, date_id, time_slot_id) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/reservationsTable.csv' DELIMITER ',' CSV HEADER;


getData.generateRestaurants();
getData.generateDates();
getData.generateTimes();
