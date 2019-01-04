import React from 'react';

export default ({
  pointsToAdd,
  pointsText,
  venue,
  confirmPoints,
  closeModal
}) => (
  <div className="modalContent">
    <div>
      <div>Lisätäänkö</div>
      <div className="confirm-points">{pointsText} <strong>{pointsToAdd}</strong>&nbsp;pistettä</div>
      <div>paikkaan</div>
      <div className="confirm-venue">{venue}</div>
    </div>
    <div className="confirm-buttons">
      <button type="button" className="pure-button pure-button-primary button-xlarge" onClick={confirmPoints}>
        Kyllä
      </button>
      <button type="button" className="pure-button button-xlarge" onClick={closeModal}>
        Ei
      </button>
    </div>
  </div>
);
