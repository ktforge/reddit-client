import './StateMessage.css';
import './StaleBanner.css';

// shown above saved posts when a refresh fails, the old posts stay usable
function StaleBanner({ rateLimited, onRetry }) {
  return (
    <div className="stale" role="status">
      <span>
        {rateLimited
          ? 'Too many requests right now. Showing saved posts.'
          : "Couldn't load new posts. Showing saved posts."}
      </span>
      <button className="link-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default StaleBanner;
