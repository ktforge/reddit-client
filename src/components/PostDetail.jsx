import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPost,
  fetchComments,
  selectPostById,
  selectPostEntry,
  selectCommentsEntry,
} from '../features/detail/detailSlice.js';
import PostCard from './PostCard.jsx';
import PostSkeleton from './PostSkeleton.jsx';
import Comment from './Comment.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { buildCommentTree } from '../utils/buildCommentTree.js';
import './PostDetail.css';

// full post and its comment thread, picked by the :id in the url
function PostDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Number(useParams().id); // url params are strings
  const validId = Number.isInteger(id) && id > 0;

  const postView = useSelector((state) => selectPostById(state, id));
  const postEntry = useSelector((state) => selectPostEntry(state, id));
  const commentsEntry = useSelector((state) => selectCommentsEntry(state, id));

  // the post usually comes from a saved feed, it's only fetched for direct links
  useEffect(() => {
    if (!validId) return;
    if (!postView) dispatch(fetchPost({ postId: id }));
    dispatch(fetchComments({ postId: id }));
  }, [dispatch, id, validId, postView]);

  const goHome = () => navigate('/');

  if (!validId || postEntry?.error === 'couldnt_find_post') {
    return (
      <EmptyState
        title="Post not found"
        text="It may have been removed, or the link is wrong."
        actionLabel="Back to Home"
        onAction={goHome}
      />
    );
  }

  if (!postView) {
    if (postEntry?.status === 'failed') {
      return (
        <ErrorMessage
          title="Couldn't load this post"
          onRetry={() => dispatch(fetchPost({ postId: id, force: true }))}
          onHome={goHome}
        />
      );
    }
    return <PostSkeleton />;
  }

  const comments = commentsEntry?.item ?? [];
  const tree = buildCommentTree(comments);
  const total = postView.counts.comments;

  return (
    <div className="detail">
      <Link to="/" className="detail__back">
        ← Back to posts
      </Link>
      <PostCard postView={postView} full />
      <section className="detail__comments" aria-label="Comments">
        <h2>Comments ({total})</h2>
        {commentsEntry?.status === 'failed' ? (
          <div className="detail__error" role="alert">
            Couldn't load comments.{' '}
            <button
              className="link-btn"
              onClick={() => dispatch(fetchComments({ postId: id, force: true }))}
            >
              Try again
            </button>
          </div>
        ) : commentsEntry?.status !== 'succeeded' ? (
          <div className="detail__loading" aria-busy="true" aria-label="Loading comments">
            <div className="skeleton__line shimmer"></div>
            <div className="skeleton__line skeleton__line--short shimmer"></div>
            <div className="skeleton__line shimmer"></div>
          </div>
        ) : tree.length > 0 ? (
          <>
            <ul className="comment-list">
              {tree.map((node) => (
                <Comment key={node.comment.id} node={node} />
              ))}
            </ul>
            {total > comments.length && (
              <p className="detail__more">Showing the top {comments.length} comments.</p>
            )}
          </>
        ) : (
          <p className="detail__none">No comments yet.</p>
        )}
      </section>
    </div>
  );
}

export default PostDetail;
