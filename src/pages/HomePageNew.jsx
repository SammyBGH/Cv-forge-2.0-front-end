import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';
import '../styles/design-system.css';
import '../styles/components.css';
import '../styles/homepage-new.css';
import '../styles/animations.css';

export default function HomePage() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`home-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">CV</div>
            CV Forge
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
          </div>
          <Link to="/login" className="nav-cta hover-lift">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content stagger-children">
          <div className="hero-eyebrow">
            Professional CV Builder
          </div>
          
          <h1 className="hero-title">
            Build a CV that
            <span className="highlight"> opens doors</span>
          </h1>
          
          <p className="hero-description">
            Optimized for students and early-career professionals. 
            Create stunning CVs with live preview, professional templates, 
            and seamless Paystack checkout when you're ready to export.
          </p>
          
          <div className="hero-actions">
            <Link to="/login" className="hero-primary-cta hover-lift">
              Start Building Free
            </Link>
            <Link to="/login" className="hero-secondary-cta hover-lift">
              Sign In
            </Link>
          </div>
          
          <div className="hero-trust">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Free to build
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Pay to export
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Professional templates
            </div>
          </div>
        </div>
        
        <div className="hero-visual scale-in">
          <div className="cv-showcase">
            <div className="cv-showcase-header">
              <div className="cv-skeleton-line long" />
              <div className="cv-skeleton-line medium" />
            </div>
            <div className="cv-showcase-body">
              <div className="cv-skeleton-line long" />
              <div className="cv-skeleton-line long" />
              <div className="cv-skeleton-line medium" />
              <div className="cv-skeleton-line short" />
              <div className="cv-skeleton-line long" />
              <div className="cv-skeleton-line medium" />
            </div>
          </div>
          
          <div className="float-element float-element-1">
            <div className="cv-skeleton-line short" />
          </div>
          <div className="float-element float-element-2">
            <div className="cv-skeleton-line medium" />
          </div>
          <div className="float-element float-element-3">
            <div className="cv-skeleton-line long" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <div className="features-header">
            <h2>Everything you need to stand out</h2>
            <p>Build a professional CV in minutes with our intuitive editor and premium templates.</p>
          </div>
          
          <div className="features-grid stagger-children">
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3>Live Preview</h3>
              <p>See your CV update in real-time as you edit. No more guessing what it will look like.</p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3>Professional Templates</h3>
              <p>Choose from carefully designed templates optimized for ATS systems and human recruiters.</p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Secure Payment</h3>
              <p>Pay securely with Paystack when you're ready to export your CV as a PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to build your CV?</h2>
          <p>Join thousands of students and professionals who have already created their perfect CV with CV Forge.</p>
          <Link to="/login" className="cta-button hover-lift">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            CV Forge
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
