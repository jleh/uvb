import React, { useState, useRef } from 'react';
import moment from 'moment';

const Alcohol = ({ points }) => {
  const [weight, setWeight] = useState(Number(localStorage.getItem('weight')) || 0);
  const [gender, setGender] = useState(localStorage.getItem('gender') || 'F');
  const input = useRef(null);

  const handleInput = () => {
    setWeight(Number(input.current.value));
    localStorage.setItem('weight', input.current.value);
  };

  const handleGenderSelect = (e) => {
    setGender(e.target.value);
  };

  const reset = () => {
    setWeight(0);
    localStorage.setItem('weight', 0);
  };

  if (weight === 0) {
    return (
      <div>
        <div>Syötä painosi. Tietoa ei tallenneta palveluun.</div>
        <div>
          <input className="weight-input" type="number" ref={input} />
        </div>
        <div>
          <input type="radio" name="gender" value="M" onChange={handleGenderSelect} /> Mies
          <input type="radio" name="gender" value="F" defaultChecked onChange={handleGenderSelect} /> Nainen
        </div>
        <button type="button" onClick={handleInput}>OK</button>
      </div>
    );
  }

  if (points.length === 0) {
    return null;
  }

  const firstLogged = moment(points[0].logged);
  const lastLogged = moment().add(30, 'm');
  const totalPoints = points.reduce((sum, point) => sum + Number(point.points), 0);
  const diff = lastLogged.diff(firstLogged) / 1000 / 3600;
  const factor = gender === 'M' ? 0.75 : 0.66;

  const ALC_GRAMS_PER_UNIT = 12;

  const permilles = ((totalPoints / 2) * ALC_GRAMS_PER_UNIT - (weight / 10) * diff) / (factor * weight);

  return (
    <div>
      <button type="button" onClick={reset}>Aseta tiedot</button>
      <div className="permilles">
        {permilles.toFixed(2)} &#8240;
      </div>
    </div>
  );
};

export default Alcohol;
