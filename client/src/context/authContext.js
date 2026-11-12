// authContext.js — the shared "who is logged in?" box.
// It starts empty (null); <AuthProvider> fills it with the real values.
// Kept in its own file so Vite's fast refresh works smoothly
// (files that export React components should only export components).
import { createContext } from 'react';

export const AuthContext = createContext(null);