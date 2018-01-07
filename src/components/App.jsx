import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import InputForm from './InputForm';
import PointCard from './PointCard';
import Scoreboard from './Scoreboard';
import Menu from './Menu';

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
      scores: []
    };

    this.setCurrentVenue = this.setCurrentVenue.bind(this);
    this.addPoints = this.addPoints.bind(this);
    this.getScores = this.getScores.bind(this);
  }

  componentDidMount() {
    axios('api/venues')
      .then((res) => {
        this.setState({ venues: res.data.venues });
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
    axios('/api/scores')
      .then(res => this.setState({ scores: res.data }));

    setTimeout(this.getScores, 60000);
  }

  checkLogin() {
    axios('/api/user')
      .then(() => this.loggedIn())
      .catch(() => this.setState({ showLogin: true }));

    setTimeout(this.checkLogin, 60000);
  }

  loggedIn() {
    this.updatePoints();
  }

  addPoints(venue, points) {
    this.setState({ page: 'frontPage' });
    axios.post('/api/points', { venue, points })
      .then(() => {
        this.updatePoints();
        this.getScores();
      })
      .catch(() => this.setState({ error: true }));
  }

  updatePoints() {
    axios('/api/points')
      .then(res => this.setState({ userPoints: res.data }))
      .catch(() => this.setState({ error: true }));
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
          venues={this.state.venues}
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
        <h1>UVB 2018</h1>
        <Menu changePage={page => this.setState({ page })} />
        {content}
      </div>
    );
  }
}

export default App;
