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

export default function HomePage() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const destination = user ? '/dashboard' : '/login';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
            <a href="#details">Details</a>
            <a href="#templates">Templates</a>
          </div>
          <Link to={destination} className="forge-nav-action">
            {user ? 'Open workspace' : 'Start for free'} <Arrow />
          </Link>
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
                <div className="sheet-name">Amara<br />Mensah</div>
                <div className="sheet-role">Product designer <span>Accra, Ghana</span></div>
                <div className="sheet-columns">
                  <div>
                    <p className="sheet-label">Profile</p>
                    <p className="sheet-copy">Designing digital products that make complex tasks feel natural.</p>
                    <p className="sheet-label sheet-label-space">Experience</p>
                    <div className="sheet-entry"><b>Senior Product Designer</b><span>Northstar — 2022–now</span><i /></div>
                    <div className="sheet-entry"><b>Product Designer</b><span>Studio A — 2019–2022</span><i /></div>
                  </div>
                  <div className="sheet-sidebar">
                    <p className="sheet-label">Selected skills</p>
                    <p>Product strategy<br />Systems thinking<br />Interface design<br />Research synthesis</p>
                    <p className="sheet-label sheet-label-space">Education</p>
                    <p>BFA, Communication Design<br /><small>2015–2019</small></p>
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
        <Link to="/" className="forge-wordmark"><span className="wordmark-mark"><i /><i /><i /></span><span>CV Forge</span></Link>
        <p>For work worth reading.</p>
        <span>© 2026 CV Forge</span>
      </footer>
    </div>
  );
}
