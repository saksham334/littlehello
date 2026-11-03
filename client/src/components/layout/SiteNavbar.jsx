// SiteNavbar.jsx - the sticky top bar on public pages.
// Phone/tablets: logo + round menu button that opens a panel.
// Laptop (≥ 992px): links and buttons all visible in one row (handled in CSS).
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Logo from '../brand/Logo.jsx';

// "/#faq" = go to the home page, then scroll to the element with id="faq"
const SECTION_LINKS =[
    { to: '/#how-it-works', label: 'How it works' },
    { to: '/#safety', label: 'Safety' },
    { to: '/#faq' , label: 'FAQ' },
];

export default function SiteNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu(){
        setMwnuOpen(false);
    }

    //While the menu is open, let the Escape key close it (keyboard user expect this).
    // While the menu is open, let the Escape key close it (keyboard users expect this).
  useEffect(() => {
    if (!menuOpen) return; // no listener needed while closed

    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    // Cleanup: remove the listener when the menu closes or the navbar unmounts.
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="lh-navbar">
      <nav className="container lh-navbar__inner" aria-label="Main">
        <Logo to="/" size="sm" />

        {/* d-lg-none: Bootstrap hides this button on screens ≥ 992px */}
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
            <Link to="/login" className="btn btn-ghost" onClick={closeMenu}>
              Log in
            </Link>
            <Link to="/register" className="btn btn-berry" onClick={closeMenu}>
              <i className="bi bi-flower1" aria-hidden="true"></i> Join LittleHello
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}