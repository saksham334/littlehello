// useScrollOnNavigate.js — scroll behaviour when the URL changes (shared by both layouts):
//   "/#faq"     → scroll to the element with id="faq"
//   a new page  → start at the top (React Router doesn't do this for us)
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}