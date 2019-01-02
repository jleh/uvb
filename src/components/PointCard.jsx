import React from 'react';
import { object } from 'prop-types';
import { venuesType, venueType } from '../types';

function getPointsForVenue(userPoints, venue) {
  if (!userPoints[venue]) {
    return '';
  }

  if (userPoints[venue].length === 1) {
    return userPoints[venue][0];
  }

  let str = userPoints[venue][0];
  let sum = userPoints[venue][0];

  for (let i = 1; i < userPoints[venue].length; i += 1) {
    str += userPoints[venue][i] < 0 ? ' ' : ' + ';
    str += userPoints[venue][i];
    sum += userPoints[venue][i];
  }

  return `${str} = ${sum}`;
}

function getTotalPoints(userPoints) {
  return Object.keys(userPoints)
    .reduce((sum, name) => userPoints[name].reduce((v, s) => v + s, 0) + sum, 0);
}

const PointCard = ({ currentVenue, venues, userPoints }) => (
  <div>
    <table className="pointTable">
      <tbody>
        {venues.map(venue => (
          <tr
            className="pointCardRow"
            key={venue.name}
          >
            <td className={currentVenue.name === venue.name ? 'pointCardName current' : 'pointCardName'}>
              {venue.name}
            </td>
            <td className="pointCardPoints">{getPointsForVenue(userPoints, venue.name)}</td>
          </tr>
        ))}
        <tr className="totalRow">
          <td>Yhteensä</td>
          <td className="totalCell">{getTotalPoints(userPoints)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

PointCard.propTypes = {
  currentVenue: venueType.isRequired,
  venues: venuesType.isRequired,
  userPoints: object.isRequired // eslint-disable-line
};

export default PointCard;
