import PostCard from './PostCard.jsx';
import PostSkeleton from './PostSkeleton.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import EmptyState from './EmptyState.jsx';
import './PostList.css';

// picks what to show: skeletons, an error, an empty message, or the posts
function PostList({
  posts,
  status,
  onRetry,
  onHome,
  emptyTitle,
  emptyText = 'Try another community or check back later.',
  emptyActionLabel = 'Back to Home',
  onEmptyAction = onHome,
}) {
  if (status === 'loading') {
    return (
      <section className="post-list" aria-busy="true" aria-label="Loading posts">
        {[1, 2, 3].map((n) => (
          <PostSkeleton key={n} />
        ))}
      </section>
    );
  }

  if (status === 'failed') {
    return <ErrorMessage onRetry={onRetry} onHome={onHome} />;
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        text={emptyText}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <section className="post-list" aria-label="Posts">
      {posts.map((postView, index) => (
        <PostCard key={postView.post.id} postView={postView} index={index} />
      ))}
    </section>
  );
}

export default PostList;
