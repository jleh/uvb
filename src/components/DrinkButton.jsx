import React from 'react';

export default ({ pointType, addPoints, disabled }) => (
  <button
    key={pointType.text}
    className="pure-button"
    onClick={() => addPoints(pointType)}
    type="button"
    disabled={disabled}
  >
    {pointType.text}
    <br />
    {pointType.points} pistettä
  </button>
);
