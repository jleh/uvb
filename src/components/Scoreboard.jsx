import React from 'react';
import { scoresType } from '../types';

const getName = score => String(score.name).split(' ')[0];
const getLastName = score => String(score.name).split(' ')[1].charAt(0);

/* eslint-disable no-param-reassign */
const findDuplicateNames = (scores) => {
  const names = new Map();

  scores.forEach((score) => {
    const name = getName(score);

    if (names.get(name) === false) {
      scores
        .filter(user => getName(user) === name)
        .forEach((user) => { user.displayName = `${name} ${getLastName(user)}`; });

      names.set(name, true);
    } else if (names.get(name) === undefined) {
      score.displayName = name;
      names.set(name, false);
    }
  });
};
/* eslint-enable no-param-reassign */

const Scoreboard = ({ scores }) => {
  findDuplicateNames(scores);

  return (
    <div>
      <table className="pure-table pure-table-bordered scoreboard">
        <tbody>
          {scores.map(user => (
            <tr key={user.displayName}>
              <td>{user.displayName}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Scoreboard.propTypes = {
  scores: scoresType.isRequired
};

export default Scoreboard;
