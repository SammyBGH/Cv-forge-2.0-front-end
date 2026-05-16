import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/login.css';

export default function LoginPage() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  return (
    <div className="login-page">
      <div className="login-card fade-in">
        <Link to="/" className="back-to-home">
          ← Back to home
        </Link>
        <div className="brand-mark">CV Forge</div>
        <h1 className="login-title">Build a CV that opens doors</h1>
        <p className="login-sub">
          Optimized for students and early-career roles — live preview, templates, and Paystack checkout when you are ready to export.
        </p>
        <div className="login-actions">
          <GoogleLogin
            onSuccess={async (cred) => {
              try {
                await loginWithGoogle(cred.credential);
                navigate(from, { replace: true });
              } catch (e) {
                alert(e.message || 'Login failed');
              }
            }}
            onError={() => alert('Google sign-in was interrupted')}
            theme="filled_blue"
            size="large"
            text="continue_with"
            shape="pill"
          />
        </div>
        <p className="login-footnote">
          {/* TODO: surface Terms / Privacy routes */}
          By continuing you agree to fair-use export rules (paid download window).
        </p>
      </div>
      <div className="login-hero" aria-hidden />
    </div>
  );
}
