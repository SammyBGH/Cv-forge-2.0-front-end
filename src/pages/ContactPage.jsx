import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/legal-pages.css';

export default function ContactPage() {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = 'CVForge — Contact';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to CVForge</Link>
        
        <h1>Contact & Support</h1>
        
        <div className="legal-content">
          <section>
            <h2>How to Get Help</h2>
            <p>
              We're here to help you make the most of CVForge. Whether you need assistance with your CV, have questions about payments, or encounter technical issues, we're available to support you.
            </p>
          </section>

          <section>
            <h2>Common Issues</h2>
            
            <h3>Payment & Download Issues</h3>
            <p>
              If you made a payment but cannot download your CV, or if you were charged without receiving download access, please have your Paystack reference number ready and contact us through the support options below.
            </p>
            
            <h3>Account Problems</h3>
            <p>
              For issues with sign-in, account access, or Google authentication, try clearing your browser cache and signing in again. If problems persist, reach out to support.
            </p>
            
            <h3>CV Building Questions</h3>
            <p>
              For questions about how to use the CV builder, templates, or features, check our homepage for guidance on how the platform works. Most common questions are answered in the "How it works" section.
            </p>
          </section>

          <section>
            <h2>Before Contacting Support</h2>
            <p>
              To help us resolve your issue faster, please:
            </p>
            <ul>
              <li>Describe the problem in detail</li>
              <li>Include your CV ID (if applicable)</li>
              <li>Provide your account email</li>
              <li>Include any error messages you see</li>
              <li>Attach screenshots if the issue is visual</li>
              <li>For payment issues, include your Paystack reference number</li>
            </ul>
          </section>

          <section>
            <h2>Support Options</h2>
            <p>
              To contact our support team, please reach out through the following methods:
            </p>
            
            <div className="support-methods">
              <div className="support-method">
                <h3>Email Support</h3>
                <p>
                  For detailed issues or payment problems, email us at:
                </p>
                <p className="support-email">
                  {/* SUPPORT EMAIL */}
                  <span className="placeholder-email">arkyne.tech1@gmail.com</span>
                </p>
                <p className="support-note">
                  (Open 24 hours)
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>Response Time</h2>
            <p>
              We typically respond to support inquiries within 1-3 business days. Payment-related issues are prioritized and usually resolved within 24-48 hours.
            </p>
          </section>

          <section>
            <h2>Return to the Application</h2>
            <p>
              Ready to get back to building your CV?
            </p>
            <div className="legal-cta">
              {user ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn-primary">
                  Sign In to Your Account
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
