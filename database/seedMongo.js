/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const Promise = require('bluebird');
const mongoose = require('mongoose');
const moment = require('moment');


// mongoose.connect('mongodb://localhost/Reservations', { useNewUrlParser: true })
//   .then(() => { console.log('Mango be connected'); })
//   .catch((error) => { console.log('Mango tree have error ', error); });

// const db = mongoose.connection;

// db.once('open', () => {

//   const reservationSchema = new mongoose.Schema({
//     Listing: String,
//     Dates: [
//       {
//         SeatNumber: Number,
//         Hours: String,
//         Date: String,
//         Seats: [
//           {
//             time: String,
//             reservations: {
//               open: Number,
//               reserved: Number
//             }
//           }
//         ]
//       }
//     ]
//   });

//   const ReservationDocument = mongoose.model('Reservation', reservationSchema);
//   ReservationDocument.deleteMany({}).exec()
//     .then(() => { console.log('Documents Removed'); })
//     .catch((err) => { console.log('Error in removing', err); });

//   // let startDay;
//   // let startYear;
//   // let startMonth;

//   // (() => {
//   //   const date = new Date();
//   //   startDay = date.getDate();
//   //   startYear = date.getFullYear();
//   //   startMonth = date.getMonth() + 1;
//   // })();

//   // const daysInMonth = (month, year) => (
//   //   new Date(year, month, 0).getDate()
//   // );

const generateMomentTime = (time) => {
  let hour = Math.floor(time);
  if(hour < 10) {
    hour = `0${hour}`
  }
  if (time % 1 !== 0) {
    return `${hour}:30:00`
  } else {
    return `${hour}:00:00`
  }
}

const generateSeatsPerTimePerDay = (openHour, closeHour, totalSeats, dayMoment) => {
  const all = [];
  const date = dayMoment.slice(0, 11);
  const timeZone = dayMoment.slice(19);
  let currentStartHour = generateMomentTime(openHour);
  let currentEndHour = generateMomentTime(closeHour);
  currentStartHour = `${date}${currentStartHour}${timeZone}`;
  currentEndHour = `${date}${currentEndHour}${timeZone}`;
  // currentStartHour.add(30, 'minutes');
  // console.log(moment(currentStartHour, moment.ISO_8601, true).isValid());
  // console.log(currentStartHour);
  currentStartHour = moment(currentStartHour);
  currentEndHour = moment(currentEndHour);

  let durate = moment.duration(currentEndHour.diff(currentStartHour)).as('hours');
  console.log(durate);
  return all;
};

const generateDatesPerListing = () => {
  const allDays = [];
  const seats = Math.floor(Math.random() * 101);
  const openingHour = Math.floor(Math.random() * 24);
  const closingHour = openingHour + Math.ceil(Math.random() * (24 - openingHour)) + (Math.floor((Math.random() * 2)) ? 0.5 : 0);
  const current = moment().local();
  for (let i = 0; i < 100; i++) {
    const currentDate = current.format();
    // console.log(typeof currentDate);
    const hours = `${openingHour}-${closingHour}`
    const thisDate = { SeatNumber: seats, Hours: hours, Date: currentDate
      , Seats: generateSeatsPerTimePerDay(openingHour, closingHour, seats, currentDate)
    };
    current.add(1, 'day');
    allDays.push(thisDate);
  }
  return allDays;
};


generateDatesPerListing();

// (() => {
//   const allData = [];
//   for (let i = 1; i <= 100; i++) {
//     const list = `L${i}`;
//     const restaurantObj = {
//       Listing: list,
//       Dates: generateDatesPerListing()
//     };
//     const restaurant = new ReservationDocument(restaurantObj);
//     allData.push(restaurant.save());
//   }
//   Promise.all(allData)
//     .then(() => { console.log('Mango planted'); })
//     .catch((error) => { console.log('Error with Mango planting', error); });
// })();
// });
