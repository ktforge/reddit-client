import './PostSkeleton.css';

// gray placeholder shaped like a post card, shown while posts load
function PostSkeleton() {
  return (
    <div className="skeleton" aria-hidden="true">
      <div className="skeleton__votes shimmer"></div>
      <div className="skeleton__body">
        <div className="skeleton__line shimmer"></div>
        <div className="skeleton__line skeleton__line--short shimmer"></div>
        <div className="skeleton__media shimmer"></div>
      </div>
    </div>
  );
}

export default PostSkeleton;
