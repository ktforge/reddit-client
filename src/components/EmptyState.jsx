import './StateMessage.css';

// shown when a feed, search, or post lookup comes back with nothing
function EmptyState({ title, text, actionLabel, onAction }) {
  return (
    <div className="state">
      <span className="state__icon" aria-hidden="true">⌕</span>
      <h2 className="state__title">{title}</h2>
      {text && <p className="state__text">{text}</p>}
      {onAction && (
        <div className="state__actions">
          <button className="btn btn--outline" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
