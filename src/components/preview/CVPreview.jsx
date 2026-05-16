import { sectionByType, sortedSections } from './cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';
import '../../styles/preview.css';

function themeVars(themeId, accent) {
  if (themeId === 'slate') {
    return {
      bg: '#0f172a',
      fg: '#e2e8f0',
      muted: '#94a3b8',
      card: '#111827',
      accent: accent || '#38bdf8',
    };
  }
  if (themeId === 'paper') {
    return {
      bg: '#fbf7ef',
      fg: '#1c1917',
      muted: '#78716c',
      card: '#fffdf8',
      accent: accent || '#b45309',
    };
  }
  return {
    bg: '#ffffff',
    fg: '#0f172a',
    muted: '#64748b',
    card: '#f8fafc',
    accent: accent || '#2563eb',
  };
}

export default function CVPreview({ cv }) {
  const accent = cv?.customization?.accentColor;
  const t = themeVars(cv.themeId, accent);
  const layoutClass = cv.layoutId === 'single' ? 'layout-single' : 'layout-two';
  const blocks = sortedSections(cv).filter((s) => s.type !== 'personal');

  const personal = sectionByType(cv, 'personal')?.data || {};

  return (
    <div className="cv-sheet" style={{ background: t.bg, color: t.fg }}>
      <div className={`cv-inner ${layoutClass} tmpl-${cv.templateId}`}>
        <aside className="cv-sidebar" style={{ background: t.card, borderColor: t.accent }}>
          <header className="cv-name-block">
            <h1>{personal.fullName || 'Your name'}</h1>
            <p className="cv-headline" style={{ color: t.muted }}>
              {personal.headline || 'Professional headline'}
            </p>
          </header>
          <div className="cv-contact" style={{ color: t.muted }}>
            {personal.email ? <div>{personal.email}</div> : null}
            {personal.phone ? <div>{personal.phone}</div> : null}
            {personal.location ? <div>{personal.location}</div> : null}
            {personal.website ? <div>{personal.website}</div> : null}
            {personal.linkedin ? <div>{personal.linkedin}</div> : null}
          </div>
        </aside>

        <main className="cv-main">
          {blocks.map((s) => (
            <PreviewBlock key={s.key} section={s} accent={t.accent} muted={t.muted} fg={t.fg} />
          ))}
        </main>
      </div>
    </div>
  );
}

function PreviewBlock({ section, accent, muted, fg }) {
  switch (section.type) {
    case 'summary':
      return (
        <section className="cv-block">
          <h2 style={{ color: accent }}>Summary</h2>
          <p className="cv-prose" style={{ color: muted }}>
            {(section.data?.html || '').replace(/\n/g, ' ') || '…'}
          </p>
        </section>
      );
    case 'experience': {
      const items = section.data?.items || [];
      return (
        <section className="cv-block">
          <h2 style={{ color: accent }}>Experience</h2>
          <ul className="cv-timeline">
            {items.map((it, i) => (
              <li key={i}>
                <div className="cv-row-title">
                  <strong>{it.role || 'Role'}</strong>
                  <span className="cv-muted">{it.period}</span>
                </div>
                <div className="cv-muted">{it.company}</div>
                <pre className="cv-bullets">{it.bullets}</pre>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    case 'education': {
      const items = section.data?.items || [];
      return (
        <section className="cv-block">
          <h2 style={{ color: accent }}>Education</h2>
          <ul className="cv-timeline">
            {items.map((it, i) => (
              <li key={i}>
                <div className="cv-row-title">
                  <strong>{it.school}</strong>
                  <span className="cv-muted">{it.period}</span>
                </div>
                <div className="cv-muted">{formatEducationCredential(it)}</div>
                <p className="cv-muted">{it.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    case 'skills': {
      const items = section.data?.items || [];
      if (!items.length) return null;
      return (
        <section className="cv-block cv-block-skills">
          <h2 style={{ color: accent }}>Skills</h2>
          <ul className="cv-skills-main">
            {items.map((it, i) => (
              <li key={i}>
                <strong style={{ color: fg }}>{it.name}</strong>
                {it.level ? <span style={{ color: muted }}> · {it.level}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      );
    }
    case 'projects': {
      const items = section.data?.items || [];
      return (
        <section className="cv-block">
          <h2 style={{ color: accent }}>Projects & highlights</h2>
          <ul className="cv-timeline">
            {items.map((it, i) => (
              <li key={i}>
                <div className="cv-row-title">
                  <strong>{it.name}</strong>
                </div>
                {it.stack ? (
                  <div className="cv-muted">
                    <span className="cv-inline-label">Tools & methods: </span>
                    {it.stack}
                  </div>
                ) : null}
                {it.link ? (
                  <div className="cv-muted">
                    <span className="cv-inline-label">Link: </span>
                    {it.link}
                  </div>
                ) : null}
                <p className="cv-muted">{it.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    case 'certifications': {
      const items = section.data?.items || [];
      return (
        <section className="cv-block">
          <h2 style={{ color: accent }}>Certificates & licenses</h2>
          <ul className="cv-timeline">
            {items.map((it, i) => (
              <li key={i}>
                <div className="cv-row-title">
                  <strong>{it.name}</strong>
                  <span className="cv-muted">{it.year}</span>
                </div>
                <div className="cv-muted">{it.issuer}</div>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    default:
      return null;
  }
}
