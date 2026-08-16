import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal-pages.css';

export default function RefundPage() {
  useEffect(() => {
    document.title = 'CVForge — Refund Policy';
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="legal-back">← Back to CVForge</Link>
        
        <h1>Refund and Cancellation Policy</h1>
        <p className="legal-date">Last updated: August 16, 2026</p>
        
        <div className="legal-content">
          <section>
            <h2>Overview</h2>
            <p>
              This policy explains CVForge's payment model, refund eligibility, and what happens when payment issues occur. Please read this policy carefully before making a payment.
            </p>
          </section>

          <section>
            <h2>What You Are Paying For</h2>
            <p>
              When you make a payment to CVForge, you are paying for access to PDF export functionality for a specific CV. The payment of GHS 99.99 unlocks the ability to download your CV as a PDF document.
            </p>
            <p>
              This payment grants you a 25-day window during which you can download your CV as many times as needed. After this period, you may need to make another payment to regain download access.
            </p>
          </section>

          <section>
            <h2>When Payment Is Required</h2>
            <p>
              Payment is only required when you are ready to export your CV as a PDF. Building, editing, and previewing your CV in the CVForge interface is completely free. You can create and refine your CV without any payment obligation.
            </p>
            <p>
              The payment is triggered when you click the "Download PDF" button and complete the Paystack checkout process.
            </p>
          </section>

          <section>
            <h2>What Happens After Successful Payment</h2>
            <p>
              Once your payment is successfully processed through Paystack:
            </p>
            <ul>
              <li>Your CV download access is immediately unlocked</li>
              <li>You can download your CV as a PDF</li>
              <li>You have 25 days of re-download access</li>
              <li>The payment status is recorded in your account</li>
            </ul>
          </section>

          <section>
            <h2>Payment Failures</h2>
            <p>
              If your payment fails during the Paystack checkout process:
            </p>
            <ul>
              <li>No charge will be made to your account</li>
              <li>Download access will not be unlocked</li>
              <li>You can retry the payment at any time</li>
            </ul>
            <p>
              Common reasons for payment failure include insufficient funds, incorrect card details, or network issues. Please resolve these issues with your bank or payment provider and try again.
            </p>
          </section>

          <section>
            <h2>Payment Charged but Download Not Unlocked</h2>
            <p>
              In rare cases, a payment may be successfully charged but the download access may not unlock due to a technical issue. If this happens:
            </p>
            <ul>
              <li>Contact support immediately through the CVForge application</li>
              <li>Provide your payment reference number (available from Paystack)</li>
              <li>Include your CV ID and account email</li>
            </ul>
            <p>
              Our team will investigate the issue and manually unlock your download access if the payment is verified. This process typically takes 1-2 business days.
            </p>
          </section>

          <section>
            <h2>Refund Eligibility</h2>
            <p>
              Due to the digital nature of the service, payments for PDF export are generally non-refundable once the download access has been successfully granted and used.
            </p>
            <p>
              However, you may be eligible for a refund in the following situations:
            </p>
            <ul>
              <li><strong>Technical Failure:</strong> If your payment was charged but download access was never unlocked due to a technical issue on our end, and we are unable to resolve the issue within a reasonable timeframe.</li>
              <li><strong>Duplicate Payment:</strong> If you were accidentally charged multiple times for the same CV download access.</li>
              <li><strong>Service Unavailability:</strong> If the service was completely unavailable at the time of payment, preventing you from accessing the download functionality you paid for.</li>
            </ul>
          </section>

          <section>
            <h2>Non-Refundable Situations</h2>
            <p>
              Refunds are not available in the following situations:
            </p>
            <ul>
              <li>Change of mind after successful payment and download access has been granted</li>
              <li>Dissatisfaction with the CV content you created (the content is under your control)</li>
              <li>Failure to use the download access within the 25-day window</li>
              <li>Payment made for the wrong CV (please verify before paying)</li>
              <li>Issues caused by your browser, device, or internet connection</li>
            </ul>
          </section>

          <section>
            <h2>How to Request Assistance</h2>
            <p>
              If you believe you are eligible for a refund or need assistance with a payment issue:
            </p>
            <ol>
              <li>Contact support through the CVForge application</li>
              <li>Provide your payment reference number from Paystack</li>
              <li>Include your CV ID and the email associated with your account</li>
              <li>Describe the issue in detail</li>
              <li>Attach any relevant screenshots or evidence</li>
            </ol>
            <p>
              Our support team will review your request and respond within 1-3 business days.
            </p>
          </section>

          <section>
            <h2>Refund Processing</h2>
            <p>
              If your refund request is approved:
            </p>
            <ul>
              <li>The refund will be processed back to your original payment method</li>
              <li>Processing time depends on your bank or payment provider (typically 5-10 business days)</li>
              <li>You will receive a confirmation email once the refund is initiated</li>
              <li>Your download access will be revoked upon refund</li>
            </ul>
          </section>

          <section>
            <h2>Translation Service Payments</h2>
            <p>
              Separate payments may be required for CV translation services. The same refund policy applies to translation payments: they are non-refundable once the translation service has been delivered, except in cases of technical failure or duplicate charges.
            </p>
          </section>

          <section>
            <h2>Contact Support</h2>
            <p>
              If you have questions about this refund policy or need assistance with a payment issue, please reach out through the contact/support options available in the CVForge application.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
