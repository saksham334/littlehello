// useAuth.js — the easy way for any component to read the login state.
//   const { user, isLoggedIn, login, logout } = useAuth();
import { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

export function useAuth() {
  const context = useContext(AuthContext);
  // A clear message if someone forgets to wrap the app in <AuthProvider>.
  if (context === null) {
    throw new Error('useAuth() must be used inside <AuthProvider>. Check main.jsx.');
  }
  return context;
}