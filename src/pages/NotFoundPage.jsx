import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/legal-pages.css';

export default function NotFoundPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'CVForge — Page Not Found';
  }, []);

  return (
    <div className="legal-page not-found-page">
      <div className="legal-container not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              Go to Homepage
            </Link>
            {user && (
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
