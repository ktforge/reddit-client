import { formatScore, timeAgo } from '../utils/format.js';
import './Comment.css';

// one comment plus its replies, it calls itself to draw the nested ones
function Comment({ node }) {
  const { comment, creator, counts, replies } = node;

  return (
    <li className="comment">
      <p className="comment__meta">
        <strong>u/{creator.name}</strong> · {timeAgo(comment.published)}
      </p>
      <p className="comment__text">{comment.content}</p>
      <p className="comment__score">▲ {formatScore(counts.score)}</p>
      {replies.length > 0 && (
        <ul className="comment__replies">
          {replies.map((reply) => (
            <Comment key={reply.comment.id} node={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
