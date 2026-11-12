// PageLoader.jsx — a calm loading state while we check who's logged in.
// It waits 250 ms before appearing: fast checks finish before anything shows,
// so most people never see a flicker at all.
import { useEffect, useState } from 'react';

export default function PageLoader({ label = 'Just a moment…' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(timer); // if we finish early, the loader never appears
  }, []);

  return (
    <div className="lh-page-loader" role="status" aria-live="polite">
      {visible && (
        <>
          <span className="spinner-border text-berry" aria-hidden="true"></span>
          <p className="text-soft mt-3 mb-0">{label}</p>
        </>
      )}
    </div>
  );
}