// AuthProvider.jsx — checks who's logged in when the app starts,
// and gives every component login(), register(), logout() and the current user.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext.js';
import { UNAUTHORIZED_EVENT } from '../api/client.js';
import { getCurrentUser, loginAccount, logoutAccount, registerAccount } from '../api/auth.js';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 'checking' until the first /me answer arrives, then 'ready'.
  // Pages wait for 'ready' so they don't flash "logged out" for a split second.
  const [status, setStatus] = useState('checking');

  // 1. On first load: ask the server who we are.
  useEffect(() => {
    const controller = new AbortController();

    getCurrentUser({ signal: controller.signal })
      .then((data) => setUser(data.user))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        // 401 is the normal "not logged in" answer. Anything else (server down)
        // is also treated as logged out, but noted for us developers.
        if (err.status !== 401) console.warn('Could not check login status:', err.message);
        setUser(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setStatus('ready');
      });

    return () => controller.abort();
  }, []);

  // 2. If any API call later says "not logged in", clear the user everywhere.
  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
    }
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  // 3. Actions that components can call. Errors are thrown on to the form that called them,
  //    so each form can show its own messages.
  const login = useCallback(async (credentials) => {
    const data = await loginAccount(credentials);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (details) => {
    const data = await registerAccount(details);
    setUser(data.user); // signing up also logs you in (server side, 6C)
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAccount();
    } finally {
      setUser(null); // even if the request failed, forget the user on this device
    }
  }, []);

  // Re-fetch the user (used later, e.g. after onboarding marks it complete).
  const refreshUser = useCallback(async () => {
    const data = await getCurrentUser();
    setUser(data.user);
    return data.user;
  }, []);

  // useMemo: only create a new value object when something inside actually changes,
  // so components using useAuth() don't re-render for no reason.
  const value = useMemo(
    () => ({
      user,
      status,
      isLoggedIn: user !== null,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, status, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}