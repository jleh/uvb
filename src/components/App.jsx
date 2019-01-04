import React, { Component } from 'react';
import { func } from 'prop-types';
import moment from 'moment';

import InputForm from './InputForm';
import PointCard from './PointCard';
import Scoreboard from './Scoreboard';
import Menu from './Menu';

import { getPointsWithData } from '../actions';

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
    this.props.getVenues()
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
    this.props.getScores().then(scores => this.setState({ scores }));
    setTimeout(this.getScores, 60000);
  }

  checkLogin() {
    this.props.getUser()
      .then(() => this.loggedIn())
      .catch(() => this.setState({ showLogin: true }));

    setTimeout(this.checkLogin, 60000);
  }

  loggedIn() {
    this.updatePoints();
  }

  addPoints(venue, points) {
    this.setState({ page: 'frontPage' });
    this.props.updatePoints(venue, points)
      .then(() => {
        this.updatePoints();
        this.getScores();
      })
      .catch(() => this.setState({ error: true }));
  }

  updatePoints() {
    this.props.getPoints()
      .then(userPoints => this.setState({ userPoints }))
      .catch(() => this.setState({ error: true }));

    getPointsWithData().then(userPointsWithData => this.setState({ userPointsWithData }));
  }

  render() {
    if (this.state.showLogin) {
      return (
        <div className="loginMessage">
          <a href="/api/login">Kirjaudu sisään Facebook -tunnuksillasi painamalla tästä</a>
        </div>
      );
    }

    let content = '';

    if (this.state.page === 'frontPage') {
      content = (
        <PointCard
          currentVenue={this.state.currentVenue}
          userPoints={this.state.userPoints}
          venues={this.state.venues}
        />
      );
    } else if (this.state.page === 'addPoints') {
      content = (
        <InputForm
          addPoints={this.addPoints}
          currentVenue={this.state.currentVenue}
          userPoints={this.state.userPoints}
          venues={this.state.venues}
          userPoints={this.state.userPointsWithData}
        />
      );
    } else if (this.state.page === 'scoreboard') {
      content = (
        <Scoreboard scores={this.state.scores} />
      );
    }

    return (
      <div className="container">
        {this.state.error ? <div className="error">Virhe, päivitä sivu ja yritä uudelleen.</div> : ''}
        <img alt="uvb 2019" src="uvb-header.jpeg" className="header-img" />
        <Menu changePage={page => this.setState({ page })} />
        {content}
      </div>
    );
  }
}

App.propTypes = {
  getVenues: func.isRequired,
  getScores: func.isRequired,
  getUser: func.isRequired,
  getPoints: func.isRequired,
  updatePoints: func.isRequired
};

export default App;
