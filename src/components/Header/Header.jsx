import logo from '../../images/logo.svg';
import './header.css';

function Header() {
  return (
    <header className="header section">
      <img className="header__logo" src={logo} alt="Логотип Место" />
    </header>
  )
}

export default Header;
