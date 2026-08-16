import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal-pages.css';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'CVForge — Terms of Service';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to CVForge</Link>
        
        <h1>Terms of Service</h1>
        <p className="legal-date">Last updated: August 16, 2026</p>
        
        <div className="legal-content">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using CVForge, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2>Description of Service</h2>
            <p>
              CVForge is a CV building platform that allows users to create, edit, and export professional resumes. The service includes live preview, professional templates, autosave functionality, and optional AI-assisted content suggestions.
            </p>
          </section>

          <section>
            <h2>User Accounts</h2>
            <p>
              To use CVForge, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or abusive behavior.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with the operation of the service</li>
              <li>Not use the service to create false or misleading CVs</li>
              <li>Review and verify all content before using it for job applications</li>
            </ul>
          </section>

          <section>
            <h2>Accuracy of Information</h2>
            <p>
              You are solely responsible for the accuracy of all information you provide and include in your CV. CVForge does not verify the truthfulness of user-provided content. You should ensure that all information in your CV is accurate and truthful.
            </p>
          </section>

          <section>
            <h2>AI-Assisted Content</h2>
            <p>
              CVForge provides AI-assisted features to help improve and tailor professional content. AI-generated suggestions are provided as a starting point and may contain inaccuracies. You are responsible for reviewing, editing, and verifying all AI-generated content before including it in your CV or submitting it to employers.
            </p>
            <p>
              CVForge is not responsible for any consequences resulting from the use of AI-generated content without proper review.
            </p>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <h3>Your Content</h3>
            <p>
              You retain ownership of all content you provide to CVForge, including your personal information, work experience, and CV content. By using the service, you grant us the right to store, process, and display your content solely for the purpose of providing the service to you.
            </p>
            
            <h3>Generated CVs</h3>
            <p>
              CVs you create using CVForge are your property. You may use them for any lawful purpose, including job applications. CVForge does not claim ownership of your generated CVs.
            </p>
            
            <h3>CVForge Property</h3>
            <p>
              The CVForge platform, including its design, templates, software, and technology, is our proprietary property. You may not copy, modify, or distribute our templates or platform without permission.
            </p>
          </section>

          <section>
            <h2>Acceptable Use</h2>
            <p>You may not use CVForge to:</p>
            <ul>
              <li>Create fraudulent or misleading documents</li>
              <li>Misrepresent your qualifications or experience</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Spread malware or malicious code</li>
              <li>Attempt to reverse-engineer the platform</li>
              <li>Use the service for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2>Payments</h2>
            <h3>Payment Requirements</h3>
            <p>
              CVForge is free to use for building and editing CVs. A payment of GHS 99.99 is required to unlock PDF export functionality. This payment grants you access to download your CV as a PDF for a specified period (25 days from payment).
            </p>
            
            <h3>Payment Processing</h3>
            <p>
              Payments are processed securely through Paystack. By making a payment, you agree to Paystack's terms and conditions. We do not store your payment information.
            </p>
            
            <h3>Refund Policy</h3>
            <p>
              Due to the nature of digital services, payments for PDF export are generally non-refundable. However, if you experience a technical issue that prevents you from accessing your paid download despite successful payment, please contact support for assistance.
            </p>
          </section>

          <section>
            <h2>Service Availability</h2>
            <p>
              We strive to maintain high availability of the service. However, we do not guarantee uninterrupted access. We may temporarily suspend the service for maintenance, updates, or other technical reasons. We are not liable for any losses resulting from service interruptions.
            </p>
          </section>

          <section>
            <h2>Disclaimer</h2>
            <p>
              CVForge is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will meet your requirements, that it will be uninterrupted, timely, secure, or error-free.
            </p>
            <p>
              AI-generated content is provided as a convenience and may contain inaccuracies. You are responsible for verifying all content before use.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, CVForge shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use of the service.
            </p>
            <p>
              Our total liability to you for all claims shall not exceed the amount you paid for the service, if any.
            </p>
          </section>

          <section>
            <h2>Account Suspension/Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our sole discretion, without prior notice, for violations of these Terms, fraudulent activity, or any other reason we deem appropriate.
            </p>
            <p>
              Upon termination, your right to use the service will immediately cease. We may also delete your account and associated data, except as required by law.
            </p>
          </section>

          <section>
            <h2>Changes to the Service</h2>
            <p>
              We may modify, update, or discontinue the service at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section>
            <h2>Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. We will notify users of significant changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through appropriate legal channels.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please reach out through the contact/support options available in the CVForge application.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
