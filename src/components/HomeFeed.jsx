import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  setCommunity,
  selectCommunity,
  selectCurrentPosts,
  selectPostsStatus,
  selectPostsError,
} from '../features/posts/postsSlice.js';
import PostList from './PostList.jsx';
import StaleBanner from './StaleBanner.jsx';

// connects the feed to redux: loads posts and decides which state to show
function HomeFeed() {
  const dispatch = useDispatch();
  const community = useSelector(selectCommunity);
  const posts = useSelector(selectCurrentPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  // loads the feed whenever the community changes (or uses the cache)
  useEffect(() => {
    dispatch(fetchPosts({ community }));
  }, [dispatch, community]);

  const retry = () => dispatch(fetchPosts({ community, force: true }));
  const goHome = () => dispatch(setCommunity(null));

  // saved posts stay on screen during reloads and failures, so the feed never goes blank
  const hasSaved = posts.length > 0;
  let listStatus = status === 'idle' ? 'loading' : status;
  if (hasSaved) listStatus = 'succeeded';

  return (
    <>
      {status === 'failed' && hasSaved && (
        <StaleBanner rateLimited={error === 'rate_limit'} onRetry={retry} />
      )}
      <PostList
        posts={posts}
        status={listStatus}
        onRetry={retry}
        onHome={goHome}
        emptyTitle={community ? `No posts in c/${community} yet` : 'No posts yet'}
      />
    </>
  );
}

export default HomeFeed;
