/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import PartySize from './partySize.jsx';
import DateModule from './dateModule.jsx';
import TimeModule from './timeModule.jsx';
import moment from 'moment';

const Title = styled.div`
width: 100%;
border-sizing: border-box;
color: #000;
font-size: 120%;
align-self: center;
text-align: center;
border-bottom: 1px solid rgb(216, 217, 219);
padding-bottom: 4%;
`;

const TitleModule = styled.div`
width: 90%;
border-sizing: border-box;
display: flex;
align-self: center;
flex-direction: column;
padding: 4%;
margin-right: auto;
margin-left: auto;
`;

const Reservation = styled.div`
boder-sizing: border-box;
display: flex;
flex-direction: column;
// border: 1px solid black;
width: 20%;
height: 300px;
border-radius: 1px;
box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.4);
`;

const PartyModule = styled.div`
border-sizing: border-box;
padding-right: 4%;
padding-left: 4%;
align-self: center;
width: 90%;
height: 15%;
margin-right: auto;
margin-left: auto;
`;

const DateTime = styled.div`
align-self: center;
border-sizing: border-box;
padding-left: 4%;
padding-right: 4%;
padding-bottom: 4%;
display: flex;
width: 90%;
height: 15%;
`;

const FindTable = styled.button`
background-color: #DA3743;
color: #fff;
align-self: center;
width: 100%;
height: 100%;
size: 50%;
font-size: 90%;
{FindTable}: hover {
  opacity: 0.7;
}
border-radius: 4%;
`;

FindTable.displayName = 'FindTable';

