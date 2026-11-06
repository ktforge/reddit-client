import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCommunity } from '../features/posts/postsSlice.js';
import SearchBar from './SearchBar.jsx';
import './Header.css';

// top bar: logo, search, and the menu button for smaller screens
function Header({ onMenuClick }) {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={() => dispatch(setCommunity(null))}>
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
