// App.jsx — the map of URLs to pages.
// Routes nested inside <PublicLayout> share its navbar and footer.
import { Routes, Route } from 'react-router';
import PublicLayout from './layouts/PublicLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import StyleGuidePage from './pages/StyleGuidePage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* A "layout route": no path of its own, just wraps its children */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/styleguide" element={<StyleGuidePage />} />

        {/* Placeholders until Milestone 6 (accounts) */}
        <Route path="/login" element={<ComingSoonPage title="Log in is coming soon" />} />
        <Route path="/register" element={<ComingSoonPage title="Sign up is coming soon" />} />

        {/* "*" matches anything not matched above, so it stays LAST */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}