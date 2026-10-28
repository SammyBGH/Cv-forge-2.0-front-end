import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/homepage-new.css';

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3l5 5-5 5" /></svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8.25 3.05 3L13 4.75" /></svg>
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

export default function HomePage() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const destination = user ? '/dashboard' : '/login';
  const profile = HERO_PROFILES[profileIndex];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProfileIndex((i) => (i + 1) % HERO_PROFILES.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="forge-home">
      <nav className={`forge-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
        <div className="forge-nav-inner">
          <Link to="/" className="forge-wordmark" aria-label="CV Forge home">
            <span className="wordmark-mark"><i /><i /><i /></span>
            <span>CV Forge</span>
          </Link>
          <div className="forge-nav-links">
            <a href="#process">Process</a>
            <a href="#audiences">Who it&apos;s for</a>
            <a href="#templates">Templates</a>
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
          </div>
        </div>
      </nav>

      <main>
        <section className="forge-hero">
          <div className="hero-grain" />
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

            <div className="resume-stage reveal-stage" aria-label="A preview of a professionally formatted CV">
              <div className="stage-caption">Live document view <span>01 — 04</span></div>
              <div className="resume-sheet">
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
              <div className="stage-card stage-card-top"><span className="status-dot" /> Changes saved</div>
              <div className="stage-card stage-card-bottom"><span>CV</span> Ready to export <Arrow /></div>
            </div>
          </div>
          <div className="hero-rule"><span>Scroll to explore</span><i /></div>
        </section>

        <section className="proof-band" aria-label="CV Forge principles">
          <p>Clear structure</p><i />
          <p>Live editing</p><i />
          <p>Designed for real applications</p>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="section-kicker"><span /> The process</p>
            <h2>A quieter path from<br />draft to <em>done.</em></h2>
          </div>
          <div className="process-list">
            <article className="process-item">
              <span className="process-number">01</span>
              <div><h3>Start with what you have</h3><p>Bring the details, bullet points, and half-finished drafts. The builder gives them a useful home.</p></div>
              <span className="process-mark">A</span>
            </article>
            <article className="process-item">
              <span className="process-number">02</span>
              <div><h3>Shape it while you see it</h3><p>Every edit is reflected in a live preview, so hierarchy, spacing, and story stay in view.</p></div>
              <span className="process-mark">B</span>
            </article>
            <article className="process-item">
              <span className="process-number">03</span>
              <div><h3>Leave with a document you own</h3><p>Choose a polished layout, export a PDF, and return to your work whenever you need it.</p></div>
              <span className="process-mark">C</span>
            </article>
          </div>
        </section>

        <section className="audiences-section" id="audiences">
          <div className="audiences-heading">
            <p className="section-kicker"><span /> Who it&apos;s for</p>
            <h2>Built for every<br /><em>kind of work.</em></h2>
            <p className="audiences-intro">
              A shop floor, a ward, a classroom, a boardroom. CV Forge is not written for one
              industry alone—it adapts to the language, structure, and expectations of your field.
            </p>
          </div>
          <ul className="audience-grid">
            {AUDIENCES.map((audience, i) => (
              <li className="audience-tile" key={audience.label}>
                <span className="audience-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{audience.label}</h3>
                <p>{audience.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="details-section" id="details">
          <div className="details-intro">
            <p className="section-kicker"><span /> Built for the work behind the work</p>
            <h2>Small decisions.<br /><em>Serious difference.</em></h2>
          </div>
          <div className="detail-grid">
            <article className="detail-card detail-card-dark"><span className="detail-index">01</span><h3>Autosave that stays out of your way.</h3><p>Your edits are saved as you build, so momentum does not depend on a save button.</p><div className="save-indicator"><span /> All changes saved</div></article>
            <article className="detail-card"><span className="detail-index">02</span><h3>Preview with perspective.</h3><p>See the finished page as you work, not after you have filled out a long form.</p><div className="mini-layout"><i /><i /><i /><i /></div></article>
            <article className="detail-card detail-card-wide" id="templates"><span className="detail-index">03</span><div><h3>Templates with restraint.</h3><p>Thoughtful document layouts put your experience first and give recruiters a clearer read.</p></div><div className="template-lines"><i /><i /><i /><i /><i /></div></article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" />
          <div className="closing-content">
            <p className="section-kicker"><span /> Your next application</p>
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
