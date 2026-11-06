import { useState } from 'react';
import './SearchBar.css';

// controlled input, hooked up to redux in the search task
function SearchBar() {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from reloading
    console.log('search for:', term);
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
