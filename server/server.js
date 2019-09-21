require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const moment = require('moment');


const app = express();
const port = 3002;
// const database = require('../database/database.js');
const database = require('../database/postgresqlDB.js');

app.use(cors());
app.use(morgan());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/:id/reservations', express.static('public'));

app.use(express.static('public'));

app.get('/api/restaurant/:id/reservations/', (req, res) => {
  const param = req.params.id;
  // const day = req.params.date;
  // console.log(day);
  database.getListingData(param, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
  // .then((data) => {
  //   const dataForListing = data[0].Dates.slice();
  //   res.send(dataForListing);
  // })
  // .catch((err) => {
  //   console.log('Error with retriving data for listing', err);
  // });
});

app.post('/api/restaurant/:id/reservations', (req, res) => {
  const param = req.params.id;
  console.log(req.body);
  database.postNewRes(param, req.body);
  res.end();
});

app.put('/api/restaurant/:id/reservations/:reservation_id', (req, res) => {
  const param = req.params.reservation_id;
  database.updateRes(req.body);
  res.end();
});

app.delete('/api/restaurant/:id/reservations/:reservation_id', (req, res) => {
  // const param = req.params.id;
  const param = req.params.reservation_id;
  database.deleteRes(param);
  res.end();
});

app.listen(port, () => { console.log(`argh matey we be arriving at port ${port}`); });
