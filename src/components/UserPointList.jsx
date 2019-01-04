import React from 'react';

export default ({ userPoints }) => (
  <div>
    <table className="pure-table">
      <thead>
        <tr>
          <th>Baari</th>
          <th>Pisteet</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {userPoints.map(point => (
          <tr key={point.id}>
            <td>Baari: {point.venue}</td>
            <td>{point.points}</td>
            <td>
              <button
                type="button"
                className="button-error pure-button"
              >
                Poista
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
