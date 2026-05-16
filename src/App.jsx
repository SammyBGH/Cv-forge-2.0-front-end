import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import PaymentCallbackPage from './pages/PaymentCallbackPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/payments/callback" element={<PaymentCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/builder/:cvId" element={<BuilderPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
