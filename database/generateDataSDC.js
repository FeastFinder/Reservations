const moment = require('moment');
const file = require('file-system');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const { Pool, Client } = require('pg');
// const pg = require('./postgresqlDB.js');

// const client = new Client({
//   host: 'localhost',
//   database: 'reservations',
// });


// const writeResaurantTable = fs.createWriteStream('restaurantTable.csv');
// writeResaurantTable.write('restaurant_id\n', 'utf8');

const curDate = moment().format().slice(0, 10);

// console.log(curDate);

const generateRestaurants = () => {
  const writeRestaurantsTable = fs.createWriteStream('database/restaurantsTable.csv');
  writeRestaurantsTable.write('id,total_seats\n', 'utf8');
  // const restaurants = [];
  for (let i = 0; i < 10000; i += 1) {
    // const curRest = {};
    // curRest.id = i;
    // curRest.total_seats = Math.floor(Math.random() * 10) + 51;
    // restaurants.push(curRest);
    const id = i;
    const total_seats = Math.floor(Math.random() * 10) + 81;
    writeRestaurantsTable.write(`${id},${total_seats}\n`);
    // client.query(`INSERT INTO restaurants (id, total_seats) values (${i}, ${total_seats}`, (err, res) => { console.log('completed', i); })
  }
  writeRestaurantsTable.end();
  // return restaurants;
};

const generateDates = () => {
  const writeDatesTable = fs.createWriteStream('database/datesTable.csv');
  writeDatesTable.write('id,date\n', 'utf8');
  // const dates = [];
  for (let i = 0; i < 90; i += 1) {
    // const curDate = {};
    // curDate.id = i;
    // curDate.date = moment().add(i - 1, 'day').format().slice(0, 10);
    // dates.push(curDate);
    const id = i;
    const date = moment().add(i - 1, 'day').format().slice(0, 10);
    writeDatesTable.write(`${id},${date}\n`);
  }
  writeDatesTable.end();
  // return dates;
};


const generateTimes = () => {
  const writeTimeSlotsTable = fs.createWriteStream('database/timeSlotsTable.csv');
  writeTimeSlotsTable.write('id,time\n', 'utf8');
  // const time_slots = [];
  let curTime = '12:30:00';
  for (let i = 0; i < 10; i += 1) {
    // const time_slot = {};
    // time_slot.id = i;
    // time_slot.time = curTime;
    const id = i;
    const split = curTime.split(':');
    if (split[1] === '00') {
      split[1] = '30';
    } else {
      split[0] = (Number(split[0]) + 1).toString();
      split[1] = '00';
    }
    curTime = split.join(':');
    // time_slots.push(time_slot);
    writeTimeSlotsTable.write(`${id},${curTime}\n`);
  }
  // return time_slots;
  writeTimeSlotsTable.end();
};

const generateReservations = () => {
  const writeReservationsTable = fs.createWriteStream('database/reservationsTable.csv');
  writeReservationsTable.write('id,res_name,seats,restaurant_id,date_id,time_slot_id\n', 'utf8');
  function writeTenMillionReservations(writer, encoding, callback) {
    let i = 10000000; // 10 mil
    let id = 0;
    function write() {
      let ok = true;
      do {
        const res_name = faker.name.firstName();
        const seats = Math.ceil(Math.random() * 10);
        const restaurant_id = Math.floor(Math.random() * 10000);
        const date_id = Math.floor(Math.random() * 90);
        const time_slot_id = Math.floor(Math.random() * 10);
        const data = `${id},${res_name},${seats},${restaurant_id},${date_id},${time_slot_id}\n`;
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

// const dataDB = [];

// const getTimesAndSeats = () => {
//   const dateInfo = [];
//   let curTime = '13:00:00';
//   for (let i = 0; i < 5; i += 1) {
//     const timeSlots = {};
//     timeSlots.time = curTime;
//     timeSlots.open = Math.floor(Math.random() * 10);
//     const split = curTime.split(':');
//     if (split[1] === '00') {
//       split[1] = '30';
//     } else {
//       split[0] = (Number(split[0]) + 1).toString();
//       split[1] = '00';
//     }
//     curTime = split.join(':');
//     dateInfo.push(timeSlots);
//   }
//   return dateInfo;
// };

// const getDates = () => {
//   const curDatesArr = [];
//   for (let i = 1; i < 32; i += 1) {
//     const curDay = {};
//     curDay.date = curDate;
//     curDay.timeSlot = getTimesAndSeats();
//     curDatesArr.push(curDay);
//     curDate = moment().add(i, 'day').format().slice(0, 10);
//   }
//   curDate = moment().format().slice(0, 10);
//   return curDatesArr;
// };


// function writeTenMillionUsers(writer, encoding, callback) {
//   let i = 10000000;
//   let id = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       id += 1;
//       const restaurant = {};
//       restaurant.restaurant_id = id;
//       restaurant.dates = getDates();
//       const data = `${id}\n`;
//       if (id % 1000 === 0) {
//         console.log(id);
//       }
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
//         // see if we should continue, or wait
//         // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       console.log('drained');
//       writer.once('drain', write);
//     }
//   }
//   write();
// }

// // populates main array
// // for (let i = 1; i < 100000; i += 1) {
// //   const restaurant = {};
// //   restaurant.restaurant_id = i;
// //   restaurant.dates = getDates();
// //   dataDB.push(restaurant);
// //   if (i % 10000 === 0) {
// //     console.log(i);
// //   }
// // }
// writeTenMillionUsers(writeResaurantTable, 'utf-8', () => {
//   writeResaurantTable.end();
// });

module.exports = {
  generateRestaurants,
  generateDates,
  generateTimes,
  generateReservations,
};
