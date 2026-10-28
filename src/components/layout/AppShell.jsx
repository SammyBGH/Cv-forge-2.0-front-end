import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, LogOutIcon } from '../ui/Icons.jsx';
import '../../styles/app-shell-new.css';

export default function AppShell({ title, user, onLogout, actions, children }) {
  const initial = user?.name ? user.name[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : 'U';
  const [menuOpen, setMenuOpen] = useState(false);
  const accountRef = useRef(null);

  // Close the account menu on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointerDown = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="shell">
      <header className="shell-header">
        <div className="shell-header-inner">
          <div className="shell-brand">
            <Link to="/" className="brand-link" aria-label="CV Forge home">
              <span className="shell-mark" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <strong>CV Forge</strong>
            </Link>

            {title ? (
              <>
                <span className="shell-crumb-rule" aria-hidden="true" />
                <span className="shell-crumb">{title}</span>
              </>
            ) : null}
          </div>

          <div className="shell-right">
            {actions ? <div className="shell-actions">{actions}</div> : null}

            <div className="shell-account" ref={accountRef}>
              <button
                type="button"
                className={`shell-account-btn ${menuOpen ? 'is-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {user?.picture ? (
                  <img src={user.picture} alt="" className="avatar" />
                ) : (
                  <span className="avatar-placeholder">{initial}</span>
                )}
                <span className="shell-name">{user?.name || user?.email}</span>
                <span className="shell-account-caret" aria-hidden="true">
                  <ChevronDownIcon size={14} />
                </span>
              </button>

              {menuOpen ? (
                <div className="shell-menu" role="menu">
                  <p className="shell-menu-head">
                    <strong>{user?.name || 'Your account'}</strong>
                    {user?.email ? <span>{user.email}</span> : null}
                  </p>
                  <button
                    type="button"
                    role="menuitem"
                    className="shell-menu-item"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                  >
                    <LogOutIcon size={14} />
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <main className="shell-main">{children}</main>
    </div>
  );
}
