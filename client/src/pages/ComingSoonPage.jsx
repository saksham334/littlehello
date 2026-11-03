// ComingSoonPage.jsx — an honest placeholder for pages we haven't built yet
// (so "Log in" and "Join" buttons never lead to a broken page).
import { Link } from 'react-router';
import EmptyState from '../components/common/EmptyState.jsx';

export default function ComingSoonPage({ title }) {
  return (
    <main className="container py-5">
      <div className="lh-card mx-auto" style={{ maxWidth: '34rem' }}>
        <EmptyState
          doodle="star"
          title={title}
          headingLevel="h1"
          action={
            <Link to="/" className="btn btn-soft">
              <i className="bi bi-house-heart" aria-hidden="true"></i> Back home
            </Link>
          }
        >
          This page is still being drawn. It’ll be ready in a later milestone.
        </EmptyState>
      </div>
    </main>
  );
}