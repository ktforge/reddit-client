import { formatScore, timeAgo } from '../utils/format.js';
import Markdown from './Markdown.jsx';
import './Comment.css';

// one comment plus its replies, it calls itself to draw the nested ones
function Comment({ node }) {
  const { comment, creator, counts, replies } = node;
  // deleted and removed comments come back empty, so show a note instead
  let text = comment.content;
  if (comment.deleted) text = '_[deleted]_';
  if (comment.removed) text = '_[removed by a moderator]_';

  return (
    <li className="comment">
      <p className="comment__meta">
        <strong>u/{creator.name}</strong> · {timeAgo(comment.published)}
      </p>
      <div className="comment__text">
        <Markdown>{text}</Markdown>
      </div>
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