const FindDiv = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
width: 100%;
padding-left: 4%;
padding-right: 4%;
margin-top: 5%;
align-self: center;
height: 15%;
margin-right: auto;
margin-left: auto;
`;

FindDiv.displayName = 'FindDiv';

const BookedDiv = styled.div`
box-sizing: border-box;
width: 100%;
display: flex;
align-self: center;
padding: 4%;
margin-right: auto;
margin-left: auto;
`;

const Booked = styled.div`
align-self: left;
font-size: 80%;
`;

const PossibleTime = styled.div`
background-color: #DA3743;
border: 1px solid #fff;
color: #fff;
border-radius: 8%;
width: 33%;
display: block;
{PossibleTime}: hover {
  opacity: 0.7;
}
`;

const ErrorMessage = styled.div``;

const SelectReservation = styled.div`
background-color: #fff;
box-sizing: border-box;
display: flex;
justify-content: space-evenly;
align-content: space-between;
`;
SelectReservation.displayName = 'SelectReservation';

const SelectTitle = styled.div`
align-self: center;
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);

    this.listingData = [];

    this.state = {
      hours: '',
      find: false,
      time: '',
      partySize: 1,
      date: '',
      openSeatTimes: [],
    };

    this.getListingData = this.getListingData.bind(this);
    this.findTime = this.findTime.bind(this);
    this.setReservationTime = this.setReservationTime.bind(this);
    this.findPartySize = this.findPartySize.bind(this);
    this.getDay = this.getDay.bind(this);
    this.findTimeRange = this.findTimeRange.bind(this);
    this.getOpenSeatTimes = this.getOpenSeatTimes.bind(this);
  }

  componentDidMount() {
    const loc = window.location.pathname;
    const id = loc.split('/')[1];
    //change intial render data for hours and time to go from current date and start restaurant time
    this.getListingData(id)
      .then((data) => {
        this.listingData = data;
        this.setState({
          hours: data[0].Hours,
          time: data[0].Hours.split('--')[0],
        });
      })
      .then(() => {
        const currentDay = moment().format().slice(0, 10);
        this.setState({
          date: currentDay,
        });
        this.getDay();
      });
  }

  getDay() {
    const dayReserves = this.listingData.filter((day) => {
      const daysInFile = day.Date.slice(0, 10);
      return daysInFile === this.state.date;
    });
    this.findTimeRange(dayReserves[0].Seats);
  }

  findTimeRange(day) {
    const startReserveMoment = moment(this.state.time).subtract(1, 'h').subtract(30, 'm').format();
    const endReserveMoment = moment(this.state.time).add(1, 'h').add(30, 'm').format();
    const timeRange = day.filter((times) => {
      const testAfter = moment(times.time).isSameOrAfter(startReserveMoment);
      const testBefore = moment(times.time).isSameOrBefore(endReserveMoment);
      if (testAfter && testBefore) {
        return true;
      }
      return false;
    });
    const openTimes = this.getOpenSeatTimes(timeRange);
    console.log(openTimes);
    this.setState({
      openSeatTimes: openTimes
    })
  }

  getOpenSeatTimes(reserveRange) {
    const openSeats = reserveRange.filter((seatTimes) => {
      return this.state.partySize <= seatTimes.reservations.open;
    });
    return openSeats;
  }

  getListingData(listing = 'L1') {
    return fetch(`/api/${listing}/reservations`, {
      method: 'GET',
    })
      .then((res) => (
        res.json()
      ))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Error with retrieving data', err);
      });
  }

  setReservationTime(event) {
    this.getDay();
    const newTime = event.target.value;
    this.setState({
      time: newTime,
      find: false,
    });
  }

  findPartySize(event) {
    this.getDay();
    this.setState({
      partySize: event.target.value,
      find: false,
    });
  }

  findTime(event) {
    this.getDay();
    this.setState({
      find: true,
    });
  }


  render() {
    let findReservation = [];
    const errorMessage = (
      <ErrorMessage>
        At the moment, there's no online availability within 2.5 hours of {moment(this.state.time).format('h:mm A')}.
        <br />
        Have another time in mind?
      </ErrorMessage>
    );
    const open = this.state.hours.split('--')[0];
    const close = this.state.hours.split('--')[1];

    const allAvailableTimes = [];

    this.state.openSeatTimes.forEach((time) => {
      const availableTimeAdd15 = moment(time.time).add(15, 'm').format();
      allAvailableTimes.push(time.time, availableTimeAdd15);
    });

    console.log('all', allAvailableTimes);
    if (allAvailableTimes.length === 0) {
      findReservation.push(errorMessage);
    } else if (allAvailableTimes.length < 5) {
      findReservation = allAvailableTimes.map((time) => {
        const availableTime = moment(time).format('h:mm A');
        return (<PossibleTime>{availableTime}</PossibleTime>);
      });
    } else if (allAvailableTimes.indexOf(this.state.time) !== -1) {
      const indexTime = allAvailableTimes.indexOf(this.state.time);
      for (let i = indexTime - 2; i <= indexTime + 2; i++) {
        if (moment(allAvailableTimes[i]).isBefore(close) && moment(allAvailableTimes[i]).isSameOrAfter(open)) {
          const availableTime = moment(allAvailableTimes[i]).format('h:mm A');
          findReservation.push(<PossibleTime>{availableTime}</PossibleTime>);
        }
      }
    } else {

    }

    const selectTime = (
      <SelectReservation>
        <SelectTitle>Select a time:</SelectTitle>
        {findReservation}
      </SelectReservation>
    );

    return (
      <Reservation>
        <TitleModule>
          <Title>Make a reservation</Title>
        </TitleModule>
        <PartyModule>
          <PartySize findPartySize={this.findPartySize} />
        </PartyModule>
        <DateTime>
          <DateModule />
          <TimeModule setReservationTimes={this.setReservationTime} hours={this.state.hours} />
        </DateTime>
        <FindDiv>
          {this.state.find ? selectTime : <FindTable onClick={this.findTime}>Find a Table</FindTable>}
        </FindDiv>
        <BookedDiv>
          <Booked>
            Booked 65 times today
          </Booked>
        </BookedDiv>
      </Reservation>
    );
  }
}


export default Reservations;
