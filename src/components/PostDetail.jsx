import { Link, useNavigate, useParams } from 'react-router-dom';
import EmptyState from './EmptyState.jsx';
import PostCard from './PostCard.jsx';
import Comment from './Comment.jsx';
import { mockPosts } from '../data/mockPosts.js';
import { mockComments } from '../data/mockComments.js';
import { buildCommentTree } from '../utils/buildCommentTree.js';
import './PostDetail.css';

// full post and its comment thread, picked by the :id in the url
function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const postView = mockPosts.find((p) => p.post.id === Number(id)); // url params are strings

  if (!postView) {
    return (
      <EmptyState
        title="Post not found"
        text="It may have been removed, or the link is wrong."
        actionLabel="Back to Home"
        onAction={() => navigate('/')}
      />
    );
  }

  const comments = mockComments.filter((c) => c.comment.post_id === postView.post.id);
  const tree = buildCommentTree(comments);

  return (
    <div className="detail">
      <Link to="/" className="detail__back">
        ← Back to posts
      </Link>
      <PostCard postView={postView} full />
      <section className="detail__comments" aria-label="Comments">
        <h2>Comments ({postView.counts.comments})</h2>
        {tree.length > 0 ? (
          <ul className="comment-list">
            {tree.map((node) => (
              <Comment key={node.comment.id} node={node} />
            ))}
          </ul>
        ) : (
          <p className="detail__none">No comments yet.</p>
        )}
      </section>
    </div>
  );
}

export default PostDetail;
