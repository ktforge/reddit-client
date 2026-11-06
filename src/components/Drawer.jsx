import { useEffect } from 'react';
import './Drawer.css';

// slide-out panel for smaller screens, closes on backdrop click or Escape
function Drawer({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey); // cleanup when it closes
  }, [open, onClose]);

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`}>
      <div className="drawer__backdrop" onClick={onClose}></div>
      <aside className="drawer__panel">
        <button className="drawer__close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
        {children}
      </aside>
    </div>
  );
}

export default Drawer;
