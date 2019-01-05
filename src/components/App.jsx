import React, { Component } from 'react';
import moment from 'moment';

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
  }

  componentDidMount() {
    getVenues()
      .then((venues) => {
        this.setState({ venues });
        this.setCurrentVenue();
      });

    this.checkLogin();
    this.getScores();
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
        <img alt="uvb 2019" src="uvb-header.jpeg" className="header-img" />
        <Menu changePage={pageName => this.setState({ page: pageName })} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
