import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCVBuilder } from '../../context/CVBuilderContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../api/client.js';
import SectionFormRouter from './SectionFormRouter.jsx';
import CVPreview from '../preview/CVPreview.jsx';
import DownloadRibbon from './DownloadRibbon.jsx';
import { CVPdfDocument } from '../pdf/CVPdfDocument.jsx';
import { LAYOUTS, TEMPLATES, THEMES, languageLabel } from '../../utils/cvDesign.js';
import { sectionByType } from '../preview/cvSelectors.js';
import {
  UserIcon,
  PenIcon,
  BriefcaseIcon,
  GraduationIcon,
  BoltIcon,
  FolderIcon,
  AwardIcon,
  GlobeIcon,
  ClipboardIcon,
  FileIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  MinusIcon,
} from '../ui/Icons.jsx';
import '../../styles/builder-new.css';

const SECTION_META = {
  personal: { label: 'Contact Details', required: true },
  summary: { label: 'Professional Summary', recommended: true },
  experience: { label: 'Work Experience', recommended: true },
  education: { label: 'Education', recommended: true },
  skills: { label: 'Skills', recommended: true },
  projects: { label: 'Projects & Highlights', optional: true },
  certifications: { label: 'Certifications', optional: true },
  languages: { label: 'Languages', optional: true },
  custom: { label: 'Additional Information', optional: true },
};

const SECTION_ICONS = {
  personal: UserIcon,
  summary: PenIcon,
  experience: BriefcaseIcon,
  education: GraduationIcon,
  skills: BoltIcon,
  projects: FolderIcon,
  certifications: AwardIcon,
  languages: GlobeIcon,
  custom: ClipboardIcon,
};

