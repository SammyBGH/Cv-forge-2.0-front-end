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
            <img src="/pen.png" alt="" className="nav-logo-icon" />
            CV Forge
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">How it works</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
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
            <img src="/cv.png" alt="CV Preview" className="cv-showcase-image" />
            <div className="float-element float-element-3">
              <img src="/pen.png" alt="" className="float-element-image" />
            </div>
          </div>
          
          <div className="float-element float-element-1">
            <div className="cv-skeleton-line short" />
          </div>
          <div className="float-element float-element-2">
            <div className="cv-skeleton-line medium" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <div className="features-header">
            <h2>How it works</h2>
            <p>Create your professional CV in three simple steps</p>
          </div>
          
          <div className="features-grid stagger-children">
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3>1. Sign Up Free</h3>
              <p>Create your account with Google in seconds. No credit card required to get started.</p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3>2. Build Your CV</h3>
              <p>Fill in your details using our smart forms with helpful suggestions. See changes instantly with live preview.</p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>3. Export & Share</h3>
              <p>Pay a small fee to unlock PDF export with 25-day re-download access. Share your CV with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="features-detail">
        <div className="features-container">
          <div className="features-header">
            <h2>Why choose CV Forge?</h2>
            <p>Everything you need to create a standout CV</p>
          </div>
          
          <div className="features-grid stagger-children">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3>Multi-Language Support</h3>
              <p>Create translated versions of your CV for international opportunities.</p>
            </div>
            
            <div className="feature-card hover-lift">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Autosave</h3>
              <p>Never lose your work. Every edit is automatically saved as you go.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="features-container">
          <div className="features-header">
            <h2>What our users say</h2>
            <p>Join thousands of students and professionals who've landed their dream jobs</p>
          </div>
          
          <div className="testimonials-grid stagger-children">
            <div className="testimonial-card hover-lift">
              <div className="testimonial-content">
                <p>"CV Forge made it so easy to create a professional CV. I got my dream job within 2 weeks!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SA</div>
                <div className="author-info">
                  <strong>Sarah A.</strong>
                  <span>Marketing Graduate</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card hover-lift">
              <div className="testimonial-content">
                <p>"The live preview feature is amazing. I could see exactly what my CV would look like as I edited."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JM</div>
                <div className="author-info">
                  <strong>James M.</strong>
                  <span>Software Engineer</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card hover-lift">
              <div className="testimonial-content">
                <p>"Simple, clean, and professional. The templates are perfect for entry-level positions."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">EO</div>
                <div className="author-info">
                  <strong>Emily O.</strong>
                  <span>Business Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-header">
            <h2>Get in touch</h2>
            <p>Have questions? We'd love to hear from you.</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@cvforge.com</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Available 24/7</span>
              </div>
            </div>
            
            <Link to="/login" className="contact-cta hover-lift">
              Start Building Your CV
            </Link>
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
            <img src="/pen.png" alt="" className="footer-logo-icon" />
            <div>
              <strong>CV Forge</strong>
              <p>Build professional CVs that open doors</p>
            </div>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-link-group">
              <h4>Product</h4>
              <a href="#features">How it works</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="footer-link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
            
            <div className="footer-link-group">
              <h4>Connect</h4>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 CV Forge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
