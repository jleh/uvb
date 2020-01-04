import React, { Component } from 'react';
import moment from 'moment';

import { send } from '../notification';

import InputForm from './InputForm';
import PointCard from './PointCard';
import Scoreboard from './Scoreboard';
import Menu from './Menu';

import {
  getPointsWithData,
  getPoints,
  getScores,
  getUser,
  getVenues,
  updatePoints
} from '../actions';

import '../assets/stylesheets/base.scss';
import Alcohol from './Alcohol';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: [],
      userPoints: {},
      currentVenue: { name: '', time: '' },
      error: false,
      page: 'frontPage',
      scores: [],
      userPointsWithData: []
    };

    this.setCurrentVenue = this.setCurrentVenue.bind(this);
    this.addPoints = this.addPoints.bind(this);
    this.getScores = this.getScores.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.notifyNextVenue = this.notifyNextVenue.bind(this);
  }

  componentDidMount() {
    getVenues()
      .then((venues) => {
        this.setState({ venues });
        this.setCurrentVenue();
      });

    this.checkLogin();
    this.getScores();
    this.notifyNextVenue();
  }

  setCurrentVenue() {
    const now = moment();
    const venues = this.state.venues.filter(venue => now.isAfter(moment(venue.time, 'HH:mm')));
    const currentVenue = venues[venues.length - 1] || { name: '', time: '' };

    if (currentVenue !== this.state.currentVenue) {
      this.setState({ currentVenue });
    }

    setTimeout(this.setCurrentVenue, 5000);
  }

  getScores() {
    getScores().then(scores => this.setState({ scores }));
    setTimeout(this.getScores, 60000);
  }

  checkLogin() {
    getUser()
      .then(() => this.loggedIn())
      .catch(() => this.setState({ showLogin: true }));

    setTimeout(this.checkLogin, 60000);
  }

  loggedIn() {
    this.updatePoints();
  }

  addPoints(venue, points) {
    this.setState({ page: 'frontPage' });
    updatePoints(venue, points)
      .then(() => {
        this.updatePoints();
        this.getScores();
      })
      .catch(() => this.setState({ error: true }));
  }

  updatePoints() {
    getPoints()
      .then(userPoints => this.setState({ userPoints }))
      .catch(() => this.setState({ error: true }));

    getPointsWithData().then(userPointsWithData => this.setState({ userPointsWithData }));
  }

  notifyNextVenue() {
    setInterval(() => {
      const FIVE_MINUTES = 5 * 60 * 1000;
      const { venues } = this.state;
      const nextVenue = venues.find((venue) => {
        const diff = moment().diff(moment(venue.time, 'HH:mm'));
        return diff > -FIVE_MINUTES && diff < 0;
      });

      if (nextVenue && !localStorage.getItem(`notified-${nextVenue.name}`)) {
        send(`${nextVenue.name} ${nextVenue.time}`);
        localStorage.setItem(`notified-${nextVenue.name}`, true);
      }
    }, 60000);
  }

  renderContent() {
    const {
      page,
      currentVenue,
      userPoints,
      venues,
      userPointsWithData,
      scores
    } = this.state;

    switch (page) {
      case 'frontPage':
        return (
          <PointCard
            currentVenue={currentVenue}
            userPoints={userPoints}
            userPointsWithData={userPointsWithData}
            venues={venues}
          />
        );
      case 'addPoints':
        return (
          <InputForm
            addPoints={this.addPoints}
            currentVenue={currentVenue}
            venues={venues}
            userPoints={userPointsWithData}
          />
        );
      case 'scoreboard':
        return <Scoreboard scores={scores} />;
      case 'alcohol':
        return <Alcohol points={userPointsWithData} />;
      default:
        return null;
    }
  }

  render() {
    const { showLogin, error } = this.state;

    if (showLogin) {
      return (
        <div className="loginMessage">
          <a href="/api/login">Kirjaudu sisään Facebook -tunnuksillasi painamalla tästä</a>
        </div>
      );
    }

    return (
      <div className="container">
        {error ? <div className="error">Virhe, päivitä sivu ja yritä uudelleen.</div> : ''}
        <img alt="uvb 2020" src="uvb-header.jpeg" className="header-img" />
        <Menu changePage={pageName => this.setState({ page: pageName })} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
