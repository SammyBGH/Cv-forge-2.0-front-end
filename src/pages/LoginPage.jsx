import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/login-new.css';

export default function LoginPage() {
  const { loginWithGoogle, login, register, devLogin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const from = location.state?.from || '/dashboard';

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const isDev = import.meta.env.DEV;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'warning');
      return;
    }
    if (mode === 'register' && password.length < 6) {
      addToast('Password must be at least 6 characters', 'warning');
      return;
    }

    setBusy(true);
    try {
      if (mode === 'register') {
        await register(email, password, name);
        addToast('Account created successfully!', 'success');
      } else {
        await login(email, password);
        addToast('Welcome back!', 'success');
      }
      navigate(from, { replace: true });
    } catch (err) {
      addToast(err.message || (mode === 'register' ? 'Registration failed' : 'Login failed'), 'error');
    } finally {
      setBusy(false);
    }
  }

  async function handleDevSignIn() {
    setBusy(true);
    try {
      await devLogin();
      addToast('Signed in as Developer', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      addToast(err.message || 'Dev login failed', 'error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="login-logo" aria-label="CV Forge home">
            <span className="login-logo-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <span className="login-logo-text">CV Forge</span>
          </Link>
          <div className="login-kicker">Workspace Access</div>
          <h1>{mode === 'login' ? 'Welcome back.' : 'Start your workspace.'}</h1>
          <p>
            {mode === 'login'
              ? 'Sign in to continue refining your CV with real-time feedback and export tools.'
              : 'Create an account to begin building structured, ATS-friendly CVs that make an impact.'}
          </p>
        </div>

        <div className="login-card">
          <div className="login-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`login-tab ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              className={`login-tab ${mode === 'register' ? 'is-active' : ''}`}
              onClick={() => setMode('register')}
            >
              Create Account
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="auth-field">
                <label htmlFor="auth-name" className="auth-label">
                  Full name <span className="auth-optional">(optional)</span>
                </label>
                <input
                  id="auth-name"
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  disabled={busy}
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-email" className="auth-label">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={busy}
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="auth-password" className="auth-label">
                  Password
                </label>
                <button
                  type="button"
                  className="auth-peek"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                required
                disabled={busy}
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={busy}>
              {busy ? (
                <span className="auth-spinner" aria-hidden="true" />
              ) : mode === 'login' ? (
                'Sign In to CV Forge'
              ) : (
                'Create Your Account'
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="google-wrap">
            <GoogleLogin
              onSuccess={async (cred) => {
                try {
                  await loginWithGoogle(cred.credential);
                  navigate(from, { replace: true });
                } catch (e) {
                  addToast(e.message || 'Google sign-in failed', 'error');
                }
              }}
              onError={() => addToast('Google sign-in was interrupted', 'error')}
              theme="outline"
              size="large"
              text={mode === 'login' ? 'signin_with' : 'signup_with'}
              shape="rectangular"
              width="100%"
            />
          </div>

          {isDev && (
            <div className="dev-auth-box">
              <div className="dev-auth-header">
                <span className="dev-badge">Local Dev Mode</span>
                <span className="dev-hint">Instant access without OAuth</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary dev-btn"
                onClick={handleDevSignIn}
                disabled={busy}
              >
                ⚡ Quick Dev Sign In (developer@cvforge.local)
              </button>
            </div>
          )}

          <div className="login-footer">
            <p>
              Your drafts autosave as you build. PDF export is unlocked when you are ready.
            </p>
            <p>
              <Link to="/" className="back-link">
                ← Back to homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
