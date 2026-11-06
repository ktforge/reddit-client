import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import CommunityList from './components/CommunityList.jsx';
import Drawer from './components/Drawer.jsx';
import PostList from './components/PostList.jsx';
import PostDetail from './components/PostDetail.jsx';
import { mockPosts } from './data/mockPosts.js';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCommunity, setActiveCommunity] = useState(null); // null means home

  const navigate = useNavigate();

  // picking a community closes the drawer and goes back to the feed
  const handleSelect = (name) => {
    setActiveCommunity(name);
    setMenuOpen(false);
    navigate('/');
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
          <Routes>
            <Route path="/" element={<PostList posts={posts} />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <aside className="layout__sidebar">
          <CommunityList active={activeCommunity} onSelect={handleSelect} />
        </aside>
      </div>
    </>
  );
}

export default App;
