// ProtectedRoute.jsx — only logged-in members can see the pages inside it.
// Used as a "layout route" in App.jsx: every child route is protected at once.
//
// ⚠️ This is for a smooth experience, NOT security. Security lives on the server
//    (requireAuth, Milestone 6C): without a valid session, the API returns no data.
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth.js';
import PageLoader from '../common/PageLoader.jsx';

export default function ProtectedRoute() {
  const { status, isLoggedIn } = useAuth();
  const location = useLocation();

  // 1. Still asking the server "who am I?": wait, don't guess.
  if (status === 'checking') {
    return <PageLoader />;
  }

  // 2. Not logged in: go to login, and remember where they were heading.
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. Logged in: show the requested page.
  return <Outlet />;
}