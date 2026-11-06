import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import './Header.css';

// top bar: logo, search, and the menu button for smaller screens
function Header({ onMenuClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <span className="header__dot" aria-hidden="true"></span>
        RedditLite
      </Link>
      <SearchBar />
      <button
        className="header__menu"
        onClick={onMenuClick}
        aria-label="Open communities menu"
      >
        ☰
      </button>
    </header>
  );
}

export default Header;
