import React, { Component } from 'react';
import { func } from 'prop-types';
import { venuesType } from '../types';

import UserPointList from './UserPointList';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editorOpen: false,
      pointsToAdd: 0,
      venue: '',
      disabled: true
    };

    this.addPoints = this.addPoints.bind(this);
    this.confirmPoints = this.confirmPoints.bind(this);
  }

  onChange = (e) => {
    this.setState({
      disabled: e.target.value === '' || e.target.value === 'Valitse baari'
    });
  }

  addPoints(points) {
    this.setState({
      modalOpen: true,
      pointsToAdd: points,
      venue: this.venueInput.value
    });
  }

  confirmPoints() {
    const { addPoints } = this.props;
    const { venue, pointsToAdd } = this.state;

    addPoints(venue, pointsToAdd);
    this.setState({ modalOpen: false });
  }

  renderEditor() {
    const { userPoints } = this.props;

    return <UserPointList userPoints={userPoints} />;
  }

  render() {
    const {
      disabled,
      modalOpen,
      pointsToAdd,
      venue,
      editorOpen
    } = this.state;
    const { venues } = this.props;

    return (
      <div className="inputForm pure-form">
        <div>
          <select
            className="pure-input-1 venue-select"
            onChange={this.onChange}
            ref={(input) => { this.venueInput = input; }}
          >
            <option>Valitse baari</option>
            {venues.map(({ name }) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div className="drinkButtons">
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button" disabled={disabled}>
            Pullo (33 cl) keskiolutta tai siideriä <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button" disabled={disabled}>
            Lasi (12 cl) mietoa viiniä <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(2)} type="button" disabled={disabled}>
            Väkeviä (4 cl) ravintola-annos <br /> 2 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(3)} type="button" disabled={disabled}>
            0,5 l tuoppi keskiolutta tai siideriä <br /> 3 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(4)} type="button" disabled={disabled}>
            0,5 l tuoppi A-olutta tai vahvaa siideriä <br /> 4 pistettä
          </button>
          <button className="pure-button" onClick={() => this.addPoints(-1)} type="button" disabled={disabled}>
            Väärä kirjaus <br /> -1 pistettä
          </button>
        </div>

        <div className={`modal ${modalOpen ? 'open' : 'closed'}`}>
          <div className="modalContent">
            <div>
              Lisätäänkö {pointsToAdd} pistettä paikkaan <strong>{venue}</strong>
            </div>
            <div className="confirm-buttons">
              <button type="button" className="pure-button pure-button-primary" onClick={() => this.confirmPoints()}>
                Kyllä
              </button>
              <button type="button" className="pure-button" onClick={() => this.setState({ modalOpen: false })}>
                Ei
              </button>
            </div>
          </div>
        </div>

        {editorOpen && this.renderEditor()}
      </div>
    );
  }
}

InputForm.propTypes = {
  addPoints: func.isRequired,
  venues: venuesType.isRequired
};

export default InputForm;
