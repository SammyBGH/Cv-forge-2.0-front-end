import { Link } from 'react-router-dom';
import '../../styles/app-shell.css';

export default function AppShell({ title, user, onLogout, actions, children }) {
  return (
    <div className="shell">
      <header className="shell-header">
        <div className="shell-brand">
          <Link to="/" className="brand-link">
            <span className="logo-dot" />
            <strong>CV Forge</strong>
          </Link>
          <span className="shell-crumb">{title}</span>
        </div>
        <div className="shell-right">
          {actions}
          <div className="shell-user">
            {user?.picture ? <img src={user.picture} alt="" className="avatar" /> : null}
            <span className="shell-name">{user?.name || user?.email}</span>
            <button type="button" className="btn-ghost small" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="shell-main">{children}</main>
    </div>
  );
}
