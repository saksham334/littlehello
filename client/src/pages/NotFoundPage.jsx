// NotFoundPage.jsx - shown for any URL that doesn't match a route in the app.
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="container py-5 text-center">
      <p className="display-1 mb-0" aria-hidden="true">🌼</p>
      <h1 className="font-hand display-4 mt-2">This page wandered off</h1>
      <p className="text-soft mb-4">That’s okay. Take your time, and let’s head back home.</p>
      <Link to="/" className="btn btn-berry">
        <i className="bi bi-house-heart me-2" aria-hidden="true"></i>
        Back home
      </Link>
    </main>
  );
}