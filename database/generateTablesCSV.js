const getData = require('./generateDataSDC.js');
const pg = require('./postgresqlDB.js');

// COPY restaurants (total_seats) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/restaurantsTable.csv' DELIMITER ',' CSV HEADER;

// COPY dates (date) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/datesTable.csv' DELIMITER ',' CSV HEADER;

// COPY time_slots (time) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/timeSlotsTable.csv' DELIMITER ',' CSV HEADER;

// COPY reservations(res_name, seats, restaurant_id, date_id, time_slot_id) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/reservationsTable.csv' DELIMITER ',' CSV HEADER;


getData.generateRestaurants();
getData.generateDates();
getData.generateTimes();
