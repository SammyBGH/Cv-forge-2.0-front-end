import { useCallback, useEffect, useMemo, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCVBuilder } from '../../context/CVBuilderContext.jsx';
import { api } from '../../api/client.js';
import SectionFormRouter from './SectionFormRouter.jsx';
import CVPreview from '../preview/CVPreview.jsx';
import DownloadRibbon from './DownloadRibbon.jsx';
import { CVPdfDocument } from '../pdf/CVPdfDocument.jsx';
import '../../styles/builder.css';

const SECTION_KIND_LABELS = {
  personal: 'Contact details',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certificates',
  languages: 'Languages',
  custom: 'Section',
};

const TRANSLATION_CHOICES = [
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'ar', label: 'Arabic' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'zh', label: 'Chinese (Mandarin)' },
  { code: 'tw', label: 'Twi' },
  { code: 'ha', label: 'Hausa' },
  { code: '__custom__', label: 'Other — type below' },
];

export default function BuilderWorkspace({ headerLeft }) {
  const { user } = useAuth();
  const { cv, loading, error, updateCv, reorderSections, flushSave } = useCVBuilder();
  const [zoom, setZoom] = useState(0.92);
  const [downloadStatus, setDownloadStatus] = useState({ allowed: false, secondsRemaining: 0, validUntil: null });
  const [payBusy, setPayBusy] = useState(false);
  const [translateLang, setTranslateLang] = useState('fr');
  const [translateOther, setTranslateOther] = useState('');

  const sortedSections = useMemo(() => {
    if (!cv?.sections) return [];
    return [...cv.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [cv]);

  const refreshDownload = useCallback(async () => {
    if (!cv?._id) return;
    try {
      const s = await api.downloadStatus(cv._id);
      setDownloadStatus(s);
    } catch {
      setDownloadStatus({ allowed: false, secondsRemaining: 0, validUntil: null });
    }
  }, [cv?._id]);

  useEffect(() => {
    refreshDownload();
    const id = setInterval(refreshDownload, 30_000);
    return () => clearInterval(id);
  }, [refreshDownload]);

  async function startCheckout(kind, extra = {}) {
    if (!cv?._id) return;
    setPayBusy(true);
    try {
      await flushSave();
      const init = await api.initPayment({
        cvId: cv._id,
        kind,
        email: user?.email,
        ...extra,
      });
      window.location.href = init.authorizationUrl;
    } catch (e) {
      alert(e.message);
    } finally {
      setPayBusy(false);
    }
  }

  async function handleExportPdf() {
    if (!cv) return;
    try {
      await api.authorizeDownload(cv._id);
    } catch (e) {
      if (e.status === 402) {
        alert('Complete checkout to unlock PDF export.');
        return;
      }
      alert(e.message);
      return;
    }

    try {
      const blob = await pdf(<CVPdfDocument cv={cv} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cv.title || 'cv'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.message || 'PDF export failed');
    }
  }

  function moveSection(key, dir) {
    const keys = sortedSections.map((s) => s.key);
    const i = keys.indexOf(key);
    const j = i + dir;
    if (j < 0 || j >= keys.length) return;
    const next = [...keys];
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
    reorderSections(next);
  }

  if (loading) {
    return (
      <div className="page-center">
        <div className="spinner" />
      </div>
    );
  }

  if (error || !cv) {
    return (
      <div className="page-center">
        <p>{error || 'CV not found'}</p>
      </div>
    );
  }

  return (
    <div className="builder-shell">
      <DownloadRibbon
        status={downloadStatus}
        onPay={() => startCheckout('download')}
        payBusy={payBusy}
        onExport={handleExportPdf}
      />

      <header className="builder-topbar">
        <div className="builder-topbar-left">{headerLeft}</div>
        <input
          className="title-input"
          value={cv.title}
          onChange={(e) => updateCv({ title: e.target.value })}
          aria-label="CV title"
        />
        <div className="builder-topbar-right">
          <label className="inline-control">
            Template
            <select
              value={cv.templateId}
              onChange={(e) => updateCv({ templateId: e.target.value })}
            >
              <option value="modern-split">Modern split</option>
              <option value="minimal">Minimal</option>
              <option value="accent-header">Accent header</option>
            </select>
          </label>
          <label className="inline-control">
            Theme
            <select value={cv.themeId} onChange={(e) => updateCv({ themeId: e.target.value })}>
              <option value="light">Light</option>
              <option value="slate">Slate</option>
              <option value="paper">Paper</option>
            </select>
          </label>
          <label className="inline-control">
            Layout
            <select value={cv.layoutId} onChange={(e) => updateCv({ layoutId: e.target.value })}>
              <option value="two-column">Two column</option>
              <option value="single">Single column</option>
            </select>
          </label>
          <div className="zoom-cluster">
            <button type="button" className="btn-ghost small" onClick={() => setZoom((z) => Math.max(0.55, z - 0.08))}>
              −
            </button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button type="button" className="btn-ghost small" onClick={() => setZoom((z) => Math.min(1.2, z + 0.08))}>
              +
            </button>
          </div>
        </div>
      </header>

      <div className="builder-split">
        <aside className="builder-editor-pane">
          <div className="pane-header">
            <h2 id="workspace-heading">Your CV sections</h2>
            <p className="muted small" id="workspace-desc">
              Changes save automatically. Fill each section in any order — use the arrows to move sections up or down on your CV.
            </p>
          </div>

          <div className="translate-row" role="region" aria-labelledby="translate-heading">
            <h3 id="translate-heading" className="translate-heading">
              Optional: another language
            </h3>
            <p className="field-hint translate-intro">
              After a separate small payment, we create a second copy of this CV in the language you choose. Your original stays here for editing.
            </p>
            <div className="translate-controls">
              <label htmlFor="translate-lang" className="translate-label">
                Language for the new copy
              </label>
              <div className="translate-inline">
                <select
                  id="translate-lang"
                  className="input translate-select"
                  value={translateLang}
                  onChange={(e) => setTranslateLang(e.target.value)}
                  disabled={payBusy}
                >
                  {TRANSLATION_CHOICES.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {translateLang === '__custom__' ? (
                  <input
                    type="text"
                    className="input translate-other"
                    aria-label="Type the language"
                    placeholder="e.g. Korean, Ga, Yoruba"
                    value={translateOther}
                    disabled={payBusy}
                    onChange={(e) => setTranslateOther(e.target.value)}
                  />
                ) : null}
              </div>
              <button
                type="button"
                className="btn-secondary small"
                disabled={payBusy}
                onClick={() => {
                  const targetLanguage =
                    translateLang === '__custom__' ? translateOther.trim() : translateLang;
                  if (!targetLanguage) {
                    alert('Choose a language from the list or type one under “Other”.');
                    return;
                  }
                  startCheckout('translation', { targetLanguage });
                }}
              >
                {payBusy ? 'Opening checkout…' : 'Continue to translation checkout'}
              </button>
            </div>
            <p className="muted tiny translate-footnote">
              Translation uses your paid draft workflow — full machine translation will plug in here later; today it prepares a linked copy you can refine.
            </p>
          </div>

          <ol className="section-order" aria-labelledby="workspace-heading" aria-describedby="workspace-desc">
            {sortedSections.map((s) => (
              <li key={s.key} className="section-order-row">
                <div className="section-order-meta">
                  <span className="pill subtle">{SECTION_KIND_LABELS[s.type] || 'Section'}</span>
                  <div className="reorder">
                    <button
                      type="button"
                      className="btn-ghost tiny"
                      onClick={() => moveSection(s.key, -1)}
                      aria-label={`Move ${SECTION_KIND_LABELS[s.type] || 'section'} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn-ghost tiny"
                      onClick={() => moveSection(s.key, 1)}
                      aria-label={`Move ${SECTION_KIND_LABELS[s.type] || 'section'} down`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                <SectionFormRouter section={s} cv={cv} />
              </li>
            ))}
          </ol>
        </aside>

        <section className="builder-preview-pane">
          <div className="preview-toolbar">
            <h2>Live preview</h2>
            <span className="muted small">Updates as you type</span>
          </div>
          <div className="preview-stage" style={{ transform: `scale(${zoom})` }}>
            <CVPreview cv={cv} />
          </div>
        </section>
      </div>
    </div>
  );
}
