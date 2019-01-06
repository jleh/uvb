import React from 'react';
import { object } from 'prop-types';
import { venuesType, venueType } from '../types';

function getPointsForVenue(userPoints, venue) {
  if (!userPoints[venue]) {
    return '';
  }

  if (userPoints[venue].length === 1) {
    return Number(userPoints[venue][0]);
  }

  let str = Number(userPoints[venue][0]);
  let sum = Number(userPoints[venue][0]);

  for (let i = 1; i < userPoints[venue].length; i += 1) {
    str += Number(userPoints[venue][i]) < 0 ? ' ' : ' + ';
    str += Number(userPoints[venue][i]);
    sum += Number(userPoints[venue][i]);
  }

  return `${str} = ${sum}`;
}

function getTotalPoints(userPoints) {
  return userPoints.reduce((sum, row) => sum + Number(row.points), 0);
}

const PointCard = ({
  currentVenue,
  venues,
  userPoints,
  userPointsWithData
}) => (
  <div>
    <table className="pure-table pure-table-bordered">
      <tbody>
        {venues.map(venue => (
          <tr
            key={venue.name}
            className={currentVenue.name === venue.name ? 'current' : ''}
          >
            <td>{venue.time.replace(':', '.')}</td>
            <td>
              {venue.name}
            </td>
            <td className="pointCardPoints">
              {getPointsForVenue(userPoints, venue.name)}
            </td>
          </tr>
        ))}
        <tr className="totalRow">
          <td colSpan="2">
            Yhteensä
          </td>
          <td className="totalCell">{getTotalPoints(userPointsWithData)}</td>
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
