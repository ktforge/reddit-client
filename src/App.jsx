import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [status, setStatus] = useState('loading'); // loading, succeeded, or failed
  const [attempt, setAttempt] = useState(0); // bumping this reruns the fake fetch
  const [searchParams] = useSearchParams();
  const forceError = searchParams.has('fail'); // add ?fail to the url to test the error state

  // fake network delay so the loading state shows, replaced by a redux thunk in #7
  useEffect(() => {
    setStatus('loading');
    const timer = setTimeout(() => {
      setStatus(forceError ? 'failed' : 'succeeded');
    }, 600);
    return () => clearTimeout(timer); // cancels if you switch communities mid-load
  }, [activeCommunity, attempt, forceError]);

  const navigate = useNavigate();

  // picking a community closes the drawer and goes back to the feed
  const handleSelect = (name) => {
    setActiveCommunity(name);
    setMenuOpen(false);
    navigate('/');
  };

  const goHome = () => handleSelect(null);

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
            <Route
              path="/"
              element={
                <PostList
                  posts={posts}
                  status={status}
                  onRetry={() => setAttempt((n) => n + 1)}
                  onHome={goHome}
                  emptyTitle={activeCommunity ? `No posts in c/${activeCommunity} yet` : 'No posts yet'}
                />
              }
            />
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
