import React, { Component } from 'react';
import moment from 'moment';

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
    fetch('api/venues')
      .then(res => res.json())
      .then((json) => {
        this.setState({ venues: json.venues });
        this.setCurrentVenue();
      });

    this.checkLogin();
    this.getScores();
  }

  setCurrentVenue() {
    const now = moment();
    const venues = this.state.venues.filter(venue => now.isAfter(moment(venue.time, 'HH:mm')));
    const currentVenue = venues[venues.length - 1] || {};

    if (currentVenue !== this.state.currentVenue) {
      this.setState({ currentVenue });
    }

    setTimeout(this.setCurrentVenue, 5000);
  }

  getScores() {
    fetch('/api/scores', { credentials: 'include' })
      .then(res => res.json())
      .then(scores => this.setState({ scores }));

    setTimeout(this.getScores, 60000);
  }

  checkLogin() {
    fetch('/api/user', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(() => this.loggedIn())
      .catch(() => this.setState({ showLogin: true }));

    setTimeout(this.checkLogin, 60000);
  }

  loggedIn() {
    this.updatePoints();
  }

  addPoints(venue, points) {
    this.setState({ page: 'frontPage' });
    fetch('/api/points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venue, points }),
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        this.updatePoints();
        this.getScores();
      })
      .catch(() => this.setState({ error: true }));
  }

  updatePoints() {
    fetch('/api/points', { credentials: 'include' })
      .then(res => res.json())
      .then(userPoints => this.setState({ userPoints }))
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
