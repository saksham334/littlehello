// ApiStatus.jsx — a small developer card that checks the frontend ↔ API connection.
// Shown on /styleguide (not on the public landing page).
import { useEffect, useState } from 'react';
import { getHealth } from '../../api/health.js';

export default function ApiStatus() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'error'
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

  return (
    <section className="lh-card p-4">
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
  );
}