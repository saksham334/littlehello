// LogoutButton.jsx — one logout button for everywhere (navbar now, app sidebar/tabs in 7D).
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth.js';
import LoadingButton from '../forms/LoadingButton.jsx';

export default function LogoutButton({ className = 'btn btn-outline-berry', onLoggedOut, children = 'Log out' }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleClick() {
    setLoggingOut(true);
    // Leave app pages FIRST, so ProtectedRoute doesn't redirect to /login on the way out.
    navigate('/', { replace: true });
    try {
      await logout(); // ends the session on the server, then clears the user here
      onLoggedOut?.(); // e.g. close the mobile menu
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <LoadingButton type="button" loading={loggingOut} loadingText="Logging out…" className={className} onClick={handleClick}>
      {children}
    </LoadingButton>
  );
}