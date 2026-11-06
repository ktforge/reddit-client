import { formatScore, timeAgo } from '../utils/format.js';
import './PostCard.css';

// one post in the feed: votes, title, community, media or text, and footer
function PostCard({ postView }) {
  const { post, creator, community, counts } = postView;
  // lemmy marks image links with a content type, otherwise fall back to the thumbnail
  const image = post.url_content_type?.startsWith('image/') ? post.url : post.thumbnail_url;

  return (
    <article className="card">
      <div className="card__votes">
        <span aria-hidden="true">▲</span>
        <strong>{formatScore(counts.score)}</strong>
        <span aria-hidden="true">▼</span>
      </div>
      <div className="card__body">
        <h2 className="card__title">{post.name}</h2>
        <p className="card__meta">
          <span className="card__community">c/{community.name}</span> · {timeAgo(post.published)}
        </p>
        {image && <img className="card__image" src={image} alt="" loading="lazy" />}
        {!image && post.body && <p className="card__text">{post.body}</p>}
        <footer className="card__footer">
          <span className="card__footer-votes">▲ {formatScore(counts.score)} ▼</span>
          <span className="card__author">u/{creator.name}</span>
          <span>💬 {formatScore(counts.comments)} comments</span>
        </footer>
      </div>
    </article>
  );
}

export default PostCard;
