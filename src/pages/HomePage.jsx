import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/homepage.css';

export default function HomePage() {
  const { user } = useAuth();

  // If user is already logged in, they shouldn't see this page
  // But we'll handle this in the routing logic

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Free to build · Pay to export</span>
          </div>
          
          <h1 className="hero-title">
            Build a CV that opens doors
          </h1>
          
          <p className="hero-subtitle">
            Optimized for students and early-career professionals. 
            Create stunning CVs with live preview, professional templates, 
            and seamless Paystack checkout when you're ready to export.
          </p>
          
          <div className="hero-cta">
            <Link to="/login" className="btn-primary btn-large">
              Start Building Free
            </Link>
            <Link to="/login" className="btn-secondary btn-large">
              Sign In
            </Link>
          </div>
          
          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Instant live preview</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Professional templates</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="cv-preview-mockup">
            <div className="mockup-header">
              <div className="mockup-avatar"></div>
              <div className="mockup-lines">
                <div className="mockup-line long"></div>
                <div className="mockup-line medium"></div>
              </div>
            </div>
            <div className="mockup-body">
              <div className="mockup-section">
                <div className="mockup-line short"></div>
                <div className="mockup-line long"></div>
                <div className="mockup-line medium"></div>
              </div>
              <div className="mockup-section">
                <div className="mockup-line medium"></div>
                <div className="mockup-line long"></div>
              </div>
              <div className="mockup-section">
                <div className="mockup-line short"></div>
                <div className="mockup-line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Everything you need to stand out</h2>
            <p>From first draft to final export, we've got you covered</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Live Preview</h3>
              <p>See changes instantly as you type. No more guessing what your CV looks like.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Professional Templates</h3>
              <p>Choose from modern, minimal, and accent-header designs that recruiters love.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Autosave</h3>
              <p>Never lose your work. Every edit is automatically saved as you go.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multi-Language</h3>
              <p>Create translated versions of your CV for international opportunities.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Export</h3>
              <p>Paystack-powered secure payments with 25-day download access window.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Build and edit your CV from any device, anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <div className="section-header">
            <h2>How it works</h2>
            <p>Three simple steps to your professional CV</p>
          </div>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up Free</h3>
                <p>Create your account with Google in seconds. No credit card needed.</p>
              </div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Build Your CV</h3>
                <p>Fill in your details using our smart forms with helpful suggestions.</p>
              </div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Export & Share</h3>
                <p>Pay a small fee to unlock PDF export with 25-day re-download access.</p>
              </div>
            </div>
          </div>
          
          <div className="steps-cta">
            <Link to="/login" className="btn-primary btn-large">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to build your future?</h2>
          <p>Join thousands of students and professionals who've landed their dream jobs with CV Forge.</p>
          <Link to="/login" className="btn-primary btn-large">
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-dot"></span>
              <strong>CV Forge</strong>
            </div>
            <p>Build professional CVs that open doors</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-link-group">
              <h4>Product</h4>
              <Link to="/login">Features</Link>
              <Link to="/login">Templates</Link>
              <Link to="/login">Pricing</Link>
            </div>
            
            <div className="footer-link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
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
