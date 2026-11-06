import { Link } from 'react-router-dom';
import { formatScore, timeAgo, stripMarkdown } from '../utils/format.js';
import Markdown from './Markdown.jsx';
import './PostCard.css';

// one post in the feed: votes, title, community, media or text, and footer
function PostCard({ postView, full = false }) {
  const { post, creator, community, counts } = postView;
  // lemmy marks image links with a content type, otherwise fall back to the thumbnail
  const isImageLink = post.url_content_type?.startsWith('image/');
  const image = isImageLink ? post.url : post.thumbnail_url;

  return (
    <article className={`card ${full ? 'card--full' : ''}`}>
      <div className="card__votes">
        <span aria-hidden="true">▲</span>
        <strong>{formatScore(counts.score)}</strong>
        <span aria-hidden="true">▼</span>
      </div>
      <div className="card__body">
        <h2 className="card__title">
          {full ? (
            post.name
          ) : (
            <Link to={`/post/${post.id}`} className="card__link">
              {post.name}
            </Link>
          )}
        </h2>
        <p className="card__meta">
          <span className="card__community">c/{community.name}</span> · {timeAgo(post.published)}
        </p>
        {image && <img className="card__image" src={image} alt="" loading="lazy" />}
        {full && post.body && (
          <div className="card__text card__text--full">
            <Markdown>{post.body}</Markdown>
          </div>
        )}
        {!full && post.body && !image && <p className="card__text">{stripMarkdown(post.body)}</p>}
        {full && post.url && !isImageLink && (
          <a className="card__source" href={post.url} target="_blank" rel="noopener noreferrer">
            Open link ↗
          </a>
        )}
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
