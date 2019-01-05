import React, { Component } from 'react';
import { func } from 'prop-types';
import { venuesType } from '../types';

import UserPointList from './UserPointList';
import ConfirmPoints from './ConfirmPoints';
import DrinkButton from './DrinkButton';

const pointTypes = [
  { text: 'Pullo (33 cl) keskiolutta tai siideriä', points: 2 },
  { text: 'Lasi (12 cl) mietoa viiniä', points: 2 },
  { text: 'Väkeviä (4 cl) ravintola-annos', points: 2 },
  { text: '0,5 l tuoppi keskiolutta tai siideriä', points: 3 },
  { text: '0,5 l tuoppi A-olutta tai vahvaa siideriä', points: 4 },
  { text: 'Väärä kirjaus', points: -1 }
];

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

  addPoints(pointType) {
    this.setState({
      modalOpen: true,
      pointsToAdd: pointType.points,
      pointsText: pointType.text,
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
      pointsText,
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
          {pointTypes.map(pointType => (
            <DrinkButton
              key={pointType.text}
              disabled={disabled}
              addPoints={this.addPoints}
              pointType={pointType}
            />
          ))}
        </div>

        <div className={`modal ${modalOpen ? 'open' : 'closed'}`}>
          <ConfirmPoints
            pointsToAdd={pointsToAdd}
            pointsText={pointsText}
            venue={venue}
            confirmPoints={() => this.confirmPoints()}
            closeModal={() => this.setState({ modalOpen: false })}
          />
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
