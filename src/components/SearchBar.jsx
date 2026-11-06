import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchTerm, selectSearchTerm } from '../features/posts/postsSlice.js';
import './SearchBar.css';

const DEBOUNCE_MS = 500; // waits this long after the last keystroke before searching
const MIN_LENGTH = 2; // one letter searches aren't worth an api call

// search box: searches once typing stops, or right away on enter
function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const savedTerm = useSelector(selectSearchTerm);
  const [term, setTerm] = useState(savedTerm);

  // keeps the box in sync when the search is cleared somewhere else
  useEffect(() => {
    setTerm(savedTerm);
  }, [savedTerm]);

  // sends the term to redux and makes sure the feed is on screen
  const applySearch = useCallback(
    (value) => {
      const clean = value.trim();
      if (clean === savedTerm) return;
      dispatch(setSearchTerm(clean));
      if (pathname !== '/') navigate('/');
    },
    [dispatch, navigate, pathname, savedTerm],
  );

  // one search after typing stops instead of one per letter
  useEffect(() => {
    const clean = term.trim();
    if (clean.length > 0 && clean.length < MIN_LENGTH) return;
    const timer = setTimeout(() => applySearch(term), DEBOUNCE_MS);
    return () => clearTimeout(timer); // a new keystroke cancels the old timer
  }, [term, applySearch]);

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from reloading
    applySearch(term);
  };

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        placeholder="Search posts"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search posts"
      />
    </form>
  );
}

export default SearchBar;
