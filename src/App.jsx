import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCommunity, selectCommunity } from './features/posts/postsSlice.js';
import Header from './components/Header.jsx';
import CommunityList from './components/CommunityList.jsx';
import Drawer from './components/Drawer.jsx';
import HomeFeed from './components/HomeFeed.jsx';
import PostSkeleton from './components/PostSkeleton.jsx';

// the post page and its comment code load only when someone opens a post
const PostDetail = lazy(() => import('./components/PostDetail.jsx'));
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCommunity = useSelector(selectCommunity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // picking a community closes the drawer and goes back to the feed
  const handleSelect = (name) => {
    dispatch(setCommunity(name));
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <CommunityList active={activeCommunity} onSelect={handleSelect} />
      </Drawer>
      <div className="layout">
        <main>
          <Suspense fallback={<PostSkeleton />}>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </Suspense>
        </main>
        <aside className="layout__sidebar">
          <CommunityList active={activeCommunity} onSelect={handleSelect} />
        </aside>
      </div>
    </>
  );
}

export default App;
