const file = require('file-system');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const getData = require('./generateDataSDC.js');


getData.generateReservations();