function ToolbarSelect({ id, label, value, options, onChange, swatch }) {
  const current = options.find((opt) => opt.value === value);

  return (
    <div className="control-group">
      <label className="control-group-label" htmlFor={id}>
        {label}
      </label>
      <div className="toolbar-select-wrap">
        {swatch ? (
          <span className="toolbar-swatch" style={{ backgroundColor: swatch }} aria-hidden="true" />
        ) : null}
        <select
          id={id}
          className="toolbar-select"
          value={value}
          title={current?.description || label}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const TRANSLATION_CHOICES = [
  { code: 'fr', label: 'French (Français)' },
  { code: 'es', label: 'Spanish (Español)' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'ar', label: 'Arabic (العربية)' },
  { code: 'pt', label: 'Portuguese (Português)' },
  { code: 'zh', label: 'Chinese (Mandarin)' },
  { code: 'it', label: 'Italian (Italiano)' },
  { code: 'nl', label: 'Dutch (Nederlands)' },
  { code: 'tw', label: 'Twi (Akan)' },
  { code: 'ha', label: 'Hausa' },
  { code: '__custom__', label: 'Other — type language below' },
];

export default function BuilderWorkspace({ headerLeft }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { cv, loading, error, saving, updateCv, reorderSections, flushSave } = useCVBuilder();
  const [zoom, setZoom] = useState(0.92);
  const [downloadStatus, setDownloadStatus] = useState({ allowed: false, secondsRemaining: 0, validUntil: null });
  const [payBusy, setPayBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [translateLang, setTranslateLang] = useState('fr');
  const [translateOther, setTranslateOther] = useState('');
  const [showFloatingDownload, setShowFloatingDownload] = useState(false);
  const [openSection, setOpenSection] = useState('personal');
  const [payConfig, setPayConfig] = useState({ translationPriceGhs: 6, translationAvailable: true });

  const downloadRibbonRef = useRef(null);

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

  useEffect(() => {
    api.paymentConfig().then(setPayConfig).catch(() => {});
  }, []);

  // Scroll detection for floating download action
  useEffect(() => {
    const handleScroll = () => {
      const ribbon = downloadRibbonRef.current;
      if (!ribbon) return;
      const rect = ribbon.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      setShowFloatingDownload(!isVisible);
    };

    handleScroll();
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

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
      addToast(e.message || 'Payment initialization failed', 'error');
    } finally {
      setPayBusy(false);
    }
  }

  async function handleExportPdf() {
    if (!cv) return;
    setExporting(true);
    try {
      await api.authorizeDownload(cv._id);
    } catch (e) {
      if (e.status === 402) {
        addToast('Complete checkout to unlock PDF export.', 'warning');
        setExporting(false);
        return;
      }
      addToast(e.message || 'Authorization check failed', 'error');
      setExporting(false);
      return;
    }

    try {
      const blob = await pdf(<CVPdfDocument cv={cv} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cv.title || 'CV'}.pdf`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      addToast('PDF downloaded successfully!', 'success');
    } catch (e) {
      addToast(e.message || 'PDF export failed', 'error');
    } finally {
      setExporting(false);
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

  const currentTemplate = cv.templateId || 'modern-split';
  const currentTheme = cv.themeId || 'light';
  const currentLayout = cv.layoutId || 'two-column';

  const templateLabel = TEMPLATES.find((t) => t.id === currentTemplate)?.label || 'Modern Split';
  const themeLabel = THEMES.find((t) => t.id === currentTheme)?.label || 'Clean Slate';
  const themeSwatch = THEMES.find((t) => t.id === currentTheme)?.swatch;
  const layoutLabel = LAYOUTS.find((l) => l.id === currentLayout)?.label || 'Two Column';

  return (
    <div className="builder-shell">
      <DownloadRibbon
        ref={downloadRibbonRef}
        status={downloadStatus}
        onPay={() => startCheckout('download')}
        payBusy={payBusy}
        onExport={handleExportPdf}
        isExporting={exporting}
      />

      {/* Linked Translation Banners */}
      {cv.sourceCvId && (
        <div className="source-cv-banner">
          <span className="banner-icon">
            <GlobeIcon size={15} />
          </span>
          <span>
            You are editing a translated copy ({languageLabel(cv.locale)}). Your original English CV is saved separately.
          </span>
          <Link to={`/builder/${cv.sourceCvId}`} className="banner-link">
            <ArrowLeftIcon size={13} /> View Original CV
          </Link>
        </div>
      )}

      {cv.translationCvIds?.length > 0 && (
        <div className="translation-list-banner">
          <span className="banner-icon">
            <GlobeIcon size={15} />
          </span>
          <span>Translations of this CV:</span>
          <div className="banner-chips">
            {cv.translationCvIds.map((tId, idx) => (
              <Link key={tId} to={`/builder/${tId}`} className="banner-chip-link">
                Copy #{idx + 1} <ArrowRightIcon size={11} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Top toolbar */}
      <header className="builder-topbar">
        <div className="builder-topbar-left">{headerLeft}</div>

        <div className="title-edit-wrap">
          <input
            className="title-input"
            value={cv.title}
            onChange={(e) => updateCv({ title: e.target.value })}
            aria-label="CV title"
            placeholder="Untitled CV"
          />
          <span className={`save-chip ${saving ? 'is-saving' : ''}`}>
            {saving ? 'Saving…' : 'Saved'}
          </span>
        </div>

        <div className="builder-topbar-controls">
          <ToolbarSelect
            id="tb-template"
            label="Template"
            value={currentTemplate}
            options={TEMPLATES.map((t) => ({ value: t.id, label: t.label, description: t.description }))}
            onChange={(v) => updateCv({ templateId: v })}
          />

          <ToolbarSelect
            id="tb-theme"
            label="Theme"
            value={currentTheme}
            swatch={themeSwatch}
            options={THEMES.map((t) => ({ value: t.id, label: t.label, description: t.description }))}
            onChange={(v) => updateCv({ themeId: v })}
          />

          <ToolbarSelect
            id="tb-layout"
            label="Layout"
            value={currentLayout}
            options={LAYOUTS.map((l) => ({ value: l.id, label: `${l.label} Layout`, description: l.description }))}
            onChange={(v) => updateCv({ layoutId: v })}
          />

          {/* Zoom controls */}
          <div className="zoom-cluster">
            <button
              type="button"
              className="btn-ghost small zoom-btn"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(0.55, z - 0.08))}
              title="Zoom out"
            >
              <MinusIcon size={14} />
            </button>
            <span className="zoom-label">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="btn-ghost small zoom-btn"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(1.25, z + 0.08))}
              title="Zoom in"
            >
              <PlusIcon size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="builder-split">
        <aside className="builder-editor-pane">
          <div className="pane-header">
            <div className="pane-header-copy">
              <h2 id="workspace-heading">Sections & Content</h2>
              <p className="muted small" id="workspace-desc">
                Complete your details below. Everything autosaves instantly as you type.
              </p>
            </div>
            <Completeness cv={cv} />
          </div>

          {/* Translation Action Card */}
          <div className="translate-card" role="region" aria-labelledby="translate-heading">
            <div className="translate-card-head">
              <div>
                <h3 id="translate-heading" className="translate-heading">
                  <GlobeIcon size={15} /> Translate into another language
                </h3>
                <p className="translate-intro">
                  Get a professionally localized copy for international applications. Your original CV remains untouched.
                </p>
              </div>
              <span className="translate-price-pill">GHS {payConfig.translationPriceGhs || 6}</span>
            </div>

            <div className="translate-form-row">
              <select
                id="translate-lang"
                className="input translate-select"
                value={translateLang}
                onChange={(e) => setTranslateLang(e.target.value)}
                disabled={payBusy}
                aria-label="Target language"
              >
                {TRANSLATION_CHOICES.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {translateLang === '__custom__' && (
                <input
                  type="text"
                  className="input translate-other"
                  aria-label="Type target language"
                  placeholder="e.g. Japanese, Russian, Swahili"
                  value={translateOther}
                  disabled={payBusy}
                  onChange={(e) => setTranslateOther(e.target.value)}
                />
              )}

              <button
                type="button"
                className="btn btn-secondary small translate-action-btn"
                disabled={payBusy}
                onClick={() => {
                  const targetLanguage =
                    translateLang === '__custom__' ? translateOther.trim() : translateLang;
                  if (!targetLanguage) {
                    addToast('Please select or specify a target language.', 'warning');
                    return;
                  }
                  startCheckout('translation', { targetLanguage });
                }}
              >
                {payBusy ? 'Opening checkout…' : 'Pay & Translate'}
              </button>
            </div>
          </div>

          {/* Section Accordions */}
          <ol className="section-order" aria-labelledby="workspace-heading">
            {sortedSections.map((s) => {
              const expanded = openSection === s.key || openSection === s.type;
              const meta = SECTION_META[s.type] || { label: 'Custom Section' };
              const SectionIcon = SECTION_ICONS[s.type] || FileIcon;
              const isFilled = isSectionCompleted(s);

              return (
                <li key={s.key} className={`section-order-row ${expanded ? 'is-open' : ''}`}>
                  <div className="section-order-meta">
                    <button
                      type="button"
                      className="section-toggle"
                      aria-expanded={expanded}
                      onClick={() => setOpenSection(expanded ? '' : s.key)}
                    >
                      <span className="section-icon-badge">
                        <SectionIcon size={16} />
                      </span>
                      <span className="section-title-label">{meta.label}</span>
                      {isFilled && (
                        <span className="section-filled-badge" title="Completed">
                          <CheckIcon size={11} />
                        </span>
                      )}
                      <span className="section-toggle-action">{expanded ? 'Close' : 'Open'}</span>
                    </button>

                    <div className="reorder-group">
                      <button
                        type="button"
                        className="btn-reorder"
                        onClick={() => moveSection(s.key, -1)}
                        aria-label={`Move ${meta.label} up`}
                        title="Move section up"
                      >
                        <ChevronUpIcon size={13} />
                      </button>
                      <button
                        type="button"
                        className="btn-reorder"
                        onClick={() => moveSection(s.key, 1)}
                        aria-label={`Move ${meta.label} down`}
                        title="Move section down"
                      >
                        <ChevronDownIcon size={13} />
                      </button>
                    </div>
                  </div>

                  {expanded ? (
                    <div className="section-content-wrap">
                      <SectionFormRouter section={s} cv={cv} />
                    </div>
                  ) : (
                    <SectionPreviewHint section={s} />
                  )}
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Live Preview Pane */}
        <section className="builder-preview-pane">
          <div className="preview-toolbar">
            <div className="preview-toolbar-title">
              <h2>Live Document Preview</h2>
              <span className="live-status-dot" aria-hidden="true" />
              <span className="live-status-text">Updates live</span>
            </div>
            <div className="preview-toolbar-badges">
              <span className="preview-badge">{templateLabel}</span>
              <span className="preview-badge">{themeLabel}</span>
              <span className="preview-badge">{layoutLabel}</span>
            </div>
          </div>

          <div className="preview-stage-container">
            <div className="preview-stage" style={{ transform: `scale(${zoom})` }}>
              <CVPreview cv={cv} />
            </div>
          </div>
        </section>
      </div>

      {/* Floating Download Button on scroll */}
      <div className={`floating-download ${showFloatingDownload ? 'is-visible' : ''}`}>
        <button
          type="button"
          className="floating-download-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to download options"
          title="Scroll to download options"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v8M4 9l4 4 4-4M3 13h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function isSectionCompleted(section) {
  if (section.type === 'personal') {
    return Boolean(section.data?.fullName && section.data?.email);
  }
  if (section.type === 'summary') {
    return Boolean((section.data?.html || '').trim().length > 10);
  }
  return Array.isArray(section.data?.items) && section.data.items.length > 0;
}

function Completeness({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const summary = sectionByType(cv, 'summary')?.data || {};
  const experience = sectionByType(cv, 'experience')?.data?.items || [];
  const education = sectionByType(cv, 'education')?.data?.items || [];
  const skills = sectionByType(cv, 'skills')?.data?.items || [];

  const checks = [
    { ok: Boolean(personal.fullName && personal.email), label: 'Contact' },
    { ok: Boolean((summary.html || '').trim()), label: 'Summary' },
    { ok: experience.length > 0, label: 'Experience' },
    { ok: education.length > 0, label: 'Education' },
    { ok: skills.length > 0, label: 'Skills' },
  ];
  const done = checks.filter((c) => c.ok).length;

  return (
    <div className="completeness-bar-wrap" aria-label="CV completion status">
      <div className="completeness-meta">
        <span className="completeness-score">
          {done} of {checks.length} essentials completed
        </span>
        <span className="completeness-pct">{Math.round((done / checks.length) * 100)}%</span>
      </div>
      <div className="completeness-track">
        <div
          className="completeness-fill"
          style={{ width: `${(done / checks.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function SectionPreviewHint({ section }) {
  const count = Array.isArray(section?.data?.items) ? section.data.items.length : 0;
  const summaryLen = (section?.data?.html || '').trim().length;
  let note = 'Empty';
  if (section?.type === 'personal') {
    note = section.data?.fullName ? section.data.fullName : 'Add contact details';
  } else if (section?.type === 'summary') {
    note = summaryLen ? `${summaryLen} characters` : 'Brief paragraph';
  } else if (count) {
    note = `${count} ${count === 1 ? 'entry' : 'entries'}`;
  }
  return <p className="section-preview-hint">{note}</p>;
}
