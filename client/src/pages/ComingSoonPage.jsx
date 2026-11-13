// ComingSoonPage.jsx — an honest placeholder for pages we haven't built yet.
// Optional children appear under the message (e.g. a Log out button on /settings).
import { Link } from 'react-router';
import EmptyState from '../components/common/EmptyState.jsx';

export default function ComingSoonPage({ title, children }) {
  return (
    <main className="container py-5">
      <div className="lh-card mx-auto" style={{ maxWidth: '34rem' }}>
        <EmptyState
          doodle="star"
          title={title}
          headingLevel="h1"
          action={
            <Link to="/" className="btn btn-soft">
              <i className="bi bi-house-heart" aria-hidden="true"></i> LittleHello homepage
            </Link>
          }
        >
          This page is still being drawn. It’ll be ready in a later milestone.
        </EmptyState>

        {children && <div className="text-center px-4 pb-4">{children}</div>}
      </div>
    </main>
  );
}