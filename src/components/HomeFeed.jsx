import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  setCommunity,
  setSearchTerm,
  selectCommunity,
  selectSearchTerm,
  selectCurrentPosts,
  selectPostsStatus,
  selectPostsError,
} from '../features/posts/postsSlice.js';
import PostList from './PostList.jsx';
import StaleBanner from './StaleBanner.jsx';
import './HomeFeed.css';

// connects the feed to redux: loads posts and decides which state to show
function HomeFeed() {
  const dispatch = useDispatch();
  const community = useSelector(selectCommunity);
  const term = useSelector(selectSearchTerm);
  const posts = useSelector(selectCurrentPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  // loads the feed or search whenever either one changes (or uses the cache)
  useEffect(() => {
    dispatch(fetchPosts({ community, term }));
  }, [dispatch, community, term]);

  const retry = () => dispatch(fetchPosts({ community, term, force: true }));
  const goHome = () => dispatch(setCommunity(null));
  const clearSearch = () => dispatch(setSearchTerm(''));

  // saved posts stay on screen during reloads and failures, so the feed never goes blank
  const hasSaved = posts.length > 0;
  let listStatus = status === 'idle' ? 'loading' : status;
  if (hasSaved) listStatus = 'succeeded';

  return (
    <>
      {term && (
        <div className="results-bar">
          <span>
            Results for <strong>"{term}"</strong>
            {community && ` in c/${community}`}
          </span>
          <button className="link-btn" onClick={clearSearch}>
            Clear search
          </button>
        </div>
      )}
      {status === 'failed' && hasSaved && (
        <StaleBanner rateLimited={error === 'rate_limit'} onRetry={retry} />
      )}
      <PostList
        posts={posts}
        status={listStatus}
        onRetry={retry}
        onHome={goHome}
        emptyTitle={
          term
            ? `No posts match "${term}"`
            : community
              ? `No posts in c/${community} yet`
              : 'No posts yet'
        }
        {...(term && {
          emptyText: 'Check the spelling or try another word.',
          emptyActionLabel: 'Clear search',
          onEmptyAction: clearSearch,
        })}
      />
    </>
  );
}

export default HomeFeed;
