import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/homepage-new.css';

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3l5 5-5 5" /></svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8.25 3.05 3L13 4.75" /></svg>
);

/** Numbered section header — the page's editorial rhythm. */
const SectionHead = ({ index, label }) => (
  <div className="section-head" data-reveal>
    <span className="section-head-label"><b>{index}</b> — {label}</span>
    <span className="section-head-rule" aria-hidden="true" />
  </div>
);

/** Sample documents shown in the hero, one profession at a time. */
const HERO_PROFILES = [
  {
    first: 'Amara', last: 'Mensah',
    role: 'Product designer', location: 'Accra, Ghana',
    profile: 'Designing digital products that make complex tasks feel natural.',
    skills: ['Product strategy', 'Systems thinking', 'Interface design', 'Research synthesis'],
    jobs: [['Senior Product Designer', 'Northstar — 2022–now'], ['Product Designer', 'Studio A — 2019–2022']],
    education: ['BFA, Communication Design', '2015–2019'],
  },
  {
    first: 'Daniel', last: 'Okoro',
    role: 'Electrician', location: 'Leeds, United Kingdom',
    profile: 'Certified electrician with eight years across domestic and commercial installs.',
    skills: ['Wiring & testing', 'Fault finding', 'Health & safety', 'Site supervision'],
    jobs: [['Senior Electrician', 'Northgate Contracts — 2020–now'], ['Electrician', 'Bright Spark Ltd — 2016–2020']],
    education: ['NVQ Level 3, Electrical Installation', '2012–2015'],
  },
  {
    first: 'Sofia', last: 'Alvarez',
    role: 'Registered nurse', location: 'Madrid, Spain',
    profile: 'Compassionate nurse focused on patient care, triage, and clear communication.',
    skills: ['Patient care', 'Triage', 'Care planning', 'Record keeping'],
    jobs: [['Registered Nurse', 'Hospital Central — 2021–now'], ['Staff Nurse', 'Clinica Norte — 2018–2021']],
    education: ['BSc, Nursing', '2014–2018'],
  },
  {
    first: 'Priya', last: 'Nair',
    role: 'Operations manager', location: 'Singapore',
    profile: 'Operations lead who keeps teams, schedules, and budgets running without friction.',
    skills: ['Team leadership', 'Budgeting', 'Process improvement', 'Vendor management'],
    jobs: [['Operations Manager', 'Meridian Retail — 2019–now'], ['Operations Coordinator', 'Lumen Group — 2016–2019']],
    education: ['BA, Business Administration', '2012–2016'],
  },
];

/** The range of work CV Forge is built to serve. */
const AUDIENCES = [
  { label: 'Trades & Field Work', detail: 'Electricians, mechanics, drivers, and site crews.' },
  { label: 'Healthcare & Care', detail: 'Nurses, carers, technicians, and support staff.' },
  { label: 'Education & Training', detail: 'Teachers, tutors, instructors, and trainers.' },
  { label: 'Hospitality & Retail', detail: 'Front of house, chefs, sales, and store teams.' },
  { label: 'Office & Administration', detail: 'Assistants, coordinators, and operations staff.' },
  { label: 'Creative & Marketing', detail: 'Designers, writers, marketers, and content roles.' },
  { label: 'Finance & Professional Services', detail: 'Analysts, accountants, advisors, and legal staff.' },
  { label: 'Students & Career Changers', detail: 'First CVs, internships, and fresh starts.' },
];

/** The three real CV layouts offered in the builder.
    `id` must match TEMPLATES in utils/cvDesign.js so a card
    can hand its layout straight to the create-CV flow. */
const TEMPLATES = [
  {
    id: 'modern-split',
    variant: 'split',
    tag: 'Two column',
    label: 'Modern Split',
    blurb: 'A contemporary split layout with a dedicated sidebar for contact details and skills.',
  },
  {
    id: 'minimal',
    variant: 'minimal',
    tag: 'Single column',
    label: 'Classic Minimal',
    blurb: 'Understated and highly readable, with generous type and calm, even spacing.',
  },
  {
    id: 'accent-header',
    variant: 'exec',
    tag: 'Header banner',
    label: 'Executive Header',
    blurb: 'A distinguished header banner sitting above a structured, professional grid.',
  },
];

