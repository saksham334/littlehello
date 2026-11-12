// AuthShell.jsx — the calm, centered frame shared by Register and Login.
// Inspired by the reference welcome screen: logo, a handwritten title, a few doodles.
import Logo from '../brand/Logo.jsx';
import DoodleScatter from '../brand/DoodleScatter.jsx';
import '../../styles/auth.css';

const AUTH_DOODLES = [
  { name: 'flower', size: 54, top: '8%', left: '6%', rotate: -12 },
  { name: 'star', size: 36, top: '14%', right: '9%', rotate: 14, delay: 1.2 },
  { name: 'cloud', size: 70, bottom: '10%', left: '8%', delay: 0.6, hideOnMobile: true },
  { name: 'heart', size: 32, bottom: '14%', right: '10%', rotate: 10, delay: 2, hideOnMobile: true },
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="lh-auth">
      <DoodleScatter items={AUTH_DOODLES} />

      <div className="container position-relative">
        <div className="lh-card lh-auth__card mx-auto">
          <div className="text-center mb-4">
            <Logo to="/" />
            <h1 className="lh-auth__title">{title}</h1>
            {subtitle && <p className="text-soft mb-0">{subtitle}</p>}
          </div>

          {children}

          {footer && <div className="lh-auth__footer">{footer}</div>}
        </div>
      </div>
    </main>
  );
}