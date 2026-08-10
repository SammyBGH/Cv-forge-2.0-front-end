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
          <div className="login-logo">
            <div className="login-logo-icon">CV</div>
            CV Forge
          </div>
          <h1>Sign in to your account</h1>
          <p>Build professional CVs with live preview and premium templates</p>
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
            <span>or</span>
          </div>
          
          <div className="login-footer">
            <p>
              By continuing, you agree to our fair-use export rules (paid download window).
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
