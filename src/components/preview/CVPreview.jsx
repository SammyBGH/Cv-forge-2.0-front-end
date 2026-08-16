import { sectionByType, sortedSections } from './cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';
import '../../styles/preview.css';

function paletteFor(cv) {
  const custom = /^#[0-9a-f]{6}$/i.test(cv?.customization?.accentColor || '') ? cv.customization.accentColor : null;
  const themes = {
    slate: { ink: '#1f2937', muted: '#5d6875', paper: '#ffffff', surface: '#eef2f5', accent: '#36556d' },
    paper: { ink: '#292724', muted: '#6d6861', paper: '#fffdf9', surface: '#f4eee5', accent: '#76513a' },
    light: { ink: '#1f2937', muted: '#667085', paper: '#ffffff', surface: '#f1f4f5', accent: '#254f6d' },
  };
  const base = themes[cv?.themeId] || themes.light;
  return { ...base, accent: custom || base.accent };
}

function Contact({ personal, compact = false }) {
  const items = [personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean);
  return <div className={`cv-contact ${compact ? 'cv-contact-inline' : ''}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

export default function CVPreview({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const blocks = sortedSections(cv).filter((section) => section.type !== 'personal');
  const palette = paletteFor(cv);
  const template = cv?.templateId || 'modern-split';

  return (
    <article
      className={`cv-sheet tmpl-${template} ${cv?.layoutId === 'single' ? 'layout-single' : 'layout-two'}`}
      style={{ '--cv-ink': palette.ink, '--cv-muted': palette.muted, '--cv-paper': palette.paper, '--cv-surface': palette.surface, '--cv-accent': palette.accent }}
    >
      {template === 'minimal' ? (
        <div className="cv-minimal">
          <header className="cv-minimal-header">
            <div><h1>{personal.fullName || 'Your name'}</h1><p>{personal.headline || 'Professional headline'}</p></div>
            <Contact personal={personal} compact />
          </header>
          <main className="cv-main"><Sections blocks={blocks} /></main>
        </div>
      ) : template === 'accent-header' ? (
        <div className="cv-executive">
          <header className="cv-executive-header"><h1>{personal.fullName || 'Your name'}</h1><p>{personal.headline || 'Professional headline'}</p></header>
          <div className="cv-executive-body"><aside><Contact personal={personal} /><span className="cv-side-rule" /></aside><main className="cv-main"><Sections blocks={blocks} /></main></div>
        </div>
      ) : (
        <div className="cv-split">
          <aside className="cv-sidebar"><header><h1>{personal.fullName || 'Your name'}</h1><p>{personal.headline || 'Professional headline'}</p></header><span className="cv-sidebar-rule" /><Contact personal={personal} /></aside>
          <main className="cv-main"><Sections blocks={blocks} /></main>
        </div>
      )}
    </article>
  );
}

function Sections({ blocks }) {
  return blocks.map((section) => <PreviewBlock key={section.key} section={section} />);
}

function PreviewBlock({ section }) {
  const items = section.data?.items || [];
  const title = { summary: 'Profile', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects', certifications: 'Certificates' }[section.type];
  if (!title || (section.type !== 'summary' && !items.length)) return null;
  return (
    <section className={`cv-block cv-block-${section.type}`}>
      <h2>{title}</h2>
      {section.type === 'summary' ? <p className="cv-prose">{(section.data?.html || '').replace(/\n/g, ' ') || 'Add a short professional summary.'}</p> : null}
      {section.type === 'skills' ? <ul className="cv-skills-main">{items.map((item, i) => <li key={i}><strong>{item.name || 'Skill'}</strong>{item.level ? <span>{item.level}</span> : null}</li>)}</ul> : null}
      {['experience', 'education', 'projects', 'certifications'].includes(section.type) ? <ul className="cv-timeline">{items.map((item, i) => <Item key={i} type={section.type} item={item} />)}</ul> : null}
    </section>
  );
}

function Item({ type, item }) {
  const config = {
    experience: { primary: item.role || 'Role', secondary: item.company, date: item.period, detail: item.bullets },
    education: { primary: item.school || 'School', secondary: formatEducationCredential(item), date: item.period, detail: item.detail },
    projects: { primary: item.name || 'Project', secondary: item.stack, date: item.link, detail: item.detail },
    certifications: { primary: item.name || 'Certificate', secondary: item.issuer, date: item.year },
  }[type];
  return <li><div className="cv-row-title"><strong>{config.primary}</strong>{config.date ? <span>{config.date}</span> : null}</div>{config.secondary ? <p className="cv-item-subtitle">{config.secondary}</p> : null}{config.detail ? <p className="cv-item-detail">{config.detail}</p> : null}</li>;
}
