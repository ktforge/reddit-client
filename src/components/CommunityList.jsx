import { mockCommunities } from '../data/mockCommunities.js';
import './CommunityList.css';

// preset communities, used in the desktop sidebar and the mobile drawer
function CommunityList({ active, onSelect }) {
  return (
    <nav className="communities" aria-label="Communities">
      <h2 className="communities__title">Communities</h2>
      <ul className="communities__list">
        {mockCommunities.map((c) => (
          <li key={c.title}>
            <button
              className={`communities__item ${c.name === active ? 'is-active' : ''}`}
              onClick={() => onSelect(c.name)}
              aria-current={c.name === active ? 'page' : undefined}
            >
              <span className="communities__icon" aria-hidden="true"></span>
              {c.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CommunityList;
