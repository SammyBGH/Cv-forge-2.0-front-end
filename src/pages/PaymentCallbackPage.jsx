import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api, getToken } from '../api/client.js';
import '../styles/payment-callback.css';

export default function PaymentCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('working');
  const [message, setMessage] = useState('Confirming payment…');

  useEffect(() => {
    const reference = params.get('reference') || params.get('trxref');
    if (!reference) {
      setStatus('error');
      setMessage('Missing payment reference.');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        if (!getToken()) {
          setStatus('error');
          setMessage('Session expired. Sign in again, then reopen this link from your email/receipt if needed.');
          return;
        }
        await api.verifyPayment(reference);
        if (cancelled) return;
        setStatus('ok');
        setMessage('Payment confirmed. Taking you to your CV…');
        setTimeout(() => navigate('/dashboard', { replace: true }), 1600);
      } catch (e) {
        if (cancelled) return;
        setStatus('error');
        if (e.status === 401) {
          setMessage('Unauthorized — sign in and try verifying again from Paystack’s reference.');
        } else {
          setMessage(e.message || 'Verification failed');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params, navigate]);

  return (
    <div className="pay-callback">
      <div className="pay-callback-card">
        <h1>{status === 'ok' ? 'Success' : status === 'error' ? 'Something went wrong' : 'Processing'}</h1>
        <p>{message}</p>
        <Link className="btn-secondary" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
