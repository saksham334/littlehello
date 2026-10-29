// HomePage.jsx — TEMPORARY page: API connection check + component preview.
// In Milestone 4 we'll replace it with the real landing page.
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getHealth } from '../api/health.js';
import Logo from '../components/brand/Logo.jsx';
import Doodle, { DOODLE_NAMES } from '../components/brand/Doodle.jsx';
import DoodleScatter from '../components/brand/DoodleScatter.jsx';
import Avatar from '../components/common/Avatar.jsx';
import InterestChip from '../components/common/InterestChip.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { AVATARS } from '../utils/avatars.js';

// Floating doodles around the hero (positions are relative to the hero card)
const HERO_DOODLES = [
  { name: 'flower', size: 60, top: '12%', left: '5%', rotate: -12 },
  { name: 'star', size: 42, top: '10%', right: '8%', rotate: 14, delay: 1.2 },
  { name: 'cloud', size: 76, bottom: '8%', left: '12%', delay: 0.6, hideOnMobile: true },
  { name: 'heart', size: 38, bottom: '14%', right: '7%', rotate: 10, delay: 2 },
  { name: 'sparkle', size: 28, top: '50%', right: '20%', delay: 1.6, hideOnMobile: true },
];

const SAMPLE_INTERESTS = ['Reading 📚', 'Tea 🍵', 'Cozy games 🎮', 'Nature walks 🌳', 'Drawing ✏️', 'Lo-fi music 🎧'];

export default function HomePage() {
  // ---- API connection check (from Milestone 2) ----
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getHealth({ signal: controller.signal })
      .then((data) => {
        setMessage(data.message);
        setStatus('ok');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setMessage(err.message);
        setStatus('error');
      });
    return () => controller.abort();
  }, [attempt]);

  function handleRetry() {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }

  // ---- Chip selection ----
  // A Set holds selected labels. The function form of useState runs only once.
  const [selected, setSelected] = useState(() => new Set(['Tea 🍵']));

  function toggleInterest(label) {
    setSelected((prev) => {
      const next = new Set(prev); // copy first: never change state directly
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <main className="container py-5">
      {/* ---- Hero preview ---- */}
      <section className="lh-card position-relative overflow-hidden text-center px-3 py-5 mb-4">
        <DoodleScatter items={HERO_DOODLES} />
        <div className="position-relative">
          <h1 className="mb-0">
            <Logo size="lg" />
          </h1>
          <p className="lead text-soft mt-3 mb-1">Small hellos. Real friendships.</p>
          <p className="lh-note mb-0">no pressure, just people ♡</p>
        </div>
      </section>

      <div className="row g-4">
        {/* ---- API check ---- */}
        <div className="col-lg-6">
          <section className="lh-card p-4 h-100">
            <h2 className="h5 font-ui mb-3">
              <i className="bi bi-plug me-2" aria-hidden="true"></i>
              API connection check
            </h2>
            <div role="status" aria-live="polite">
              {status === 'loading' && (
                <p className="mb-0 text-soft">
                  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  Saying a little hello to the server…
                </p>
              )}
              {status === 'ok' && (
                <p className="mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2" aria-hidden="true"></i>
                  Connected! <span className="text-soft">{message}</span>
                </p>
              )}
              {status === 'error' && (
                <>
                  <p>
                    <i className="bi bi-cloud-drizzle me-2" aria-hidden="true"></i>
                    {message}
                  </p>
                  <button type="button" className="btn btn-berry" onClick={handleRetry}>
                    Try again
                  </button>
                </>
              )}
            </div>
          </section>
        </div>

        {/* ---- Interest chips ---- */}
        <div className="col-lg-6">
          <section className="lh-card p-4 h-100">
            <h2 className="h5 font-ui mb-1">Interest chips</h2>
            <p className="text-soft small mb-3">
              Selected: {selected.size === 0 ? 'none yet' : [...selected].join(', ')}
            </p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {SAMPLE_INTERESTS.map((label) => (
                <InterestChip
                  key={label}
                  label={label}
                  selected={selected.has(label)}
                  onToggle={() => toggleInterest(label)}
                />
              ))}
            </div>
            <div className="d-flex flex-wrap gap-2">
              <InterestChip label="Tea 🍵" shared />
              <InterestChip label="Journaling" />
            </div>
          </section>
        </div>

        {/* ---- Doodles + avatars ---- */}
        <div className="col-lg-6">
          <section className="lh-card p-4 h-100">
            <h2 className="h5 font-ui mb-3">Doodles</h2>
            <div className="d-flex flex-wrap gap-3 mb-4">
              {DOODLE_NAMES.map((name) => (
                <figure className="text-center mb-0" key={name}>
                  <Doodle name={name} size={48} />
                  <figcaption className="small text-soft">{name}</figcaption>
                </figure>
              ))}
            </div>
            <h2 className="h5 font-ui mb-3">Avatars</h2>
            <div className="d-flex flex-wrap gap-3">
              {Object.entries(AVATARS).map(([key, avatar]) => (
                <figure className="text-center mb-0" key={key}>
                  <Avatar avatarKey={key} />
                  <figcaption className="small text-soft mt-2">{avatar.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        {/* ---- Empty state ---- */}
        <div className="col-lg-6">
          <section className="lh-card h-100 d-flex align-items-center">
            <EmptyState
              title="No hellos yet"
              action={<button type="button" className="btn btn-soft">Discover people</button>}
            >
              When someone says hello, it’ll wait for you here. There’s no rush.
            </EmptyState>
          </section>
        </div>
      </div>

      <p className="text-center mt-4">
        <Link to="/this-page-does-not-exist">Test the 404 page</Link>
      </p>
    </main>
  );
}