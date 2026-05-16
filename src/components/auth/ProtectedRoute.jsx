import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { user, bootstrapping } = useAuth();
  const location = useLocation();

  if (bootstrapping) {
    return (
      <div className="page-center">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If user is authenticated and tries to access homepage, redirect to dashboard
  if (location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
