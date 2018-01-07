import React, { Component } from 'react';
import { func } from 'prop-types';
import { venuesType, venueType } from '../types';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultVenue: props.currentVenue.name,
      modalOpen: false,
      pointsToAdd: 0,
      venue: ''
    };

    this.addPoints = this.addPoints.bind(this);
    this.confirmPoints = this.confirmPoints.bind(this);
  }

  addPoints(points) {
    this.setState({
      modalOpen: true,
      pointsToAdd: points,
      venue: this.venueInput.value
    });
  }

  confirmPoints() {
    this.props.addPoints(this.state.venue, this.state.pointsToAdd);
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div className="inputForm pure-form">
        <div>
          <select
            className="pure-input-1"
            onChange={e => this.setState({ defaultVenue: e.target.value })}
            ref={(input) => { this.venueInput = input; }}
            value={this.state.defaultVenue}
          >
            {this.props.venues.map(venue => (
              <option
                key={venue.name}
                value={venue.name}
              >
                {venue.name}
              </option>
            ))}
          </select>
        </div>
        <div className="drinkButtons">
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button">
            Pullo (33 cl) keskiolutta tai siideriä <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button">
            Lasi (12 cl) mietoa viiniä <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button">
            Väkeviä (4 cl) ravintola-annos <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(3)} type="button">
            0,5 l tuoppi keskiolutta tai siideriä <br /> 3 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(4)} type="button">
            0,5 l tuoppi A-olutta tai vahvaa siideriä <br /> 4 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(-1)} type="button">
            Väärä kirjaus <br /> -1 pistettä
          </button>
        </div>
        <div className={`modal ${this.state.modalOpen ? 'open' : 'closed'}`}>
          <div className="modalContent">
            <div>
              Lisätäänkö {this.state.pointsToAdd} pistettä paikkaan <strong>{this.state.venue}</strong>
            </div>
            <div className="confirm-buttons">
              <button className="pure-button pure-button-primary" onClick={() => this.confirmPoints()}>Kyllä</button>
              <button className="pure-button" onClick={() => this.setState({ modalOpen: false })}>Ei</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InputForm.propTypes = {
  currentVenue: venueType.isRequired,
  addPoints: func.isRequired,
  venues: venuesType.isRequired
};

export default InputForm;
