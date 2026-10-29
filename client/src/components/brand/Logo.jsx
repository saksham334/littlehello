// Logo.jsx — the LittleHello wordmark: a tiny flower + handwritten "littleHello"
// with a soft pink swoosh under "Hello".
//
// Usage:  <Logo />                    plain logo
//         <Logo to="/" size="sm" />   logo that links home (navbar)
import { Link } from 'react-router';
import Doodle from './Doodle.jsx';

export default function Logo({ size = 'md', to, className = '' }) {
  const content = (
    <>
      {/* Screen readers read this one clean name instead of the pieces below */}
      <span className="visually-hidden">LittleHello</span>

      <Doodle name="flower" className="lh-logo__mark" />
      <span className="lh-logo__word" aria-hidden="true">
        <span className="lh-logo__little">little</span>
        <span className="lh-logo__hello">Hello</span>
        <svg className="lh-logo__swoosh" viewBox="0 0 100 12" preserveAspectRatio="none">
          <path d="M3 8 C 30 2, 62 2, 97 6" fill="none" stroke="#FFB7C5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </span>
    </>
  );

  const classes = `lh-logo lh-logo--${size} ${className}`;

  // If "to" is given, render a router link; otherwise just a span.
  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}