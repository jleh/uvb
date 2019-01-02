import React from 'react';
import { scoresType } from '../types';

const getName = (user, names) => {
  if (!user.name) {
    return '';
  }

  const name = String(user.name).split(' ')[0];

  if (names.get(name)) {
    const lastName = String(user.name).split(' ')[1].charAt(0);
    return `${name} ${lastName}`;
  }

  names.set(name, true);
  return name;
};

const Scoreboard = ({ scores }) => {
  const names = new Map();

  return (
    <div>
      <table className="pure-table pure-table-bordered scoreboard">
        <tbody>
          {scores.map(user => (
            <tr key={user.name}>
              <td>{getName(user, names)}</td>
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
