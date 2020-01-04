import React from 'react';
import { func } from 'prop-types';

const Menu = ({ changePage }) => (
  <div className="pure-menu pure-menu-horizontal">
    <ul className="pure-menu-list">
      <li className="pure-menu-item">
        <a
          className="pure-menu-link"
          href="#points"
          onClick={() => changePage('frontPage')}
        >
          Pistekortti
        </a>
      </li>
      <li className="pure-menu-item">
        <a
          className="pure-menu-link"
          href="#addPoints"
          onClick={() => changePage('addPoints')}
        >
          Kirjaa juomia
        </a>
      </li>
      <li className="pure-menu-item">
        <a
          className="pure-menu-link"
          href="#addPoints"
          onClick={() => changePage('scoreboard')}
        >
          Yhteispisteet
        </a>
      </li>
      <li className="pure-menu-item">
        <a
          className="pure-menu-link"
          href="#addPoints"
          onClick={() => changePage('alcohol')}
        >
          &#8240;
        </a>
      </li>
    </ul>
  </div>
);

Menu.propTypes = {
  changePage: func.isRequired
};

export default Menu;
