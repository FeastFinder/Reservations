const moment = require('moment');
const file = require('file-system');
const fs = require('fs');

const startDay = moment().format().slice(0, 10);

console.log(startDay);

const dataDB = [];

const getTimesAndSeats = () => {
  const dateInfo = [];
  let curTime = '1:00';
  for (let i = 0; i < 7; i += 1) {
    const timeSlots = {};
    timeSlots.time = curTime;
    timeSlots.open = Math.floor(Math.random() * 10);
    const split = curTime.split(':');
    if (split[1] === '00') {
      split[1] = '30';
    } else {
      split[0] = (Number(split[0]) + 1).toString();
      split[1] = '00';
    }
    curTime = split.join(':');
    console.log(timeSlots);
    dateInfo.push(timeSlots);
  }
  return dateInfo;
};

for (let i = 1; i < 5; i += 1) {
  const restaurant = {};
  restaurant.restaurant_id = i;
  restaurant.dates = getTimesAndSeats();
  dataDB.push(restaurant);
  // {
  //   date: startDay.add(i, 'day'),
  //   time_slots: {
  //     time:
  //   }
  // } //this needs to be in a different function that will fill all the neccessary days
}
console.log(dataDB);
