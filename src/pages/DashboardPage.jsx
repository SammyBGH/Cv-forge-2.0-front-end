import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../api/client.js';
import AppShell from '../components/layout/AppShell.jsx';
import Modal from '../components/ui/Modal.jsx';
import '../styles/dashboard-new.css';
import '../styles/animations.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, cvId: null, cvTitle: '' });

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
      addToast('CV created successfully', 'success');
      navigate(`/builder/${data.cv._id}`);
    } catch (e) {
      addToast(e.message || 'Failed to create CV', 'error');
    } finally {
      setCreating(false);
    }
  }

  async function handleDuplicate(id) {
    try {
      const data = await api.duplicateCv(id);
      await refresh();
      addToast('CV duplicated successfully', 'success');
      navigate(`/builder/${data.cv._id}`);
    } catch (e) {
      addToast(e.message || 'Failed to duplicate CV', 'error');
    }
  }

  function openDeleteModal(cv) {
    setDeleteModal({ isOpen: true, cvId: cv._id, cvTitle: cv.title });
  }

  async function confirmDelete() {
    const { cvId } = deleteModal;
    setDeleteModal({ isOpen: false, cvId: null, cvTitle: '' });
    
    try {
      await api.deleteCv(cvId);
      await refresh();
      addToast('CV deleted successfully', 'success');
    } catch (e) {
      addToast(e.message || 'Failed to delete CV', 'error');
    }
  }

  return (
    <AppShell
      title="Dashboard"
      user={user}
      onLogout={logout}
      actions={
        <button type="button" className="btn btn-primary" onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating…' : 'New CV'}
        </button>
      }
    >
      <section className="dash-wrap">
        <header className="dash-header">
          <div>
            <h2>Your CVs</h2>
            <p>Autosaved edits · Pay to export · 25-day re-download window</p>
          </div>
          <div className="dash-header-actions">
            {/* Additional header actions if needed */}
          </div>
        </header>

        {loading ? (
          <div className="muted">Loading…</div>
        ) : cvs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3>No CVs yet</h3>
            <p>Create your first CV and iterate with instant preview.</p>
            <div className="empty-state-actions">
              <button type="button" className="btn btn-primary" onClick={handleCreate}>
                Start building
              </button>
            </div>
          </div>
        ) : (
          <ul className="cv-grid stagger-children">
            {cvs.map((cv) => (
              <li key={cv._id} className="cv-card hover-lift">
                <div className="cv-card-header">
                  <h3 className="cv-card-title">{cv.title}</h3>
                  <span className={`cv-card-status ${cv.downloadPaid ? 'paid' : ''}`}>
                    {cv.downloadPaid ? 'Paid' : 'Draft'}
                  </span>
                </div>
                <div className="cv-card-meta">
                  <div className="cv-card-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Updated {new Date(cv.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <p className="cv-card-description">
                  {cv.downloadPaid ? 'Identity fields locked after export payment' : 'Ready to edit and export'}
                </p>
                <div className="cv-card-actions">
                  <Link className="btn btn-secondary" to={`/builder/${cv._id}`}>
                    Open
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={() => handleDuplicate(cv._id)}>
                    Duplicate
                  </button>
                  <button type="button" className="btn btn-danger-ghost" onClick={() => openDeleteModal(cv)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, cvId: null, cvTitle: '' })}
        title="Delete CV"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDeleteModal({ isOpen: false, cvId: null, cvTitle: '' })}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-danger" onClick={confirmDelete}>
              Delete
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>"{deleteModal.cvTitle}"</strong>? This action cannot be undone.
        </p>
      </Modal>
    </AppShell>
  );
}
