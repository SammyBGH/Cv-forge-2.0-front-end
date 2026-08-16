import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/login-new.css';

export default function LoginPage() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="login-logo">
            <span className="login-logo-icon" aria-hidden="true"><i /><i /><i /></span>
            CV Forge
          </Link>
          <p className="login-kicker">Your application workspace</p>
          <h1>Make the first page count.</h1>
          <p>Sign in to continue shaping a CV that reads with clarity and confidence.</p>
        </div>
        
        <div className="login-card">
          <GoogleLogin
            onSuccess={async (cred) => {
              try {
                await loginWithGoogle(cred.credential);
                navigate(from, { replace: true });
              } catch (e) {
                addToast(e.message || 'Login failed', 'error');
              }
            }}
            onError={() => addToast('Google sign-in was interrupted', 'error')}
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
          
          <div className="divider">
            <span>secure sign-in</span>
          </div>
          
          <div className="login-footer">
            <p>
              Your work stays available in your workspace. PDF export is unlocked when you are ready.
            </p>
            <p>
              <Link to="/">← Back to home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
