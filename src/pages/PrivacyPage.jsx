import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal-pages.css';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'CVForge — Privacy Policy';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to CVForge</Link>
        
        <h1>Privacy Policy</h1>
        <p className="legal-date">Last updated: August 16, 2026</p>
        
        <div className="legal-content">
          <section>
            <h2>Introduction</h2>
            <p>
              CVForge is a professional CV building platform designed to help students and early-career professionals create polished, effective resumes. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <h3>Account Information</h3>
            <p>
              When you create an account, we collect information you provide directly, including your name, email address, and profile picture (if you choose to add one through Google authentication).
            </p>
            
            <h3>Professional Information</h3>
            <p>
              To build your CV, you may provide professional details such as your contact information, work experience, education, skills, projects, certifications, and other career-related information. This information is stored securely and used solely to generate and manage your CV documents.
            </p>
            
            <h3>Authentication Information</h3>
            <p>
              We use Google OAuth for authentication. When you sign in with Google, we receive certain information from Google (such as your email address and name) to create and authenticate your account. We do not store your Google password.
            </p>
            
            <h3>Payment Information</h3>
            <p>
              Payment processing is handled through Paystack. We do not store your credit card or payment details. Paystack securely processes payments and provides us with transaction confirmation and status information.
            </p>
            
            <h3>Technical Information</h3>
            <p>
              We automatically collect certain technical information, including your IP address, browser type, device information, and usage patterns. This helps us improve the service, troubleshoot issues, and ensure security.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and operate the CVForge service</li>
              <li>Generate, store, and manage your CV documents</li>
              <li>Process payments through Paystack</li>
              <li>Authenticate your account and provide secure access</li>
              <li>Improve our service and user experience</li>
              <li>Communicate with you about your account and transactions</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2>AI-Assisted Features</h2>
            <p>
              CVForge uses AI-assisted technology to help improve and tailor professional content. When you use AI features, your professional information may be processed to generate suggestions or improvements. AI-generated suggestions may contain inaccuracies, so you should review and verify your CV before submitting it to employers.
            </p>
            <p>
              Generated content is stored as part of your CV data and is subject to the same security and retention policies as your other information.
            </p>
          </section>

          <section>
            <h2>Data Storage and Security</h2>
            <p>
              Your data is stored securely using industry-standard practices. We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <h3>Google Authentication</h3>
            <p>
              We use Google OAuth for user authentication. Google's privacy policy applies to any information collected by Google during the authentication process.
            </p>
            
            <h3>Paystack Payment Processing</h3>
            <p>
              Payments are processed through Paystack. Paystack's privacy policy and terms govern their handling of payment information. We receive only transaction confirmation and status information from Paystack.
            </p>
          </section>

          <section>
            <h2>Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar technologies to authenticate your session, remember your preferences, and improve your experience. You can manage cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              We retain your account and CV data for as long as your account is active. You may request deletion of your account and associated data at any time. After account deletion, your data will be removed from our active systems within a reasonable timeframe, except as required by law or for legitimate business purposes.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of certain data processing (where technically feasible)</li>
              <li>Object to processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us through the support options available in the application.
            </p>
          </section>

          <section>
            <h2>Account and Data Deletion</h2>
            <p>
              You can delete your account and all associated data through the application. Upon deletion, your CVs, personal information, and account data will be permanently removed. This action cannot be undone.
            </p>
          </section>

          <section>
            <h2>Children's Privacy</h2>
            <p>
              CVForge is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of significant changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please reach out through the contact/support options available in the CVForge application.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
