// PublicLayout.jsx — the shared frame for public pages:
// skip link + navbar + (current page) + footer.
// Logged-in pages will get their own AppLayout later (sidebar / bottom tabs).
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import SiteNavbar from '../components/layout/SiteNavbar.jsx';
import SiteFooter from '../components/layout/SiteFooter.jsx';

export default function PublicLayout() {
  const { pathname, hash } = useLocation();

  // Scroll handling when the URL changes:
  //  - "/#faq"       → scroll to the element with id="faq"
  //  - a new page    → start at the top (React Router doesn't do this for us)
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1)); // "#faq" → "faq"
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="lh-shell">
      {/* First thing keyboard users reach: jump past the navbar */}
      <a href="#main" className="lh-skip-link">
        Skip to main content
      </a>

      <SiteNavbar />

      {/* tabIndex={-1} lets the skip link move keyboard focus here */}
      <div id="main" className="lh-shell__main" tabIndex={-1}>
        <Outlet /> {/* ← the current page renders here */}
      </div>

      <SiteFooter />
    </div>
  );
}