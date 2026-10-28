import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api, getToken } from '../api/client.js';
import '../styles/payment-callback.css';

export default function PaymentCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('working');
  const [message, setMessage] = useState('Confirming payment…');
  const [retryCvId, setRetryCvId] = useState(null);

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
        const result = await api.verifyPayment(reference);
        if (cancelled) return;

        if (result.type === 'translation') {
          if (result.translationStatus === 'failed') {
            setStatus('error');
            setRetryCvId(result.cvId);
            setMessage(
              result.translationError ||
                'Payment succeeded, but translation did not finish. You can retry from the original CV without paying again.'
            );
            return;
          }
          setStatus('ok');
          setMessage('Payment confirmed. Opening your translated CV…');
          const next = result.translationCvId || result.cvId;
          setTimeout(() => navigate(next ? `/builder/${next}` : '/dashboard', { replace: true }), 1400);
          return;
        }

        setStatus('ok');
        setMessage('Payment confirmed. Taking you to your CV…');
        setTimeout(
          () => navigate(result.cvId ? `/builder/${result.cvId}` : '/dashboard', { replace: true }),
          1400
        );
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

  async function retryTranslation() {
    if (!retryCvId) return;
    setStatus('working');
    setMessage('Retrying translation…');
    try {
      const data = await api.retryTranslation(retryCvId);
      if (data?.cv?._id) {
        setStatus('ok');
        setMessage('Translation ready. Opening the new copy…');
        setTimeout(() => navigate(`/builder/${data.cv._id}`, { replace: true }), 1200);
      } else {
        setStatus('error');
        setMessage(data?.job?.errorMessage || 'Translation still failed. Try again later.');
      }
    } catch (e) {
      setStatus('error');
      setMessage(e.message || 'Retry failed');
    }
  }

  return (
    <div className="pay-callback">
      <div className="pay-callback-card">
        <div className={`pay-status-mark status-${status}`} aria-hidden="true">
          <span />
        </div>
        <p className="pay-kicker">CV Forge · Payment status</p>
        <h1>{status === 'ok' ? 'Success' : status === 'error' ? 'Something went wrong' : 'Processing'}</h1>
        <p>{message}</p>
        {retryCvId ? (
          <button type="button" className="btn-primary" onClick={retryTranslation}>
            Retry translation
          </button>
        ) : null}
        <Link className="btn-secondary" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
