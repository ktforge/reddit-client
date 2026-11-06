import { useState } from 'react';
import Header from './components/Header.jsx';
import CommunityList from './components/CommunityList.jsx';
import Drawer from './components/Drawer.jsx';
import PostList from './components/PostList.jsx';
import { mockPosts } from './data/mockPosts.js';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCommunity, setActiveCommunity] = useState(null); // null means home

  // picking a community also closes the drawer on mobile
  const handleSelect = (name) => {
    setActiveCommunity(name);
    setMenuOpen(false);
  };

  // home shows everything, otherwise only the picked community
  const posts = activeCommunity
    ? mockPosts.filter((p) => p.community.name === activeCommunity)
    : mockPosts;

  return (
    <>
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <CommunityList active={activeCommunity} onSelect={handleSelect} />
      </Drawer>
      <div className="layout">
        <main>
          <PostList posts={posts} />
        </main>
        <aside className="layout__sidebar">
          <CommunityList active={activeCommunity} onSelect={handleSelect} />
        </aside>
      </div>
    </>
  );
}

export default App;
