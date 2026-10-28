import { sectionByType, sortedSections } from './cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';
import {
  densityFor,
  paletteFor,
  resolveLayoutId,
  resolveTemplateId,
  sectionHeading,
} from '../../utils/cvDesign.js';
import '../../styles/preview.css';

const SIDE_TYPES = new Set(['skills', 'languages', 'certifications']);

function Contact({ personal, compact = false }) {
  const items = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className={`cv-contact ${compact ? 'cv-contact-inline' : ''}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export default function CVPreview({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const blocks = sortedSections(cv).filter((section) => section.type !== 'personal');
  const palette = paletteFor(cv);
  const template = resolveTemplateId(cv);
  const layout = resolveLayoutId(cv);
  const density = densityFor(cv);

  return (
    <article
      className={`cv-sheet tmpl-${template} layout-${layout} theme-${palette.themeId} density-${density} type-${palette.typeScale}`}
      style={{
        '--cv-ink': palette.ink,
        '--cv-muted': palette.muted,
        '--cv-paper': palette.paper,
        '--cv-surface': palette.surface,
        '--cv-accent': palette.accent,
        '--cv-rule': palette.rule,
      }}
    >
      {template === 'minimal' ? (
        <MinimalBody personal={personal} blocks={blocks} layout={layout} />
      ) : template === 'accent-header' ? (
        <ExecutiveBody personal={personal} blocks={blocks} layout={layout} />
      ) : (
        <SplitBody personal={personal} blocks={blocks} layout={layout} />
      )}
    </article>
  );
}

function SplitBody({ personal, blocks, layout }) {
  if (layout === 'single') {
    return (
      <div className="cv-stack">
        <header className="cv-stack-header">
          <div>
            <h1>{personal.fullName || 'Your name'}</h1>
            <p>{personal.headline || 'Professional headline'}</p>
          </div>
          <Contact personal={personal} compact />
        </header>
        <main className="cv-main">
          <Sections blocks={blocks} />
        </main>
      </div>
    );
  }

  const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
  const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));

  return (
    <div className="cv-split">
      <aside className="cv-sidebar">
        <header>
          <h1>{personal.fullName || 'Your name'}</h1>
          <p>{personal.headline || 'Professional headline'}</p>
        </header>
        <span className="cv-sidebar-rule" />
        <Contact personal={personal} />
        {side.length > 0 && (
          <div className="cv-sidebar-sections">
            <Sections blocks={side} isSidebar />
          </div>
        )}
      </aside>
      <main className="cv-main">
        <Sections blocks={main} />
      </main>
    </div>
  );
}

function MinimalBody({ personal, blocks, layout }) {
  if (layout === 'two-column') {
    const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
    const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));
    return (
      <div className="cv-minimal cv-minimal-split">
        <header className="cv-minimal-header">
          <div>
            <h1>{personal.fullName || 'Your name'}</h1>
            <p>{personal.headline || 'Professional headline'}</p>
          </div>
          <Contact personal={personal} compact />
        </header>
        <div className="cv-minimal-body">
          <main className="cv-main">
            <Sections blocks={main} />
          </main>
          <aside className="cv-minimal-side">
            <Sections blocks={side} isSidebar />
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-minimal">
      <header className="cv-minimal-header">
        <div>
          <h1>{personal.fullName || 'Your name'}</h1>
          <p>{personal.headline || 'Professional headline'}</p>
        </div>
        <Contact personal={personal} compact />
      </header>
      <main className="cv-main">
        <Sections blocks={blocks} />
      </main>
    </div>
  );
}

function ExecutiveBody({ personal, blocks, layout }) {
  if (layout === 'single') {
    return (
      <div className="cv-executive">
        <header className="cv-executive-header">
          <h1>{personal.fullName || 'Your name'}</h1>
          <p>{personal.headline || 'Professional headline'}</p>
        </header>
        <div className="cv-executive-stack">
          <Contact personal={personal} compact />
          <main className="cv-main">
            <Sections blocks={blocks} />
          </main>
        </div>
      </div>
    );
  }

  const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
  const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));

  return (
    <div className="cv-executive">
      <header className="cv-executive-header">
        <h1>{personal.fullName || 'Your name'}</h1>
        <p>{personal.headline || 'Professional headline'}</p>
      </header>
      <div className="cv-executive-body">
        <aside className="cv-executive-side">
          <Contact personal={personal} />
          <span className="cv-side-rule" />
          {side.length > 0 && <Sections blocks={side} isSidebar />}
        </aside>
        <main className="cv-main">
          <Sections blocks={main} />
        </main>
      </div>
    </div>
  );
}

function Sections({ blocks, isSidebar = false }) {
  return blocks.map((section) => (
    <PreviewBlock key={section.key} section={section} isSidebar={isSidebar} />
  ));
}

function PreviewBlock({ section, isSidebar = false }) {
  const items = section.data?.items || [];
  const title = sectionHeading(section);
  if (!title || (section.type !== 'summary' && !items.length)) return null;

  return (
    <section className={`cv-block cv-block-${section.type} ${isSidebar ? 'is-sidebar-block' : ''}`}>
      <h2>{title}</h2>
      {section.type === 'summary' ? (
        <p className="cv-prose">
          {(section.data?.html || '').replace(/\n/g, ' ') || 'Add a short professional summary.'}
        </p>
      ) : null}
      {section.type === 'skills' || section.type === 'languages' ? (
        <ul className={`cv-skills-main ${isSidebar ? 'cv-skills-sidebar' : ''}`}>
          {items.map((item, i) => (
            <li key={i}>
              <strong>{item.name || (section.type === 'languages' ? 'Language' : 'Skill')}</strong>
              {item.level ? <span>{item.level}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {['experience', 'education', 'projects', 'certifications'].includes(section.type) ? (
        <ul className="cv-timeline">
          {items.map((item, i) => (
            <Item key={i} type={section.type} item={item} isSidebar={isSidebar} />
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Item({ type, item }) {
  const config = {
    experience: {
      primary: item.role || 'Role',
      secondary: item.company,
      date: item.period,
      detail: item.bullets,
    },
    education: {
      primary: item.school || 'School',
      secondary: formatEducationCredential(item),
      date: item.period,
      detail: item.detail,
    },
    projects: {
      primary: item.name || 'Project',
      secondary: item.stack,
      date: item.link,
      detail: item.detail,
    },
    certifications: {
      primary: item.name || 'Certificate',
      secondary: item.issuer,
      date: item.year,
    },
  }[type];

  if (!config) return null;

  const detailLines = config.detail
    ? String(config.detail).split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : [];
  const asBullets = detailLines.length > 0 && (type === 'experience' || type === 'projects');

  return (
    <li>
      <div className="cv-row-title">
        <strong>{config.primary}</strong>
        {config.date ? <span>{config.date}</span> : null}
      </div>
      {config.secondary ? <p className="cv-item-subtitle">{config.secondary}</p> : null}
      {asBullets ? (
        <ul className="cv-item-bullets">
          {detailLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : config.detail ? (
        <p className="cv-item-detail">{config.detail}</p>
      ) : null}
    </li>
  );
}
