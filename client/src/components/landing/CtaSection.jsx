// CtaSection.jsx — the gentle final "call to action" at the bottom of the landing page.
import { Link } from 'react-router';
import Doodle from '../brand/Doodle.jsx';
import DoodleScatter from '../brand/DoodleScatter.jsx';

const CTA_DOODLES = [
  { name: 'star', size: 34, top: '14%', left: '7%', rotate: -10 },
  { name: 'flower', size: 46, bottom: '12%', right: '7%', rotate: 12, delay: 1 },
  { name: 'sparkle', size: 24, top: '20%', right: '18%', delay: 2, hideOnMobile: true },
  { name: 'heart', size: 28, bottom: '18%', left: '16%', delay: 1.5, hideOnMobile: true },
];

export default function CtaSection() {
  return (
    <section className="lh-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="lh-card lh-cta position-relative overflow-hidden text-center">
          <DoodleScatter items={CTA_DOODLES} />

          <div className="position-relative">
            <Doodle name="bubbles" size={64} />
            <h2 id="cta-title" className="font-hand lh-cta__title">Ready for a little hello?</h2>
            <p className="lh-cta__text">
              Take your time. Find your people. Setting up your profile takes a few minutes, and you can change
              anything later.
            </p>

            <div className="lh-cta__actions">
              <Link to="/register" className="btn btn-berry btn-lg">
                <i className="bi bi-flower1" aria-hidden="true"></i> Join LittleHello
              </Link>
              <Link to="/#safety" className="btn btn-outline-berry btn-lg">
                Read our safety promises
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}