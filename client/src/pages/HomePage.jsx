// HomePage.jsx — TEMPORARY page that checks the frontend ↔ backend connection.
// In Milestone 4 we'll replace it with the real landing page.
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getHealth } from '../api/health.js';

export default function HomePage() {
  // 'loading' | 'ok' | 'error' — one variable describes what the user sees
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  // Increasing this number re-runs the effect below (our "try again" button)
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // AbortController cancels the request if the component disappears.
    // In development, React StrictMode mounts components twice on purpose,
    // so this also prevents a duplicate request from updating the page.
    const controller = new AbortController();

    getHealth({ signal: controller.signal })
      .then((data) => {
        setMessage(data.message);
        setStatus('ok');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // we cancelled it ourselves
        setMessage(err.message);
        setStatus('error');
      });

    // Cleanup function: React runs this before re-running or unmounting.
    return () => controller.abort();
  }, [attempt]);

  function handleRetry() {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }

  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="font-hand hero-title mb-2">LittleHello</h1>
        <p className="lead text-soft">Small hello. Real friendships.</p>
      </div>

      <section className="lh-card p-4 mx-auto" style={{ maxWidth: '28rem' }}>
        <h2 className="h5 font-ui mb-3">
          <i className="bi bi-plug me-2" aria-hidden="true"></i>
          API connection check
        </h2>

        {/* aria-live announces status changes to screen-reader users */}
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

      <p className="text-center mt-4">
        <Link to="/this-page-does-not-exist">Test the 404 page</Link>
      </p>
    </main>
  );
}