// SiteNavbar.jsx — the sticky top bar on public pages.
// Logged out: "Log in" + "Join LittleHello".  Logged in: a friendly hello + "Log out".
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Logo from '../brand/Logo.jsx';
import { useAuth } from '../../hooks/useAuth.js';

const SECTION_LINKS = [
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/#safety', label: 'Safety' },
  { to: '/#faq', label: 'FAQ' },
];

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user, isLoggedIn, status, logout } = useAuth();
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      closeMenu();
      navigate('/'); // back to the landing page
    } finally {
      setLoggingOut(false);
    }
  }

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="lh-navbar">
      <nav className="container lh-navbar__inner" aria-label="Main">
        <Logo to="/" size="sm" />

        <button
          type="button"
          className="lh-navbar__toggle d-lg-none"
          aria-expanded={menuOpen}
          aria-controls="lh-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <div id="lh-nav-menu" className={`lh-navbar__menu ${menuOpen ? 'is-open' : ''}`}>
          <ul className="lh-navbar__links">
            {SECTION_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="lh-navbar__link" onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="lh-navbar__actions">
            {/* While checking, show nothing, so buttons don't flicker from "Log in" to "Log out" */}
            {status === 'checking' ? null : isLoggedIn ? (
              <>
                <span className="font-ui text-soft px-2">
                  <i className="bi bi-flower1 me-1" aria-hidden="true"></i>
                  Hi, {user.username}
                </span>
                <button type="button" className="btn btn-outline-berry" onClick={handleLogout} disabled={loggingOut}>
                  {loggingOut ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Logging out…
                    </>
                  ) : (
                    'Log out'
                  )}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={closeMenu}>
                  Log in
                </Link>
                <Link to="/register" className="btn btn-berry" onClick={closeMenu}>
                  <i className="bi bi-flower1" aria-hidden="true"></i> Join LittleHello
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}