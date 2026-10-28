import { Link } from 'react-router-dom';
import '../../styles/app-shell-new.css';

export default function AppShell({ title, user, onLogout, actions, children }) {
  const initial = user?.name ? user.name[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : 'U';

  return (
    <div className="shell">
      <header className="shell-header">
        <div className="shell-header-inner">
          <div className="shell-brand">
            <Link to="/" className="brand-link" aria-label="CV Forge home">
              <span className="shell-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <strong>CV Forge</strong>
            </Link>
            {title && <span className="shell-crumb">{title}</span>}
          </div>

          <div className="shell-right">
            {actions}
            <div className="shell-user">
              {user?.picture ? (
                <img src={user.picture} alt="" className="avatar" />
              ) : (
                <span className="avatar-placeholder">{initial}</span>
              )}
              <span className="shell-name">{user?.name || user?.email}</span>
              <button
                type="button"
                className="shell-signout-btn"
                onClick={onLogout}
                title="Sign out of your account"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="shell-main">{children}</main>
    </div>
  );
}