/** CSS-drawn document mock-up for a template preview. */
const TemplatePreview = ({ variant }) => {
  if (variant === 'split') {
    return (
      <div className="template-sheet tp-split" aria-hidden="true">
        <div className="tp-split-side">
          <i className="tp-dot" />
          <i className="tp-line tp-line-xs" />
          <i className="tp-line tp-line-xs" />
          <i className="tp-line tp-line-xs" />
          <i className="tp-line tp-line-xs" />
        </div>
        <div className="tp-split-main">
          <i className="tp-line tp-line-lg tp-strong" />
          <i className="tp-line tp-line-sm" />
          <i className="tp-gap" />
          <i className="tp-line tp-line-md" />
          <i className="tp-line tp-line-xl" />
          <i className="tp-line tp-line-md" />
          <i className="tp-gap" />
          <i className="tp-line tp-line-xl tp-strong" />
          <i className="tp-line tp-line-lg" />
        </div>
      </div>
    );
  }
  if (variant === 'minimal') {
    return (
      <div className="template-sheet tp-minimal" aria-hidden="true">
        <i className="tp-name tp-line tp-center" />
        <i className="tp-line tp-line-sm tp-center" />
        <i className="tp-hr" />
        <i className="tp-line tp-line-lg tp-center" />
        <i className="tp-line tp-line-xl tp-center" />
        <i className="tp-hr" />
        <i className="tp-line tp-line-lg tp-center" />
        <i className="tp-line tp-line-md tp-center" />
      </div>
    );
  }
  return (
    <div className="template-sheet tp-exec" aria-hidden="true">
      <div className="tp-exec-banner">
        <i className="tp-line tp-line-lg tp-strong" />
        <i className="tp-line tp-line-sm" />
      </div>
      <div className="tp-exec-grid">
        <div>
          <i className="tp-line tp-line-md tp-strong" />
          <i className="tp-line tp-line-xl" />
          <i className="tp-line tp-line-lg" />
          <i className="tp-line tp-line-md" />
        </div>
        <div>
          <i className="tp-line tp-line-md tp-strong" />
          <i className="tp-line tp-line-lg" />
          <i className="tp-line tp-line-md" />
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [profileIndex, setProfileIndex] = useState(0);
  const rootRef = useRef(null);
  const destination = user ? '/dashboard' : '/login';
  const profile = HERO_PROFILES[profileIndex];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The hero rotates on its own, but only for people who have not asked
  // for reduced motion — everyone else uses the manual switcher instead.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => {
      setProfileIndex((i) => (i + 1) % HERO_PROFILES.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  // Dismiss the collapsed mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Highlight whichever section is currently in the reading band,
  // so the nav reflects where the visitor actually is.
  useEffect(() => {
    const sections = ['process', 'audiences', 'templates']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    root.classList.add('js-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="forge-home" ref={rootRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className={`forge-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
        <div className="forge-nav-inner">
          <Link to="/" className="forge-wordmark" aria-label="CV Forge home">
            <span className="wordmark-mark"><i /><i /><i /></span>
            <span>CV Forge</span>
          </Link>
          <div id="forge-nav-links" className={`forge-nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#process" className={activeSection === 'process' ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#audiences" className={activeSection === 'audiences' ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>Who it&apos;s for</a>
            <a href="#templates" className={activeSection === 'templates' ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>Templates</a>
          </div>
          <div className="forge-nav-actions">
            {!user && (
              <Link to="/login" className="forge-nav-signin">
                Sign in
              </Link>
            )}
            <Link to={destination} className="forge-nav-action">
              {user ? 'Open workspace' : 'Start for free'} <Arrow />
            </Link>
            <button
              type="button"
              className={`forge-nav-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="forge-nav-links"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <section className="forge-hero">
          <div className="hero-grain" aria-hidden="true" />
          <div className="forge-hero-inner">
            <div className="hero-copy">
              <p className="section-kicker reveal-1"><span /> A considered way to apply</p>
              <h1 className="reveal-2">Your experience,<br /><em>made legible.</em></h1>
              <p className="hero-intro reveal-3">
                CV Forge gives your work the structure and polish it deserves—without turning your story into a template.
              </p>
              <div className="hero-actions reveal-4">
                <Link to={destination} className="button button-dark">
                  {user ? 'Go to dashboard' : 'Build your CV'} <Arrow />
                </Link>
                <a className="text-action" href="#process">See how it works <Arrow /></a>
              </div>
              <div className="hero-notes reveal-4">
                <span><Check /> No credit card to start</span>
                <span><Check /> Export when you are ready</span>
              </div>
            </div>

            <div className="resume-stage reveal-stage">
              <div className="stage-top">
                <span className="stage-caption" aria-hidden="true">Live document view</span>
                {/* The sheet is a decorative mock-up, so it stays out of the
                    accessibility tree. This switcher is the accessible control
                    for browsing the samples. */}
                <div className="stage-controls" role="group" aria-label="Sample CV preview">
                  {HERO_PROFILES.map((item, i) => (
                    <button
                      key={item.role}
                      type="button"
                      className={`stage-dot ${i === profileIndex ? 'is-active' : ''}`}
                      aria-label={`Show sample CV: ${item.role}`}
                      aria-pressed={i === profileIndex}
                      onClick={() => setProfileIndex(i)}
                    >
                      <span />
                    </button>
                  ))}
                </div>
                <span className="stage-counter" aria-hidden="true">
                  {String(profileIndex + 1).padStart(2, '0')} — {String(HERO_PROFILES.length).padStart(2, '0')}
                </span>
              </div>
              <div className="resume-sheet" aria-hidden="true">
                <div className="sheet-topline" />
                <div className="sheet-body" key={profile.role}>
                  <div className="sheet-name">{profile.first}<br />{profile.last}</div>
                  <div className="sheet-role">{profile.role} <span>{profile.location}</span></div>
                  <div className="sheet-columns">
                    <div>
                      <p className="sheet-label">Profile</p>
                      <p className="sheet-copy">{profile.profile}</p>
                      <p className="sheet-label sheet-label-space">Experience</p>
                      {profile.jobs.map(([title, meta]) => (
                        <div className="sheet-entry" key={title}><b>{title}</b><span>{meta}</span><i /></div>
                      ))}
                    </div>
                    <div className="sheet-sidebar">
                      <p className="sheet-label">Selected skills</p>
                      <p>{profile.skills.map((skill, i) => (<span key={skill}>{skill}{i < profile.skills.length - 1 ? <br /> : null}</span>))}</p>
                      <p className="sheet-label sheet-label-space">Education</p>
                      <p>{profile.education[0]}<br /><small>{profile.education[1]}</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stage-card stage-card-top" aria-hidden="true"><span className="status-dot" /> Changes saved</div>
              <div className="stage-card stage-card-bottom" aria-hidden="true"><span>CV</span> Ready to export <Arrow /></div>
            </div>
          </div>
          <div className="hero-band">
            <div className="hero-band-inner">
              <span className="hero-band-label">Scroll to explore</span>
              <span className="hero-band-rule" aria-hidden="true" />
              <span className="hero-band-meta">Trades · Healthcare · Education · Office · Creative · Finance</span>
            </div>
          </div>
        </section>

        <section className="proof-band" aria-label="CV Forge principles">
          <p>Clear structure</p><i />
          <p>Live editing</p><i />
          <p>Designed for real applications</p>
        </section>

        <section className="process-section" id="process">
          <SectionHead index="01" label="The process" />
          <div className="process-body">
            <div className="process-intro" data-reveal>
              <h2>A quieter path from<br />draft to <em>done.</em></h2>
              <p className="process-lede">
                Three deliberate steps take you from scattered notes to a document you are
                genuinely glad to send.
              </p>
            </div>
            <div className="process-list">
              <article className="process-item" data-reveal>
                <span className="process-number">01</span>
                <div><h3>Start with what you have</h3><p>Bring the details, bullet points, and half-finished drafts. The builder gives them a useful home.</p></div>
                <span className="process-mark">A</span>
              </article>
              <article className="process-item" data-reveal>
                <span className="process-number">02</span>
                <div><h3>Shape it while you see it</h3><p>Every edit is reflected in a live preview, so hierarchy, spacing, and story stay in view.</p></div>
                <span className="process-mark">B</span>
              </article>
              <article className="process-item" data-reveal>
                <span className="process-number">03</span>
                <div><h3>Leave with a document you own</h3><p>Choose a polished layout, export a PDF, and return to your work whenever you need it.</p></div>
                <span className="process-mark">C</span>
              </article>
            </div>
          </div>
        </section>

        <section className="audiences-section" id="audiences">
          <SectionHead index="02" label="Who it's for" />
          <div className="audiences-heading" data-reveal>
            <h2>Built for every<br /><em>kind of work.</em></h2>
            <p className="audiences-intro">
              A shop floor, a ward, a classroom, a boardroom. CV Forge is not written for one
              industry alone—it adapts to the language, structure, and expectations of your field.
            </p>
          </div>
          <ul className="audience-grid">
            {AUDIENCES.map((audience, i) => (
              <li className="audience-tile" key={audience.label} data-reveal>
                <span className="audience-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{audience.label}</h3>
                <p>{audience.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="templates-section" id="templates">
          <div className="templates-inner">
            <SectionHead index="03" label="Templates" />
            <div className="templates-head" data-reveal>
              <h2>Three layouts.<br /><em>One clear read.</em></h2>
              <p className="templates-intro">
                Every layout is built around legibility first—so your experience leads and a
                recruiter can find what matters in a single pass.
              </p>
            </div>
            <div className="template-grid">
              {TEMPLATES.map((template, i) => (
                <Link
                  className="template-card"
                  key={template.id}
                  to={`${destination}?template=${template.id}`}
                  data-reveal
                >
                  <TemplatePreview variant={template.variant} />
                  <div className="template-meta">
                    <div className="template-meta-top">
                      <span className="template-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="template-tag">{template.tag}</span>
                    </div>
                    <h3>{template.label}</h3>
                    <p>{template.blurb}</p>
                    <span className="template-cta">Use this layout <Arrow /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="details-section" id="details">
          <SectionHead index="04" label="Details" />
          <div className="details-intro" data-reveal>
            <h2>Small decisions.<br /><em>Serious difference.</em></h2>
          </div>
          <div className="detail-grid">
            <article className="detail-card detail-card-dark" data-reveal><span className="detail-index">01</span><h3>Autosave that stays out of your way.</h3><p>Your edits are saved as you build, so momentum does not depend on a save button.</p><div className="save-indicator"><span /> All changes saved</div></article>
            <article className="detail-card" data-reveal><span className="detail-index">02</span><h3>Preview with perspective.</h3><p>See the finished page as you work, not after you have filled out a long form.</p><div className="mini-layout"><i /><i /><i /><i /></div></article>
            <article className="detail-card detail-card-wide" data-reveal><span className="detail-index">03</span><div><h3>Templates with restraint.</h3><p>Thoughtful document layouts put your experience first and give recruiters a clearer read.</p></div><div className="template-lines"><i /><i /><i /><i /><i /></div></article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" />
          <div className="closing-content">
            <p className="closing-label"><b>05</b> — Get started</p>
            <h2>Make the first<br />page count.</h2>
            <p>Start with a free workspace. Take your time. Export only when the document feels like yours.</p>
            <Link to={destination} className="button button-light">{user ? 'Return to workspace' : 'Start building'} <Arrow /></Link>
          </div>
        </section>
      </main>

      <footer className="forge-footer">
        <div className="forge-footer-inner">
          <div className="forge-footer-brand">
            <Link to="/" className="forge-wordmark"><span className="wordmark-mark"><i /><i /><i /></span><span>CV Forge</span></Link>
            <p>For work worth reading.</p>
          </div>

          <div className="forge-footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#process">How It Works</a>
              <a href="#templates">Templates</a>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/refund-policy">Refund Policy</Link>
            </div>
          </div>
        </div>
        <span>© 2026 CV Forge</span>
      </footer>
    </div>
  );
}
