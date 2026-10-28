import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../api/client.js';
import AppShell from '../components/layout/AppShell.jsx';
import Modal from '../components/ui/Modal.jsx';
import { FileIcon, CheckIcon, GlobeIcon, PlusIcon } from '../components/ui/Icons.jsx';
import { TEMPLATES, THEMES, languageLabel } from '../utils/cvDesign.js';
import '../styles/dashboard-new.css';
import '../styles/animations.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createModal, setCreateModal] = useState({ isOpen: false, title: '', templateId: 'modern-split' });
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

  // A template card on the homepage hands its layout over as ?template=<id>,
  // so the create dialog opens with that layout already chosen.
  useEffect(() => {
    const requested = searchParams.get('template');
    if (requested && TEMPLATES.some((t) => t.id === requested)) {
      setCreateModal({ isOpen: true, title: '', templateId: requested });
    }
  }, [searchParams]);

  async function handleCreate(e) {
    if (e) e.preventDefault();
    setCreating(true);
    try {
      const title = createModal.title.trim() || 'Untitled CV';
      const data = await api.createCv({
        title,
        templateId: createModal.templateId,
      });
      setCreateModal({ isOpen: false, title: '', templateId: 'modern-split' });
      addToast('New CV created!', 'success');
      navigate(`/builder/${data.cv._id}`);
    } catch (err) {
      addToast(err.message || 'Failed to create CV', 'error');
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
    } catch (err) {
      addToast(err.message || 'Failed to duplicate CV', 'error');
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
    } catch (err) {
      addToast(err.message || 'Failed to delete CV', 'error');
    }
  }

  return (
    <AppShell
      title="Dashboard"
      user={user}
      onLogout={logout}
      actions={
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCreateModal({ isOpen: true, title: 'My New CV', templateId: 'modern-split' })}
        >
          <PlusIcon size={15} />
          <span className="shell-action-label">Create New CV</span>
        </button>
      }
    >
      <section className="dash-wrap">
        <header className="dash-header">
          <div className="dash-header-copy">
            <span className="dash-eyebrow">Your Workspace</span>
            <h2>CV Documents</h2>
            <p>Every draft is saved in real time. Choose a document to edit, duplicate, or translate.</p>
          </div>
          <div className="dash-stats">
            <div className="stat-card">
              <span className="stat-number">{cvs.length}</span>
              <span className="stat-label">Total Documents</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{cvs.filter((c) => c.downloadPaid).length}</span>
              <span className="stat-label">Export Unlocked</span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="dash-loading-wrap">
            <div className="spinner" aria-label="Loading documents" />
            <p>Loading your documents…</p>
          </div>
        ) : cvs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FileIcon size={40} />
            </div>
            <h3>No CVs in your workspace yet</h3>
            <p>Create your first professional CV with real-time preview and export readiness.</p>
            <div className="empty-state-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCreateModal({ isOpen: true, title: 'My First CV', templateId: 'modern-split' })}
              >
                Create your first CV
              </button>
            </div>
          </div>
        ) : (
          <ul className="cv-grid">
            {cvs.map((cv) => {
              const tmplLabel = TEMPLATES.find((t) => t.id === cv.templateId)?.label || 'Modern Split';
              const thmLabel = THEMES.find((t) => t.id === cv.themeId)?.label || 'Clean Slate';
              const isTranslation = Boolean(cv.sourceCvId);
              const hasTranslations = Array.isArray(cv.translationCvIds) && cv.translationCvIds.length > 0;

              return (
                <li key={cv._id} className="cv-card">
                  <div className="cv-card-topbar">
                    <div className="cv-card-tags">
                      {isTranslation ? (
                        <span className="badge-translation">
                          <GlobeIcon size={11} /> {languageLabel(cv.locale)} Copy
                        </span>
                      ) : (
                        <span className="badge-source">Original</span>
                      )}
                      {cv.downloadPaid ? (
                        <span className="badge-paid">
                          <CheckIcon size={11} /> Export Unlocked
                        </span>
                      ) : (
                        <span className="badge-draft">Draft</span>
                      )}
                    </div>
                    {hasTranslations && (
                      <span className="badge-has-trans" title="Has localized copies">
                        <GlobeIcon size={12} /> {cv.translationCvIds.length}{' '}
                        {cv.translationCvIds.length === 1 ? 'translation' : 'translations'}
                      </span>
                    )}
                  </div>

                  <div className="cv-card-body">
                    <h3 className="cv-card-title">{cv.title}</h3>
                    <div className="cv-card-config">
                      <span className="config-pill">{tmplLabel}</span>
                      <span className="config-pill">{thmLabel}</span>
                      <span className="config-pill">{cv.layoutId === 'single' ? '1 Col' : '2 Col'}</span>
                    </div>
                    <p className="cv-card-date">
                      Updated {new Date(cv.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="cv-card-actions">
                    <Link className="btn btn-primary small" to={`/builder/${cv._id}`}>
                      Open Editor
                    </Link>
                    <button
                      type="button"
                      className="btn btn-secondary small"
                      onClick={() => handleDuplicate(cv._id)}
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost small text-danger"
                      onClick={() => openDeleteModal(cv)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Create CV Modal */}
      <Modal
        isOpen={createModal.isOpen}
        onClose={() => setCreateModal({ isOpen: false, title: '', templateId: 'modern-split' })}
        title="Create a New CV"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCreateModal({ isOpen: false, title: '', templateId: 'modern-split' })}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={creating}
            >
              {creating ? 'Creating…' : 'Start Building'}
            </button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="create-cv-form">
          <div className="field">
            <label htmlFor="cv-modal-title" className="field-label">
              CV Title or Target Role
            </label>
            <input
              id="cv-modal-title"
              type="text"
              className="input"
              placeholder="e.g. Marketing Manager CV"
              value={createModal.title}
              onChange={(e) => setCreateModal((prev) => ({ ...prev, title: e.target.value }))}
              autoFocus
            />
          </div>

          <div className="field">
            <label className="field-label">Starting Template</label>
            <div className="modal-templates-grid">
              {TEMPLATES.map((tmpl) => (
                <label
                  key={tmpl.id}
                  className={`modal-template-option ${createModal.templateId === tmpl.id ? 'is-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="templateId"
                    value={tmpl.id}
                    checked={createModal.templateId === tmpl.id}
                    onChange={(e) => setCreateModal((prev) => ({ ...prev, templateId: e.target.value }))}
                    className="sr-only"
                  />
                  <strong>{tmpl.label}</strong>
                  <span>{tmpl.description}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, cvId: null, cvTitle: '' })}
        title="Delete CV Document"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDeleteModal({ isOpen: false, cvId: null, cvTitle: '' })}
            >
              Keep CV
            </button>
            <button type="button" className="btn btn-primary btn-danger" onClick={confirmDelete}>
              Delete Document
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>"{deleteModal.cvTitle}"</strong>? This will permanently remove the document from your workspace.
        </p>
      </Modal>
    </AppShell>
  );
}
