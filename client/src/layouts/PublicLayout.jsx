// PublicLayout.jsx — the shared frame for public pages:
// skip link + navbar + (current page) + footer.
import { Outlet } from 'react-router';
import SiteNavbar from '../components/layout/SiteNavbar.jsx';
import SiteFooter from '../components/layout/SiteFooter.jsx';
import { useScrollOnNavigate } from '../hooks/useScrollOnNavigate.js';

export default function PublicLayout() {
  useScrollOnNavigate();

  return (
    <div className="lh-shell">
      <a href="#main" className="lh-skip-link">
        Skip to main content
      </a>

      <SiteNavbar />

      <div id="main" className="lh-shell__main" tabIndex={-1}>
        <Outlet />
      </div>

      <SiteFooter />
    </div>
  );
}