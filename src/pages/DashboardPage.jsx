import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import AppShell from '../components/layout/AppShell.jsx';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const data = await api.listCvs();
      setCvs(data.cvs || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate() {
    setCreating(true);
    try {
      const data = await api.createCv({ title: 'New CV' });
      window.location.href = `/builder/${data.cv._id}`;
    } catch (e) {
      alert(e.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDuplicate(id) {
    try {
      const data = await api.duplicateCv(id);
      await refresh();
      window.location.href = `/builder/${data.cv._id}`;
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this CV?')) return;
    try {
      await api.deleteCv(id);
      await refresh();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <AppShell
      title="Dashboard"
      user={user}
      onLogout={logout}
      actions={
        <button type="button" className="btn-primary" onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating…' : 'New CV'}
        </button>
      }
    >
      <section className="dash-wrap">
        <header className="dash-header">
          <div>
            <h2>Your CVs</h2>
            <p className="muted">Autosaved edits · Pay to export · 25-day re-download window after payment</p>
          </div>
        </header>

        {loading ? (
          <div className="muted">Loading…</div>
        ) : cvs.length === 0 ? (
          <div className="empty-state">
            <h3>No CVs yet</h3>
            <p>Create your first CV and iterate with instant preview.</p>
            <button type="button" className="btn-primary" onClick={handleCreate}>
              Start building
            </button>
          </div>
        ) : (
          <ul className="cv-grid">
            {cvs.map((cv) => (
              <li key={cv._id} className="cv-card">
                <div className="cv-card-top">
                  <h3>{cv.title}</h3>
                  <span className="pill">{cv.templateId}</span>
                </div>
                <p className="muted small">
                  Updated {new Date(cv.updatedAt).toLocaleString()}
                  {cv.downloadPaid ? ' · Identity fields locked after export payment' : ''}
                </p>
                <div className="cv-card-actions">
                  <Link className="btn-secondary" to={`/builder/${cv._id}`}>
                    Open
                  </Link>
                  <button type="button" className="btn-ghost" onClick={() => handleDuplicate(cv._id)}>
                    Duplicate
                  </button>
                  <button type="button" className="btn-danger-ghost" onClick={() => handleDelete(cv._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
