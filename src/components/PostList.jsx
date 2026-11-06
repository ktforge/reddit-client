import PostCard from './PostCard.jsx';
import './PostList.css';

// stacks the post cards, loading and empty states come in step 5
function PostList({ posts }) {
  return (
    <section className="post-list" aria-label="Posts">
      {posts.map((postView) => (
        <PostCard key={postView.post.id} postView={postView} />
      ))}
    </section>
  );
}

export default PostList;
