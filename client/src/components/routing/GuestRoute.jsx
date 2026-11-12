// GuestRoute.jsx — pages meant only for logged-OUT visitors (login, register).
// Logged-in members are sent into the app instead.
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth.js';
import PageLoader from '../common/PageLoader.jsx';

export default function GuestRoute() {
  const { status, isLoggedIn } = useAuth();
  const location = useLocation();

  if (status === 'checking') {
    return <PageLoader />;
  }

  if (isLoggedIn) {
    // If they were sent to login from a protected page, honor that; otherwise go to Discover.
    const destination = location.state?.from?.pathname ?? '/discover';
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}