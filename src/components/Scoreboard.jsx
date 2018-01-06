import React from 'react';
import { scoresType } from '../types';

const Scoreboard = ({ scores }) => (
  <div>
    <table className="pure-table pure-table-bordered scoreboard">
      <tbody>
        {scores.map(user => (
          <tr key={user.name}>
            <td>{user.name ? String(user.name).split(' ')[0] : ''}</td>
            <td>{user.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Scoreboard.propTypes = {
  scores: scoresType.isRequired
};

export default Scoreboard;
