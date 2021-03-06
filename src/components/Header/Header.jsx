import React, { PureComponent } from 'react';
import './header.css';

import logo from '../../images/logo.svg';

class Header extends PureComponent {
  render() {
    return (
      <header className="header section">
        <img className="header__logo" src={logo} alt="Логотип Место" />
      </header>
    )
  }
};

export default Header;