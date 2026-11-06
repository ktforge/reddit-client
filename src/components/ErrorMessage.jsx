import './StateMessage.css';

// shown when posts fail to load, lets the user retry or go home
function ErrorMessage({ title = "Couldn't load posts", onRetry, onHome }) {
  return (
    <div className="state state--error" role="alert">
      <span className="state__icon" aria-hidden="true">!</span>
      <h2 className="state__title">{title}</h2>
      <p className="state__text">
        The server may be busy or you hit the request limit. Try again shortly.
      </p>
      <div className="state__actions">
        <button className="btn" onClick={onRetry}>
          Try again
        </button>
        <button className="link-btn" onClick={onHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
