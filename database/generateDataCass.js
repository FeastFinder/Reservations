const moment = require('moment');
const file = require('file-system');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

// brew services start cassandra
// cqlsh
// source 'schema.cql'

const generateRestaurants = () => {
  const restaurants = [];
  for (let i = 0; i < 10000; i += 1) {
    const curRest = {};
    curRest.id = i;
    curRest.totalseats = Math.floor(Math.random() * 10) + 91;
    restaurants.push(curRest);
  }
  return restaurants;
};

const generateDates = () => {
  const dates = [];
  for (let i = 0; i < 90; i += 1) {
    const curDate = {};
    curDate.id = i;
    curDate.date = moment().add(i - 1, 'day').format().slice(0, 10);
    dates.push(curDate);
  }
  return dates;
};


const generateTimes = () => {
  const writeTimeSlotsTable = fs.createWriteStream('database/timeSlotsTable.csv');
  writeTimeSlotsTable.write('id,time\n', 'utf8');
  const time_slots = [];
  let curTime = '12:30:00';
  for (let i = 0; i < 10; i += 1) {
    const time_slot = {};
    time_slot.id = i;
    time_slot.time = curTime;
    const split = curTime.split(':');
    if (split[1] === '00') {
      split[1] = '30';
    } else {
      split[0] = (Number(split[0]) + 1).toString();
      split[1] = '00';
    }
    curTime = split.join(':');
    time_slots.push(time_slot);
  }
  return time_slots;
};

const generatedRestaurants = generateRestaurants();
const generatedDates = generateDates();
const generatedTimes = generateTimes();

const generateReservations = () => {
  const writeReservationsTable = fs.createWriteStream('database/cassandraTable.csv');
  writeReservationsTable.write('id,restaurant_id,total_seats,date,time,res_name,seats\n', 'utf8');
  function writeTenMillionReservations(writer, encoding, callback) {
    let i = 10000000; // 10 mil
    let id = 0;
    function write() {
      let ok = true;
      do {
        const restaurant_id = Math.floor(Math.random() * 10000);
        const total_seats = generatedRestaurants[restaurant_id].totalseats;
        const gendate = generatedDates[Math.floor(Math.random() * 90)].date;
        const gentime = generatedTimes[Math.floor(Math.random() * 10)].time;
        const res_name = faker.name.firstName();
        const seats = Math.floor(Math.random() * 8) + 1;
        const data = `${id},${restaurant_id},${total_seats},${gendate},${gentime},${res_name},${seats}\n`;
        i -= 1;
        id += 1;
        if (id % 10000 === 0) {
          console.log(id);
        }
        if (id === 10000000) {
          writer.write(data, encoding, callback);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // had to stop early!
        // write some more once it drains
        console.log('drained');
        writer.once('drain', write);
      }
    }
    write();
  }

  writeTenMillionReservations(writeReservationsTable, 'utf-8', () => {
    writeReservationsTable.end();
  });
};

generateReservations();

// copy code to cassandra
// COPY reservations (id,restaurant_id,total_seats,date,time,res_name,seats) FROM '/Users/ryanzhong/Documents/HRSF122/SDC/Reservations/database/cassandraTable.csv' WITH HEADER = TRUE ;
