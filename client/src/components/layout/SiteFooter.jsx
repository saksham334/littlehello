// SiteFooter.jsx — the footer on public pages.
// Honest by design: no fake social links, user counts or testimonials.
import { Link } from 'react-router';
import Logo from '../brand/Logo.jsx';
import Doodle from '../brand/Doodle.jsx';

export default function SiteFooter() {
  const year = new Date().getFullYear(); // updates automatically each year

  return (
    <footer className="lh-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <Logo to="/" />
            <p className="lh-note mt-2 mb-1">Take your time. Find your people.</p>
            <p className="text-soft small mb-0">
              A gentle space for adults (18+) to make platonic friends at their own pace.
            </p>
          </div>

          <nav className="col-6 col-md-3" aria-label="Explore">
            <h2 className="lh-footer__title">Explore</h2>
            <ul className="lh-footer__links">
              <li><Link to="/#how-it-works">How it works</Link></li>
              <li><Link to="/#safety">Inclusion &amp; safety</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
            </ul>
          </nav>

          <nav className="col-6 col-md-4" aria-label="Get started">
            <h2 className="lh-footer__title">Get started</h2>
            <ul className="lh-footer__links">
              <li><Link to="/register">Join LittleHello</Link></li>
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/styleguide">Style guide</Link></li>
            </ul>
          </nav>
        </div>

        <div className="lh-footer__bottom">
          <p>© {year} LittleHello · A portfolio project</p>
          <p>
            Made with care for quiet people everywhere{' '}
            <Doodle name="heart" size={18} style={{ verticalAlign: '-3px' }} />
          </p>
        </div>
      </div>
    </footer>
  );
}